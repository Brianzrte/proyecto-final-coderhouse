let productosDao;
let carritoDao;

switch (process.env.DATASOURCE) {
    case 'mongodb':
        const {default: ProductosDaoMongoDB }  = await import('./productos/ProductosDaoMongoDB.js');
        const {default: CarritoDaoMongoDB }  = await import('./carrito/CarritoDaoMongoDB.js');
        
        productosDao = new ProductosDaoMongoDB();
        carritoDao = new CarritoDaoMongoDB();
        break;
    
    case 'firebase':
        const {default: ProductosDaoFirebase } = await import('./productos/ProductosDaoFirebase.js');
        const {default: CarritoDaoFirebase } = await import('./carrito/CarritoDaoFirebase.js');

        productosDao = new ProductosDaoFirebase();
        carritoDao = new CarritoDaoFirebase();
        break;
    default: break;
}

export {
    productosDao,
    carritoDao,
};
