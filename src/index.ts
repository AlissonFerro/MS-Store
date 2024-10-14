import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import handleError from './middleware/handleError';
import cartRouter from './routes/cart';
import connectDb from './startup/db';
import storeRouter from './routes/store';
import productRouter from './routes/products';

connectDb();
const app = express();

app
    .use(cors({
        origin: "http://localhost:5000"
    }))
    .use(express.json())
    .use('/api/cart', cartRouter)
    .use('/api/store', storeRouter)
    .use('/api/product', productRouter)
    .use(handleError as any)

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => console.log(`Serviço Cart rodando na porta: ${PORT}`));
