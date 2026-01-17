'use client';

import { Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="mt-12 py-6 text-center text-slate-400 text-sm border-t border-gray-100">
            <div className="flex items-center justify-center gap-1">
                <span>Dibuat dengan</span>
                <Heart size={14} className="text-rose-400 fill-rose-400 animate-pulse" />
                <span>oleh Tim ZenDo</span>
            </div>
            <p className="mt-1 text-xs opacity-70"> &copy 2026 ZenDo Productivity. All rights reserved.</p>
        </footer>
    );
}