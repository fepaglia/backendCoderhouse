const fs = require("fs");
const data = "el archivo fue creado con exito"

fs.promises.mkdir('direj')
    .then(() =>{console.log("carpeta creada")}
    )
    .catch(err =>{
        console.log(err)
    })

fs.promises.writeFile('./direj/example.txt', 'utf-8')
    .then(
       ()=> console.log("archivo creado")
    )
    .catch(err => {
        console.log(err)
    });

   