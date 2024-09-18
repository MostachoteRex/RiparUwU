import { PacienteEntity } from "./pacienteModel.js";
import { SuscripcionEntity } from "./suscripcionModel.js";
import { ConvenioEntity } from "./convenioModel.js";

// Clase que representa la solicitud para crear una cita
class CitaCrearRequestModel {
    constructor(cita) {
        this.idSuscripcion = cita.idSuscripcion; // ID de la suscripción
        this.paciente = cita.paciente; // Información del paciente
        this.idConvenio = cita.idConvenio; // ID del convenio
        this.fechaCita = cita.fechaCita; // Fecha de la cita
        this.horaCita = cita.horaCita; // Hora de la cita
        this.idUsuario = cita.idUsuario; // ID del usuario que crea la cita
    }
}

// Clase que representa los datos de una cita para respuestas REST
class CitaDatosRestModel {
    constructor(cita) {
        this.idCita = cita.idCita; // ID de la cita
        this.suscripcionEntity = new SuscripcionEntity(cita.suscripcionEntity); // Entidad de la suscripción
        this.pacienteEntity = new PacienteEntity(cita.pacienteEntity); // Entidad del paciente
        this.convenioEntity = new ConvenioEntity(cita.convenioEntity); // Entidad del convenio
        this.fechaCita = cita.fechaCita; // Fecha de la cita
        this.horaCita = cita.horaCita; // Hora de la cita
        this.ahorro = cita.ahorro; // Ahorro asociado a la cita
    }
}

// Clase que representa la solicitud para actualizar una cita
class CitaActualizarReqModel {
    constructor(cita) {
        this.fechaCita = cita.fechaCita; // Nueva fecha de la cita
        this.horaCita = cita.horaCita; // Nueva hora de la cita
    }
}


export { CitaCrearRequestModel, CitaDatosRestModel, CitaActualizarReqModel }