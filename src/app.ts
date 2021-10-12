import express from 'express';
import usersRouter from './controllers/users.controller';
import productsRouter from './controllers/products.controller';

const app = express();

app.use(express.json());
app.use(usersRouter);
app.use(productsRouter);

export default app;
