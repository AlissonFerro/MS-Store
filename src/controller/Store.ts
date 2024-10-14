import { Response, Request } from "express";
import StoreService from "../services/Store";
import { Types } from "mongoose";

export default class StoreController{
    static async getAll(_: Request, res: Response): Promise<void>{
        const stores = await StoreService.getAll();
        res.status(200).send(stores);
    }

    static async getById(req: Request, res: Response){
        const store = await StoreService.getById(new Types.ObjectId(req.params.id));
        res.status(200).send(store);
    }

    static async create(req: Request, res: Response): Promise<void>{
        const { name, store, address } = req.body;
        const now = Date.now();
        const s = await StoreService.create({
            name, store, address, creadtedAt: now, updatedAt: now, deletedAt: null
        }); 
        res.status(201).send({ store: s });
    }
}