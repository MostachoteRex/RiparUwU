import suscripcionRepository from "../db/repository/suscripcionRepository.js";
import suscriptorRepository from "../db/repository/suscriptorRepository.js";
import usuarioRepository from "../db/repository/usuarioRepository.js";
import beneficiarioRepository from "../db/repository/beneficiarioRepository.js"
import crypto from "crypto"

const crearSuscripcion= (suscripcion, documento)=>{

    return new Promise( async (resolve,reject)=>{

        if(!suscripcion.noContrato || !suscripcion.idAsesor || !suscripcion.idSuscriptor || !suscripcion.fechaSuscripcion || !suscripcion.valor || !suscripcion.metodoPago){
            reject("Faltan datos")
        }
        else if(await suscripcionRepository.buscarId(suscripcion.idSuscriptor) !==null){
          reject("Este suscriptor ya se encuentra registrado")
        }  
        else {
            /* const usuario= await usuarioRepository.buscarDocumento(documento) */
            const fechaVencimiento = new Date(suscripcion.fechaSuscripcion)
            fechaVencimiento.setFullYear(fechaVencimiento.getFullYear() + 1)
            const fechaSoloFecha = fechaVencimiento.toISOString().slice(0, 10)
            const suscriptor= await suscriptorRepository.detalle(suscripcion.idSuscriptor)            

            suscripcion.idSuscripcion= crypto.randomUUID()
            /* suscripcion.usuarioEntity= usuario */            
        
            suscripcion.fechaVencimiento= fechaSoloFecha
            suscripcion.suscriptorEntity=suscriptor

            await suscripcionRepository.crear(suscripcion)

            resolve(suscripcion)
        } 
    })
}

const leerSuscripcion = () => {
  
  return new Promise((resolve, reject) => {
    
    suscripcionRepository.leer()
  
    .then(async array => {
      let suscripciones= []
      for await (const suscripcion of array){
        suscripcion.suscriptorEntity = await suscriptorRepository.detalle(suscripcion.idSuscriptor) 
        suscripcion.asesorEntity = await usuarioRepository.detalle(suscripcion.idAsesor)
        suscripciones.push(suscripcion)
      }
        resolve(suscripciones)
    })
    .catch(err => {
        reject("No es posible leer las suscripciones")
    })
  })
}

const buscarPorContrato=(noContrato)=>{
    
  return new Promise (async(resolve, reject)=> {
    
    suscripcionRepository.buscarPorContrato(noContrato)

    .then(async suscripcion=>{        
        const suscriptor = await suscriptorRepository.detalle(suscripcion.idSuscriptor)
        suscriptor.idBeneficiario = suscriptor.idSuscriptor        
        const beneficiario = await beneficiarioRepository.buscarSuscriptor(suscripcion.idSuscriptor)        
        const paciente = [suscriptor, ...(beneficiario)]
        suscripcion.suscriptorEntity = suscriptor
        suscripcion.pacienteEntity = paciente               
        resolve(suscripcion)
    })
    .catch(error => {
        reject(error)
    })
 })
}

const detalleSuscripcion=(id)=>{
  
  return new Promise (async(resolve, reject)=> {
    
    suscripcionRepository.detalle(id)
    .then(async suscripcion=>{
        suscripcion.suscriptorEntity = await suscriptorRepository.detalle(suscripcion.idSuscriptor)
        suscripcion.asesorEntity = await usuarioRepository.detalle(suscripcion.idAsesor)
        resolve(suscripcion)
    })
    .catch(error => {
        reject(error)
    })
 })
}

const actualizarSuscripcion= (id, suscripcion)=>{
  
  return new Promise( async (resolve, reject)=>{

    if(!suscripcion.fechaSuscripcion || !suscripcion.idAsesor || !suscripcion.tipoSuscripcion){
        reject("Faltan datos")
    } else {

          const suscripcionDetalle = await suscripcionRepository.detalle(id)
          suscripcionDetalle.fechaSuscripcion = suscripcion.fechaSuscripcion

          const fechaVencimiento = new Date(suscripcionDetalle.fechaSuscripcion)
          fechaVencimiento.setFullYear(fechaVencimiento.getFullYear() + 1)
          const fechaSoloFecha = fechaVencimiento.toISOString().slice(0, 10)

          suscripcionDetalle.fechaVencimiento = fechaSoloFecha
          suscripcionDetalle.idAsesor = suscripcion.idAsesor
          suscripcionDetalle.tipoSuscripcion = suscripcion.tipoSuscripcion

          const suscripcionData = await suscripcionRepository.actualizar(suscripcionDetalle)
          const suscriptor = await suscriptorRepository.detalle(suscripcionData.idSuscriptor)
          suscripcionData.suscriptorEntity = suscriptor

          resolve(suscripcionData)
      }
  })
}

const eliminarSuscripcion=(id)=>{
  return new Promise ((resolve ,reject)=> {

      resolve(suscripcionRepository.eliminar(id))
  })
}

export default {crearSuscripcion, leerSuscripcion, detalleSuscripcion, actualizarSuscripcion, eliminarSuscripcion, buscarPorContrato}