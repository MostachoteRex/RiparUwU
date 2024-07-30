import citaRepository from "../db/repository/citaRepository.js"
import suscripcionRepository from "../db/repository/suscripcionRepository.js"
import suscriptorRepository from "../db/repository/suscriptorRepository.js"
import beneficiarioRepository from "../db/repository/beneficiarioRepository.js"
import suscripcionService from "./suscripcionService.js"
import convenioService from "./convenioService.js"
import usuarioRepository from "../db/repository/usuarioRepository.js"
import crypto from "crypto"
import { error } from "console"

const crearCita = (cita) => {

    return new Promise( async (resolve, reject)=>{

        if(!cita.idSuscripcion || !cita.paciente || !cita.idConvenio || !cita.fechaCita || !cita.horaCita){
            reject("Faltan datos")
        }
        else {

            const suscripcion = await suscripcionRepository.detalle(cita.idSuscripcion)
            const suscriptor = await suscriptorRepository.detalle(suscripcion.idSuscriptor)
            const beneficiario = await beneficiarioRepository.buscarSuscriptor(suscriptor.idSuscriptor)
            const paciente = [suscriptor.idSuscriptor, ...(beneficiario.map(b => b.idBeneficiario))]
            const convenio = await convenioService.detalleConvenio(cita.idConvenio)
            const ahorro = await convenio.tarifaParticular - convenio.tarifaMultipreventiva

            if(paciente.includes(cita.paciente)){
                cita.idCita = crypto.randomUUID();
                cita.ahorro = ahorro
                await citaRepository.crear(cita)
                cita.suscripcionEntity = await suscripcionService.detalleSuscripcion(cita.idSuscripcion)
                cita.pacienteEntity = await citaRepository.buscarPaciente(cita.paciente)
                cita.convenioEntity = convenio
                resolve(cita)
            } else {
                console.log("Este paciente no pertenece a esta suscripcion")
                reject(error)
            }
        }
    })
}


const leerCita = () => {
  
    return new Promise((resolve, reject) => {
      
      citaRepository.leer()
    
      .then(async array => {
        let citas= []
        for await (const cita of array){
            cita.suscripcionEntity = await suscripcionService.detalleSuscripcion(cita.idSuscripcion)
            cita.pacienteEntity = await citaRepository.buscarPaciente(cita.idPaciente)
            cita.convenioEntity = await convenioService.detalleConvenio(cita.idConvenio)
            citas.push(cita)
        }
          resolve(citas)
      })
      .catch(error => {
        console.log("No es posible leer las citas")
        reject(error)
      })
    })
}

const detalleCita=(id)=>{
  
    return new Promise (async(resolve, reject)=> {
      
      citaRepository.detalle(id)
      .then(async cita=>{
            cita.suscripcionEntity = await suscripcionService.detalleSuscripcion(cita.idSuscripcion)
            cita.pacienteEntity = await citaRepository.buscarPaciente(cita.idPaciente)
            cita.convenioEntity = await convenioService.detalleConvenio(cita.idConvenio)
        resolve(cita)
      })
      .catch(error => {
          reject(error)
      })
   })
}

const actualizarCita= (id, cita)=>{
  
    return new Promise( async (resolve, reject)=>{
  
      if(!cita.fechaCita || !cita.horaCita){
          reject("Faltan datos")
      } else {
  
            const citaDetalle = await citaRepository.detalle(id)
            citaDetalle.fechaCita = cita.fechaCita
            citaDetalle.horaCita = cita.horaCita
  
            const citaData = await citaRepository.actualizar(citaDetalle)

            citaData.suscripcionEntity = await suscripcionService.detalleSuscripcion(citaData.idSuscripcion)
            citaData.pacienteEntity = await citaRepository.buscarPaciente(citaData.idPaciente)
            citaData.convenioEntity = await convenioService.detalleConvenio(citaData.idConvenio)
  
            resolve(citaData)
        }
    })
}

const eliminarCita=(id)=>{
    return new Promise ((resolve ,reject)=> {
  
        resolve(citaRepository.eliminar(id))
    })
}

export default { crearCita, leerCita, detalleCita, actualizarCita, eliminarCita }