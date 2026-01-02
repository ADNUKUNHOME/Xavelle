import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const navItems = [
        { label: 'Dashboard', href: '/admin' },
        { label: 'Products', href: '/admin/products' },
        { label: 'Add Product', href: '/admin/products/add' },
    ];

    return (
        <div className="flex min-h-screen bg-[#FAFAFA] text-neutral-900">
            {/* Sidebar */}
            <aside className="w-64 border-r border-neutral-200 bg-white flex flex-col fixed h-full">
                <div className="p-8">
                    <h1 className="text-xl font-semibold tracking-widest uppercase">Xavelle</h1>
                    <p className="text-[10px] text-neutral-400 mt-1 uppercase tracking-tighter">Admin Internal</p>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => (
                        <Link key={item.href} href={item.href}
                            className="block px-4 py-3 text-sm font-medium transition-colors hover:bg-neutral-50 rounded-md">
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64">
                {/* Top Bar */}
                <header className="h-16 border-b border-neutral-200 bg-white flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="text-sm font-medium text-neutral-500">Overview</div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm">Admin User</span>
                        <button className="text-xs uppercase tracking-wider font-bold text-red-500 border border-red-100 px-3 py-1 hover:bg-red-50 transition-colors">
                            Logout
                        </button>
                    </div>
                </header>
                <section className="p-8">{children}</section>
            </main>
        </div>
    );
}