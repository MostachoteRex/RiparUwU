import respuestasHttp from "../utils/respuestasHttp.js"
import especialidadService from "../services/especialidadService.js";
import { EspecialidadActualizarReqModel, EspecialidadCrearRequestModel, EspecialidadDatosRestModel } from "../models/especialidadModel.js";

/**
 * Crea una nueva especialidad.
 * 
 * @async
 * @function postEspecialidad
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
const postEspecialidad = async (req, res) => {
	try {
		const especialidad = await especialidadService.crearEspecialidad(new EspecialidadCrearRequestModel(req.body), req.user);
		respuestasHttp.exito(req, res, new EspecialidadDatosRestModel(especialidad), 201);
	} catch (err) {
		respuestasHttp.error(req, res, err, "Error al crear la especialidad", 400);
	}
};

/**
 * Obtiene todos las especialidades.
 * 
 * @async
 * @function getEspecialidad
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
const getEspecialidad = async (req, res) => {
	try {
		const array = await especialidadService.leerEspecialidad();
		const lasEspecialidades = array.map(especialidad => new EspecialidadDatosRestModel(especialidad));
		respuestasHttp.exito(req, res, lasEspecialidades, 200);
	} catch (err) {
		respuestasHttp.error(req, res, err, "Error al leer las especialidades", 500);
	}
};

/**
 * Obtiene los detalles de una especialidad por su ID.
 * 
 * @async
 * @function detalleEspecialidad
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
const detalleEspecialidad = async (req, res) => {
	try {
		const especialidad = await especialidadService.detalleEspecialidad(req.params.id);
		respuestasHttp.exito(req, res, new EspecialidadDatosRestModel(especialidad), 200);
	} catch (err) {
		respuestasHttp.error(req, res, err, "Error al leer la especialidad", 500);
	}
};

/**
 * Actualiza una especialidad existente.
 * 
 * @async
 * @function putEspecialidad
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
const putEspecialidad = async (req, res) => {
	try {
		const especialidad = await especialidadService.actualizarEspecialidad(req.params.id, new EspecialidadActualizarReqModel(req.body));
		respuestasHttp.exito(req, res, new EspecialidadDatosRestModel(especialidad), 200);
	} catch (err) {
		respuestasHttp.error(req, res, err, "error al actualizar la especialidad", 400);
	}
};

/**
 * Elimina una especialidad por su ID.
 * 
 * @async
 * @function deleteEspecialidad
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Promise<void>}
 */
const deleteEspecialidad = async (req, res) => {
	try {
		await especialidadService.eliminarEspecialidad(req.params.id);
		respuestasHttp.exito(req, res, "especialidad eliminada con exito", 200);
	} catch (err) {
		respuestasHttp.error(req, res, err, "error al eliminar la especialidad", 400);
	}
};

export default { postEspecialidad, getEspecialidad, detalleEspecialidad, putEspecialidad, deleteEspecialidad };