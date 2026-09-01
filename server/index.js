const express = require('express')
const cors = require('cors')
const multer = require('multer')
const Database = require('better-sqlite3')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.SERVER_PORT || 3001

// ── Storage dirs ──────────────────────────────────────────────────────────────
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

// ── SQLite ────────────────────────────────────────────────────────────────────
const db = new Database(path.join(__dirname, 'submissions.db'))
db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    name         TEXT,
    material     TEXT,
    properties   TEXT,
    additional   TEXT
  )
`)

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use('/uploads', express.static(uploadsDir))

// ── Multer (audio upload) ─────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.webm'
    cb(null, `${uuidv4()}${ext}`)
  },
})
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } })

// ── Routes ────────────────────────────────────────────────────────────────────

// POST /api/upload — receive audio blob, save to disk, return URL
app.post('/api/upload', upload.single('audio'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No audio file received' })
  const url = `/uploads/${req.file.filename}`
  console.log(`[upload] saved ${req.file.filename}`)
  res.json({ url })
})

// POST /api/submit — persist full submission to SQLite
app.post('/api/submit', (req, res) => {
  const { submissions } = req.body
  if (!Array.isArray(submissions) || submissions.length === 0) {
    return res.status(400).json({ error: 'submissions array is required' })
  }

  const insert = db.prepare(`
    INSERT INTO submissions (name, material, properties, additional)
    VALUES (?, ?, ?, ?)
  `)

  const insertMany = db.transaction(rows => rows.map(row => insert.run(
    row.name ?? '',
    row.material ?? '',
    JSON.stringify(row.properties ?? {}),
    row.additionalThoughts ?? ''
  )))

  const results = insertMany(submissions)

  console.log('\n══════ New submission batch ══════')
  submissions.forEach((s, i) => {
    console.log(`[${i + 1}] Name: ${s.name} | Material: ${s.material}`)
    console.log('     Properties:', JSON.stringify(s.properties, null, 4))
    if (s.additionalThoughts) console.log('     Additional:', s.additionalThoughts)
  })
  console.log('═════════════════════════════════\n')

  res.json({ success: true, ids: results.map(r => r.lastInsertRowid) })
})

// Health check
app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`Material Labs API listening on http://localhost:${PORT}`)
})
