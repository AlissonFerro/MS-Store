import { Types } from "mongoose";
import AppError from "../Error";
import IStore from "../interfaces/Store";
import StoreRepositories from "../repositories/Store";

export default class StoreService{
    static async create(payload: IStore) {
        const store = await StoreRepositories.getByName(payload.name);
        if(store) throw new AppError('Loja já cadastrada', 422);

        return await StoreRepositories.create(payload) 
    }

    static async getAll(){
        const stores = await StoreRepositories.get();

        if(!stores.length)
            throw new AppError('Nenhum registro encontrado', 404);

        return stores;
    }

    static async getById(id: Types.ObjectId){
        const store = await StoreRepositories.getById(id);
        if(!store) 
            throw new AppError('Loja não encontrada', 404);
        return store
    }

    static async getByIdDeleted(id: Types.ObjectId){
        const store = await StoreRepositories.getByIdDeleted(id);
        if(!store)
            throw new AppError('Loja não encontrada', 404);

        return store;
    }

    static async modify(id: Types.ObjectId, payload: IStore){
        await StoreRepositories.modify(id, payload);
    }
}