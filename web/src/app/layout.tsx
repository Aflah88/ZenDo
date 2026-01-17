import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZenDo - Productivity App",
  description: "Manajemen tugas mahasiswa dengan indikator stres.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} antialiased text-slate-800 bg-gray-50 selection:bg-indigo-100 selection:text-indigo-900`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}