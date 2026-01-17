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
  // Hitung persentase kelulusan tugas (Completion Rate)
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
      <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400">
        Menyiapkan data statistik...
      </div>
    </div>
  );
}