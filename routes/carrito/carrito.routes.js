const express = require('express'); 
const router = express.Router();

//controladores
const {
    createCartController,
    getCartController,
    pushToCartController,
    deleteCartController,
    deleteProductController
} = require('../../controllers/carrito/carrito.controller');

//rutas
router.post('/', createCartController);
router.get('/:id/productos', getCartController);
router.post('/:id/productos', pushToCartController);
router.delete('/:id', deleteCartController);
router.delete('/:id/productos/:idProducto', deleteProductController);

//exports
module.exports = router;

