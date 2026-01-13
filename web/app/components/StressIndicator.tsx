'use client';

interface StressIndicatorProps {
  activeTasks: number;
  totalTasks: number;
}

export function StressIndicator({ activeTasks, totalTasks }: StressIndicatorProps) {
  const getStressLevel = () => {
    if (activeTasks <= 3) {
      return { level: 'Rendah', color: 'bg-green-100', textColor: 'text-green-700', emoji: '😊' };
    }
    if (activeTasks <= 7) {
      return { level: 'Sedang', color: 'bg-yellow-100', textColor: 'text-yellow-700', emoji: '😐' };
    }
    return { level: 'Tinggi', color: 'bg-red-100', textColor: 'text-red-700', emoji: '😰' };
  };

  const stress = getStressLevel();

  return (
    <div className={`${stress.color} ${stress.textColor} rounded-lg p-6 text-center border-2 border-current`}>
      <div className="text-4xl mb-2">{stress.emoji}</div>
      <div className="text-sm font-semibold mb-1">LEVEL STRES</div>
      <div className="text-3xl font-bold mb-2">{stress.level}</div>
      <div className="text-sm">Tugas aktif: {activeTasks} dari {totalTasks}</div>
      <div className="text-xs mt-2 opacity-75">
        {activeTasks <= 3 ? '✨ Anda dalam kondisi optimal!' :
         activeTasks <= 7 ? '⚠️ Perhatikan beban kerja Anda' :
         '⛔ Segera prioritaskan tugas penting!'}
      </div>
    </div>
  );
}
