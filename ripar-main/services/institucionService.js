import especialidadRepository from "../db/repository/especialidadRepository.js";
import institucionRepository from "../db/repository/institucionRepository.js";
import usuarioRepository from "../db/repository/usuarioRepository.js";
import crypto from "crypto"

/**
 * Crea una nueva institución.
 * @param {Object} institucion - Datos de la institución.
 * @param {string} documento - Documento del usuario.
 * @returns {Promise<Object>} La institución creada.
 * @throws {Error} Si faltan datos o ya existe una institución con la misma especialidad.
 */
const crearInstitucion = async (institucion, documento) => {
	try {
		if (!institucion.nombre || !institucion.direccion || !institucion.idEspecialidad) {
			throw new Error("Faltan datos");
		}
		institucion.nombre = institucion.nombre.charAt(0).toUpperCase() + institucion.nombre.slice(1);
		institucion.direccion = institucion.direccion.charAt(0).toUpperCase() + institucion.direccion.slice(1);

		const usuario = await usuarioRepository.buscarDocumento(documento);
		const especialidad = await especialidadRepository.detalle(institucion.idEspecialidad);
		const institucionExistente = await institucionRepository.buscarPorNombre(institucion.nombre);

		if (institucionExistente !== null) {
			const existeInstitucionMismaEspecialidad = institucionExistente.some(
				(inst) => inst.idEspecialidad === especialidad.idEspecialidad
			);
			if (existeInstitucionMismaEspecialidad) {
				throw new Error("Ya existe una institución con la misma especialidad");
			}
		}
		institucion.idInstitucion = crypto.randomUUID();
		institucion.usuarioEntity = usuario;
		institucion.especialidadEntity = especialidad;

		await institucionRepository.crear(institucion);

		return institucion;
	} catch (err) {
		throw err;
	}
};

/**
 * Lee todas las instituciones y sus especialidades.
 * 
 * @async
 * @function leerInstitucion
 * @returns {Promise<Array>} Lista de instituciones con detalles de especialidad.
 * @throws {Error} Si ocurre un error al leer las instituciones.
 */
const leerInstitucion = async () => {
	try {
		const array = await institucionRepository.leer();
		const instituciones = [];

		for (const institucion of array) {
			const especialidad = await especialidadRepository.detalle(institucion.idEspecialidad);
			institucion.especialidadEntity = especialidad;
			instituciones.push(institucion);
		}

		return instituciones;
	} catch (err) {
		throw err;
	}
};

/**
 * Obtiene el detalle de una institución por su ID.
 * 
 * @async
 * @function detalleInstitucion
 * @param {string} id - ID de la institución.
 * @returns {Promise<Object>} Detalle de la institución.
 * @throws {Error} Si ocurre un error al obtener los detalles de la institución.
 */
const detalleInstitucion = async (id) => {
	try {
		const institucion = await institucionRepository.detalle(id);
		return institucion;
	} catch (err) {
		throw new Error("Error al obtener los detalles de las instituciones");
	}
};

/**
 * Busca instituciones por su especialidad.
 * 
 * @async
 * @function buscarEspecialidad
 * @param {string} id - ID de la especialidad.
 * @returns {Promise<Array>} Lista de instituciones con la especialidad buscada.
 * @throws {Error} Si ocurre un error al obtener las especialidades.
 */
const buscarEspecialidad = async (id) => {
	try {
		const array = await institucionRepository.buscarEspecialidad(id);
		const instituciones = await Promise.all(array.map(async (institucion) => {
			institucion.especialidadEntity = await especialidadRepository.detalle(institucion.idEspecialidad);
			return institucion
		}))
		return instituciones
	} catch (err) {
		throw new Error("Error al obtener las especialidades");
	}
};

/**
 * Actualiza una institución existente.
 * 
 * @async
 * @function actualizarInstitucion
 * @param {string} id - ID de la institución a actualizar.
 * @param {Object} institucion - Datos actualizados de la institución.
 * @returns {Promise<Object>} La institución actualizada.
 * @throws {Error} Si faltan datos o si ocurre un error al actualizar la institución.
 */
const actualizarInstitucion = async (id, institucion) => {
	try {
		if (!institucion.nombre || !institucion.direccion || !institucion.idEspecialidad) {
			throw new Error("Faltan datos");
		}
		const institucionDetalle = await institucionRepository.detalle(id);
		institucionDetalle.nombre = institucion.nombre.charAt(0).toUpperCase() + institucion.nombre.slice(1);
		institucionDetalle.direccion = institucion.direccion.charAt(0).toUpperCase() + institucion.direccion.slice(1);
		institucionDetalle.idEspecialidad = institucion.idEspecialidad

		const Institucion = await institucionRepository.actualizar(institucionDetalle)
		Institucion.especialidadEntity = await especialidadRepository.detalle(Institucion.idEspecialidad)
		return Institucion;
	}
	catch (err) {
		throw new Error("Error al actualizar la especialidad");
	};
};

/**
 * Elimina una institución por su ID.
 * 
 * @async
 * @function eliminarInstitucion
 * @param {string} id - ID de la institución a eliminar.
 * @returns {Promise<void>} Confirma si la institución fue eliminada.
 * @throws {Error} Si la institución no es encontrada o ya fue eliminada.
 */
const eliminarInstitucion = async (id) => {
	try {
		const resultado = await institucionRepository.eliminar(id);
		if (resultado.affectedRows === 0) {
			throw new Error("Institución no encontrada o ya eliminada.");
		}
		console.log("Institución eliminada con éxito.");
	} catch (err) {
		console.error("Error al eliminar la institución:", err);
		throw err;
	}
};

export default { crearInstitucion, leerInstitucion, detalleInstitucion, actualizarInstitucion, eliminarInstitucion, buscarEspecialidad };