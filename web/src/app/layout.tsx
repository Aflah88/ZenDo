import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aplikasi Barang",
  description: "Manajemen Data Barang",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <nav className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Manajemen Barang</h1>
        </nav>
        {children}
      </body>
    </html>
  );
}
