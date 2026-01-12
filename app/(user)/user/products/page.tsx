import ProductCard from "@/components/user/product/productCard";


async function getProducts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        cache: "no-store",
    });


    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
}


export default async function ProductsPage() {
    const { products } = await getProducts();
    return (
        <section className="px-6 py-16 max-w-7xl mx-auto">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight">Xavelle Collection</h1>
                <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                    Curated luxury essentials crafted with precision, elegance, and timeless design.
                </p>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {products.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    );
}