'use client';

import { useState, useEffect } from 'react';
import { BarangCard } from '../components/BarangCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ShopPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/barang')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 bg-white rounded-xl shadow-sm hover:bg-slate-50">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-black text-slate-800">ZenStore</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item: any) => (
            <BarangCard 
              key={item.id}
              nama={item.nama}
              harga={item.harga}
              satuan={item.satuan}
              stok={item.stok}
              onBeli={() => alert('Fitur beli menyusul!')}
            />
          ))}
        </div>
      </div>
    </main>
  );
}