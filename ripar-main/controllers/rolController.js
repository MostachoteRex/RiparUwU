import respuestasHttp from "../utils/respuestasHttp.js"
import rolService from "../services/rolService.js"
import { RolCrearRequestModel, RolDatosRestModel, RolActualizarReqModel } from "../models/rolModel.js"

/**
 * Crea un nuevo rol.
 * 
 * @async
 * @function postRol
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con los datos del rol creado.
 */
const postRol = async (req, res) => {
  try {
      const rol = await rolService.crearRol(new RolCrearRequestModel(req.body), req.user);
      respuestasHttp.exito(req, res, new RolDatosRestModel(rol), 201);
  } catch (err) {
      respuestasHttp.error(req, res, err, "Error al crear el rol", 400);
      console.log(err);
  }
};

/**
* Lee todos los roles.
* 
* @async
* @function getRol
* @param {Object} req - Objeto de la solicitud HTTP.
* @param {Object} res - Objeto de la respuesta HTTP.
* @returns {Promise<void>} Devuelve una respuesta HTTP con la lista de roles.
*/
const getRol = async (req, res) => {
  try {
      const array = await rolService.leerRol();
      const losRoles = array.map(rol => new RolDatosRestModel(rol));
      respuestasHttp.exito(req, res, losRoles, 200);
  } catch (err) {
      respuestasHttp.error(req, res, err, "Error al leer los roles", 400);
      console.log(err);
  }
};

/**
* Lee el detalle de un rol específico.
* 
* @async
* @function getDetalle
* @param {Object} req - Objeto de la solicitud HTTP.
* @param {Object} res - Objeto de la respuesta HTTP.
* @returns {Promise<void>} Devuelve una respuesta HTTP con los datos del rol.
*/
const getDetalle = async (req, res) => {
  try {
      const rol = await rolService.detalleRol(req.params.id);
      respuestasHttp.exito(req, res, new RolDatosRestModel(rol), 200);
  } catch (err) {
      respuestasHttp.error(req, res, err, "Error al leer el rol", 500);
  }
};

/**
* Actualiza un rol específico.
* 
* @async
* @function putRol
* @param {Object} req - Objeto de la solicitud HTTP.
* @param {Object} res - Objeto de la respuesta HTTP.
* @returns {Promise<void>} Devuelve una respuesta HTTP con los datos del rol actualizado.
*/
const putRol = async (req, res) => {
  try {
      const rol = await rolService.actualizarRol(req.params.id, new RolActualizarReqModel(req.body));
      respuestasHttp.exito(req, res, new RolDatosRestModel(rol), 200);
  } catch (err) {
      respuestasHttp.error(req, res, err, "Error al actualizar el rol", 400);
      console.log(err);
  }
};

/**
* Elimina un rol específico.
* 
* @async
* @function deleteRol
* @param {Object} req - Objeto de la solicitud HTTP.
* @param {Object} res - Objeto de la respuesta HTTP.
* @returns {Promise<void>} Devuelve una respuesta HTTP confirmando la eliminación del rol.
*/
const deleteRol = async (req, res) => {
  try {
      await rolService.eliminarRol(req.params.id);
      respuestasHttp.exito(req, res, "Rol eliminado con éxito", 200);
  } catch (err) {
      respuestasHttp.error(req, res, err, "Error al eliminar el rol", 400);
  }
};
  
export default { postRol, getRol, getDetalle, putRol, deleteRol }