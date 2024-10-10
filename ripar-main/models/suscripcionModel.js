import { SuscriptorEntity } from "./suscriptorModel.js";
import { UsuarioDatosRestModel, UsuarioEntity } from "./usuarioModel.js";

/**
 * Modelo de solicitud para crear una suscripción.
 * @class
 */
class SuscripcionCrearRequestModel {/**
    * Modelo de solicitud para crear una suscripción.
    * @param {Object} suscripcion - Objeto que contiene los datos de la suscripción.
    * @param {string} suscripcion.noContrato - Número de contrato de la suscripción.
    * @param {string} suscripcion.idAsesor - ID del asesor.
    * @param {string} suscripcion.idSuscriptor - ID del suscriptor.
    * @param {Date} suscripcion.fechaSuscripcion - Fecha de suscripción.
    * @param {number} suscripcion.valor - Valor de la suscripción.
    * @param {string} suscripcion.metodoPago - Método de pago.
    */
    constructor(suscripcion) {
        this.noContrato = suscripcion.noContrato;
        this.idAsesor = suscripcion.idAsesor;
        this.idSuscriptor = suscripcion.idSuscriptor;
        this.fechaSuscripcion = suscripcion.fechaSuscripcion;
        this.valor = suscripcion.valor;
        this.metodoPago = suscripcion.metodoPago;
    }
}

/**
 * Modelo de datos REST para una suscripción.
 * @class
 */
class SuscripcionDatosRestModel {
    /**
     * @param {Object} suscripcion - Objeto que contiene los datos de la suscripción.
     * @param {string} suscripcion.idSuscripcion - ID de la suscripción.
     * @param {string} suscripcion.noContrato - Número de contrato de la suscripción.
     * @param {Date} suscripcion.fechaSuscripcion - Fecha de suscripción.
     * @param {Date} suscripcion.fechaVencimiento - Fecha de vencimiento de la suscripción.
     * @param {string} suscripcion.tipoSuscripcion - Tipo de suscripción.
     * @param {string} suscripcion.estado - Estado de la suscripción.
     * @param {Date} suscripcion.fechaRegistro - Fecha de registro de la suscripción.
     * @param {Object} suscripcion.suscriptorEntity - Objeto que representa al suscriptor.
     * @param {Object} suscripcion.asesorEntity - Objeto que representa al asesor.
     * @param {number} suscripcion.valor - Valor de la suscripción.
     * @param {Array<Object>} [suscripcion.pacienteEntity] - Lista de pacientes asociados.
     * @param {Object} [suscripcion.usuarioEntity] - Objeto que representa al usuario asociado.
     */
    constructor(suscripcion) {
        this.idSuscripcion = suscripcion.idSuscripcion;
        this.noContrato = suscripcion.noContrato;
        this.fechaSuscripcion = suscripcion.fechaSuscripcion;
        this.fechaVencimiento = suscripcion.fechaVencimiento;
        this.tipoSuscripcion = suscripcion.tipoSuscripcion;
        this.estado = suscripcion.estado;
        this.fechaRegistro = suscripcion.fechaRegistro;
        this.suscriptorEntity = new SuscriptorEntity(suscripcion.suscriptorEntity);
        this.asesorEntity = new UsuarioEntity(suscripcion.asesorEntity);
        this.valor = suscripcion.valor;
        this.pacienteEntity = suscripcion.pacienteEntity?.map(paciente => new PacienteEntity(paciente)) || [];
        this.usuarioEntity = suscripcion.usuarioEntity ? new UsuarioDatosRestModel(suscripcion.usuarioEntity) : null;
    }
}

/**
 * Modelo de solicitud para actualizar una suscripción.
 * @class
 */
class SuscripcionActualizarReqModel {
    /**
     * @param {Object} suscripcion - Objeto que contiene los datos de la suscripción.
     * @param {Date} suscripcion.fechaSuscripcion - Nueva fecha de suscripción.
     * @param {string} suscripcion.idAsesor - Nuevo ID del asesor.
     * @param {string} suscripcion.tipoSuscripcion - Nuevo tipo de suscripción.
     */
    constructor(suscripcion) {
        this.fechaSuscripcion = suscripcion.fechaSuscripcion;
        this.idAsesor = suscripcion.idAsesor;
        this.tipoSuscripcion = suscripcion.tipoSuscripcion;
    }
}

/**
 * Entidad de una suscripción.
 * @class
 */
class SuscripcionEntity {
    /**
     * @param {Object} suscripcion - Objeto que contiene los datos de la suscripción.
     * @param {string} suscripcion.idSuscripcion - ID de la suscripción.
     * @param {string} suscripcion.noContrato - Número de contrato de la suscripción.
     * @param {Date} suscripcion.fechaSuscripcion - Fecha de suscripción.
     * @param {Date} suscripcion.fechaVencimiento - Fecha de vencimiento de la suscripción.
     * @param {Object} suscripcion.suscriptorEntity - Objeto que representa al suscriptor.
     */
    constructor(suscripcion) {
        this.idSuscripcion = suscripcion.idSuscripcion;
        this.noContrato = suscripcion.noContrato;
        this.fechaSuscripcion = suscripcion.fechaSuscripcion;
        this.fechaVencimiento = suscripcion.fechaVencimiento;
        this.suscriptorEntity = new SuscriptorEntity(suscripcion.suscriptorEntity);
    }
}

/**
 * Modelo de respuesta de datos para una suscripción.
 * @class
 */
class SuscripcionDatosResModel {
    /**
    * @param {Object} suscripcion - Objeto que contiene los datos de la suscripción.
    * @param {string} suscripcion.idSuscripcion - ID de la suscripción.
    * @param {string} suscripcion.noContrato - Número de contrato de la suscripción.
    * @param {string} suscripcion.estado - Estado de la suscripción.
    * @param {Array<Object>} suscripcion.pacienteEntity - Lista de pacientes asociados.
    * @param {Object} [suscripcion.usuarioEntity] - Objeto que representa al usuario asociado.
    */
    constructor(suscripcion) {
        this.idSuscripcion = suscripcion.idSuscripcion;
        this.noContrato = suscripcion.noContrato;
        this.estado = suscripcion.estado;
        this.pacienteEntity = suscripcion.pacienteEntity.map(paciente => new PacienteEntity(paciente)) || [];
        this.usuarioEntity = suscripcion.usuarioEntity ? new UsuarioDatosRestModel(suscripcion.usuarioEntity) : null;
    }
}

/**
 * Entidad de un paciente.
 * @class
 */
class PacienteEntity {
    /**
    * @param {Object} paciente - Objeto que contiene los datos del paciente.
    * @param {string} paciente.idBeneficiario - ID del beneficiario.
    * @param {string} paciente.nombre - Nombre del paciente.
    * @param {string} paciente.primerApellido - Primer apellido del paciente.
    * @param {string} paciente.segundoApellido - Segundo apellido del paciente.
    * @param {string} paciente.documento - Documento de identificación del paciente.
    */
    constructor(paciente) {
        this.idBeneficiario = paciente.idBeneficiario;
        this.nombre = paciente.nombre;
        this.primerApellido = paciente.primerApellido;
        this.segundoApellido = paciente.segundoApellido;
        this.documento = paciente.documento;
    }
}

export { SuscripcionCrearRequestModel, SuscripcionDatosRestModel, SuscripcionActualizarReqModel, SuscripcionEntity, SuscripcionDatosResModel, PacienteEntity };