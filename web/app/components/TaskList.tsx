"use client";

import { 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Calendar, 
  AlertCircle, 
  ArrowDown, 
  Clock, 
  Loader2, 
  Inbox 
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
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

// Helper untuk warna badge
const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case "HIGH":
      return "bg-red-100 text-red-700 border-red-200";
    case "MEDIUM":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "LOW":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

// Helper untuk icon prioritas
const PriorityIcon = ({ priority }: { priority: string }) => {
  switch (priority) {
    case "HIGH":
      return <AlertCircle size={14} className="mr-1" />;
    case "MEDIUM":
      return <Clock size={14} className="mr-1" />;
    case "LOW":
      return <ArrowDown size={14} className="mr-1" />;
    default:
      return null;
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
  
  // 1. Loading State dengan Spinner Animasi
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-12 flex flex-col items-center justify-center text-gray-400">
        <Loader2 size={40} className="animate-spin text-indigo-500 mb-4" />
        <p className="text-sm font-medium">Memuat tugas...</p>
      </div>
    );
  }

  // 2. Empty State dengan Icon Inbox
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 flex flex-col items-center justify-center text-gray-400">
        <div className="bg-gray-50 p-4 rounded-full mb-4">
          <Inbox size={48} className="text-gray-300" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Semua Beres!</h3>
        <p className="text-sm mt-1">Tidak ada tugas aktif saat ini.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
      {tasks.map((task) => (
        <div
          key={task.id}
          onClick={() => focusMode && onSelectTask(task.id)}
          className={`p-4 flex items-start gap-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer group ${
            selectedTaskId === task.id && focusMode
              ? "bg-indigo-50 border-l-4 border-indigo-600 pl-[1.2rem]" // Adjustment biar padding seimbang
              : "border-l-4 border-transparent"
          }`}
        >
          {/* Checkbox Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(task.id, task.completed);
            }}
            className="mt-1 text-gray-400 hover:text-indigo-600 transition-colors shrink-0"
          >
            {task.completed ? (
              <CheckCircle2 size={24} className="text-emerald-500" />
            ) : (
              <Circle size={24} />
            )}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <p
              className={`text-lg font-medium break-all transition-all ${
                task.completed ? "line-through text-gray-400 decoration-gray-300" : "text-gray-800"
              }`}
            >
              {task.title}
            </p>
            
            {task.description && (
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>
            )}

            {/* Metadata (Priority & Date) */}
            <div className="flex items-center gap-3 mt-3">
              <span
                className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getPriorityStyles(
                  task.priority
                )}`}
              >
                <PriorityIcon priority={task.priority} />
                {task.priority}
              </span>
              
              <div className="flex items-center text-xs text-gray-400">
                <Calendar size={12} className="mr-1.5" />
                {new Date(task.createdAt).toLocaleDateString("id-ID", {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </div>
            </div>
          </div>

          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100"
            title="Hapus Tugas"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}