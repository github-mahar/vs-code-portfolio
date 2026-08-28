import React from 'react';
import { useVSCode } from '../../context/VSCodeContext';
import type { FileItem } from '../../types/vscode';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

interface MarkdownPreviewProps {
  file: FileItem;
}

export const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ file }) => {
  const { openTab, files } = useVSCode();

  const handleLinkClick = (targetName: string, e: React.MouseEvent) => {
    e.preventDefault();
    const target = files.find(f => f.name.toLowerCase() === targetName.toLowerCase() || f.path.toLowerCase() === targetName.toLowerCase());
    if (target) {
      openTab(target);
    }
  };

  return (
    <div className="flex-1 bg-[#1e1e1e] text-[#cccccc] p-6 overflow-y-auto font-sans leading-relaxed select-text">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* README.md Render */}
        {file.name === 'README.md' && (
          <div className="space-y-6">
            {/* Header Hero Banner */}
            <div className="border-b border-[#3c3c3c] pb-5 mb-2">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                  <h1 className="text-3xl font-extrabold text-white flex items-center gap-2 leading-tight">
                    {PORTFOLIO_DATA.name} <span className="text-[#007acc] text-xl">🚀</span>
                  </h1>
                  <p className="text-lg text-[#569cd6] font-medium mt-0.5">{PORTFOLIO_DATA.title}</p>
                  <p className="text-xs text-[#858585] mt-1.5 flex items-center gap-2">
                    <span>📍 {PORTFOLIO_DATA.location}</span>
                    <span>•</span>
                    <a href={`mailto:${PORTFOLIO_DATA.email}`} className="text-[#3794ff] hover:underline">
                      {PORTFOLIO_DATA.email}
                    </a>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href={PORTFOLIO_DATA.website} target="_blank" rel="noreferrer" className="bg-[#007acc] text-white text-xs px-3 py-1.5 rounded hover:bg-[#0062a3] font-medium flex items-center gap-1 transition">
                    <i className="codicon codicon-globe"></i> Website
                  </a>
                  <a href={PORTFOLIO_DATA.github} target="_blank" rel="noreferrer" className="bg-[#333333] text-white text-xs px-3 py-1.5 rounded hover:bg-[#444444] font-medium flex items-center gap-1 transition">
                    <i className="codicon codicon-github"></i> GitHub
                  </a>
                  <a href={PORTFOLIO_DATA.linkedin} target="_blank" rel="noreferrer" className="bg-[#0e76a8] text-white text-xs px-3 py-1.5 rounded hover:bg-[#0b5c83] font-medium flex items-center gap-1 transition">
                    <i className="codicon codicon-linkedin"></i> LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Bio Callout */}
            <div className="bg-[#252526] border-l-4 border-[#007acc] p-3.5 px-4 rounded-r shadow mt-4">
              <h3 className="font-bold text-white mb-1 flex items-center gap-2">
                <i className="codicon codicon-info text-[#007acc]"></i> Welcome to my VS Code IDE Portfolio
              </h3>
              <p className="text-sm text-[#cccccc] leading-relaxed">
                {PORTFOLIO_DATA.bio}
              </p>
            </div>

            {/* Portfolio Files Navigation Grid */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3 border-b border-[#3c3c3c] pb-2">
                📂 Workspace Files & Interactive Tabs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div 
                  onClick={(e) => handleLinkClick('experience.ts', e)}
                  className="p-3 bg-[#252526] border border-[#3c3c3c] rounded hover:border-[#007acc] cursor-pointer transition group"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-[#3178c6] mb-1">
                    <span className="font-mono">src/experience.ts</span>
                    <i className="codicon codicon-arrow-right opacity-0 group-hover:opacity-100 transition"></i>
                  </div>
                  <p className="text-xs text-[#858585]">Imrozia Serene, EzzCode, DevelopersHub, and Soft Pulses experience.</p>
                </div>

                <div 
                  onClick={(e) => handleLinkClick('projects.tsx', e)}
                  className="p-3 bg-[#252526] border border-[#3c3c3c] rounded hover:border-[#007acc] cursor-pointer transition group"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-[#61dafb] mb-1">
                    <span className="font-mono">src/projects.tsx</span>
                    <i className="codicon codicon-arrow-right opacity-0 group-hover:opacity-100 transition"></i>
                  </div>
                  <p className="text-xs text-[#858585]">MAEVEN, ProposalCraft, VS Code Portfolio & Client Showcases.</p>
                </div>

                <div 
                  onClick={(e) => handleLinkClick('skills.json', e)}
                  className="p-3 bg-[#252526] border border-[#3c3c3c] rounded hover:border-[#007acc] cursor-pointer transition group"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-[#fbc02d] mb-1">
                    <span className="font-mono">src/skills.json</span>
                    <i className="codicon codicon-arrow-right opacity-0 group-hover:opacity-100 transition"></i>
                  </div>
                  <p className="text-xs text-[#858585]">React.js, TypeScript, REST APIs, Supabase, Tailwind CSS skill matrix.</p>
                </div>

                <div 
                  onClick={(e) => handleLinkClick('certifications.md', e)}
                  className="p-3 bg-[#252526] border border-[#3c3c3c] rounded hover:border-[#007acc] cursor-pointer transition group"
                >
                  <div className="flex items-center justify-between text-sm font-bold text-[#42a5f5] mb-1">
                    <span className="font-mono">src/certifications.md</span>
                    <i className="codicon codicon-arrow-right opacity-0 group-hover:opacity-100 transition"></i>
                  </div>
                  <p className="text-xs text-[#858585]">Claude.ai Anthropic, Government eHunhar Full Stack, and Daraz VA certifications.</p>
                </div>
              </div>
            </div>

            {/* Terminal Command Cheat Sheet */}
            <div>
              <h2 className="text-xl font-bold text-white mb-3 border-b border-[#3c3c3c] pb-2">
                💻 Terminal Easter Eggs
              </h2>
              <div className="bg-[#2d2d2d] p-4 rounded font-mono text-xs text-[#9cdcfe] space-y-2 border border-[#3c3c3c]">
                <p><span className="text-[#569cd6]">$</span> <span className="text-[#ce9178]">neofetch</span> — Show installed packages & developer specs</p>
                <p><span className="text-[#569cd6]">$</span> <span className="text-[#ce9178]">whoami</span> — Display author bio</p>
                <p><span className="text-[#569cd6]">$</span> <span className="text-[#ce9178]">sudo hire-me</span> — Direct contact action</p>
                <p><span className="text-[#569cd6]">$</span> <span className="text-[#ce9178]">open contact.json</span> — Open interactive form</p>
              </div>
            </div>
          </div>
        )}

        {/* about.md Render */}
        {file.name === 'about.md' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white border-b border-[#3c3c3c] pb-2">
              About Mahar Ghulam Muhammad (GM)
            </h1>

            <div className="bg-[#252526] border border-[#3c3c3c] p-4 rounded-lg">
              <h3 className="text-lg font-bold text-[#569cd6] mb-1">🎓 Education</h3>
              <p className="text-sm font-semibold text-white">BS Computer Science | University of Lahore</p>
              <p className="text-xs text-[#858585] mb-2">Nov 2023 – Nov 2027 • GPA: 3.67</p>
              <p className="text-xs text-[#cccccc]"><strong className="text-[#4ec9b0]">Relevant Coursework:</strong> Data Structures, Web Technologies, Software Engineering</p>
            </div>

            <div className="space-y-4 text-sm text-[#cccccc]">
              <h3 className="text-lg font-semibold text-[#569cd6]">🎯 Professional Summary</h3>
              <p className="leading-relaxed">
                {PORTFOLIO_DATA.bio}
              </p>

              <h3 className="text-lg font-semibold text-[#569cd6]">🛠️ Core Competencies</h3>
              <ul className="list-disc pl-5 space-y-2 text-[#cccccc]/90">
                <li><strong className="text-white">React & TypeScript Front-End:</strong> Works daily in React.js, TypeScript, and Vite with hands-on experience integrating REST APIs and payment gateways.</li>
                <li><strong className="text-white">Full-Stack & Integrations:</strong> REST APIs, Supabase, Row-Level Security, Make.com, Anthropic/Gemini APIs.</li>
                <li><strong className="text-white">E-Commerce & Performance:</strong> Live revenue-generating stores, mobile-first responsive component builds, SEO & Lighthouse performance optimization.</li>
              </ul>
            </div>
          </div>
        )}

        {/* certifications.md Render */}
        {file.name === 'certifications.md' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white border-b border-[#3c3c3c] pb-2">
              Verified Certifications & Training
            </h1>

            <div className="space-y-4">
              {PORTFOLIO_DATA.certifications.map((cert, index) => (
                <div key={index} className="bg-[#252526] border border-[#3c3c3c] p-4 rounded hover:border-[#007acc] transition">
                  <div className="flex items-center space-x-2 text-lg font-bold text-[#4ec9b0] mb-1">
                    <i className="codicon codicon-verified text-xl text-[#007acc]"></i>
                    <span>{cert.title}</span>
                  </div>
                  <p className="text-xs text-[#569cd6] font-semibold mb-2">Issued by: {cert.issuer}</p>
                  <p className="text-sm text-[#cccccc]">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
