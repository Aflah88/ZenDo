'use client';

import { Smile, Meh, AlertTriangle, Activity } from "lucide-react";

interface StressIndicatorProps {
  activeTasks: number;
  totalTasks: number;
}

export function StressIndicator({ activeTasks, totalTasks }: StressIndicatorProps) {
  return (
    <div className="p-6 rounded-2xl border border-gray-100 bg-white">
      <p className="text-gray-500 text-center">Memuat indikator stress...</p>
    </div>
  );
}