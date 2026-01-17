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

    return (
        <div className="p-8 text-center text-slate-400">
            <Loader2 className="animate-spin inline mr-2" />
            Menyiapkan environment edit...
        </div>
    );
}