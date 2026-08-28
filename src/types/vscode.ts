export type FileType = 'markdown' | 'typescript' | 'tsx' | 'json';

export interface FileItem {
  id: string;
  name: string;
  path: string;
  type: FileType;
  content: string;
  icon: string; // Codicon class name or file type identifier
  isUnsaved?: boolean;
  isDirty?: boolean;
  language: string;
}

export interface FolderItem {
  id: string;
  name: string;
  path: string;
  children: (FileItem | FolderItem)[];
  isOpen?: boolean;
}

export type ActivityPanel = 'explorer' | 'search' | 'git' | 'extensions' | 'settings';

export interface TerminalOutput {
  id: string;
  command?: string;
  output: React.ReactNode;
  type?: 'input' | 'output' | 'error' | 'system';
}

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  upwork?: string;
  website: string;
  location: string;
}
