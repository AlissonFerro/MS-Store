import { Types } from "mongoose";
import IProduct from "./Product";

export default interface ICart extends Document{
    products: Types.DocumentArray<IProduct>,
    userId: Types.ObjectId,
    createdAt: number,
    updatedAt: number,
    deletedAt?: number | null
}