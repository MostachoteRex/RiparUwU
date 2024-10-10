import { PacienteEntity } from "./pacienteModel.js";
import { SuscripcionEntity } from "./suscripcionModel.js";
import { ConvenioEntity } from "./convenioModel.js";

/**
 * Modelo de solicitud para crear una cita.
 * @class
 */
class CitaCrearRequestModel {
    /**
     * @param {Object} cita - Datos de la cita.
     * @param {number} cita.idSuscripcion - ID de la suscripción.
     * @param {number} cita.paciente - ID del paciente.
     * @param {number} cita.idConvenio - ID del convenio.
     * @param {string} cita.fechaCita - Fecha de la cita.
     * @param {string} cita.horaCita - Hora de la cita.
     * @param {number} cita.idUsuario - ID del usuario.
     */
    constructor(cita) {
        this.idSuscripcion = cita.idSuscripcion; 
        this.paciente = cita.paciente; 
        this.idConvenio = cita.idConvenio; 
        this.fechaCita = cita.fechaCita; 
        this.horaCita = cita.horaCita; 
        this.idUsuario = cita.idUsuario; 
    }
}

/**
 * Modelo de datos de respuesta para una cita.
 * @class
 */
class CitaDatosRestModel {
    /**
     * @param {Object} cita - Datos de la cita.
     * @param {number} cita.idCita - ID de la cita.
     * @param {Object} cita.suscripcionEntity - Entidad de la suscripción.
     * @param {Object} cita.pacienteEntity - Entidad del paciente.
     * @param {Object} cita.convenioEntity - Entidad del convenio.
     * @param {string} cita.fechaCita - Fecha de la cita.
     * @param {string} cita.horaCita - Hora de la cita.
     * @param {number} cita.ahorro - Ahorro asociado a la cita.
     */
    constructor(cita) {
        this.idCita = cita.idCita; 
        this.suscripcionEntity = new SuscripcionEntity(cita.suscripcionEntity); 
        this.pacienteEntity = new PacienteEntity(cita.pacienteEntity); 
        this.convenioEntity = new ConvenioEntity(cita.convenioEntity); 
        this.fechaCita = cita.fechaCita; 
        this.horaCita = cita.horaCita; 
        this.ahorro = cita.ahorro; 
    }
}

/**
 * Modelo de solicitud para actualizar una cita.
 * @class
 */
class CitaActualizarReqModel {
    /**
     * @param {Object} cita - Datos de la cita.
     * @param {string} cita.fechaCita - Nueva fecha de la cita.
     * @param {string} cita.horaCita - Nueva hora de la cita.
     */
    constructor(cita) {
        this.fechaCita = cita.fechaCita;
        this.horaCita = cita.horaCita;
    }
}

export { CitaCrearRequestModel, CitaDatosRestModel, CitaActualizarReqModel };