import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X, Edit2, Check } from 'lucide-react';

interface PlaybookStep {
  id: string;
  title: string;
  description: string;
}

interface SortableItemProps {
  id: string;
  step: PlaybookStep;
  isEditing: boolean;
  editTitle: string;
  editDescription: string;
  onEdit: (step: PlaybookStep) => void;
  onSave: (id: string) => void;
  onDelete: (id: string) => void;
  onEditTitle: (value: string) => void;
  onEditDescription: (value: string) => void;
  onCancelEdit: () => void;
}

export function SortableItem({
  id,
  step,
  isEditing,
  editTitle,
  editDescription,
  onEdit,
  onSave,
  onDelete,
  onEditTitle,
  onEditDescription,
  onCancelEdit
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="p-4 hover:bg-gray-50">
      <div className="flex items-start space-x-3">
        <div
          {...attributes}
          {...listeners}
          className="flex items-center text-gray-400 hover:text-gray-600 cursor-move"
        >
          <GripVertical className="h-5 w-5" />
        </div>

        {isEditing ? (
          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => onEditTitle(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Step title"
            />
            <textarea
              value={editDescription}
              onChange={(e) => onEditDescription(e.target.value)}
              rows={2}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Step description"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={onCancelEdit}
                className="inline-flex items-center px-2 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => onSave(id)}
                className="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Check className="h-4 w-4 mr-1" />
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900">
              {step.title}
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              {step.description}
            </p>
          </div>
        )}

        {!isEditing && (
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(step)}
              className="text-gray-400 hover:text-gray-600"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="text-gray-400 hover:text-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}