const express = require('express');
const router = express.Router();

//middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//rutas raiz
router.use('/productos', require('./productos/productos.routes'));
router.use('/carrito', require('./carrito/carrito.routes'));

//exportar
module.exports = router;