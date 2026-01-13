import { Category, FilterOptions, Product } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

/* -------------------------------------------------------------------------- */
/*                               MOCK DATA                                    */
/* -------------------------------------------------------------------------- */

const MOCK_CATEGORIES: Category[] = [
    { id: "Saree", name: "Saree", count: 24 },
    { id: "Sarara", name: "Sarara", count: 18 },
    { id: "Churudar", name: "Churudar", count: 32 },
    { id: "Maxi", name: "Maxi", count: 15 },
    { id: "Masli", name: "Masli", count: 21 },
    { id: "Party", name: "Party", count: 12 },
    { id: "Gown", name: "Gown", count: 9 },
];

const MOCK_PRODUCTS: Product[] = [
    {
        _id: "1",
        title: "Vesper Armchair",
        description: "Italian leather armchair with walnut frame",
        price: 24999,
        category: "furniture",
        subcategory: "armchairs",
        images: ["/logo.png"],
        slug: "vesper-armchair",
        stock: 8,
        rating: 4.8,
        isFeatured: true,
        material: "Italian Leather",
        dimensions: '28" W x 32" D x 30" H',
        weight: "45 lbs",
        tags: ["luxury", "leather", "modern"],
        createdAt: "2024-01-15",
        updatedAt: "2024-01-15",
    },
    {
        _id: "2",
        title: "Celestial Chandelier",
        description: "Hand-blown glass chandelier with brass accents",
        price: 18999,
        category: "lighting",
        subcategory: "chandeliers",
        images: ["/logo.png"],
        slug: "celestial-chandelier",
        stock: 3,
        rating: 4.9,
        isFeatured: true,
        material: "Hand-blown Glass",
        dimensions: '24" Diameter',
        weight: "28 lbs",
        tags: ["statement", "artisanal", "luxury"],
        createdAt: "2024-02-20",
        updatedAt: "2024-02-20",
    },
];

/* -------------------------------------------------------------------------- */
/*                             HELPER FUNCTIONS                                */
/* -------------------------------------------------------------------------- */

function applyMockFilters(
    products: Product[],
    params?: {
        category?: string;
        sort?: string;
        minPrice?: string;
        maxPrice?: string;
        page?: string;
        limit?: string;
    }
) {
    let filtered = [...products];

    if (params?.category) {
        const categories = params.category.split(",");
        filtered = filtered.filter((p) => categories.includes(p.category));
    }

    const minPrice = params?.minPrice ? parseInt(params.minPrice) : 0;
    const maxPrice = params?.maxPrice ? parseInt(params.maxPrice) : 50000;

    filtered = filtered.filter(
        (p) => p.price >= minPrice && p.price <= maxPrice
    );

    if (params?.sort) {
        switch (params.sort) {
            case "price-asc":
                filtered.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                filtered.sort((a, b) => b.price - a.price);
                break;
            case "newest":
                filtered.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                );
                break;
        }
    }

    const page = params?.page ? parseInt(params.page) : 1;
    const limit = params?.limit ? parseInt(params.limit) : 12;
    const start = (page - 1) * limit;

    return {
        products: filtered.slice(start, start + limit),
        total: filtered.length,
        page,
        totalPages: Math.ceil(filtered.length / limit),
        filters: {
            categories: [...new Set(products.map((p) => p.category))],
            priceRange: { min: 0, max: 50000 },
        },
    };
}

/* -------------------------------------------------------------------------- */
/*                               PRODUCTS API                                  */
/* -------------------------------------------------------------------------- */

export async function getProducts(params?: {
    category?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    limit?: string;
    search?: string;
}) {
    try {
        const query = new URLSearchParams();

        if (params?.category) query.append("category", params.category);
        if (params?.sort) query.append("sort", params.sort);
        if (params?.minPrice) query.append("minPrice", params.minPrice);
        if (params?.maxPrice) query.append("maxPrice", params.maxPrice);
        if (params?.page) query.append("page", params.page);
        if (params?.limit) query.append("limit", params.limit);
        if (params?.search) query.append("search", params.search);

        const res = await fetch(`${API_URL}/api/products?${query.toString()}`, {
            cache: params?.search ? "no-store" : "default",
            next: { tags: ["products"] },
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        return (await res.json()) as {
            products: Product[];
            total: number;
            page: number;
            totalPages: number;
            filters?: FilterOptions;
        };
    } catch (error) {
        console.warn("Using mock products due to API failure:", error);
        return applyMockFilters(MOCK_PRODUCTS, params);
    }
}

/* -------------------------------------------------------------------------- */
/*                              CATEGORIES API                                 */
/* -------------------------------------------------------------------------- */

export async function getCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`${API_URL}/api/products/categories`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) throw new Error("Failed to fetch categories");

        return await res.json();
    } catch (error) {
        console.warn("Using mock categories due to API failure:", error);
        return MOCK_CATEGORIES;
    }
}

/* -------------------------------------------------------------------------- */
/*                              UTIL HELPERS                                   */
/* -------------------------------------------------------------------------- */

export function getCategoryName(id: string): string {
    const category = MOCK_CATEGORIES.find((c) => c.id === id);
    return category?.name || id.charAt(0).toUpperCase() + id.slice(1);
}
