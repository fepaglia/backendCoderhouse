import fs from 'fs';
import ProductManager from './ProductManager.js';

const productManager = new ProductManager();

export default class CartManager {
    constructor(){
        this.cartPath = './src/Cart.json';
        this.newOrder = {
            id,
            products: []
        };
    }

    createNewCart = async() =>{
        const rawdata = await fs.promises.readFile(this.cartPath, 'utf-8')
            const data = JSON.parse(rawdata, null, "\n")

            productManager.addID(this.newOrder);

            return data
    }

}

