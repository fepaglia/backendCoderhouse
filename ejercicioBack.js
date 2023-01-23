const fs = require('fs');
let date = new Date().toLocaleDateString();
let hour = new Date().toLocaleTimeString();



fs.writeFile( `./date.txt`, date, error =>{
    if (error) {
        throw new Error(`Error en escritura: ${error}`)
    }

fs.readFile(`./date.txt`, `utf-8`, (error, contenido)=>{
    if (error) {
        throw new Error(`Error en lectura: ${error}`)
    }
    console.log(contenido);
})

})