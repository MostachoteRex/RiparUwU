import { SuscriptorEntity } from "./suscriptorModel.js"
import {UsuarioDatosRestModel, UsuarioEntity} from "./usuarioModel.js"

/**
 * Modelo de solicitud para crear una suscripción.
 * @class
 * @param {Object} suscripcion - Objeto que contiene los datos de la suscripción.
 */
class SuscripcionCrearRequestModel {
    constructor(suscripcion) {
        this.noContrato = suscripcion.noContrato
        this.idAsesor = suscripcion.idAsesor
        this.idSuscriptor = suscripcion.idSuscriptor
        this.fechaSuscripcion = suscripcion.fechaSuscripcion
        this.valor = suscripcion.valor
        this.metodoPago = suscripcion.metodoPago
    }
}

/**
 * Modelo de datos REST para una suscripción.
 * @class
 * @param {Object} suscripcion - Objeto que contiene los datos de la suscripción.
 */
class SuscripcionDatosRestModel {
    constructor(suscripcion) {
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
        this.pacienteEntity = suscripcion.pacienteEntity?.map(paciente => new PacienteEntity(paciente)) || []
        this.usuarioEntity = suscripcion.usuarioEntity ? new UsuarioDatosRestModel(suscripcion.usuarioEntity) : null
    }
}

/**
 * Modelo de solicitud para actualizar una suscripción.
 * @class
 * @param {Object} suscripcion - Objeto que contiene los datos de la suscripción.
 */
class SuscripcionActualizarReqModel {
    constructor(suscripcion) {
        this.fechaSuscripcion = suscripcion.fechaSuscripcion
        this.idAsesor = suscripcion.idAsesor
        this.tipoSuscripcion = suscripcion.tipoSuscripcion
    }
}

/**
 * Entidad de una suscripción.
 * @class
 * @param {Object} suscripcion - Objeto que contiene los datos de la suscripción.
 */
class SuscripcionEntity {
    constructor(suscripcion) {
        this.idSuscripcion = suscripcion.idSuscripcion
        this.noContrato = suscripcion.noContrato
        this.fechaSuscripcion = suscripcion.fechaSuscripcion
        this.fechaVencimiento = suscripcion.fechaVencimiento
        this.suscriptorEntity = new SuscriptorEntity(suscripcion.suscriptorEntity)

    }
}

/**
 * Modelo de respuesta de datos para una suscripción.
 * @class
 * @param {Object} suscripcion - Objeto que contiene los datos de la suscripción.
 */
class SuscripcionDatosResModel {
    constructor(suscripcion) {
        this.idSuscripcion = suscripcion.idSuscripcion
        this.noContrato = suscripcion.noContrato            
        this.estado = suscripcion.estado        
        this.pacienteEntity = suscripcion.pacienteEntity.map(paciente => new PacienteEntity(paciente)) || []
        this.usuarioEntity = suscripcion.usuarioEntity ? new UsuarioDatosRestModel(suscripcion.usuarioEntity) : null
    }
}

/**
 * Entidad de un paciente.
 * @class
 * @param {Object} suscripcion - Objeto que contiene los datos del paciente.
 */
class PacienteEntity {
    constructor(suscripcion) {
        this.idBeneficiario = suscripcion.idBeneficiario
        this.nombre = suscripcion.nombre
        this.primerApellido = suscripcion.primerApellido
        this.segundoApellido = suscripcion.segundoApellido
        this.documento = suscripcion.documento
    }
}

export { SuscripcionCrearRequestModel, SuscripcionDatosRestModel, SuscripcionActualizarReqModel, SuscripcionEntity, SuscripcionDatosResModel, PacienteEntity }