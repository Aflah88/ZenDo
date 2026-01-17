'use client';

import { 
  ListTodo, 
  CheckCircle2, 
  Zap, 
  Trophy 
} from "lucide-react";

interface StatisticsProps {
  total: number;
  completed: number;
  active: number;
}

export function Statistics({ total, completed, active }: StatisticsProps) {
  // Hitung persentase kelulusan tugas
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
      
      {/* Card 1: Total Tugas */}
      <div className="bg-white p-5 rounded-2xl border border-indigo-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
            <ListTodo size={20} />
          </div>
          <span className="text-xs font-bold text-indigo-300">TOTAL</span>
        </div>
        <div>
          <div className="text-3xl font-bold text-slate-800">{total}</div>
          <div className="text-xs text-slate-500 font-medium mt-1">Misi Terdaftar</div>
        </div>
      </div>

      {/* Card 2: Selesai (Success) */}
      <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:scale-110 transition-transform">
            <CheckCircle2 size={20} />
          </div>
          <span className="text-xs font-bold text-emerald-300">DONE</span>
        </div>
        <div>
          <div className="text-3xl font-bold text-slate-800">{completed}</div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            {completionRate}% Selesai ({completionRate === 100 ? 'Sempurna!' : 'Keep going!'})
          </div>
        </div>
      </div>

      {/* Card 3: Aktif (Focus) */}
      <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
        <div className="flex justify-between items-start mb-2">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg group-hover:scale-110 transition-transform">
            <Zap size={20} />
          </div>
          <span className="text-xs font-bold text-amber-300">ACTIVE</span>
        </div>
        <div>
          <div className="text-3xl font-bold text-slate-800">{active}</div>
          <div className="text-xs text-slate-500 font-medium mt-1">Sedang Dikerjakan</div>
        </div>
      </div>

    </div>
  );
}