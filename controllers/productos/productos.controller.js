const { ProductosApi } = require('../../models/index');
const productos = new ProductosApi();


const getController = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        const producto = await productos.getAll();
        return res.status(200).json(producto);
    }
    
    const producto = await productos.getById(id);
    return (producto) ? res.status(200).json(producto)
                        : res.status(404).json({ error: 'El producto no existe' });
}

const saveController = async (req, res) => {
    const { nombre, precio, descripcion, codigo, foto, stock } = req.body;

    if (!nombre || !precio || !descripcion || !codigo || !foto || !stock) 
        return res.status(400).json({ error: 'Todos los campos son requeridos' });

    //verifico si el codigo ya existe
    const producto = await productos.getByCode(codigo);
    if(producto) return res.status(400).json({ error: 'El producto ya existe' });

    const result = await productos.save({
        nombre,
        precio,
        descripcion,
        codigo,
        foto,
        stock
    });

    return (result) ? res.status(201).json({ message: 'Producto creado' })
                    : res.status(500).json({ error: 'Error al crear el producto' });
}

const updateController = async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'El id es requerido' })

    const { nombre, precio, descripcion, codigo, foto, stock } = req.body;

    if (!nombre || !precio || !descripcion || !codigo || !foto || !stock) 
        return res.status(400).json({ error: 'Todos los campos son requeridos' });

    const result = await productos.update(id, {
        nombre,
        precio,
        descripcion,
        codigo,
        foto,
        stock
    });

    return (result) ? res.status(200).json({ message: 'Producto actualizado' })
                    : res.status(500).json({ error: 'Error al actualizar el producto' });
}

const deleteController = async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: 'El id es requerido' })

    const result = await productos.delete(id);

    return (result) ? res.status(200).json({ message: 'Producto eliminado' })
                    : res.status(404).json({ error: 'El producto no existe' });
}

//exports
module.exports = {
    getController,
    saveController,
    updateController,
    deleteController
}