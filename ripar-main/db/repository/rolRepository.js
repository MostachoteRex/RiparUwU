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
 * Crea un nuevo rol en la base de datos.
 * 
 * @async
 * @function crear
 * @param {Object} rol - Objeto con los datos del rol a crear.
 * @throws {Error} Si ocurre un error al crear el rol.
 */
const crear = async (rol) => {
    try {
        await queryAsync('INSERT INTO rol SET ?', { nombre: rol.nombre });
        console.log('Rol creado con éxito');
    } catch (err) {
        console.error('Error al crear el rol', err);
        throw err;
    }
};

/**
 * Lee todos los roles de la base de datos.
 * 
 * @async
 * @function leer
 * @returns {Promise<Array>} Lista de roles.
 * @throws {Error} Si ocurre un error al obtener los roles.
 */
const leer = async () => {
    try {
        const results = await queryAsync('SELECT * FROM rol');
        console.log('Roles obtenidos con éxito');
        return results;
    } catch (err) {
        console.error('Error al obtener los roles', err);
        throw err;
    }
};
/**
 * Obtiene el detalle de un rol por su ID.
 * 
 * @async
 * @function detalle
 * @param {number} id - ID del rol.
 * @returns {Promise<Object>} Detalle del rol.
 * @throws {Error} Si no se encuentra el rol o si ocurre un error.
 */
const detalle = async (id) => {
    try {
        const results = await queryAsync('SELECT * FROM rol WHERE idRol = ?', [id]);
        if (results.length === 0) {
            throw new Error("No se encontro ningun rol");
        }
        console.log('rol obtenido con exito');
        return results[0];
    } catch (err) {
        console.error('Error al obtener el rol', err)
        throw err;
    }
};

/**
 * Actualiza un rol existente en la base de datos.
 * 
 * @async
 * @function actualizar
 * @param {Object} rolDetalle - Detalles del rol a actualizar.
 * @returns {Promise<Object>} Rol actualizado.
 * @throws {Error} Si no se encuentra el rol para actualizar o si ocurre un error.
 */
const actualizar = async (rolDetalle) => {
    try {
        const idRol = rolDetalle.idRol;
        await queryAsync('UPDATE rol SET estado = ? WHERE idRol = ?', [
            rolDetalle.estado,
            rolDetalle.idRol,
            idRol
        ]);
        const results = await queryAsync('SELECT * FROM rol WHERE idRol = ?', [rolDetalle.idRol]);
        if (results.length === 0) {
            throw new Error('No se encontró ningún rol para actualizar');
        }
        return results[0];
    } catch (err) {
        console.error('Error al actualizar el rol', err);
        throw err;
    }
};

/**
 * Elimina un rol por su ID.
 * 
 * @async
 * @function eliminar
 * @param {number} id - ID del rol.
 * @returns {Promise<null|Object>} Resultado de la eliminación, o null si no se encuentra.
 * @throws {Error} Si ocurre un error al eliminar el rol.
 */
const eliminar = async (id) => {
    try {
        const results = await queryAsync('DELETE FROM rol WHERE idRol = ?', [id]);
        if (results.affectedRows === 0) {
            return null;
        }
        console.log('Rol eliminado con éxito');
        return results;
    } catch (err) {
        console.error('Error al eliminar el rol', err);
        throw err;
    }
};

export default { crear, leer, detalle, actualizar, eliminar };