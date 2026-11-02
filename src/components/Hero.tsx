import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowRight, ShieldCheck, Youtube, ExternalLink, CheckCircle2 } from 'lucide-react';
import { STATS_PROOF, UPWORK_PROFILE_URL } from '../data/portfolioData';

interface HeroProps {
  onOpenProject: (projectId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProject }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('upwork-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-8 pb-16 px-6 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Typographic Hierarchy & Editor Identity */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Editor Identity Header with Avatar */}
            <div className="flex items-center gap-3.5 mb-5 p-2 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 w-fit">
              <img
                src="/assets/aistudio/Chandung_6a75d147.png"
                alt="James V. - Video Editor"
                className="w-12 h-12 rounded-xl object-cover object-top border border-amber-500/30 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">James V.</span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                    Upwork Talent · $15.00/hr
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-mono">
                  DaVinci Resolve Specialist · 30+ hrs/week
                </p>
              </div>
            </div>

            {/* Unboxed clean metadata kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400 mb-3 tracking-wide">
              <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Upwork Talent
              </span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>100% DaVinci Resolve Workflow</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Short-Form & YouTube Video Specialist</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-balance mb-6">
              Scroll-Stopping Short-Form & YouTube Video Editing.
            </h1>

            {/* Lead copy adhering to Upwork ToS and 100% DaVinci Resolve */}
            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl mb-8">
              Need tight, engaging short videos without spending hours in an editor? I edit exclusively in <strong>DaVinci Resolve Studio</strong> to turn raw footage into viral-ready YouTube Shorts, TikToks, Reels, and high-retention long-form videos. Available for direct contracts and milestone orders on Upwork starting at <strong>$15/hr</strong>.
            </p>

            {/* CTAs strictly routing to Upwork */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <a
                href={UPWORK_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] cursor-pointer"
              >
                <span>Hire James on Upwork ($15/hr)</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={scrollToCatalog}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-zinc-200 bg-zinc-900/90 border border-zinc-700/80 hover:border-zinc-500 rounded-xl hover:text-white transition-all cursor-pointer"
              >
                <span>View Upwork Project Tiers ($15–$50)</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={() => onOpenProject('project-1')}
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 text-amber-400" />
                <span>Watch Featured Cut</span>
              </button>
            </div>

            {/* Upwork Direct Guarantees */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-zinc-400 font-normal pt-4 border-t border-zinc-800/60">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Free 30s test sample before contract award
              </span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Fast 24-48h milestone turnaround
              </span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                All communication & escrow on Upwork
              </span>
            </div>
          </div>

          {/* Right Column: Featured Showreel Live Player Container */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative w-full aspect-video lg:h-full lg:min-h-[380px] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col group">
              {/* Actual HTML5 Video stream */}
              <video
                ref={videoRef}
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted={isMuted}
                loop
                playsInline
                aria-label="James V. Video Editing Showreel"
              />

              {/* Video Player Overlay HUD */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

              {/* Top Bar HUD */}
              <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between text-xs font-mono text-zinc-300 pointer-events-auto">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  <Youtube className="w-3.5 h-3.5 text-red-500" />
                  <span>YOUTUBE SHOWREEL // 4K 60FPS</span>
                </div>
                <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                  <button
                    onClick={toggleMute}
                    className="p-1 hover:text-white transition-colors"
                    title={isMuted ? 'Unmute preview' : 'Mute preview'}
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                </div>
              </div>

              {/* Bottom Bar Info & Play Overlay */}
              <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between pointer-events-auto">
                <div>
                  <p className="text-xs text-amber-400 font-mono font-medium">Completed in 24h</p>
                  <p className="text-sm font-semibold text-white drop-shadow-md">High-Retention Pacing & Captions</p>
                  <p className="text-[11px] text-zinc-300">Edited in DaVinci Resolve · Fairlight Audio Stems</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-2.5 bg-amber-400 text-zinc-950 rounded-xl hover:bg-amber-300 transition-colors shadow-lg"
                    aria-label={isPlaying ? 'Pause showreel preview' : 'Play showreel preview'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>
                  <button
                    onClick={() => onOpenProject('project-1')}
                    className="px-3 py-2 text-xs font-semibold text-white bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-xl transition-colors border border-white/20"
                  >
                    Watch Cut
                  </button>
                </div>
              </div>

              {/* Sound wave visualizer animation bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800 flex items-center overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-400 w-full animate-pulse opacity-80" />
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-stat proof strip directly below the hero */}
        <div className="mt-14 pt-8 border-t border-zinc-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_PROOF.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight tabular-nums">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-zinc-200 mt-1">
                {stat.label}
              </span>
              <span className="text-xs text-zinc-400 mt-0.5">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
