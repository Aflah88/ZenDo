'use client';

import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (text: string) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group z-10">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-sm"></div>
      
      <div className="relative flex items-center bg-white p-2 rounded-2xl shadow-sm border border-slate-200 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-300">
        
        {/* Icon Hiasan Kiri */}
        <div className="pl-4 pr-2 text-slate-400">
          <Sparkles size={20} />
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Mau produktif apa hari ini?"
          className="flex-1 bg-transparent py-3 px-2 text-slate-800 placeholder:text-slate-400 font-medium focus:outline-none"
        />

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={!text.trim()}
          className="bg-slate-900 hover:bg-indigo-600 text-white p-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/20"
        >
          <Plus size={20} strokeWidth={3} />
        </button>
      </div>
    </form>
  );
}