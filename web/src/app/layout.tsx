import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/src/app/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZenDo",
  description: "Productivity App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased bg-gray-50 text-slate-900`}>
        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>

      </body>
    </html>
  );
}