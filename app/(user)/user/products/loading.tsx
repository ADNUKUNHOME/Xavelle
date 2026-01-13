export default function Loading() {
    return (
        <div className="min-h-screen bg-linear-to-b from-white to-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumb Skeleton */}
                <div className="flex items-center space-x-2 mb-8">
                    <div className="h-4 w-16 bg-neutral-200 rounded animate-pulse" />
                    <div className="h-4 w-4 bg-neutral-200 rounded animate-pulse" />
                    <div className="h-4 w-24 bg-neutral-200 rounded animate-pulse" />
                </div>

                {/* Hero Skeleton */}
                <div className="mb-16 text-center">
                    <div className="h-12 w-64 bg-neutral-200 rounded animate-pulse mx-auto" />
                    <div className="h-6 w-96 bg-neutral-200 rounded animate-pulse mx-auto mt-4" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Sidebar Skeleton */}
                    <div className="lg:col-span-1 hidden lg:block">
                        <div className="space-y-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-48 bg-neutral-100 rounded-lg animate-pulse" />
                            ))}
                        </div>
                    </div>

                    {/* Main Content Skeleton */}
                    <div className="lg:col-span-3">
                        {/* Toolbar Skeleton */}
                        <div className="flex justify-between items-center mb-8">
                            <div className="h-10 w-32 bg-neutral-200 rounded animate-pulse" />
                            <div className="h-10 w-40 bg-neutral-200 rounded animate-pulse" />
                        </div>

                        {/* Grid Skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="h-64 bg-neutral-100 rounded-2xl animate-pulse" />
                                    <div className="h-6 w-3/4 bg-neutral-100 rounded animate-pulse" />
                                    <div className="h-6 w-1/2 bg-neutral-100 rounded animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}