const fs = require("fs");

class ProductManager {
    constructor(){
        this.products = [];
        this.path = './Productos.json' // Ruta al archivo donde queremos grabar los datos.
    }

//Llama a todos los productos que tengamos, o crea el archivo:
    getProducts = async() =>{

        //Si no existe la ruta, se creara el archivo con un [] vacio.
        if(!fs.existsSync(this.path)) {
            console.log(`El archivo ${this.path} no existe, aguarde instante.`);
            await fs.promises.writeFile(this.path, JSON.stringify([]))
                .then((res)=> console.log(`< ${this.path} > fue creado.`))
                .catch((err) => console.log("Hubo un Problema al crear el archivo. No fue Posible."));
            }

        try {
            const rawdata = await fs.promises.readFile(this.path, 'utf-8')
            const data = JSON.parse(rawdata, null, "\n")
            return data;    
        } catch (error) {
            throw new Error("El archivo no existe, o esta danado")
        }
    }

// Agrega un id, que se incrementa de forma dinamica:
    addID = async(product) =>{
        const rawdata = await fs.promises.readFile(this.path, 'utf-8')
        const data = JSON.parse(rawdata, null, "\n")
        if (data.length === 0){
            product.id = 0;
        } else {
            product.id = data[data.length -1].id +1;
        }    
    }
// Funcion que agrega un producto:
    addProduct = async (title, description, price, thumbail, code, stock, id) =>{
        const product = {
            title,
            description,
            price,
            thumbail,
            code,
            stock,
            id
        }
        //agregamos el Id Dinamico:
        this.addID(product);
        let rawdata = await fs.promises.readFile(this.path, 'utf-8');
        let data = JSON.parse(rawdata, null, "\n")
        // No deben repetirse productos con el mismo campo: code
        if (data.find(prod => prod.code === product.code)) {
            return console.error(`El producto con el code: ${product.code} ya existe:`);
        } else {
            data.push(product);
        }
        
        let prodtoArray = data;
        // Una vez cargados, los datos al array de productos. Lo escribimos en el archivo:
        await fs.promises.writeFile(this.path, JSON.stringify(prodtoArray, null, '\t'))
            .then(()=> {return console.log(`Se agrego ${product.title} sin problemas`)})
            .catch(err => console.log(err))   
    }
// Buscamos el producto con un id especifico. Si existe lo retorna por consola.
    getProductsById = async(id) =>{
        try {
            const rawdata = await fs.promises.readFile(this.path, 'utf-8')
            let data = JSON.parse(rawdata).find(prod => prod.id === id)
            if (!data){
                return console.log("Not found");
            }else {
                return data
            }
        } catch (error) {
            throw new Error('Se produjo un error')
        }
    }
//Actualiza informacion de un producto especifico:
    updateProduct = async(id, updateObj) => {
        try {
            let oldProd = await getProducts()
            const productoIndex = oldProd.findIndex((prod)=> prod.id === id);
            const newData= {
                ...updateObj,
                id
            }
            oldProd[productoIndex] = newData;
            await fs.promises.writeFile(this.path ,JSON.stringify(oldProd, null, '\t'));
            console.log(`El producto con el id ${id} se actualizo correctamente.`);
            
        } catch (error) {
            throw new Error(error);
        }
    }
// Eliminamos un producto, con un id especifico:
    deleteProduct = async(id)=>{
        try { 
            //Leemos el archivo, lo filtramos y luego volvemos a reescribir:
            const rawdata = await fs.promises.readFile(this.path, 'utf-8')
            let data = JSON.parse(rawdata).filter(producto => producto.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, "\t"));
            return console.log("Se elimino correctamente")
                    
        } catch (error) {
            throw new Error(error)
        }
    }
}

// Creamos la instancia de la clase
const { getProducts, addProduct, getProductsById, updateProduct, deleteProduct } = new ProductManager();


//Devuelve la lista de productos. De no existir el archivo crea uno vacio.
//getProducts();

//addProduct("producto prueba","este es un producto prueba", 1000, "sin imagen", "code123", 25); //Agregamos el producto
//addProduct("producto prueba2","este es un producto prueba", 1000, "sin imagen", "code123", 25); // Agregamos producto con el mismo campo code, debe retornar error
//addProduct("producto prueba3","este es un producto prueba", 1000, "sin imagen", "code12345556", 25) //Agregamos un producto con distinto campo code, debe agregarlo sin problemas, con el id incrementado

//addProduct("prod6","este es un producto prueba", 1000, "sin imagen", "codeerr", 25)

//deleteProduct();
//getProductsById() //Encuentra el producto

/*updateProduct(2,newData ={
    title: "nuevo producto",
    description: "probando Cambios",
    price: 550,
    thumbail: "sin imagen",
    code: "updateFunction",
    stock: 1
   });*/