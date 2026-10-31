import React, { useState } from 'react';
import { Calculator, Clock, Check, ArrowRight, ExternalLink, Copy, Sparkles } from 'lucide-react';
import { PricingOptions } from '../types/portfolio';
import { calculateEstimate, formatCurrency } from '../utils/pricing';
import { UPWORK_PROFILE_URL } from '../data/portfolioData';

export const PricingCalculator: React.FC = () => {
  const [options, setOptions] = useState<PricingOptions>({
    projectType: 'youtube',
    footageVolume: 'small',
    turnaround: 'priority_48h',
    hasColorGrade: true,
    hasSoundDesign: true,
    hasMotionGraphics: false,
    hasThumbnail: false,
  });

  const [copiedEstimate, setCopiedEstimate] = useState(false);

  const estimate = calculateEstimate(options);

  const formatLabels: Record<PricingOptions['projectType'], string> = {
    youtube: 'YouTube Long-form (8-15 min)',
    reels: 'Reels / TikTok Batch (9:16)',
    commercial: 'Brand Commercial / Promo',
    documentary: 'Narrative Documentary',
    podcast: 'Podcast / Multicam Edit',
  };

  const volumeLabels: Record<PricingOptions['footageVolume'], { title: string; desc: string }> = {
    small: { title: '< 15 mins Raw', desc: 'Single camera / tight takes' },
    medium: { title: '15–30 mins Raw', desc: 'Standard 2-take recording' },
    large: { title: '30–60 mins Raw', desc: 'Extensive B-roll & multi-take' },
    massive: { title: '60+ mins Raw', desc: 'Multi-cam or unscripted vlog' },
  };

  const turnaroundLabels: Record<PricingOptions['turnaround'], { title: string; badge: string }> = {
    standard_4d: { title: 'Standard (3–4 Days)', badge: 'Normal queue' },
    priority_48h: { title: 'Priority (48 Hours)', badge: 'Recommended' },
    rush_24h: { title: 'Rush Express (24 Hours)', badge: '+60% rush' },
  };

  const copyEstimateToClipboard = () => {
    const text = `Upwork Project Estimate:
Format: ${formatLabels[options.projectType]}
Raw Footage: ${volumeLabels[options.footageVolume].title}
Turnaround: ${turnaroundLabels[options.turnaround].title}
Estimated Rate: ${formatCurrency(estimate.finalPrice)} (~${estimate.estimatedHours} hours)
Inclusions:
${estimate.summaryList.map((item) => `- ${item}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedEstimate(true);
    setTimeout(() => setCopiedEstimate(false), 2000);
  };

  return (
    <section id="pricing" className="py-16 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 tracking-wider uppercase mb-2">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Scope & Quote Estimator</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Clear, Transparent Project Estimates
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Estimate custom milestones or channel retainer pricing. In full adherence to Upwork rules, all contracts, project files, and payments are executed securely through Upwork.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Project Format */}
          <div className="bg-[#0e0e14] border border-zinc-800 p-5 rounded-2xl">
            <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wide mb-3">
              1. Select Video Format
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(Object.keys(formatLabels) as Array<PricingOptions['projectType']>).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOptions({ ...options, projectType: type })}
                  className={`p-3 text-left rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    options.projectType === type
                      ? 'bg-amber-400/10 border-amber-400 text-amber-300 shadow-sm'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <p className="font-semibold text-white">{formatLabels[type].split('(')[0]}</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {formatLabels[type].includes('(') ? `(${formatLabels[type].split('(')[1]}` : ''}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Raw Footage Volume */}
          <div className="bg-[#0e0e14] border border-zinc-800 p-5 rounded-2xl">
            <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wide mb-3">
              2. Raw Footage Volume to Sift & Cut
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(volumeLabels) as Array<PricingOptions['footageVolume']>).map((vol) => (
                <button
                  key={vol}
                  type="button"
                  onClick={() => setOptions({ ...options, footageVolume: vol })}
                  className={`p-3 text-left rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    options.footageVolume === vol
                      ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <p className="font-semibold text-white">{volumeLabels[vol].title}</p>
                  <p className="text-[10px] text-zinc-400 mt-0.5 truncate">{volumeLabels[vol].desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Turnaround Speed */}
          <div className="bg-[#0e0e14] border border-zinc-800 p-5 rounded-2xl">
            <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wide mb-3">
              3. Turnaround Delivery Speed
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(Object.keys(turnaroundLabels) as Array<PricingOptions['turnaround']>).map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => setOptions({ ...options, turnaround: speed })}
                  className={`p-3 text-left rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    options.turnaround === speed
                      ? 'bg-amber-400/10 border-amber-400 text-amber-300'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <p className="font-semibold text-white">{turnaroundLabels[speed].title}</p>
                  <span className="inline-block mt-1 text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/50 text-zinc-300 border border-white/10">
                    {turnaroundLabels[speed].badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Add-on Capabilities (100% DaVinci Resolve) */}
          <div className="bg-[#0e0e14] border border-zinc-800 p-5 rounded-2xl">
            <label className="block text-xs font-mono font-semibold text-zinc-300 uppercase tracking-wide mb-3">
              4. Additional Production Upgrades
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.hasColorGrade}
                  onChange={(e) => setOptions({ ...options, hasColorGrade: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-400 accent-amber-400"
                />
                <div>
                  <p className="text-xs font-semibold text-white">DaVinci Color Grade (+$65)</p>
                  <p className="text-[11px] text-zinc-400">ACES / 32-bit float film emulation</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.hasSoundDesign}
                  onChange={(e) => setOptions({ ...options, hasSoundDesign: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-400 accent-amber-400"
                />
                <div>
                  <p className="text-xs font-semibold text-white">Fairlight Sound Design (+$55)</p>
                  <p className="text-[11px] text-zinc-400">Foley, voice EQ & loudness mastering</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.hasMotionGraphics}
                  onChange={(e) => setOptions({ ...options, hasMotionGraphics: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-400 accent-amber-400"
                />
                <div>
                  <p className="text-xs font-semibold text-white">DaVinci Fusion Motion (+$95)</p>
                  <p className="text-[11px] text-zinc-400">Node-based tracking & title cards</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.hasThumbnail}
                  onChange={(e) => setOptions({ ...options, hasThumbnail: e.target.checked })}
                  className="w-4 h-4 rounded text-amber-400 accent-amber-400"
                />
                <div>
                  <p className="text-xs font-semibold text-white">High-CTR Cover Frame (+$45)</p>
                  <p className="text-[11px] text-zinc-400">Frame capture & bold typography</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary Sticky Card (Col 5) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-[#0b0b10] border border-amber-500/30 rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <span className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                Estimated Project Rate
              </span>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                Upwork Milestone
              </span>
            </div>

            {/* Price Large Display */}
            <div className="py-6">
              <div className="text-4xl sm:text-5xl font-extrabold text-white font-display tracking-tight tabular-nums">
                {formatCurrency(estimate.finalPrice)}
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-2">
                Approx. {estimate.estimatedHours} production hours · Revisions included
              </p>
            </div>

            {/* Inclusions summary */}
            <div className="space-y-2.5 pb-6 border-b border-zinc-800 text-xs">
              <p className="text-zinc-400 font-mono font-semibold uppercase tracking-wider text-[11px]">
                Included in This Estimate:
              </p>
              {estimate.summaryList.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-zinc-300">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
              <div className="flex items-start gap-2 text-zinc-300">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Commercial royalty-free music licensing</span>
              </div>
              <div className="flex items-start gap-2 text-zinc-300">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>DaVinci Resolve project archive handover</span>
              </div>
            </div>

            {/* Action Buttons: Direct Upwork Hire & Copy Quote */}
            <div className="pt-6 space-y-3">
              <a
                href={UPWORK_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] cursor-pointer"
              >
                <span>Hire James on Upwork</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={copyEstimateToClipboard}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium text-zinc-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors cursor-pointer"
              >
                {copiedEstimate ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Estimate Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Estimate for Upwork Message</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-zinc-500 text-center mt-1">
                All communications and milestone contracts are handled strictly via Upwork.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
