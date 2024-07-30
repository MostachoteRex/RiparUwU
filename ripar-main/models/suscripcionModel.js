import { SuscriptorEntity } from "./suscriptorModel.js"
import {UsuarioDatosRestModel, UsuarioEntity} from "./usuarioModel.js"

function SuscripcionCrearRequestModel(suscripcion){
    this.noContrato = suscripcion.noContrato
    this.idAsesor = suscripcion.idAsesor
    this.idSuscriptor = suscripcion.idSuscriptor
    this.fechaSuscripcion = suscripcion.fechaSuscripcion
    this.valor = suscripcion.valor
    this.metodoPago = suscripcion.metodoPago
}

function SuscripcionDatosRestModel(suscripcion){
    this.idSuscripcion = suscripcion.idSuscripcion
    this.noContrato = suscripcion.noContrato
    this.fechaSuscripcion = suscripcion.fechaSuscripcion
    this.fechaVencimiento = suscripcion.fechaVencimiento    
    this.tipoSuscripcion = suscripcion.tipoSuscripcion
    this.estado = suscripcion.estado
    this.fechaRegistro = suscripcion.fechaRegistro
    this.suscriptorEntity = new SuscriptorEntity(suscripcion.suscriptorEntity)
    this.asesorEntity = new UsuarioEntity(suscripcion.asesorEntity)  
    this.valor = suscripcion.valor    
    /* this.pacienteEntity = suscripcion.pacienteEntity.map(paciente => new PacienteEntity(paciente)); */
    /* this.usuarioEntity= new UsuarioDatosRestModel(especialidad.usuarioEntity) */
}

function SuscripcionActualizarReqModel(suscripcion){
    this.fechaSuscripcion = suscripcion.fechaSuscripcion
    this.idAsesor = suscripcion.idAsesor
    this.tipoSuscripcion = suscripcion.tipoSuscripcion
}

function SuscripcionEntity(suscripcion){
    this.idSuscripcion = suscripcion.idSuscripcion
    this.noContrato = suscripcion.noContrato
    this.fechaSuscripcion = suscripcion.fechaSuscripcion
    this.fechaVencimiento = suscripcion.fechaVencimiento
    this.suscriptorEntity = new SuscriptorEntity(suscripcion.suscriptorEntity)
}

function SuscripcionDatosResModel(suscripcion){
    this.idSuscripcion = suscripcion.idSuscripcion
    this.noContrato = suscripcion.noContrato            
    this.estado = suscripcion.estado        
    this.pacienteEntity = suscripcion.pacienteEntity.map(paciente => new PacienteEntity(paciente));
    /* this.usuarioEntity= new UsuarioDatosRestModel(especialidad.usuarioEntity) */
}

function PacienteEntity(suscripcion){
    this.idBeneficiario = suscripcion.idBeneficiario
    this.nombre = suscripcion.nombre
    this.primerApellido = suscripcion.primerApellido
    this.segundoApellido = suscripcion.segundoApellido
    this.documento = suscripcion.documento
}

export { SuscripcionCrearRequestModel, SuscripcionDatosRestModel, SuscripcionActualizarReqModel, SuscripcionEntity, PacienteEntity, SuscripcionDatosResModel }