import rolRepository from "../db/repository/rolRepository.js";

/**
 * Crea un nuevo rol utilizando el repositorio.
 * 
 * @async
 * @function crearRol
 * @param {Object} rol - Datos del rol.
 * @returns {Promise<Object>} El rol creado.
 * @throws {Error} Si faltan datos o si ocurre un error al crear el rol.
 */
const crearRol = async (rol) => {
    try {
        if (!rol.nombre) {
            throw new Error("Faltan datos");
        }
        await rolRepository.crear(rol);
        return rol;
    } catch (err) {
        
    }
};

/**
 * Lee todos los roles utilizando el repositorio.
 * 
 * @async
 * @function leerRol
 * @returns {Promise<Array>} Lista de roles.
 * @throws {Error} Si ocurre un error al leer los roles.
 */
const leerRol = async () => {
    try {
        const rol = await rolRepository.leer();
        return rol;
    } catch (err) {
        throw err;
    }
};

/**
 * Obtiene el detalle de un rol utilizando el repositorio.
 * 
 * @async
 * @function detalleRol
 * @param {number} id - ID del rol.
 * @returns {Promise<Object>} Detalle del rol.
 * @throws {Error} Si ocurre un error al obtener el detalle del rol.
 */
const detalleRol = async (id) => {
    try {
        const rol = rolRepository.detalle(id);
        return rol;
    } catch (err) {
        throw err;
    }
};

/**
 * Actualiza un rol existente utilizando el repositorio.
 * 
 * @async
 * @function actualizarRol
 * @param {number} id - ID del rol a actualizar.
 * @param {Object} rol - Datos actualizados del rol.
 * @returns {Promise<Object>} Rol actualizado.
 * @throws {Error} Si faltan datos o si ocurre un error al actualizar el rol.
 */
const actualizarRol = async (id, rol) => {
    try {
        if (!rol.estado) {
            throw new Error("Faltan datos");            
        }
        const rolDetalle = await rolRepository.detalle(id);
        rolDetalle.estado = rol.estado;
        const rolData = await rolRepository.actualizar(rolDetalle);

        return rolData;
    } catch (err) {
        throw new Error("Error al actualizar el rol");        
    }
};

/**
 * Elimina un rol utilizando el repositorio.
 * 
 * @async
 * @function eliminarRol
 * @param {number} id - ID del rol a eliminar.
 * @returns {Promise<void>} Confirmación de eliminación.
 * @throws {Error} Si ocurre un error al eliminar el rol.
 */
const eliminarRol = async (id) => {
    try {
        const results = await rolRepository.eliminar(id);
        if (results.affectedRows === 0) {
			throw new Error("Rol no encontrado o ya eliminado.");
		}
        console.log("Rol eliminado con éxito.");
    } catch (err) {
        console.error("Error al eliminar el rol:", err);
		throw err;
    }
};

export default { crearRol, leerRol, detalleRol, actualizarRol, eliminarRol };