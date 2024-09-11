import { SuscriptorEntity } from "./suscriptorModel.js"

/**
 * Modelo para crear un beneficiario.
 * 
 * @class
 */
class BeneficiarioCrearRequestModel {
    /**
     * Crea una instancia del modelo de creación de beneficiario.
     * 
     * @param {Object} beneficiario - El objeto con los datos del beneficiario.
     * @param {string} beneficiario.nombre - El nombre del beneficiario.
     * @param {string} beneficiario.primerApellido - El primer apellido del beneficiario.
     * @param {string} beneficiario.segundoApellido - El segundo apellido del beneficiario.
     * @param {string} beneficiario.documento - El documento del beneficiario.
     * @param {number} beneficiario.idSuscriptor - El ID del suscriptor al que pertenece el beneficiario.
     */
    constructor(beneficiario) {
        this.nombre = beneficiario.nombre;
        this.primerApellido = beneficiario.primerApellido;
        this.segundoApellido = beneficiario.segundoApellido;
        this.documento = beneficiario.documento;
        this.idSuscriptor = beneficiario.idSuscriptor;
    }
}

/**
 * Modelo para los datos de beneficiario a retornar en respuestas HTTP.
 * 
 * @class
 */
class BeneficiarioDatosRestModel {
    /**
     * Crea una instancia del modelo de datos de beneficiario para la respuesta.
     * 
     * @param {Object} beneficiario - El objeto con los datos del beneficiario.
     * @param {number} beneficiario.idBeneficiario - El ID del beneficiario.
     * @param {string} beneficiario.nombre - El nombre del beneficiario.
     * @param {string} beneficiario.primerApellido - El primer apellido del beneficiario.
     * @param {string} beneficiario.segundoApellido - El segundo apellido del beneficiario.
     * @param {string} beneficiario.documento - El documento del beneficiario.
     * @param {Object} beneficiario.suscriptorEntity - El objeto suscriptor asociado al beneficiario.
     */
    constructor(beneficiario) {
        this.idBeneficiario = beneficiario.idBeneficiario;
        this.nombre = beneficiario.nombre;
        this.primerApellido = beneficiario.primerApellido;
        this.segundoApellido = beneficiario.segundoApellido;
        this.documento = beneficiario.documento;
        this.suscriptorEntity = new SuscriptorEntity(beneficiario.suscriptorEntity);
    }
}

/**
 * Modelo para actualizar un beneficiario.
 * 
 * @class
 */

/**
 * Crea una instancia del modelo de actualización de beneficiario.
 * 
 * @param {Object} beneficiario - El objeto con los datos del beneficiario a actualizar.
 * @param {string} beneficiario.nombre - El nuevo nombre del beneficiario.
 * @param {string} beneficiario.primerApellido - El nuevo primer apellido del beneficiario.
 * @param {string} beneficiario.segundoApellido - El nuevo segundo apellido del beneficiario.
 * @param {string} beneficiario.documento - El nuevo documento del beneficiario.
 * @param {number} beneficiario.idSuscriptor - El nuevo ID del suscriptor al que pertenece el beneficiario.
 */
class BeneficiarioActualizarReqModel {
    constructor(beneficiario) {
        this.nombre = beneficiario.nombre;
        this.primerApellido = beneficiario.primerApellido;
        this.segundoApellido = beneficiario.segundoApellido;
        this.documento = beneficiario.documento;
        this.idSuscriptor = beneficiario.idSuscriptor;
    }
}

/**
 * Entidad del beneficiario para uso interno.
 * 
 * @class
 */
class BeneficiarioEntity {
    /**
     * Crea una instancia de la entidad del beneficiario.
     * 
     * @param {Object} beneficiario - El objeto con los datos del beneficiario.
     * @param {number} beneficiario.idBeneficiario - El ID del beneficiario.
     * @param {string} beneficiario.nombre - El nombre del beneficiario.
     * @param {string} beneficiario.primerApellido - El primer apellido del beneficiario.
     * @param {string} beneficiario.segundoApellido - El segundo apellido del beneficiario.
     * @param {string} beneficiario.documento - El documento del beneficiario.
     */
    constructor(beneficiario) {
        this.idBeneficiario = beneficiario.idBeneficiario;
        this.nombre = beneficiario.nombre;
        this.primerApellido = beneficiario.primerApellido;
        this.segundoApellido = beneficiario.segundoApellido;
        this.documento = beneficiario.documento;
    }
}

export { BeneficiarioCrearRequestModel, BeneficiarioDatosRestModel, BeneficiarioActualizarReqModel, BeneficiarioEntity }