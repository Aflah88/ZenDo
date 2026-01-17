'use client';

import { useState } from 'react';
import { Plus, AlertCircle, ArrowDown, Clock } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (title: string, priority: string) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [input, setInput] = useState('');
  const [priority, setPriority] = useState('MEDIUM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTask(input, priority);
      setInput('');
      setPriority('MEDIUM');
    }
  };

  // Helper untuk menampilkan icon sesuai state priority yang dipilih
  const getPriorityIcon = () => {
    switch (priority) {
      case 'HIGH': return <AlertCircle size={18} className="text-rose-500" />;
      case 'LOW': return <ArrowDown size={18} className="text-emerald-500" />;
      default: return <Clock size={18} className="text-amber-500" />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 relative group">
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 focus-within:shadow-md focus-within:border-indigo-200 transition-all duration-300">
        
        {/* Input Text */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Mau produktif apa hari ini?"
          className="flex-1 px-4 py-3 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium"
        />

        {/* Priority Selector Area */}
        <div className="relative border-t sm:border-t-0 sm:border-l border-gray-100 flex items-center pl-3">
          
          {/* Visual Icon (Berubah sesuai pilihan) */}
          <div className="pointer-events-none">
            {getPriorityIcon()}
          </div>

          {/* Native Select (Transparent) */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full sm:w-auto h-full pl-2 pr-8 py-3 bg-transparent outline-none text-sm font-semibold text-slate-600 cursor-pointer hover:text-indigo-600 transition-colors appearance-none"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white p-3 sm:px-6 rounded-xl font-semibold transition-all shadow-md hover:shadow-indigo-200 flex items-center justify-center gap-2"
        >
          <Plus size={20} strokeWidth={3} />
          <span className="hidden sm:inline">Tambah</span>
        </button>
      </div>
    </form>
  );
}