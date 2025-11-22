import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Ambil data berdasarkan ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const barang = await prisma.barang.findUnique({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json(barang);
  } catch (error) {
    return NextResponse.json({ error: 'Data tidak ditemukan' }, { status: 404 });
  }
}

// PUT - Update data
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const barang = await prisma.barang.update({
      where: { id: parseInt(params.id) },
      data: body,
    });
    return NextResponse.json(barang);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal update data' }, { status: 500 });
  }
}

// DELETE - Hapus data
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.barang.delete({
      where: { id: parseInt(params.id) },
    });
    return NextResponse.json({ message: 'Data dihapus' });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menghapus data' }, { status: 500 });
  }
}
