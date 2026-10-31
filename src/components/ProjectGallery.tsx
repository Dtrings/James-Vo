import React, { useState } from 'react';
import { Play, Clock, CheckCircle2, Loader2, ExternalLink, Youtube, Sparkles, AlertCircle } from 'lucide-react';
import { Project, ProjectCategory } from '../types/portfolio';
import { PORTFOLIO_PROJECTS, UPWORK_PROFILE_URL } from '../data/portfolioData';

interface ProjectGalleryProps {
  onSelectProject: (project: Project) => void;
}

const CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'youtube', label: 'YouTube Long-form' },
  { id: 'reels', label: 'Reels & Shorts (9:16)' },
  { id: 'commercial', label: 'Commercials' },
  { id: 'documentary', label: 'Documentary' },
  { id: 'podcast', label: 'Podcast & Interview' },
];

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const filteredProjects = activeCategory === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-16 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 tracking-wider uppercase mb-2">
            <span>Production Showcase</span>
            <span aria-hidden="true">·</span>
            <span>Connected to YouTube</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Selected Work & Real Delivery Times
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl">
            Complete transparency on every project: view verified turnaround times, work-in-progress production stages, and direct links to YouTube.
          </p>
        </div>

        {/* Action & Filter Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium text-red-300 bg-red-950/30 border border-red-800/40 rounded-lg hover:bg-red-900/40 hover:text-white transition-colors"
          >
            <Youtube className="w-3.5 h-3.5 text-red-500" />
            <span>YouTube Channel</span>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </a>

          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900/90 border border-zinc-800 rounded-xl shrink-0">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const isVertical = project.aspect === '9:16';
          const isCompleted = project.status === 'completed';

          return (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group relative bg-[#0e0e12] border border-zinc-800/80 hover:border-amber-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] flex flex-col"
            >
              {/* Media Preview Container */}
              <div
                className={`relative w-full bg-zinc-950 overflow-hidden ${
                  isVertical ? 'aspect-[4/3] md:aspect-[16/10]' : 'aspect-video'
                }`}
              >
                {/* Styled video thumbnail with background gradient & video frame */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.thumbnailGradient} flex items-center justify-center p-4`}
                >
                  {/* Subtle video preview background simulation */}
                  <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
                    <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
                  </div>

                  {/* Play Button center */}
                  <div className="relative text-center z-10 flex flex-col items-center">
                    <div className="w-13 h-13 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-zinc-950 group-hover:scale-110 transition-all shadow-xl">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                    <span className="mt-2 text-xs font-mono text-zinc-300 font-medium bg-black/60 px-2.5 py-0.5 rounded border border-white/10">
                      Preview Cut · {project.duration}
                    </span>
                  </div>
                </div>

                {/* Top Status & Transparency Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
                  {/* Status Tag: Completed vs Work in Progress */}
                  {isCompleted ? (
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{project.completionTime}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-amber-950/90 text-amber-300 border border-amber-500/50 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                      <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                      <span>Work in Progress</span>
                    </span>
                  )}

                  {/* Category format badge */}
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-black/70 text-zinc-300 border border-white/10 backdrop-blur-sm">
                    {project.categoryLabel.split('(')[0].trim()}
                  </span>
                </div>

                {/* Bottom Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e12] via-transparent to-transparent opacity-90" />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Work in progress stage bar if WIP */}
                  {!isCompleted && project.inProgressStage && (
                    <div className="mb-3 p-2 rounded-lg bg-amber-950/30 border border-amber-800/40 text-[11px] font-mono text-amber-300 flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span className="truncate">{project.inProgressStage}</span>
                      </span>
                      <span className="font-bold text-amber-400 ml-1">Active</span>
                    </div>
                  )}

                  {/* Client & View count */}
                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono mb-2">
                    <span className="text-zinc-300 font-medium">{project.client}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-400 font-semibold">{project.views}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* Brief description */}
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Card Footer: YouTube Button & Tools */}
                <div className="mt-4 pt-3.5 border-t border-zinc-800/80 flex items-center justify-between gap-2 text-xs">
                  {/* YouTube Direct Link */}
                  <a
                    href={project.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-red-950/40 border border-zinc-700/60 hover:border-red-500/40 rounded-lg transition-colors cursor-pointer shrink-0"
                    title="Watch video on YouTube"
                  >
                    <Youtube className="w-3.5 h-3.5 text-red-500" />
                    <span>YouTube</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>

                  {/* Software Tags */}
                  <div className="text-[11px] font-mono text-zinc-400 truncate text-right">
                    <span>{project.tools.slice(0, 2).join(' + ')}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
