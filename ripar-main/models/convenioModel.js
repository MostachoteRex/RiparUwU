import { UsuarioDatosRestModel } from "./usuarioModel.js"
import { EspecialidadEntity } from "./especialidadModel.js"
import { institucionEntity } from "./institucionModel.js"

function ConvenioCrearRequestModel(convenio){
    this.idEspecialidad = convenio.idEspecialidad
    this.idInstitucion = convenio.idInstitucion
    this.nombreDr = convenio.nombreDr
    this.tarifaParticular = convenio.tarifaParticular
    this.tarifaMultipreventiva = convenio.tarifaMultipreventiva
    this.telefono = convenio.telefono
    this.email = convenio.email
}

function ConvenioDatosRestModel(convenio){
    this.idConvenio = convenio.idConvenio
    this.especialidadEntity = new EspecialidadEntity(convenio.especialidadEntity)
    this.institucionEntity =  new institucionEntity(convenio.institucionEntity)
    this.nombreDr = convenio.nombreDr
    this.tarifaParticular = convenio.tarifaParticular
    this.tarifaMultipreventiva = convenio.tarifaMultipreventiva
    this.fechaRegistro = convenio.fechaRegistro
    this.telefono = convenio.telefono
    this.email = convenio.email
    /* this.usuarioEntity = new UsuarioDatosRestModel(convenio.usuarioEntity) */
}

function ConvenioActualizarReqModel(convenio){
    this.idEspecialidad = convenio.idEspecialidad
    this.idInstitucion = convenio.idInstitucion
    this.nombreDr = convenio.nombreDr
    this.tarifaParticular = convenio.tarifaParticular
    this.tarifaMultipreventiva = convenio.tarifaMultipreventiva
}

function ConvenioEntity(convenio){
    this.idConvenio = convenio.idConvenio
    this.especialidadEntity = new EspecialidadEntity(convenio.especialidadEntity)
    this.institucionEntity =  new institucionEntity(convenio.institucionEntity)
    this.nombreDr = convenio.nombreDr
    this.tarifaParticular = convenio.tarifaParticular
    this.tarifaMultipreventiva = convenio.tarifaMultipreventiva
}

export { ConvenioCrearRequestModel, ConvenioDatosRestModel, ConvenioActualizarReqModel, ConvenioEntity }