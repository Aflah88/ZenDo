'use client';

interface StatisticsProps {
  total: number;
  completed: number;
  active: number;
}

export function Statistics({ total, completed, active }: StatisticsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white rounded-lg p-4 text-center border-t-4 border-blue-500 shadow">
        <div className="text-2xl font-bold text-blue-600">{total}</div>
        <div className="text-sm text-gray-600 mt-1">Total Tugas</div>
      </div>
      <div className="bg-white rounded-lg p-4 text-center border-t-4 border-green-500 shadow">
        <div className="text-2xl font-bold text-green-600">{completed}</div>
        <div className="text-sm text-gray-600 mt-1">Selesai</div>
      </div>
      <div className="bg-white rounded-lg p-4 text-center border-t-4 border-orange-500 shadow">
        <div className="text-2xl font-bold text-orange-600">{active}</div>
        <div className="text-sm text-gray-600 mt-1">Aktif</div>
      </div>
    </div>
  );
}
