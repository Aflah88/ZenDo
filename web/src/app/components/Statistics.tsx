'use client';

import { ListTodo, CheckCircle2, Zap } from 'lucide-react';

interface StatisticsProps {
  total: number;
  completed: number;
  active: number;
}

export function Statistics({ total, completed, active }: StatisticsProps) {
  // Hitung persentase selesai
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-3 gap-4">
      
      {/* Kartu 1: Total Misi */}
      <div className="bg-white p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col items-center justify-center text-center group hover:border-indigo-100 transition-colors">
        <div className="mb-2 p-2 bg-slate-50 text-slate-500 rounded-xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
          <ListTodo size={20} />
        </div>
        <span className="text-2xl font-black text-slate-800 tracking-tight">
          {total}
        </span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
          Total Misi
        </span>
      </div>

      {/* Kartu 2: Selesai */}
      <div className="bg-white p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col items-center justify-center text-center group hover:border-emerald-100 transition-colors">
        <div className="mb-2 p-2 bg-emerald-50 text-emerald-600 rounded-xl">
          <CheckCircle2 size={20} />
        </div>
        <span className="text-2xl font-black text-slate-800 tracking-tight">
          {percentage}%
        </span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
          Selesai
        </span>
      </div>

      {/* Kartu 3: Aktif */}
      <div className="bg-white p-4 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col items-center justify-center text-center group hover:border-amber-100 transition-colors">
        <div className="mb-2 p-2 bg-amber-50 text-amber-600 rounded-xl">
          <Zap size={20} />
        </div>
        <span className="text-2xl font-black text-slate-800 tracking-tight">
          {active}
        </span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
          On Progress
        </span>
      </div>

    </div>
  );
}