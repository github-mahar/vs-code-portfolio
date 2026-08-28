import React from 'react';
import { useVSCode } from '../context/VSCodeContext';

export const TitleBar: React.FC = () => {
  const { activeFile, toggleSidebar } = useVSCode();

  return (
    <div className="h-8 bg-[#1e1e1e] border-b border-[#3c3c3c] flex items-center justify-between px-3 text-xs text-[#cccccc] select-none shrink-0">
      {/* Left: Window Controls / Sidebar toggle */}
      <div className="flex items-center space-x-2 w-1/4">
        {/* macOS style traffic light dots */}
        <div className="flex items-center space-x-1.5 mr-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block cursor-pointer opacity-90 hover:opacity-100 transition"></span>
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block cursor-pointer opacity-90 hover:opacity-100 transition"></span>
          <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block cursor-pointer opacity-90 hover:opacity-100 transition"></span>
        </div>

        {/* Mobile menu toggle button */}
        <button 
          onClick={toggleSidebar} 
          className="md:hidden text-[#cccccc] hover:text-white p-1 rounded hover:bg-[#333333]"
          title="Toggle Sidebar"
        >
          <i className="codicon codicon-menu text-sm"></i>
        </button>

        {/* VS Code Brand icon */}
        <i className="codicon codicon-vscode text-[#007acc] text-sm hidden md:inline-block"></i>
      </div>

      {/* Center: Title */}
      <div className="flex-1 text-center font-medium truncate text-[#cccccc]/90 text-[11px] md:text-xs">
        {activeFile ? `${activeFile.name} — gm-portfolio — Visual Studio Code` : 'gm-portfolio — Visual Studio Code'}
      </div>

      {/* Right: Window Action Icons / Quick Search Hint */}
      <div className="flex items-center justify-end space-x-3 w-1/4">
        <div className="hidden lg:flex items-center bg-[#252526] border border-[#3c3c3c] px-2 py-0.5 rounded text-[10px] text-[#858585] space-x-1">
          <i className="codicon codicon-search text-xs"></i>
          <span>gm-portfolio</span>
          <span className="bg-[#333333] px-1 rounded text-[#cccccc]">Ctrl+P</span>
        </div>
        <div className="flex items-center space-x-2 text-[#cccccc]/70">
          <i className="codicon codicon-layout-sidebar-left hover:text-white cursor-pointer" onClick={toggleSidebar} title="Toggle Primary Sidebar"></i>
          <i className="codicon codicon-chrome-minimize hover:text-white cursor-pointer hidden md:inline-block"></i>
          <i className="codicon codicon-chrome-restore hover:text-white cursor-pointer hidden md:inline-block"></i>
          <i className="codicon codicon-chrome-close hover:text-red-400 cursor-pointer hidden md:inline-block"></i>
        </div>
      </div>
    </div>
  );
};
