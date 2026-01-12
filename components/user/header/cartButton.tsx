import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartButton({ count }: { count: number }) {
    return (
        <Link href="/user/cart" className="relative">
            <motion.div whileHover={{ scale: 1.1 }}>
                <ShoppingBag size={20} />
                {count > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-xs text-white">
                        {count}
                    </span>
                )}
            </motion.div>
        </Link>
    );
}
