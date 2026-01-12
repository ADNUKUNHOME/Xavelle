import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import User from '@/lib/models/user';
import Cart from '@/lib/models/cart';
import Header from '@/components/user/header/header';


export default async function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    let isAuthenticated = false;
    let userName: string | undefined = undefined;
    let userId: string | undefined = undefined;
    let cartCount = 0;

    if (token) {
        try {
            const payload = verifyToken(token);

            // Ensure only USER role gets this layout data
            if (payload.role === 'user') {
                isAuthenticated = true;
                userId = payload.userId;

                /**
                 * Fetch user data (minimal)
                 */
                const user = await User.findById(userId).select('name').lean();
                userName = user?.name;

                /**
                 * Fetch cart count
                 * We only need item count, not full cart
                 */
                const cart = await Cart.findOne({ user: userId })
                    .select('items')
                    .lean();

                cartCount = cart?.items?.length ?? 0;
            }
        } catch (error) {
            // Token invalid / expired
            isAuthenticated = false;
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#F6F5F2] text-neutral-900">
            <Header
                isAuthenticated={isAuthenticated}
                userName={userName}
                cartCount={cartCount}
            />

            <main className="flex-1">{children}</main>

            {/* Footer goes here later */}
        </div>
    );
}
