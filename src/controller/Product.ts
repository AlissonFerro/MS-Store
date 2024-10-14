import { Request, Response } from "express";
import StoreService from "../services/Store";
import ProductService from "../services/Product";
import { Types } from "mongoose";

export default class ProductController{
    static async create(req: Request, res: Response): Promise<void>{
        const { name, price, storeId, stock } = req.body;

        const store = await StoreService.getById(storeId)
        const now = Date.now();

        const product = await ProductService.create({
            name, price, market: store, stock, createdAt: now, updatedAt: now, deletedAt: null
        })

        res.status(201).send({message: "Produto criado com sucesso", product });
    }

    static async get(_: Request, res: Response): Promise<void>{
        const products = await ProductService.getAll();
        res.status(200).send(products);
    }

    static async getById(req: Request, res: Response): Promise<void>{
        const product = await ProductService.getById(new Types.ObjectId(req.params.id));
        res.status(200).send(product);
    }
}