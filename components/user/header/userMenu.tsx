'use client';

import Link from 'next/link';
import { User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function UserMenu({
    isAuthenticated,
    userName,
}: {
    isAuthenticated: boolean;
    userName?: string;
}) {
    const [open, setOpen] = useState(false);

    if (!isAuthenticated) {
        return (
            <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
                Login
            </Link>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(prev => !prev)}
                className="flex items-center gap-2 text-sm font-medium"
            >
                <User size={18} />
                {userName}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute right-0 mt-2 w-40 rounded-md border bg-white shadow-lg"
                    >
                        <Link className="block px-4 py-2 text-sm hover:bg-gray-100" href="/profile">
                            Profile
                        </Link>
                        <Link className="block px-4 py-2 text-sm hover:bg-gray-100" href="/orders">
                            Orders
                        </Link>
                        <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                            Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
