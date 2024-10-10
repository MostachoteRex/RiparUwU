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
 * Crea una nueva suscripción en la base de datos.
 * 
 * @async
 * @function crear
 * @param {Object} suscripcion - Objeto que contiene los datos de la suscripción.
 * @returns {Promise<Object>} - Promesa que resuelve con el resultado de la creación.
 * @throws {Error} - Si ocurre un error al crear la suscripción o registrar en contabilidad.
 */
const crear = async (suscripcion) => {
    try {
        await queryAsync('INSERT INTO suscripciones SET ?', {
            idSuscripcion: suscripcion.idSuscripcion,
            noContrato: suscripcion.noContrato,
            fechaSuscripcion: suscripcion.fechaSuscripcion,
            fechaVencimiento: suscripcion.fechaVencimiento,
            idAsesor: suscripcion.idAsesor,
            idSuscriptor: suscripcion.idSuscriptor,
            valor: suscripcion.valor,
            metodoPago: suscripcion.metodoPago
        });

        console.log('Suscripción creada con éxito');

        const results = await queryAsync('INSERT INTO contabilidad SET ?', {
            noContrato: suscripcion.noContrato,
            asesor: suscripcion.idAsesor,
            suscriptor: suscripcion.idSuscriptor,
            valor: suscripcion.valor,
            metodoPago: suscripcion.metodoPago
        });

        console.log('Registro en contabilidad creado con éxito');
        return results;
    } catch (err) {
        console.log('Error al crear la suscripción o el registro en contabilidad', err);
        throw err;
    }
};

/**
 * Lee todas las suscripciones desde la base de datos.
 * 
 * @async
 * @function leer
 * @returns {Promise<Array>} - Promesa que resuelve con la lista de suscripciones.
 * @throws {Error} - Si ocurre un error al obtener las suscripciones.
 */
const leer = async () => {
    try {
        const results = await queryAsync("SELECT * FROM suscripciones");
        console.log('Suscripciones obtenidas con éxito');
        return results;
    } catch (err) {
        console.error('Error al obtener las suscripciones', err);
        throw err;
    }
};

/**
 * Obtiene los detalles de una suscripción por su ID.
 * 
 * @async
 * @function detalle
 * @param {string} id - ID de la suscripción.
 * @returns {Promise<Object>} - Promesa que resuelve con los detalles de la suscripción.
 * @throws {Error} - Si no se encuentra la suscripción o si ocurre un error.
 */
const detalle = async (id) => {
    try {
        const results = await queryAsync('SELECT * FROM suscripciones WHERE idSuscripcion = ?', [id]);
        if (results.length === 0) {
            throw new Error("No se encontró ninguna suscripción");
        }
        console.log('Suscripción obtenida con éxito');
        return results[0];
    } catch (err) {
        console.error('Error al obtener la suscripción', err);
        throw err;
    }
};

/**
 * Busca una suscripción por el ID del suscriptor.
 * 
 * @async
 * @function buscarId
 * @param {string} idSuscriptor - ID del suscriptor.
 * @returns {Promise<Object|null>} - Promesa que resuelve con la suscripción encontrada o null si no existe.
 * @throws {Error} - Si ocurre un error durante la búsqueda.
 */
const buscarId = async (idSuscriptor) => {
    try {
        const results = await queryAsync('SELECT * FROM suscripciones WHERE idSuscriptor = ?', [idSuscriptor]);
        if (results.length === 0) {
            console.log('No se encontró ninguna suscripción con este ID');
            return null;
        }
        console.error('Este ID ya se encuentra registrado');
        return results[0];
    } catch (err) {
        console.error('Error al obtener el ID', err);
        throw err;
    }
};

/**
 * Busca una suscripción por su número de contrato.
 * 
 * @async
 * @function buscarPorContrato
 * @param {string} noContrato - Número de contrato de la suscripción.
 * @returns {Promise<Object>} - Promesa que resuelve con la suscripción encontrada.
 * @throws {Error} - Si no se encuentra la suscripción o si ocurre un error.
 */
const buscarPorContrato = async (noContrato) => {
    try {
        const results = await queryAsync('SELECT * FROM suscripciones WHERE noContrato = ?', [noContrato]);
        if (results.length === 0) {
            console.log('No se encontró ninguna suscripción con este contrato');
            return null;
        }
        console.log('Este contrato existe');
        return results[0];
    } catch (err) {
        console.error('Error al obtener la suscripción por contrato', err);
        throw err;
    }
};

/**
 * Actualiza una suscripción existente en la base de datos.
 * 
 * @async
 * @function actualizar
 * @param {Object} suscripcionDetalle - Objeto con los nuevos datos de la suscripción.
 * @returns {Promise<Object>} - Promesa que resuelve con la suscripción actualizada.
 * @throws {Error} - Si no se encuentra la suscripción o si ocurre un error durante la actualización.
 */
const actualizar = async (suscripcionDetalle) => {
    try {
        await queryAsync('UPDATE suscripciones SET fechaSuscripcion = ?, fechaVencimiento = ?, tipoSuscripcion = ? WHERE idSuscripcion = ?', [
            suscripcionDetalle.fechaSuscripcion,
            suscripcionDetalle.fechaVencimiento,
            suscripcionDetalle.tipoSuscripcion,
            suscripcionDetalle.idSuscripcion
        ]);
        const results = await queryAsync('SELECT * FROM suscripciones WHERE idSuscripcion = ?', [suscripcionDetalle.idSuscripcion]);
        if (results.length === 0) {
            return null;
        }
        console.log('Suscripción actualizada con éxito');
        return results[0];
    } catch (err) {
        console.error('Error al actualizar la suscripción', err);
        throw err;
    }
};

/**
 * Elimina una suscripción de la base de datos.
 * 
 * @async
 * @function eliminar
 * @param {string} id - ID de la suscripción a eliminar.
 * @returns {Promise<Object>} - Promesa que resuelve con el resultado de la eliminación.
 * @throws {Error} - Si no se encuentra la suscripción o si ocurre un error durante la eliminación.
 */
const eliminar = async (id) => {

    try {
        const results = await queryAsync('DELETE FROM suscripciones WHERE idSuscripcion = ?', [id]);
        if (results.affectedRows === 0) {
            return null;
        }
        console.log('Suscripción eliminada con éxito');
        return results;
    } catch (err) {
        console.error("Error al eliminar la suscripción", err);
        throw err;
    }
};

export default { crear, leer, detalle, buscarId, buscarPorContrato, actualizar, eliminar };