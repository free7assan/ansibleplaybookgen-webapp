import React from 'react';
import type { PlaybookType } from './PlaybookForm';

interface PlaybookDescriptionProps {
  value: string;
  onChange: (value: string) => void;
  type: PlaybookType;
}

export function PlaybookDescription({ value, onChange, type }: PlaybookDescriptionProps) {
  const placeholder = type === 'simple'
    ? "Example: Install Nginx and Python on Ubuntu servers"
    : "Example: Install and configure Nginx with SSL, Python, and Git. Set up a web application directory and handle service restarts";

  return (
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
        Describe your automation needs
      </label>
      <textarea
        id="description"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}