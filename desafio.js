class ProductManager {
    constructor(){
        this.products = [];
    }

    getProducts = () =>{
        return this.products;
    }

    addProduct = (title, description, price, thumbail, code, stock, id) =>{
        const product = {
            title,
            description,
            price,
            thumbail,
            code,
            stock,
            id
        }
// No deben repetirse productos con el mismo campo: code
        if (this.products.find(prod => prod.code === product.code)) {
            return console.error(`El producto con el code: ${product.code} ya existe`);
        }
        
        if (this.products.length === 0){
            product.id = 0;
        } else {
            product.id = this.products[this.products.length -1].id +1;
        }

        this.products.push(product);
        console.log(`Se agrego ${product.title} sin problemas`);
    }

    getProductsById = (id) =>{
        const product = this.products.find(prod => prod.id === id);
        if (!product){
            return "Not found";
        } else {
            return `El producto con el id:${product.id} existe, se llama: ${product.title}`;
        }
    }
}
// Creamos la instancia de la clase
const productManager = new ProductManager();

console.log(productManager.getProducts()); //Arreglo vacio
productManager.addProduct("producto prueba","este es un producto prueba", 1000, "sin imagen", "code123", 25); //Agregamos el producto
console.log(productManager.products) //Mostramos la lista 
productManager.addProduct("producto prueba2","este es un producto prueba", 1000, "sin imagen", "code123", 25); // Agregamos producto con el mismo campo code, debe retornar error
productManager.addProduct("producto prueba3","este es un producto prueba", 1000, "sin imagen", "code12345", 25) //Agregamos un producto con distinto campo code, debe agregarlo sin problemas, con el id incrementado
console.log(productManager.products) //Volvemos a mostrar
console.log(productManager.getProductsById(2)) //Buscamos por Id, dara error
console.log(productManager.getProductsById(1)) //Encuentra el producto