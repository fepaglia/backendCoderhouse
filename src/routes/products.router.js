import { Router } from 'express';
import ProductManager from '../ProductManager.js';

//Creamos la instancia de la clase productmanager, y del modulo router:
const productManager = new ProductManager();
const router = Router();



// //peticiones
// router.get('/:pid', async (req, res) =>{
//     const id = Number(req.params.pid);
//     const product = await productManager.getProductsById(id);
//     res.render('home', {product});
// });

// router.put('/:pid', async (req, res) =>{
//     const id = Number(req.params.pid);
//     const update = req.body;
//     await productManager.updateProduct(id, update);
//     res.status(200).send(`El producto con ID ${id} ha sido actualizado exitosamente`);
// });

// router.delete('/:pid', async (req, res) =>{
//     const id = Number(req.params.pid);
//     await productManager.deleteProduct(id);
//     res.status(200).send(`El producto con ID ${id} ha sido eliminado exitosamente`);
// });

router.get('/', async (req,res)=> {
    const products = await productManager.getProducts();
    const limit = Number(req.query.limit);

    if (!limit){
        res.render('home', {products});
    }else {
        const limitedProducts = products.slice(0, limit);
        res.render('home', {limitedProducts});
    };
});


// router.post('/', async (req,res) =>{
//     const newProduct = req.body;
//     await productManager.addProduct(newProduct);
//     res.status(200).send();
// });

export default router;