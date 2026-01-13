'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProductPrice from './productPrice';
import { Product } from '@/lib/types';
import ProductBadge from './productsBadge';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const nextImage = () => {
        if (product.images.length > 1) {
            setImageIndex((prev) => (prev + 1) % product.images.length);
        }
    };

    return (
        <Link href={`/user/products/${product.slug}`}>
            <article
                className="group relative overflow-hidden rounded-3xl bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-neutral-200/50"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setImageIndex(0);
                }}
            >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-linear-to-br from-amber-50/0 via-rose-50/0 to-violet-50/0 group-hover:from-amber-50/20 group-hover:via-rose-50/20 group-hover:to-violet-50/20 transition-all duration-500" />

                {/* Image Container */}
                <div className="relative aspect-3/4 overflow-hidden rounded-3xl">
                    <Image
                        src={product.images[imageIndex]}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-all duration-700 group-hover:scale-105"
                        priority={imageIndex === 0}
                    />

                    {/* Image Navigation */}
                    {product.images.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                nextImage();
                            }}
                            className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    )}

                    {/* Badges */}
                    <div className="absolute top-4 left-4 space-y-2">
                        <ProductBadge category={product.category} />
                        {product.isFeatured && (
                            <span className="block px-3 py-1.5 bg-linear-to-r from-amber-500 to-rose-500 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                                Featured
                            </span>
                        )}
                        {product.stock < 10 && product.stock > 0 && (
                            <span className="block px-3 py-1.5 bg-rose-100 text-rose-700 text-xs font-medium rounded-full backdrop-blur-sm">
                                Only {product.stock} left
                            </span>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all hover:scale-110">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                        <button className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all hover:scale-110">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <h3 className="text-xl font-light text-neutral-900 group-hover:text-amber-900 transition-colors">
                                {product.title}
                            </h3>
                            <p className="text-sm text-neutral-500 line-clamp-2">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                        <ProductPrice price={product.price} />

                        <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm text-neutral-600">
                                {product.rating ? product.rating.toFixed(1) : '—'}
                            </span>
                        </div>
                    </div>

                    {/* Hover Details */}
                    <div className={`pt-4 space-y-3 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}>
                        <div className="flex items-center space-x-4 text-sm text-neutral-500">
                            {product.material && (
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    {product.material}
                                </span>
                            )}
                            {product.dimensions && (
                                <span className="flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                                    </svg>
                                    {product.dimensions}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}