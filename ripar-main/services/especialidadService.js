import especialidadRepository from "../db/repository/especialidadRepository.js";
import usuarioRepository from "../db/repository/usuarioRepository.js";
import crypto from "crypto"

const crearEspecialidad= (especialidad, documento)=>{    

    return new Promise( async (resolve, reject)=>{

        if(!especialidad.nombre){
            reject("Faltan datos");
        } else {
            
            especialidad.nombre = especialidad.nombre.charAt(0).toUpperCase() + especialidad.nombre.slice(1);

            const especialidadExistente = await especialidadRepository.buscarPorNombre(especialidad.nombre);

            if(especialidadExistente) {
                reject(`La Especialidad ya existe`);
            } else {
                especialidad.idEspecialidad = crypto.randomUUID();
            
                especialidadRepository.crear(especialidad);
                resolve(especialidad);
            }
        }
    })
}

const leerEspecialidad = () => {

    return new Promise((resolve, reject) => {

        especialidadRepository.leer()

            .then(array => {
                resolve(array);
            })
            .catch(err => {
                reject("No es posible leer las especialidades")
            })
    })
}

const detalleEspecialidad=(id)=>{
    
    return new Promise((resolve, reject) => {

       resolve(especialidadRepository.detalle(id))

    })
}

const actualizarEspecialidad= (id, especialidad)=>{

    return new Promise( async (resolve, reject)=>{

        if(!especialidad.nombre){
            reject("Faltan datos");
        } else {

            const especialidadDetalle = await especialidadRepository.detalle(id);
            
            especialidadDetalle.nombre = especialidad.nombre

            const especialidad1= await especialidadRepository.actualizar(especialidadDetalle)

            resolve(especialidad1)
        }
    })
}

const eliminarEspecialidad=(id)=>{
    return new Promise ((resolve ,reject)=> {

        resolve(especialidadRepository.eliminar(id))
    })
}

export default {crearEspecialidad, leerEspecialidad, detalleEspecialidad, actualizarEspecialidad, eliminarEspecialidad}

