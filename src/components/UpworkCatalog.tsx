import React from 'react';
import { ShieldCheck, Check, Clock, ExternalLink, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { UPWORK_PROJECT_TIERS, UPWORK_PROFILE_URL } from '../data/portfolioData';

export const UpworkCatalog: React.FC = () => {
  return (
    <section id="upwork-catalog" className="py-16 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-10 pb-6 border-b border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 tracking-wider uppercase mb-2">
          <span>Upwork Project Catalog</span>
          <span aria-hidden="true">·</span>
          <span>Fixed-Price & Hourly Services</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Priced & Ready to Go on Upwork
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Order a fixed-price project tier or initiate an hourly contract ($15/hr). In full compliance with Upwork Terms of Service, all project communications, files, and escrow milestone payments are handled securely through Upwork.
        </p>
      </div>

      {/* Upwork ToS Compliance Assurance Card */}
      <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-300">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="font-bold text-white text-sm">Upwork Terms of Service Compliant</p>
            <p className="text-zinc-400 text-xs font-sans mt-0.5">
              This portfolio exists solely to showcase video editing capabilities and project results. All client communication and contracts take place exclusively on Upwork.
            </p>
          </div>
        </div>

        <a
          href={UPWORK_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold text-xs transition-colors shrink-0 whitespace-nowrap shadow-md"
        >
          <span>Message on Upwork</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 3-Tier Upwork Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {UPWORK_PROJECT_TIERS.map((tier) => {
          const isRecommended = tier.recommended;

          return (
            <div
              key={tier.id}
              className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                isRecommended
                  ? 'bg-[#101018] border-2 border-amber-400/90 shadow-[0_0_25px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/40 -translate-y-1'
                  : 'bg-[#0d0d12] border border-zinc-800/90 hover:border-zinc-700'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                    {tier.name.split(':')[0]}
                  </span>
                  {isRecommended && (
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400 text-zinc-950 shadow-sm">
                      Most Popular
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="py-2 mb-3">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-extrabold text-white font-display tabular-nums">
                      ${tier.price}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">/ project</span>
                  </div>
                  <h3 className="text-base font-bold text-zinc-200 mt-2">
                    {tier.name.includes(':') ? tier.name.split(':')[1].trim() : tier.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* Delivery & Specs */}
                <div className="py-4 border-y border-zinc-800/80 space-y-2 text-xs font-mono text-zinc-300">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Delivery Time:</span>
                    <span className="text-white font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {tier.deliveryTime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Footage Provided:</span>
                    <span className="text-zinc-200">Up to {tier.footageMinutes} min(s)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Running Time:</span>
                    <span className="text-zinc-200">Up to {tier.runningMinutes} min(s)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-500">Included Revisions:</span>
                    <span className="text-emerald-400 font-semibold">{tier.revisions}</span>
                  </div>
                </div>

                {/* Inclusions */}
                <div className="py-4 space-y-2 text-xs">
                  <p className="text-[11px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                    Included Capabilities:
                  </p>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>DaVinci Color Correction</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Fairlight Sound Design & Audio Mix</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Viral Subtitles & Word Tracking</span>
                  </div>
                  {tier.features.motionGraphics && (
                    <div className="flex items-center gap-2 text-zinc-300 font-medium">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-amber-300">DaVinci Fusion Motion Graphics</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button: Direct Upwork Order */}
              <div className="pt-4">
                <a
                  href={UPWORK_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-md ${
                    isRecommended
                      ? 'bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                  }`}
                >
                  <span>Hire on Upwork (${tier.price})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upwork Direct Contract & Hourly Callout */}
      <div className="mt-12 bg-gradient-to-r from-[#0c0c14] to-[#12121c] border border-zinc-800 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Need an Ongoing Channel Editor or Custom Milestone?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
            James V. is available for 30+ hours per week at an introductory rate of <strong>$15.00/hr</strong> on Upwork, or custom milestone contracts.
          </p>
        </div>

        <a
          href={UPWORK_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shrink-0 shadow-lg"
        >
          <span>Open Upwork Direct Contract</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
