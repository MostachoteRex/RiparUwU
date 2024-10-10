import { db } from "../conexionDB.js";

/**
 * Crea una nueva cita en la base de datos.
 *
 * @param {Object} cita - Objeto que contiene los datos de la cita.
 * @param {number} cita.idCita - ID de la cita.
 * @param {number} cita.idSuscripcion - ID de la suscripción asociada a la cita.
 * @param {number} cita.paciente - ID del paciente asociado a la cita.
 * @param {number} cita.idConvenio - ID del convenio asociado a la cita.
 * @param {string} cita.fechaCita - Fecha de la cita.
 * @param {string} cita.horaCita - Hora de la cita.
 * @param {number} cita.ahorro - Monto del ahorro.
 * @param {number} cita.idUsuario - ID del usuario que creó la cita.
 */
const crear = (cita) => {
    db.query('INSERT INTO citas SET ?', {
        idCita: cita.idCita,
        idSuscripcion: cita.idSuscripcion,
        idPaciente: cita.paciente,
        idConvenio: cita.idConvenio,
        fechaCita: cita.fechaCita,
        horaCita: cita.horaCita,
        ahorro: cita.ahorro,
        idUsuario: cita.idUsuario
    }, (err, results) => {
        if (err) {
            console.log('Error al crear la cita', err);
        } else {
            console.log('Cita creada con éxito');
        }
    });
};

/**
 * Obtiene todas las citas de la base de datos.
 *
 * @returns {Promise<Array>} - Una promesa que se resuelve con una lista de citas.
 */
const leer = () => {

    return new Promise((resolve, reject) => {

        db.query("SELECT * FROM citas", (err, results) => {
            if (err) {
                console.error('Error al obtener las citas', err);
                reject(err);
            } else {
                console.log('Citas obtenidas con éxito');
                resolve(results);
            }
        });
    });
};

/**
 * Obtiene los detalles de una cita específica por su ID.
 *
 * @param {number} id - ID de la cita a obtener.
 * @returns {Promise<Object>} - Una promesa que se resuelve con los detalles de la cita.
 */
const detalle = (id) => {

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM citas WHERE idCita = ?', [id], (err, results) => {

            if (err) {
                console.error('Error al obtener la cita', err);
                reject(err);

            } else if (results.length === 0) {
                console.error('No se encontró ninguna cita', err);
                reject(err);

            } else {
                console.log('Cita obtenida con éxito');
                resolve(results[0]);
            }
        });
    });
};

/**
 * Busca un paciente por su ID en las tablas de suscriptores y beneficiarios.
 *
 * @param {number} id - ID del paciente a buscar.
 * @returns {Promise<Object>} - Una promesa que se resuelve con los detalles del paciente.
 */
const buscarPaciente = (id) => {

    return new Promise((resolve, reject) => {

        db.query('SELECT idSuscriptor, documento, nombre, primerApellido, segundoApellido FROM suscriptores WHERE idSuscriptor = ? UNION ALL SELECT idBeneficiario, documento, nombre, primerApellido, segundoApellido FROM beneficiarios WHERE idBeneficiario = ?', [id, id], (err, results) => {

            if (err) {
                console.error('Error al obtener el paciente', err);
                reject(err);

            } else if (results.length === 0) {
                console.error('No se encontró ningún paciente', err);
                reject(err);

            } else {
                console.log('Paciente obtenido con éxito');
                resolve(results[0]);
            }
        });
    });
};

/**
 * Actualiza los detalles de una cita existente.
 *
 * @param {Object} citaDetalle - Objeto que contiene los nuevos detalles de la cita.
 * @param {number} citaDetalle.idCita - ID de la cita a actualizar.
 * @param {string} citaDetalle.fechaCita - Nueva fecha de la cita.
 * @param {string} citaDetalle.horaCita - Nueva hora de la cita.
 * @returns {Promise<Object>} - Una promesa que se resuelve con los detalles actualizados de la cita.
 */
const actualizar = (citaDetalle) => {

    return new Promise((resolve, reject) => {

        db.query('UPDATE citas SET fechaCita = ?, horaCita = ? WHERE idCita = ?', [citaDetalle.fechaCita, citaDetalle.horaCita, citaDetalle.idCita], (err, results) => {
            if (err) {
                console.error('Error al actualizar la cita', err);
                reject(err);
            } else if (results.affectedRows === 0) {
                console.error('No se encontró ninguna cita para actualizar');
                reject(new Error('No se encontró ninguna cita para actualizar'));
            } else {
                db.query('SELECT * FROM citas WHERE idCita = ?', [citaDetalle.idCita], (err, results) => {

                    if (err) {
                        console.error('Error al obtener la cita actualizada', err);
                        reject(err);
                    } else {
                        console.log('Cita actualizada con éxito');
                        resolve(results[0]);
                    }
                });
            }
        });
    });
};

/**
 * Elimina una cita de la base de datos por su ID.
 *
 * @param {number} id - ID de la cita a eliminar.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando la cita ha sido eliminada.
 */
const eliminar = (id) => {

    return new Promise((resolve, reject) => {

        db.query('DELETE FROM citas WHERE idCita = ?', [id], (err, results) => {
            if (err) {
                console.error('Error al borrar la cita', err);
                reject(err);
            } else if (results.affectedRows === 0) {
                console.error('No se encontró ninguna cita para eliminar');
                reject(new Error('No se encontró ninguna cita para eliminar'));
            } else {
                console.log('Cita eliminada con éxito');
                resolve();
            }
        });
    });
};

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
 * Obtiene las citas con sus detalles relacionados.
 * @returns {Promise<Array>} Lista de citas con detalles.
 */
const obtenerCitas = async () => {
    const query =   `SELECT 
                        suscripciones.noContrato,
                        CONCAT(suscriptores.nombre, ' ', suscriptores.primerApellido, ' ', suscriptores.segundoApellido) AS nombreSuscriptor,
                        suscriptores.documento AS documentoSuscriptor,
                        CONCAT(beneficiarios.nombre, ' ', beneficiarios.primerApellido, ' ', beneficiarios.segundoApellido) AS nombreBeneficiario,
                        beneficiarios.documento AS documentoBeneficiario,
                        convenio.nombreDr, 
                        citas.fechaCita, 
                        citas.horaCita, 
                        citas.ahorro, 
                        citas.fechaRegistro 
                    FROM 
                        citas 
                    JOIN 
                        convenio ON citas.idConvenio = convenio.idConvenio 
                    JOIN 
                        suscripciones ON citas.idSuscripcion = suscripciones.idSuscripcion 
                    JOIN 
                        suscriptores ON suscripciones.idSuscriptor = suscriptores.idSuscriptor
                    LEFT JOIN 
                        beneficiarios ON citas.idPaciente = beneficiarios.idBeneficiario -- Relación correcta para beneficiarios
                    WHERE 
                        citas.fechaRegistro >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY) 
                    AND 
                        citas.fechaRegistro < DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 7 DAY)
                    ORDER BY 
                        citas.fechaRegistro ASC; -- Ordenar por fecha de registro;`;
    const citas = await queryAsync(query);
    return citas;
};

export default { crear, leer, detalle, actualizar, buscarPaciente, eliminar, obtenerCitas };