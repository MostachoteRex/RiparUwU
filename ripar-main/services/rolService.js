import usuarioRepository from "../db/repository/usuarioRepository.js";
import rolRepository from "../db/repository/rolRepository.js";

const crearRol= (rol, documento)=>{

    return new Promise((resolve, reject)=>{

        if(!rol.nombre){
            reject("Faltan datos");
        } else {

            /* const usuario = usuarioRepository.buscarDocumento(documento);

            rol.usuarioEntity = usuario; */

            rolRepository.crear(rol)

            resolve(rol);
        }
    });
}

const leerRol= () => {

    return new Promise((resolve, reject) => {

        rolRepository.leer()

            .then(array => {
                resolve(array);
            })
            .catch(err => {
                reject("No es posible leer los roles");
            });
    });
}

const detalleRol=(id)=>{
    
    return new Promise((resolve, reject) => {

       resolve(rolRepository.detalle(id));

    });
}

const actualizarRol= (id, rol)=>{

    return new Promise( async (resolve, reject)=>{

        if(!rol.estado){
            reject("Faltan datos");
        } else {

            const rolDetalle = await rolRepository.detalle(id)            
            rolDetalle.estado = rol.estado
            const rolData= await rolRepository.actualizar(rolDetalle);

            resolve(rolData)
        }
    });
}

const eliminarRol=(id)=>{
    return new Promise ((resolve ,reject)=> {

        resolve(rolRepository.eliminar(id))
    })
}

export default {crearRol, leerRol, detalleRol, actualizarRol, eliminarRol}