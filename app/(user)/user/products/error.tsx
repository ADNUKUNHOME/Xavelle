'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Product listing error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-linear-to-b from-white to-neutral-50 flex items-center justify-center px-4">
            <div className="max-w-md text-center space-y-6">
                <div className="space-y-2">
                    <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 flex items-center justify-center">
                        <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-neutral-900">Something went wrong</h2>
                    <p className="text-neutral-500">
                        We're having trouble loading the products. Please try again.
                    </p>
                </div>

                <div className="space-y-3">
                    <Button
                        onClick={reset}
                        className="bg-neutral-900 text-white hover:bg-neutral-800 px-6"
                    >
                        Try again
                    </Button>
                    <p className="text-sm text-neutral-400">
                        Error: {error.message || 'Unknown error'}
                    </p>
                </div>
            </div>
        </div>
    );
}