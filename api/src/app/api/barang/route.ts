import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET - Ambil semua data
export async function GET() {
  try {
    const barang = await prisma.barang.findMany();
    return NextResponse.json(barang);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

// POST - Tambah data baru
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const barang = await prisma.barang.create({
      data: {
        kode: body.kode,
        nama: body.nama,
        satuan: body.satuan,
      },
    });
    return NextResponse.json(barang, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal menambah data' }, { status: 500 });
  }
}
