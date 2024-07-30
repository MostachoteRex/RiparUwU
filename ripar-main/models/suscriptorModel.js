function SuscriptorCrearRequestModel(suscriptor){
    this.documento = suscriptor.documento
    this.nombre = suscriptor.nombre
    this.primerApellido = suscriptor.primerApellido
    this.segundoApellido = suscriptor.segundoApellido
    this.actividadEconomica = suscriptor.actividadEconomica
    this.telefono = suscriptor.telefono
    this.fechaNacimiento = suscriptor.fechaNacimiento
    this.email = suscriptor.email
    this.direccion = suscriptor.direccion
    this.barrio = suscriptor.barrio
    this.ciudad = suscriptor.ciudad
}

function SuscriptorDatosRestModel(suscriptor){
    this.idSuscriptor = suscriptor.idSuscriptor
    this.documento = suscriptor.documento
    this.nombre = suscriptor.nombre
    this.primerApellido = suscriptor.primerApellido
    this.segundoApellido = suscriptor.segundoApellido
    this.actividadEconomica = suscriptor.actividadEconomica
    this.telefono = suscriptor.telefono
    this.fechaNacimiento = suscriptor.fechaNacimiento
    this.email = suscriptor.email
    this.direccion = suscriptor.direccion
    this.barrio = suscriptor.barrio
    this.ciudad = suscriptor.ciudad
}

function SuscriptorActualizarReqModel(suscriptor){
    this.documento = suscriptor.documento
    this.nombre = suscriptor.nombre
    this.primerApellido = suscriptor.primerApellido
    this.segundoApellido = suscriptor.segundoApellido
    this.actividadEconomica = suscriptor.actividadEconomica
    this.telefono = suscriptor.telefono
    this.fechaNacimiento = suscriptor.fechaNacimiento
    this.email = suscriptor.email
    this.direccion = suscriptor.direccion
    this.barrio = suscriptor.barrio
    this.ciudad = suscriptor.ciudad
}

function SuscriptorEntity(suscriptor){
    this.idSuscriptor = suscriptor.idSuscriptor
    this.nombre = suscriptor.nombre
    this.primerApellido = suscriptor.primerApellido
    this.segundoApellido = suscriptor.segundoApellido
    this.documento = suscriptor.documento
    this.actividadEconomica = suscriptor.actividadEconomica
    this.telefono = suscriptor.telefono
    this.fechaNacimiento = suscriptor.fechaNacimiento
    this.email = suscriptor.email
    this.direccion = suscriptor.direccion
    this.barrio = suscriptor.barrio
    this.ciudad = suscriptor.ciudad
}

export { SuscriptorCrearRequestModel, SuscriptorDatosRestModel, SuscriptorActualizarReqModel, SuscriptorEntity }