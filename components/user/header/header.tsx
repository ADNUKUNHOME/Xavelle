'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

import Logo from './logo';
import NavLinks from './navLinks';
import SearchBar from './searchBar';
import CartButton from './cartButton';
import UserMenu from './userMenu';
import MobileMenu from './mobileMenu';

export default function Header({
    isAuthenticated,
    cartCount,
    userName,
}: {
    isAuthenticated: boolean;
    cartCount: number;
    userName?: string;
}) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b"
            >
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex h-16 items-center justify-between">

                        <Logo />

                        <NavLinks />

                        <div className="flex items-center gap-5">
                            <SearchBar />
                            <CartButton count={cartCount} />
                            <UserMenu
                                isAuthenticated={isAuthenticated}
                                userName={userName}
                            />

                            {/* Mobile toggle */}
                            <button
                                onClick={() => setMobileOpen(true)}
                                className="md:hidden"
                            >
                                <Menu size={22} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            <MobileMenu
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
            />
        </>
    );
}
