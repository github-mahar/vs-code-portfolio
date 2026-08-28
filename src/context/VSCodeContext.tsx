import React, { createContext, useContext, useState } from 'react';
import type { FileItem, ActivityPanel, FolderItem } from '../types/vscode';
import { INITIAL_FILES, WORKSPACE_TREE } from '../data/filesData';

interface ToastNotification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  source: string;
}

interface VSCodeContextType {
  files: FileItem[];
  tree: (FolderItem | FileItem)[];
  openTabs: FileItem[];
  activeFile: FileItem | null;
  activePanel: ActivityPanel;
  isSidebarOpen: boolean;
  isTerminalOpen: boolean;
  activeViewMode: Record<string, 'code' | 'preview'>;
  unsavedFiles: Record<string, boolean>;
  toasts: ToastNotification[];
  
  openTab: (file: FileItem | string) => void;
  closeTab: (fileId: string) => void;
  closeAllTabs: () => void;
  setActiveFile: (file: FileItem) => void;
  setActivePanel: (panel: ActivityPanel) => void;
  toggleSidebar: () => void;
  toggleTerminal: () => void;
  reorderTabs: (newTabs: FileItem[]) => void;
  toggleMarkdownViewMode: (filePath: string) => void;
  updateFileContent: (filePath: string, content: string) => void;
  addToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error', source?: string) => void;
  removeToast: (id: string) => void;
  markFileSaved: (filePath: string) => void;
}

const VSCodeContext = createContext<VSCodeContextType | undefined>(undefined);

export const VSCodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<FileItem[]>(INITIAL_FILES);
  const [tree] = useState<(FolderItem | FileItem)[]>(WORKSPACE_TREE);
  
  // Default open tab: README.md
  const readmeFile = INITIAL_FILES.find((f: FileItem) => f.name === 'README.md') || INITIAL_FILES[0];
  const [openTabs, setOpenTabs] = useState<FileItem[]>([readmeFile]);
  const [activeFile, setActiveFileState] = useState<FileItem | null>(readmeFile);
  const [activePanel, setActivePanel] = useState<ActivityPanel>('explorer');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(true);
  
  // README.md is in preview mode by default
  const [activeViewMode, setActiveViewMode] = useState<Record<string, 'code' | 'preview'>>({
    'README.md': 'preview'
  });
  
  // contact.json starts as unsaved
  const [unsavedFiles, setUnsavedFiles] = useState<Record<string, boolean>>({
    'contact.json': true
  });

  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info', source: string = 'VS Code System') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type, source }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openTab = (target: FileItem | string) => {
    let targetFile: FileItem | undefined;
    
    if (typeof target === 'string') {
      const query = target.trim().toLowerCase();
      targetFile = files.find(f => 
        f.path.toLowerCase() === query || 
        f.name.toLowerCase() === query || 
        f.path.toLowerCase().endsWith(query)
      );
    } else {
      targetFile = target;
    }

    if (!targetFile) {
      addToast(`File not found: ${target}`, 'error', 'Terminal');
      return;
    }

    // Add to open tabs if not present
    if (!openTabs.some(t => t.id === targetFile!.id)) {
      setOpenTabs(prev => [...prev, targetFile!]);
    }
    
    setActiveFileState(targetFile);
  };

  const closeTab = (fileId: string) => {
    const newTabs = openTabs.filter(t => t.id !== fileId);
    setOpenTabs(newTabs);

    if (activeFile?.id === fileId) {
      if (newTabs.length > 0) {
        // Switch to adjacent tab
        const closedIndex = openTabs.findIndex(t => t.id === fileId);
        const nextIndex = Math.max(0, closedIndex - 1);
        setActiveFileState(newTabs[nextIndex]);
      } else {
        setActiveFileState(null);
      }
    }
  };

  const closeAllTabs = () => {
    setOpenTabs([]);
    setActiveFileState(null);
  };

  const reorderTabs = (newTabs: FileItem[]) => {
    setOpenTabs(newTabs);
  };

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleTerminal = () => setIsTerminalOpen(prev => !prev);

  const toggleMarkdownViewMode = (filePath: string) => {
    setActiveViewMode(prev => ({
      ...prev,
      [filePath]: prev[filePath] === 'preview' ? 'code' : 'preview'
    }));
  };

  const updateFileContent = (filePath: string, content: string) => {
    setFiles(prev => prev.map(f => f.path === filePath ? { ...f, content } : f));
    setUnsavedFiles(prev => ({ ...prev, [filePath]: true }));
  };

  const markFileSaved = (filePath: string) => {
    setUnsavedFiles(prev => ({ ...prev, [filePath]: false }));
  };

  return (
    <VSCodeContext.Provider
      value={{
        files,
        tree,
        openTabs,
        activeFile,
        activePanel,
        isSidebarOpen,
        isTerminalOpen,
        activeViewMode,
        unsavedFiles,
        toasts,
        openTab,
        closeTab,
        closeAllTabs,
        setActiveFile: setActiveFileState,
        setActivePanel,
        toggleSidebar,
        toggleTerminal,
        reorderTabs,
        toggleMarkdownViewMode,
        updateFileContent,
        addToast,
        removeToast,
        markFileSaved
      }}
    >
      {children}
    </VSCodeContext.Provider>
  );
};

export const useVSCode = () => {
  const context = useContext(VSCodeContext);
  if (!context) throw new Error('useVSCode must be used within a VSCodeProvider');
  return context;
};
