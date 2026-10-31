import React, { useState } from 'react';
import { Sliders, Volume2, VolumeX, Eye, Sparkles, Check, ChevronRight } from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  camera: string;
  colorSpace: string;
  lut: string;
  beforeFilter: string;
  afterFilter: string;
  audioNote: string;
  highlightText: string;
  bgGradientBefore: string;
  bgGradientAfter: string;
}

const PRESETS: Preset[] = [
  {
    id: 'cyberpunk',
    name: 'Neon Midnight Commercial',
    camera: 'RED Monstro 8K VV',
    colorSpace: 'REDWideGamutRGB / Log3G10',
    lut: 'Kodak 2383 Film Print + Teal & Orange Split',
    beforeFilter: 'grayscale(60%) contrast(75%) brightness(105%) saturate(45%)',
    afterFilter: 'contrast(135%) brightness(105%) saturate(140%) hue-rotate(-8deg)',
    audioNote: 'Added synthesized V8 twin-turbo whine, wet asphalt tire spray, and low-frequency sub drop.',
    highlightText: 'Restored deep specular road reflections while isolating skin tones from extreme cyan neon spill.',
    bgGradientBefore: 'from-zinc-700 via-zinc-800 to-zinc-900',
    bgGradientAfter: 'from-cyan-950 via-zinc-950 to-amber-950',
  },
  {
    id: 'alpine',
    name: 'High-Altitude Documentary',
    camera: 'Sony FX6 Cinema Line',
    colorSpace: 'S-Gamut3.Cine / S-Log3',
    lut: 'Fuji ETERNA 250D Soft Highlight Roll-off',
    beforeFilter: 'grayscale(70%) contrast(70%) brightness(115%) saturate(35%)',
    afterFilter: 'contrast(125%) brightness(95%) saturate(120%) sepia(15%)',
    audioNote: 'Removed 45mph summit wind rumble with iZotope RX spectral repair, layered realistic crampon crunches.',
    highlightText: 'Recovered clipped snow highlights on glaciers using DaVinci 32-bit float color science.',
    bgGradientBefore: 'from-slate-600 via-slate-700 to-zinc-800',
    bgGradientAfter: 'from-amber-950 via-blue-950 to-zinc-950',
  },
  {
    id: 'creator',
    name: 'Creator Studio Talking Head',
    camera: 'Sony A7S III (10-bit 4:2:2)',
    colorSpace: 'S-Log3 to Rec.709',
    lut: 'Clean Neutral Skin Tones + Linear Contrast',
    beforeFilter: 'grayscale(50%) contrast(80%) brightness(110%) saturate(50%)',
    afterFilter: 'contrast(120%) brightness(102%) saturate(125%)',
    audioNote: 'Shure SM7B voice EQ, multiband compression, and subtle 40Hz warmth boost.',
    highlightText: 'Face tracking power window with soft skin texture smoothing (DaVinci Face Refinement).',
    bgGradientBefore: 'from-zinc-700 via-zinc-800 to-zinc-800',
    bgGradientAfter: 'from-indigo-950 via-zinc-900 to-purple-950',
  },
];

