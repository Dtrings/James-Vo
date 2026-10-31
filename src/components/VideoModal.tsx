import React, { useRef, useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Clock, CheckCircle2, Loader2, ArrowRight, Youtube, ExternalLink } from 'lucide-react';
import { Project } from '../types/portfolio';
import { UPWORK_PROFILE_URL } from '../data/portfolioData';

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [useYouTubePlayer, setUseYouTubePlayer] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && videoRef.current && !useYouTubePlayer) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, useYouTubePlayer]);

  useEffect(() => {
    if (project && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [project]);

  if (!project) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const targetTime = Number(e.target.value);
    videoRef.current.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const toggleFullScreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const isCompleted = project.status === 'completed';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0c0c10] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl my-8 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#09090c]">
          <div className="flex items-center gap-3">
            {isCompleted ? (
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{project.completionTime}</span>
              </span>
            ) : (
              <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>Work in Progress</span>
              </span>
            )}

            <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
              Category: <strong className="text-zinc-200">{project.categoryLabel}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors shadow-sm"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3 h-3 text-red-200" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto">
          {/* Main Video Theater */}
          <div className="relative w-full bg-black aspect-video flex items-center justify-center group">
            {useYouTubePlayer ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${project.youtubeVideoId}?autoplay=1&rel=0`}
                title={project.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={project.videoSrc}
                  className="w-full h-full object-contain"
                  playsInline
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  onClick={togglePlay}
                />

                {/* Video Controls Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 flex flex-col gap-2 transition-opacity duration-200">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-zinc-700 accent-amber-400 rounded-lg cursor-pointer"
                    aria-label="Video scrubber"
                  />

                  <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={togglePlay}
                        className="p-1.5 hover:text-white transition-colors"
                        aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                      </button>
                      <button
                        onClick={toggleMute}
                        className="p-1.5 hover:text-white transition-colors"
                        aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                      </button>
                      <span>
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setUseYouTubePlayer(true)}
                        className="text-[11px] text-zinc-300 hover:text-white underline cursor-pointer"
                      >
                        Switch to YouTube Embed Player
                      </button>
                      <button
                        onClick={toggleFullScreen}
                        className="p-1.5 hover:text-white transition-colors"
                        aria-label="Enter fullscreen"
                      >
                        <Maximize className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Project Details Section */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Header info & primary action */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-zinc-800">
              <div>
                <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white">
                  {project.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 font-mono mt-2">
                  <span className="text-amber-400 font-semibold">{project.views}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-400 font-semibold">{project.retention}</span>
                  <span aria-hidden="true">·</span>
                  <span>Timeline: {project.turnaround}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={UPWORK_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md cursor-pointer"
                >
                  <span>Order on Upwork ($15/hr)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Production Breakdown: Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#13131a] p-5 rounded-xl border border-zinc-800">
                <h4 className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider mb-2">
                  01. The Video Challenge
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="bg-[#13131a] p-5 rounded-xl border border-zinc-800">
                <h4 className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                  02. DaVinci Resolve Solution
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Deliverables & Software Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  Scope & Deliverables
                </h4>
                <ul className="space-y-2">
                  {project.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  Editing Software Used (100% DaVinci)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-900 text-zinc-200 border border-zinc-700/60"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* YouTube Direct Link Callout */}
            <div className="p-4 rounded-xl bg-red-950/20 border border-red-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-300">
              <div className="flex items-center gap-3">
                <Youtube className="w-6 h-6 text-red-500 shrink-0" />
                <div>
                  <p className="font-semibold text-white">Uploaded to YouTube</p>
                  <p className="text-zinc-400 text-[11px]">All portfolio videos are hosted and streamable directly on YouTube.</p>
                </div>
              </div>
              <a
                href={project.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs shrink-0 self-start sm:self-auto"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
