import { PacienteEntity } from "./pacienteModel.js"
import { SuscripcionEntity } from "./suscripcionModel.js"
import { ConvenioEntity } from "./convenioModel.js"

function CitaCrearRequestModel(cita){
    this.idSuscripcion = cita.idSuscripcion
    this.paciente = cita.paciente
    this.idConvenio = cita.idConvenio
    this.fechaCita = cita.fechaCita
    this.horaCita = cita.horaCita
    this.idUsuario = cita.idUsuario
}

function CitaDatosRestModel(cita){
    this.idCita = cita.idCita
    this.suscripcionEntity = new SuscripcionEntity(cita.suscripcionEntity)
    this.pacienteEntity = new PacienteEntity(cita.pacienteEntity)
    this.convenioEntity = new ConvenioEntity (cita.convenioEntity)
    this.fechaCita = cita.fechaCita
    this.horaCita = cita.horaCita
    this.ahorro = cita.ahorro
}

function CitaActualizarReqModel(cita){
    this.fechaCita = cita.fechaCita
    this.horaCita = cita.horaCita
}

export { CitaCrearRequestModel, CitaDatosRestModel, CitaActualizarReqModel }