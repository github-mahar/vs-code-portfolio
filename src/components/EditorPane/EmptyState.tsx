import React from 'react';
import { useVSCode } from '../../context/VSCodeContext';

export const EmptyState: React.FC = () => {
  const { files, openTab, setActivePanel, isSidebarOpen, toggleSidebar, toggleTerminal } = useVSCode();

  const handleOpenReadme = () => {
    const readme = files.find(f => f.name === 'README.md');
    if (readme) openTab(readme);
  };

  const handleOpenContact = () => {
    const contact = files.find(f => f.name === 'contact.json');
    if (contact) openTab(contact);
  };

  const handleOpenSearch = () => {
    setActivePanel('search');
    if (!isSidebarOpen) toggleSidebar();
  };

  return (
    <div className="flex-1 bg-[#1e1e1e] flex flex-col items-center justify-center text-[#cccccc] select-none p-6">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Large VS Code Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-2xl bg-[#252526] border border-[#3c3c3c] flex items-center justify-center shadow-2xl">
            <i className="codicon codicon-vscode text-5xl text-[#007acc]"></i>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-1">Visual Studio Code Portfolio</h2>
          <p className="text-xs text-[#858585]">Interactive Developer Environment</p>
        </div>

        {/* Shortcuts & Quick Actions */}
        <div className="bg-[#252526] border border-[#3c3c3c] rounded-lg p-5 text-xs text-left space-y-3 font-sans shadow-lg">
          <div className="text-[11px] font-bold text-[#858585] uppercase tracking-wider mb-2">
            Quick Actions
          </div>

          <div onClick={handleOpenReadme} className="flex justify-between items-center cursor-pointer hover:text-[#569cd6] group">
            <span className="flex items-center gap-2">
              <i className="codicon codicon-markdown text-[#42a5f5]"></i> Open README.md
            </span>
            <kbd className="bg-[#333333] text-[#cccccc] px-2 py-0.5 rounded text-[10px] font-mono group-hover:bg-[#007acc] group-hover:text-white">
              Ctrl+Alt+R
            </kbd>
          </div>

          <div onClick={handleOpenContact} className="flex justify-between items-center cursor-pointer hover:text-[#569cd6] group">
            <span className="flex items-center gap-2">
              <i className="codicon codicon-mail text-[#fbc02d]"></i> Open contact.json
            </span>
            <kbd className="bg-[#333333] text-[#cccccc] px-2 py-0.5 rounded text-[10px] font-mono group-hover:bg-[#007acc] group-hover:text-white">
              Ctrl+Alt+C
            </kbd>
          </div>

          <div onClick={handleOpenSearch} className="flex justify-between items-center cursor-pointer hover:text-[#569cd6] group">
            <span className="flex items-center gap-2">
              <i className="codicon codicon-search text-[#9cdcfe]"></i> Quick File Search
            </span>
            <kbd className="bg-[#333333] text-[#cccccc] px-2 py-0.5 rounded text-[10px] font-mono group-hover:bg-[#007acc] group-hover:text-white">
              Ctrl+P
            </kbd>
          </div>

          <div onClick={toggleTerminal} className="flex justify-between items-center cursor-pointer hover:text-[#569cd6] group">
            <span className="flex items-center gap-2">
              <i className="codicon codicon-terminal text-[#4ec9b0]"></i> Toggle Terminal
            </span>
            <kbd className="bg-[#333333] text-[#cccccc] px-2 py-0.5 rounded text-[10px] font-mono group-hover:bg-[#007acc] group-hover:text-white">
              Ctrl+`
            </kbd>
          </div>
        </div>

        <div className="text-xs text-[#858585]">
          Select any file from the <span className="text-[#569cd6] cursor-pointer" onClick={handleOpenReadme}>Sidebar Explorer</span> to begin browsing.
        </div>
      </div>
    </div>
  );
};
