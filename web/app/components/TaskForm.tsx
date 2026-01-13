'use client';

import { useState } from 'react';

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

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tambahkan tugas baru..."
          className="flex-1 px-4 py-3 rounded-lg border-2 border-indigo-300 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-4 py-3 rounded-lg border-2 border-indigo-300 focus:outline-none focus:border-indigo-600 bg-white"
        >
          <option value="LOW">Rendah</option>
          <option value="MEDIUM">Sedang</option>
          <option value="HIGH">Tinggi</option>
        </select>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          + Tambah
        </button>
      </div>
    </form>
  );
}
