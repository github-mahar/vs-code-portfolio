import React from 'react';

export const GitPanel: React.FC = () => {
  return (
    <div className="h-full flex flex-col bg-[#252526] text-[#cccccc] p-3 select-none text-xs">
      <div className="text-[11px] font-bold uppercase tracking-wider text-[#bbbbbb] mb-3">
        Source Control: Git
      </div>

      <div className="bg-[#2d2d2d] border border-[#3c3c3c] p-3 rounded mb-4">
        <div className="flex items-center space-x-2 text-[#4ec9b0] font-mono text-xs mb-2">
          <i className="codicon codicon-git-branch"></i>
          <span className="font-bold">main (working tree clean)</span>
        </div>
        <p className="text-[#858585] text-[11px]">
          Repository linked to <a href="https://github.com" target="_blank" rel="noreferrer" className="text-[#3794ff] underline">GitHub</a>.
        </p>
      </div>

      <div className="text-[11px] font-bold text-[#858585] uppercase mb-2">
        Recent Commits
      </div>

      <div className="space-y-2 overflow-y-auto flex-1">
        <div className="p-2 bg-[#1e1e1e] border-l-2 border-[#27c93f] rounded text-[11px]">
          <div className="font-mono text-[#ce9178] font-bold">feat: pixel-accurate VS Code portfolio release</div>
          <div className="text-[#858585] text-[10px] flex justify-between mt-1">
            <span>Mahar Ghulam Muhammad (EzzCode)</span>
            <span>2 hours ago</span>
          </div>
        </div>

        <div className="p-2 bg-[#1e1e1e] border-l-2 border-[#007acc] rounded text-[11px]">
          <div className="font-mono text-[#9cdcfe]">feat: add Shopify 2.0 theme architecture & COD automation</div>
          <div className="text-[#858585] text-[10px] flex justify-between mt-1">
            <span>Mahar Ghulam Muhammad (EzzCode)</span>
            <span>Yesterday</span>
          </div>
        </div>

        <div className="p-2 bg-[#1e1e1e] border-l-2 border-[#007acc] rounded text-[11px]">
          <div className="font-mono text-[#9cdcfe]">feat: initialize ProposalCraft SaaS tool codebase</div>
          <div className="text-[#858585] text-[10px] flex justify-between mt-1">
            <span>Mahar Ghulam Muhammad (EzzCode)</span>
            <span>3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};
