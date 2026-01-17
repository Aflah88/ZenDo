'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getBarangById, updateBarang, type BarangInput } from '../../../lib/api'; 
import { ArrowLeft, Save, Loader2, PencilRuler, Gift, Coins, AlignLeft } from 'lucide-react';

export default function EditBarangPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  
  const [formData, setFormData] = useState<BarangInput>({
    kode: '',
    nama: '',
    satuan: '',
    harga: 0,
  });

  const loadData = useCallback(async () => {
    try {
      const response = await getBarangById(id);
      const data = (response as { data: { barang: BarangInput } }).data?.barang;
      
      if (data) {
        setFormData({
          kode: data.kode,
          nama: data.nama,
          satuan: data.satuan,
          harga: data.harga,
        });
      } else {
          router.push('/barang');
      }
    } catch (error) {
      console.error('Gagal memuat data:', error);
    } finally {
      setInitialLoading(false);
    }
  }, [id, router]);

  useEffect(() => {
    if (id) loadData();
  }, [id, loadData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: BarangInput) => ({
      ...prev,
      [name]: name === 'harga' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateBarang(id, formData);
      router.push('/barang');
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal update data.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-slate-500 gap-2">
        <Loader2 size={24} className="animate-spin text-indigo-500" />
        <span>Memuat data reward...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 flex justify-center items-start">
      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Link 
            href="/barang" 
            className="p-2 bg-white rounded-xl border border-gray-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Edit Reward</h1>
            <p className="text-slate-500 text-sm">Ubah detail hadiah produktivitasmu.</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Input Kode */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Kode Reward</label>
              <div className="relative">
                <input
                  type="text"
                  name="kode"
                  required
                  value={formData.kode}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
                />
                <PencilRuler className="absolute left-4 top-3.5 text-slate-400" size={18} />
              </div>
            </div>

            {/* Input Nama */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Nama Reward</label>
              <div className="relative">
                <input
                  type="text"
                  name="nama"
                  required
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
                />
                <Gift className="absolute left-4 top-3.5 text-slate-400" size={18} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Input Satuan */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Kategori</label>
                <div className="relative">
                  <select
                    name="satuan"
                    required
                    value={formData.satuan}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none text-slate-700"
                  >
                    <option value="">Pilih Kategori...</option>
                    <option value="Hiburan">Hiburan</option>
                    <option value="Makanan">Makanan</option>
                    <option value="Game">Game</option>
                    <option value="Istirahat">Istirahat</option>
                    <option value="Barang">Barang Fisik</option>
                  </select>
                  <AlignLeft className="absolute left-4 top-3.5 text-slate-400" size={18} />
                </div>
              </div>

              {/* Input Harga */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Target Poin</label>
                <div className="relative">
                  <input
                    type="number"
                    name="harga"
                    required
                    min="0"
                    value={formData.harga}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
                  />
                  <Coins className="absolute left-4 top-3.5 text-slate-400" size={18} />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Simpan Perubahan
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}