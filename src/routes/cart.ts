import { Router } from "express";
import CartController from "../controller/Cart";

const cartRouter = Router();

cartRouter
    .get('/', CartController.getAll)
    .post('/:userId', CartController.createCart)
    .patch('/:id', CartController.addToCart)


export default cartRouter;