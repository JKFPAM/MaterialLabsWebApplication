import svgPaths from "./svg-hm1xq6i97g";
type ArrowProps = {
  className?: string;
  selectorIcon?: "down";
};

function Arrow({ className, selectorIcon = "down" }: ArrowProps) {
  return (
    <div className={className || "relative size-[16px]"}>
      <div className="absolute inset-[37.29%_17%_31.17%_17%]" data-name="Vector">
        <div className="absolute inset-[-9.91%_-4.73%]">
          <svg className="block size-full" fill="none" height="6.04667" preserveAspectRatio="none" viewBox="0 0 11.56 6.04667" width="11.56">
            <path d={svgPaths.p1cb90880} id="Vector" stroke="#11181C" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" />
          </svg>
        </div>
      </div>
      <div className="absolute flex inset-0 items-center justify-center" style={{ containerType: "size" }}>
        <div className="flex-none h-[100cqh] rotate-180 w-[100cqw]">
          <div className="relative size-full" data-name="Vector">
            <svg className="absolute block inset-0 size-full" fill="none" height="32" preserveAspectRatio="none" viewBox="0 0 32 32" width="32">
              <path d={svgPaths.p6ca3800} id="Vector" opacity="0" stroke="#11181C" strokeWidth="0.666667" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
type PropertiesProps = {
  className?: string;
  property1?: "Expanded" | "Closed";
};

function Properties({ className, property1 = "Expanded" }: PropertiesProps) {
  const isClosed = property1 === "Closed";
  return (
    <div className={className || "bg-white relative w-[626px]"}>
      <div aria-hidden className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none" />
      <div className={`content-stretch flex flex-col items-start p-[20px] relative size-full ${isClosed ? "" : "gap-[40px]"}`}>
        <div className={`content-stretch flex items-center justify-between relative shrink-0 ${isClosed ? "w-full" : "h-[20px] w-[586px]"}`}>
          <p className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap">Matte / Shiny</p>
          <Arrow className="relative shrink-0 size-[16px]" />
        </div>
        {property1 === "Expanded" && (
          <div className="relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[40px] items-start pb-[20px] px-[20px] relative size-full">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Frame">
                <div className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#313131] text-[14px] w-full">
                  <p className="leading-[20px] mb-0">Is this Material Matte or Shiny?</p>
                  <p className="leading-[20px] mb-0">What does that even sound like?</p>
                  <p className="leading-[20px]">How would changing the slider effect the sound?</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Slider">
                <div className="relative shrink-0 w-full" data-name="slider-composition">
                  <div className="flex flex-col items-center justify-center size-full">
                    <div className="content-stretch flex flex-col gap-[10px] items-center justify-center relative size-full">
                      <div className="relative shrink-0 w-full" data-name="slider-header">
                        <div className="flex flex-row items-center justify-center size-full">
                          <div className="[word-break:break-word] content-stretch flex font-['forpeople_Season_Sans:Regular',sans-serif] items-center justify-between leading-[20px] not-italic relative size-full text-[#313131] text-[14px]">
                            <p className="flex-[1_0_0] min-w-px relative">Matte</p>
                            <p className="flex-[1_0_0] min-w-px relative text-right">Shiny</p>
                          </div>
                        </div>
                      </div>
                      <div className="h-[28px] relative shrink-0 w-full" data-name="control">
                        <div className="-translate-y-1/2 absolute bg-[#f2f2f2] h-[28px] left-0 opacity-50 right-0 rounded-[28px] top-1/2" data-name="bar" />
                        <div className="-translate-y-1/2 absolute h-[28px] left-0 right-[45.5%] top-1/2" data-name="container">
                          <div className="-translate-y-1/2 absolute bg-[#ebdfd3] h-[28px] left-0 right-0 rounded-[16px] top-1/2" data-name="fill" />
                          <div className="-translate-y-1/2 absolute right-px size-[26px] top-1/2" data-name="slider-thumb">
                            <div className="absolute bg-white border-2 border-[#ebdfd3] border-solid inset-0 rounded-[999px]" data-name="thumb" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Frame">
                <p className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#313131] text-[14px] w-full">Matte / Shiny Sound:</p>
                <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Frame">
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Frame">
                      <div className="bg-[#11181c] content-stretch flex gap-[7.5px] items-center justify-center px-[13.5px] py-[7.5px] relative rounded-[150px] shrink-0" data-name="Frame">
                        <div className="overflow-clip relative shrink-0 size-[7.5px]" data-name="heroicons-outline/pencil">
                          <div className="absolute inset-[9.38%_9.37%_9.38%_9.38%]" data-name="Vector">
                            <div className="absolute inset-[-3.85%]">
                              <svg className="block size-full" fill="none" height="6.5625" preserveAspectRatio="none" viewBox="0 0 6.56251 6.5625" width="6.56251">
                                <path d={svgPaths.p24911900} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.46875" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[15px] not-italic relative shrink-0 text-[10.5px] text-white whitespace-nowrap">Written</p>
                      </div>
                      <div className="bg-[#f2f2f2] content-stretch flex gap-[7.5px] items-center justify-center px-[13.5px] py-[7.5px] relative rounded-[150px] shrink-0" data-name="Frame">
                        <div className="overflow-clip relative shrink-0 size-[7.5px]" data-name="heroicons-outline/musical-note">
                          <div className="absolute inset-[9.38%_18.75%_8.69%_15.63%]" data-name="Vector">
                            <div className="absolute inset-[-3.81%_-4.76%_-3.82%_-4.76%]">
                              <svg className="block size-full" fill="none" height="6.61385" preserveAspectRatio="none" viewBox="0 0 5.39069 6.61385" width="5.39069">
                                <path d={svgPaths.p23d4f080} id="Vector" stroke="#5C5C5C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.46875" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#5c5c5c] text-[10.5px] whitespace-nowrap">Instrument</p>
                      </div>
                      <div className="bg-[#f2f2f2] content-stretch flex gap-[7.5px] items-center justify-center px-[13.5px] py-[7.5px] relative rounded-[150px] shrink-0" data-name="Frame">
                        <div className="overflow-clip relative shrink-0 size-[7.5px]" data-name="heroicons-outline/link">
                          <div className="absolute inset-[9.38%]" data-name="Vector">
                            <div className="absolute inset-[-3.85%]">
                              <svg className="block size-full" fill="none" height="6.5625" preserveAspectRatio="none" viewBox="0 0 6.5625 6.5625" width="6.5625">
                                <path d={svgPaths.p94ef7c0} id="Vector" stroke="#5C5C5C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.46875" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#5c5c5c] text-[10.5px] whitespace-nowrap">Link</p>
                      </div>
                      <div className="bg-[#f2f2f2] content-stretch flex gap-[7.5px] items-center justify-center px-[13.5px] py-[7.5px] relative rounded-[150px] shrink-0" data-name="Frame">
                        <div className="overflow-clip relative shrink-0 size-[7.5px]" data-name="heroicons-outline/microphone">
                          <div className="absolute bottom-[6.25%] left-1/4 right-1/4 top-[6.25%]" data-name="Vector">
                            <div className="absolute inset-[-3.57%_-6.25%]">
                              <svg className="block size-full" fill="none" height="7.03125" preserveAspectRatio="none" viewBox="0 0 4.21875 7.03125" width="4.21875">
                                <path d={svgPaths.p1d428480} id="Vector" stroke="#5C5C5C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.46875" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[15px] not-italic relative shrink-0 text-[#5c5c5c] text-[10.5px] whitespace-nowrap">Microphone</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white h-[40px] min-w-[120px] relative shrink-0 w-full" data-name="Input">
                    <div className="content-stretch flex items-center min-w-[inherit] overflow-clip py-[10px] relative rounded-[inherit] size-full">
                      <p className="[word-break:break-word] flex-[1_0_0] font-['forpeople_Season_Sans:Regular',sans-serif] leading-none min-w-px not-italic relative text-[#949494] text-[14px]">Write what you feel here...</p>
                    </div>
                    <div aria-hidden className="absolute border-[#949494] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Frame">
                <p className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#313131] text-[14px] w-full">How would the sound change:</p>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                  <div className="bg-white h-[40px] min-w-[120px] relative shrink-0 w-full" data-name="Input">
                    <div className="content-stretch flex items-center min-w-[inherit] overflow-clip py-[10px] relative rounded-[inherit] size-full">
                      <p className="[word-break:break-word] flex-[1_0_0] font-['forpeople_Season_Sans:Regular',sans-serif] leading-none min-w-px not-italic relative text-[#949494] text-[14px]">Write what you feel here...</p>
                    </div>
                    <div aria-hidden className="absolute border-[#949494] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
type TagIconProps = {
  className?: string;
  property1?: "Practice";
  tone?: "Dark";
};

function TagIcon({ className, property1 = "Practice", tone = "Dark" }: TagIconProps) {
  return (
    <div className={className || "relative size-[26px]"}>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[26px] top-1/2" data-name="Form">
        <svg className="absolute block inset-0 size-full" fill="none" height="26" preserveAspectRatio="none" viewBox="0 0 26 26" width="26">
          <g id="Form">
            <path d="M12.9961 26V22" id="Vector 35" stroke="black" />
            <path d={svgPaths.p6e713e0} id="Vector 59" stroke="black" />
            <path d="M6.5 24.2578L8.5 20.7937" id="Vector 61" stroke="black" />
            <path d={svgPaths.p19d95800} id="Vector 63" stroke="black" />
            <path d={svgPaths.p15cd5f1c} id="Vector 65" stroke="black" />
            <path d={svgPaths.p1b4e8500} id="Vector 67" stroke="black" />
            <path d="M12.9961 0V4" id="Vector 47" stroke="black" />
            <path d={svgPaths.pf0b5100} id="Vector 60" stroke="black" />
            <path d={svgPaths.p2afcac80} id="Vector 62" stroke="black" />
            <path d={svgPaths.p3cb02400} id="Vector 64" stroke="black" />
            <path d="M24.2578 6.5L20.7937 8.5" id="Vector 66" stroke="black" />
            <path d={svgPaths.p276c5b60} id="Vector 68" stroke="black" />
            <path d="M2.18557e-08 13L4 13" id="Vector 36" stroke="black" />
            <path d={svgPaths.p27064a40} id="Vector 49" stroke="black" />
            <path d="M1.74609 6.5L5.2102 8.5" id="Vector 51" stroke="black" />
            <path d={svgPaths.pe170200} id="Vector 53" stroke="black" />
            <path d={svgPaths.p2fba7300} id="Vector 55" stroke="black" />
            <path d={svgPaths.p29cb4880} id="Vector 57" stroke="black" />
            <path d="M26 13L22 13" id="Vector 48" stroke="black" />
            <path d={svgPaths.p2f07ea80} id="Vector 50" stroke="black" />
            <path d="M24.2617 19.5L20.7976 17.5" id="Vector 52" stroke="black" />
            <path d={svgPaths.p13622800} id="Vector 54" stroke="black" />
            <path d={svgPaths.p12c98bc0} id="Vector 56" stroke="black" />
            <path d={svgPaths.p2281b380} id="Vector 58" stroke="black" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-0">
      <p className="[word-break:break-word] absolute capitalize font-['Season_Sans-TRIAL:Regular',sans-serif] leading-[20px] left-[-0.36px] not-italic text-[#ebdfd3] text-[14px] top-[2px] whitespace-nowrap">More About</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[3px] items-center relative shrink-0">
      <Frame12 />
      <p className="[word-break:break-word] capitalize font-['Season_Sans-TRIAL:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">CMF Research</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[10px] items-center justify-center pl-[5px] pr-[15px] py-[4px] relative rounded-[65px] shrink-0">
      <TagIcon className="relative shrink-0 size-[26px]" />
      <Frame11 />
    </div>
  );
}

function IconContainer() {
  return (
    <div className="bg-white content-stretch flex flex-col isolate items-start justify-center relative rounded-[200px] shrink-0" data-name="Icon Container">
      <div className="h-[44px] relative shrink-0 z-[1]" data-name="Button Test 9">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center relative size-full">
            <Frame10 />
          </div>
        </div>
      </div>
    </div>
  );
}

function TextContainer() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-full" data-name="Text Container">
      <IconContainer />
      <div className="[word-break:break-word] flex flex-col font-['Season_Sans-TRIAL:Regular',sans-serif] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[32px] text-black text-center w-[min-content]">
        <p className="leading-[36px]">Material Labs</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white h-[40px] min-w-[120px] relative shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex items-center min-w-[inherit] overflow-clip py-[10px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['forpeople_Season_Sans:Regular',sans-serif] leading-none min-w-px not-italic relative text-[#949494] text-[16px]">Insert name here</p>
      </div>
      <div aria-hidden className="absolute border-[#949494] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Input />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start pb-[40px] relative shrink-0 w-full" data-name="Frame">
      <p className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap">Name:</p>
      <Frame13 />
    </div>
  );
}

function PlaceholderWrapper() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="placeholderWrapper">
      <ol className="[word-break:break-word] block font-['forpeople_Season_Sans:Regular',sans-serif] leading-[0] list-decimal not-italic relative shrink-0 text-[#5c5c5c] text-[16px] w-[276px]" start="1">
        <li className="ms-[24px]">
          <span className="leading-[20px]">Grey Wool</span>
        </li>
      </ol>
    </div>
  );
}

function Wrapper() {
  return (
    <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
      <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-w-px relative" data-name="Wrapper">
        <PlaceholderWrapper />
      </div>
    </div>
  );
}

function ContentWrapper() {
  return (
    <div className="bg-[#f2f2f2] min-h-[32px] relative shrink-0 w-full" data-name="contentWrapper">
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] px-[20px] py-[12px] relative size-full">
          <Wrapper />
          <Arrow className="relative shrink-0 size-[16px]" />
        </div>
      </div>
    </div>
  );
}

function SelectWrapper() {
  return (
    <div className="content-stretch flex flex-col items-start min-w-[116px] relative rounded-[200px] shrink-0 w-full" data-name="SelectWrapper">
      <ContentWrapper />
    </div>
  );
}

function Select() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Select">
      <SelectWrapper />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Frame">
      <p className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap">Material:</p>
      <div className="bg-white relative shrink-0 w-[626px]" data-name="Material Selection">
        <div className="content-stretch flex flex-col items-start relative size-full">
          <Select />
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['forpeople_Season_Sans:Regular',sans-serif] items-start justify-between leading-[20px] not-italic relative shrink-0 text-[16px] w-full whitespace-nowrap">
      <p className="relative shrink-0 text-black">{`Properties: `}</p>
      <p className="relative shrink-0 text-[#949494] text-right">(pick the 3 which apply most to the material)</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap">Rough / Smooth</p>
      <Arrow className="relative shrink-0 size-[16px]" />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap">Regular/ Irregular</p>
      <Arrow className="relative shrink-0 size-[16px]" />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap">Dense / Open</p>
      <Arrow className="relative shrink-0 size-[16px]" />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap">Natural / Manufactured</p>
      <Arrow className="relative shrink-0 size-[16px]" />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap">Small Texture / Large Texture</p>
      <Arrow className="relative shrink-0 size-[16px]" />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-[586px]">
      <p className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap">Additional Thoughts</p>
      <Arrow className="relative shrink-0 size-[16px]" />
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-[40px] min-w-[120px] relative shrink-0 w-full" data-name="Input">
      <div className="content-stretch flex items-center min-w-[inherit] overflow-clip py-[10px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] flex-[1_0_0] font-['forpeople_Season_Sans:Regular',sans-serif] leading-none min-w-px not-italic relative text-[#949494] text-[14px]">Write what you feel here...</p>
      </div>
      <div aria-hidden className="absolute border-[#949494] border-b border-solid inset-[0_0_-0.5px_0] pointer-events-none" />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Input1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Frame">
      <div className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[#313131] text-[14px] w-full">
        <p className="leading-[20px] mb-0">
          Do you have any other thoughts about this experiments?
          <br aria-hidden />
          What are some potential use cases?
        </p>
        <p className="leading-[20px] mb-0">Has this made you think about materials different?</p>
        <p className="leading-[20px]">What does this kind of insight offer?</p>
      </div>
      <Frame14 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[40px] items-start pb-[20px] px-[20px] relative size-full">
        <Frame4 />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Frame">
      <Frame18 />
      <Properties className="bg-white relative shrink-0 w-[626px]" />
      <div className="bg-white relative shrink-0 w-[626px]" data-name="Properties">
        <div aria-hidden className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Frame15 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[626px]" data-name="Properties">
        <div aria-hidden className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Frame16 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[626px]" data-name="Properties">
        <div aria-hidden className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Frame17 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[626px]" data-name="Properties">
        <div aria-hidden className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Frame19 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[626px]" data-name="Properties">
        <div aria-hidden className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
          <Frame20 />
        </div>
      </div>
      <div className="bg-white relative shrink-0 w-[626px]" data-name="Properties">
        <div aria-hidden className="absolute border border-[#e1e1e1] border-solid inset-0 pointer-events-none" />
        <div className="content-stretch flex flex-col gap-[40px] items-start p-[20px] relative size-full">
          <Frame21 />
          <Frame22 />
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="Frame">
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[20px] py-[12px] relative rounded-[602px] shrink-0" data-name="Frame">
      <div aria-hidden className="absolute border border-black border-solid inset-0 pointer-events-none rounded-[602px]" />
      <p className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap">+ Material</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center py-[40px] relative shrink-0 w-full">
      <Frame5 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="bg-[#ffc600] content-stretch flex items-center justify-center px-[20px] py-[12px] relative rounded-[602px] shrink-0" data-name="Frame">
      <p className="[word-break:break-word] font-['forpeople_Season_Sans:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-black whitespace-nowrap">Submit Response</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <Frame9 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Frame">
      <Frame8 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative rounded-[24px] shrink-0 w-full" data-name="Frame">
      <div className="content-stretch flex flex-col items-start pb-[200px] pt-[80px] px-[40px] relative size-full">
        <Frame7 />
      </div>
    </div>
  );
}

export default function MaterialLabsSubmissionForm() {
  return (
    <div className="bg-[#fdfdfd] content-stretch flex flex-col items-center px-[10px] relative size-full" data-name="Material Labs Submission Form">
      <div className="bg-[#fdfdfd] relative shrink-0 w-[1440px]" data-name="Core Text Block">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col gap-[40px] items-center justify-center pb-[200px] pt-[160px] px-[122px] relative size-full">
            <TextContainer />
            <div className="[word-break:break-word] font-['Season_Sans-TRIAL:Regular',sans-serif] leading-[0] not-italic relative shrink-0 text-[20px] text-black text-center w-[491.011px] whitespace-pre-wrap">
              <p className="leading-[24px] mb-[20px]">Our experimental playground for exploring the sounds which describe 10 distinct materials.</p>
              <p className="leading-[24px] mb-[20px]">We’re looking to collect your thoughts and insights into the way in which a material should sound.</p>
              <p className="leading-[24px] mb-[20px]">{`You can pick three of the most distinctive properties of a material, and use a way to show these sounds. `}</p>
              <p className="leading-[24px]">Written, a link to audio online, with an instrument, or even your voice. Any and all opinions are welcome.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] relative shrink-0 w-[706px]" data-name="Frame">
        <div className="content-stretch flex flex-col items-start p-[40px] relative size-full">
          <Frame />
          <Frame1 />
        </div>
      </div>
      <Frame23 />
      <Frame6 />
    </div>
  );
}