import { Types } from "mongoose";
import IStore from "../interfaces/Store";
import { StoreModel } from "../model/Store";

export default class StoreRepositories{
    static async create(payload: IStore) {
        return await StoreModel.create(payload);
    }
    static async get(){
        return await StoreModel.find();
    }

    static async getByName(name: string){
        return await StoreModel.findOne({ name }); 
    }

    static async getById(id: Types.ObjectId){
        return await StoreModel.findById(id);
    }
}