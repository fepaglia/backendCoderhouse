import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './utility.js';
import productsRouter from '../src/routes/products.router.js';
import viewsRouter from '../src/routes/views.router.js';
import {Server} from 'socket.io';


const app = express();
//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');

//Static public:
app.use(express.static(__dirname+'/public'))

//Routes
app.use('/api/products', productsRouter);
app.use('/realtimeproducts', viewsRouter);

const server = app.listen(8080, () => console.log('Listening on port 8080'));

//Socket
const io = new Server(server);

io.on('connection', socket =>{
    console.log('nuevo cliente conectado')
})

app.set('socket.io', io);