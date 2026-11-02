import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectGallery } from './components/ProjectGallery';
import { Expertise } from './components/Expertise';
import { ColorGradeStudio } from './components/ColorGradeStudio';
import { UpworkProof } from './components/UpworkProof';
import { UpworkCatalog } from './components/UpworkCatalog';
import { PricingCalculator } from './components/PricingCalculator';
import { VideoModal } from './components/VideoModal';
import { Footer } from './components/Footer';
import { Project } from './types/portfolio';
import { PORTFOLIO_PROJECTS } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenProjectById = (projectId: string) => {
    const found = PORTFOLIO_PROJECTS.find((p) => p.id === projectId);
    if (found) {
      setSelectedProject(found);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Bar adhering to Top Bar Contract */}
      <Navbar />

      <main className="flex-1">
        {/* Split-screen Hero with live showreel & James V profile */}
        <Hero
          onOpenProject={handleOpenProjectById}
        />

        {/* Selected Work Portfolio Gallery with Bento grid & category filters */}
        <ProjectGallery onSelectProject={(project) => setSelectedProject(project)} />

        {/* New Expertise Section: Skill Badges with Hover Effects & Certifications */}
        <Expertise />

        {/* Interactive Before & After Color Grading & Audio Studio (DaVinci Resolve) */}
        <ColorGradeStudio />

        {/* Upwork Direct Trust Markers & Guarantees */}
        <UpworkProof onScrollToContact={() => {
          const el = document.getElementById('upwork-catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} />

        {/* Upwork Project Catalog: $15 Starter, $25 Standard, $50 Advanced */}
        <UpworkCatalog />

        {/* Interactive Project Scope & Pricing Estimator */}
        <PricingCalculator />
      </main>

      {/* Fullscreen Video Theater Modal with YouTube Integration */}
      <VideoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Clean, anti-slop Footer (100% Upwork ToS Compliant) */}
      <Footer />
    </div>
  );
}
