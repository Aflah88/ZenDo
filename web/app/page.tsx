"use client";

import { Statistics, StressIndicator, TaskForm, TaskList } from "@/components";
import { useTasks } from "@/hooks/useTasks";
import { useState } from "react";

export default function Home() {
  const [focusMode, setFocusMode] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const { tasks, loading, addTask, toggleTask, deleteTask } = useTasks(filter);

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  const displayTasks =
    focusMode && selectedTaskId
      ? tasks.filter((t) => t.id === selectedTaskId)
      : tasks;

  const handleAddTask = async (title: string, priority: string) => {
    await addTask(title, priority);
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    await toggleTask(id, completed);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    if (selectedTaskId === id) setSelectedTaskId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-indigo-900 mb-2">
            ZenDo
          </h1>
          <p className="text-indigo-700 text-lg">
            Kelola tugas dengan cerdas, monitor stres dengan bijak
          </p>
        </div>

        {/* Stress Indicator & Statistics */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <StressIndicator
            activeTasks={activeTasks.length}
            totalTasks={tasks.length}
          />
          <Statistics
            total={tasks.length}
            completed={completedTasks.length}
            active={activeTasks.length}
          />
        </div>

        {/* Task Form */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Filter & Mode Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "all"
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 border-2 border-indigo-300 hover:bg-indigo-50"
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "active"
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 border-2 border-indigo-300 hover:bg-indigo-50"
            }`}
          >
            Aktif
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "completed"
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 border-2 border-indigo-300 hover:bg-indigo-50"
            }`}
          >
            Selesai
          </button>

          <div className="flex-1" />

          <button
            onClick={() => {
              setFocusMode(!focusMode);
              if (focusMode) setSelectedTaskId(null);
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              focusMode
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600 border-2 border-purple-300 hover:bg-purple-50"
            }`}
          >
            {focusMode ? "🎯 Mode Fokus: ON" : "👁️ Aktifkan Mode Fokus"}
          </button>
        </div>

        {/* Task List */}
        <TaskList
          tasks={displayTasks}
          loading={loading}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          focusMode={focusMode}
          selectedTaskId={selectedTaskId}
          onSelectTask={setSelectedTaskId}
        />

        {/* Focus Mode Info */}
        {focusMode && selectedTaskId && (
          <div className="mt-6 bg-purple-100 border-l-4 border-purple-600 p-4 rounded text-purple-800">
            <p className="font-semibold">📍 Mode Fokus Aktif</p>
            <p className="text-sm mt-1">
              Anda sedang fokus pada satu tugas. Klik tugas lain untuk mengubah
              fokus.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
