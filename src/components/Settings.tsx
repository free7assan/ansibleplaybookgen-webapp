import React from 'react';
import { Save } from 'lucide-react';

export function Settings() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Default Playbook Settings</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Default Playbook Type
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                defaultValue="simple"
              >
                <option value="simple">Simple</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Default Inventory File
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Path to inventory file"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900">Export Settings</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <input
                id="yaml"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                defaultChecked
              />
              <label htmlFor="yaml" className="ml-2 block text-sm text-gray-700">
                Export as YAML
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="json"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="json" className="ml-2 block text-sm text-gray-700">
                Export as JSON
              </label>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}