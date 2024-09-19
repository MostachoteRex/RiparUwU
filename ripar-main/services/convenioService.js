import convenioRepository from "../db/repository/convenioRepository.js";
import especialidadRepository from "../db/repository/especialidadRepository.js";
import institucionRepository from "../db/repository/institucionRepository.js";
import crypto from "crypto";

/**
 * Crea un nuevo convenio.
 * 
 * @async
 * @function crearConvenio
 * @param {Object} convenio - Datos del convenio.
 * @returns {Promise<Object>} El convenio creado.
 * @throws {Error} Si faltan datos requeridos.
 */
const crearConvenio = async (convenio) => {
    if (!convenio.idEspecialidad || !convenio.idInstitucion || !convenio.nombreDr || !convenio.tarifaParticular || !convenio.tarifaMultipreventiva) {
        throw new Error("Faltan datos");
    }

    const especialidad = await especialidadRepository.detalle(convenio.idEspecialidad);
    const institucion = await institucionRepository.detalle(convenio.idInstitucion);

    convenio.idConvenio = crypto.randomUUID();
    convenio.especialidadEntity = especialidad;
    convenio.institucionEntity = institucion;

    await convenioRepository.crear(convenio);
    return convenio;
};

/**
 * Lee todos los convenios.
 * 
 * @async
 * @function leerConvenio
 * @returns {Promise<Array>} Lista de convenios con detalles de especialidad e institución.
 * @throws {Error} Si ocurre un error al leer los convenios.
 */
const leerConvenio = async () => {
    try {
        const array = await convenioRepository.leer();
        const convenios = await Promise.all(array.map(async (convenio) => {
            convenio.especialidadEntity = await especialidadRepository.detalle(convenio.idEspecialidad);
            convenio.institucionEntity = await institucionRepository.detalle(convenio.idInstitucion);
            return convenio;
        }));
        return convenios;
    } catch (error) {
        throw new Error("Error al leer los convenios");
    }
};

/**
 * Obtiene el detalle de un convenio por su ID.
 * 
 * @async
 * @function detalleConvenio
 * @param {string} id - ID del convenio.
 * @returns {Promise<Object>} El convenio con detalles de especialidad e institución.
 * @throws {Error} Si ocurre un error al obtener el convenio.
 */
const detalleConvenio = async (id) => {
    try {
        const convenio = await convenioRepository.detalle(id);
        convenio.especialidadEntity = await especialidadRepository.detalle(convenio.idEspecialidad);
        convenio.institucionEntity = await institucionRepository.detalle(convenio.idInstitucion);
        return convenio;
    } catch (error) {
        throw new Error("Error al obtener el detalle del convenio");
    }
};

/**
 * Busca convenios por ID de institución.
 * 
 * @async
 * @function buscarPorInstitucion
 * @param {string} id - ID de la institución.
 * @returns {Promise<Array>} Lista de convenios de la institución.
 * @throws {Error} Si ocurre un error durante la búsqueda.
 */
const buscarPorInstitucion = async (id) => {
    try {
        const array = await convenioRepository.buscarPorInstitucion(id);
        const convenios = await Promise.all(array.map(async (convenio) => {
            convenio.especialidadEntity = await especialidadRepository.detalle(convenio.idEspecialidad);
            convenio.institucionEntity = await institucionRepository.detalle(convenio.idInstitucion);
            return convenio;
        }));
        return convenios;
    } catch (error) {
        throw new Error("Error al buscar convenios por institución");
    }
};

/**
 * Actualiza un convenio por su ID.
 * 
 * @async
 * @function actualizarConvenio
 * @param {number} id - ID del convenio a actualizar.
 * @param {Object} convenio - Datos actualizados del convenio.
 * @returns {Promise<Object>} El convenio actualizado.
 * @throws {Error} Si falta información requerida o si ocurre un error en el proceso de actualización.
 */
const actualizarConvenio = async (id, convenio) => {
    try {
        if (!convenio.idEspecialidad || !convenio.idInstitucion || !convenio.nombreDr || !convenio.tarifaParticular || !convenio.tarifaMultipreventiva) {
            throw new Error("Faltan datos");
        }

        const convenioDetalle = await convenioRepository.detalle(id);
        if (!convenioDetalle) {
            throw new Error("Convenio no encontrado");
        }

        convenioDetalle.idEspecialidad = convenio.idEspecialidad;
        convenioDetalle.idInstitucion = convenio.idInstitucion;
        convenioDetalle.nombreDr = convenio.nombreDr;
        convenioDetalle.tarifaParticular = convenio.tarifaParticular;
        convenioDetalle.tarifaMultipreventiva = convenio.tarifaMultipreventiva;

        const convenioActualizado = await convenioRepository.actualizar(convenioDetalle);

        convenioActualizado.especialidadEntity = await especialidadRepository.detalle(convenioActualizado.idEspecialidad);
        convenioActualizado.institucionEntity = await institucionRepository.detalle(convenioActualizado.idInstitucion);

        return convenioActualizado;
    } catch (err) {
        console.error("Error al actualizar el convenio:", err);
        throw err;
    }
};

/**
 * Elimina un convenio por su ID.
 * 
 * @async
 * @function eliminarConvenio
 * @param {number} id - ID del convenio a eliminar.
 * @returns {Promise<void>}
 * @throws {Error} Si ocurre un error en el proceso de eliminación.
 */
const eliminarConvenio = async (id) => {
    try {
        const resultado = await convenioRepository.eliminar(id);
        if (resultado.affectedRows === 0) {
            throw new Error("Convenio no encontrado o ya eliminado.");
        }
        console.log("Convenio eliminado con éxito.");
    } catch (err) {
        console.error("Error al eliminar el convenio:", err);
        throw err;
    }
};

export default { crearConvenio, leerConvenio, detalleConvenio, buscarPorInstitucion, actualizarConvenio, eliminarConvenio };