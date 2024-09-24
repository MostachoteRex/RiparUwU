import suscriptorRepository from "../db/repository/suscriptorRepository.js";
import usuarioRepository from "../db/repository/usuarioRepository.js";
import crypto from "crypto"

/**
 * Crea un nuevo suscriptor.
 * 
 * @async
 * @function crearSuscriptor
 * @param {Object} suscriptor - Objeto que contiene los datos del suscriptor.
 * @param {Object} documento - Información del documento del usuario.
 * @returns {Promise<Object>} El suscriptor creado.
 * @throws {Error} Si faltan datos o el documento o email ya están registrados.
 */
const crearSuscriptor = async (suscriptor, documento) => {
	try {
		if (!suscriptor.documento || !suscriptor.nombre || !suscriptor.primerApellido || !suscriptor.segundoApellido || !suscriptor.actividadEconomica || !suscriptor.telefono || !suscriptor.fechaNacimiento || !suscriptor.email || !suscriptor.direccion || !suscriptor.barrio || !suscriptor.ciudad) {
			throw new Error("Faltan datos");
		}
		if (await suscriptorRepository.buscarDocumento(suscriptor.documento) !== null) {
			throw new Error("Este documento ya se encuentra registrado");
		}
		if (await suscriptorRepository.buscarEmail(suscriptor.email) !== null) {
			throw new Error("Este email ya se encuentra registrado");
		}
		const usuario = await usuarioRepository.buscarDocumento(documento.sub);

		suscriptor.idSuscriptor = crypto.randomUUID();
		suscriptor.usuarioEntity = usuario;

		await suscriptorRepository.crear(suscriptor);

		return suscriptor;
	} catch (err) {
		throw err;
	}
};

/**
 * Obtiene la lista de suscriptores.
 * @returns {Promise<Array>} Una promesa que resuelve con un array de suscriptores.
 * @throws {Error} Lanza un error si no es posible leer los suscriptores.
 */
const leerSuscriptor = async () => {
	try {
		const array = await suscriptorRepository.leer();
		return array;
	} catch (err) {
		throw new Error("No es posible leer los suscriptores");
	}
};

const detalleSuscriptor = async (id) => {
	try {
		return await suscriptorRepository.detalle(id)
	} catch (err) {
		throw err
	}
};

/**
 * Actualiza un suscriptor existente.
 * 
 * @async
 * @function actualizarSuscriptor
 * @param {string} id - ID del suscriptor a actualizar.
 * @param {Object} suscriptor - Objeto con los nuevos datos del suscriptor.
 * @returns {Promise<Object>} El suscriptor actualizado.
 * @throws {Error} Si faltan datos o el documento o email ya están registrados.
 */
const actualizarSuscriptor = async (id, suscriptor) => {
	try {
		if (!suscriptor.documento || !suscriptor.nombre || !suscriptor.primerApellido || !suscriptor.segundoApellido || !suscriptor.actividadEconomica || !suscriptor.telefono || !suscriptor.fechaNacimiento || !suscriptor.email || !suscriptor.direccion || !suscriptor.barrio || !suscriptor.ciudad) {
			throw new Error("Faltan datos");
		}
		if (await suscriptorRepository.buscarDocumento(suscriptor.documento) !== null) {
			throw new Error("Este documento ya se encuentra registrado");
		}
		if (await suscriptorRepository.buscarEmail(suscriptor.email) !== null) {
			throw new Error("Este email ya se encuentra registrado");
		}
		const suscriptorDetalle = await suscriptorRepository.detalle(id);
		Object.assign(suscriptorDetalle, suscriptor);

		return await suscriptorRepository.actualizar(suscriptorDetalle);
	} catch (err) {
		throw err;
	}
};

/**
 * Elimina un suscriptor por su ID.
 * 
 * @async
 * @function eliminarSuscriptor
 * @param {string} id - El ID del suscriptor que se desea eliminar.
 * @returns {Promise<Object>} Resultado de la eliminación.
 * @throws {Error} Si ocurre un error durante la eliminación.
 */
const eliminarSuscriptor = async (id) => {
	try {
		const resultado = await suscriptorRepository.eliminar(id);
		if (resultado.affectedRows === 0) {
            throw new Error("Convenio no encontrado o ya eliminado.");
        }
        console.log("Convenio eliminado con éxito.");
    } catch (err) {
        console.error("Error al eliminar el convenio:", err);
        throw err;
	}
};

export default { crearSuscriptor, leerSuscriptor, detalleSuscriptor, actualizarSuscriptor, eliminarSuscriptor };