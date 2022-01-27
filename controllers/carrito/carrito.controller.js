const CarritoApi  = require('../../models/carrito/carrito.api');
const carrito = new CarritoApi();

const createCartController = async (req, res) => {
    const cart = await carrito.createCart();
    return (cart) ? res.status(201).json(cart)
                    : res.status(500).json({ error: 'Error al crear el carrito' });
}

const getCartController = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'El id es requerido' })

    const cart = await carrito.getCart(id);
    return (cart) ? res.status(200).json(cart)
                    : res.status(404).json({ error: 'El carrito no existe' });
}

const pushToCartController = async (req, res) => {
    const { id } = req.params;
    const { productos } = req.body;
    if (!id || !productos) return res.status(400).json({ error: 'El id y el idProducto son requeridos' })
    
    const cart = await carrito.pushToCart(id, productos);
    return (cart) ? res.status(200).json({ message: 'Producto agregado al carrito' })
                  : res.status(404).json({ error: 'El producto no existe' });
}

const deleteCartController = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'El id es requerido' })

    const cart = await carrito.deleteCart(id);
    return (cart) ? res.status(200).json({ message: 'Carrito eliminado' })
                    : res.status(500).json({ error: 'Error al eliminar el carrito' });
}

const deleteProductController = async (req, res) => {
    const { id } = req.params;
    const { idProducto } = req.params;
    if (!id || !idProducto) return res.status(400).json({ error: 'El id del carrito y el id del producto son requeridos' })

    const cart = await carrito.deleteProduct(id, idProducto);
    return (cart) ? res.status(200).json({ message: 'Producto eliminado del carrito' })
                    : res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
}

//exports
module.exports = {
    createCartController,
    getCartController,
    pushToCartController,
    deleteCartController,
    deleteProductController
};