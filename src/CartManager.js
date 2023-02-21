import utils from './utility.js';

export default class CartManager {
    constructor(){
        this.cartPath = './src/Cart.json';
        this.newCart = {products: []}
    }

    createNewCart = async() =>{
        const carts = await utils.readFile(this.cartPath);
        try {
            const newCart = await utils.addID(this.newCart, this.cartPath);
            carts.push(newCart)
           return  await utils.writeFile(this.cartPath, carts);
        } catch (error) {
            console.log(error);
        }
    }

    getCartById = (cid) =>{
        return utils.searchByID(this.cartPath, cid);
    }

    addProdToCart = async(cid, pid) =>{
        // const carts = await utils.readFile(this.cartPath);
        // const cartToMod = carts.findIndex(cart=> cart.id === cid);
        // const prodToCart = {...pid,id}
        // console.log(cartToMod);
        // const cart = await this.getCartById(cid);
        // console.log(pid)
        // if (!cart){
        //     throw new Error(`No se encontró la orden de con id ${cartID}`);
        // }
        // //return cart.products.push(prodID);           
        // await utils.writeFile(this.cartPath, cart);
    }
}

