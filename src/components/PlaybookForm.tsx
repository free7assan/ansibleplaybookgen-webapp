import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { PlaybookTypeSelector } from './PlaybookTypeSelector';
import { PlaybookOutput } from './PlaybookOutput';
import { PlaybookDescription } from './PlaybookDescription';
import { PlaybookSteps } from './PlaybookSteps';
import { generateSteps, generatePlaybook } from '../services/playbookGenerator';
import { usePlaybookContext } from '../context/PlaybookContext';

export type PlaybookType = 'simple' | 'advanced';

interface PlaybookStep {
  id: string;
  title: string;
  description: string;
}

export function PlaybookForm() {
  const [description, setDescription] = useState('');
  const [playbookType, setPlaybookType] = useState<PlaybookType>('simple');
  const [format, setFormat] = useState<'single' | 'multiple'>('single');
  const [generatedPlaybook, setGeneratedPlaybook] = useState<string | null>(null);
  const [generatedFiles, setGeneratedFiles] = useState<Record<string, string> | null>(null);
  const [steps, setSteps] = useState<PlaybookStep[]>([]);
  const [isGeneratingSteps, setIsGeneratingSteps] = useState(false);
  const [isGeneratingPlaybook, setIsGeneratingPlaybook] = useState(false);
  const { addPlaybook } = usePlaybookContext();

  const handleGenerateSteps = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingSteps(true);
    setGeneratedPlaybook(null);
    setGeneratedFiles(null);
    
    try {
      const generatedSteps = await generateSteps({
        description,
        type: playbookType,
      });
      setSteps(generatedSteps);
    } catch (error) {
      console.error('Failed to generate steps:', error);
    } finally {
      setIsGeneratingSteps(false);
    }
  };

  const handleGeneratePlaybook = async () => {
    setIsGeneratingPlaybook(true);
    
    try {
      const result = await generatePlaybook({
        description,
        type: playbookType,
        format,
        steps
      });
      
      if (format === 'single') {
        setGeneratedPlaybook(result as string);
        setGeneratedFiles(null);
      } else {
        setGeneratedFiles(result as Record<string, string>);
        setGeneratedPlaybook(null);
      }

      // Save to history
      addPlaybook(
        description.slice(0, 50) + (description.length > 50 ? '...' : ''),
        playbookType,
        format,
        result
      );
    } catch (error) {
      console.error('Failed to generate playbook:', error);
    } finally {
      setIsGeneratingPlaybook(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleGenerateSteps} className="space-y-6">
        <PlaybookTypeSelector
          selectedType={playbookType}
          onTypeChange={setPlaybookType}
          format={format}
          onFormatChange={setFormat}
        />
        
        <PlaybookDescription
          value={description}
          onChange={setDescription}
          type={playbookType}
        />

        <button
          type="submit"
          disabled={isGeneratingSteps || !description.trim()}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGeneratingSteps ? (
            <>
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
              Generating Steps...
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              Generate Steps
            </>
          )}
        </button>
      </form>

      {steps.length > 0 && (
        <>
          <PlaybookSteps
            steps={steps}
            onStepsChange={setSteps}
          />

          <div className="mt-6">
            <button
              onClick={handleGeneratePlaybook}
              disabled={isGeneratingPlaybook || steps.length === 0}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPlaybook ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Generating Playbook...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Generate Playbook
                </>
              )}
            </button>
          </div>
        </>
      )}

      {(generatedPlaybook || generatedFiles) && (
        <PlaybookOutput 
          playbook={generatedPlaybook} 
          files={generatedFiles}
          format={format}
        />
      )}
    </div>
  );
}