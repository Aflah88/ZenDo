'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBarang } from '@/lib/api';

export default function AddBarang() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    kode: '',
    nama: '',
    satuan: '',
    harga: 0,
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBarang({
        ...formData,
        harga: parseInt(formData.harga.toString()),
      });
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal menambah barang');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tambah Barang</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="kode"
          placeholder="Kode Barang"
          value={formData.kode}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="nama"
          placeholder="Nama Barang"
          value={formData.nama}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="satuan"
          placeholder="Satuan"
          value={formData.satuan}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="number"
          name="harga"
          placeholder="Harga"
          value={formData.harga}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
}
