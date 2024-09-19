import { EspecialidadEntity } from "./especialidadModel.js";
import { institucionEntity } from "./institucionModel.js";

/**
 * Modelo para la creación de un convenio.
 * @class
 */
class ConvenioCrearRequestModel {
    /**
     * Crea una instancia de ConvenioCrearRequestModel.
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
 * Modelo para los datos de un convenio en respuesta a una solicitud.
 * @class
 */
class ConvenioDatosRestModel {
    /**
     * Crea una instancia de ConvenioDatosRestModel.
     * @param {Object} convenio - Datos del convenio.
     * @param {number} convenio.idConvenio - ID del convenio.
     * @param {Object} convenio.especialidadEntity - Entidad de especialidad.
     * @param {Object} convenio.institucionEntity - Entidad de institución.
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
        this.institucionEntity = new institucionEntity(convenio.institucionEntity);
        this.nombreDr = convenio.nombreDr;
        this.tarifaParticular = convenio.tarifaParticular;
        this.tarifaMultipreventiva = convenio.tarifaMultipreventiva;
        this.fechaRegistro = convenio.fechaRegistro;
        this.telefono = convenio.telefono;
        this.email = convenio.email;
        // Descomentado si es necesario incluir la entidad usuario
        // this.usuarioEntity = new UsuarioDatosRestModel(convenio.usuarioEntity);
    }
}

/**
 * Modelo para la actualización de un convenio.
 * @class
 */
class ConvenioActualizarReqModel {
    /**
     * Crea una instancia de ConvenioActualizarReqModel.
     * @param {Object} convenio - Datos del convenio para actualización.
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
 * Entidad que representa un convenio.
 * @class
 */
class ConvenioEntity {
    /**
     * Crea una instancia de ConvenioEntity.
     * @param {Object} convenio - Datos del convenio.
     * @param {number} convenio.idConvenio - ID del convenio.
     * @param {Object} convenio.especialidadEntity - Entidad de especialidad.
     * @param {Object} convenio.institucionEntity - Entidad de institución.
     * @param {string} convenio.nombreDr - Nombre del doctor.
     * @param {number} convenio.tarifaParticular - Tarifa particular.
     * @param {number} convenio.tarifaMultipreventiva - Tarifa multipreventiva.
     */
    constructor(convenio) {
        this.idConvenio = convenio.idConvenio;
        this.especialidadEntity = new EspecialidadEntity(convenio.especialidadEntity);
        this.institucionEntity = new institucionEntity(convenio.institucionEntity);
        this.nombreDr = convenio.nombreDr;
        this.tarifaParticular = convenio.tarifaParticular;
        this.tarifaMultipreventiva = convenio.tarifaMultipreventiva;
    }
}

export { ConvenioCrearRequestModel, ConvenioDatosRestModel, ConvenioActualizarReqModel, ConvenioEntity };