import { NextFunction, Request, Response } from "express";
import AppError from "../Error";

export default class StoreMiddleware{
    static validateBody(req: Request, _: Response, next: NextFunction){
        const { name, store, address } = req.body;
        
        if(!name) throw new AppError('Nome não fornecido', 400);
        if(!store) throw new AppError('Loja não fornecida', 400);
        if(!address) throw new AppError('Endereço não fornecido', 400);

        next();
    }
}