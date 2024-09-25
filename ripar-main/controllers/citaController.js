import respuestasHttp from "../utils/respuestasHttp.js";
import citaService from "../services/citaService.js";
import { CitaCrearRequestModel, CitaDatosRestModel, CitaActualizarReqModel } from "../models/citaModel.js";

/**
 * Crea una nueva cita.
 * 
 * @async
 * @function postCita
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con los datos de la cita creada.
 */
const postCita = async (req, res) => {
    try {
        const cita = await citaService.crearCita(new CitaCrearRequestModel(req.body), req.user);
        respuestasHttp.exito(req, res, new CitaDatosRestModel(cita), 201);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al crear la cita", 400);
        console.log(err);
    }
};

/**
 * Obtiene una lista de citas.
 * 
 * @async
 * @function getCita
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con el listado de citas.
 */
const getCita = async (req, res)=>{
    try {
        const citas = await citaService.leerCita();
        const lasCitas = citas.map(cita => new CitaDatosRestModel(cita));
        respuestasHttp.exito(req, res, lasCitas, 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al leer las citas", 400);
    }
};

/**
 * Obtiene el detalle de una cita específica.
 * 
 * @async
 * @function getDetalle
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con los datos de la cita.
 */
const getDetalle = async (req, res)=>{
    try {
        const cita = await citaService.detalleCita(req.params.id);
        respuestasHttp.exito(req, res, new CitaDatosRestModel(cita), 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al leer la cita", 400);
    }
};

/**
 * Actualiza una cita existente.
 * 
 * @async
 * @function putCita
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con los datos de la cita actualizada.
 */
const putCita = async (req, res)=>{
    try {
        const cita = citaService.actualizarCita(req.params.id, new CitaActualizarReqModel(req.body));
        respuestasHttp.exito(req, res, new CitaDatosRestModel(cita), 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al actualizar la cita", 500);
    }
};

/**
 * Elimina una cita.
 * 
 * @async
 * @function deleteCita
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP indicando que la cita fue eliminada.
 */
const deleteCita= async (req, res)=>{
    try {
        await citaService.eliminarCita(req.params.id);
        respuestasHttp.exito(req, res, "Cita eliminada con exito", 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "error al eliminar la cita", 400);
        console.log(err);
    }
};

// const generarExcel = async (req, res) => {
//     try {
//         const wb = await generarExcelCitasSemana();

//         wb.write('Citas_Semana_Actual.xlsx', res);
//     } catch (err) {
//         console.error('Error Generando Excel:', err);
//         res.status(500).send('Error generando Excel');
//     }
// }

export default { postCita, getCita, getDetalle, putCita, deleteCita, /*generarExcel*/ };