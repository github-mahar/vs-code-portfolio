import React, { useState } from 'react';
import { useVSCode } from '../../context/VSCodeContext';
import type { FileItem, FolderItem } from '../../types/vscode';

export const FileExplorer: React.FC = () => {
  const { tree, activeFile, openTab, unsavedFiles } = useVSCode();
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    'vscode_folder': true,
    'src_folder': true,
    'folder-vscode': true,
    'folder-src': true
  });
  const [isPortfolioExpanded, setIsPortfolioExpanded] = useState<boolean>(true);

  const toggleFolder = (folderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const getFileIcon = (file: FileItem) => {
    switch (file.type) {
      case 'markdown':
        return <i className="codicon codicon-markdown text-[#42a5f5] text-sm mr-1.5"></i>;
      case 'typescript':
        return <span className="font-bold text-[10px] text-[#3178c6] mr-1.5 font-mono">TS</span>;
      case 'tsx':
        return <span className="font-bold text-[10px] text-[#61dafb] mr-1.5 font-mono">TSX</span>;
      case 'json':
        return <i className="codicon codicon-json text-[#fbc02d] text-sm mr-1.5"></i>;
      default:
        return <i className="codicon codicon-file text-[#cccccc] text-sm mr-1.5"></i>;
    }
  };

  const renderFileRow = (file: FileItem, depth: number) => {
    const isActive = activeFile?.id === file.id;
    const isUnsaved = unsavedFiles[file.path];

    return (
      <div
        key={file.id}
        onClick={() => openTab(file)}
        style={{ paddingLeft: `${depth * 14 + 12}px` }}
        className={`flex items-center h-6 cursor-pointer text-xs select-none transition group ${
          isActive 
            ? 'bg-[#37373d] text-white font-medium border-l-2 border-[#007acc]' 
            : 'text-[#cccccc]/80 hover:bg-[#2a2d2e] hover:text-white'
        }`}
      >
        {getFileIcon(file)}
        <span className="truncate flex-1">{file.name}</span>
        {isUnsaved && (
          <span className="w-2 h-2 rounded-full bg-[#007acc] mr-2 inline-block" title="Unsaved changes"></span>
        )}
      </div>
    );
  };

  const renderFolderRow = (folder: FolderItem, depth: number) => {
    const isOpen = openFolders[folder.id];

    return (
      <div key={folder.id} className="select-none">
        <div
          onClick={(e) => toggleFolder(folder.id, e)}
          style={{ paddingLeft: `${depth * 14 + 12}px` }}
          className="flex items-center h-6 cursor-pointer text-xs text-[#cccccc]/80 hover:bg-[#2a2d2e] hover:text-white transition group"
        >
          <i className={`codicon ${isOpen ? 'codicon-chevron-down' : 'codicon-chevron-right'} text-xs mr-1 text-[#858585] group-hover:text-white`}></i>
          <i className={`codicon ${isOpen ? 'codicon-folder-opened' : 'codicon-folder'} text-sm mr-1.5 ${folder.name === '.vscode' ? 'text-[#e5c07b]' : 'text-[#dcb67a]'}`}></i>
          <span className="truncate">{folder.name}</span>
        </div>

        {isOpen && (
          <div className="relative">
            {/* Indentation guide line */}
            <div 
              className="absolute left-0 top-0 bottom-0 border-l border-[#404040]/40 pointer-events-none"
              style={{ left: `${(depth + 1) * 14 + 16}px` }}
            ></div>
            
            {folder.children.map(child => {
              if ('children' in child) {
                return renderFolderRow(child, depth + 1);
              } else {
                return renderFileRow(child, depth + 1);
              }
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-[#252526] text-[#cccccc] select-none">
      {/* Title Header */}
      <div className="h-9 px-4 flex items-center justify-between text-[11px] font-bold tracking-wider text-[#bbbbbb] uppercase border-b border-[#3c3c3c]/30">
        <span>Explorer</span>
        <div className="flex items-center space-x-1 text-[#858585]">
          <i className="codicon codicon-new-file hover:text-white cursor-pointer p-0.5" title="New File"></i>
          <i className="codicon codicon-new-folder hover:text-white cursor-pointer p-0.5" title="New Folder"></i>
          <i className="codicon codicon-refresh hover:text-white cursor-pointer p-0.5" title="Refresh Explorer"></i>
          <i className="codicon codicon-collapse-all hover:text-white cursor-pointer p-0.5" title="Collapse Folders" onClick={() => setOpenFolders({})}></i>
        </div>
      </div>

      {/* Root Workspace Accordion */}
      <div className="flex-1 overflow-y-auto py-1">
        <div
          onClick={() => setIsPortfolioExpanded(!isPortfolioExpanded)}
          className="flex items-center h-6 px-2 cursor-pointer text-xs font-bold text-[#bbbbbb] hover:text-white bg-[#2d2d2d]/40"
        >
          <i className={`codicon ${isPortfolioExpanded ? 'codicon-chevron-down' : 'codicon-chevron-right'} text-xs mr-1`}></i>
          <span className="uppercase tracking-wide text-[11px]">PORTFOLIO</span>
        </div>

        {isPortfolioExpanded && (
          <div className="mt-0.5">
            {tree.map(item => {
              if ('children' in item) {
                return renderFolderRow(item, 0);
              } else {
                return renderFileRow(item, 0);
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};
