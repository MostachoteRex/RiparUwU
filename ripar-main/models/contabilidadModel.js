import { SuscriptorEntity } from "./suscriptorModel.js"
import { UsuarioEntity } from "./usuarioModel.js"

/**
 * Modelo de datos para representar la contabilidad.
 * @class
 */
class ContabilidadDatosResModel {
    /**
     * Crea una instancia de ContabilidadDatosResModel.
     * @param {Object} contabilidad - Datos de contabilidad.
     * @param {string} contabilidad.noContrato - Número de contrato.
     * @param {Object} contabilidad.suscriptorEntity - Entidad del suscriptor.
     * @param {number} contabilidad.valor - Valor registrado.
     * @param {string} contabilidad.metodoPago - Método de pago.
     * @param {Object} contabilidad.usuarioEntity - Entidad del usuario.
     * @param {Date} contabilidad.fechaRegistro - Fecha de registro.
     */
    constructor(contabilidad) {
        this.noContrato = contabilidad.noContrato
        this.suscriptorEntity = new SuscriptorEntity(contabilidad.suscriptorEntity)
        this.valor = contabilidad.valor
        this.metodoPago = contabilidad.metodoPago
        this.usuarioEntity = new UsuarioEntity(contabilidad.usuarioEntity)
        this.fechaRegistro = contabilidad.fechaRegistro
    }
}

export { ContabilidadDatosResModel };