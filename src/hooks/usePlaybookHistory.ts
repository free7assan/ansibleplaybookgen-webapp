import { useState } from 'react';
import type { PlaybookHistory } from '../types';

export function usePlaybookHistory() {
  const [playbooks, setPlaybooks] = useState<PlaybookHistory[]>([]);

  const addPlaybook = (name: string, type: 'simple' | 'advanced', content: string) => {
    const newPlaybook: PlaybookHistory = {
      id: Date.now().toString(),
      name,
      type,
      createdAt: new Date(),
      content,
    };
    
    setPlaybooks(prev => [newPlaybook, ...prev]);
  };

  const deletePlaybook = (id: string) => {
    setPlaybooks(prev => prev.filter(playbook => playbook.id !== id));
  };

  return {
    playbooks,
    addPlaybook,
    deletePlaybook,
  };
}