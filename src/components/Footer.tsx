import React from 'react';
import { ExternalLink } from 'lucide-react';
import { UPWORK_PROFILE_URL } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#060608] py-12 px-6 text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <span className="font-display font-bold text-sm text-zinc-200">
            James V. Studio
          </span>
          <span aria-hidden="true" className="hidden sm:inline text-zinc-700">·</span>
          <span>Short-Form & YouTube Video Editing · Ho Chi Minh City</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#work"
            className="hover:text-zinc-300 transition-colors"
          >
            Portfolio
          </a>
          <a
            href="#color-studio"
            className="hover:text-zinc-300 transition-colors"
          >
            Color & Sound
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition-colors inline-flex items-center gap-1"
          >
            <span>YouTube Uploads</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href={UPWORK_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors inline-flex items-center gap-1 font-semibold text-zinc-300"
          >
            <span>Hire on Upwork ($15/hr)</span>
            <ExternalLink className="w-3 h-3 text-amber-400" />
          </a>
        </div>

        <div>
          <span>© {new Date().getFullYear()} James V. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
