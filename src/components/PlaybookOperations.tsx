import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PlaybookOperationsProps {
  operations: string[];
}

export function PlaybookOperations({ operations }: PlaybookOperationsProps) {
  return (
    <div className="mt-4 mb-8 bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Playbook Operations</h3>
      <ul className="space-y-2">
        {operations.map((operation, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            {operation}
          </li>
        ))}
      </ul>
    </div>
  );
}