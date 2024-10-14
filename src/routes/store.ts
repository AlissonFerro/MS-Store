import { Router } from "express";
import StoreController from "../controller/Store";
import StoreMiddleware from "../middleware/store";

const storeRouter = Router();

storeRouter
    .get('/',  
        StoreController.getAll)

    .get('/:id',  
        StoreController.getById)

    .post('/', 
        StoreMiddleware.validateBody,
        StoreController.create)    

export default storeRouter;