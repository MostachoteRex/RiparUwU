import { SuscriptorEntity } from "./suscriptorModel.js"
import { UsuarioEntity } from "./usuarioModel.js"

function ContabilidadDatosResModel(contabilidad){
    this.noContrato = contabilidad.noContrato
    this.suscriptorEntity = new SuscriptorEntity(contabilidad.suscriptorEntity)
    this.valor = contabilidad.valor
    this.metodoPago = contabilidad.metodoPago
    this.usuarioEntity = new UsuarioEntity(contabilidad.usuarioEntity)
    this.fechaRegistro = contabilidad.fechaRegistro
}

export { ContabilidadDatosResModel }