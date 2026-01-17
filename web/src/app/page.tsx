'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getBarang, deleteBarang } from '../app/lib/api'; 
import { Plus, Pencil, Trash2, Package } from 'lucide-react';

interface Barang {
  id: number;
  kode: string;
  nama: string;
  satuan: string;
  harga: number;
}

export default function BarangPage() {
  const [barang, setBarang] = useState<Barang[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBarang();
  }, []);

  const fetchBarang = async () => {
    try {
      const response = await getBarang();
      setBarang(response.data.barang || []); 
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus barang ini?')) {
      try {
        await deleteBarang(id);
        fetchBarang(); // Refresh data
      } catch (error) {
        alert('Gagal menghapus barang');
        console.error(error);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-400 flex flex-col items-center">
        <div className="animate-pulse bg-slate-200 h-8 w-32 rounded mb-4"></div>
        <div className="animate-pulse bg-slate-100 w-full h-64 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Daftar Barang</h2>
          <p className="text-slate-500 mt-1">Kelola inventaris gudang dengan mudah.</p>
        </div>
        <Link
          href="/barang/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md shadow-indigo-100 flex items-center gap-2 transition-all hover:scale-105"
        >
          <Plus size={20} />
          Tambah Barang
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {barang.length === 0 ? (
          // Empty State
          <div className="p-12 text-center flex flex-col items-center text-slate-400">
            <div className="bg-slate-50 p-4 rounded-full mb-3">
              <Package size={48} className="text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-700">Belum ada barang</h3>
            <p className="text-sm">Silakan tambah barang baru untuk memulai.</p>
          </div>
        ) : (
          // Modern Table
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Kode</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Barang</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Satuan</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Harga</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {barang.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 text-sm font-medium text-slate-600 font-mono">
                      {item.kode}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                      {item.nama}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      <span className="px-2 py-1 bg-slate-100 rounded text-xs font-medium">
                        {item.satuan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-emerald-600">
                      Rp {item.harga.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/barang/edit/${item.id}`}
                        className="inline-flex items-center justify-center p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="inline-flex items-center justify-center p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}