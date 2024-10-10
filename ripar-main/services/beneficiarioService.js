import beneficiarioRepository from "../db/repository/beneficiarioRepository.js"
import suscriptorRepository from "../db/repository/suscriptorRepository.js";
import crypto from "crypto"

/**
 * Crea un nuevo beneficiario en la base de datos.
 * 
 * Verifica que todos los datos necesarios estén presentes, asegura que el documento no esté registrado
 * y que el suscriptor no haya alcanzado el límite de beneficiarios.
 * 
 * @param {Object} beneficiario - Datos del beneficiario a crear.
 * @param {string} beneficiario.nombre - Nombre del beneficiario.
 * @param {string} beneficiario.primerApellido - Primer apellido del beneficiario.
 * @param {string} beneficiario.segundoApellido - Segundo apellido del beneficiario (opcional).
 * @param {string} beneficiario.documento - Documento del beneficiario.
 * @param {string} beneficiario.idSuscriptor - ID del suscriptor asociado.
 * @returns {Object} - El beneficiario creado con el ID asignado.
 * @throws {Error} - Si faltan datos, el documento ya está registrado o el suscriptor ha alcanzado el límite.
 */
const crearBeneficiario = async (beneficiario) => {
	try {
		if (!beneficiario.nombre || !beneficiario.primerApellido || !beneficiario.documento || !beneficiario.idSuscriptor) {
			throw new Error("Faltan datos");
		}
		const documentoExistente = await beneficiarioRepository.buscarDocumento(beneficiario.documento);
		if (documentoExistente !== null) {
			throw new Error("Este documento ya se encuentra registrado");
		}
		const limiteBeneficiarios = await beneficiarioRepository.contarRegistros(beneficiario.idSuscriptor);
		if (limiteBeneficiarios > 6) {
			throw new Error("El suscriptor alcanzó el límite de beneficiarios");
		}

		const suscriptor = await suscriptorRepository.detalle(beneficiario.idSuscriptor);
		beneficiario.idBeneficiario = crypto.randomUUID();
		beneficiario.suscriptorEntity = suscriptor;

		await beneficiarioRepository.crear(beneficiario);
		console.log('Beneficiario creado con éxito');
		return beneficiario;
	} catch (err) {
		console.error('Error al crear el beneficiario', err);
		throw err;
	}
};

/**
 * Obtiene todos los beneficiarios de la base de datos.
 * 
 * Para cada beneficiario, se obtiene también el detalle del suscriptor asociado.
 * 
 * @returns {Array<Object>} - Lista de beneficiarios con detalles de suscriptor.
 * @throws {Error} - Si ocurre un error al leer los beneficiarios.
 */
const leerBeneficiario = async () => {
	try {
		const array = await beneficiarioRepository.leer();
		const beneficiarios = [];

		for (const beneficiario of array) {
			const suscriptor = await suscriptorRepository.detalle(beneficiario.idSuscriptor);
			beneficiario.suscriptorEntity = suscriptor;
			beneficiarios.push(beneficiario);
		}

		console.log('Beneficiarios obtenidos con éxito');
		return beneficiarios;
	} catch (err) {
		console.error('No es posible leer los beneficiarios', err);
		throw err;
	}
};

/**
 * Obtiene el detalle de un beneficiario específico por ID.
 * 
 * También obtiene el detalle del suscriptor asociado al beneficiario.
 * 
 * @param {string} id - ID del beneficiario a obtener.
 * @returns {Object} - Detalle del beneficiario con información del suscriptor.
 * @throws {Error} - Si ocurre un error al obtener el detalle del beneficiario.
 */
const detalleBeneficiario = async (id) => {
	try {
		const beneficiario = await beneficiarioRepository.detalle(id);
		const suscriptor = await suscriptorRepository.detalle(beneficiario.idSuscriptor);
		beneficiario.suscriptorEntity = suscriptor;

		return beneficiario;
	} catch (err) {
		console.error('Error al obtener el detalle del beneficiario', err);
		throw err;
	}
};

/**
 * Busca beneficiarios asociados a un suscriptor específico por ID de suscriptor.
 * 
 * @param {string} id - ID del suscriptor para buscar beneficiarios.
 * @returns {Array<Object>} - Lista de beneficiarios asociados al suscriptor.
 * @throws {Error} - Si ocurre un error al buscar el suscriptor.
 */
const buscarSuscriptor = async (id) => {
	try {
		const beneficiario = await beneficiarioRepository.buscarSuscriptor(id);
		console.log('Suscriptor encontrado con éxito');
		return beneficiario;
	} catch (err) {
		console.error('Error al buscar el suscriptor', err);
		throw err;
	}
};

/**
 * Actualiza los datos de un beneficiario específico por ID.
 * 
 * Modifica el nombre, apellidos y documento del beneficiario, y actualiza el detalle del suscriptor asociado.
 * 
 * @param {string} id - ID del beneficiario a actualizar.
 * @param {Object} beneficiario - Nuevos datos del beneficiario.
 * @param {string} beneficiario.nombre - Nombre del beneficiario.
 * @param {string} beneficiario.primerApellido - Primer apellido del beneficiario.
 * @param {string} beneficiario.segundoApellido - Segundo apellido del beneficiario (opcional).
 * @param {string} beneficiario.documento - Documento del beneficiario.
 * @returns {Object} - El beneficiario actualizado con el detalle del suscriptor.
 * @throws {Error} - Si faltan datos o ocurre un error al actualizar el beneficiario.
 */
const actualizarBeneficiario = async (id, beneficiario) => {
	try {
		if (!beneficiario.nombre || !beneficiario.primerApellido || !beneficiario.documento) {
			throw new Error("Faltan datos");
		}

		const beneficiarioDetalle = await beneficiarioRepository.detalle(id);
		beneficiarioDetalle.nombre = beneficiario.nombre;
		beneficiarioDetalle.primerApellido = beneficiario.primerApellido;
		beneficiarioDetalle.segundoApellido = beneficiario.segundoApellido;
		beneficiarioDetalle.documento = beneficiario.documento;

		const beneficiarioData = await beneficiarioRepository.actualizar(beneficiarioDetalle);
		const suscriptor = await suscriptorRepository.detalle(beneficiarioData.idSuscriptor);
		beneficiarioData.suscriptorEntity = suscriptor;

		return beneficiarioData;
	} catch (err) {
		throw err;
	}
};

/**
 * Elimina un beneficiario específico por ID.
 * 
 * @async
 * @function eliminarBeneficiario
 * @param {number} id - ID del beneficiario a eliminar.
 * @returns {Promise<void>}
 * @throws {Error} Si ocurre un error en el proceso de eliminación.
 */
const eliminarBeneficiario = async (id) => {
	try {
		const resultado = await beneficiarioRepository.eliminar(id);
		if (resultado.affectedRows === 0) {
            throw new Error("Convenio no encontrado o ya eliminado.");
        }
        console.log("Convenio eliminado con éxito.");
    } catch (err) {
        console.error("Error al eliminar el convenio:", err);
        throw err;
    }
};

export default { crearBeneficiario, leerBeneficiario, detalleBeneficiario, actualizarBeneficiario, eliminarBeneficiario, buscarSuscriptor }