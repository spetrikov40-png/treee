const db = require('../config/database');

const obtenerLibroPorIdCategoria = async (req, res) => {
    try {
        const {id}= req.params;
                
        const [categoria] = await db.query('SELECT * FROM categoria WHERE idcategoria=?', [id]);
        if (categoria.length === 0) {
            return res.status(400).json({
                success: false,
                mensaje: "Categoria no encontrada"
            })
        }
        const [libros] =
        await db.query(
            'SELECT * FROM libros WHERE idcategoria=?',
            [id]
        );

        res.status(201).json({
            success:true,
            count:libros.length,
            data:libros,
            categoria:categoria[0]
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: "Error al obtener los libros",
            error: error.mensaje
        })
    }
}



module.exports = {    
    obtenerLibroPorIdCategoria
}