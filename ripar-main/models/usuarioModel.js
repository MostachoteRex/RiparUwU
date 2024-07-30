import { RolEntity } from "./rolModel.js"

function UsuarioCrearRequestModel(usuario){
    this.nombre = usuario.nombre
    this.apellido = usuario.apellido
    this.documento = usuario.documento
    this.email = usuario.email
    this.password = usuario.password
    this.idRol = usuario.idRol
}

function UsuarioDatosRestModel(usuario){
    this.idUsuario = usuario.idUsuario
    this.nombre = usuario.nombre
    this.apellido = usuario.apellido
    this.documento = usuario.documento
    this.email = usuario.email
    this.rolEntity = new RolEntity(usuario.rolEntity)
    this.passwordEncriptada = usuario.passwordEncriptada
}

function UsuarioActualizarReqModel(usuario){
    this.nombre= usuario.nombre
    this.apellido = usuario.apellido
    this.documento = usuario.documento
    this.email = usuario.email
    this.idRol = usuario.idRol
}

function PasswordActualizarReqModel(usuario){
    this.newPassword = usuario.newPassword
    this.confirPassword = usuario.confirPassword
}

function UsuarioEntity(usuario){
    this.idUsuario = usuario.idUsuario
    this.nombre = usuario.nombre
    this.apellido = usuario.apellido
    this.documento = usuario.documento
}

export {UsuarioCrearRequestModel, UsuarioDatosRestModel, UsuarioEntity, UsuarioActualizarReqModel, PasswordActualizarReqModel}