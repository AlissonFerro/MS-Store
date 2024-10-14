import { Router } from "express";
import StoreController from "../controller/Store";
import StoreMiddleware from "../middleware/store";

const storeRouter = Router();

storeRouter
    .get('/',  
        StoreController.getAll
    )

    .get('/:id',  
        StoreController.getById
    )

    .post('/', 
        StoreMiddleware.validateBody,
        StoreController.create
    )
    
    .post('/:id',
        StoreController.restore
    )
    .put('/:id', 
        StoreMiddleware.validateBody,
        StoreController.modify
    )

    .delete('/:id', 
        StoreController.delete
    )

export default storeRouter;