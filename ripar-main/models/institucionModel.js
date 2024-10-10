import { EspecialidadEntity } from "./especialidadModel.js";

/**
 * Modelo para la creación de una institución.
 * @class
 */
class InstitucionCrearRequestModel {
    /**
     * Crea una instancia de InstitucionCrearRequestModel.
     * @param {Object} institucion - Datos de la institución.
     * @param {number} institucion.idEspecialidad - ID de la especialidad.
     * @param {string} institucion.nombre - Nombre de la institución.
     * @param {string} institucion.direccion - Dirección de la institución.
     */
    constructor(institucion) {
        this.idEspecialidad = institucion.idEspecialidad;
        this.nombre = institucion.nombre;
        this.direccion = institucion.direccion;
    }
}

/**
 * Modelo para los datos de una institución en respuesta a una solicitud.
 * @class
 */
class InstitucionDatosRestModel {
    /**
     * Crea una instancia de InstitucionDatosRestModel.
     * @param {Object} institucion - Datos de la institución.
     * @param {number} institucion.idInstitucion - ID de la institución.
     * @param {Object} institucion.especialidadEntity - Entidad de especialidad.
     * @param {string} institucion.nombre - Nombre de la institución.
     * @param {string} institucion.direccion - Dirección de la institución.
     * @param {string} institucion.fechaRegistro - Fecha de registro de la institución.
     */
    constructor(institucion) {
        this.idInstitucion = institucion.idInstitucion;
        this.especialidadEntity = new EspecialidadEntity(institucion.especialidadEntity);
        this.nombre = institucion.nombre;
        this.direccion = institucion.direccion;
        this.fechaRegistro = institucion.fechaRegistro;
    }
}

/**
 * Modelo para la actualización de una institución.
 * @class
 */
class InstitucionActualizarReqModel {
    /**
     * Crea una instancia de InstitucionActualizarReqModel.
     * @param {Object} institucion - Datos de la institución para actualización.
     * @param {number} institucion.idEspecialidad - ID de la especialidad.
     * @param {string} institucion.nombre - Nombre de la institución.
     * @param {string} institucion.direccion - Dirección de la institución.
     */
    constructor(institucion) {
        this.idEspecialidad = institucion.idEspecialidad;
        this.nombre = institucion.nombre;
        this.direccion = institucion.direccion;
    }
}

/**
 * Entidad que representa una institución.
 * @class
 */
class institucionEntity {
    /**
     * Crea una instancia de institucionEntity.
     * @param {Object} institucion - Datos de la institución.
     * @param {number} institucion.idInstitucion - ID de la institución.
     * @param {string} institucion.nombre - Nombre de la institución.
     * @param {string} institucion.direccion - Dirección de la institución.
     */
    constructor(institucion) {
        this.idInstitucion = institucion.idInstitucion;
        this.nombre = institucion.nombre;
        this.direccion = institucion.direccion;
    }
}

export { InstitucionCrearRequestModel, InstitucionDatosRestModel, InstitucionActualizarReqModel, institucionEntity };