import respuestasHttp from "../utils/respuestasHttp.js"
import beneficiarioService from "../services/beneficiarioService.js"
import { BeneficiarioCrearRequestModel, BeneficiarioDatosRestModel, BeneficiarioActualizarReqModel, BeneficiarioEntity } from "../models/beneficiarioModel.js"

/**
 * Maneja la creación de un nuevo beneficiario.
 * 
 * @param {Object} req - El objeto de solicitud, que contiene los datos del nuevo beneficiario en `req.body`.
 * @param {Object} res - El objeto de respuesta, utilizado para enviar la respuesta HTTP.
 */
const postBeneficiario = (req, res) => {
    beneficiarioService.crearBeneficiario(new BeneficiarioCrearRequestModel(req.body), req.user)
        .then(beneficiario => {
            respuestasHttp.exito(req, res, new BeneficiarioDatosRestModel(beneficiario), 201)
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al crear el beneficiario", 400)
        })
}

/**
 * Maneja la lectura de todos los beneficiarios.
 * 
 * @param {Object} req - El objeto de solicitud.
 * @param {Object} res - El objeto de respuesta, utilizado para enviar la respuesta HTTP.
 */
const getBeneficiario = (req, res) => {
    beneficiarioService.leerBeneficiario()
        .then(array => {
            let losBeneficiarios = []
            
            array.forEach(beneficiario => {
                losBeneficiarios.push(new BeneficiarioDatosRestModel(beneficiario))
            })
            respuestasHttp.exito(req, res, losBeneficiarios, 200)
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al leer los beneficiarios", 400)
        })
}

/**
 * Maneja la lectura de beneficiarios asociados a un suscriptor específico.
 * 
 * @param {Object} req - El objeto de solicitud, que debe contener el ID del suscriptor en `req.params.id`.
 * @param {Object} res - El objeto de respuesta, utilizado para enviar la respuesta HTTP.
 */
const getPorSuscriptor = (req, res) => {
    beneficiarioService.buscarSuscriptor(req.params.id)
        .then(array => {
            let losBeneficiarios = []
            array.forEach(beneficiario => {
                losBeneficiarios.push(new BeneficiarioEntity(beneficiario))
            })
            respuestasHttp.exito(req, res, losBeneficiarios, 201)
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al leer los beneficiarios", 400)
        })
}

/**
 * Maneja la lectura del detalle de un beneficiario específico.
 * 
 * @param {Object} req - El objeto de solicitud, que debe contener el ID del beneficiario en `req.params.id`.
 * @param {Object} res - El objeto de respuesta, utilizado para enviar la respuesta HTTP.
 */
const getDetalle = (req, res) => {
    beneficiarioService.detalleBeneficiario(req.params.id)
        .then(beneficiario => {
            respuestasHttp.exito(req, res, new BeneficiarioDatosRestModel(beneficiario), 200)
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al leer el beneficiario", 400)
        })
}

/**
 * Maneja la actualización de un beneficiario específico.
 * 
 * @param {Object} req - El objeto de solicitud, que debe contener el ID del beneficiario en `req.params.id` y los datos actualizados en `req.body`.
 * @param {Object} res - El objeto de respuesta, utilizado para enviar la respuesta HTTP.
 */
const putBeneficiario = (req, res) => {
    beneficiarioService.actualizarBeneficiario(req.params.id, new BeneficiarioActualizarReqModel(req.body))
        .then(beneficiario => {
            respuestasHttp.exito(req, res, new BeneficiarioDatosRestModel(beneficiario), 200)
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al actualizar el beneficiario", 500)
        })
}

/**
 * Maneja la eliminación de un beneficiario específico.
 * 
 * @param {Object} req - El objeto de solicitud, que debe contener el ID del beneficiario en `req.params.id`.
 * @param {Object} res - El objeto de respuesta, utilizado para enviar la respuesta HTTP.
 */
const deleteBeneficiario = (req, res) => {
    beneficiarioService.eliminarBeneficiario(req.params.id)
        .then(() => {
            respuestasHttp.exito(req, res, "Beneficiario eliminado con éxito", 200)
        })
        .catch(err => {
            respuestasHttp.error(req, res, err, "Error al eliminar el beneficiario", 400)
        })
}

export default { postBeneficiario, getBeneficiario, getPorSuscriptor, getDetalle, putBeneficiario, deleteBeneficiario }