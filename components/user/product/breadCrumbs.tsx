import Link from 'next/link';

interface BreadcrumbsProps {
    category?: string;
}

export default function Breadcrumbs({ category }: BreadcrumbsProps) {
    return (
        <nav className="flex items-center text-sm text-neutral-500 mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-3">
                <li>
                    <Link href="/" className="hover:text-neutral-900 transition-colors">
                        Home
                    </Link>
                </li>
                <li>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </li>
                <li>
                    <Link href="/user/products" className="hover:text-neutral-900 transition-colors">
                        Collection
                    </Link>
                </li>
                {category && (
                    <>
                        <li>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </li>
                        <li className="text-neutral-900 font-medium capitalize">
                            {category.replace('-', ' ')}
                        </li>
                    </>
                )}
            </ol>
        </nav>
    );
}