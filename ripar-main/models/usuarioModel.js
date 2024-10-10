import { RolEntity } from "./rolModel.js"

/**
 * Modelo de solicitud para crear un usuario.
 */
class UsuarioCrearRequestModel {
    /**
     * Crea una instancia de UsuarioCrearRequestModel.
     * 
     * @param {Object} usuario - Objeto con los datos del usuario.
     */
    constructor(usuario) {
        this.nombre = usuario.nombre
        this.apellido = usuario.apellido
        this.documento = usuario.documento
        this.email = usuario.email
        this.password = usuario.password
        this.idRol = usuario.idRol
    }
}

/**
 * Modelo de datos de respuesta para un usuario.
 */
class UsuarioDatosRestModel {
    /**
     * Crea una instancia de UsuarioDatosRestModel.
     * 
     * @param {Object} usuario - Objeto con los datos del usuario.
     */
    constructor(usuario) {
        this.idUsuario = usuario.idUsuario
        this.nombre = usuario.nombre
        this.apellido = usuario.apellido
        this.documento = usuario.documento
        this.email = usuario.email
        this.rolEntity = new RolEntity(usuario.rolEntity)
        this.passwordEncriptada = usuario.passwordEncriptada
    }
}

/**
 * Modelo de solicitud para actualizar un usuario.
 */
class UsuarioActualizarReqModel {
    /**
     * Crea una instancia de UsuarioActualizarReqModel.
     * 
     * @param {Object} usuario - Objeto con los datos del usuario.
     */
    constructor(usuario) {
        this.nombre = usuario.nombre
        this.apellido = usuario.apellido
        this.documento = usuario.documento
        this.email = usuario.email
        this.idRol = usuario.idRol
    }
}

/**
 * Modelo de solicitud para actualizar la contraseña de un usuario.
 */
class PasswordActualizarReqModel {
    /**
     * Crea una instancia de PasswordActualizarReqModel.
     * 
     * @param {Object} usuario - Objeto con los datos del usuario.
     */
    constructor(usuario) {
        this.newPassword = usuario.newPassword
        this.confirPassword = usuario.confirPassword
    }
}

/**
 * Entidad de usuario.
 */
class UsuarioEntity {
    /**
     * Crea una instancia de UsuarioEntity.
     * 
     * @param {Object} usuario - Objeto con los datos del usuario.
     */
    constructor(usuario) {
        this.idUsuario = usuario.idUsuario
        this.nombre = usuario.nombre
        this.apellido = usuario.apellido
        this.documento = usuario.documento
    }
}

export { UsuarioCrearRequestModel, UsuarioDatosRestModel, UsuarioEntity, UsuarioActualizarReqModel, PasswordActualizarReqModel };