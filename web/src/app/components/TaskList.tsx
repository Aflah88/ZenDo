'use client';

import { Check, Trash2, Calendar, Tag, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
  tags: string[];
}

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, loading, onToggle, onDelete }: TaskListProps) {
  
  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-slate-200 rounded-2xl w-full"></div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
        <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-500">
          <Calendar size={28} />
        </div>
        <h3 className="text-lg font-bold text-slate-800">Hari yang tenang!</h3>
        <p className="text-slate-400 text-sm mt-1">Belum ada misi. Tambahkan satu di atas.</p>
      </div>
    );
  }

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'HIGH': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'MEDIUM': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div 
          key={task.id} 
          className={`group relative bg-white p-5 rounded-2xl transition-all duration-300 border border-slate-100 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 ${
            task.completed ? 'opacity-60 bg-slate-50' : 'opacity-100'
          }`}
        >
          <div className="flex items-start gap-4">
            
            {/* Checkbox Button */}
            <button
              onClick={() => onToggle(task.id)}
              className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                task.completed 
                  ? 'bg-indigo-500 border-indigo-500 text-white scale-110' 
                  : 'border-slate-300 text-transparent hover:border-indigo-400'
              }`}
            >
              <Check size={14} strokeWidth={4} />
            </button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {/* Priority Badge */}
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                {/* Date (Opsional, tampilkan jam simpel) */}
                <span className="text-xs text-slate-400 flex items-center gap-1">
                   • {new Date(task.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                </span>
              </div>

              <h4 className={`text-base font-semibold text-slate-800 truncate transition-all ${
                task.completed ? 'line-through text-slate-400' : ''
              }`}>
                {task.title}
              </h4>
            </div>

            {/* Delete Button (Muncul saat Hover) */}
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-100 md:opacity-0 group-hover:opacity-100"
              title="Hapus Misi"
            >
              <Trash2 size={18} />
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}