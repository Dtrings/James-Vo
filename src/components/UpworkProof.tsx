import React from 'react';
import { ShieldCheck, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';
import { UPWORK_PROFILE_URL, UPWORK_FRESHER_PROMISES } from '../data/portfolioData';

interface UpworkProofProps {
  onScrollToContact: () => void;
}

export const UpworkProof: React.FC<UpworkProofProps> = ({ onScrollToContact }) => {
  return (
    <section id="upwork-proof" className="py-16 px-6 max-w-7xl mx-auto">
      {/* Proof Banner Header */}
      <div className="bg-gradient-to-r from-[#101016] via-[#14141e] to-[#101016] border border-amber-500/20 rounded-3xl p-8 sm:p-10 mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-400 mb-3 tracking-wide">
              <span className="flex items-center gap-1.5 font-bold bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Verified Upwork Talent
              </span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-300">Introductory $15.00/hr Rate</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-emerald-400">100% Focused Attention</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Why Hire James V. on Upwork?
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 mt-3 max-w-2xl leading-relaxed">
              As a dedicated video editor building long-term relationships on Upwork, I treat every project with extreme care and rapid communication. You get senior agency-quality short-form and YouTube editing at an accessible entry rate, plus an optional free 30-second trial cut before contract award.
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-zinc-300 font-mono mt-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Upwork Escrow Milestone Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Free 30s Sample Cut on Your Footage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Fast 24-48h Delivery Turnaround</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
            <a
              href={UPWORK_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg"
            >
              <span>View James's Upwork Profile</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onScrollToContact}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-xl transition-all cursor-pointer"
            >
              <span>Browse Catalog Tiers ($15–$50)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Upwork Fresher Guarantees Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Client Commitments & Transparency
          </h3>
          <span className="text-xs font-mono text-amber-400">
            100% Satisfaction Guarantee
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UPWORK_FRESHER_PROMISES.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0e0e14] border border-zinc-800/80 hover:border-zinc-700 p-6 rounded-2xl flex flex-col justify-between transition-colors shadow-lg"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center font-bold text-xs font-mono">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {item.title}
                  </h4>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Standard Delivery</span>
                <span className="text-emerald-400 font-semibold">Verified on Upwork</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
