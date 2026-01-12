import Link from 'next/link';
import { motion } from 'framer-motion';

const links = [
    { name: 'Shop', href: '/user/products' },
    { name: 'New Arrivals', href: '/user/products' },
    { name: 'Collections', href: '/user/products' },
];

export default function NavLinks() {
    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700"
        >
            {links.map(link => (
                <Link
                    key={link.name}
                    href={link.href}
                    className="relative hover:text-black transition after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-black after:transition-all hover:after:w-full"
                >
                    {link.name}
                </Link>
            ))}
        </motion.nav>
    );
}
