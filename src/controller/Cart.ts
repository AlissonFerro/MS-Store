import { Request, Response } from "express";
import CartService from "../services/Cart";
import { Types } from "mongoose";
import ProductService from "../services/Product";
import AppError from "../Error";

export default class CartController{
    static async getAll(req: Request, res: Response): Promise<void>{
        const carts = await CartService.getAll();
        res.status(200).send(carts);
    }

    static async addToCart(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        const { productId } = req.body;

        const product = await ProductService.getById(new Types.ObjectId(productId));
        if (!product.market.createdAt) 
            throw new AppError("createdAt is required", 400);
        if (!product.market.updatedAt) 
            throw new AppError("updatedAt is required", 400);
        
        await CartService.addToCart(product, new Types.ObjectId(id));

        res.status(200).send({ message: 'Produto adicionado com sucesso' })
        
    }

    static async createCart(req: Request, res: Response): Promise<void>{
        const { userId } = req.params;

        const cart = await CartService.create(new Types.ObjectId(userId));
        res.status(201).send({ message: "Carrinho criado com sucesso", cart });
    }
}