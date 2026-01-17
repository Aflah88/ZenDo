'use client';

import { Smile, Meh, AlertTriangle, Activity } from "lucide-react";

interface StressIndicatorProps {
  activeTasks: number;
  totalTasks: number;
}

export function StressIndicator({ activeTasks, totalTasks }: StressIndicatorProps) {
  const getStressLevel = () => {
    if (activeTasks <= 3) {
      return {
        level: 'Rendah',
        color: 'text-emerald-700',
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
        barColor: 'bg-emerald-500',
        icon: <Smile size={28} strokeWidth={2.5} />,
        message: 'Pikiran tenang, performa maksimal.'
      };
    }
    if (activeTasks <= 7) {
      return {
        level: 'Sedang',
        color: 'text-amber-700',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        barColor: 'bg-amber-500',
        icon: <Meh size={28} strokeWidth={2.5} />,
        message: 'Beban mulai terasa, tetap fokus.'
      };
    }
    return {
      level: 'Tinggi',
      color: 'text-rose-700',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
      barColor: 'bg-rose-500',
      icon: <AlertTriangle size={28} strokeWidth={2.5} />,
      message: 'Warning! Kurangi beban segera.'
    };
  };

  const status = getStressLevel();

  const stressPercentage = Math.min((activeTasks / 10) * 100, 100);

  return (
    <div className={`relative overflow-hidden p-6 rounded-2xl border transition-all duration-500 ${status.bg} ${status.border}`}>
      
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1 opacity-80">
            <Activity size={16} className={status.color} />
            <span className={`text-xs font-bold uppercase tracking-wider ${status.color}`}>Stress Monitor</span>
          </div>
          <h2 className={`text-3xl font-extrabold ${status.color} tracking-tight`}>
            {status.level}
          </h2>
        </div>
        
        {/* Icon Container */}
        <div className={`p-3 bg-white rounded-xl shadow-sm ${status.color}`}>
          {status.icon}
        </div>
      </div>

      {/* Info & Progress Bar Section */}
      <div className="relative z-10">
        <p className={`text-sm font-medium mb-4 opacity-90 ${status.color}`}>
          {status.message}
        </p>

        <div className="flex items-center gap-3 text-xs font-bold">
          {/* Custom Progress Bar */}
          <div className="flex-1 h-2.5 bg-white/60 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${status.barColor}`}
              style={{ width: `${Math.max(stressPercentage, 5)}%` }} 
            />
          </div>
          <span className={status.color}>
            {activeTasks} / {totalTasks} Aktif
          </span>
        </div>
      </div>

      {/* Hiasan Background (Glow Effect) */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-current opacity-5 rounded-full blur-3xl pointer-events-none text-black" />
    </div>
  );
}