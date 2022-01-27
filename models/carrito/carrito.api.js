const { v4: uuidv4 } = require('uuid');
const fs = require ('fs');
const  ProductosApi   = require('../productos/productos.api');
const productos = new ProductosApi();

class CarritoApi {

    constructor() {
        this.carritos = [];
        this.load();
    }

    load() {
        try {
            const load = async () => {
                if(!fs.existsSync('./data/carritos.json')) {
                    fs.writeFileSync('./data/carritos.json', JSON.stringify([],null,2), 'utf-8');
                }
                const data = await fs.readFileSync('./data/carritos.json', 'utf-8');
                this.carritos = JSON.parse(data, null, 2);
            };
            load();
        } catch (error) {
            console.log(error);
            this.carritos = [];
        }
    }

    saveFile() {
        try {
            const saveFile = async () => {
                await fs.writeFileSync('./data/carritos.json', JSON.stringify(this.carritos, null, 2), 'utf-8');
            };
            saveFile();
        } catch (error) {
            console.log(error);
        }
    }

    //metodos
    createCart(){ 
        const cart = {
            id: uuidv4(),
            productos: [],
            timestamp: new Date()
        }
        this.carritos.push(cart);
        this.saveFile();
        return cart.id;
    }

    getCart(id){
        const cart = this.carritos.find(cart => cart.id === id);
        return (cart) ? cart.productos : null;
    }

    pushToCart(id, idProductos){
        const cart = this.carritos.find(cart => cart.id === id);
        if(!cart) return null;

        //recorro la lista de idProductos
        for(let i = 0; i < idProductos.length; i++){
            const producto = productos.getById(idProductos[i]);
            if(producto){
                cart.productos.push(producto);
            } else {
                return null;
            }
        }
        this.saveFile();
        return cart.productos;
    }

    deleteCart(id){
        const cart = this.carritos.find(cart => cart.id === id);
        if(!cart) return null;

        const index = this.carritos.indexOf(cart);
        this.carritos.splice(index, 1);
        this.saveFile();
        return this.carritos;
    }

    deleteProduct(id, idProducto){
        const cart = this.carritos.find(cart => cart.id === id);
        if(!cart) return null;

        const producto = cart.productos.find(producto => producto.id === idProducto);
        if(!producto) return null;

        const index = cart.productos.indexOf(producto);
        cart.productos.splice(index, 1);
        this.saveFile();
        return cart.productos;
    }
}

module.exports = CarritoApi;