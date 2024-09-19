import respuestasHttp from "../utils/respuestasHttp.js";
import convenioService from "../services/convenioService.js";
import { ConvenioActualizarReqModel, ConvenioCrearRequestModel, ConvenioDatosRestModel } from "../models/convenioModel.js";

/**
 * Crea un nuevo convenio.
 * 
 * @async
 * @function postConvenio
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
const postConvenio = async (req, res) => {
    try {
        const convenio = await convenioService.crearConvenio(new ConvenioCrearRequestModel(req.body), req.user);
        respuestasHttp.exito(req, res, new ConvenioDatosRestModel(convenio), 201);
    } catch (err) {
        respuestasHttp.error(req, res, err.message || "Error al crear el convenio", 400);
    }
};

/**
 * Obtiene todos los convenios.
 * 
 * @async
 * @function getConvenio
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
const getConvenio = async (req, res) => {
    try {
        const array = await convenioService.leerConvenio();
        const losConvenios = array.map(convenio => new ConvenioDatosRestModel(convenio));
        respuestasHttp.exito(req, res, losConvenios, 200);
    } catch (err) {
        respuestasHttp.error(req, res, err.message || "Error al leer los convenios", 400);
        console.log(err);
    }
};

/**
 * Obtiene los detalles de un convenio por su ID.
 * 
 * @async
 * @function getDetalle
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
const getDetalle = async (req, res) => {
    try {
        const convenio = await convenioService.detalleConvenio(req.params.id);
        respuestasHttp.exito(req, res, new ConvenioDatosRestModel(convenio), 200);
    } catch (err) {
        respuestasHttp.error(req, res, err.message || "Error al leer el convenio", 400);
    }
};

/**
 * Obtiene los convenios por institución.
 * 
 * @async
 * @function getPorInstitucion
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
const getPorInstitucion = async (req, res) => {
    try {
        const losConvenios = await convenioService.buscarPorInstitucion(req.params.id);
        respuestasHttp.exito(req, res, losConvenios, 200);
    } catch (err) {
        respuestasHttp.error(req, res, err.message || "Error al leer los convenios por institución", 400);
        console.log(err);
    }
};

/**
 * Actualiza un convenio existente.
 * 
 * @async
 * @function putConvenio
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
const putConvenio = async (req, res) => {
    try {
        const convenio = await convenioService.actualizarConvenio(req.params.id, new ConvenioActualizarReqModel(req.body));
        respuestasHttp.exito(req, res, new ConvenioDatosRestModel(convenio), 200);
    } catch (err) {
        respuestasHttp.error(req, res, err.message || "Error al actualizar el convenio", 500);
    }
};

/**
 * Elimina un convenio por su ID.
 * 
 * @async
 * @function deleteConvenio
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
const deleteConvenio = async (req, res) => {
    try {
        await convenioService.eliminarConvenio(req.params.id);
        respuestasHttp.exito(req, res, "Convenio eliminado con éxito", 200);
    } catch (err) {
        respuestasHttp.error(req, res, err.message || "Error al eliminar el convenio", 400);
    }
};

export default { postConvenio, getConvenio, getDetalle, getPorInstitucion, putConvenio, deleteConvenio };