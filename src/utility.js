import fs from 'fs';

//Lectura del archivo .JSON y parseo a OBJ de Js:
const readFile = async (path) =>{
    const rawdata = await fs.promises.readFile(path, 'utf-8')
    let data = await JSON.parse(rawdata)
    return data;
}

const writeFile = async (path, data) =>{
   await fs.promises.writeFile(path, JSON.stringify(data, null, "\t"));
}

const searchByID = async (path, id) =>{
    const items = await readFile(path)
    try {
       let item = items.find(prod => prod.id === id)
        if (!item){
            throw new Error("Not found")
        }else {
            return item ;
        }
    } catch (error) {
        return error.message;
    }
}

const addID = async (item, path) =>{
    let data = await readFile(path);
    if (data.length === 0){
        item.id = 0;
    } else {
        item.id = data[data.length -1].id +1;
        return item;
    }    
}

export default {readFile, writeFile, searchByID, addID};
