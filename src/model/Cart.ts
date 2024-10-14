import mongoose from "mongoose";
import { productSchema } from "./Product";

export const cartSchema = new mongoose.Schema({
    products: {
        type: Array<typeof productSchema>,
        required: true
    },
    createdAt: {
        type: Number,
        default: Date.now()
    },
    updatedAt: {
        type: Number
    },
    deletedAt: {
        type: Number
    }
})

export const CartModel = mongoose.model('Cart', cartSchema);
