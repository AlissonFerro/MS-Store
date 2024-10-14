import mongoose from "mongoose";

export const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3
    },
    store: {
        type: String, 
        required: true
    },
    address: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number
    },
    updatedAt: {
        type: Number
    },
    deletedAt: {
        type: Number
    }
});

export const StoreModel = mongoose.model('Store', storeSchema);