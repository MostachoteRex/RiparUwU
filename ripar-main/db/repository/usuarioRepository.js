import { db } from "../conexionDB.js"

/**
 * Ejecuta una consulta SQL de forma asíncrona.
 * 
 * @function queryAsync
 * @param {string} query - La consulta SQL a ejecutar.
 * @param {Array} params - Los parámetros de la consulta.
 * @returns {Promise<Array>} Los resultados de la consulta.
 * @throws {Error} Si ocurre un error al ejecutar la consulta.
 */
const queryAsync = (query, params) => {
	return new Promise((resolve, reject) => {
		db.query(query, params, (err, results) => {
			if (err) {
				return reject(err);
			}
			resolve(results);
		});
	});
};

/**
 * Crea un nuevo usuario en la base de datos.
 * 
 * @async
 * @function crear
 * @param {Object} usuario - Objeto que contiene los datos del usuario.
 * @returns {Promise<void>} 
 * @throws {Error} Si ocurre un error al crear el usuario.
 */
const crear = async (usuario) => {
    try {
        await queryAsync('INSERT INTO usuario SET ?', {
            idUsuario: usuario.idUsuario,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            documento: usuario.documento,
            email: usuario.email,
            passwordEncriptada: usuario.passwordEncriptada,
            idRol: usuario.idRol,
        });
        console.log('Usuario creado con éxito');
    } catch (err) {
        console.error('Error al crear el usuario', err);
        throw err; 
    }
};

/**
 * Lee todos los usuarios de la base de datos.
 * 
 * @async
 * @function leer
 * @returns {Promise<Array>} Lista de usuarios.
 * @throws {Error} Si ocurre un error al leer los usuarios.
 */
const leer = async () => {
    try {
        const results = await queryAsync('SELECT * FROM usuario');
        console.log('Usuarios obtenidos con éxito');
        return results;
    } catch (err) {
        console.error('Error al obtener los usuarios.', err);
        throw err;
    }
};

/**
 * Busca un usuario por su documento en la base de datos.
 * 
 * @async
 * @function buscarDocumento
 * @param {string} documento - El documento del usuario a buscar.
 * @returns {Promise<Object|null>} El usuario encontrado o null si no existe.
 * @throws {Error} Si ocurre un error al buscar el documento.
 */
const buscarDocumento = async (documento) => {
    try {
        const results = await queryAsync('SELECT * FROM usuario WHERE documento = ?', [documento]);
        if (results.length === 0) {
            console.log('No se encontró ningún documento');
            return null;
        }
        console.error('Este documento se encuentra registrado');
        return results[0];
    } catch (err) {
        console.error('Error al obtener el documento', err);
        throw err;
    }
};

/**
 * Busca un usuario por su email.
 * 
 * @async
 * @function buscarEmail
 * @param {string} email - El email del usuario.
 * @returns {Promise<Object|null>} El usuario encontrado o null si no existe.
 * @throws {Error} Si ocurre un error al buscar el usuario.
 */
const buscarEmail = async (email) => {
	try {
		const results = await queryAsync('SELECT * FROM usuario WHERE email = ?', [email]);
		if (results.length === 0) {
			console.log('No se encontró ningun usuario.');
			return null;
		}
		console.error('Usuario obtenido con exito.');
		return results;
	} catch (err) {
		console.error('Error al obtener el email', err);
		throw err;
	}
};

/**
 * Busca usuarios por su rol.
 * 
 * @async
 * @function buscarRol
 * @param {string} id - El ID del rol.
 * @returns {Promise<Array|null>} Los usuarios con el rol especificado o null si no existen.
 * @throws {Error} Si ocurre un error al buscar los usuarios.
 */
const buscarRol = async (id) => {
	try {
		const results = await queryAsync('SELECT * FROM usuario WHERE idRol = ?', [id]);
		if (results.length === 0) {
			console.log('No se encontró ningún usuario.');
			return null;
		}
		console.log('Usuarios obtenidos con éxito.');
		return results;
	} catch (err) {
		console.error('Error al obtener los usuarios por rol.', err);
		throw err;
	}
};

