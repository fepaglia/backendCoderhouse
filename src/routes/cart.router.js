import { Router } from 'express';
import CartManager from '../CartManager.js';

const cartManager = new CartManager();

const router = Router();

router.post('/', (req, res) =>{
    const newCart = cartManager.createNewCart();
})



 router.post('/product/:pid', async (req, res) =>{
    const newOrder = Number(req.params.pid);
    await cartManager.addToCart(newOrder);
    res.send(newOrder)
  
})

export default router;