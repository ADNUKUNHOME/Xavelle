import AddToCartButton from "@/components/user/product/addToCartBotton";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getProduct(slug: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/products/${slug}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        notFound();
    }

    return res.json();
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await getProduct(slug);

    return (
        <section className="px-6 py-16 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Image Section */}
            <div className="relative h-125 w-full rounded-3xl overflow-hidden bg-neutral-100">
                <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="space-y-6">
                <p className="uppercase text-sm tracking-widest text-muted-foreground">
                    {product.category}
                </p>

                <h1 className="text-4xl font-bold tracking-tight">
                    {product.title}
                </h1>

                <p className="text-2xl font-semibold">₹{product.price}</p>

                <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                </p>

                <div className="pt-6">
                    <AddToCartButton productId={product._id} />
                </div>
            </div>
        </section>
    );
}
