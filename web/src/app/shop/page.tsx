'use client';

import { useState, useEffect } from 'react';
import { BarangCard } from '../components/BarangCard';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

// Definisi Interface sesuai Model Database
interface ItemBarang {
  id: string;
  nama: string;
  harga: number;
  satuan: string;
  stok: number;
}

export default function ShopPage() {
  const [items, setItems] = useState<ItemBarang[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fungsi Fetch Data - Berdiri sendiri agar bisa di-reuse
  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/barang');
      const data: ItemBarang[] = await res.json();
      setItems(data);
    } catch (err) {
      console.error('Gagal mengambil data barang:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi Handle Transaksi - Di luar useEffect agar scope-nya aman
  const handleBeli = async (id: string) => {
    try {
      const res = await fetch('http://localhost:3000/api/barang/beli', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert('Pembelian berhasil! Stok telah diperbarui.');
        fetchItems(); // Refresh data otomatis setelah beli
      } else {
        const error = await res.json();
        alert(error.error || 'Gagal memproses pembelian');
      }
    } catch (err) {
      console.error('Error saat transaksi:', err);
      alert('Terjadi kesalahan koneksi ke server.');
    }
  };

  // Load data pertama kali saat halaman dibuka
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Navigasi */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 bg-white rounded-xl shadow-sm hover:bg-slate-50 transition-colors border border-slate-100">
              <ArrowLeft size={20} className="text-slate-600" />
            </Link>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              Zen<span className="text-indigo-600">Store</span>
            </h1>
          </div>
          
          {/* Status Poin (Placeholder) */}
          <div className="bg-indigo-600 text-white px-4 py-2 rounded-2xl font-bold shadow-lg shadow-indigo-200">
            Poin Anda: 1.250
          </div>
        </div>

        {/* State Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Loader2 className="animate-spin mb-2" size={32} />
            <p className="font-medium">Menyiapkan barang mewah...</p>
          </div>
        ) : (
          /* Grid Barang */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.length > 0 ? (
              items.map((item) => (
                <BarangCard 
                  key={item.id}
                  id={item.id}
                  nama={item.nama}
                  harga={item.harga}
                  satuan={item.satuan}
                  stok={item.stok}
                  onBeli={handleBeli}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">Belum ada barang tersedia di toko.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}