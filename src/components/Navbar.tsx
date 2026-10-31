import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { UPWORK_PROFILE_URL } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-[#08080a]/90 backdrop-blur-md border-b border-zinc-800/80 px-6 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand title, one line */}
        <a href="#hero" className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          <span className="font-display tracking-normal">James V. Studio</span>
        </a>

        {/* Zone 2: 4-5 nav links, 1-2 word labels, single-line */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400">
          <a href="#work" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Portfolio
          </a>
          <a href="#expertise" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Expertise
          </a>
          <a href="#color-studio" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Color & Sound
          </a>
          <a href="#upwork-catalog" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Upwork Catalog
          </a>
          <a href="#pricing" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Rates
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={UPWORK_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-zinc-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg hover:from-amber-300 hover:to-amber-400 active:scale-98 transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Hire on Upwork ($15/hr)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
