const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth/auth');

const { 
    getController,
    saveController,
    updateController,
    deleteController
} = require('../../controllers/productos/productos.controller');

//rutas
router.get('/', getController);
router.get('/:id', getController);
router.post('/', authMiddleware, saveController);
router.put('/:id', authMiddleware, updateController);
router.delete('/:id', authMiddleware, deleteController);

//exports
module.exports = router;