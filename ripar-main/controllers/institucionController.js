import respuestasHttp from "../utils/respuestasHttp.js"
import institucionService from "../services/institucionService.js";
import { InstitucionCrearRequestModel, InstitucionDatosRestModel, InstitucionActualizarReqModel } from "../models/institucionModel.js";

/**
 * Crea una nueva institución.
 * 
 * @async
 * @function postInstitucion
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con los datos de la institución creada.
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
 * Lee todas las instituciones.
 * 
 * @async
 * @function getInstitucion
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con la lista de instituciones.
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
 * Lee instituciones asociadas a una especialidad específica.
 * 
 * @async
 * @function getPorEspecialidad
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con la lista de instituciones de la especialidad.
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
 * Lee el detalle de una institución específica.
 * 
 * @async
 * @function getDetalle
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con los datos de la institución.
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
 * Actualiza una institución específica.
 * 
 * @async
 * @function putInstitucion
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con los datos de la institución actualizada.
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
 * Elimina una institución específica.
 * 
 * @async
 * @function deleteInstitucion
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP confirmando la eliminación de la institución.
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