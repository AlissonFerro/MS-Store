import { Response, Request } from "express";
import StoreService from "../services/Store";
import { Types } from "mongoose";
import ProductService from "../services/Product";
import IStore from "../interfaces/Store";

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
            name, store, address, createdAt: now, updatedAt: now, deletedAt: null
        }); 
        res.status(201).send({ store: s });
    }

    static async modify(req: Request, res: Response): Promise<void>{
        const { name, store, address } = req.body;

        const store1 = await StoreService.getById(new Types.ObjectId(req.params.id)); 

        await StoreService.modify(new Types.ObjectId(req.params.id), {
            name, store, address, createdAt: store1.createdAt, updatedAt: Date.now(), deletedAt: null 
        });

        res.status(200).send({ message: "Loja modificada com sucesso" });
    }

    static async delete(req: Request, res: Response): Promise<void>{
        const store1 = await StoreService.getById(new Types.ObjectId(req.params.id)) as IStore; 
        
        const now = Date.now();

        const store = await StoreService.modify(new Types.ObjectId(req.params.id), {
            name: store1.name,
            store: store1.store, 
            address: store1.address, 
            createdAt: store1.createdAt, 
            updatedAt: now, 
            deletedAt: now 
        });
        
        await ProductService.deleteStore(store1);

        res.status(200).send({ message: "Loja deletada com sucesso" });
    }

    static async restore(req: Request, res: Response): Promise<void>{
        const store = await StoreService.getByIdDeleted(new Types.ObjectId(req.params.id)) as IStore;

        await StoreService.modify(new Types.ObjectId(store._id), {
            name: store.name,
            address: store.address,
            store: store.store,
            createdAt: store.createdAt,
            updatedAt: Date.now(),
            deletedAt: null
        });
        
        res.status(200).send({ message: "Loja restaurada com sucesso" });
    }
}