'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBarang, BarangInput } from '@/app/lib/api';
import { ArrowLeft, Save, Loader2, Gift, AlignLeft, Tag, Coins } from 'lucide-react';

export default function AddBarangPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState<BarangInput>({
    kode: '',
    nama: '',
    satuan: '',
    harga: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'harga' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createBarang(formData);
      router.push('/barang');
    } catch (err: any) {
      console.error('Error:', err);
      setError('Gagal menyimpan reward.');
    } finally {
      setLoading(false);
    }
  };

  return <div>Logic Form Ready. Waiting for UI implementation...</div>;
}