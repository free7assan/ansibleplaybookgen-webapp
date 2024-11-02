import React, { useState } from 'react';
import { Copy, CheckCircle, FileText } from 'lucide-react';

interface PlaybookOutputProps {
  playbook: string | null;
  files: Record<string, string> | null;
  format: 'single' | 'multiple';
}

export function PlaybookOutput({ playbook, files, format }: PlaybookOutputProps) {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>(
    format === 'multiple' ? 'main.yml' : ''
  );

  const copyToClipboard = async (content: string, fileKey?: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedFile(fileKey || 'single');
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const getDisplayContent = () => {
    if (format === 'single') {
      return playbook;
    }
    if (files && selectedFile) {
      return files[selectedFile];
    }
    return '';
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Generated Playbook</h2>
        {format === 'multiple' && (
          <select
            value={selectedFile}
            onChange={(e) => setSelectedFile(e.target.value)}
            className="ml-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {files && Object.keys(files).map((fileName) => (
              <option key={fileName} value={fileName}>
                {fileName}
              </option>
            ))}
          </select>
        )}
      </div>

      {format === 'multiple' && (
        <div className="mb-4 flex flex-wrap gap-2">
          {files && Object.entries(files).map(([fileName, content]) => (
            <button
              key={fileName}
              onClick={() => setSelectedFile(fileName)}
              className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${
                selectedFile === fileName
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileText className="h-4 w-4 mr-2" />
              {fileName}
            </button>
          ))}
        </div>
      )}

      <div className="relative">
        <button
          onClick={() => copyToClipboard(getDisplayContent() || '', selectedFile)}
          className="absolute right-4 top-4 inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {copiedFile === (format === 'multiple' ? selectedFile : 'single') ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </>
          )}
        </button>
        <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
          <code>{getDisplayContent()}</code>
        </pre>
      </div>
    </div>
  );
}