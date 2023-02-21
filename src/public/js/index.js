import productmanager from '../../ProductManager.js';

const socket = io();

const botonELiminar = document.getElementById('eliminar');
const productManager = new productmanager()
socket.on(botonELiminar.addEventListener('onclick', () => productManager.deleteProduct(id)));