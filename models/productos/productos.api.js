const {v4: uuidv4} = require('uuid');
const fs = require('fs');

class ProductosApi {
    constructor() {
        this.productos = [];
        this.load();
    }

    load() {
        try {
            const load = async () => {
                if(!fs.existsSync('./data/productos.json')) {
                    fs.writeFileSync('./data/productos.json', JSON.stringify([],null,2), 'utf-8');
                }
                const data = await fs.readFileSync('./data/productos.json', 'utf-8');
                this.productos = JSON.parse(data, null, 2);
            };
            load();
        } catch (error) {
            console.log(error);
            this.productos = [];
        }
    }

    saveFile() {
        try {
            const saveFile = async () => {
                await fs.writeFileSync('./data/productos.json', JSON.stringify(this.productos, null, 2), 'utf-8');
            };
            saveFile();
        } catch (error) {
            console.log(error);
        }
    }

    save(obj) {
        const producto = {... obj, timestamp: Date.now() ,id: uuidv4()};
        this.productos.push(producto);
        this.saveFile();
        return producto;
    }

    getAll() {
        return this.productos;
    };

    getById(id) {
        const producto = this.productos.find(producto => producto.id === id);
        return (producto) ? producto : null;
    }

    update(id, obj) {   
        const producto = this.productos.find(producto => producto.id === id);
        if(!producto) return null;

        const index = this.productos.indexOf(producto);
        this.productos[index] = {...producto, ...obj};
        this.saveFile();
        return this.productos[index];
    }

    delete(id) {
        const producto = this.productos.find(producto => producto.id === id);
        if(!producto) return null;

        const index = this.productos.indexOf(producto);
        this.productos.splice(index, 1);
        this.saveFile();
        return producto;
    }

    getByCode(code) {
        const producto = this.productos.find(producto => producto.codigo === code);
        return (producto) ? producto : null;
    }


}

module.exports = ProductosApi;