import { InstitucionEntity } from "./institucionModel.js";
import { EspecialidadEntity } from "./especialidadModel.js";

/**
 * Modelo de solicitud para crear un convenio.
 * @class
 */
class ConvenioCrearRequestModel {
    /**
     * @param {Object} convenio - Datos del convenio.
     * @param {number} convenio.idEspecialidad - ID de la especialidad.
     * @param {number} convenio.idInstitucion - ID de la institución.
     * @param {string} convenio.nombreDr - Nombre del doctor.
     * @param {number} convenio.tarifaParticular - Tarifa particular.
     * @param {number} convenio.tarifaMultipreventiva - Tarifa multipreventiva.
     * @param {string} convenio.telefono - Teléfono de contacto.
     * @param {string} convenio.email - Correo electrónico de contacto.
     */
    constructor(convenio) {
        this.idEspecialidad = convenio.idEspecialidad;
        this.idInstitucion = convenio.idInstitucion;
        this.nombreDr = convenio.nombreDr;
        this.tarifaParticular = convenio.tarifaParticular;
        this.tarifaMultipreventiva = convenio.tarifaMultipreventiva;
        this.telefono = convenio.telefono;
        this.email = convenio.email;
    }
}

/**
 * Modelo de datos de respuesta de un convenio.
 * @class
 */
class ConvenioDatosRestModel {
    /**
     * @param {Object} convenio - Datos del convenio.
     * @param {number} convenio.idConvenio - ID del convenio.
     * @param {EspecialidadEntity} convenio.especialidadEntity - Entidad de la especialidad.
     * @param {InstitucionEntity} convenio.institucionEntity - Entidad de la institución.
     * @param {string} convenio.nombreDr - Nombre del doctor.
     * @param {number} convenio.tarifaParticular - Tarifa particular.
     * @param {number} convenio.tarifaMultipreventiva - Tarifa multipreventiva.
     * @param {string} convenio.fechaRegistro - Fecha de registro del convenio.
     * @param {string} convenio.telefono - Teléfono de contacto.
     * @param {string} convenio.email - Correo electrónico de contacto.
     */
    constructor(convenio) {
        this.idConvenio = convenio.idConvenio;
        this.especialidadEntity = new EspecialidadEntity(convenio.especialidadEntity);
        this.institucionEntity = new InstitucionEntity(convenio.institucionEntity);
        this.nombreDr = convenio.nombreDr;
        this.tarifaParticular = convenio.tarifaParticular;
        this.tarifaMultipreventiva = convenio.tarifaMultipreventiva;
        this.fechaRegistro = convenio.fechaRegistro;
        this.telefono = convenio.telefono;
        this.email = convenio.email;
    }
}

/**
 * Modelo de solicitud para actualizar un convenio.
 * @class
 */
class ConvenioActualizarReqModel {
    /**
     * @param {Object} convenio - Datos del convenio.
     * @param {number} convenio.idEspecialidad - ID de la especialidad.
     * @param {number} convenio.idInstitucion - ID de la institución.
     * @param {string} convenio.nombreDr - Nombre del doctor.
     * @param {number} convenio.tarifaParticular - Tarifa particular.
     * @param {number} convenio.tarifaMultipreventiva - Tarifa multipreventiva.
     */
    constructor(convenio) {
        this.idEspecialidad = convenio.idEspecialidad;
        this.idInstitucion = convenio.idInstitucion;
        this.nombreDr = convenio.nombreDr;
        this.tarifaParticular = convenio.tarifaParticular;
        this.tarifaMultipreventiva = convenio.tarifaMultipreventiva;
    }
}

/**
 * Entidad de convenio.
 * @class
 */
class ConvenioEntity {
    /**
     * @param {Object} convenio - Datos del convenio.
     * @param {number} convenio.idConvenio - ID del convenio.
     * @param {EspecialidadEntity} convenio.especialidadEntity - Entidad de la especialidad.
     * @param {InstitucionEntity} convenio.institucionEntity - Entidad de la institución.
     * @param {string} convenio.nombreDr - Nombre del doctor.
     * @param {number} convenio.tarifaParticular - Tarifa particular.
     * @param {number} convenio.tarifaMultipreventiva - Tarifa multipreventiva.
     */
    constructor(convenio) {
        this.idConvenio = convenio.idConvenio;
        this.especialidadEntity = new EspecialidadEntity(convenio.especialidadEntity);
        this.institucionEntity = new InstitucionEntity(convenio.institucionEntity);
        this.nombreDr = convenio.nombreDr;
        this.tarifaParticular = convenio.tarifaParticular;
        this.tarifaMultipreventiva = convenio.tarifaMultipreventiva;
    }
}

export { ConvenioCrearRequestModel, ConvenioDatosRestModel, ConvenioActualizarReqModel, ConvenioEntity };