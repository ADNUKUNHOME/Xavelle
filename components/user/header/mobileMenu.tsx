'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileMenu({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg p-6"
                >
                    <button onClick={onClose} className="mb-6 text-sm">
                        Close
                    </button>

                    <nav className="flex flex-col gap-4">
                        <Link href="/user/products">Shop</Link>
                        <Link href="/user/products">New Arrivals</Link>
                        <Link href="/user/products">Collections</Link>
                        <Link href="/user/products">Cart</Link>
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
