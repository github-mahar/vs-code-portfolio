import React from 'react';
import { useVSCode } from '../context/VSCodeContext';
import type { ActivityPanel } from '../types/vscode';

export const ActivityBar: React.FC = () => {
  const { activePanel, setActivePanel, isSidebarOpen, toggleSidebar } = useVSCode();

  const handlePanelClick = (panel: ActivityPanel) => {
    if (activePanel === panel && isSidebarOpen) {
      toggleSidebar();
    } else {
      setActivePanel(panel);
      if (!isSidebarOpen) toggleSidebar();
    }
  };

  const navItems: { id: ActivityPanel; icon: string; title: string; badge?: number }[] = [
    { id: 'explorer', icon: 'codicon-files', title: 'Explorer (Ctrl+Shift+E)' },
    { id: 'search', icon: 'codicon-search', title: 'Search (Ctrl+Shift+F)' },
    { id: 'git', icon: 'codicon-source-control', title: 'Source Control (Ctrl+Shift+G)', badge: 1 },
    { id: 'extensions', icon: 'codicon-extensions', title: 'Extensions (Ctrl+Shift+X)', badge: 4 },
  ];

  return (
    <div className="w-12 bg-[#333333] flex flex-col justify-between items-center py-2 select-none border-r border-[#252526] z-10 shrink-0">
      {/* Top Main Navigation Icons */}
      <div className="flex flex-col space-y-1 w-full items-center">
        {navItems.map((item) => {
          const isActive = activePanel === item.id && isSidebarOpen;
          return (
            <div
              key={item.id}
              onClick={() => handlePanelClick(item.id)}
              title={item.title}
              className={`relative w-full h-12 flex items-center justify-center cursor-pointer transition ${
                isActive ? 'text-white' : 'text-[#858585] hover:text-white'
              }`}
            >
              {/* Active Indicator Line */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white shadow-sm"></div>
              )}
              
              <i className={`codicon ${item.icon} text-xl`}></i>
              
              {/* Badge Count if applicable */}
              {item.badge && (
                <span className="absolute top-2 right-2 bg-[#007acc] text-white text-[9px] font-bold px-1 rounded-full min-w-[14px] h-[14px] flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Action Icons (Accounts & Settings) */}
      <div className="flex flex-col space-y-1 w-full items-center">
        <div
          onClick={() => handlePanelClick('settings')}
          title="Accounts"
          className="relative w-full h-10 flex items-center justify-center cursor-pointer text-[#858585] hover:text-white transition"
        >
          <i className="codicon codicon-account text-xl"></i>
        </div>
        <div
          onClick={() => handlePanelClick('settings')}
          title="Manage & Settings"
          className={`relative w-full h-10 flex items-center justify-center cursor-pointer transition ${
            activePanel === 'settings' && isSidebarOpen ? 'text-white' : 'text-[#858585] hover:text-white'
          }`}
        >
          {activePanel === 'settings' && isSidebarOpen && (
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white shadow-sm"></div>
          )}
          <i className="codicon codicon-settings-gear text-xl"></i>
        </div>
      </div>
    </div>
  );
};
