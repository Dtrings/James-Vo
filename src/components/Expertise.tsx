import React, { useState } from 'react';
import { Award, CheckCircle2, Cpu, Sliders, Volume2, Wand2, Film, Type, Sparkles, Layers } from 'lucide-react';
import { EXPERTISE_SKILLS } from '../data/portfolioData';
import { SkillExpertise } from '../types/portfolio';

export const Expertise: React.FC = () => {
  const [activeSkillId, setActiveSkillId] = useState<string>(EXPERTISE_SKILLS[0].id);

  const getCategoryIcon = (category: SkillExpertise['category']) => {
    switch (category) {
      case 'editing':
        return <Film className="w-4 h-4 text-amber-400" />;
      case 'color':
        return <Sliders className="w-4 h-4 text-cyan-400" />;
      case 'audio':
        return <Volume2 className="w-4 h-4 text-emerald-400" />;
      case 'motion':
        return <Layers className="w-4 h-4 text-violet-400" />;
      case 'shortform':
        return <Sparkles className="w-4 h-4 text-rose-400" />;
      case 'delivery':
        return <Cpu className="w-4 h-4 text-blue-400" />;
      default:
        return <Award className="w-4 h-4 text-amber-400" />;
    }
  };

  const activeSkill = EXPERTISE_SKILLS.find((s) => s.id === activeSkillId) || EXPERTISE_SKILLS[0];

  return (
    <section id="expertise" className="py-16 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="mb-10 pb-6 border-b border-zinc-800/80">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 tracking-wider uppercase mb-2">
          <span>Technical Arsenal</span>
          <span aria-hidden="true">·</span>
          <span>DaVinci Resolve Ecosystem Only</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Editing Expertise & Certified Skills
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          I edit exclusively inside Blackmagic DaVinci Resolve Studio for flawless 32-bit color science, Fairlight audio mastering, and clean 4K exports. Hover or select any skill badge below to view verified experience and technical depth.
        </p>
      </div>

      {/* Main Grid: Interactive Skill Badges & Detailed Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Skill Badges Grid (Col 7) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {EXPERTISE_SKILLS.map((skill) => {
            const isSelected = activeSkillId === skill.id;

            return (
              <div
                key={skill.id}
                onMouseEnter={() => setActiveSkillId(skill.id)}
                onClick={() => setActiveSkillId(skill.id)}
                className={`group relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer select-none flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-900 border-amber-400/90 shadow-[0_0_20px_rgba(245,158,11,0.15)] ring-1 ring-amber-400/30'
                    : 'bg-[#0e0e14] border-zinc-800/90 hover:border-zinc-700 hover:bg-zinc-900/60'
                }`}
                tabIndex={0}
                role="button"
                aria-label={`Inspect ${skill.name} skill`}
              >
                <div>
                  {/* Badge Header: Category icon & Years of Experience pill */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      {getCategoryIcon(skill.category)}
                      <span className="truncate">{skill.categoryLabel}</span>
                    </div>

                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-black/60 text-amber-300 border border-amber-400/30 whitespace-nowrap">
                      {skill.yearsExperience}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {skill.name}
                  </h3>

                  {/* Quick summary line */}
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {skill.summary}
                  </p>
                </div>

                {/* Hover Reveal Strip */}
                <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-500 truncate max-w-[65%]">
                    {skill.primaryTool}
                  </span>
                  <span className="text-emerald-400 font-semibold group-hover:underline">
                    View Specs →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Capability Card (Col 5) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-[#0b0b12] border border-amber-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header info */}
            <div className="pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
                {getCategoryIcon(activeSkill.category)}
                <span>{activeSkill.categoryLabel}</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="text-zinc-400">{activeSkill.proficiencyLevel} Level</span>
              </div>

              <h3 className="text-2xl font-extrabold text-white tracking-tight">
                {activeSkill.name}
              </h3>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-amber-950/60 text-amber-300 border border-amber-500/30">
                  {activeSkill.yearsExperience}
                </span>
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-700/60">
                  {activeSkill.certificationStatus}
                </span>
              </div>
            </div>

            {/* In-depth description */}
            <div className="py-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-b border-zinc-800">
              <p>{activeSkill.summary}</p>
            </div>

            {/* Key Techniques Checklist */}
            <div className="py-5 border-b border-zinc-800 space-y-2.5">
              <p className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                Production Standards & Techniques:
              </p>
              {activeSkill.keyTechniques.map((tech, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>

            {/* Software Environment Note */}
            <div className="pt-5 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Primary Environment:</span>
              <span className="text-amber-400 font-bold">{activeSkill.primaryTool}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
