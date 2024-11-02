import { PlaybookType } from '../components/PlaybookForm';
import { simplePlaybookTemplate, advancedPlaybookTemplate } from '../utils/playbookTemplates';

export interface PlaybookStep {
  id: string;
  title: string;
  description: string;
}

export interface GenerateStepsParams {
  description: string;
  type: PlaybookType;
}

export interface GeneratePlaybookParams {
  description: string;
  type: PlaybookType;
  format: 'single' | 'multiple';
  steps: PlaybookStep[];
}

export async function generateSteps({ description, type }: GenerateStepsParams): Promise<PlaybookStep[]> {
  // Simulated API call - replace with actual AI integration
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real implementation, we would send the description to an AI service
      // and get back a list of steps. For now, we'll generate some example steps
      if (type === 'simple') {
        resolve([
          {
            id: '1',
            title: 'Update package cache',
            description: 'Ensure package cache is up to date'
          },
          {
            id: '2',
            title: 'Install required packages',
            description: 'Install necessary system packages'
          },
          {
            id: '3',
            title: 'Configure services',
            description: 'Set up and configure required services'
          }
        ]);
      } else {
        resolve([
          {
            id: '1',
            title: 'Update package cache',
            description: 'Ensure package cache is up to date'
          },
          {
            id: '2',
            title: 'Install required packages',
            description: 'Install necessary system packages'
          },
          {
            id: '3',
            title: 'Create application directories',
            description: 'Set up required directory structure'
          },
          {
            id: '4',
            title: 'Configure services',
            description: 'Set up and configure required services'
          },
          {
            id: '5',
            title: 'Set up handlers',
            description: 'Configure service restart handlers'
          }
        ]);
      }
    }, 1000);
  });
}

export async function generatePlaybook({ 
  description, 
  type,
  format,
  steps
}: GeneratePlaybookParams): Promise<string | Record<string, string>> {
  // Simulated API call - replace with actual AI integration
  return new Promise((resolve) => {
    setTimeout(() => {
      if (format === 'single') {
        const template = type === 'simple' ? simplePlaybookTemplate : advancedPlaybookTemplate;
        resolve(template);
      } else {
        // For multiple files format
        if (type === 'simple') {
          resolve({
            'main.yml': '---\n- name: Main Playbook\n  import_playbook: tasks/main.yml',
            'tasks/main.yml': simplePlaybookTemplate
          });
        } else {
          resolve({
            'main.yml': '---\n- name: Main Playbook\n  import_playbook: tasks/main.yml',
            'tasks/main.yml': '---\n- name: Include tasks\n  import_tasks: install.yml',
            'tasks/install.yml': advancedPlaybookTemplate,
            'vars/main.yml': '---\nnginx_port: 80\napp_root: /var/www/myapp',
            'handlers/main.yml': '---\n- name: Restart Nginx\n  service:\n    name: nginx\n    state: restarted'
          });
        }
      }
    }, 1500);
  });
}