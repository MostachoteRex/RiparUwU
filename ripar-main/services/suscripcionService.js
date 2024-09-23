import suscripcionRepository from "../db/repository/suscripcionRepository.js";
import suscriptorRepository from "../db/repository/suscriptorRepository.js";
import usuarioRepository from "../db/repository/usuarioRepository.js";
import beneficiarioRepository from "../db/repository/beneficiarioRepository.js";
import crypto from "crypto";

/**
 * Crea una nueva suscripción.
 * @param {Object} suscripcion - Datos de la suscripción.
 * @returns {Promise<Object>} La institución creada.
 * @throws {Error} Si faltan datos o ya existe una institución con la misma especialidad.
 */
const crearSuscripcion = async (suscripcion) => {
    try {
        if (!suscripcion.noContrato || !suscripcion.idAsesor || !suscripcion.idSuscriptor || !suscripcion.fechaSuscripcion || !suscripcion.valor || !suscripcion.metodoPago) {
            throw new Error("Faltan datos");
        }

        const suscriptorExistente = await suscriptorRepository.detalle(suscripcion.idSuscriptor);
        if (!suscriptorExistente) {
            throw new Error("Este suscriptor ya se encuentra registrado");
        }

        const fechaVencimiento = new Date(suscripcion.fechaSuscripcion);
        fechaVencimiento.setFullYear(fechaVencimiento.getFullYear() + 1);
        const fechaSoloFecha = fechaVencimiento.toISOString().slice(0, 10);
        const suscriptor = await suscriptorRepository.detalle(suscripcion.idSuscriptor);

        suscripcion.idSuscripcion = crypto.randomUUID();
        suscripcion.fechaVencimiento = fechaSoloFecha;
        suscripcion.suscriptorEntity = suscriptor;

        await suscripcionRepository.crear(suscripcion);

        return suscripcion;

    } catch (err) {
        throw err;
    }
};

/**
 * Lee todas las suscripciones.
 * 
 * @async
 * @function leerSuscripcion
 * @returns {Promise<Array>} Lista de suscripciones con detalles de suscriptor y asesor.
 * @throws {Error} Si no es posible leer las suscripciones.
 */
const leerSuscripcion = async () => {
    try {
        const array = await suscripcionRepository.leer();
        const suscripciones = await Promise.all(array.map(async (suscripcion) => {
            suscripcion.suscriptorEntity = await suscriptorRepository.detalle(suscripcion.idSuscriptor);
            suscripcion.asesorEntity = await usuarioRepository.detalle(suscripcion.idAsesor);
            return suscripcion;
        }));
        return suscripciones;
    } catch (err) {
        throw new Error("No es posible leer las suscripciones", err.message);
    }
};

/**
 * Busca una suscripción por número de contrato.
 * 
 * @async
 * @function buscarPorContrato
 * @param {string} noContrato - Número de contrato de la suscripción.
 * @returns {Promise<Object>} La suscripción encontrada con detalles de suscriptor y paciente.
 * @throws {Error} Si ocurre un error durante la búsqueda.
 */
const buscarPorContrato = async (noContrato) => {
    try {
        const suscripcion = await suscripcionRepository.buscarPorContrato(noContrato);
        const suscriptor = await suscriptorRepository.detalle(suscripcion.idSuscriptor);
        suscriptor.idBeneficiario = suscriptor.idSuscriptor;
        const beneficiario = await beneficiarioRepository.buscarSuscriptor(suscripcion.idSuscriptor);
        const paciente = [suscriptor, ...beneficiario];
        suscripcion.suscriptorEntity = suscriptor;
        suscripcion.pacienteEntity = paciente;

        return suscripcion;
    } catch (err) {
        throw err;
    }
};

/**
 * Obtiene los detalles de una suscripción por ID.
 * 
 * @async
 * @function detalleSuscripcion
 * @param {string} id - ID de la suscripción.
 * @returns {Promise<Object>} La suscripción con detalles de suscriptor y asesor.
 * @throws {Error} Si ocurre un error durante la obtención de detalles.
 */
const detalleSuscripcion = async (id) => {
    try {
        const suscripcion = await suscripcionRepository.detalle(id);

        suscripcion.suscriptorEntity = await suscriptorRepository.detalle(suscripcion.idSuscriptor);
        suscripcion.asesorEntity = await usuarioRepository.detalle(suscripcion.idAsesor);

        return suscripcion;
    } catch (err) {
        throw err;
    }
};

/**
 * Actualiza una suscripción existente.
 * 
 * @async
 * @function actualizarSuscripcion
 * @param {string} id - ID de la suscripción a actualizar.
 * @param {Object} suscripcion - Objeto con los nuevos datos de la suscripción.
 * @param {string} suscripcion.fechaSuscripcion - Nueva fecha de suscripción.
 * @param {string} suscripcion.idAsesor - ID del nuevo asesor.
 * @param {string} suscripcion.tipoSuscripcion - Tipo de suscripción actualizada.
 * @returns {Promise<Object>} La suscripción actualizada.
 * @throws {Error} Si faltan datos o ocurre un error durante la actualización.
 */
const actualizarSuscripcion = async (id, suscripcion) => {
    try {

        if (!suscripcion.fechaSuscripcion || !suscripcion.idAsesor || !suscripcion.tipoSuscripcion) {
            throw new Error("Faltan datos");
        }

        const suscripcionDetalle = await suscripcionRepository.detalle(id);
        suscripcionDetalle.fechaSuscripcion = suscripcion.fechaSuscripcion;

        const fechaVencimiento = new Date(suscripcionDetalle.fechaSuscripcion);
        fechaVencimiento.setFullYear(fechaVencimiento.getFullYear() + 1);
        const fechaSoloFecha = fechaVencimiento.toISOString().slice(0, 10);

        suscripcionDetalle.fechaVencimiento = fechaSoloFecha;
        suscripcionDetalle.idAsesor = suscripcion.idAsesor;
        suscripcionDetalle.tipoSuscripcion = suscripcion.tipoSuscripcion;

        const suscripcionData = await suscripcionRepository.actualizar(suscripcionDetalle);
        const suscriptor = await suscriptorRepository.detalle(suscripcionData.idSuscriptor);
        suscripcionData.suscriptorEntity = suscriptor;

        return suscripcionData;
    } catch (err) {
        throw err;
    }
};

/**
 * Elimina una suscripción por ID.
 * 
 * @async
 * @function eliminarSuscripcion
 * @param {string} id - ID de la suscripción a eliminar.
 * @returns {Promise<Object>} Resultado de la eliminación.
 * @throws {Error} Si ocurre un error durante la eliminación.
 */
const eliminarSuscripcion = async (id) => {
    try {
        const resultado = await suscripcionRepository.eliminar(id);
        if (resultado.affectedRows === 0) {
            throw new Error("Convenio no encontrado o ya eliminado.");
        }
        console.log("Convenio eliminado con éxito.");
    } catch (err) {
        console.error("Error al eliminar el convenio:", err);
        throw err;
    }
};

export default { crearSuscripcion, leerSuscripcion, buscarPorContrato, detalleSuscripcion, actualizarSuscripcion, eliminarSuscripcion };