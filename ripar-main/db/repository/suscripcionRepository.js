import { db } from "../conexionDB.js";

/**
 * Función para ejecutar una consulta SQL que devuelve una promesa.
 * @param {string} query - La consulta SQL.
 * @param {Array} params - Los parámetros de la consulta.
 * @returns {Promise<Object>} - Promesa que resuelve con los resultados de la consulta.
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
 * @param {Object} suscripcion - Objeto que contiene los datos de la suscripción.
 * @returns {Promise<Object>} - Promesa que resuelve con el resultado de la creación.
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

        console.log('Registro creado con éxito');
        return results;
    } catch (err) {
        console.log('Error al crear la suscripción o el registro en contabilidad', err);
        throw err;
    }
};

const leer = async () => {
    try {
        const results = await db.queryAsync("SELECT * FROM suscripciones");
        console.log('Suscripciones obtenidas con éxito');
        return results;
    } catch (err) {
        console.error('Error al obtener las suscripciones', err);
        throw err;
    }
};

/**
 * Obtiene los detalles de una suscripción por ID.
 * @param {string} id - ID de la suscripción.
 * @returns {Promise<Object>} - Promesa que resuelve con los detalles de la suscripción.
 */
const detalle = async (id) => {
    try {
        const results = await db.queryAsync('SELECT * FROM suscripciones WHERE idSuscripcion = ?', [id])
        if (results.length === 0) {
            throw new Error("No se encontró ninguna suscripción");
        }
        console.log('Suscripción obtenida con éxito')
        return results[0]
    } catch (err) {
        console.error('Error al obtener la suscripcion', err)
        throw err
    }

}

/**
 * Busca una suscripción por ID de suscriptor.
 * @param {string} idSuscriptor - ID del suscriptor.
 * @returns {Promise<Object|null>} - Promesa que resuelve con la suscripción encontrada o null si no existe.
 */
const buscarId = async (idSuscriptor) => {
    try {
        const results = await db.queryAsync('SELECT * FROM suscripciones WHERE idSuscriptor = ?', [idSuscriptor])
        if (results.length === 0) {
            console.log('No se encontró ninguna suscripcion con este Id')
            return null
        }
        console.error('Este id ya se encuentra registrado')

        return results[0]
    } catch (err) {
        console.error('Error al obtener el ID', err)
        throw err
    }

}

/**
 * Busca una suscripción por número de contrato.
 * @param {string} noContrato - Número de contrato de la suscripción.
 * @returns {Promise<Object>} - Promesa que resuelve con la suscripción encontrada.
 */
const buscarPorContrato = async (noContrato) => {
    try {
        const results = await db.queryAsync('SELECT * FROM suscripciones WHERE noContrato = ?', [noContrato])
        if (results.length === 0) {
            console.error('No se encontró ninguna suscripcion con este contrato')
            throw new Error('No se encontró ninguna suscripcion con este contrato');
        }
        console.log('Este contrato existe');
        return results[0]
    } catch (err) {
        console.error('Error al obtener la suscripcion por el contrato', err)
        throw err
    }
}

/**
 * Busca una suscripción por número de contrato.
 * @param {string} noContrato - Número de contrato de la suscripción.
 * @returns {Promise<Object>} - Promesa que resuelve con la suscripción encontrada.
 */
const actualizar = async (suscripcionDetalle) => {
    try {
        await db.queryAsync('UPDATE suscripciones SET fechaSuscripcion = ?, fechaVencimiento = ?, tipoSuscripcion = ? WHERE idSuscripcion = ?', [
            suscripcionDetalle.fechaSuscripcion,
            suscripcionDetalle.fechaVencimiento,
            suscripcionDetalle.tipoSuscripcion,
            suscripcionDetalle.idSuscripcion
        ])
        const results = await db.queryAsync('SELECT * FROM suscripciones WHERE idSuscripcion = ?', [suscripcionDetalle.idSuscripcion])
        if (results.length === 0) {   
            throw new Error("No se encontró ninguna suscripción");
        }        
        console.log('Suscripción obtenido con éxtio')
        return results[0]
    } catch (err) {
        console.error('Error al obtener la suscripción por contrato', err)
        throw err
    }

}

/**
 * Elimina una suscripción por ID.
 * @param {string} id - ID de la suscripción a eliminar.
 * @returns {Promise<Object>} - Promesa que resuelve con el resultado de la eliminación.
 */
const eliminar = async (id) => {

    try {
        const results = await db.queryAsync('DELETE FROM suscripciones WHERE idSuscripcion = ?', [id])
        if (results.affectedRows === 0) {
            throw new Error("No se encontró ninguna suscripción");
        }
        console.log('Suscripción eliminada con éxito')
        return results
    } catch (err) {
        console.error("Error al borrar la suscripción", err)
        throw err
    }

}

export default { crear, leer, detalle, buscarId, buscarPorContrato, actualizar, eliminar }