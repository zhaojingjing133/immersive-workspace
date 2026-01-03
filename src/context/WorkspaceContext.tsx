import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WorkspaceSize } from '../utils/constants';

export type WorkspaceMode = 'text' | 'pdf';
export type WorkspacePosition = 'left' | 'center' | 'right';

interface WorkspaceContextType {
  size: WorkspaceSize;
  setSize: (size: WorkspaceSize) => void;
  position: WorkspacePosition;
  setPosition: (position: WorkspacePosition) => void;
  content: string;
  setContent: (content: string) => void;
  title: string;
  setTitle: (title: string) => void;
  mode: WorkspaceMode;
  setMode: (mode: WorkspaceMode) => void;
  pdfFile: File | null;
  setPdfFile: (file: File | null) => void;
  pdfScale: number;
  setPdfScale: (scale: number) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within WorkspaceProvider');
  }
  return context;
};

interface WorkspaceProviderProps {
  children: ReactNode;
}

export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({ children }) => {
  const [size, setSize] = useState<WorkspaceSize>(WorkspaceSize.SMALL);
  const [position, setPosition] = useState<WorkspacePosition>('center');
  const [content, setContent] = useState<string>('');
  const [title, setTitle] = useState<string>('标题');
  const [mode, setMode] = useState<WorkspaceMode>('text');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfScale, setPdfScale] = useState<number>(1.0);

  return (
    <WorkspaceContext.Provider
      value={{
        size,
        setSize,
        position,
        setPosition,
        content,
        setContent,
        title,
        setTitle,
        mode,
        setMode,
        pdfFile,
        setPdfFile,
        pdfScale,
        setPdfScale,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
