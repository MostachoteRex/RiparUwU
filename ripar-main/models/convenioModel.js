import { institucionEntity } from "./institucionModel.js"
import { EspecialidadEntity } from "./especialidadModel.js"

/**
 * Modelo para crear un nuevo convenio.
 * 
 * @class
 * @param {Object} convenio - Datos del convenio.
 * @param {number} convenio.idEspecialidad - ID de la especialidad.
 * @param {number} convenio.idInstitucion - ID de la institución.
 * @param {string} convenio.nombreDr - Nombre del doctor.
 * @param {number} convenio.tarifaParticular - Tarifa particular.
 * @param {number} convenio.tarifaMultipreventiva - Tarifa multipreventiva.
 * @param {string} convenio.telefono - Teléfono de contacto.
 * @param {string} convenio.email - Correo electrónico de contacto.
 */
class ConvenioCrearRequestModel {
    constructor(convenio) {
        this.idEspecialidad = convenio.idEspecialidad
        this.idInstitucion = convenio.idInstitucion
        this.nombreDr = convenio.nombreDr
        this.tarifaParticular = convenio.tarifaParticular
        this.tarifaMultipreventiva = convenio.tarifaMultipreventiva
        this.telefono = convenio.telefono
        this.email = convenio.email
    }
}

/**
 * Modelo para representar un convenio en la respuesta de la API.
 * 
 * @class
 * @param {Object} convenio - Datos del convenio.
 * @param {number} convenio.idConvenio - ID del convenio.
 * @param {Object} convenio.especialidadEntity - Entidad de especialidad asociada.
 * @param {Object} convenio.institucionEntity - Entidad de institución asociada.
 * @param {string} convenio.nombreDr - Nombre del doctor.
 * @param {number} convenio.tarifaParticular - Tarifa particular.
 * @param {number} convenio.tarifaMultipreventiva - Tarifa multipreventiva.
 * @param {Date} convenio.fechaRegistro - Fecha de registro del convenio.
 * @param {string} convenio.telefono - Teléfono de contacto.
 * @param {string} convenio.email - Correo electrónico de contacto.
 */
class ConvenioDatosRestModel {
    constructor(convenio) {
        this.idConvenio = convenio.idConvenio
        this.especialidadEntity = new EspecialidadEntity(convenio.especialidadEntity)
        this.institucionEntity = new institucionEntity(convenio.institucionEntity)
        this.nombreDr = convenio.nombreDr
        this.tarifaParticular = convenio.tarifaParticular
        this.tarifaMultipreventiva = convenio.tarifaMultipreventiva
        this.fechaRegistro = convenio.fechaRegistro
        this.telefono = convenio.telefono
        this.email = convenio.email
    }
}

/**
 * Modelo para actualizar un convenio existente.
 * 
 * @class
 * @param {Object} convenio - Datos del convenio a actualizar.
 * @param {number} convenio.idEspecialidad - ID de la especialidad.
 * @param {number} convenio.idInstitucion - ID de la institución.
 * @param {string} convenio.nombreDr - Nombre del doctor.
 * @param {number} convenio.tarifaParticular - Tarifa particular.
 * @param {number} convenio.tarifaMultipreventiva - Tarifa multipreventiva.
 */
class ConvenioActualizarReqModel {
    constructor(convenio) {
        this.idEspecialidad = convenio.idEspecialidad
        this.idInstitucion = convenio.idInstitucion
        this.nombreDr = convenio.nombreDr
        this.tarifaParticular = convenio.tarifaParticular
        this.tarifaMultipreventiva = convenio.tarifaMultipreventiva
    }
}

/**
 * Entidad del convenio para representar en el sistema.
 * 
 * @class
 * @param {Object} convenio - Datos del convenio.
 * @param {number} convenio.idConvenio - ID del convenio.
 * @param {Object} convenio.especialidadEntity - Entidad de especialidad asociada.
 * @param {Object} convenio.institucionEntity - Entidad de institución asociada.
 * @param {string} convenio.nombreDr - Nombre del doctor.
 * @param {number} convenio.tarifaParticular - Tarifa particular.
 * @param {number} convenio.tarifaMultipreventiva - Tarifa multipreventiva.
 */
class ConvenioEntity {
    constructor(convenio) {
        this.idConvenio = convenio.idConvenio
        this.especialidadEntity = new EspecialidadEntity(convenio.especialidadEntity)
        this.institucionEntity = new institucionEntity(convenio.institucionEntity)
        this.nombreDr = convenio.nombreDr
        this.tarifaParticular = convenio.tarifaParticular
        this.tarifaMultipreventiva = convenio.tarifaMultipreventiva
    }
}

export { ConvenioCrearRequestModel, ConvenioDatosRestModel, ConvenioActualizarReqModel, ConvenioEntity }