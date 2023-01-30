import express from 'express';

const app = express();


app.get('/products', (req, res) =>{
    res.send("hola Mundo")
});

app.listen(8080, () => console.log('Listening on port 8080'));