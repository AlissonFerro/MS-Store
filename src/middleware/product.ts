import { NextFunction, Request, Response } from "express";
import AppError from "../Error";

export default class ProductMiddleware{
    static async validateBody(req: Request, _: Response, next: NextFunction){
        const { name, price, storeId, stock } = req.body; 
        
        if(!name) 
            throw new AppError('Nome não fornecido', 400);
        if(!price) 
            throw new AppError('Preço não fornecido', 400);
        if(!storeId) 
            throw new AppError('Loja não fornecida', 400);
        if(!stock) 
            throw new AppError('Quantidade em estoque não fornecida', 400);

        next();
    }
}