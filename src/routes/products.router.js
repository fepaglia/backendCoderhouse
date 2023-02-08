import { Router } from 'express';
import ProductManager from '../ProductManager.js';

//Creamos la instancia de la clase
const productManager = new ProductManager()

const router = Router();

//peticiones
router.get('/products', async (req,res)=> {
    const products = await productManager.getProducts();
    const limit = Number(req.query.limit);

    if (!limit){
        res.send({products})
    }else {
        const limitedProducts = products.slice(0, limit);
        res.send({limitedProducts});
    }
})

router.get('/products/:pid', async (req, res) =>{
    const id = Number(req.params.pid);
    const product = await productManager.getProductsById(id);
    res.send({product})
})

router.post('/', async (req,res) =>{
    const newProduct = await productManager.addProduct();
})

router.put(
    //La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
);

router.delete(
    //La ruta DELETE /:pid deberá eliminar el producto con el pid indicado. 
);

export default router;