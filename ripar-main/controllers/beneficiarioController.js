import respuestasHttp from "../utils/respuestasHttp.js"
import beneficiarioService from "../services/beneficiarioService.js"
import { BeneficiarioCrearRequestModel, BeneficiarioDatosRestModel, BeneficiarioActualizarReqModel, BeneficiarioEntity } from "../models/beneficiarioModel.js"

/**
 * Crea un nuevo beneficiario.
 * 
 * @async
 * @function postBeneficiario
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 */
const postBeneficiario = async (req, res) => {
    try {
        const beneficiario = await beneficiarioService.crearBeneficiario(new BeneficiarioCrearRequestModel(req.body), req.user);
        respuestasHttp.exito(req, res, new BeneficiarioDatosRestModel(beneficiario), 201);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al crear el beneficiario", 400);
    }
};

/**
 * Lee todos los beneficiarios.
 * 
 * @async
 * @function getBeneficiario
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 */
const getBeneficiario = async (req, res) => {
    try {
        const array = await beneficiarioService.leerBeneficiario();
        const losBeneficiarios = array.map(beneficiario => new BeneficiarioDatosRestModel(beneficiario));
        respuestasHttp.exito(req, res, losBeneficiarios, 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al leer los beneficiarios", 400);
    }
};

/**
 * Lee beneficiarios asociados a un suscriptor específico.
 * 
 * @async
 * @function getPorSuscriptor
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 */
const getPorSuscriptor = async (req, res) => {
    try {
        const array = await beneficiarioService.buscarSuscriptor(req.params.id);
        const losBeneficiarios = array.map(beneficiario => new BeneficiarioEntity(beneficiario));
        respuestasHttp.exito(req, res, losBeneficiarios, 201);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al leer los beneficiarios", 400);
    }
};

/**
 * Lee el detalle de un beneficiario específico.
 * 
 * @async
 * @function getDetalle
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 */
const getDetalle = async (req, res) => {
    try {
        const beneficiario = await beneficiarioService.detalleBeneficiario(req.params.id);
        respuestasHttp.exito(req, res, new BeneficiarioDatosRestModel(beneficiario), 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al leer el beneficiario", 400);
    }
};

/**
 * Actualiza un beneficiario específico.
 * 
 * @async
 * @function putBeneficiario
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 */
const putBeneficiario = async (req, res) => {
    try {
        const beneficiario = await beneficiarioService.actualizarBeneficiario(req.params.id, new BeneficiarioActualizarReqModel(req.body));
        respuestasHttp.exito(req, res, new BeneficiarioDatosRestModel(beneficiario), 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al actualizar el beneficiario", 500);
    }
};

/**
 * Elimina un beneficiario específico.
 * 
 * @async
 * @function deleteBeneficiario
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta.
 */
const deleteBeneficiario = async (req, res) => {
    try {
        await beneficiarioService.eliminarBeneficiario(req.params.id);
        respuestasHttp.exito(req, res, "Beneficiario eliminado con éxito", 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al eliminar el beneficiario", 400);
    }
};

export default { postBeneficiario, getBeneficiario, getPorSuscriptor, getDetalle, putBeneficiario, deleteBeneficiario };