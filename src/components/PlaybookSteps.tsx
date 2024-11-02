import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { Plus } from 'lucide-react';

interface PlaybookStep {
  id: string;
  title: string;
  description: string;
}

interface PlaybookStepsProps {
  steps: PlaybookStep[];
  onStepsChange: (steps: PlaybookStep[]) => void;
}

export function PlaybookSteps({ steps, onStepsChange }: PlaybookStepsProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = steps.findIndex((step) => step.id === active.id);
      const newIndex = steps.findIndex((step) => step.id === over.id);
      onStepsChange(arrayMove(steps, oldIndex, newIndex));
    }
  };

  const startEditing = (step: PlaybookStep) => {
    setEditingId(step.id);
    setEditTitle(step.title);
    setEditDescription(step.description);
  };

  const saveEdit = (id: string) => {
    onStepsChange(
      steps.map(step =>
        step.id === id
          ? { ...step, title: editTitle, description: editDescription }
          : step
      )
    );
    setEditingId(null);
  };

  const deleteStep = (id: string) => {
    onStepsChange(steps.filter(step => step.id !== id));
  };

  const addNewStep = () => {
    const newStep: PlaybookStep = {
      id: Date.now().toString(),
      title: 'New Step',
      description: 'Add step description'
    };
    onStepsChange([...steps, newStep]);
  };

  return (
    <div className="mt-6 bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Playbook Steps</h3>
          <button
            onClick={addNewStep}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Step
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={steps.map(step => step.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="divide-y divide-gray-200">
            {steps.map((step) => (
              <SortableItem
                key={step.id}
                id={step.id}
                step={step}
                isEditing={editingId === step.id}
                editTitle={editTitle}
                editDescription={editDescription}
                onEdit={startEditing}
                onSave={saveEdit}
                onDelete={deleteStep}
                onEditTitle={setEditTitle}
                onEditDescription={setEditDescription}
                onCancelEdit={() => setEditingId(null)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}