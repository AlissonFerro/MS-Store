import { Types } from "mongoose";
import { CartModel } from "../model/Cart";
import IProduct from "../interfaces/Product";
import AppError from "../Error";
import { ProductModel } from "../model/Product";
import ICart from "../interfaces/Cart";

export default class CartRepositories{
    static async finishPurcharse(cartId: Types.ObjectId): Promise<void> {
        const cart = await CartModel.findOne({ _id: cartId, deletedAt: null}) as ICart;

        if(!cart)
            throw new AppError('Nenhum Carrinho encontrado', 404);

        const { products } = cart;

        if(products.length<1)
            throw new AppError('Nenhum item no carrinho', 422);

        products.map(async product => {
            await ProductModel.findByIdAndUpdate(product._id, {
                name: product.name,
                createdAt: product.createdAt,
                updatedAt: Date.now(),
                deletedAt: null,
                price: product.price,
                stock: product.stock-1
            })    
        })

        const now = Date.now();

        await CartModel.findByIdAndUpdate(cartId, {
            products: products,
            priceTot: cart.priceTot,
            userId: cart.userId,
            createdAt: cart.createdAt,
            updatedAt: now,
            deletedAt: now
        })
    }

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

    static async removeToCart(product: IProduct, cartId: Types.ObjectId){
        const cart = await CartModel.findById(cartId);
        
        if(!cart)
            throw new AppError('Nenhum carrinho encontrado', 404);
        const { products } = cart;

        const findIndex = products.findIndex(
            p => p._id.toString() === product._id?.toString()
        );
        
        if(findIndex<0)
            throw new AppError('Produto não está no carrinho', 422);

        const productsFiltered = products.filter(
            p => p._id.toString() !== product._id?.toString()
        );
        
        return await CartModel.findOneAndUpdate({ _id: cartId }, {
            userId: cart.userId,
            products: productsFiltered,
            createdAt: cart.createdAt,
            priceTot: cart.priceTot-product.price,
            updatedAt: Date.now(),
            deletedAt: null
        })
    }
}