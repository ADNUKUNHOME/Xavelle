"use client";

import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { ReactNode } from "react";

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: ReactNode;
}

export default function AuthLayout({
    title,
    subtitle,
    children,
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 relative">

            {/* Subtle Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_40%)] pointer-events-none" />

            {/* Home Navigation */}
            <Link
                href="/"
                className="absolute top-8 left-8 group flex items-center gap-2 text-neutral-400 hover:text-white transition"
            >
                <ChevronLeftIcon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                <span className="text-xs uppercase tracking-[0.25em]">
                    Back to Home
                </span>
            </Link>

            {/* Auth Card */}
            <div className="relative w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900/70 backdrop-blur-xl p-8 shadow-2xl">

                {/* Brand */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-semibold tracking-[0.2em] text-white">
                        XAVELLE
                    </h1>
                    <p className="mt-3 text-sm text-neutral-400">
                        {subtitle}
                    </p>
                </div>

                {children}

            </div>
        </div>
    );
}