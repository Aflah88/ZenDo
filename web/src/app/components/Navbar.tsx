'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShieldCheck } from 'lucide-react';

export function Navbar() {
     const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 mb-6">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                        <ShieldCheck size={20} className="text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-800">
                        Zen<span className="text-indigo-600">Do</span>.
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center gap-1 md:gap-4">
                    <Link 
                        href="/" 
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            isActive('/') 
                            ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200' 
                            : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                        }`}
                    >
                        <LayoutDashboard size={16} />
                        <span className="hidden md:inline">Dashboard</span>
                    </Link>

                    <Link 
                        href="/barang" 
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            isActive('/barang') || pathname.startsWith('/barang')
                            ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200' 
                            : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                        }`}
                    >
                        <Package size={16} />
                        <span className="hidden md:inline">Inventaris</span>
                    </Link>
                </div>

            </div>
        </nav>
    );
}