import mongoose from "mongoose";
import { storeSchema } from "./Store";

export const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    price: {
        type: Number,
        required: true,
        default: 0.00
    },
    market: {
        type: storeSchema,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
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
});

export const ProductModel = mongoose.model('Product', productSchema);