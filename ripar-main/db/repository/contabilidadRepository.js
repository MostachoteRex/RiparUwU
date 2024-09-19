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
 * Lee todos los registros de contabilidad desde la base de datos.
 * @async
 * @function leer
 * @returns {Promise<Array>} - Una promesa que se resuelve con un array de registros de contabilidad.
 * @throws {Error} - Si ocurre un error al consultar los registros.
 */
const leer = async () => {
    try {
        const results = await queryAsync('SELECT * FROM contabilidad');
        console.log('Registro de contabilidad obtenido con éxito');
        return results
    } catch (err) {
        console.error('Error al obtener el registro de contabilidad', err);
        throw err;
    }
};

export default {leer};