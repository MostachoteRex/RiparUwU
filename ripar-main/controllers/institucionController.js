import respuestasHttp from "../utils/respuestasHttp.js"
import institucionService from "../services/institucionService.js";
import { InstitucionCrearRequestModel, InstitucionDatosRestModel, InstitucionActualizarReqModel } from "../models/institucionModel.js";

/**
 * Controlador para crear una nueva institución.
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Si ocurre un error al crear la institución.
 */
const postInstitucion = async (req, res) => {
	try {
		const institucion = await institucionService.crearInstitucion(new InstitucionCrearRequestModel(req.body), req.user);
		respuestasHttp.exito(req, res, new InstitucionDatosRestModel(institucion), 201);
	} catch (err) {
		respuestasHttp.error(req, res, err, "Error al crear la institucion", 400);
	}
};

/**
 * Controlador para obtener todas las instituciones.
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Si ocurre un error al leer las instituciones.
 */
const getInstitucion = async (req, res) => {
	try {
		const array = await institucionService.leerInstitucion();
		const lasInstituciones = array.map(institucion => new InstitucionDatosRestModel(institucion));
		respuestasHttp.exito(req, res, lasInstituciones, 201);
	} catch (err) {
		respuestasHttp.error(req, res, err, "Error al leer las instituciones", 400);
	}
};

/**
 * Controlador para obtener instituciones por especialidad.
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Si ocurre un error al leer las instituciones.
 */
const getPorEspecialidad = async (req, res) => {
	try {
		const array = await institucionService.buscarEspecialidad(req.params.id);
		const lasInstituciones = array.map(institucion => new InstitucionDatosRestModel(institucion));
		respuestasHttp.exito(req, res, lasInstituciones, 201);
	} catch (err) {
		respuestasHttp.error(req, res, err, "Error al leer las instituciones", 400);
	}
};

/**
 * Controlador para obtener los detalles de una institución por su ID.
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Si ocurre un error al obtener los detalles de la institución.
 */
const getDetalle = async (req, res) => {
	try {
		const institucion = await institucionService.detalleInstitucion(req.params.id);
		respuestasHttp.exito(req, res, new InstitucionDatosRestModel(institucion), 200);
	} catch (err) {
		respuestasHttp.error(req, res, err, "Error al leer la institucion", 500);
	}
};

/**
 * Controlador para actualizar una institución.
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Si ocurre un error al actualizar la institución.
 */
const putInstitucion = async (req, res) => {
	try {
		const institucion = await institucionService.actualizarInstitucion(req.params.id, new InstitucionActualizarReqModel(req.body));
		respuestasHttp.exito(req, res, new InstitucionDatosRestModel(institucion), 200);
	} catch (err) {
		respuestasHttp.error(req, res, err, "error al actualizar la institucion", 400);
	}
};

/**
 * Controlador para eliminar una institución.
 * @param {Object} req - Solicitud HTTP.
 * @param {Object} res - Respuesta HTTP.
 * @returns {Promise<void>}
 * @throws {Error} Si ocurre un error al eliminar la institución.
 */
const deleteInstitucion = async (req, res) => {
	try {
		await institucionService.eliminarInstitucion(req.params.id);
		respuestasHttp.exito(req, res, "institucion eliminada con exito", 200);
	} catch (err) {
		respuestasHttp.error(req, res, err, "error al eliminar la institucion", 400);
	}
};

export default { postInstitucion, getInstitucion, getPorEspecialidad, getDetalle, putInstitucion, deleteInstitucion };