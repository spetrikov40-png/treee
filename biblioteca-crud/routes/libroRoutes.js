const express=require('express');
const router = express.Router();
const {
    obtenerLibros,
    obtenerLibroPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro,
    obtenerLibroPorIdCategoria
} = require('../controllers/libroController');

router.get('/', obtenerLibros);
router.get('/:id',obtenerLibroPorId);
router.get('/librosByCategoria/:id', obtenerLibroPorIdCategoria);
router.post('/',crearLibro);
router.put('/:id',actualizarLibro);
router.delete('/:id',eliminarLibro);


module.exports= router;