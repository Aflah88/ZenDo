import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

// PATCH - Update data barang
export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...updateData } = body;

        const updated = await prisma.barang.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Gagal update barang' }, { status: 500 });
    }
}

// DELETE - Hapus barang
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID dibutuhkan' }, { status: 400 });

        await prisma.barang.delete({ where: { id } });
        return NextResponse.json({ message: 'Barang berhasil dihapus' });
    } catch (error) {
        return NextResponse.json({ error: 'Gagal hapus barang' }, { status: 500 });
    }
}