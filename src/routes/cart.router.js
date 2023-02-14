import { Router } from 'express';
import CartManager from '../CartManager.js';

const cartManager = new CartManager();

const router = Router();

//Peticiones
 router.post('/:cid/product/:pid', async (req, res) =>{
    const cartId = Number(req.params.cid);
    const addProd = Number(req.params.pid);
    await cartManager.addProdToCart(cartId, addProd, 1);
    res.status(200).send( cartManager.getCartById(cartId) )
})

// router.post('/', (req, res) =>{
//     const newCart = cartManager.createNewCart();
// })

router.get('/:cid', async (req, res) =>{
    const cartId = Number(req.params.cid);
    const cart = await cartManager.getCartById(cartId);
    res.status(200).send({cart})
})


export default router;