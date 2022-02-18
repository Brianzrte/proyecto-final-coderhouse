import express from 'express'
const router = express.Router();

//middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const {default: productosRoute } = await import('./productos/productos.routes.js');
const {default: carritoRoute } = await import('./carrito/carrito.routes.js');

//rutas raiz
router.use('/productos', productosRoute);
router.use('/carrito', carritoRoute);
router.use('*', (req, res) => {
    res.status(404).json({
        error: -2,
        descripcion: 'la ruta ' + req.baseUrl + ' no existe'
    });
});

//exportar
export default router;