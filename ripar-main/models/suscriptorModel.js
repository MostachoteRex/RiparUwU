/**
 * Modelo de solicitud para crear un suscriptor.
 * @class
 * @param {Object} suscriptor - Objeto que contiene los datos del suscriptor.
 * @param {string} suscriptor.documento - Documento del suscriptor.
 * @param {string} suscriptor.nombre - Nombre del suscriptor.
 * @param {string} suscriptor.primerApellido - Primer apellido del suscriptor.
 * @param {string} suscriptor.segundoApellido - Segundo apellido del suscriptor.
 * @param {string} suscriptor.actividadEconomica - Actividad económica del suscriptor.
 * @param {string} suscriptor.telefono - Teléfono del suscriptor.
 * @param {Date} suscriptor.fechaNacimiento - Fecha de nacimiento del suscriptor.
 * @param {string} suscriptor.email - Correo electrónico del suscriptor.
 * @param {string} suscriptor.direccion - Dirección del suscriptor.
 * @param {string} suscriptor.barrio - Barrio del suscriptor.
 * @param {string} suscriptor.ciudad - Ciudad del suscriptor.
 */
class SuscriptorCrearRequestModel {
    constructor(suscriptor) {
        this.documento = suscriptor.documento;
        this.nombre = suscriptor.nombre;
        this.primerApellido = suscriptor.primerApellido;
        this.segundoApellido = suscriptor.segundoApellido;
        this.actividadEconomica = suscriptor.actividadEconomica;
        this.telefono = suscriptor.telefono;
        this.fechaNacimiento = suscriptor.fechaNacimiento;
        this.email = suscriptor.email;
        this.direccion = suscriptor.direccion;
        this.barrio = suscriptor.barrio;
        this.ciudad = suscriptor.ciudad;
    }
}

/**
 * Modelo de datos REST para un suscriptor.
 * @class
 * @param {Object} suscriptor - Objeto que contiene los datos del suscriptor.
 * @param {string} suscriptor.idSuscriptor - ID del suscriptor.
 * @param {string} suscriptor.documento - Documento del suscriptor.
 * @param {string} suscriptor.nombre - Nombre del suscriptor.
 * @param {string} suscriptor.primerApellido - Primer apellido del suscriptor.
 * @param {string} suscriptor.segundoApellido - Segundo apellido del suscriptor.
 * @param {string} suscriptor.actividadEconomica - Actividad económica del suscriptor.
 * @param {string} suscriptor.telefono - Teléfono del suscriptor.
 * @param {Date} suscriptor.fechaNacimiento - Fecha de nacimiento del suscriptor.
 * @param {string} suscriptor.email - Correo electrónico del suscriptor.
 * @param {string} suscriptor.direccion - Dirección del suscriptor.
 * @param {string} suscriptor.barrio - Barrio del suscriptor.
 * @param {string} suscriptor.ciudad - Ciudad del suscriptor.
 */
class SuscriptorDatosRestModel {
    constructor(suscriptor) {
        this.idSuscriptor = suscriptor.idSuscriptor;
        this.documento = suscriptor.documento;
        this.nombre = suscriptor.nombre;
        this.primerApellido = suscriptor.primerApellido;
        this.segundoApellido = suscriptor.segundoApellido;
        this.actividadEconomica = suscriptor.actividadEconomica;
        this.telefono = suscriptor.telefono;
        this.fechaNacimiento = suscriptor.fechaNacimiento;
        this.email = suscriptor.email;
        this.direccion = suscriptor.direccion;
        this.barrio = suscriptor.barrio;
        this.ciudad = suscriptor.ciudad;
    }
}

/**
 * Modelo de solicitud para actualizar un suscriptor.
 * @class
 * @param {Object} suscriptor - Objeto que contiene los datos del suscriptor.
 * @param {string} suscriptor.documento - Documento del suscriptor.
 * @param {string} suscriptor.nombre - Nombre del suscriptor.
 * @param {string} suscriptor.primerApellido - Primer apellido del suscriptor.
 * @param {string} suscriptor.segundoApellido - Segundo apellido del suscriptor.
 * @param {string} suscriptor.actividadEconomica - Actividad económica del suscriptor.
 * @param {string} suscriptor.telefono - Teléfono del suscriptor.
 * @param {Date} suscriptor.fechaNacimiento - Fecha de nacimiento del suscriptor.
 * @param {string} suscriptor.email - Correo electrónico del suscriptor.
 * @param {string} suscriptor.direccion - Dirección del suscriptor.
 * @param {string} suscriptor.barrio - Barrio del suscriptor.
 * @param {string} suscriptor.ciudad - Ciudad del suscriptor.
 */
class SuscriptorActualizarReqModel {
    constructor(suscriptor) {
        this.documento = suscriptor.documento;
        this.nombre = suscriptor.nombre;
        this.primerApellido = suscriptor.primerApellido;
        this.segundoApellido = suscriptor.segundoApellido;
        this.actividadEconomica = suscriptor.actividadEconomica;
        this.telefono = suscriptor.telefono;
        this.fechaNacimiento = suscriptor.fechaNacimiento;
        this.email = suscriptor.email;
        this.direccion = suscriptor.direccion;
        this.barrio = suscriptor.barrio;
        this.ciudad = suscriptor.ciudad;
    }
}

/**
 * Entidad de un suscriptor.
 * @class
 * @param {Object} suscriptor - Objeto que contiene los datos del suscriptor.
 * @param {string} suscriptor.idSuscriptor - ID del suscriptor.
 * @param {string} suscriptor.nombre - Nombre del suscriptor.
 * @param {string} suscriptor.primerApellido - Primer apellido del suscriptor.
 * @param {string} suscriptor.segundoApellido - Segundo apellido del suscriptor.
 * @param {string} suscriptor.documento - Documento del suscriptor.
 * @param {string} suscriptor.actividadEconomica - Actividad económica del suscriptor.
 * @param {string} suscriptor.telefono - Teléfono del suscriptor.
 * @param {Date} suscriptor.fechaNacimiento - Fecha de nacimiento del suscriptor.
 * @param {string} suscriptor.email - Correo electrónico del suscriptor.
 * @param {string} suscriptor.direccion - Dirección del suscriptor.
 * @param {string} suscriptor.barrio - Barrio del suscriptor.
 * @param {string} suscriptor.ciudad - Ciudad del suscriptor.
 */
class SuscriptorEntity {
    constructor(suscriptor) {
        this.idSuscriptor = suscriptor.idSuscriptor;
        this.documento = suscriptor.documento;
        this.nombre = suscriptor.nombre;
        this.primerApellido = suscriptor.primerApellido;
        this.segundoApellido = suscriptor.segundoApellido;
        this.actividadEconomica = suscriptor.actividadEconomica;
        this.telefono = suscriptor.telefono;
        this.fechaNacimiento = suscriptor.fechaNacimiento;
        this.email = suscriptor.email;
        this.direccion = suscriptor.direccion;
        this.barrio = suscriptor.barrio;
        this.ciudad = suscriptor.ciudad;
    }
}

export { SuscriptorCrearRequestModel, SuscriptorDatosRestModel, SuscriptorActualizarReqModel, SuscriptorEntity }