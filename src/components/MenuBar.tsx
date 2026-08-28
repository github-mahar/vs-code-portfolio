import React from 'react';
import { useVSCode } from '../context/VSCodeContext';

export const MenuBar: React.FC = () => {
  const { toggleTerminal, toggleSidebar, openTab, files } = useVSCode();

  const handleOpenReadme = () => {
    const readme = files.find(f => f.name === 'README.md');
    if (readme) openTab(readme);
  };

  const handleOpenContact = () => {
    const contact = files.find(f => f.name === 'contact.json');
    if (contact) openTab(contact);
  };

  return (
    <div className="h-6 bg-[#2d2d2d] border-b border-[#3c3c3c] flex items-center px-2 text-xs text-[#cccccc] select-none shrink-0 space-x-1 font-sans text-[11px]">
      <div className="relative group px-2 py-0.5 hover:bg-[#3c3c3c] rounded cursor-pointer transition">
        <span>File</span>
        <div className="hidden group-hover:block absolute left-0 top-full mt-0 w-48 bg-[#252526] border border-[#454545] shadow-xl py-1 z-50 rounded-b">
          <div onClick={handleOpenReadme} className="px-3 py-1 hover:bg-[#04395e] hover:text-white flex justify-between cursor-pointer">
            <span>Open README.md</span>
            <span className="text-[10px] text-[#858585]">Ctrl+Alt+R</span>
          </div>
          <div onClick={handleOpenContact} className="px-3 py-1 hover:bg-[#04395e] hover:text-white flex justify-between cursor-pointer">
            <span>Contact Form</span>
            <span className="text-[10px] text-[#858585]">Ctrl+Alt+C</span>
          </div>
          <div className="my-1 border-t border-[#3c3c3c]"></div>
          <div className="px-3 py-1 text-[#858585] flex justify-between">
            <span>Auto Save</span>
            <span>✓</span>
          </div>
        </div>
      </div>

      <div className="relative group px-2 py-0.5 hover:bg-[#3c3c3c] rounded cursor-pointer transition">
        <span>Edit</span>
        <div className="hidden group-hover:block absolute left-0 top-full mt-0 w-40 bg-[#252526] border border-[#454545] shadow-xl py-1 z-50 rounded-b">
          <div className="px-3 py-1 hover:bg-[#04395e] hover:text-white flex justify-between cursor-pointer">
            <span>Undo</span>
            <span className="text-[10px] text-[#858585]">Ctrl+Z</span>
          </div>
          <div className="px-3 py-1 hover:bg-[#04395e] hover:text-white flex justify-between cursor-pointer">
            <span>Redo</span>
            <span className="text-[10px] text-[#858585]">Ctrl+Y</span>
          </div>
        </div>
      </div>

      <div className="relative group px-2 py-0.5 hover:bg-[#3c3c3c] rounded cursor-pointer transition">
        <span>View</span>
        <div className="hidden group-hover:block absolute left-0 top-full mt-0 w-44 bg-[#252526] border border-[#454545] shadow-xl py-1 z-50 rounded-b">
          <div onClick={toggleSidebar} className="px-3 py-1 hover:bg-[#04395e] hover:text-white flex justify-between cursor-pointer">
            <span>Toggle Primary Side Bar</span>
            <span className="text-[10px] text-[#858585]">Ctrl+B</span>
          </div>
          <div onClick={toggleTerminal} className="px-3 py-1 hover:bg-[#04395e] hover:text-white flex justify-between cursor-pointer">
            <span>Toggle Terminal</span>
            <span className="text-[10px] text-[#858585]">Ctrl+`</span>
          </div>
        </div>
      </div>

      <div className="relative group px-2 py-0.5 hover:bg-[#3c3c3c] rounded cursor-pointer transition">
        <span>Terminal</span>
        <div className="hidden group-hover:block absolute left-0 top-full mt-0 w-44 bg-[#252526] border border-[#454545] shadow-xl py-1 z-50 rounded-b">
          <div onClick={toggleTerminal} className="px-3 py-1 hover:bg-[#04395e] hover:text-white flex justify-between cursor-pointer">
            <span>New Terminal</span>
            <span className="text-[10px] text-[#858585]">Ctrl+Shift+`</span>
          </div>
        </div>
      </div>

      <div className="relative group px-2 py-0.5 hover:bg-[#3c3c3c] rounded cursor-pointer transition">
        <span>Help</span>
        <div className="hidden group-hover:block absolute left-0 top-full mt-0 w-48 bg-[#252526] border border-[#454545] shadow-xl py-1 z-50 rounded-b">
          <div onClick={handleOpenReadme} className="px-3 py-1 hover:bg-[#04395e] hover:text-white cursor-pointer">
            Welcome Documentation
          </div>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="px-3 py-1 hover:bg-[#04395e] hover:text-white block">
            GitHub Repository
          </a>
          <div className="my-1 border-t border-[#3c3c3c]"></div>
          <div className="px-3 py-1 text-[#858585]">
            About Mahar Ghulam Muhammad Portfolio v1.0
          </div>
        </div>
      </div>
    </div>
  );
};
