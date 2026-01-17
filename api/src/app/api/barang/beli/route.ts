import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function POST(request: NextRequest) {
    try {
        const { id } = await request.json();
        
        const barang = await prisma.barang.findUnique({
            where: { id }
        });

        if (!barang || barang.stok <= 0) {
            return NextResponse.json({ error: 'Stok habis' }, { status: 400 });
        }

        const updated = await prisma.barang.update({
            where: { id },
            data: { stok: barang.stok - 1 }
        });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Gagal transaksi' }, { status: 500 });
    }
}