import usuarioRepository from "../db/repository/usuarioRepository.js"
import rolRepository from "../db/repository/rolRepository.js"
import crypto from "crypto"
import bcrypt from "bcrypt"

/**
 * Crea un nuevo usuario.
 * 
 * @async
 * @function crearUsuario
 * @param {Object} usuario - Objeto que contiene los datos del usuario.
 * @returns {Promise<Object>} El usuario creado.
 * @throws {Error} Si faltan datos o el documento o email ya están registrados.
 */
const crearUsuario = async (usuario) => {
    try {
        if (!usuario.nombre || !usuario.apellido || !usuario.documento || !usuario.email || !usuario.password || !usuario.idRol) {
            throw new Error("Faltan datos");
        }
        if (await usuarioRepository.buscarDocumento(usuario.documento) !== null) {
            throw new Error("Este documento ya se encuentra registrado");
        }
        if (await usuarioRepository.buscarEmail(usuario.email) !== null) {
            throw new Error("Este email ya se encuentra registrado");
        }
        usuario.idUsuario = crypto.randomUUID();
        usuario.passwordEncriptada = bcrypt.hashSync(usuario.password, 10);

        usuarioRepository.crear(usuario);
        usuario.rolEntity = await rolRepository.detalle(usuario.idRol);

        return (usuario);
    } catch (err) {
        throw err;
    }
};

/**
 * Busca un usuario por su documento.
 * 
 * @async
 * @function leerUsuario
 * @param {string} documento - El documento del usuario a buscar.
 * @returns {Promise<Object>} El usuario encontrado.
 * @throws {Error} Si el usuario no se encuentra.
 */
const leerUsuarios = async () => {
    try {
        const array = await usuarioRepository.leer();
        const usuarios = await Promise.all(array.map(async (usuario) => {
            const rol = await rolRepository.detalle(usuario.idRol)
            usuario.rolEntity = rol;
            return usuario;
        }));
        return usuarios;
    } catch (err) {
        throw new Error("No es posible leer los usuarios", err);
    }
};

/**
 * Busca usuarios por un rol específico.
 * 
 * @async
 * @function buscarPorRol
 * @param {string} id - El ID del rol a buscar.
 * @returns {Promise<Array<Object>>} Lista de usuarios con el rol especificado.
 * @throws {Error} Si no es posible leer los usuarios por rol.
 */
const leerUsuario = async (documento) => {
    try {
        const usuario = await usuarioRepository.buscarDocumento(documento);
        if (usuario == null) {
            throw new Error("No se encuentra el usuario");
        }
        return usuario;
    } catch (err) {
        throw err;
    }
};

/**
 * Busca usuarios por un rol específico.
 * 
 * @async
 * @function buscarPorRol
 * @param {string} id - El ID del rol a buscar.
 * @returns {Promise<Array<Object>>} Lista de usuarios con el rol especificado.
 * @throws {Error} Si no es posible leer los usuarios por rol.
 */
const buscarPorRol = async (id) => {
    try {
        const array = await usuarioRepository.buscarRol(id);
        const usuarios = await Promise.all(array.map(async (usuario) => {
            const rol = await rolRepository.detalle(usuario.idRol);
            usuario.rolEntity = rol;
            return usuario;
        }));
        return usuarios;
    } catch (err) {
        throw new Error("No es posible leer los usuarios por rol");
    }
};

/**
 * Obtiene los detalles de un usuario por su ID.
 * 
 * @async
 * @function detalleUsuario
 * @param {string} id - El ID del usuario.
 * @returns {Promise<Object>} Los detalles del usuario.
 * @throws {Error} Si ocurre un error al obtener el usuario.
 */
const detalleUsuario = async (id) => {
    try {
        const usuario = await usuarioRepository.detalle(id);
        return usuario;
    } catch (err) {
        throw err;
    }
};

/**
 * Actualiza los datos de un usuario.
 * 
 * @async
 * @function actualizarUsuario
 * @param {string} id - El ID del usuario.
 * @param {Object} usuario - Objeto con los nuevos datos del usuario.
 * @returns {Promise<Object>} Los datos actualizados del usuario.
 * @throws {Error} Si faltan datos o ya existen documento o email registrados.
 */
const actualizarUsuario = async (id, usuario) => {

    try {
        if (!usuario.nombre || !usuario.apellido || !usuario.documento || !usuario.email || !usuario.idRol) {
            throw new Error("Faltan datos");
        }
        if (await usuarioRepository.buscarDocumento(usuario.documento) !== null) {
            throw new Error("Este documento ya se encuentra registrado");
        }

        if (await usuarioRepository.buscarEmail(usuario.email) !== null) {
            throw new Error("Este email ya se encuentra registrado");
        }
        const usuarioDetalle = await usuarioRepository.detalle(id);
        usuarioDetalle.nombre = usuario.nombre;
        usuarioDetalle.apellido = usuario.apellido;
        usuarioDetalle.documento = usuario.documento;
        usuarioDetalle.email = usuario.email;
        usuarioDetalle.idRol = usuario.idRol;

        const usuarioData = await usuarioRepository.actualizar(usuarioDetalle);

        return usuarioData;
    } catch (err) {
        throw err;
    }

};

/**
 * Actualiza la contraseña de un usuario.
 * 
 * @async
 * @function actualizarPassword
 * @param {string} id - El ID del usuario.
 * @param {Object} usuario - Objeto que contiene las nuevas contraseñas.
 * @returns {Promise<Object>} Confirmación de la actualización de contraseña.
 * @throws {Error} Si faltan datos o las contraseñas no coinciden.
 */
const actualizarPassword = async (id, usuario) => {
    try {
        if (!usuario.newPassword || !usuario.confirPassword) {
            throw new Error("Faltan datos");
        }
        if (usuario.newPassword !== usuario.confirPassword) {
            throw new Error("Las contraseñas no coiciden");
        }
        const usuarioDetalle = await usuarioRepository.detalle(id);
        usuarioDetalle.passwordEncriptada = bcrypt.hashSync(usuario.newPassword, 10);
        const passwordActualizada = await usuarioRepository.actualizarPassword(usuarioDetalle);
        
        return passwordActualizada;
    } catch (err) {
        throw err;
    }
};

/**
 * Elimina un usuario por su ID.
 * 
 * @async
 * @function eliminarUsuario
 * @param {string} id - El ID del usuario a eliminar.
 * @returns {Promise<void>} Confirmación de que el usuario fue eliminado.
 * @throws {Error} Si el usuario no se encuentra o ya fue eliminado.
 */
const eliminarUsuario = async (id) => {
    try {
        const resultado = await usuarioRepository.eliminar(id);
        if (resultado.affectedRows === 0) {
            throw new Error("Usuario no encontrado o ya eliminado.");
        }
        console.log("Usuario eliminado con éxito.");
        } catch (err) {
            console.error("Error al eliminar el usuario:", err);
            throw err;
        }   
};

export default { crearUsuario, leerUsuario, leerUsuarios, buscarPorRol, detalleUsuario, actualizarUsuario, actualizarPassword, eliminarUsuario }