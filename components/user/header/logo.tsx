import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Logo() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Link
                href="/"
                className="text-xl font-semibold tracking-widest text-gray-900"
            >
                XAVELLE
            </Link>
        </motion.div>
    );
}
