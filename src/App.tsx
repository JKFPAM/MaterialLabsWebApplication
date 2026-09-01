import {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import svgPaths from '../imports/svg-hm1xq6i97g'

// ─── Types ───────────────────────────────────────────────────────────────────

type Modality = 'written' | 'instrument' | 'link' | 'microphone'
type RecordingStatus = 'idle' | 'recording' | 'paused' | 'stopped'

interface PropertyData {
  isOpen: boolean
  sliderValue: number
  activeModality: Modality
  writtenText: string
  soundChangeText: string
  linkUrl: string
  audioBlob: Blob | null
  audioObjectUrl: string | null
}

interface FormData {
  name: string
  selectedMaterial: string
  properties: Record<string, PropertyData>
  additionalThoughts: string
  additionalIsOpen: boolean
}

interface MaterialFormHandle {
  getData: () => FormData
}

// ─── Constants ───────────────────────────────────────────────────────────────

const MATERIALS = [
  '1. Grey Wool',
  '2. Polished Marble',
  '3. Rough Concrete',
  '4. Hammered Steel',
  '5. Cork',
  '6. Brushed Aluminium',
  '7. Natural Rubber',
  '8. Aged Oak',
  '9. Woven Linen',
  '10. Tempered Glass',
]

interface PropertyConfig {
  id: string
  title: string
  leftLabel: string
  rightLabel: string
  description: string[]
  soundLabel: string
}

const PROPERTY_CONFIGS: PropertyConfig[] = [
  {
    id: 'matte-shiny',
    title: 'Matte / Shiny',
    leftLabel: 'Matte',
    rightLabel: 'Shiny',
    description: [
      'Is this Material Matte or Shiny?',
      'What does that even sound like?',
      'How would changing the slider effect the sound?',
    ],
    soundLabel: 'Matte / Shiny Sound:',
  },
  {
    id: 'rough-smooth',
    title: 'Rough / Smooth',
    leftLabel: 'Rough',
    rightLabel: 'Smooth',
    description: [
      "Is the material's surface Rough or Smooth?",
      'How does surface friction translate into sonic character?',
      'What changes in timbre as texture shifts?',
    ],
    soundLabel: 'Rough / Smooth Sound:',
  },
  {
    id: 'regular-irregular',
    title: 'Regular / Irregular',
    leftLabel: 'Regular',
    rightLabel: 'Irregular',
    description: [
      'Does this material have a Regular or Irregular pattern?',
      'How does structural regularity manifest as sound?',
      'Does predictable repetition create a different sonic quality?',
    ],
    soundLabel: 'Regular / Irregular Sound:',
  },
  {
    id: 'dense-open',
    title: 'Dense / Open',
    leftLabel: 'Dense',
    rightLabel: 'Open',
    description: [
      "Is the material's structure Dense or Open?",
      'How does material density affect resonance and tone?',
      'What changes as air can or cannot pass through?',
    ],
    soundLabel: 'Dense / Open Sound:',
  },
  {
    id: 'natural-manufactured',
    title: 'Natural / Manufactured',
    leftLabel: 'Natural',
    rightLabel: 'Manufactured',
    description: [
      'Is this material Natural or Manufactured in origin?',
      'How does origin shape the sonic character of a material?',
      'Do natural imperfections create a warmer, richer sound?',
    ],
    soundLabel: 'Natural / Manufactured Sound:',
  },
  {
    id: 'small-large-texture',
    title: 'Small Texture / Large Texture',
    leftLabel: 'Small',
    rightLabel: 'Large',
    description: [
      'Does this material have a Small or Large surface texture?',
      'How do micro-textures differ from macro-textures sonically?',
      'What frequencies are emphasised at each extreme?',
    ],
    soundLabel: 'Small / Large Texture Sound:',
  },
]

const createDefaultPropertyData = (): PropertyData => ({
  isOpen: false,
  sliderValue: 50,
  activeModality: 'written',
  writtenText: '',
  soundChangeText: '',
  linkUrl: '',
  audioBlob: null,
  audioObjectUrl: null,
})

const createDefaultFormData = (): FormData => ({
  name: '',
  selectedMaterial: '',
  properties: Object.fromEntries(
    PROPERTY_CONFIGS.map(c => [c.id, createDefaultPropertyData()])
  ),
  additionalThoughts: '',
  additionalIsOpen: true,
})

// ─── Animation presets ────────────────────────────────────────────────────────

const SPRING_CHEVRON = { type: 'spring' as const, stiffness: 420, damping: 42 }
const SPRING_PILL = { type: 'spring' as const, stiffness: 520, damping: 46 }
const EASE_ACCORDION = [0.25, 0.46, 0.45, 0.94] as const

// ─── Font helpers ─────────────────────────────────────────────────────────────

const SS = "'forpeople Season Sans:Regular', 'DM Sans', sans-serif"
// Season Sans-TRIAL:Regular is blocked (not_found); DM Sans is the explicit fallback
const DM = "'DM Sans', sans-serif"

// ─── SVG icon helpers ─────────────────────────────────────────────────────────

function WrittenSVG({ active }: { active: boolean }) {
  return (
    <svg width="7.5" height="7.5" viewBox="0 0 6.56251 6.5625" fill="none">
      <path
        d={svgPaths.p24911900}
        stroke={active ? 'white' : '#5C5C5C'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.46875"
      />
    </svg>
  )
}

function InstrumentSVG({ active }: { active: boolean }) {
  return (
    <svg width="5.39" height="6.61" viewBox="0 0 5.39069 6.61385" fill="none">
      <path
        d={svgPaths.p23d4f080}
        stroke={active ? 'white' : '#5C5C5C'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.46875"
      />
    </svg>
  )
}

function LinkSVG({ active }: { active: boolean }) {
  return (
    <svg width="6.56" height="6.56" viewBox="0 0 6.5625 6.5625" fill="none">
      <path
        d={svgPaths.p94ef7c0}
        stroke={active ? 'white' : '#5C5C5C'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.46875"
      />
    </svg>
  )
}

function MicSVG({ active }: { active: boolean }) {
  return (
    <svg width="4.22" height="7.03" viewBox="0 0 4.21875 7.03125" fill="none">
      <path
        d={svgPaths.p1d428480}
        stroke={active ? 'white' : '#5C5C5C'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.46875"
      />
    </svg>
  )
}

function ModalityIcon({ id, active }: { id: Modality; active: boolean }) {
  switch (id) {
    case 'written':
      return <WrittenSVG active={active} />
    case 'instrument':
      return <InstrumentSVG active={active} />
    case 'link':
      return <LinkSVG active={active} />
    case 'microphone':
      return <MicSVG active={active} />
  }
}

// ─── TagIcon (from imports design) ───────────────────────────────────────────

function TagIconSVG() {
  return (
    <div className="relative size-[26px]">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="26"
        viewBox="0 0 26 26"
        width="26"
        preserveAspectRatio="none"
      >
        <path d="M12.9961 26V22" stroke="black" />
        <path d={svgPaths.p6e713e0} stroke="black" />
        <path d="M6.5 24.2578L8.5 20.7937" stroke="black" />
        <path d={svgPaths.p19d95800} stroke="black" />
        <path d={svgPaths.p15cd5f1c} stroke="black" />
        <path d={svgPaths.p1b4e8500} stroke="black" />
        <path d="M12.9961 0V4" stroke="black" />
        <path d={svgPaths.pf0b5100} stroke="black" />
        <path d={svgPaths.p2afcac80} stroke="black" />
        <path d={svgPaths.p3cb02400} stroke="black" />
        <path d="M24.2578 6.5L20.7937 8.5" stroke="black" />
        <path d={svgPaths.p276c5b60} stroke="black" />
        <path d="M2.18557e-08 13L4 13" stroke="black" />
        <path d={svgPaths.p27064a40} stroke="black" />
        <path d="M1.74609 6.5L5.2102 8.5" stroke="black" />
        <path d={svgPaths.pe170200} stroke="black" />
        <path d={svgPaths.p2fba7300} stroke="black" />
        <path d={svgPaths.p29cb4880} stroke="black" />
        <path d="M26 13L22 13" stroke="black" />
        <path d={svgPaths.p2f07ea80} stroke="black" />
        <path d="M24.2617 19.5L20.7976 17.5" stroke="black" />
        <path d={svgPaths.p13622800} stroke="black" />
        <path d={svgPaths.p12c98bc0} stroke="black" />
        <path d={svgPaths.p2281b380} stroke="black" />
      </svg>
    </div>
  )
}

// ─── Chevron ──────────────────────────────────────────────────────────────────

function Chevron({ isOpen }: { isOpen: boolean }) {
  const rm = useReducedMotion()
  return (
    <motion.div
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={rm ? { duration: 0 } : SPRING_CHEVRON}
      className="relative shrink-0 size-4"
    >
      <div className="absolute inset-[37.29%_17%_31.17%_17%]">
        <div className="absolute inset-[-9.91%_-4.73%]">
          <svg
            className="block size-full"
            fill="none"
            height="6.04667"
            viewBox="0 0 11.56 6.04667"
            width="11.56"
            preserveAspectRatio="none"
          >
            <path
              d={svgPaths.p1cb90880}
              stroke="#11181C"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Property Slider ──────────────────────────────────────────────────────────

interface SliderProps {
  value: number
  onChange: (v: number) => void
  leftLabel: string
  rightLabel: string
}

function PropertySlider({ value, onChange, leftLabel, rightLabel }: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const pct = Math.min(100, Math.max(0, value))

  const valueFromPointer = useCallback(
    (clientX: number) => {
      const rect = trackRef.current?.getBoundingClientRect()
      if (!rect) return value
      return Math.round(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)))
    },
    [value]
  )

  const onDown = (e: React.PointerEvent) => {
    dragging.current = true
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    onChange(valueFromPointer(e.clientX))
  }
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    onChange(valueFromPointer(e.clientX))
  }
  const onUp = () => {
    dragging.current = false
  }

  return (
    <div className="w-full">
      <div
        className="flex justify-between mb-2.5 text-[14px] text-[#313131]"
        style={{ fontFamily: SS }}
      >
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      <div
        ref={trackRef}
        className="relative h-7 cursor-pointer select-none touch-none"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        role="slider"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${leftLabel} to ${rightLabel}`}
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'ArrowLeft') onChange(Math.max(0, value - 1))
          if (e.key === 'ArrowRight') onChange(Math.min(100, value + 1))
          if (e.key === 'Home') onChange(0)
          if (e.key === 'End') onChange(100)
        }}
      >
        {/* Track background */}
        <div className="absolute inset-0 bg-[#f2f2f2] rounded-[28px] opacity-50" />
        {/* Fill */}
        <div
          className="absolute top-0 bottom-0 left-0 bg-[#ebdfd3] rounded-[16px]"
          style={{ width: `${pct}%` }}
        />
        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 size-[26px] bg-white border-2 border-[#ebdfd3] rounded-full"
          style={{ left: `calc(${pct}% - 13px)` }}
        />
      </div>
    </div>
  )
}

// ─── Audio Recorder ───────────────────────────────────────────────────────────

interface AudioRecorderProps {
  onAudioCaptured: (blob: Blob, objectUrl: string) => void
  existingUrl: string | null
}

function AudioRecorder({ onAudioCaptured, existingUrl }: AudioRecorderProps) {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedDeviceId, setSelectedDeviceId] = useState('')
  const [status, setStatus] = useState<RecordingStatus>('idle')
  const [playingBack, setPlayingBack] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])
  const stream = useRef<MediaStream | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then(devs => {
        const inputs = devs.filter(d => d.kind === 'audioinput')
        setDevices(inputs)
        if (inputs.length) setSelectedDeviceId(inputs[0].deviceId)
      })
      .catch(() => {})
  }, [])

  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current
    const analyser = analyserRef.current
    if (!canvas || !analyser) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const buf = new Uint8Array(analyser.frequencyBinCount)
    const draw = () => {
      rafRef.current = requestAnimationFrame(draw)
      analyser.getByteTimeDomainData(buf)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.lineWidth = 1.5
      ctx.strokeStyle = '#ebdfd3'
      ctx.beginPath()
      const sliceW = canvas.width / buf.length
      let x = 0
      for (let i = 0; i < buf.length; i++) {
        const y = ((buf[i] / 128.0) * canvas.height) / 2
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        x += sliceW
      }
      ctx.lineTo(canvas.width, canvas.height / 2)
      ctx.stroke()
    }
    draw()
  }, [])

  const startRecording = async () => {
    try {
      const constraints: MediaStreamConstraints = {
        audio: selectedDeviceId ? { deviceId: { exact: selectedDeviceId } } : true,
      }
      stream.current = await navigator.mediaDevices.getUserMedia(constraints)
      const audioCtx = new AudioContext()
      const src = audioCtx.createMediaStreamSource(stream.current)
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 256
      src.connect(analyser)
      analyserRef.current = analyser
      drawWaveform()

      chunks.current = []
      const recorder = new MediaRecorder(stream.current)
      recorder.ondataavailable = e => {
        if (e.data.size > 0) chunks.current.push(e.data)
      }
      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' })
        onAudioCaptured(blob, URL.createObjectURL(blob))
      }
      recorder.start()
      mediaRecorder.current = recorder
      setStatus('recording')
      setElapsed(0)
      timerRef.current = setInterval(() => setElapsed(t => t + 1), 1000)
    } catch {
      // mic permission denied or unavailable
    }
  }

  const pauseRecording = () => {
    mediaRecorder.current?.pause()
    setStatus('paused')
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const resumeRecording = () => {
    mediaRecorder.current?.resume()
    setStatus('recording')
    timerRef.current = setInterval(() => setElapsed(t => t + 1), 1000)
  }

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    analyserRef.current = null
    stream.current?.getTracks().forEach(t => t.stop())
    mediaRecorder.current?.stop()
    setStatus('stopped')
  }

  const playPreview = () => {
    if (!existingUrl) return
    if (!audioRef.current) audioRef.current = new Audio(existingUrl)
    audioRef.current.onended = () => setPlayingBack(false)
    audioRef.current.play()
    setPlayingBack(true)
  }

  const stopPreview = () => {
    audioRef.current?.pause()
    if (audioRef.current) audioRef.current.currentTime = 0
    setPlayingBack(false)
  }

  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      stream.current?.getTracks().forEach(t => t.stop())
    },
    []
  )

  const fmt = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  const pillClass = (dark: boolean) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] cursor-pointer transition-none ${
      dark ? 'bg-[#11181c] text-white' : 'bg-[#f2f2f2] text-[#313131]'
    }`

  return (
    <div className="w-full flex flex-col gap-3">
      {devices.length > 0 && (
        <select
          value={selectedDeviceId}
          onChange={e => setSelectedDeviceId(e.target.value)}
          className="w-full text-[13px] text-[#313131] bg-[#f9f9f9] border border-[#e1e1e1] rounded px-3 py-2 outline-none"
          style={{ fontFamily: SS }}
        >
          {devices.map(d => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.label || `Microphone ${d.deviceId.slice(0, 8)}`}
            </option>
          ))}
        </select>
      )}

      <canvas
        ref={canvasRef}
        width={400}
        height={48}
        className="w-full h-12 rounded bg-[#f9f9f9] border border-[#e1e1e1]"
      />

      <div className="flex items-center gap-2 flex-wrap">
        {status === 'idle' && (
          <button onClick={startRecording} className={pillClass(true)} style={{ fontFamily: SS }}>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Record
          </button>
        )}
        {status === 'recording' && (
          <>
            <button onClick={pauseRecording} className={pillClass(false)} style={{ fontFamily: SS }}>
              Pause
            </button>
            <button onClick={stopRecording} className={pillClass(true)} style={{ fontFamily: SS }}>
              Stop
            </button>
            <span
              className="text-[12px] text-[#949494] font-mono tabular-nums"
              style={{ fontFamily: SS }}
            >
              {fmt(elapsed)}
            </span>
          </>
        )}
        {status === 'paused' && (
          <>
            <button
              onClick={resumeRecording}
              className={pillClass(false)}
              style={{ fontFamily: SS }}
            >
              Resume
            </button>
            <button onClick={stopRecording} className={pillClass(true)} style={{ fontFamily: SS }}>
              Stop
            </button>
          </>
        )}
        {status === 'stopped' && existingUrl && (
          <>
            <button onClick={startRecording} className={pillClass(false)} style={{ fontFamily: SS }}>
              Re-record
            </button>
            {playingBack ? (
              <button onClick={stopPreview} className={pillClass(true)} style={{ fontFamily: SS }}>
                ■ Stop
              </button>
            ) : (
              <button onClick={playPreview} className={pillClass(true)} style={{ fontFamily: SS }}>
                ▶ Play
              </button>
            )}
            <span className="text-[12px] text-[#949494]" style={{ fontFamily: SS }}>
              Recording ready
            </span>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Modality Section ─────────────────────────────────────────────────────────

interface ModalitySectionProps {
  label: string
  activeModality: Modality
  onModalityChange: (m: Modality) => void
  writtenText: string
  onWrittenChange: (t: string) => void
  soundChangeText: string
  onSoundChangeChange: (t: string) => void
  linkUrl: string
  onLinkChange: (u: string) => void
  audioBlob: Blob | null
  audioObjectUrl: string | null
  onAudioCaptured: (blob: Blob, url: string) => void
}

const MODALITY_LIST: { id: Modality; label: string }[] = [
  { id: 'written', label: 'Written' },
  { id: 'instrument', label: 'Instrument' },
  { id: 'link', label: 'Link' },
  { id: 'microphone', label: 'Microphone' },
]

function ModalitySection(props: ModalitySectionProps) {
  const {
    label,
    activeModality,
    onModalityChange,
    writtenText,
    onWrittenChange,
    soundChangeText,
    onSoundChangeChange,
    linkUrl,
    onLinkChange,
    audioBlob,
    audioObjectUrl,
    onAudioCaptured,
  } = props
  const rm = useReducedMotion()

  const inputTransition = rm
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 400, damping: 40 }

  return (
    <div className="flex flex-col gap-2.5 w-full">
      <p className="text-[14px] text-[#313131] leading-5" style={{ fontFamily: SS }}>
        {label}
      </p>

      {/* Modality pills */}
      <div className="flex gap-3 flex-wrap">
        {MODALITY_LIST.map(m => {
          const active = activeModality === m.id
          return (
            <motion.button
              key={m.id}
              onClick={() => onModalityChange(m.id)}
              animate={{
                backgroundColor: active ? '#11181c' : '#f2f2f2',
                color: active ? '#ffffff' : '#5c5c5c',
              }}
              transition={rm ? { duration: 0 } : SPRING_PILL}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-[7.5px] px-[13.5px] py-[7.5px] rounded-full text-[10.5px] select-none cursor-pointer"
              style={{ fontFamily: SS }}
            >
              <ModalityIcon id={m.id} active={active} />
              {m.label}
            </motion.button>
          )
        })}
      </div>

      {/* Contextual input */}
      <AnimatePresence mode="wait">
        {activeModality === 'written' && (
          <motion.div
            key="written"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={inputTransition}
          >
            <div className="border-b border-[#949494] py-2.5">
              <textarea
                value={writtenText}
                onChange={e => onWrittenChange(e.target.value)}
                placeholder="Write what you feel here..."
                rows={2}
                className="w-full bg-transparent resize-none outline-none text-[14px] text-[#313131] placeholder:text-[#949494] leading-5"
                style={{ fontFamily: SS }}
              />
            </div>
          </motion.div>
        )}

        {(activeModality === 'instrument' || activeModality === 'link') && (
          <motion.div
            key="link"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={inputTransition}
          >
            <div className="border-b border-[#949494] py-2.5">
              <input
                type="url"
                value={linkUrl}
                onChange={e => onLinkChange(e.target.value)}
                placeholder={
                  activeModality === 'instrument'
                    ? 'Link to an audio recording or sample...'
                    : 'Paste a link to audio or video...'
                }
                className="w-full bg-transparent outline-none text-[14px] text-[#313131] placeholder:text-[#949494]"
                style={{ fontFamily: SS }}
              />
            </div>
          </motion.div>
        )}

        {activeModality === 'microphone' && (
          <motion.div
            key="mic"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={inputTransition}
          >
            <AudioRecorder
              onAudioCaptured={onAudioCaptured}
              existingUrl={audioObjectUrl}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* How would the sound change */}
      <p className="text-[14px] text-[#313131] leading-5 mt-5" style={{ fontFamily: SS }}>
        How would the sound change:
      </p>
      <div className="border-b border-[#949494] py-2.5">
        <input
          type="text"
          value={soundChangeText}
          onChange={e => onSoundChangeChange(e.target.value)}
          placeholder="Write what you feel here..."
          className="w-full bg-transparent outline-none text-[14px] text-[#313131] placeholder:text-[#949494]"
          style={{ fontFamily: SS }}
        />
      </div>
    </div>
  )
}

// ─── Property Accordion ───────────────────────────────────────────────────────

interface PropertyAccordionProps {
  config: PropertyConfig
  data: PropertyData
  onChange: (update: Partial<PropertyData>) => void
}

function PropertyAccordion({ config, data, onChange }: PropertyAccordionProps) {
  const rm = useReducedMotion()

  return (
    <div className="bg-white border border-[#e1e1e1]">
      <button
        className="flex items-center justify-between p-5 w-full text-left"
        onClick={() => onChange({ isOpen: !data.isOpen })}
        aria-expanded={data.isOpen}
      >
        <span className="text-[16px] text-black leading-5" style={{ fontFamily: SS }}>
          {config.title}
        </span>
        <Chevron isOpen={data.isOpen} />
      </button>

      <AnimatePresence initial={false}>
        {data.isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              rm
                ? { duration: 0.15 }
                : { duration: 0.38, ease: EASE_ACCORDION }
            }
            style={{ overflow: 'hidden' }}
          >
            <div className="flex flex-col gap-10 px-5 pb-5">
              {/* Description */}
              <div className="text-[14px] text-[#313131] leading-5" style={{ fontFamily: SS }}>
                {config.description.map((line, i) => (
                  <p key={i} className={i < config.description.length - 1 ? 'mb-0' : ''}>
                    {line}
                  </p>
                ))}
              </div>

              {/* Slider */}
              <PropertySlider
                value={data.sliderValue}
                onChange={v => onChange({ sliderValue: v })}
                leftLabel={config.leftLabel}
                rightLabel={config.rightLabel}
              />

              {/* Modality + contextual */}
              <ModalitySection
                label={config.soundLabel}
                activeModality={data.activeModality}
                onModalityChange={m => onChange({ activeModality: m })}
                writtenText={data.writtenText}
                onWrittenChange={t => onChange({ writtenText: t })}
                soundChangeText={data.soundChangeText}
                onSoundChangeChange={t => onChange({ soundChangeText: t })}
                linkUrl={data.linkUrl}
                onLinkChange={u => onChange({ linkUrl: u })}
                audioBlob={data.audioBlob}
                audioObjectUrl={data.audioObjectUrl}
                onAudioCaptured={(blob, url) => onChange({ audioBlob: blob, audioObjectUrl: url })}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Additional Thoughts Accordion ───────────────────────────────────────────

function AdditionalThoughtsAccordion({
  isOpen,
  value,
  onToggle,
  onChange,
}: {
  isOpen: boolean
  value: string
  onToggle: () => void
  onChange: (t: string) => void
}) {
  const rm = useReducedMotion()
  return (
    <div className="bg-white border border-[#e1e1e1]">
      <button
        className="flex items-center justify-between p-5 w-full text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-[16px] text-black leading-5" style={{ fontFamily: SS }}>
          Additional Thoughts
        </span>
        <Chevron isOpen={isOpen} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={rm ? { duration: 0.15 } : { duration: 0.38, ease: EASE_ACCORDION }}
            style={{ overflow: 'hidden' }}
          >
            <div className="flex flex-col gap-10 px-5 pb-5">
              <div className="text-[14px] text-[#313131] leading-5" style={{ fontFamily: SS }}>
                <p className="mb-0">Do you have any other thoughts about this experiment?</p>
                <p className="mb-0">What are some potential use cases?</p>
                <p className="mb-0">Has this made you think about materials differently?</p>
                <p>What does this kind of insight offer?</p>
              </div>
              <div className="border-b border-[#949494] py-2.5">
                <textarea
                  value={value}
                  onChange={e => onChange(e.target.value)}
                  placeholder="Write what you feel here..."
                  rows={3}
                  className="w-full bg-transparent resize-none outline-none text-[14px] text-[#313131] placeholder:text-[#949494] leading-5"
                  style={{ fontFamily: SS }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Material Form ────────────────────────────────────────────────────────────

const MaterialForm = forwardRef<MaterialFormHandle, { index: number }>(({ index }, ref) => {
  const [fd, setFd] = useState<FormData>(createDefaultFormData)

  useImperativeHandle(ref, () => ({ getData: () => fd }), [fd])

  const updateProp = (propId: string, update: Partial<PropertyData>) =>
    setFd(prev => ({
      ...prev,
      properties: {
        ...prev.properties,
        [propId]: { ...prev.properties[propId], ...update },
      },
    }))

  const openCount = Object.values(fd.properties).filter(p => p.isOpen).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 32 }}
      className="bg-white shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] w-full max-w-[706px]"
    >
      <div className="flex flex-col p-10">
        {/* Name */}
        <div className="flex flex-col gap-2.5 pb-10">
          <label className="text-[16px] text-black leading-5" style={{ fontFamily: SS }}>
            Name:
          </label>
          <div className="border-b border-[#949494] py-2.5">
            <input
              type="text"
              value={fd.name}
              onChange={e => setFd(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Insert name here"
              className="w-full bg-transparent outline-none text-[16px] text-[#313131] placeholder:text-[#949494]"
              style={{ fontFamily: SS }}
            />
          </div>
        </div>

        {/* Material selection */}
        <div className="flex flex-col gap-5">
          <p className="text-[16px] text-black leading-5" style={{ fontFamily: SS }}>
            Material:
          </p>
          <div className="relative bg-[#f2f2f2]">
            <div className="flex items-center px-5 py-3">
              <div className="flex-1 min-w-0">
                <ol
                  className="list-decimal pl-6 text-[16px] text-[#5c5c5c]"
                  style={{ fontFamily: SS }}
                  start={1}
                >
                  <li className="leading-5">
                    {fd.selectedMaterial
                      ? fd.selectedMaterial.replace(/^\d+\.\s*/, '')
                      : <span className="text-[#949494]">Select a material</span>}
                  </li>
                </ol>
              </div>
              <Chevron isOpen={false} />
            </div>
            <select
              value={fd.selectedMaterial}
              onChange={e => setFd(prev => ({ ...prev, selectedMaterial: e.target.value }))}
              className="absolute inset-0 opacity-0 cursor-pointer w-full"
              aria-label="Select material"
            >
              <option value="">Select a material</option>
              {MATERIALS.map(m => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Properties */}
        <div className="flex flex-col gap-5 mt-10">
          <div
            className="flex items-center justify-between text-[16px]"
            style={{ fontFamily: SS }}
          >
            <span className="text-black">Properties:</span>
            <span className="text-[#949494] text-right text-sm">
              (pick the 3 which apply most to the material)
            </span>
          </div>

          {openCount > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[13px] text-[#949494]"
              style={{ fontFamily: SS }}
            >
              {openCount} of 3{' '}
              {openCount === 1 ? 'property' : 'properties'} selected
            </motion.p>
          )}

          {PROPERTY_CONFIGS.map(config => (
            <PropertyAccordion
              key={config.id}
              config={config}
              data={fd.properties[config.id]}
              onChange={update => updateProp(config.id, update)}
            />
          ))}

          <AdditionalThoughtsAccordion
            isOpen={fd.additionalIsOpen}
            value={fd.additionalThoughts}
            onToggle={() => setFd(prev => ({ ...prev, additionalIsOpen: !prev.additionalIsOpen }))}
            onChange={t => setFd(prev => ({ ...prev, additionalThoughts: t }))}
          />
        </div>
      </div>
    </motion.div>
  )
})

MaterialForm.displayName = 'MaterialForm'

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [formCount, setFormCount] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const formRefs = useRef<(MaterialFormHandle | null)[]>([])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const allForms = formRefs.current.slice(0, formCount).map(r => r?.getData())

      const submissions = await Promise.all(
        allForms.map(async form => {
          if (!form) return null

          const processedProps: Record<string, object> = {}
          for (const [propId, propData] of Object.entries(form.properties)) {
            let audioPath: string | null = null

            if (propData.audioBlob) {
              try {
                const fd = new FormData()
                fd.append('audio', propData.audioBlob, 'recording.webm')
                const res = await fetch('/api/upload', { method: 'POST', body: fd })
                const json = await res.json()
                audioPath = json.url
              } catch {
                /* upload failed — omit */
              }
            }

            processedProps[propId] = {
              sliderValue: propData.sliderValue,
              activeModality: propData.activeModality,
              writtenText: propData.writtenText,
              soundChangeText: propData.soundChangeText,
              linkUrl: propData.linkUrl,
              audioPath,
            }
          }

          return {
            name: form.name,
            material: form.selectedMaterial,
            properties: processedProps,
            additionalThoughts: form.additionalThoughts,
          }
        })
      )

      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissions: submissions.filter(Boolean) }),
      })

      if (!res.ok) throw new Error('Submit failed')
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="bg-[#fdfdfd] min-h-full flex flex-col items-center"
      style={{ fontFamily: SS }}
    >
      {/* ── Header ── */}
      <div className="w-full max-w-5xl flex flex-col items-center gap-10 py-40 px-8">
        {/* CMF Research badge */}
        <div className="bg-white flex items-center gap-2.5 pl-1 pr-4 py-1 rounded-full">
          <TagIconSVG />
          <span
            className="text-[14px] text-black leading-5 capitalize"
            style={{ fontFamily: DM }}
          >
            CMF Research
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-[32px] text-black text-center leading-9 m-0"
          style={{ fontFamily: DM }}
        >
          Material Labs
        </h1>

        {/* Intro copy */}
        <div
          className="text-[20px] text-black text-center leading-6 max-w-[491px] whitespace-pre-wrap"
          style={{ fontFamily: DM }}
        >
          <p className="mb-5">
            Our experimental playground for exploring the sounds which describe 10 distinct
            materials.
          </p>
          <p className="mb-5">
            We&rsquo;re looking to collect your thoughts and insights into the way in which a
            material should sound.
          </p>
          <p className="mb-5">
            You can pick three of the most distinctive properties of a material, and use a way to
            show these sounds.
          </p>
          <p>
            Written, a link to audio online, with an instrument, or even your voice. Any and all
            opinions are welcome.
          </p>
        </div>
      </div>

      {/* ── Form cards ── */}
      <div className="w-full flex flex-col items-center gap-6 px-4">
        {Array.from({ length: formCount }, (_, i) => (
          <MaterialForm
            key={i}
            index={i}
            ref={el => {
              formRefs.current[i] = el
            }}
          />
        ))}
      </div>

      {/* ── + Material ── */}
      <div className="flex items-center justify-center py-10">
        <motion.button
          onClick={() => setFormCount(c => c + 1)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="bg-white flex items-center justify-center px-5 py-3 rounded-full border border-black text-[16px] text-black leading-6"
          style={{ fontFamily: SS }}
        >
          + Material
        </motion.button>
      </div>

      {/* ── Submit ── */}
      <div className="flex flex-col items-center gap-4 pb-32">
        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[14px] text-green-700"
              style={{ fontFamily: SS }}
            >
              Response submitted — thank you!
            </motion.p>
          )}
          {submitStatus === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[14px] text-red-600"
              style={{ fontFamily: SS }}
            >
              Something went wrong — please try again.
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleSubmit}
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.96 }}
          className="bg-[#ffc600] flex items-center justify-center px-5 py-3 rounded-full text-[16px] text-black leading-6 disabled:opacity-60 cursor-pointer disabled:cursor-default"
          style={{ fontFamily: SS }}
        >
          {isSubmitting ? 'Submitting…' : 'Submit Response'}
        </motion.button>
      </div>
    </div>
  )
}
