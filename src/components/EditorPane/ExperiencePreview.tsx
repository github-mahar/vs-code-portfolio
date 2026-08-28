import React from 'react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const ExperiencePreview: React.FC = () => {
  return (
    <div className="flex-1 bg-[#1e1e1e] text-[#cccccc] p-6 overflow-y-auto font-sans leading-relaxed select-text">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="border-b border-[#3c3c3c] pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <i className="codicon codicon-history text-[#3178c6]"></i> Work Experience & Career Trajectory
            </h1>
            <p className="text-xs text-[#858585] mt-1 font-mono">
              src/experience.ts — Rendered Timeline View
            </p>
          </div>
          <span className="bg-[#007acc]/20 text-[#007acc] text-xs px-2.5 py-1 rounded font-mono border border-[#007acc]/30">
            {PORTFOLIO_DATA.experience.length} Production Entries
          </span>
        </div>

        <div className="space-y-6">
          {PORTFOLIO_DATA.experience.map((item, index) => (
            <div key={index} className="bg-[#252526] border border-[#3c3c3c] p-5 rounded-lg shadow-lg hover:border-[#007acc] transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h3 className="text-xl font-bold text-[#569cd6]">{item.company}</h3>
                <span className="text-xs font-mono text-[#ce9178] bg-[#1e1e1e] px-2 py-0.5 rounded w-fit">{item.period}</span>
              </div>
              <p className="text-sm font-semibold text-[#4ec9b0] mb-3">
                {item.role} {item.location ? `• ${item.location}` : ''}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#cccccc] mb-4">
                {item.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {item.techStack.map(t => (
                  <span key={t} className="bg-[#333333] text-[#9cdcfe] text-[11px] px-2 py-0.5 rounded font-mono">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
