import React from 'react';
import { useVSCode } from '../context/VSCodeContext';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const StatusBar: React.FC = () => {
  const { activeFile, isTerminalOpen, toggleTerminal } = useVSCode();

  return (
    <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-xs select-none shrink-0 font-sans text-[11px]">
      {/* Left Items */}
      <div className="flex items-center space-x-3">
        <a 
          href={PORTFOLIO_DATA.github} 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center space-x-1 hover:bg-[#005999] px-1.5 py-0.5 rounded transition"
          title="Remote Repository"
        >
          <i className="codicon codicon-remote text-xs"></i>
          <span className="font-semibold">main*</span>
        </a>

        <div className="flex items-center space-x-1 hover:bg-[#005999] px-1.5 py-0.5 rounded transition cursor-pointer">
          <i className="codicon codicon-check-all text-xs text-[#27c93f]"></i>
          <span>0 errors, 0 warnings</span>
        </div>

        <button 
          onClick={toggleTerminal} 
          className="flex items-center space-x-1 hover:bg-[#005999] px-1.5 py-0.5 rounded transition"
        >
          <i className="codicon codicon-terminal text-xs"></i>
          <span>Terminal {isTerminalOpen ? 'On' : 'Off'}</span>
        </button>
      </div>

      {/* Right Items */}
      <div className="flex items-center space-x-3">
        {activeFile && (
          <>
            <span className="hidden md:inline-block">Ln 12, Col 24</span>
            <span className="hidden md:inline-block">Spaces: 2</span>
            <span className="hidden sm:inline-block">UTF-8</span>
            <span className="font-mono bg-[#005999] px-1.5 py-0.5 rounded font-medium">
              {activeFile.language}
            </span>
          </>
        )}

        <a
          href={PORTFOLIO_DATA.website}
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-1 hover:bg-[#005999] px-1.5 py-0.5 rounded transition font-bold"
        >
          <span>vs-code-portfolio.ezzcode.online</span>
          <i className="codicon codicon-globe text-xs"></i>
        </a>

        <div className="hover:bg-[#005999] px-1.5 py-0.5 rounded transition cursor-pointer">
          <i className="codicon codicon-bell text-xs"></i>
        </div>
      </div>
    </div>
  );
};
