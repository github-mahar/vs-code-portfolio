import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export interface Project {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
}

export const PROJECTS_LIST: Project[] = [
  {
    name: "MAEVEN",
    tagline: "Custom Shopify 2.0 Theme",
    description: "A premium, fully custom Shopify 2.0 theme built and sold through EzzCode, focused on performance and flexible section-based customization.",
    tech: ["Shopify Liquid", "JavaScript", "CSS"],
    liveUrl: PORTFOLIO_DATA.website,
    githubUrl: PORTFOLIO_DATA.github,
  },
  {
    name: "ProposalCraft",
    tagline: "AI Upwork Proposal Generator",
    description: "SaaS platform helping freelancers craft personalized, high-converting Upwork proposals in seconds based on job descriptions and developer skill profiles.",
    tech: ["Next.js", "Supabase", "Gemini API"],
    liveUrl: PORTFOLIO_DATA.website,
    githubUrl: PORTFOLIO_DATA.github,
  },
  {
    name: "VS Code Portfolio",
    tagline: "This Website",
    description: "A pixel-accurate, fully interactive VS Code UI clone built as a personal developer portfolio, complete with a working file tree, tabs, and terminal.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    liveUrl: PORTFOLIO_DATA.website,
    githubUrl: PORTFOLIO_DATA.github,
  },
  {
    name: "Imrozia Serene",
    tagline: "Shopify Storefront & Front-End Architecture",
    description: "Engineered custom Shopify 2.0 theme architecture, integrated local payment gateways, automated Cash on Delivery (COD) verification workflows, and optimized mobile site speed.",
    tech: ["Shopify Liquid", "React", "TypeScript", "REST APIs", "COD Automation"],
    liveUrl: PORTFOLIO_DATA.website,
    githubUrl: PORTFOLIO_DATA.github,
  },
  {
    name: "TinyToddz",
    tagline: "E-Commerce Kids Fashion & Apparel Store",
    description: "Custom Shopify store customization with dynamic product catalog filters, mobile-first responsive layout, AJAX cart drawer, and high-conversion checkout flows.",
    tech: ["Shopify Liquid", "JavaScript", "Tailwind CSS"],
    liveUrl: PORTFOLIO_DATA.website,
    githubUrl: PORTFOLIO_DATA.github,
  },
  {
    name: "Abdul Rehman Cheema (ARC)",
    tagline: "Personal Brand & Executive Portfolio Website",
    description: "Sleek, modern web platform designed for personal branding, featuring responsive design system, interactive portfolio showcases, and contact integration.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    liveUrl: PORTFOLIO_DATA.website,
    githubUrl: PORTFOLIO_DATA.github,
  },
];

export const ProjectsPreview: React.FC = () => {
  return (
    <div className="flex-1 bg-[#1e1e1e] text-[#cccccc] p-6 overflow-y-auto font-sans leading-relaxed select-text">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-b border-[#3c3c3c] pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <i className="codicon codicon-symbol-class text-[#61dafb]"></i> Projects Showcase
            </h1>
            <p className="text-xs text-[#858585] mt-1 font-mono">
              src/projects.tsx — Rendered Card Grid View
            </p>
          </div>
          <span className="bg-[#007acc]/20 text-[#007acc] text-xs px-2.5 py-1 rounded font-mono border border-[#007acc]/30">
            {PROJECTS_LIST.length} Projects Loaded
          </span>
        </div>

        <div className="projects-grid space-y-6">
          {PROJECTS_LIST.map((project) => (
            <div key={project.name} className="project-card border border-[#3c3c3c] bg-[#252526] p-5 rounded-lg shadow-lg hover:border-[#007acc] transition">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-[#569cd6]">{project.name}</h3>
              </div>
              <p className="text-[#9cdcfe] text-sm mb-3 font-semibold">{project.tagline}</p>
              <p className="text-[#d4d4d4] text-sm mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span key={tech} className="bg-[#333333] text-[#4ec9b0] text-xs px-2 py-1 rounded font-mono">{tech}</span>
                ))}
              </div>
              <div className="flex gap-4 text-xs font-mono">
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[#3794ff] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  >
                    🚀 Launch App
                  </a>
                )}
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-[#9cdcfe] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  >
                    💻 View Source
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
