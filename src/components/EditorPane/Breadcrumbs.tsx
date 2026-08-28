import React from 'react';
import { useVSCode } from '../../context/VSCodeContext';

export const Breadcrumbs: React.FC = () => {
  const { activeFile, activeViewMode, toggleMarkdownViewMode } = useVSCode();

  if (!activeFile) return null;

  const parts = activeFile.path.split('/');
  const isPreviewable = activeFile.type === 'markdown' || activeFile.type === 'json' || activeFile.name.endsWith('.json') || activeFile.name === 'projects.tsx' || activeFile.name === 'experience.ts';
  const isPreviewing = activeViewMode[activeFile.name] !== 'code';

  return (
    <div className="h-8 bg-[#1e1e1e] border-b border-[#2d2d2d] flex items-center justify-between px-4 text-[11px] text-[#858585] select-none font-mono shrink-0">
      {/* Breadcrumbs Path */}
      <div className="flex items-center space-x-1 overflow-hidden min-w-0">
        <span className="hover:text-[#cccccc] cursor-pointer shrink-0">PORTFOLIO</span>
        {parts.map((part: string, index: number) => (
          <React.Fragment key={index}>
            <i className="codicon codicon-chevron-right text-[10px] text-[#555555] shrink-0"></i>
            <span className={`hover:text-[#cccccc] cursor-pointer truncate ${index === parts.length - 1 ? 'text-[#cccccc] font-semibold' : ''}`}>
              {part}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Prominent View Code / Preview Toggle Button Bar */}
      {isPreviewable && (
        <div className="flex items-center gap-1.5 shrink-0 ml-3 font-sans">
          <div className="bg-[#252526] border border-[#3c3c3c] p-0.5 rounded flex items-center gap-1 shadow-sm">
            <button
              onClick={() => {
                if (isPreviewing) toggleMarkdownViewMode(activeFile.name);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-mono rounded transition-colors ${
                !isPreviewing
                  ? 'bg-[#007acc] text-white font-semibold shadow'
                  : 'text-[#858585] hover:text-white hover:bg-[#333333]'
              }`}
              title="Switch to Source Code view"
            >
              <i className="codicon codicon-code text-xs"></i>
              View Code
            </button>
            <button
              onClick={() => {
                if (!isPreviewing) toggleMarkdownViewMode(activeFile.name);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-mono rounded transition-colors ${
                isPreviewing
                  ? 'bg-[#007acc] text-white font-semibold shadow'
                  : 'text-[#858585] hover:text-white hover:bg-[#333333]'
              }`}
              title="Switch to Rendered Preview"
            >
              <i className="codicon codicon-book text-xs"></i>
              Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

