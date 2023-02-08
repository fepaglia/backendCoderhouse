import express from 'express';
import cartRouter from './routes/cart.router.js';
import productsRouter from './routes/products.router.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);


app.get('/', (req, res) =>{
    res.send("hola Mundo")
})

app.listen(8080, () => console.log('Listening on port 8080'));
