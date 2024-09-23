import respuestasHttp from "../utils/respuestasHttp.js";
import suscripcionService from "../services/suscripcionService.js";
import { SuscripcionCrearRequestModel, SuscripcionDatosRestModel, SuscripcionActualizarReqModel, SuscripcionDatosResModel } from "../models/suscripcionModel.js";

/**
 * Crea una nueva suscripción.
 * 
 * @async
 * @function postSuscripcion
 * @param {Object} req - Objeto de la solicitud HTTP, que contiene los datos de la suscripción en el cuerpo (`req.body`).
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con el estado de la creación de la suscripción.
 */
const postSuscripcion = async (req, res) => {
    try {
        const suscripcion = await suscripcionService.crearSuscripcion(new SuscripcionCrearRequestModel(req.body));
        return respuestasHttp.exito(req, res, "creado", 201);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al crear la suscripción", 400);
    }
};

/**
 * Obtiene una lista de suscripciones.
 * 
 * @async
 * @function getSuscripcion
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con el listado de suscripciones.
 */
const getSuscripcion = async (req, res) => {
    try {
        const array = await suscripcionService.leerSuscripcion();
        const lasSuscripciones = array.map(suscripcion => new SuscripcionDatosRestModel(suscripcion));
        respuestasHttp.exito(req, res, lasSuscripciones, 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al leer las suscripciones", 400);
    }
};

/**
 * Obtiene los detalles de una suscripción específica.
 * 
 * @async
 * @function getDetalle
 * @param {Object} req - Objeto de la solicitud HTTP, que contiene el ID de la suscripción en `req.params.id`.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con los detalles de la suscripción solicitada.
 */
const getDetalle = async (req, res) => {
    try {
        const suscripcion = await suscripcionService.detalleSuscripcion(req.params.id);
        respuestasHttp.exito(req, res, new SuscripcionDatosRestModel(suscripcion), 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al leer la suscripción", 400);
    }
};

/**
 * Obtiene una suscripción según el número de contrato.
 * 
 * @async
 * @function getPorContrato
 * @param {Object} req - Objeto de la solicitud HTTP, que contiene el número de contrato en `req.params.noContrato`.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con los detalles de la suscripción asociada al contrato.
 */
const getPorContrato = async (req, res) => {
    try {
        const suscripcion = await suscripcionService.buscarPorContrato(req.params.noContrato);
        respuestasHttp.exito(req, res, new SuscripcionDatosResModel(suscripcion), 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al leer la suscripción", 400);
        console.log(err);
    }
};

/**
 * Actualiza una suscripción específica.
 * 
 * @async
 * @function putSuscripcion
 * @param {Object} req - Objeto de la solicitud HTTP, que contiene el ID de la suscripción en `req.params.id` y los datos actualizados en el cuerpo (`req.body`).
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con el estado de la actualización.
 */
const putSuscripcion = async (req, res) => {
    try {
        const suscripcion = await suscripcionService.actualizarSuscripcion(req.params.id, new SuscripcionActualizarReqModel(req.body));
        respuestasHttp.exito(req, res, new SuscripcionDatosRestModel(suscripcion), 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al actualizar la suscripción", 500);
    }
};

/**
 * Elimina una suscripción específica.
 * 
 * @async
 * @function deleteSuscripcion
 * @param {Object} req - Objeto de la solicitud HTTP, que contiene el ID de la suscripción en `req.params.id`.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP confirmando la eliminación de la suscripción.
 */
const deleteSuscripcion = async (req, res) => {
    try {
        await suscripcionService.eliminarSuscripcion(req.params.id);
        respuestasHttp.exito(req, res, "Suscripción eliminada con éxito", 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al eliminar la suscripción", 400);
    }
};

export default { postSuscripcion, getSuscripcion, getDetalle, getPorContrato, putSuscripcion, deleteSuscripcion };