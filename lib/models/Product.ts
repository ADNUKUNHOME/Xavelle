import mongoose, { Schema, models, model, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  sizes: ("XS" | "S" | "M" | "L" | "XL" | "XXL")[];
  stock: number;
  isFeatured: boolean;
  rating: number;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true }, 
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0, default: 0 },
    category: { type: String, required: true, index: true },
    images: { type: [String], required: true },
    sizes: {
      type: [String],
      required: true,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
    },
    stock: { type: Number, required: true, min: 0, default: 0 },
    isFeatured: { type: Boolean, default: false, index: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ProductSchema.index({ title: "text", description: "text" });

const Product = models.Product || model<IProduct>("Product", ProductSchema);

export default Product;