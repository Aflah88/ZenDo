'use client';

import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
  dueDate?: string;
  tags: string[];
}

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  focusMode: boolean;
  selectedTaskId: string | null;
  onSelectTask: (id: string) => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'HIGH':
      return 'bg-red-100 text-red-700';
    case 'MEDIUM':
      return 'bg-yellow-100 text-yellow-700';
    case 'LOW':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export function TaskList({
  tasks,
  loading,
  onToggle,
  onDelete,
  focusMode,
  selectedTaskId,
  onSelectTask,
}: TaskListProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center text-gray-400">
        ⏳ Memuat tugas...
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center text-gray-400">
        <div className="text-5xl mb-3">🎉</div>
        <p>Tidak ada tugas. Nikmati waktu Anda!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {tasks.map((task) => (
        <div
          key={task.id}
          onClick={() => focusMode && onSelectTask(task.id)}
          className={`p-4 flex items-start gap-4 border-b hover:bg-gray-50 transition cursor-pointer ${
            selectedTaskId === task.id && focusMode ? 'bg-indigo-50 border-l-4 border-indigo-600' : ''
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(task.id, task.completed);
            }}
            className="mt-1 text-indigo-600 hover:text-indigo-700 transition flex-shrink-0"
          >
            {task.completed ? (
              <CheckCircle2 size={24} className="text-green-500" />
            ) : (
              <Circle size={24} />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <p
              className={`text-lg font-medium break-words ${
                task.completed ? 'line-through text-gray-400' : 'text-gray-800'
              }`}
            >
              {task.title}
            </p>
            {task.description && (
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            )}
            <div className="flex gap-2 mt-2">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                {task.priority === 'HIGH' ? '🔴' : task.priority === 'MEDIUM' ? '🟡' : '🟢'} {task.priority}
              </span>
              <p className="text-xs text-gray-400">
                {new Date(task.createdAt).toLocaleDateString('id-ID')}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition flex-shrink-0"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}
