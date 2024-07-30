import {UsuarioDatosRestModel} from "./usuarioModel.js"

function RolCrearRequestModel(rol){
    this.nombre = rol.nombre
}

function RolDatosRestModel(rol){
    this.idRol = rol.idRol
    this.nombre = rol.nombre
    this.estado = rol.estado
    this.fechaRegistro = rol.fechaRegistro/* ,
    this.usuarioEntity= new UsuarioDatosRestModel(especialidad.usuarioEntity) */
}

function RolEntity(rol){
    this.idRol = rol.idRol
    this.nombre = rol.nombre
}

function RolActualizarReqModel(rol){    
    this.estado = rol.estado
}

export {RolCrearRequestModel, RolDatosRestModel, RolActualizarReqModel, RolEntity}