import { Types } from "mongoose";
import IStore from "../interfaces/Store";
import { StoreModel } from "../model/Store";

export default class StoreRepositories{
    static async create(payload: IStore) {
        return await StoreModel.create(payload);
    }
    static async get(){
        return await StoreModel.find({ deletedAt: null });
    }

    static async getByName(name: string){
        return await StoreModel.findOne({ name, deletedAt: null }); 
    }

    static async getByIdDeleted(id: Types.ObjectId){
        return await StoreModel.findById(id);
    }

    static async getById(id: Types.ObjectId){
        return await StoreModel.findOne({_id: id, deletedAt: null});
    }

    static async modify(id: Types.ObjectId, payload: IStore){
        await StoreModel.findByIdAndUpdate(id, payload);
    }
}