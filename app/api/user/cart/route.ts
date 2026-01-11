import { NextRequest, NextResponse } from "next/server";
import Cart from "@/lib/models/cart";
import { Types } from "mongoose";
import { getUserFromRequest } from "@/lib/getUserFromRequest";

type CartItem = {
    product: Types.ObjectId;
    quantity: number;
};

/* -------------------- ADD TO CART -------------------- */
export async function POST(req: NextRequest) {
    try {
        const { userId } = await getUserFromRequest();
        const { productId, quantity = 1 } = await req.json();

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [{ product: productId, quantity }],
            });
        } else {
            const itemIndex = cart.items.findIndex(
                (item: CartItem) =>
                    item.product.toString() === productId
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }
        }

        await cart.save();
        return NextResponse.json({ message: "Added to cart" });
    } catch (error) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
}

/* -------------------- GET CART -------------------- */
export async function GET() {
    try {
        const { userId } = await getUserFromRequest();

        const cart = await Cart.findOne({ user: userId })
            .populate("items.product");

        return NextResponse.json(cart || { items: [] });
    } catch {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
}

/* -------------------- UPDATE QUANTITY -------------------- */
export async function PUT(req: NextRequest) {
    try {
        const { userId } = await getUserFromRequest();
        const { productId, quantity } = await req.json();

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return NextResponse.json({ items: [] });
        }

        cart.items = cart.items
            .map((item: CartItem) =>
                item.product.toString() === productId
                    ? { ...item, quantity }
                    : item
            )
            .filter((item: CartItem) => item.quantity > 0);

        await cart.save();
        return NextResponse.json(cart);
    } catch {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
}

/* -------------------- REMOVE ITEM -------------------- */
export async function DELETE(req: NextRequest) {
    try {
        const { userId } = await getUserFromRequest();
        const { productId } = await req.json();

        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return NextResponse.json({ items: [] });
        }

        cart.items = cart.items.filter(
            (item: CartItem) =>
                item.product.toString() !== productId
        );

        await cart.save();
        return NextResponse.json(cart);
    } catch {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
}
