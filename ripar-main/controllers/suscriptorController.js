import respuestasHttp from "../utils/respuestasHttp.js"
import suscriptorService from "../services/suscriptorService.js"
import { SuscriptorCrearRequestModel, SuscriptorDatosRestModel, SuscriptorActualizarReqModel } from "../models/suscriptorModel.js"

/**
 * Controlador para crear un nuevo suscriptor.
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Si ocurre un error al crear el suscriptor.
 */
const postSuscriptor = async (req, res) => {
    try {
        const suscriptor = await suscriptorService.crearSuscriptor(new SuscriptorCrearRequestModel(req.body), req.user);
        respuestasHttp.exito(req, res, new SuscriptorDatosRestModel(suscriptor), 201);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al crear el suscriptor", 400);
    }
};

/**
 * Controlador para obtener todos los suscriptores.
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Si ocurre un error al obtener los suscriptores.
 */
const getSuscriptor = async (req, res) => {
    try {
        const array = await suscriptorService.leerSuscriptor();
        const losSuscriptores = array.map(suscriptor => new SuscriptorDatosRestModel(suscriptor));
        respuestasHttp.exito(req, res, losSuscriptores, 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al leer los suscriptores", 400);
    }
};

/**
 * Controlador para obtener los detalles de un suscriptor por su ID.
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Si ocurre un error al obtener los detalles del suscriptor.
 */
const getDetalle = async (req, res) => {
    try {
        const suscriptor = await suscriptorService.detalleSuscriptor(req.params.id);
        respuestasHttp.exito(req, res, new SuscriptorDatosRestModel(suscriptor), 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al leer el suscriptor", 400);
    }
};

/**
 * Controlador para actualizar un suscriptor.
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Si ocurre un error al actualizar el suscriptor.
 */
const putSuscriptor = async (req, res) => {
    try {
        const suscriptor = await suscriptorService.actualizarSuscriptor(req.params.id, new SuscriptorActualizarReqModel(req.body));
        respuestasHttp.exito(req, res, new SuscriptorDatosRestModel(suscriptor), 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al actualizar el suscriptor", 500);
    }
};

/**
 * Controlador para eliminar un suscriptor.
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Si ocurre un error al eliminar el suscriptor.
 */
const deleteSuscriptor = async (req, res) => {
    try {
        await suscriptorService.eliminarSuscriptor(req.params.id);
        respuestasHttp.exito(req, res, "Suscriptor eliminado con exito", 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "error al eliminar el suscriptor", 400);
    }
};

export default { postSuscriptor, getSuscriptor, getDetalle, putSuscriptor, deleteSuscriptor };