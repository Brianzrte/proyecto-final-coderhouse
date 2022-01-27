const express = require('express');
const router = express.Router();

//middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//rutas raiz
router.use('/productos', require('./productos/productos.routes'));
router.use('/carrito', require('./carrito/carrito.routes'));
router.use('*', (req, res) => {
    res.status(404).json({
        error: -2,
        descripcion: 'la ruta ' + req.baseUrl + ' no existe'
    });
});

//exportar
module.exports = router;