import { UsuarioDatosRestModel } from "./usuarioModel.js"
import { EspecialidadEntity } from "./especialidadModel.js"

function InstitucionCrearRequestModel(institucion){
    this.idEspecialidad = institucion.idEspecialidad
    this.nombre = institucion.nombre
    this.direccion = institucion.direccion
}

function InstitucionDatosRestModel(institucion){
    this.idInstitucion = institucion.idInstitucion
    this.especialidadEntity= new EspecialidadEntity(institucion.especialidadEntity)
    this.nombre = institucion.nombre
    this.direccion = institucion.direccion
    this.fechaRegistro = institucion.fechaRegistro
    /* this.usuarioEntity= new UsuarioDatosRestModel(institucion.usuarioEntity) */
}

function InstitucionActualizarReqModel(institucion){
    this.idEspecialidad = institucion.idEspecialidad
    this.nombre = institucion.nombre
    this.direccion = institucion.direccion
}

function institucionEntity(institucion){
    this.idInstitucion = institucion.idInstitucion
    this.nombre = institucion.nombre
    this.direccion = institucion.direccion
}

export {InstitucionCrearRequestModel, InstitucionDatosRestModel, InstitucionActualizarReqModel, institucionEntity}

