import { db } from "../conexionDB.js";

/**
 * Ejecuta una consulta SQL de forma asíncrona.
 * 
 * @function queryAsync
 * @param {string} query - La consulta SQL a ejecutar.
 * @param {Array} params - Los parámetros de la consulta.
 * @returns {Promise<Array>} Los resultados de la consulta.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 */
const queryAsync = (query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

/**
 * Crea una nueva institucion en la base de datos.
 * 
 * @async
 * @function crear
 * @param {Object} institucion - Los datos de la institucion a crear.
 * @returns {Promise<void>} Promesa que se resuelve si la creación es exitosa.
 * @throws {Error} Si ocurre un error al crear la institucion.
 */
const crear = async (institucion) => {
    try {
        await queryAsync('INSERT INTO institucion SET ?', {
            idInstitucion: institucion.idInstitucion,
            nombre: institucion.nombre,
            direccion: institucion.direccion,
            idEspecialidad: institucion.idEspecialidad
        });
        console.log('Institución creada con éxito');
    } catch (err) {
        console.error('Error al crear la institución', err);
        throw err;
    }
};

/**
 * Lee todas las instituciones de la base de datos.
 * 
 * @async
 * @function leer
 * @returns {Promise<Array>} Lista de instituciones.
 * @throws {Error} Si ocurre un error al leer las instituciones.
 */
const leer = async () => {
    try {
        const results = await queryAsync('SELECT * FROM institucion');
        console.log('Instituciones obtenidas con éxito');
        return results;
    } catch (err) {
        console.error('Error al obtener las instituciones', err);
        throw err;
    }
};

/**
 * Obtiene los detalles de una institución por su ID.
 * 
 * @async
 * @function detalle
 * @param {string} id - El ID de la institución.
 * @returns {Promise<Object>} Los detalles de la institución.
 * @throws {Error} Si no se encuentra la institución.
 */
const detalle = async (id) => {
    try {
        const results = await queryAsync('SELECT * FROM institucion WHERE idInstitucion = ?', [id]);
        if (results.length === 0) {
            throw new Error("No se encontro ninguna institución");
        }
        console.log('Institución obtenida con éxito');
        return results[0];
    } catch (err) {
        console.error('Error al obtener la institución', err);
        throw err;
    }
};

/**
 * Busca una institución por su nombre.
 * 
 * @async
 * @function buscarPorNombre
 * @param {string} nombre - El nombre de la institución.
 * @returns {Promise<Object|null>} La institución encontrada o null si no existe.
 * @throws {Error} Si ocurre un error durante la búsqueda.
 */
const buscarPorNombre = async (nombre) => {
    try {
        const results = await queryAsync('SELECT * FROM institucion WHERE nombre = ?', [nombre]);
        if (results.length === 0) {
            console.log('No se encontró ninguna institución');
            return null;
        }
        console.log('Institución obtenida con éxito');
        return results;
    } catch (err) {
        console.error('Error al obtener la institución', err);
        throw err;
    }
};

/**
 * Busca instituciones por el ID de una especialidad asociada.
 * 
 * @async
 * @function buscarEspecialidad
 * @param {string} id - El ID de la especialidad.
 * @returns {Promise<Array|null>} Las instituciones asociadas a la especialidad o null si no existen.
 * @throws {Error} Si ocurre un error durante la búsqueda.
 */
const buscarEspecialidad = async (id) => {
    try {
        const results = await queryAsync('SELECT * FROM institucion WHERE idEspecialidad = ?', [id]);
        if (results.length === 0) {
            console.log('No se encontró ninguna institución');
            return null;
        }
        console.log('Institución obtenida con éxito');
        return results;
    } catch (err) {
        console.error('Error al obtener la institución', err);
        throw err;
    }
};

/**
 * Actualiza una institución en la base de datos.
 * 
 * @async
 * @function actualizar
 * @param {Object} institucionDetalle - Los datos actualizados de la institución.
 * @returns {Promise<Object>} Los detalles de la institución actualizada.
 * @throws {Error} Si no se encuentra la institución para actualizar o si ocurre un error.
 */
const actualizar = async (institucionDetalle) => {
    try {
        const idInstitucion = institucionDetalle.idInstitucion;

        await queryAsync('UPDATE institucion SET nombre = ?, direccion = ?, idespecialidad = ? WHERE idInstitucion = ?', [
            institucionDetalle.nombre,
            institucionDetalle.direccion,
            institucionDetalle.idEspecialidad,
            idInstitucion
        ]);
        const results = await queryAsyn('SELECT * FROM institucion WHERE idInstitucion = ?', [institucionDetalle.idInstitucion]);
        if (results.length === 0) {
            throw new Error('No se encontró ninguna institución para actualizar');
        }
        return results[0];
    } catch (err) {
        console.error('Error al actualizar la institución', err);
        throw err;
    }
};

/**
 * Elimina una institución por su ID.
 * 
 * @async
 * @function eliminar
 * @param {string} id - El ID de la institución a eliminar.
 * @returns {Promise<void|null>} Promesa resuelta si se elimina correctamente o null si no se encontró la institución.
 * @throws {Error} Si ocurre un error al eliminar la institución.
 */
const eliminar = async (id) => {
    try {
        const results = await queryAsync('DELETE FROM institucion WHERE idInstitucion = ?', [id]);
        if (results.affectedRows === 0) {
            return null;
        }
        console.log('Institución eliminada con éxito');
        return results;
    } catch (err) {
        console.error('Error al eliminar la institucion', err);
        throw err;
    }
};

export default { crear, leer, buscarPorNombre, detalle, actualizar, eliminar, buscarEspecialidad };