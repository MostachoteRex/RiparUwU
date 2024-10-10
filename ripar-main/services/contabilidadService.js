import contabilidadRepository from "../db/repository/contabilidadRepository.js";
import suscriptorRepository from "../db/repository/suscriptorRepository.js";
import usuarioRepository from "../db/repository/usuarioRepository.js";

/**
 * Lee todos los registros de contabilidad y agrega información detallada del suscriptor y del usuario.
 * @async
 * @function leerContabilidad
 * @returns {Promise<Object[]>} - Una promesa que resuelve un arreglo de registros de contabilidad con detalles adicionales.
 * @throws {Error} - Si ocurre un error al leer los registros.
 */
const leerContabilidad = async () => {
    try {
        const array = await contabilidadRepository.leer();
        const registros =  await Promise.all(array.map(async (contabilidad) => {
            contabilidad.suscriptorEntity = await suscriptorRepository.detalle(contabilidad.suscriptor);
            contabilidad.usuarioEntity = await usuarioRepository.detalle(contabilidad.asesor);
            return contabilidad
        }));
        return registros;
    } catch (err) {
        throw new Error("No es posible leer la contabilidad", err.message);
    }
};

export default { leerContabilidad };