'use client';

import { Package, ShoppingCart } from 'lucide-react';

interface BarangProps {
  nama: string;
  harga: number;
  satuan: string;
  stok: number;
  onBeli: () => void;
}

export function BarangCard({ nama, harga, satuan, stok, onBeli }: BarangProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-500 group-hover:text-white transition-colors">
          <Package size={24} />
        </div>
        <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded-lg">
          Stok: {stok}
        </span>
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">{nama}</h3>
      <p className="text-slate-400 text-sm mb-4">{satuan}</p>
      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <span className="text-indigo-600 font-black text-xl">{harga} <span className="text-xs font-medium text-slate-400">Poin</span></span>
        <button 
          onClick={onBeli}
          className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-indigo-600 transition-all active:scale-95"
        >
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
}