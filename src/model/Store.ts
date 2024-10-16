import mongoose from "mongoose";
import AppError from "../Error";

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

storeSchema.pre('findOneAndUpdate', async function(next){
    const update = this.getUpdate();
    const storeId = this.getFilter()._id;
    
    if(!update)
        throw new AppError('Erro ao atualizar produtos', 500);

    await mongoose.model('Product').updateMany(
        { "market._id": storeId }, 
        { $set: { market: update } } 
    );

    next();
})

export const StoreModel = mongoose.model('Store', storeSchema);