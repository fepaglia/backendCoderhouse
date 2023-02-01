import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
//Creamos la instancia de la clase
const productManager = new ProductManager()

//Middlewares
app.use(express.urlencoded({extended: true}));

//peticiones
app.get('/products', async (req,res)=> {
    const products = await productManager.getProducts();
    const limit = Number(req.query.limit);

    if (!limit){
        res.send({products})
    }else {
        const limitedProducts = products.slice(0, limit);
        res.send({limitedProducts});
    }
})

app.get('/products/:pid', async (req, res) =>{
    const id = Number(req.params.pid);
    const product = await productManager.getProductsById(id);
    res.send({product})
})

app.get('/', (req, res) =>{
    res.send("hola Mundo")
})

app.listen(8080, () => console.log('Listening on port 8080'));
