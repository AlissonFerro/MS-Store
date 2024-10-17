import { Router } from "express";
import CartController from "../controller/Cart";
import CartMiddleware from "../middleware/cart";

const cartRouter = Router();

cartRouter
    .get('/', CartController.getAll)
    .post('/:userId', CartController.createCart)
    
    .patch('/:id', 
        CartMiddleware.validateProductId,
        CartController.addToCart
    )
    
    .patch('/removeItem/:id', 
        CartMiddleware.validateProductId,
        CartController.removeToCart
    )

    .post('/finish/:id', CartController.finishPurcharse)

export default cartRouter;