import { Types } from "mongoose";
import IProduct from "../interfaces/Product";
import { ProductModel } from "../model/Product";
import IStore from "../interfaces/Store";

export default class ProductRepositorie{
    static async create(payload: IProduct){
        return await ProductModel.create(payload);
    }

    static async get(){
        return await ProductModel.find({ deletedAt: null })
    }

    static async getById(id: Types.ObjectId){
        return await ProductModel.findOne({ _id: id, deletedAt: null, 'market.deletedAt': null });
    }

    static async deleteStore(id: Types.ObjectId, payload: IProduct){
        return await ProductModel.findByIdAndUpdate(id, payload);
    }

    static async getByStore(name: string): Promise<IProduct[]>{
        return await ProductModel.find({ 'market.name': name });
    }

    static async modify(payload: IProduct): Promise<IProduct>{
        return await ProductModel.findByIdAndUpdate(payload._id, payload) as IProduct;
    }
}