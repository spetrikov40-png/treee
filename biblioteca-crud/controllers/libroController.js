const db = require('../config/database');
const obtenerLibros = async (req, res) => {
    try {

        const [libros] = await db.query('SELECT * FROM libros ORDER BY id DESC');
        res.json({
            success: true,
            count: libros.length,
            data: libros
        })
    } catch (error) {
        console.error('Error al obtener libros');
        res.json({
            success: false,
            mensaje: 'Error al obtener el libro',
            error: error.mensaje
        })
    }
}

const obtenerLibroPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [libro] = await db.query('SELECT * FROM libros WHERE id=?', [id]);
        if (libro.length === 0) {
            return res.status(400).json({
                success: false,
                mensaje: "Libro no encontrado"
            })
        }
        res.json({
            success: true,
            data: libro[0]
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: "Error al obtener los libros",
            error: error.mensaje
        })
    }
}

const crearLibro = async (req, res) => {
    try {
        const { titulo, autor, isbn, editorial, anio_publicacion,idcategoria } = req.body;
        if (!titulo || !autor) {
            return res.status(400).json({
                success: false,
                mensaje: "Título y autor son obligatorios"
            });
        }
        const [resultado] =  await db.query(
            'INSERT INTO libros(titulo, autor, isbn,editorial, anio_publicacion,idcategoria) values (?,?,?,?,?,?)',
            [titulo, autor, isbn, editorial, anio_publicacion,idcategoria]
        );

        res.status(201).json({
            success:true,
            mensaje:"Libro creado exitosamente",
            data:{
                id:resultado.insertId,
                titulo,
                autor,
                isbn,
                editorial,
                anio_publicacion,
                idcategoria
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: "Error al obtener los libros",
            error: error.mensaje
        })
    }
}


const actualizarLibro = async (req, res) => {
    try {
        const {id}= req.params;
        const { titulo, autor, isbn, editorial, anio_publicacion,idcategoria } = req.body;
        
         const [libro] = await db.query('SELECT * FROM libros WHERE id=?', [id]);
        if (libro.length === 0) {
            return res.status(400).json({
                success: false,
                mensaje: "Libro no encontrado"
            })
        }

        await db.query(
            'UPDATE libros set titulo=?, autor=?, isbn=?,editorial=?, anio_publicacion=?,idcategoria=? WHERE id=?',
            [titulo, autor, isbn, editorial, anio_publicacion,idcategoria,id]
        );

        res.status(201).json({
            success:true,
            mensaje:"Libro actualizado exitosamente",
            data:{
                id,
                titulo,
                autor,
                isbn,
                editorial,
                anio_publicacion
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: "Error al obtener los libros",
            error: error.mensaje
        })
    }
}

const eliminarLibro = async (req, res) => {
    try {
        const {id}= req.params;                
         const [libro] = await db.query('SELECT * FROM libros WHERE id=?', [id]);
        if (libro.length === 0) {
            return res.status(400).json({
                success: false,
                mensaje: "Libro no encontrado"
            })
        }
        await db.query(
            'DELETE FROM libros WHERE id=?',
            [id]
        );
        res.status(201).json({
            success:true,
            mensaje:"Libro eliminado exitosamente",           
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            mensaje: "Error al obtener los libros",
            error: error.mensaje
        })
    }
}

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
    obtenerLibros,
    obtenerLibroPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro,
    obtenerLibroPorIdCategoria
}