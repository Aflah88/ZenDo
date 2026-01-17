'use client';

import { Activity, Smile, Frown, Meh } from 'lucide-react';

export interface StressIndicatorProps {
  taskCount: number;    
  activeTasks?: number;  
  totalTasks?: number;   
}

export function StressIndicator({ taskCount = 0 }: StressIndicatorProps) {
  // Logic visual sederhana
  const getStressLevel = (count: number) => {
    if (count >= 5) return { 
      label: 'Tinggi', 
      color: 'bg-rose-500', 
      text: 'text-rose-600', 
      bgLight: 'bg-rose-50', 
      icon: Frown, 
      desc: 'Beban overload! Istirahat dulu sejenak.' 
    };
    if (count >= 3) return { 
      label: 'Sedang', 
      color: 'bg-amber-500', 
      text: 'text-amber-600', 
      bgLight: 'bg-amber-50', 
      icon: Meh, 
      desc: 'Fokus terjaga. Tetap semangat!' 
    };
    return { 
      label: 'Rendah', 
      color: 'bg-emerald-500', 
      text: 'text-emerald-600', 
      bgLight: 'bg-emerald-50', 
      icon: Smile, 
      desc: 'Pikiran tenang, siap produktif.' 
    };
  };

  const status = getStressLevel(taskCount); 
  const Icon = status.icon;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold tracking-wider uppercase">
          <Activity size={16} className="text-slate-300" />
          <span>Stress Monitor</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${status.bgLight} ${status.text} ring-1 ring-inset ring-black/5`}>
          {status.label}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <h3 className={`text-3xl font-black ${status.text} mb-1 tracking-tight`}>
            {status.label}
          </h3>
          <p className="text-slate-500 text-sm font-medium">
            {status.desc}
          </p>
        </div>
        <div className={`p-3.5 rounded-2xl ${status.bgLight} ${status.text}`}>
          <Icon size={32} strokeWidth={2.5} />
        </div>
      </div>
      
      <div className="mt-6 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full ${status.color} transition-all duration-1000 ease-out`} 
          style={{ width: taskCount >= 5 ? '100%' : taskCount >= 3 ? '60%' : '30%' }}
        />
      </div>
    </div>
  );
}