import { Types } from "mongoose";

export default interface IStore{
    _id?: Types.ObjectId;
    name: string,
    store: string,
    address: string,
    createdAt: number,
    updatedAt?: number,
    deletedAt?: number | null
}