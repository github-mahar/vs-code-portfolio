import React, { useState } from 'react';
import { useVSCode } from '../../context/VSCodeContext';
import { getFileIcon } from '../FileIcon';


export const TabBar: React.FC = () => {
  const { openTabs, activeFile, setActiveFile, closeTab, closeAllTabs, reorderTabs, unsavedFiles, activeViewMode, toggleMarkdownViewMode } = useVSCode();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  if (openTabs.length === 0) return null;

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const updatedTabs = [...openTabs];
    const item = updatedTabs[draggedIndex];
    updatedTabs.splice(draggedIndex, 1);
    updatedTabs.splice(index, 0, item);
    
    setDraggedIndex(index);
    reorderTabs(updatedTabs);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="h-9 bg-[#2d2d2d] flex items-center border-b border-[#3c3c3c] overflow-x-auto select-none no-scrollbar shrink-0">
      {/* Scrollable Tab List */}
      <div className="flex items-center h-full flex-1">
        {openTabs.map((file, index) => {
          const isActive = activeFile?.id === file.id;
          const isUnsaved = unsavedFiles[file.path];
          const isPreviewable = file.type === 'markdown' || file.type === 'json' || file.name.endsWith('.json') || file.name === 'projects.tsx' || file.name === 'experience.ts';
          const isPreviewing = activeViewMode[file.name] !== 'code';

          return (
            <div
              key={file.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onClick={() => setActiveFile(file)}
              className={`h-full flex items-center px-3 border-r border-[#3c3c3c]/50 text-xs cursor-pointer group min-w-[120px] max-w-[200px] transition ${
                isActive 
                  ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]' 
                  : 'bg-[#2d2d2d] text-[#cccccc]/70 hover:bg-[#252526] hover:text-white'
              }`}
            >
              {getFileIcon(file)}

              <span className={`truncate flex-1 font-mono text-[11px] ${isUnsaved ? 'italic font-semibold' : ''}`}>
                {file.name}
              </span>

              {/* Preview Toggle Icon inside tab */}
              {isPreviewable && isActive && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMarkdownViewMode(file.name);
                  }}
                  className="mr-1.5 text-[#858585] hover:text-white p-0.5 rounded"
                  title={isPreviewing ? "Switch to Source Code" : "Switch to Preview"}
                >
                  <i className={`codicon ${isPreviewing ? 'codicon-code' : 'codicon-book'} text-xs`}></i>
                </button>
              )}

              {/* Close Button / Unsaved Dot */}
              <div className="w-4 h-4 flex items-center justify-center ml-1">
                {isUnsaved ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(file.id);
                    }}
                    className="w-2 h-2 rounded-full bg-[#cccccc] group-hover:hidden"
                    title="Unsaved changes"
                  ></button>
                ) : null}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(file.id);
                  }}
                  className={`${isUnsaved ? 'hidden group-hover:flex' : 'flex'} w-4 h-4 items-center justify-center rounded hover:bg-[#3c3c3c] text-[#858585] hover:text-white`}
                  title="Close (Ctrl+W)"
                >
                  <i className="codicon codicon-close text-xs"></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tab bar right controls */}
      <div className="flex items-center px-2 space-x-2 text-[#858585] shrink-0 border-l border-[#3c3c3c]/40 h-full">
        {activeFile && (activeFile.type === 'markdown' || activeFile.type === 'json' || activeFile.name.endsWith('.json') || activeFile.name === 'projects.tsx' || activeFile.name === 'experience.ts') && (
          <button
            onClick={() => toggleMarkdownViewMode(activeFile.name)}
            className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono bg-[#007acc]/20 hover:bg-[#007acc] text-[#007acc] hover:text-white border border-[#007acc]/40 rounded transition shadow-sm"
            title={activeViewMode[activeFile.name] !== 'code' ? "Switch to Source Code" : "Switch to Rendered Preview"}
          >
            <i className={`codicon ${activeViewMode[activeFile.name] !== 'code' ? 'codicon-code' : 'codicon-book'} text-xs`}></i>
            <span>{activeViewMode[activeFile.name] !== 'code' ? 'View Code' : 'Preview'}</span>
          </button>
        )}

        <button 
          onClick={closeAllTabs} 
          className="p-1 hover:text-white hover:bg-[#3c3c3c] rounded" 
          title="Close All Tabs"
        >
          <i className="codicon codicon-close-all text-xs"></i>
        </button>
      </div>
    </div>
  );
};
