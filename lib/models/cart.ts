import mongoose, { Schema, Types } from "mongoose";

const cartItemSchema = new Schema({
    product: {
        type: Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    }
});


const cartSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    items: [cartItemSchema]
},
    {
        timestamps: true,
    });

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);