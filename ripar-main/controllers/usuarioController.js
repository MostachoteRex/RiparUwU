import respuestasHttp from "../utils/respuestasHttp.js"
import usuarioService from "../services/usuarioService.js"
import { PasswordActualizarReqModel, UsuarioActualizarReqModel, UsuarioCrearRequestModel, UsuarioDatosRestModel } from "../models/usuarioModel.js"

/**
 * Crea un nuevo usuario en el sistema.
 * 
 * @async
 * @function postUsuario
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>} - Devuelve una respuesta HTTP con el estado de la creación del usuario.
 */
const postUsuario = async (req, res) => {
    try {
        const usuario = await usuarioService.crearUsuario(new UsuarioCrearRequestModel(req.body), req.user.sub);
        respuestasHttp.exito(req, res, new UsuarioDatosRestModel(usuario), 201);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al crear el usuario", 400);
    }
};

/**
 * Obtiene todos los usuarios del sistema.
 * 
 * @async
 * @function getUsuarios
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>} - Devuelve una respuesta HTTP con el estado de la lectura de los usuarios.
 */
const getUsuarios = async (req, res) => {
    try {
        const array = await usuarioService.leerUsuarios();
        const losUsuarios = array.map(usuario => new UsuarioDatosRestModel(usuario));
        respuestasHttp.exito(req, res, losUsuarios, 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al leer los usuarios", 400);
    }
};

/**
 * Obtiene un usuario específico basado en el ID del usuario autenticado.
 * 
 * @async
 * @function getUsuario
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>} - Devuelve una respuesta HTTP con el estado de la lectura del usuario autenticado.
 */
const getUsuario = async (req, res) => {
    try {
        const array = await usuarioService.leerUsuario(req.user.sub);
        const losUsuarios = array.map(usuario => new UsuarioDatosRestModel(usuario));
        respuestasHttp.exito(req, res, losUsuarios, 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al leer los usuarios", 400);
    }
};

/**
 * Obtiene usuarios según su rol.
 * 
 * @async
 * @function getUsuarioRol
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>} - Devuelve una respuesta HTTP con el estado de la lectura de los usuarios por rol.
 */
const getUsuarioRol = async (req, res) => {
    try {
        const array = await usuarioService.buscarPorRol(req.params.id, req.user.sub);
        const losUsuarios = array.map(usuario => new UsuarioDatosRestModel(usuario));
        respuestasHttp.exito(req, res, losUsuarios, 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al leer los usuarios por rol", 400);
    }    
};

/**
 * Obtiene los detalles de un usuario por su ID.
 * 
 * @async
 * @function getDetalleUsuario
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>} - Devuelve una respuesta HTTP con el estado de la obtención del detalle del usuario.
 */
const getDetalleUsuario = async (req, res) => {
    try {
        const usuario = await usuarioService.detalleUsuario(req.params.id, req.user.sub);
        respuestasHttp.exito(req, res, new UsuarioDatosRestModel(usuario), 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al leer el usuario", 400);
    }
};

/**
 * Actualiza un usuario existente.
 * 
 * @async
 * @function putUsuario
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>} - Devuelve una respuesta HTTP con el estado de la actualización del usuario.
 */
const putUsuario = async (req, res) => {
    try {
        const usuario = await usuarioService.actualizarUsuario(req.params.id, new UsuarioActualizarReqModel(req.body), req.user.sub);
        respuestasHttp.exito(req, res, new UsuarioDatosRestModel(usuario), 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al actualizar el usuario", 400);
    }
};

/**
 * Actualiza la contraseña de un usuario.
 * 
 * @async
 * @function putPassword
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>} - Devuelve una respuesta HTTP con el estado de la actualización de la contraseña del usuario.
 */
const putPassword = async (req, res) => {
    try {
        const usuario = await usuarioService.actualizarPassword(req.params.id, new PasswordActualizarReqModel(req.body), req.user.sub);
        respuestasHttp.exito(req, res, "Contraseña actualizada con exito", 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al actualizar la contraseña", 400);
    }
};

/**
 * Elimina un usuario por su ID.
 * 
 * @async
 * @function deleteUsuario
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>} - Devuelve una respuesta HTTP con el estado de la eliminación del usuario.
 */
const deleteUsuario = async (req, res) => {
    try {
        await usuarioService.eliminarUsuario(req.params.id, req.user.sub);
        respuestasHttp.exito(req, res, "Usuario eliminado correctamente", 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "No se pudo eliminar el usuario", 500);
    }
};

/**
 * Procesa el inicio de sesión.
 * 
 * @async
 * @function postSignin
 * @param {Object} req - La solicitud HTTP.
 * @param {Object} res - La respuesta HTTP.
 * @returns {Promise<void>} - Devuelve una respuesta HTTP con el estado de la autenticación.
 */
const postSignin = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            res.setHeader('Content-Type', 'application/json');
            respuestasHttp.signin(req, res, "", 200);
        } else {
            respuestasHttp.error(req, res, "", "Autenticación fallida", 403);
        }
    } catch (err) {
        respuestasHttp.error(req, res, "", "Autenticación fallida", 403);
    }
};

export default { postSignin, postUsuario, getUsuarios, getUsuarioRol, getDetalleUsuario, putUsuario, getUsuario, putPassword, deleteUsuario };
