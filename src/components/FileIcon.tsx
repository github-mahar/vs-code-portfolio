import React from 'react';
import type { FileItem } from '../types/vscode';

export const ReactIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 mr-1.5 inline-block shrink-0" }) => (
  <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

export const TSIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 mr-1.5 inline-block shrink-0" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" rx="2.5" fill="#3178C6" />
    <text x="8" y="11.5" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" textAnchor="middle" letterSpacing="-0.5px">TS</text>
  </svg>
);

export const MarkdownIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 mr-1.5 inline-block shrink-0" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 3H14C14.55 3 15 3.45 15 4V12C15 12.55 14.55 13 14 13H2C1.45 13 1 12.55 1 12V4C1 3.45 1.45 3 2 3Z" fill="#42A5F5" fillOpacity="0.2" stroke="#42A5F5" strokeWidth="1.2" />
    <path d="M3.5 10.5V5.5H5L6.25 7.8L7.5 5.5H9V10.5H7.75V7.5L6.75 9.25H5.75L4.75 7.5V10.5H3.5ZM12.25 10.5L10 7.5H11.5V5.5H13V7.5H14.5L12.25 10.5Z" fill="#42A5F5" />
  </svg>
);

export const JsonIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 mr-1.5 inline-block shrink-0" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3.5C4 3.5 3.5 4 3.5 5V6.5C3.5 7 3 7.5 2.5 7.5C3 7.5 3.5 8 3.5 8.5V10C3.5 11 4 11.5 5 11.5" stroke="#FBC02D" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 3.5C12 3.5 12.5 4 12.5 5V6.5C12.5 7 13 7.5 13.5 7.5C13 7.5 12.5 8 12.5 8.5V10C12.5 11 12 11.5 11 11.5" stroke="#FBC02D" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const CssIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 mr-1.5 inline-block shrink-0" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" rx="2" fill="#C586C0" fillOpacity="0.2" stroke="#C586C0" strokeWidth="1" />
    <text x="3.5" y="12" fill="#C586C0" fontSize="11" fontWeight="bold" fontFamily="monospace">#</text>
  </svg>
);

export const SvgIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 mr-1.5 inline-block shrink-0" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2L9.5 6.5L14 8L9.5 9.5L8 14L6.5 9.5L2 8L6.5 6.5L8 2Z" fill="#FFC107" stroke="#FFC107" strokeWidth="0.5" />
  </svg>
);

export const ImageIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4 mr-1.5 inline-block shrink-0" }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="12" height="12" rx="2" stroke="#4EC9B0" strokeWidth="1.2" />
    <circle cx="5.5" cy="5.5" r="1.5" fill="#4EC9B0" />
    <path d="M3.5 12L7 7.5L9.5 10.5L11 8.5L13 12H3.5Z" fill="#4EC9B0" />
  </svg>
);

export const getFileIcon = (file: FileItem | { name: string; type?: string }, className?: string) => {
  const name = file.name.toLowerCase();
  
  if (name.endsWith('.tsx') || name.endsWith('.jsx')) {
    return <ReactIcon className={className} />;
  }
  if (name.endsWith('.ts') || file.type === 'typescript') {
    return <TSIcon className={className} />;
  }
  if (name.endsWith('.json') || file.type === 'json') {
    return <JsonIcon className={className} />;
  }
  if (name.endsWith('.md') || file.type === 'markdown') {
    return <MarkdownIcon className={className} />;
  }
  if (name.endsWith('.css')) {
    return <CssIcon className={className} />;
  }
  if (name.endsWith('.svg')) {
    return <SvgIcon className={className} />;
  }
  if (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.ico')) {
    return <ImageIcon className={className} />;
  }
  return <i className={`codicon codicon-file text-[#cccccc] ${className || 'mr-1.5 text-xs'}`}></i>;
};

export const getFolderIcon = (folderName: string, isOpen: boolean, className?: string) => {
  const name = folderName.toLowerCase();
  
  if (name === 'src') {
    return (
      <span className={`${className || 'mr-1.5 inline-flex items-center'} text-[#4ec9b0]`}>
        <i className={`codicon ${isOpen ? 'codicon-folder-opened' : 'codicon-folder'} text-sm`}></i>
      </span>
    );
  }
  
  if (name === '.vscode') {
    return (
      <span className={`${className || 'mr-1.5 inline-flex items-center'} text-[#e5c07b]`}>
        <i className={`codicon ${isOpen ? 'codicon-folder-opened' : 'codicon-folder'} text-sm`}></i>
      </span>
    );
  }

  if (name === 'components') {
    return (
      <span className={`${className || 'mr-1.5 inline-flex items-center'} text-[#e8a838]`}>
        <i className={`codicon ${isOpen ? 'codicon-folder-opened' : 'codicon-folder'} text-sm`}></i>
      </span>
    );
  }

  if (name === 'types') {
    return (
      <span className={`${className || 'mr-1.5 inline-flex items-center'} text-[#3178c6]`}>
        <i className={`codicon ${isOpen ? 'codicon-folder-opened' : 'codicon-folder'} text-sm`}></i>
      </span>
    );
  }

  if (name === 'data') {
    return (
      <span className={`${className || 'mr-1.5 inline-flex items-center'} text-[#e5c07b]`}>
        <i className={`codicon ${isOpen ? 'codicon-folder-opened' : 'codicon-folder'} text-sm`}></i>
      </span>
    );
  }

  return (
    <span className={`${className || 'mr-1.5 inline-flex items-center'} text-[#dcb67a]`}>
      <i className={`codicon ${isOpen ? 'codicon-folder-opened' : 'codicon-folder'} text-sm`}></i>
    </span>
  );
};
