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
 * Crea un nuevo convenio en la base de datos.
 * 
 * @async
 * @function crear
 * @param {Object} convenio - Los datos del convenio a crear.
 * @returns {Promise<void>} Promesa que se resuelve si la creación es exitosa.
 * @throws {Error} Si ocurre un error al crear el convenio.
 */
const crear = async (convenio) => {
    try {
        await queryAsync('INSERT INTO convenio SET ?', {
            idConvenio: convenio.idConvenio,
            idEspecialidad: convenio.idEspecialidad,
            idInstitucion: convenio.idInstitucion,
            nombreDr: convenio.nombreDr,
            tarifaParticular: convenio.tarifaParticular,
            tarifaMultipreventiva: convenio.tarifaMultipreventiva,
            telefono: convenio.telefono,
            email: convenio.email
        });
        console.log('Convenio creado con éxito');
    } catch (err) {
        console.error('Error al crear el convenio', err);
        throw err;
    }
};

/**
 * Lee todos los convenios de la base de datos.
 * 
 * @async
 * @function leer
 * @returns {Promise<Array>} Una lista de convenios.
 * @throws {Error} Si ocurre un error al leer los convenios.
 */
const leer = async () => {
    try {
        const results = await queryAsync('SELECT * FROM convenio');
        console.log('Convenios obtenidos con éxito');
        return results;
    } catch (err) {
        console.error('Error al obtener los convenios', err);
        throw err;
    }
};

/**
 * Obtiene los detalles de un convenio específico por su ID.
 * 
 * @async
 * @function detalle
 * @param {string} id - El ID del convenio.
 * @returns {Promise<Object>} Los detalles del convenio.
 * @throws {Error} Si no se encuentra el convenio o si ocurre un error.
 */
const detalle = async (id) => {
    try {
        const results = await queryAsync('SELECT * FROM convenio WHERE idConvenio = ?', [id]);
        if (results.length === 0) {
            throw new Error("No se encontró ningún convenio");
        }
        console.log('Convenio obtenido con éxito');
        return results[0];
    } catch (err) {
        console.error('Error al obtener el convenio', err);
        throw err;
    }
};

/**
 * Busca convenios por el ID de la institución.
 * 
 * @async
 * @function buscarPorInstitucion
 * @param {string} id - El ID de la institución.
 * @returns {Promise<Array|null>} Lista de convenios o null si no se encuentra ninguno.
 * @throws {Error} Si ocurre un error al buscar los convenios.
 */
const buscarPorInstitucion = async (id) => {
    try {
        const results = await queryAsync('SELECT * FROM convenio WHERE idInstitucion = ?', [id]);
        if (results.length === 0) {
            console.log('No se encontró ningún convenio');
            return null;
        }
        console.log('Convenios obtenidos con éxito');
        return results;
    } catch (err) {
        console.error('Error al obtener los convenios', err);
        throw err;
    }
};

/**
 * Actualiza un convenio existente en la base de datos.
 * 
 * @async
 * @function actualizar
 * @param {Object} convenioDetalle - Los datos del convenio a actualizar.
 * @returns {Promise<Object>} El convenio actualizado.
 * @throws {Error} Si ocurre un error durante la actualización o si no se encuentra el convenio.
 */
const actualizar = async (convenioDetalle) => {
    try {
        const idConvenio = convenioDetalle.idConvenio;

        await queryAsync('UPDATE convenio SET idEspecialidad = ?, idInstitucion = ?, nombreDR = ?, tarifaParticular = ?, tarifaMultipreventiva = ? WHERE idConvenio = ?', [
            convenioDetalle.idEspecialidad,
            convenioDetalle.idInstitucion,
            convenioDetalle.nombreDr,
            convenioDetalle.tarifaParticular,
            convenioDetalle.tarifaMultipreventiva,
            idConvenio
        ]);

        const results = await queryAsync('SELECT * FROM convenio WHERE idConvenio = ?', [idConvenio]);

        if (results.length === 0) {
            throw new Error('No se encontró ningún convenio con ese ID');
        }
        return results[0];
    } catch (err) {
        console.error('Error al actualizar el convenio', err);
        throw err;
    }
};

/**
 * Elimina un convenio de la base de datos por su ID.
 * 
 * @async
 * @function eliminar
 * @param {string} id - El ID del convenio a eliminar.
 * @returns {Promise<Object|null>} El convenio eliminado o null si no se encuentra.
 * @throws {Error} Si ocurre un error al eliminar el convenio.
 */
const eliminar = async (id) => {
    try {
        const results = await queryAsync('DELETE FROM convenio WHERE idConvenio = ?', [id]);
        if (results.affectedRows === 0) {
            return null;
        }
        console.log('Convenio eliminado con éxito');
        return results;
    } catch (err) {
        console.error('Error al eliminar el convenio', err);
        throw err;
    }
};

export default { crear, leer, detalle, buscarPorInstitucion, actualizar, eliminar };