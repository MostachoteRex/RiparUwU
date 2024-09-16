import { db } from "../conexionDB.js";

/**
 * Ejecuta una consulta SQL de manera asíncrona.
 * 
 * @param {string} query - La consulta SQL a ejecutar.
 * @param {Array|Object} [params] - Los parámetros para la consulta SQL.
 * @returns {Promise<Object>} - Una promesa que se resuelve con los resultados de la consulta.
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
 * Crea un nuevo beneficiario en la base de datos.
 * 
 * @param {Object} beneficiario - El objeto del beneficiario a crear.
 * @param {number} beneficiario.idBeneficiario - El ID del beneficiario.
 * @param {string} beneficiario.nombre - El nombre del beneficiario.
 * @param {string} beneficiario.primerApellido - El primer apellido del beneficiario.
 * @param {string} beneficiario.segundoApellido - El segundo apellido del beneficiario.
 * @param {string} beneficiario.documento - El documento del beneficiario.
 * @param {number} beneficiario.idSuscriptor - El ID del suscriptor al que pertenece el beneficiario.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando el beneficiario se crea con éxito.
 */
const crear = async (beneficiario) => {
    try {
        await queryAsync('INSERT INTO beneficiarios SET ?', {
            idBeneficiario: beneficiario.idBeneficiario,
            nombre: beneficiario.nombre,
            primerApellido: beneficiario.primerApellido,
            segundoApellido: beneficiario.segundoApellido,
            documento: beneficiario.documento,
            idSuscriptor: beneficiario.idSuscriptor
        });
        console.log('Beneficiario creado con éxito');
    } catch (err) {
        console.log('Error al crear el beneficiario', err);
        throw err;
    }
};

/**
 * Lee todos los beneficiarios de la base de datos.
 * 
 * @returns {Promise<Array>} - Una promesa que se resuelve con un array de beneficiarios.
 */
const leer = async () => {
    try {
        const results = await queryAsync("SELECT * FROM beneficiarios");
        console.log('Beneficiarios obtenidos con éxito');
        return results;
    } catch (err) {
        console.error('Error al obtener los beneficiarios', err);
        throw err;
    }
};

/**
 * Busca un beneficiario por su documento.
 * 
 * @param {string} documento - El documento del beneficiario a buscar.
 * @returns {Promise<Object|null>} - Una promesa que se resuelve con el beneficiario encontrado o null si no se encuentra.
 */
const buscarDocumento = async (documento) => {
    try {
        const results = await queryAsync('SELECT * FROM beneficiarios WHERE documento = ?', [documento]);
        if (results.length === 0) {
            console.log('No se encontró ningún documento');
            return null;
        }
        console.log('Este documento ya se encuentra registrado');
        return results[0];
    } catch (err) {
        console.error('Error al obtener el documento', err);
        throw err;
    }
};

/**
 * Busca beneficiarios por el ID del suscriptor.
 * 
 * @param {number} id - El ID del suscriptor.
 * @returns {Promise<Array>} - Una promesa que se resuelve con un array de beneficiarios asociados al suscriptor.
 */
const buscarSuscriptor = async (id) => {
    try {
        const results = await queryAsync('SELECT * FROM beneficiarios WHERE idSuscriptor = ?', [id]);
        console.log('Beneficiarios obtenidos con éxito');
        return results;
    } catch (err) {
        console.error('Error al obtener los beneficiarios', err);
        throw err;
    }
};

/**
 * Obtiene el detalle de un beneficiario por su ID.
 * 
 * @param {number} id - El ID del beneficiario.
 * @returns {Promise<Object>} - Una promesa que se resuelve con el beneficiario encontrado.
 */
const detalle = async (id) => {
    try {
        const results = await queryAsync('SELECT * FROM beneficiarios WHERE idBeneficiario = ?', [id]);
        if (results.length === 0) {
            throw new Error("No se encontró ningún beneficiario");
        }
        console.log('Beneficiario obtenido con éxito');
        return results[0];
    } catch (err) {
        console.error('Error al obtener el beneficiario', err);
        throw err;
    }
};

/**
 * Actualiza los detalles de un beneficiario.
 * 
 * @param {Object} beneficiarioDetalle - El objeto con los detalles actualizados del beneficiario.
 * @param {number} beneficiarioDetalle.idBeneficiario - El ID del beneficiario.
 * @param {string} beneficiarioDetalle.nombre - El nuevo nombre del beneficiario.
 * @param {string} beneficiarioDetalle.primerApellido - El nuevo primer apellido del beneficiario.
 * @param {string} beneficiarioDetalle.segundoApellido - El nuevo segundo apellido del beneficiario.
 * @param {string} beneficiarioDetalle.documento - El nuevo documento del beneficiario.
 * @param {number} beneficiarioDetalle.idSuscriptor - El nuevo ID del suscriptor al que pertenece el beneficiario.
 * @returns {Promise<Object>} - Una promesa que se resuelve con el beneficiario actualizado.
 */
const actualizar = async (beneficiarioDetalle) => {
    try {
        await queryAsync('UPDATE beneficiarios SET nombre = ?, primerApellido = ?, segundoApellido = ?, documento = ?, idSuscriptor = ? WHERE idBeneficiario = ?', [
            beneficiarioDetalle.nombre,
            beneficiarioDetalle.primerApellido,
            beneficiarioDetalle.segundoApellido,
            beneficiarioDetalle.documento,
            beneficiarioDetalle.idSuscriptor,
            beneficiarioDetalle.idBeneficiario
        ]);
        const results = await queryAsync('SELECT * FROM beneficiarios WHERE idBeneficiario = ?', [beneficiarioDetalle.idBeneficiario]);
        console.log('Beneficiario actualizado con éxito');
        return results[0];
    } catch (err) {
        console.error('Error al actualizar el beneficiario', err);
        throw err;
    }
};

/**
 * Elimina un beneficiario por su ID.
 * 
 * @param {number} id - El ID del beneficiario a eliminar.
 * @returns {Promise<Object|null>} - Una promesa que se resuelve con los resultados de la eliminación o null si no se encuentra el beneficiario.
 */
const eliminar = async (id) => {
    try {
        const results = await queryAsync('DELETE FROM beneficiarios WHERE idBeneficiario = ?', [id]);
        if (results.affectedRows === 0) {
            console.error('No se encontró ningún beneficiario');
            return null;
        }
        console.log('Beneficiario eliminado con éxito');
        return results;
    } catch (err) {
        console.error("Error al borrar el beneficiario", err);
        throw err;
    }
};

/**
 * Cuenta el número de beneficiarios asociados a un suscriptor.
 * 
 * @param {number} idSuscriptor - El ID del suscriptor.
 * @returns {Promise<number>} - Una promesa que se resuelve con el número de beneficiarios.
 */
const contarRegistros = async (idSuscriptor) => {
    try {
        const results = await queryAsync('SELECT COUNT(*) as count FROM beneficiarios WHERE idSuscriptor = ?', [idSuscriptor]);
        return results[0].count;
    } catch (err) {
        console.error('Error al contar los registros', err);
        throw err;
    }
};

export default { crear, leer, buscarSuscriptor, detalle, actualizar, buscarDocumento, eliminar, contarRegistros };