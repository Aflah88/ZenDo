'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Zap } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Misi', href: '/', icon: LayoutDashboard },
    { name: 'Toko', href: '/shop', icon: ShoppingBag },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md border border-white/10 px-6 py-3 rounded-3xl shadow-2xl z-50 transition-all duration-300">
      <div className="flex items-center gap-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-2 transition-all ${
                isActive ? 'text-indigo-400 scale-105' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="text-sm font-bold tracking-wide">{item.name}</span>
            </Link>
          );
        })}
        <div className="h-4 w-[1px] bg-slate-700" />
        <div className="flex items-center gap-1.5 text-amber-400">
          <Zap size={18} fill="currentColor" />
          <span className="text-sm font-black">1.250</span>
        </div>
      </div>
    </nav>
  );
}