import React from 'react';
import { useVSCode } from '../context/VSCodeContext';

export const TitleBar: React.FC = () => {
  const { activeFile, toggleSidebar, toggleFullscreenSlideshow, isFullscreenSlideshowOpen, closeTab } = useVSCode();

  const handleCloseClick = () => {
    if (isFullscreenSlideshowOpen) {
      toggleFullscreenSlideshow(false);
    } else if (activeFile) {
      closeTab(activeFile.id);
    } else {
      toggleFullscreenSlideshow(false);
    }
  };

  return (
    <div className="h-8 bg-[#1e1e1e] border-b border-[#3c3c3c] flex items-center justify-between px-3 text-xs text-[#cccccc] select-none shrink-0">
      {/* Left: Window Controls / Sidebar toggle */}
      <div className="flex items-center space-x-2 w-1/4">
        {/* macOS style traffic light dots */}
        <div className="flex items-center space-x-1.5 mr-2 group/dots">
          <button
            onClick={handleCloseClick}
            className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff3b30] flex items-center justify-center text-[8px] text-black/80 font-bold opacity-90 hover:opacity-100 transition shadow-sm"
            title={isFullscreenSlideshowOpen ? "Exit Presentation View (ESC)" : "Close Active Tab / Exit Presentation"}
          >
            <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity">×</span>
          </button>
          <button
            onClick={() => toggleFullscreenSlideshow()}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffcc00] flex items-center justify-center text-[8px] text-black/80 font-bold opacity-90 hover:opacity-100 transition shadow-sm"
            title={isFullscreenSlideshowOpen ? "Exit Presentation View" : "Toggle Presentation View (F5)"}
          >
            <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity">−</span>
          </button>
          <button
            onClick={() => toggleFullscreenSlideshow()}
            className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#34c759] flex items-center justify-center text-[8px] text-black/80 font-bold opacity-90 hover:opacity-100 transition shadow-sm"
            title={isFullscreenSlideshowOpen ? "Exit Presentation View (F5)" : "Enter Fullscreen Presentation View (F5)"}
          >
            <span className="opacity-0 group-hover/dots:opacity-100 transition-opacity">⤢</span>
          </button>
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

      {/* Right: Window Action Icons / Quick Search Hint / Fullscreen Slideshow */}
      <div className="flex items-center justify-end space-x-2 sm:space-x-3 w-1/4">
        <button
          onClick={() => toggleFullscreenSlideshow()}
          className="flex items-center gap-1 bg-[#007acc]/20 hover:bg-[#007acc] text-[#007acc] hover:text-white border border-[#007acc]/40 px-2 py-0.5 rounded text-[10px] font-mono transition shadow-sm"
          title={isFullscreenSlideshowOpen ? "Exit Presentation View (F5)" : "Launch Fullscreen Presentation Mode (F5)"}
        >
          <i className={`codicon ${isFullscreenSlideshowOpen ? 'codicon-screen-normal' : 'codicon-screen-full'} text-xs`}></i>
          <span className="hidden sm:inline">{isFullscreenSlideshowOpen ? 'Exit Presentation' : 'Presentation'}</span>
        </button>

        <div className="hidden lg:flex items-center bg-[#252526] border border-[#3c3c3c] px-2 py-0.5 rounded text-[10px] text-[#858585] space-x-1">
          <i className="codicon codicon-search text-xs"></i>
          <span>gm-portfolio</span>
          <span className="bg-[#333333] px-1 rounded text-[#cccccc]">Ctrl+P</span>
        </div>
        <div className="flex items-center space-x-1 text-[#cccccc]/70">
          <i 
            className="codicon codicon-layout-sidebar-left hover:text-white cursor-pointer p-1 rounded hover:bg-[#333333]" 
            onClick={toggleSidebar} 
            title="Toggle Primary Sidebar"
          ></i>
          <i 
            className="codicon codicon-chrome-minimize hover:text-white cursor-pointer hidden md:inline-block p-1 rounded hover:bg-[#333333]"
            onClick={() => toggleFullscreenSlideshow(false)}
            title={isFullscreenSlideshowOpen ? "Exit Presentation View" : "Minimize / Exit Presentation View"}
          ></i>
          <i 
            className={`codicon ${isFullscreenSlideshowOpen ? 'codicon-chrome-restore' : 'codicon-chrome-maximize'} hover:text-white cursor-pointer hidden md:inline-block p-1 rounded hover:bg-[#333333]`}
            onClick={() => toggleFullscreenSlideshow()}
            title={isFullscreenSlideshowOpen ? "Exit Presentation View (F5)" : "Enter Fullscreen Presentation View (F5)"}
          ></i>
          <i 
            className="codicon codicon-chrome-close hover:text-red-400 cursor-pointer hidden md:inline-block p-1 rounded hover:bg-[#c42b1c] hover:text-white transition-colors"
            onClick={handleCloseClick}
            title={isFullscreenSlideshowOpen ? "Exit Presentation View" : "Close Active Tab / Exit Presentation"}
          ></i>
        </div>
      </div>
    </div>
  );
};
