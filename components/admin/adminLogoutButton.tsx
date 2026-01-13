'use client';

import { useRouter } from 'next/navigation';

export default function AdminLogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="text-xs uppercase tracking-wider font-bold text-red-500 border border-red-100 px-3 py-1 hover:bg-red-50 transition-colors"
        >
            Logout
        </button>
    );
}
