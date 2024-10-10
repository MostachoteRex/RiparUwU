import respuestasHttp from "../utils/respuestasHttp.js"
import { ContabilidadDatosResModel } from "../models/contabilidadModel.js";
import contabilidadService from "../services/contabilidadService.js";

/**
 * Maneja la solicitud para obtener registros de contabilidad.
 * @async
 * @function getContabilidad
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} - No retorna un valor explícito, pero envía una respuesta HTTP.
 * @throws {Error} - Si ocurre un error al leer los registros de contabilidad.
 */
const getContabilidad = async (req, res) => {
    try {
        const array = await contabilidadService.leerContabilidad();
        const registros = array.map(contabilidad => new ContabilidadDatosResModel(contabilidad));
        respuestasHttp.exito(req, res, registros, 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al leer el registro de Contabilidad", 500);
        console.log(err);
        
    }
};

export default { getContabilidad };