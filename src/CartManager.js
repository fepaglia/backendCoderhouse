import fs from 'fs';
import ProductManager from './ProductManager.js';

const productManager = new ProductManager();

export default class CartManager {
    constructor(){
        this.cartPath = './src/Cart.json';
      
    }

    // createNewCart = async() =>{
    //     const rawdata = await fs.promises.readFile(this.cartPath, 'utf-8')
    //         const data = JSON.parse(rawdata, null, "\n")

    //         productManager.addID(this.newOrder);

    //         return data
    // }

    getCartById = async(cid) =>{
        try {
            const rawdata = await fs.promises.readFile(this.cartPath, 'utf-8')
            let data = JSON.parse(rawdata).find(carts => carts.cid === cid)
            if (!data){
                throw new Error("Not found")
            }else {
                return data.products;
            }
        } 
        catch (error) {
            return error.message;
        }
    }

    addProdToCart = async(cid, pid, qtyItem) =>{
        const cart = await this.getCartById(cid)
        const addToCart = await productManager.getProductsById(pid);
        const addProd = {
            pid: addToCart.id,
            quantity: qtyItem,
       }
        cart.push(addProd)

       console.log(cart)
    }

}

