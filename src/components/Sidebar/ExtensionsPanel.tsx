import React from 'react';

export const ExtensionsPanel: React.FC = () => {
  const extensions = [
    {
      name: "React Developer Tools",
      publisher: "Meta",
      description: "React component inspector & hook debugger",
      version: "v5.2.0",
      installed: true,
      icon: "codicon-symbol-class"
    },
    {
      name: "Shopify Liquid Syntax",
      publisher: "Shopify",
      description: "Official Liquid syntax highlighter & section schema autocomplete",
      version: "v3.1.0",
      installed: true,
      icon: "codicon-extensions"
    },
    {
      name: "Tailwind CSS IntelliSense",
      publisher: "Tailwind Labs",
      description: "Intelligent Tailwind CSS tooling for VS Code",
      version: "v0.12.0",
      installed: true,
      icon: "codicon-color-mode"
    },
    {
      name: "Prettier - Code formatter",
      publisher: "Prettier",
      description: "Opinionated code formatter for TS, React & JSON",
      version: "v10.1.0",
      installed: true,
      icon: "codicon-symbol-keyword"
    }
  ];

  return (
    <div className="h-full flex flex-col bg-[#252526] text-[#cccccc] p-3 select-none text-xs">
      <div className="text-[11px] font-bold uppercase tracking-wider text-[#bbbbbb] mb-3">
        Installed Extensions ({extensions.length})
      </div>

      <div className="space-y-3 overflow-y-auto flex-1">
        {extensions.map(ext => (
          <div key={ext.name} className="p-2.5 bg-[#2d2d2d] border border-[#3c3c3c] rounded flex items-start space-x-3">
            <div className="w-8 h-8 bg-[#333333] rounded flex items-center justify-center text-[#007acc] shrink-0">
              <i className={`codicon ${ext.icon} text-lg`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-[#d4d4d4] truncate text-xs">{ext.name}</h4>
                <span className="bg-[#1e1e1e] text-[#4ec9b0] text-[9px] px-1.5 py-0.5 rounded font-mono">Installed</span>
              </div>
              <p className="text-[#858585] text-[10px]">{ext.publisher} • {ext.version}</p>
              <p className="text-[#cccccc]/70 text-[11px] mt-1 line-clamp-2">{ext.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
