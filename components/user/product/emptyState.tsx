'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EmptyState() {
    return (
        <div className="text-center py-24">
            <div className="max-w-md mx-auto space-y-6">
                <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 bg-linear-to-br from-amber-100 to-rose-100 rounded-full" />
                    <svg className="relative w-24 h-24 p-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <div className="space-y-3">
                    <h3 className="text-2xl font-light text-neutral-900">No products found</h3>
                    <p className="text-neutral-500">
                        We couldn't find any products matching your criteria. Try adjusting your filters or explore our entire collection.
                    </p>
                </div>

                <div className="pt-6">
                    <Button asChild className="bg-neutral-900 text-white hover:bg-neutral-800 px-8">
                        <Link href="/products">
                            Browse All Collection
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}