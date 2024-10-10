/**
 * Modelo de solicitud para crear una especialidad.
 * @class
 */
class EspecialidadCrearRequestModel {
    /**
     * @param {Object} especialidad - Datos de la especialidad.
     * @param {string} especialidad.nombre - Nombre de la especialidad.
     */
    constructor(especialidad) {
        this.nombre = especialidad.nombre;
    }
}

/**
 * Modelo de datos de respuesta para una especialidad.
 * @class
 */
class EspecialidadDatosRestModel {
    /**
     * @param {Object} especialidad - Datos de la especialidad.
     * @param {number} especialidad.idEspecialidad - ID de la especialidad.
     * @param {string} especialidad.nombre - Nombre de la especialidad.
     * @param {string} especialidad.fechaRegistro - Fecha de registro de la especialidad.
     */
    constructor(especialidad) {
        this.idEspecialidad = especialidad.idEspecialidad;
        this.nombre = especialidad.nombre;
        this.fechaRegistro = especialidad.fechaRegistro;
    }
}

/**
 * Modelo de solicitud para actualizar una especialidad.
 * @class
 */
class EspecialidadActualizarReqModel {
    /**
     * @param {Object} especialidad - Datos de la especialidad.
     * @param {string} especialidad.nombre - Nombre de la especialidad.
     */
    constructor(especialidad) {
        this.nombre = especialidad.nombre;
    }
}

/**
 * Entidad de la especialidad.
 * @class
 */
class EspecialidadEntity {
    /**
     * @param {Object} especialidad - Datos de la especialidad.
     * @param {number} especialidad.idEspecialidad - ID de la especialidad.
     * @param {string} especialidad.nombre - Nombre de la especialidad.
     */
    constructor(especialidad) {
        this.idEspecialidad = especialidad.idEspecialidad;
        this.nombre = especialidad.nombre;
    }
}

export { EspecialidadCrearRequestModel, EspecialidadDatosRestModel, EspecialidadActualizarReqModel, EspecialidadEntity };