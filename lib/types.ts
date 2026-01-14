export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    subcategory?: string;
    images: string[];
    sizes?: string[];
    slug: string;
    stock: number;
    rating: number;
    isFeatured?: boolean;
    material?: string;
    dimensions?: string;
    weight?: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export interface ProductsResponse {
    products: Product[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    };
}

export interface Category {
    id: string;
    name: string;
    count: number;
}

export interface FilterOptions {
    categories: string[];
    priceRange: {
        min: number;
        max: number;
    };
}