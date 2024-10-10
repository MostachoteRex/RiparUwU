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
 * Crea una nueva especialidad en la base de datos.
 * 
 * @async
 * @function crear
 * @param {Object} especialidad - Los datos de la especialidad a crear.
 * @returns {Promise<void>} Promesa que se resuelve si la creación es exitosa.
 * @throws {Error} Si ocurre un error al crear la especialidad.
 */
const crear = async (especialidad) => {
    try {
        await queryAsync('INSERT INTO especialidad SET ?', {
            idEspecialidad: especialidad.idEspecialidad,
            nombre: especialidad.nombre
        });
        console.log('Especialidad creada con éxito');
    } catch (err) {
        console.error('Error al crear la especialidad:', err);
        throw err;
    }
};

/**
 * Lee todas las especialidades de la base de datos.
 * 
 * @async
 * @function leer
 * @returns {Promise<Array>} Una lista de especialidades.
 * @throws {Error} Si ocurre un error al leer las especialidades.
 */
const leer = async () => {
    try {
        const results = await queryAsync('SELECT * FROM especialidad');
        console.log('Especialidades obtenidas con éxito');
        return results
    } catch (err) {
        console.error('Error al obtener las especialidades', err);
        throw err;
    }
};

/**
 * Obtiene los detalles de una especialidad específica por su ID.
 * 
 * @async
 * @function detalle
 * @param {string} id - El ID del especialidad.
 * @returns {Promise<Object>} Los detalles del especialidad.
 * @throws {Error} Si no se encuentra el especialidad o si ocurre un error.
 */
const detalle = async (id) => {
    try {
        const results = await queryAsync('SELECT * FROM especialidad WHERE idEspecialidad = ?', [id]);
        if (results.length === 0) {
            throw new Error("No se encontro ninguna especialidad");
        }
        console.log('Especialidad obtenida con éxito');
        return results[0];
    } catch (err) {
        console.error('Error al obtener la especialidad', err);
        throw err;
    }
};

/**
 * Busca especialidades por el ID de la institución.
 * 
 * @async
 * @function buscarPorInstitucion
 * @param {string} id - El ID de la especialidad.
 * @returns {Promise<Array|null>} Lista de especialidades o null si no se encuentra ninguno.
 * @throws {Error} Si ocurre un error al buscar las especialidades.
 */
const buscarPorNombre = async (nombre) => {
    try {
        const results = await queryAsync('SELECT * FROM especialidad WHERE nombre = ?', [nombre]);
        if (results.length === 0) {
            console.log('No se encontró ninguna especialidad');
            return null;
        }
        console.log('Especialidad obtenida con éxito');
        return results;
    } catch (err) {
        console.error('Error al obtener la especialidad', err);
        throw err;
    }
};

/**
 * Actualiza una especialidad existente en la base de datos.
 * 
 * @async
 * @function actualizar
 * @param {Object} convenioDetalle - Los datos de la especialidad a actualizar.
 * @returns {Promise<Object>} La especialidad actualizado.
 * @throws {Error} Si ocurre un error durante la actualización o si no se encuentra la especialidad.
 */
const actualizar = async (especialidadDetalle) => {
    try {
        const idEspecialidad = especialidadDetalle.idEspecialidad;

        await queryAsync('UPDATE especialidad SET nombre = ? WHERE idEspecialidad = ?', [
            especialidadDetalle.nombre,
            especialidadDetalle.idEspecialidad,
            idEspecialidad
        ]);

        const results = await queryAsync('SELECT * FROM especialidad WHERE idEspecialidad = ?', [especialidadDetalle.idEspecialidad]);

        if (results.length === 0) {
            throw new Error('No se encontró ninguna especialidad para actualizar');
        }
        return results[0];
    } catch (err) {
        console.error('Error al actualizar la especialidad', err);
        throw err;
    }
};

/**
 * Elimina una especialidad de la base de datos por su ID.
 * 
 * @async
 * @function eliminar
 * @param {string} id - El ID de la especialidad a eliminar.
 * @returns {Promise<Object|null>} La especialidada o null si no se encuentra.
 * @throws {Error} Si ocurre un error al eliminar la especialidad.
 */
const eliminar = async (id) => {
    try {
        const results = await queryAsync('DELETE FROM especialidad WHERE idEspecialidad = ?', [id]);
        if (results.affectedRows === 0) {
            return null;
        }
        console.log('Especialidad eliminada con éxito');
        return results;
    } catch (err) {
        console.error('Error al eliminar la especialidad', err);
        throw err;
    }
};

export default { crear, leer, detalle, buscarPorNombre, actualizar, eliminar };