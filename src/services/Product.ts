import { Types } from "mongoose";
import AppError from "../Error";
import IProduct from "../interfaces/Product";
import ProductRepositorie from "../repositories/Product";
import StoreRepositories from "../repositories/Store";
import IStore from "../interfaces/Store";

export default class ProductService{
    static async create(payload: IProduct){
        return await ProductRepositorie.create(payload);
    }

    static async getAll(){
        const products = await ProductRepositorie.get();
        if(products.length < 1) 
            throw new AppError('Nenhum registro encontrado', 404);

        return products; 
    }

    static async getById(id: Types.ObjectId){
        const product = await ProductRepositorie.getById(id);
        if(!product)
            throw new AppError('Nenhum registro encontrado', 404);

        return product;
    }

    static async deleteStore(payload: IStore){
        return await StoreRepositories.modify(new Types.ObjectId(payload._id), {
            address: payload.address,
            name: payload.name,
            store: payload.store,
            createdAt: payload.createdAt,
            updatedAt: payload.updatedAt,
            deletedAt: payload.deletedAt 
        });
    }

    static async deleteProduct(payload: IProduct){
        return await ProductRepositorie.modify(payload)
    }

    static async getByStore(name: string): Promise<IProduct[]>{
        return await ProductRepositorie.getByStore(name) as IProduct[];
    }
}