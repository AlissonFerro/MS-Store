import { Types } from "mongoose";
import IStore from "./Store";

export default interface IProduct{
    _id?: Types.ObjectId,
    name: string,
    price: number,
    stock: number,
    market: IStore,
    createdAt: number,
    updatedAt?: number,
    deletedAt?: number | null
}