export const ColorGradeStudio: React.FC = () => {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100%
  const [isAudioMastered, setIsAudioMastered] = useState(true);

  const activePreset = PRESETS[activePresetIndex];

  return (
    <section id="color-studio" className="py-16 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 tracking-wider uppercase mb-2">
            <span>DaVinci Resolve Studio & Audio Lab</span>
            <span aria-hidden="true">·</span>
            <span>Technical Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Before & After: Color Grade & Sound Polish
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
            Drag the interactive slider to compare flat camera RAW log footage against final Hollywood grade. High-ticket clients require pristine color pipelines and rich immersive audio.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-2 p-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto">
          {PRESETS.map((preset, idx) => (
            <button
              key={preset.id}
              onClick={() => setActivePresetIndex(idx)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activePresetIndex === idx
                  ? 'bg-amber-400 text-zinc-950 font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Studio Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Visual Comparison Splitter (Col 8) */}
        <div className="lg:col-span-8 bg-[#0a0a0e] border border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-2xl flex flex-col">
          {/* Interactive Split Frame */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden select-none bg-zinc-950 border border-zinc-800">
            {/* Background Layer: "After" Graded Footage */}
            <div
              className={`absolute inset-0 bg-gradient-to-tr ${activePreset.bgGradientAfter} flex flex-col items-center justify-center p-8`}
              style={{ filter: activePreset.afterFilter }}
            >
              <div className="text-center z-10">
                <span className="text-xs font-mono text-cyan-300 font-semibold uppercase tracking-widest bg-black/60 px-3 py-1 rounded-md border border-cyan-400/30">
                  Rec.709 Mastered Film Grade
                </span>
                <p className="text-white text-lg font-bold mt-3 drop-shadow-md">
                  {activePreset.lut}
                </p>
                <p className="text-xs text-zinc-200 mt-1 max-w-sm drop-shadow">
                  {activePreset.highlightText}
                </p>
              </div>
            </div>

            {/* Clipped Top Layer: "Before" Flat RAW Footage */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-amber-400 shadow-[2px_0_15px_rgba(245,158,11,0.5)] z-20"
              style={{ width: `${sliderPos}%` }}
            >
              <div
                className={`absolute inset-y-0 left-0 w-[100cqi] bg-gradient-to-tr ${activePreset.bgGradientBefore} flex flex-col items-center justify-center p-8`}
                style={{
                  width: 'calc(100% * 100 / var(--slider-w, 100))',
                  filter: activePreset.beforeFilter,
                }}
              >
                <div className="text-center z-10">
                  <span className="text-xs font-mono text-zinc-300 font-medium uppercase tracking-widest bg-black/70 px-3 py-1 rounded-md border border-white/20">
                    Camera RAW / Flat LOG
                  </span>
                  <p className="text-zinc-300 text-lg font-bold mt-3">
                    Unprocessed Sensor Data
                  </p>
                  <p className="text-xs text-zinc-400 mt-1 max-w-sm">
                    {activePreset.camera} · {activePreset.colorSpace}
                  </p>
                </div>
              </div>
            </div>

            {/* Drag Handle on the Divider */}
            <div
              className="absolute inset-y-0 z-30 flex items-center justify-center pointer-events-none"
              style={{ left: `calc(${sliderPos}% - 14px)` }}
            >
              <div className="w-7 h-7 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center shadow-lg border-2 border-black font-bold text-[10px]">
                ⇄
              </div>
            </div>

            {/* Range Slider for user drag */}
            <input
              type="range"
              min={5}
              max={95}
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
              aria-label="Comparison slider for Before and After color grading"
            />

            {/* Quick Labels at bottom */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono pointer-events-none z-30">
              <span className="bg-black/70 text-zinc-300 px-2 py-1 rounded border border-white/10">
                ◀ RAW LOG ({sliderPos}%)
              </span>
              <span className="bg-black/70 text-amber-300 px-2 py-1 rounded border border-amber-400/20">
                GRADED ({100 - sliderPos}%) ▶
              </span>
            </div>
          </div>

          {/* Interactive Scrub Range Bar */}
          <div className="mt-4 flex items-center gap-4">
            <span className="text-xs font-mono text-zinc-400 whitespace-nowrap">
              LOG ({sliderPos}%)
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 accent-amber-400 rounded-lg cursor-pointer"
              aria-label="Color grade split position"
            />
            <span className="text-xs font-mono text-amber-400 whitespace-nowrap">
              MASTERED ({100 - sliderPos}%)
            </span>
          </div>
        </div>

        {/* Technical Data & Sound Design Controls (Col 4) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Color Science Card */}
          <div className="bg-[#0e0e14] border border-zinc-800 p-5 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wide mb-3">
              <Sliders className="w-3.5 h-3.5" />
              <span>Color Science Pipeline</span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <span className="text-zinc-500">Source Profile:</span>
                <p className="text-zinc-200 font-semibold">{activePreset.camera}</p>
                <p className="text-zinc-400 text-[11px]">{activePreset.colorSpace}</p>
              </div>

              <div>
                <span className="text-zinc-500">Finishing LUT / Look:</span>
                <p className="text-amber-300 font-semibold">{activePreset.lut}</p>
              </div>

              <div>
                <span className="text-zinc-500">Grading Suite:</span>
                <p className="text-zinc-200">DaVinci Resolve Studio 19 (ACEScc 32-bit)</p>
              </div>
            </div>
          </div>

          {/* Sound Design & Audio Restoration Toggle */}
          <div className="bg-[#0e0e14] border border-zinc-800 p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wide">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio Mastery</span>
              </div>

              <button
                onClick={() => setIsAudioMastered(!isAudioMastered)}
                className={`text-xs font-mono px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  isAudioMastered
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {isAudioMastered ? 'Mastered EQ ON' : 'Raw Audio'}
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              {isAudioMastered
                ? activePreset.audioNote
                : 'Raw in-camera microphone audio with room reverberation and uncompressed background noise.'}
            </p>

            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>Delivery Format:</span>
              <span className="text-zinc-200">24-bit 48kHz Broadcast WAV</span>
            </div>
          </div>

          {/* Upwork Direct Value Propositon */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-zinc-300 leading-relaxed">
            <p className="font-semibold text-amber-300 mb-1">
              Why Upwork clients care:
            </p>
            Bad colors and tinny audio make high-budget videos feel amateur. Every delivery includes full Hollywood color conversion and multi-layer sound design so your content stands out against 99% of competitors.
          </div>
        </div>
      </div>
    </section>
  );
};
