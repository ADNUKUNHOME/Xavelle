import ProductTable from "@/components/admin/ProductTable";
import { getProducts } from "@/lib/data/products";

export default async function ProductListPage() {
    const { products } = await getProducts({ page: 1, limit: 20 });

    if (!products.length) {
        return (
            <div className="p-12 text-center text-neutral-500">
                No products found.
            </div>
        );
    }

    return <ProductTable products={products} />;
}