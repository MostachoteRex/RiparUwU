import especialidadRepository from "../db/repository/especialidadRepository.js";
import institucionRepository from "../db/repository/institucionRepository.js";
import usuarioRepository from "../db/repository/usuarioRepository.js";
import crypto from "crypto"

const crearInstitucion= (institucion, documento)=>{

    return new Promise( async (resolve,reject)=>{

        if(!institucion.nombre || !institucion.direccion || !institucion.idEspecialidad){
            reject("Faltan datos");
        } else {
            
          institucion.nombre = institucion.nombre.charAt(0).toUpperCase() + institucion.nombre.slice(1);
          institucion.direccion = institucion.direccion.charAt(0).toUpperCase() + institucion.direccion.slice(1);
          const usuario= await usuarioRepository.buscarDocumento(documento)
          const especialidad= await especialidadRepository.detalle(institucion.idEspecialidad)
          const institucionExistente = await institucionRepository.buscarPorNombre(institucion.nombre);
          
          if(institucionExistente != null) {

            let existeInstitucionMismaEspecialidad = false;

            for (const inst of institucionExistente) {
              if (inst.idEspecialidad === especialidad.idEspecialidad) {                
                existeInstitucionMismaEspecialidad = true;
                break;
              }
            }
            if (existeInstitucionMismaEspecialidad) {
              reject(`Ya existe una institución con la misma especialidad`);
            } else {

              institucion.idInstitucion = crypto.randomUUID();
              institucion.usuarioEntity = usuario;
              institucion.especialidadEntity = especialidad;
      
              institucionRepository.crear(institucion);
      
              resolve(institucion);
            }                         
          } else {

            institucion.idInstitucion = crypto.randomUUID();
            institucion.usuarioEntity = usuario;
            institucion.especialidadEntity = especialidad;
    
            await institucionRepository.crear(institucion);
    
            resolve(institucion);
          }
      }
    })

}

const leerInstitucion = () => {
  
  return new Promise((resolve, reject) => {
    
    institucionRepository.leer()
  
      .then(async array => {
        let instituciones= []
        for await (const institucion of array) {
          const especialidad = await especialidadRepository.detalle(institucion.idEspecialidad)
          institucion.especialidadEntity = especialidad;
          instituciones.push(institucion);
        }
        resolve(instituciones)
        })
      .catch(error => {
        reject(error); 
      })
  })
}

const detalleInstitucion=(id)=>{
  
  return new Promise ((resolve, reject)=> {
    
    institucionRepository.detalle(id)
    .then(async institucion=>{
      institucion.especialidadEntity = await especialidadRepository.detalle(institucion.idEspecialidad)
      resolve(institucion)
    })
    .catch(error => {
      reject(error) 
    })
})
}

const buscarEspecialidad=(id)=>{

  return new Promise((resolve, reject)=>{

    institucionRepository.buscarEspecialidad(id)

    .then(async array=>{
      let instituciones= []
        for await (const institucion of array) {
          institucion.especialidadEntity = await especialidadRepository.detalle(institucion.idEspecialidad)
          instituciones.push(institucion)
        }
        resolve(instituciones)
    })
    .catch(error =>{
      reject(error)
    })
  })

}

const actualizarInstitucion= (id, institucion)=>{
  
  return new Promise( async (resolve, reject)=>{

      if(!institucion.nombre || !institucion.direccion || !institucion.idEspecialidad){
          reject("Faltan datos");
      } else {

          const institucionDetalle = await institucionRepository.detalle(id);
          institucionDetalle.nombre = institucion.nombre.charAt(0).toUpperCase() + institucion.nombre.slice(1);
          institucionDetalle.direccion = institucion.direccion.charAt(0).toUpperCase() + institucion.direccion.slice(1);
          institucionDetalle.idEspecialidad = institucion.idEspecialidad

          const Institucion= await institucionRepository.actualizar(institucionDetalle)
          Institucion.especialidadEntity = await especialidadRepository.detalle(Institucion.idEspecialidad)          
          resolve(Institucion)
      }
  });
}

const eliminarInstitucion=(id)=>{
  return new Promise ((resolve ,reject)=> {

      resolve(institucionRepository.eliminar(id))
  })
}

export default {crearInstitucion, leerInstitucion, detalleInstitucion, actualizarInstitucion, eliminarInstitucion, buscarEspecialidad}

