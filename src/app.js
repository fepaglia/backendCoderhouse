import express from 'express';
import productsRouter from '../src/routes/products.router.js';
import cartRouter from '../src/routes/cart.router.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);

app.listen(8080, () => console.log('Listening on port 8080'));