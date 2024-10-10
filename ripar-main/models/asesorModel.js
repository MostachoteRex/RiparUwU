/**
 * Entidad que representa un asesor.
 * @class
 */
class AsesorEntity {
    /**
     * Crea una instancia de AsesorEntity.
     * @param {Object} asesor - Datos del asesor.
     * @param {string} asesor.nombre - Nombre del asesor.
     * @param {string} asesor.primerApellido - Primer apellido del asesor.
     */
    constructor(asesor) {
        this.nombre = asesor.nombre;
        this.apellido = asesor.primerApellido;
    }
}

export { AsesorEntity }