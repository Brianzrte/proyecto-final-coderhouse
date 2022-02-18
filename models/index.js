let productosDao;
let carritoDao;

switch (process.env.DATASOURCE) {
    case 'mongodb':
        const {default: ProductosDaoMongoDB }  = await import('./productos/productosDaoMongoDB.js');
        const {default: CarritoDaoMongoDB }  = await import('./carrito/carritoDaoMongoDB.js');
        
        productosDao = new ProductosDaoMongoDB();
        carritoDao = new CarritoDaoMongoDB();
        break;
    
    case 'firebase':
        const { ProductosDaoFirebase } = import('./productos/productosDaoFirebase');
        const { CarritoDaoFirebase } = import('./carrito/carritoDaoFirebase');

        productosDao = new ProductosDaoFirebase();
        carritoDao = new CarritoDaoFirebase();
        break;
    default: break;
}

export {
    productosDao,
    carritoDao,
};