/**
 * Obtiene los detalles de un usuario por su ID.
 * 
 * @async
 * @function detalle
 * @param {string} id - El ID del usuario.
 * @returns {Promise<Object>} Los detalles del usuario.
 * @throws {Error} Si ocurre un error al buscar el usuario.
 */
const detalle = async (id) => {
	try {
		const results = await queryAsync('SELECT * FROM usuario WHERE idUsuario = ?', [id]);
		if (results.length === 0) {
			console.error('No se encontro ningun usuario.', err);
			throw null;
		}
		console.log('usuario obtenido con éxito.');
		return results[0];
	} catch (err) {
		console.error('Error al obtener el usuario.', err);
		throw err;
	}
};

/**
 * Actualiza los detalles de un usuario en la base de datos.
 * 
 * @async
 * @function actualizar
 * @param {Object} usuarioDetalle - Los datos actualizados del usuario.
 * @returns {Promise<Object>} Los detalles del usuario actualizado.
 * @throws {Error} Si ocurre un error al actualizar el usuario.
 */
const actualizar = async (usuarioDetalle) => {
	try {
		const idUsuario = usuarioDetalle.idUsuario;

		await queryAsync('UPDATE usuario SET nombre = ?, apellido = ?, documento = ?, email = ?, idRol = ? WHERE idUsuario = ?', [
			usuarioDetalle.nombre,
			usuarioDetalle.apellido,
			usuarioDetalle.documento,
			usuarioDetalle.email,
			usuarioDetalle.idRol,
			usuarioDetalle.idUsuario,
			idUsuario
		]);
		const results = await queryAsync('SELECT * FROM usuario WHERE idUsuario = ?', [usuarioDetalle.idUsuario]);
		if (results.length === 0) {
			console.error('No se econtro ningun usuario para actualizar.', err);
		}
		return results[0];
	} catch (err) {
		console.error('Error al actualizar el usuario.', err);
		throw err;
	}
};

/**
 * Actualiza la contraseña encriptada de un usuario en la base de datos.
 * 
 * @async
 * @function actualizarPassword
 * @param {Object} usuarioDetalle - Los detalles del usuario, incluyendo la nueva contraseña encriptada y el ID del usuario.
 * @returns {Promise<Object>} Los resultados de la operación.
 * @throws {Error} Si ocurre un error al actualizar la contraseña o si no se encuentra el usuario.
 */
const actualizarPassword = async (usuarioDetalle) => {
	try {
		const results = await queryAsync('UPDATE usuario SET passwordEncriptada = ? WHERE idUsuario = ?', [
			usuarioDetalle.passwordEncriptada,
			usuarioDetalle.idUsuario
		]);
		if (results.affectedRows === 0) {
			throw new Error('No se encontró ningún usuario con el ID especificado.');
		}
		console.log("Constraseña actualizada con éxito.");
		return results;
	} catch (err) {
		console.error('Error al actualizar la constraseña.', err);
		throw err;
	}
};

/**
 * Elimina un usuario por su ID.
 * 
 * @async
 * @function eliminar
 * @param {string} id - El ID del usuario a eliminar.
 * @returns {Promise<Object|null>} Los resultados de la eliminación o null si no se encontró el usuario.
 * @throws {Error} Si ocurre un error al eliminar el usuario.
 */
const eliminar = async (id) => {
	try {
		const results = await queryAsync('DELETE FROM usuario WHERE idUsuario = ?', [id]);
		if (results.affectedRows === 0) {
			return null;
		}
		console.log('Usuario eliminado con éxito');
		return results;
	} catch (err) {
		console.error('Error al eliminar el usuario', err);
		throw err;
	}
};

export default { crear, leer, buscarDocumento, buscarEmail, buscarRol, detalle, actualizar, actualizarPassword, eliminar };