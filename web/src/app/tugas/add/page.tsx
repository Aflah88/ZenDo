'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBarang, BarangInput } from '@/app/lib/api';
import { ArrowLeft, Save, Loader2, Gift, AlignLeft, Tag, Coins } from 'lucide-react';

export default function AddBarangPage() {
  const router = useRouter();
  
  return (
    <div className="p-10 flex justify-center text-slate-400 animate-pulse">
      Menyiapkan form tambah reward...
    </div>
  );
}