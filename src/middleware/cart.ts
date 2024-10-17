import { NextFunction, Request, Response } from "express";
import AppError from "../Error";

export default class CartMiddleware{
    static validateProductId(req: Request, _: Response, next: NextFunction){
        const { productId } = req.body;
        if(!productId)
            throw new AppError('Id do producto é required', 400);

        next();
    }
}