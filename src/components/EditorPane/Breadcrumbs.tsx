import React from 'react';
import { useVSCode } from '../../context/VSCodeContext';

export const Breadcrumbs: React.FC = () => {
  const { activeFile } = useVSCode();

  if (!activeFile) return null;

  const parts = activeFile.path.split('/');

  return (
    <div className="h-6 bg-[#1e1e1e] border-b border-[#2d2d2d] flex items-center px-4 text-[11px] text-[#858585] select-none font-mono space-x-1 shrink-0">
      <span className="hover:text-[#cccccc] cursor-pointer">PORTFOLIO</span>
      {parts.map((part: string, index: number) => (
        <React.Fragment key={index}>
          <i className="codicon codicon-chevron-right text-[10px] text-[#555555]"></i>
          <span className={`hover:text-[#cccccc] cursor-pointer ${index === parts.length - 1 ? 'text-[#cccccc] font-semibold' : ''}`}>
            {part}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};
