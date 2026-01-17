'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getBarangById, updateBarang, type BarangInput } from '@/lib/api'; 
import { ArrowLeft, Save, Loader2, PencilRuler, Gift, Coins, AlignLeft } from 'lucide-react';

export default function EditBarangPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  
  // State dengan Tipe Eksplisit
  const [formData, setFormData] = useState<BarangInput>({
    kode: '',
    nama: '',
    satuan: '',
    harga: 0,
  });

  // Gunakan useCallback biar dependency useEffect aman
  const loadData = useCallback(async () => {
    try {
      const response = await getBarangById(id);
      // Casting aman sementara (atau sesuaikan dengan response backend kamu)
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
    // FIX STRICT: Kasih tipe (prev: BarangInput) biar gak merah
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

  return <div>Logic Fixed. Waiting for UI...</div>;
}