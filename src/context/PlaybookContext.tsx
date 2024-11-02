import React, { createContext, useContext } from 'react';
import { usePlaybookHistory } from '../hooks/usePlaybookHistory';
import type { PlaybookHistory } from '../types';

interface PlaybookContextType {
  playbooks: PlaybookHistory[];
  addPlaybook: (name: string, type: 'simple' | 'advanced', content: string) => void;
  deletePlaybook: (id: string) => void;
}

const PlaybookContext = createContext<PlaybookContextType | null>(null);

export function PlaybookProvider({ children }: { children: React.ReactNode }) {
  const playbookHistory = usePlaybookHistory();

  return (
    <PlaybookContext.Provider value={playbookHistory}>
      {children}
    </PlaybookContext.Provider>
  );
}

export function usePlaybookContext() {
  const context = useContext(PlaybookContext);
  if (!context) {
    throw new Error('usePlaybookContext must be used within a PlaybookProvider');
  }
  return context;
}