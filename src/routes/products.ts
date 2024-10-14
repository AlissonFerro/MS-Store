import { Router } from "express";
import ProductController from "../controller/Product";
import ProductMiddleware from "../middleware/product";

const productRouter = Router();

productRouter
    .get('/', ProductController.get)
    .get('/:id', ProductController.getById)

    .post('/', 
        ProductMiddleware.validateBody,
        ProductController.create)

export default productRouter;