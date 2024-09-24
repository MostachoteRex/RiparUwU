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
 * Crea un nuevo suscriptor en la base de datos.
 * 
 * @async
 * @function crear
 * @param {Object} suscriptor - Los datos del suscriptor a crear.
 * @returns {Promise<void>} Promesa que se resuelve si la creación es exitosa.
 * @throws {Error} Si ocurre un error al crear el suscriptor.
 */
const crear = async (suscriptor) => {
    try {
        await queryAsync('INSERT INTO suscriptores SET ?', {
            idSuscriptor: suscriptor.idSuscriptor,
            documento: suscriptor.documento,
            nombre: suscriptor.nombre,
            primerApellido: suscriptor.primerApellido,
            segundoApellido: suscriptor.segundoApellido,
            actividadEconomica: suscriptor.actividadEconomica,
            telefono: suscriptor.telefono,
            fechaNacimiento: suscriptor.fechaNacimiento,
            email: suscriptor.email,
            direccion: suscriptor.direccion,
            barrio: suscriptor.barrio,
            ciudad: suscriptor.ciudad

        });
        console.log('Suscriptor creado con éxito.');
    } catch (err) {
        console.log('Error al crear el suscriptor', err);
        throw err;
    }
};

/**
 * Lee todos los suscriptores de la base de datos.
 * 
 * @async
 * @function leer
 * @returns {Promise<Array>} Lista de suscriptores.
 * @throws {Error} Si ocurre un error al leer los suscriptores.
 */
const leer = async () => {
    try {
        const results = await queryAsync('SELECT * FROM suscriptores');
        console.log('Suscriptores obtenidos con éxito.');
        return results;
    } catch (err) {
        console.error('Error al obtener los suscriptores.', err);
        throw err;
    }
};

/**
 * Busca un suscriptor por su documento.
 * 
 * @async
 * @function buscarDocumento
 * @param {string} documento - El documento del suscriptor.
 * @returns {Promise<Object|null>} El suscriptor encontrado o null si no existe.
 * @throws {Error} Si ocurre un error durante la búsqueda.
 */
const buscarDocumento = async (documento) => {
    try {
        const results = await queryAsync('SELECT * FROM suscriptores WHERE documento = ?', [documento]);
        if (results.length === 0) {
            console.log('No se encontró ningún suscriptor.');
            return null;
        }
        console.log('Suscriptor obtenido con exito.');
    } catch (err) {
        console.error('Error al obtener el suscriptor.', err);
        throw err;
    }
};

/**
 * Busca un suscriptor por su email.
 * 
 * @async
 * @function buscarEmail
 * @param {string} email - El email del suscriptor.
 * @returns {Promise<Object|null>} El suscriptor encontrado o null si no existe.
 * @throws {Error} Si ocurre un error durante la búsqueda.
 */
const buscarEmail = async (email) => {
    try {
        const results = await queryAsync('SELECT * FROM suscriptores WHERE email = ?', [email]);
        if (results.length === 0) {
            console.log('No se encontró ningún suscriptor.');
            return null;
        }
        console.log('Suscriptor obtenido con exito.')
        return results;
    } catch (err) {
        console.error('Error al obtener el el suscriptor.', err);
        throw err;
    }
};
/**
 * Obtiene los detalles de un suscriptor por su ID.
 * 
 * @async
 * @function detalle
 * @param {string} id - El ID del suscriptor.
 * @returns {Promise<Object>} Los detalles del suscriptor.
 * @throws {Error} Si no se encuentra el suscriptor.
 */
const detalle = async (id) => {
    try {
        const results = await queryAsync('SELECT * FROM suscriptores WHERE idSuscriptor = ?', [id]);
        if (results.length === 0) {
            console.error('No se encontro ningun suscriptor.', err);
            throw null;
        }
        console.log('Suscriptor obtenido con éxito');
        return results[0];
    } catch (err) {
        console.error('Error al obtener los suscriptores', err);
        throw err;
    }
};

/**
 * Actualiza un suscriptor en la base de datos.
 * 
 * @async
 * @function actualizar
 * @param {Object} suscriptorDetalle - Los datos actualizados del suscriptor.
 * @returns {Promise<Object>} Los detalles del suscriptor actualizado.
 * @throws {Error} Si no se encuentra el suscriptor para actualizar o si ocurre un error.
 */
const actualizar = async (suscriptorDetalle) => {
    try {
        const idSuscriptor = suscriptorDetalle.idSuscriptor;

        await queryAsync('UPDATE suscriptores SET documento = ?, nombre = ?, primerApellido = ?, segundoApellido = ?, actividadEconomica = ?, telefono = ?, fechaNacimiento = ?, email = ?, direccion = ?, barrio = ?, ciudad = ? WHERE idSuscriptor = ?', [
            suscriptorDetalle.documento,
            suscriptorDetalle.nombre,
            suscriptorDetalle.primerApellido,
            suscriptorDetalle.segundoApellido,
            suscriptorDetalle.actividadEconomica,
            suscriptorDetalle.telefono,
            suscriptorDetalle.fechaNacimiento,
            suscriptorDetalle.email,
            suscriptorDetalle.direccion,
            suscriptorDetalle.barrio,
            suscriptorDetalle.ciudad,
            suscriptorDetalle.idSuscriptor,
            idSuscriptor

        ]);
        const results = await queryAsync('SELECT * FROM suscriptores WHERE idSuscriptor = ?', [suscriptorDetalle.idSuscriptor]);
        if (results.length === 0) {
            console.error('No se encontro ningun suscriptor para actualizar.', err);
        }
        return results[0];
    } catch (err) {
        console.error('Error al actualizar el suscriptor', err);
        throw err;
    }
};

/**
 * Elimina un suscriptor por su ID.
 * 
 * @async
 * @function eliminar
 * @param {string} id - El ID del suscriptor a eliminar.
 * @returns {Promise<void|null>} Promesa resuelta si se elimina correctamente o null si no se encontró el suscriptor.
 * @throws {Error} Si ocurre un error al eliminar el suscriptor.
 */
const eliminar = async (id) => {
    try {
        const results = await queryAsync('DELETE FROM suscriptores WHERE idSuscriptor = ?', [id]);
        if (results.affectedRows === 0) {
            return null;
        }
        console.log('Suscriptor eliminado con éxito');
        return results;
    } catch (err) {
        console.error("Error al borrar el suscriptor", err);
        throw err;
    }
};

export default { crear, leer, detalle, actualizar, eliminar, buscarDocumento, buscarEmail };