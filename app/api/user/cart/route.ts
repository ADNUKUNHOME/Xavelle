import { getUserIdFromRequest } from "@/lib/auth/getUserFromRequest";
import Cart from "@/lib/models/cart";
import { Types } from "mongoose";

type CartItem = {
    product: Types.ObjectId;
    quantity: number;
};

export async function POST(req: Request) {
    const { productId, quantity = 1 } = await req.json();
    const userId = await getUserIdFromRequest();

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [{ product: productId, quantity }],
        });
    } else {
        const itemIndex = cart.items.findIndex(
            (item: CartItem) => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
    }

    await cart.save();
    return Response.json({ message: "Added to cart" });
}

export async function GET() {
    const userId = getUserIdFromRequest();

    const cart = await Cart.findOne({ user: userId })
        .populate("items.product");

    return Response.json(cart || { items: [] });
}

export async function PUT(req: Request) {
    const { productId, quantity } = await req.json();
    const userId = getUserIdFromRequest();

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return Response.json({});

    cart.items = cart.items.map((item: CartItem) =>
        item.product.toString() === productId
            ? { ...item, quantity }
            : item
    );

    cart.items = cart.items.filter(
        (item: CartItem) => item.quantity > 0
    );

    await cart.save();
    return Response.json(cart);
}

export async function DELETE(req: Request) {
    const { productId } = await req.json();
    const userId = getUserIdFromRequest();

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return Response.json({});

    cart.items = cart.items.filter(
        (item: CartItem) =>
            item.product.toString() !== productId
    );

    await cart.save();
    return Response.json(cart);
}
