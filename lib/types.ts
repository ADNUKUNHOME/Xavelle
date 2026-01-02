export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
    _id?: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    sizes: Size[];
    stock: number;
    isFeatured: boolean;
    images: string[];
    createdAt?: string;
}

export interface ProductsResponse {
    products: Product[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    };
}