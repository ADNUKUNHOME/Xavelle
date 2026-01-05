import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";


interface ProductCardProps {
    product: {
        title: string;
        slug: string;
        price: number;
        images: string[];
        category?: string;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/user/products/${product.slug}`}>
            <Card className="group overflow-hidden rounded-2xl border-none shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="relative h-80 w-full overflow-hidden bg-neutral-100">
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>


                <CardContent className="p-4 space-y-2">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {product.category}
                    </p>
                    <h3 className="text-lg font-semibold tracking-tight">
                        {product.title}
                    </h3>


                    <p className="text-base font-medium">₹{product.price}</p>
                </CardContent>
            </Card>
        </Link>
    );
}