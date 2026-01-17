'use client';

import { useState, useEffect } from 'react';
import { StressIndicator, Statistics, TaskForm, TaskList } from '../app/components';

// Definisi tipe data tugas
interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function Home() {
  // 1. STATE MANAGEMENT (Otak Aplikasi)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data dari LocalStorage saat pertama buka (Client Side Only)
  useEffect(() => {
    const saved = localStorage.getItem('zendo-tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error('Gagal load data', e);
      }
    }
    setLoading(false);
  }, []);

  // Simpan ke LocalStorage setiap ada perubahan tasks
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('zendo-tasks', JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  // 2. LOGIC HANDLERS (Aksi)
  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // 3. KALKULASI STATISTIK
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const activeTasks = totalTasks - completedTasks;

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8 animate-enter">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
            Zen<span className="text-indigo-600">Do</span>.
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Kelola tugas dengan cerdas, monitor stres dengan bijak.
          </p>
        </div>

        {/* Component 1: Stress Indicator */}
        <div className="w-full">
           {/* Kita pasang semua kemungkinan props biar TS puas */}
           <StressIndicator 
             taskCount={activeTasks} 
             activeTasks={activeTasks} 
             totalTasks={totalTasks} 
           /> 
        </div>

        {/* Component 2: Statistics */}
        <div className="w-full">
           <Statistics 
             total={totalTasks} 
             completed={completedTasks} 
             active={activeTasks} 
           />
        </div>

        {/* Component 3: Form Input */}
        <div className="w-full">
           <TaskForm onAddTask={addTask} />
        </div>

        {/* Component 4: List Tugas */}
        <div className="w-full">
           <TaskList 
             tasks={tasks} 
             loading={loading} 
             onToggle={toggleTask} 
             onDelete={deleteTask} 
           />
        </div>

      </div>
    </main>
  );
}