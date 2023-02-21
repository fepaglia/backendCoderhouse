import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const productManager = new ProductManager();
const router = Router();

router.get('/', async (req, res) => { 
    res.render('realTimeProducts', { products: await productManager.getProducts() });
});

// //Peticiones
//  router.post('/:cid/product/:pid', async (req, res) =>{
//     const cid = Number(req.params.cid);
//     const pid = await productManager.getProductsById(Number(req.params.pid));
    
//     await cartManager.addProdToCart(cid, pid);
//     res.status(200).send()
// })

// router.post('/', async (req, res) =>{
//     await cartManager.createNewCart();
//     res.status(200).send()
// })

// router.get('/:cid', async (req, res) =>{
//     const cartId = Number(req.params.cid);
//     const cart = await cartManager.getCartById(cartId);
//     res.status(200).send({cart})
// })


export default router;