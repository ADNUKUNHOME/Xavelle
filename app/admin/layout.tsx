import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminLogoutButton from "@/components/admin/adminLogoutButton";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        redirect("/login");
    }

    const decoded = verifyToken(token);
    console.log("decoded token:", decoded);

    if (decoded.role !== "admin") {
        redirect("/");
    }

    const navItems = [
        { label: "Dashboard", href: "/admin" },
        { label: "Products", href: "/admin/products" },
        { label: "Add Product", href: "/admin/products/add" },
    ];

    return (
        <div className="flex min-h-screen bg-[#FAFAFA] text-neutral-900">
            {/* Sidebar */}
            <aside className="w-64 border-r border-neutral-200 bg-white flex flex-col fixed h-full">
                <div className="p-8">
                    <h1 className="text-xl font-semibold tracking-widest uppercase">
                        Xavelle
                    </h1>
                    <p className="text-[10px] text-neutral-400 mt-1 uppercase tracking-tighter">
                        Admin Internal
                    </p>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-3 text-sm font-medium transition-colors hover:bg-neutral-50 rounded-md"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64">
                <header className="h-16 border-b border-neutral-200 bg-white flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="text-sm font-medium text-neutral-500">
                        Overview
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm">Admin User</span>
                        <AdminLogoutButton />
                    </div>
                </header>

                <section className="p-8">{children}</section>
            </main>
        </div>
    );
}
