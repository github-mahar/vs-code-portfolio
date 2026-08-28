import React from 'react';

interface MinimapProps {
  content: string;
}

export const Minimap: React.FC<MinimapProps> = ({ content }) => {
  const lines = content.split('\n');

  return (
    <div className="w-16 bg-[#1e1e1e] border-l border-[#2d2d2d] hidden lg:block overflow-hidden select-none py-2 px-1 opacity-60 hover:opacity-100 transition shrink-0">
      <div className="space-y-[3px] pointer-events-none scale-[0.6] transform origin-top-left">
        {lines.slice(0, 60).map((line, idx) => (
          <div key={idx} className="h-[2px] bg-[#454545] rounded-full overflow-hidden" style={{ width: `${Math.min(100, Math.max(10, line.length * 2))}%` }}>
            <div className="h-full bg-[#569cd6]/60"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
