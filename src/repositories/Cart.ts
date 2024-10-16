import { Types } from "mongoose";
import { CartModel } from "../model/Cart";
import IProduct from "../interfaces/Product";
import AppError from "../Error";

export default class CartRepositories{
    static async create(userId: Types.ObjectId){
        const now = Date.now(); 
        return await CartModel.create({
            products: [],
            userId: userId,
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        })
    }

    static async getById(cartId: Types.ObjectId){
        return await CartModel.findOne({ _id: cartId });
    }

    static async addToCart(product: IProduct, cartId: Types.ObjectId){
        const cart = await CartModel.findById(cartId);
        if(!cart)
            throw new AppError('Nenhum carrinho encontrado', 404);

        const products = cart.products;

        products.push(product);
        cart.products = products;
        cart.priceTot += product.price;

        await cart.save();
    }

    static async getAll(){
        return CartModel.find({ deletedAt: null });
    }
}