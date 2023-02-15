import fs from "fs";
import utils from "./utility.js"

export default class ProductManager {
    constructor(){
        this.path = './src/Productos.json' // Ruta al archivo donde queremos grabar los datos.
    }

    getProducts = async() =>{
        //Si no existe la ruta, se creara el archivo con un [] vacio.
        if(!fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, JSON.stringify([]))
                .then((res)=> console.log(`< ${this.path} > fue creado.`))
                .catch((err) => console.log("Hubo un Problema al crear el archivo. No fue Posible."));
            }
        try {
            return utils.readFile(this.path);   
        }
        catch (error) {
            console.log(error)
        }
    }

    addProdID = (newProduct) =>{
      return utils.addID(newProduct, this.path);
    }

    addProduct = async ({title, description, price, status =true, thumbnail, code, stock}) =>{
        const newProduct = {title,description,price,status,thumbnail,code,stock};       
    //Validaciones:
        if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.status || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) {
            console.error(`Complete todos los campos, por favor.`);
        };
        const data = await utils.readFile(this.path);
        // No deben repetirse productos con el mismo campo: code
        if (data.find(prod => prod.code === newProduct.code)) {
            return console.error(`El producto con el code: ${newProduct.code} ya existe:`);
        }; 
        try {
            //agregamos el Id Dinamico:
            await this.addProdID(newProduct)
            await data.push(newProduct);
            // Una vez cargados, los datos al array de productos. reescribimos el archivo:
            utils.writeFile(this.path, data)
        } catch (error) {
            console.log(error);
        }
    }

    getProductsById = (id) =>{
      return utils.searchByID(this.path, id);
    }

    updateProduct = async(id, updateObj) => {
        try {
            if (!id) {
                throw new Error ("No esxiste el producto con ese id")
            }   
            const oldProd = await utils.readFile(this.path);
            const productoIndex = oldProd.findIndex(prod=> prod.id === id);
                if (productoIndex === id) {
                    throw new Error(`No se encontró el producto con id ${id}`);
                }
                if (!updateObj.title || !updateObj.description || !updateObj.price || !updateObj.status || !updateObj.thumbail || !updateObj.code || !updateObj.stock) {
                return console.error(`Complete todos los campos, por favor.`);}
            
            const newData= {
                ...updateObj,
                id
            }
            oldProd[productoIndex] = newData;
            await utils.writeFile(this.path, oldProd);
        } catch (error) {
        return error.message;
        }
    }

    deleteProduct = async(id)=>{
        try { 
            if (!id) {
                throw new Error("ID inválido")
            } 
            const products = await utils.readFile(this.path);
            const prod = products.filter(producto => producto.id !== id);

            return utils.writeFile(this.path, prod);   
        } catch (error) {
            return error.message
        }
    }
}