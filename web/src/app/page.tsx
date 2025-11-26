'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getBarang, deleteBarang } from '@/lib/api';

interface Barang {
  id: number;
  kode: string;
  nama: string;
  satuan: string;
  harga: number;
}

export default function Home() {
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
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus?')) {
      try {
        await deleteBarang(id);
        fetchBarang();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Daftar Barang</h2>
        <Link
          href="/barang/add"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Tambah Barang
        </Link>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Kode</th>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Satuan</th>
            <th className="border p-2">Harga</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {barang.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.kode}</td>
              <td className="border p-2">{item.nama}</td>
              <td className="border p-2">{item.satuan}</td>
              <td className="border p-2">Rp {item.harga.toLocaleString('id-ID')}</td>
              <td className="border p-2 space-x-2">
                <Link
                  href={`/barang/edit/${item.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
