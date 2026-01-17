'use client';

import { useState, useEffect } from 'react';
import { StressIndicator, Statistics, TaskForm, TaskList } from '../app/components';

interface Task {
  id: string;
  title: string;          
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
  createdAt: string;      
  tags: string[];         
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data (Client Side Only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zendo-tasks');
      if (saved) {
        try {
          setTasks(JSON.parse(saved));
        } catch (e) {
          console.error('Gagal load data', e);
        }
      }
      setLoading(false);
    }
  }, []);

  // Simpan data
  useEffect(() => {
    if (!loading && typeof window !== 'undefined') {
      localStorage.setItem('zendo-tasks', JSON.stringify(tasks));
    }
  }, [tasks, loading]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: text,
      completed: false,
      priority: 'Medium', // Default priority
      createdAt: new Date().toISOString(),
      tags: ['General']   // Default tag
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

  // Statistik
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