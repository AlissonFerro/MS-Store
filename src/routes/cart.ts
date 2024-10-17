import { Router } from "express";
import CartController from "../controller/Cart";

const cartRouter = Router();

cartRouter
    .get('/', CartController.getAll)
    .post('/:userId', CartController.createCart)
    .patch('/:id', CartController.addToCart)
    .patch('/removeItem/:id', CartController.removeToCart)


export default cartRouter;