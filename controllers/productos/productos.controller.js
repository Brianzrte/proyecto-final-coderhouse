import { productosDao } from '../../models/index.js'


const getController = async (req, res, next) => {
    try{
        return (!req.params.id) 
            ? res.status(200).json(await productosDao.getAll())
            : res.status(200).json(await productosDao.getById(req.params.id));

    } catch (error) {
        next(error);
    }
}

const saveController = async (req, res) => {
    
    try{
        if(req.body.constructor === Object && Object.keys(req.body).length === 0)
            throw new Error('Error: no se encontro producto');
    
        //verifico si el codigo ya existe
        const producto = await productosDao.getByCode(req.body.codigo);
        if(producto) throw new Error('Error: el codigo ya existe');

        res.status(201).json(await productosDao.save({
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion : req.body.descripcion,
            codigo : req.body.codigo,
            foto : req.body.foto,
            stock : req.body.stock
        }));

    } catch (error) {
        next(error)
    }
}

const updateController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('Error: no se encontro id de producto');

        if(req.body.constructor === Object && Object.keys(req.body).length === 0)
            throw new Error('Error: no se encontro producto');

        const { nombre, precio, descripcion, codigo, foto, stock } = req.body;

        res.status(200).json( await productosDao.update(id, {
            nombre,
            precio,
            descripcion,
            codigo,
            foto,
            stock
        }) );

    } catch (error) {
        next(error);
    }
    
}

const deleteController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('Error: no se encontro id de producto');

        res.status(200).json( await productos.delete(id) );
    } catch (error) {
        next(error);
    }
}

//exports
export {
    getController,
    saveController,
    updateController,
    deleteController
}