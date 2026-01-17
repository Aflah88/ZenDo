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
    <div className={`p-6 rounded-2xl border transition-all ${status.bg} ${status.border}`}>
      <div className="flex items-center gap-2">
        {status.icon}
        <h2 className={`text-2xl font-bold ${status.color}`}>{status.level}</h2>
      </div>
      <p className={`mt-2 text-sm ${status.color}`}>{status.message}</p>
    </div>
  );
}