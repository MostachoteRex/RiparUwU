import { SuscriptorEntity } from "./suscriptorModel.js"

function BeneficiarioCrearRequestModel(beneficiario){
    this.nombre = beneficiario.nombre
    this.primerApellido = beneficiario.primerApellido
    this.segundoApellido = beneficiario.segundoApellido
    this.documento = beneficiario.documento
    this.idSuscriptor = beneficiario.idSuscriptor
}

function BeneficiarioDatosRestModel(beneficiario){
    this.idBeneficiario = beneficiario.idBeneficiario
    this.nombre = beneficiario.nombre
    this.primerApellido = beneficiario.primerApellido
    this.segundoApellido = beneficiario.segundoApellido
    this.documento = beneficiario.documento
    this.suscriptorEntity = new SuscriptorEntity(beneficiario.suscriptorEntity)
}

function BeneficiarioActualizarReqModel(beneficiario){
    this.nombre = beneficiario.nombre
    this.primerApellido = beneficiario.primerApellido
    this.segundoApellido = beneficiario.segundoApellido
    this.documento = beneficiario.documento
    this.idSuscriptor = beneficiario.idSuscriptor
}

function BeneficiarioEntity(beneficiario){
    this.idBeneficiario = beneficiario.idBeneficiario
    this.nombre = beneficiario.nombre
    this.primerApellido = beneficiario.primerApellido
    this.segundoApellido = beneficiario.segundoApellido
    this.documento = beneficiario.documento
}

export { BeneficiarioCrearRequestModel, BeneficiarioDatosRestModel, BeneficiarioActualizarReqModel, BeneficiarioEntity }