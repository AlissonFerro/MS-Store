import { Types } from "mongoose";
import CartRepositories from "../repositories/Cart";
import AppError from "../Error";
import IProduct from "../interfaces/Product";

export default class CartService{
    static async create(userId: Types.ObjectId){
        return await CartRepositories.create(userId);
    }

    static async getById(cartId: Types.ObjectId){
        const cart = await CartRepositories.getById(cartId);
        if(!cart)
            throw new AppError('Nenhum carrinho encontrado', 404);
        return cart;
    }

    static async addToCart(product: IProduct, cartId: Types.ObjectId){
        return await CartRepositories.addToCart(product, cartId);
    }

    static async getAll(){
        return await CartRepositories.getAll()
    }
}