import suscriptorRepository from "../db/repository/suscriptorRepository.js";
import usuarioRepository from "../db/repository/usuarioRepository.js";
import crypto from "crypto"

const crearSuscriptor= (suscriptor, documento)=>{
  console.log(suscriptor)

    return new Promise( async (resolve,reject)=>{

        if(!suscriptor.documento || !suscriptor.nombre || !suscriptor.primerApellido || !suscriptor.segundoApellido || !suscriptor.actividadEconomica || !suscriptor.telefono || !suscriptor.fechaNacimiento || !suscriptor.email || !suscriptor.direccion || !suscriptor.barrio || !suscriptor.ciudad){
            reject("Faltan datos")
        } 
        else if(await suscriptorRepository.buscarDocumento(suscriptor.documento) !==null){
          reject("Este documento ya se encuentra registrado")
        } 
        else if(await suscriptorRepository.buscarEmail(suscriptor.email) !==null){
            reject("Este email ya se encuentra registrado")
        }
        else {
            
            const usuario= await usuarioRepository.buscarDocumento(documento.sub)

            suscriptor.idSuscriptor= crypto.randomUUID()
            suscriptor.usuarioEntity= usuario

            await suscriptorRepository.crear(suscriptor)

            resolve(suscriptor)
        } 
    })

}

const leerSuscriptor = async () => {
  return await suscriptorRepository.leer();
  return new Promise((resolve, reject) => {
    
    suscriptorRepository.leer()
    .then(array => {
        resolve(array);
    })
    .catch(err => {
        reject("No es posible leer los suscriptores")
    })
  })
}

const detalleSuscriptor=(id)=>{
  
  return new Promise (async(resolve, reject)=> {
    
    resolve(suscriptorRepository.detalle(id))
  })
}

const actualizarSuscriptor= (id, suscriptor)=>{
  
  return new Promise( async (resolve, reject)=>{

    if(!suscriptor.documento || !suscriptor.nombre || !suscriptor.primerApellido || !suscriptor.segundoApellido || !suscriptor.actividadEconomica || !suscriptor.telefono || !suscriptor.fechaNacimiento || !suscriptor.email || !suscriptor.direccion || !suscriptor.barrio || !suscriptor.ciudad){
        reject("Faltan datos");   
    } 
    else if(await suscriptorRepository.buscarDocumento(suscriptor.documento) !==null){
      reject("Este documento ya se encuentra registrado")
    } 
    else if(await suscriptorRepository.buscarEmail(suscriptor.email) !==null){
        reject("Este email ya se encuentra registrado")
    } else {

          const suscriptorDetalle = await suscriptorRepository.detalle(id)
          suscriptorDetalle.documento = suscriptor.documento
          suscriptorDetalle.nombre = suscriptor.nombre
          suscriptorDetalle.primerApellido = suscriptor.primerApellido
          suscriptorDetalle.segundoApellido = suscriptor.segundoApellido
          suscriptorDetalle.actividadEconomica = suscriptor.actividadEconomica
          suscriptorDetalle.telefono = suscriptor.telefono
          suscriptorDetalle.fechaNacimiento = suscriptor.fechaNacimiento
          suscriptorDetalle.email = suscriptor.email
          suscriptorDetalle.direccion = suscriptor.direccion
          suscriptorDetalle.barrio = suscriptor.barrio
          suscriptorDetalle.ciudad = suscriptor.ciudad

          const suscriptorData= await suscriptorRepository.actualizar(suscriptorDetalle)
          resolve(suscriptorData)
      }
  })
}

const eliminarSuscriptor=(id)=>{
  return new Promise ((resolve ,reject)=> {

      resolve(suscriptorRepository.eliminar(id))
  })
}

export default {crearSuscriptor, leerSuscriptor, detalleSuscriptor, actualizarSuscriptor, eliminarSuscriptor/* , buscarEspecialidad */}