'use client';

import { useState, useEffect } from 'react';
import { BarangCard } from '../components/BarangCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// DEFINISI TYPE BIAR ESLINT DIAM
interface ItemBarang {
  id: string;
  nama: string;
  harga: number;
  satuan: string;
  stok: number;
}

export default function ShopPage() {
  const [items, setItems] = useState<ItemBarang[]>([]);

  const fetchItems = () => {
    fetch('http://localhost:3000/api/barang')
      .then(res => res.json())
      .then((data: ItemBarang[]) => setItems(data));
  };

  useEffect(() => {
    fetchItems();
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
          {items.map((item) => ( // Tidak perlu 'any' lagi di sini
            <BarangCard 
              key={item.id}
              nama={item.nama}
              harga={item.harga}
              satuan={item.satuan}
              stok={item.stok}
              onBeli={() => alert(`Membeli ${item.nama}`)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}