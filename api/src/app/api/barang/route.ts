import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

// GET - Ambil semua daftar barang
export async function GET() {
    try {
        const items = await prisma.barang.findMany({
            orderBy: { nama: 'asc' }
        });
        return NextResponse.json(items, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Gagal mengambil data barang' }, { status: 500 });
    }
}

// POST - Tambah barang baru
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { kode, nama, satuan, harga, stok } = body;

        const newBarang = await prisma.barang.create({
            data: { 
                kode, 
                nama, 
                satuan, 
                harga: Number(harga), 
                stok: Number(stok || 0) 
            }
        });

        return NextResponse.json(newBarang, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Gagal menambah barang' }, { status: 500 });
    }
}