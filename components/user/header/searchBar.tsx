'use client';

import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchBar() {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-gray-700 hover:text-black transition"
            aria-label="Search"
        >
            <Search size={20} />
        </motion.button>
    );
}
