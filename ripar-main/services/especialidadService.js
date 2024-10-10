import especialidadRepository from "../db/repository/especialidadRepository.js";
import crypto from "crypto"

/**
 * Crea una nueva especialidad.
 * @param {Object} especialidad - Datos de la especialidad.
 * @param {string} especialidad.nombre - Nombre de la especialidad.
 * @returns {Promise<Object>} La especialidad creada.
 * @throws {Error} Si faltan datos o la especialidad ya existe.
 */
const crearEspecialidad = async (especialidad) => {
    if (!especialidad.nombre) {
        throw new Error("Faltan datos");
    }
    especialidad.nombre = especialidad.nombre.charAt(0).toUpperCase() + especialidad.nombre.slice(1);
    const especialidadExistente = await especialidadRepository.buscarPorNombre(especialidad.nombre);
    if(especialidadExistente) {
        throw new Error("La Especialidad ya existe");
    }
    especialidad.idEspecialidad = crypto.randomUUID();

    especialidadRepository.crear(especialidad);
    return especialidad;
};

/**
 * Lee todas las especialidades.
 * 
 * @async
 * @function leerEspecialidad
 * @returns {Promise<Array>} Lista de convenios con detalles de especialidad e institución.
 * @throws {Error} Si ocurre un error al leer los convenios.
 */
const leerEspecialidad = async () => {
    try {
        const array = await especialidadRepository.leer();
        return array;
    } catch (err) {
        throw new Error("No es posible leer las especialidades");
    }
};

/**
 * Obtiene el detalle de una especialidad por su ID.
 * 
 * @async
 * @function detalleEspecialidad
 * @param {string} id - ID de la especialidad.
 * @returns {Promise<Object>} Detalles de la especialidad.
 * @throws {Error} Si ocurre un error al obtener el convenio.
 */
const detalleEspecialidad = async (id) => {
    try {
        const especialidad = await especialidadRepository.detalle(id);
        return especialidad
    } catch (err) {
        throw new Error("Error al obtener los detalles de la especialidad");
    }
};

/**
 * Actualiza una especialidad por su ID.
 * 
 * @async
 * @function actualizarEspecialidad
 * @param {number} id - ID de la especialidad a actualizar.
 * @param {Object} convenio - Datos actualizados de la especialidad.
 * @returns {Promise<Object>} La especialidad actualizada.
 * @throws {Error} Si falta información requerida o si ocurre un error en el proceso de actualización.
 */
const actualizarEspecialidad = async (id, especialidad) => {
    if(!especialidad.nombre){
        throw new Error("Faltan datos");
    }
    try {
        const especialidadDetalle = await especialidadRepository.detalle(id);
        especialidadDetalle.nombre = especialidad.nombre;
        const especialidadActualizada = await especialidadRepository.actualizar(especialidadDetalle);
        return especialidadActualizada;
    } catch (err) {
        throw new Error("Error al actualizar la especialidad");
    }
};

/**
 * Elimina una especialidad por su ID.
 * 
 * @async
 * @function eliminarConvenio
 * @param {number} id - ID de la especialidad a actualizar.
 * @returns {Promise<void>} - Una promesa que se resuelve cuando la especialidad ha sido eliminada.
 * @throws {Error} Si ocurre un error en el proceso de eliminación.
 */
const eliminarEspecialidad = async (id) => {
    try {
        const resultado = await especialidadRepository.eliminar(id);
        if (resultado.affectedRows === 0) {
            throw new Error("Convenio no encontrado o ya eliminado.");
        }
        console.log("Especialidad eliminado con éxito.");
    } catch (err) {
        console.error("Error al eliminar la especialidad:", err);
        throw err;
    }
};

export default {crearEspecialidad, leerEspecialidad, detalleEspecialidad, actualizarEspecialidad, eliminarEspecialidad}

