/**
 * Modelo de solicitud para crear un rol.
 */
class RolCrearRequestModel {
    /**
     * Crea una instancia de RolCrearRequestModel.
     * 
     * @param {Object} rol - Objeto con los datos del rol.
     */
    constructor(rol) {
        this.nombre = rol.nombre
    }
}

/**
 * Modelo de datos de respuesta para un rol.
 */
class RolDatosRestModel {
    /**
     * Crea una instancia de RolDatosRestModel.
     * 
     * @param {Object} rol - Objeto con los datos del rol.
     */
    constructor(rol) {
        this.idRol = rol.idRol
        this.nombre = rol.nombre
        this.estado = rol.estado
        this.fechaRegistro = rol.fechaRegistro
    }
}

/**
 * Entidad de rol.
 */
class RolEntity {
    /**
     * Crea una instancia de RolEntity.
     * 
     * @param {Object} rol - Objeto con los datos del rol.
     */
    constructor(rol) {
        this.idRol = rol.idRol
        this.nombre = rol.nombre
    }
}

/**
 * Modelo de solicitud para actualizar un rol.
 */
class RolActualizarReqModel {
    /**
     * Crea una instancia de RolActualizarReqModel.
     * 
     * @param {Object} rol - Objeto con los datos del rol.
     */
    constructor(rol) {
        this.estado = rol.estado
    }
}

export { RolCrearRequestModel, RolDatosRestModel, RolActualizarReqModel, RolEntity };