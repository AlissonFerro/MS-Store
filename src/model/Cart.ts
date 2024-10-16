import mongoose, { Types } from "mongoose";
import { productSchema } from "./Product";

export const cartSchema = new mongoose.Schema({
    products: {
        type: [productSchema],
        required: true
    },
    userId: {
        type: Types.ObjectId,
        required: true
    },
    priceTot: {
        type: Number,
        default: 0.00
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
