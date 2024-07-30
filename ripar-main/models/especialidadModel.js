import {UsuarioDatosRestModel} from "./usuarioModel.js"

function EspecialidadCrearRequestModel(especialidad){
    this.nombre = especialidad.nombre
}

function EspecialidadDatosRestModel(especialidad){
    this.idEspecialidad = especialidad.idEspecialidad
    this.nombre = especialidad.nombre
    this.fechaRegistro = especialidad.fechaRegistro/* ,
    this.usuarioEntity= new UsuarioDatosRestModel(especialidad.usuarioEntity) */
}

function EspecialidadActualizarReqModel(especialidad){
    this.nombre= especialidad.nombre
}

function EspecialidadEntity(especialidad){
    this.idEspecialidad = especialidad.idEspecialidad
    this.nombre = especialidad.nombre
}

export { EspecialidadCrearRequestModel, EspecialidadDatosRestModel, EspecialidadActualizarReqModel, EspecialidadEntity }

