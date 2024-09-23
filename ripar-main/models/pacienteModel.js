/**
 * Entidad de paciente.
 */
class PacienteEntity {
    /**
     * Crea una instancia de PacienteEntity.
     * 
     * @param {Object} cita - Objeto con los datos de la cita.
     */
    constructor(cita) {
        this.documento = cita.documento
        this.nombre = cita.nombre
        this.primerApellido = cita.primerApellido
        this.segundoApellido = cita.segundoApellido
    }
}

export { PacienteEntity };