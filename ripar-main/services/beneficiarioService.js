import beneficiarioRepository from "../db/repository/beneficiarioRepository.js"
import suscriptorRepository from "../db/repository/suscriptorRepository.js";
import crypto from "crypto"


const crearBeneficiario = (beneficiario, documento)=>{
    
    return new Promise( async (resolve, reject) => {

        if(!beneficiario.nombre || !beneficiario.primerApellido || !beneficiario.documento || !beneficiario.idSuscriptor){
            reject("Faltan datos")
        }
        else if(await beneficiarioRepository.buscarDocumento(beneficiario.documento) !==null){
            reject("Este documento ya se encuentra registrado")
        }
        // else if(await beneficiarioRepository.contarRegistros(beneficiario.idSuscriptor) > 6){
        //     reject("El suscriptor alcanzo el limite de beneficiarios")
        // }
        else{
            const suscriptor= await suscriptorRepository.detalle(beneficiario.idSuscriptor)

            beneficiario.idBeneficiario = crypto.randomUUID()
            beneficiario.suscriptorEntity = suscriptor
            beneficiarioRepository.crear(beneficiario)
            resolve(beneficiario)
        }
    })
}

const leerBeneficiario = () => {

    return new Promise ((resolve ,reject )=>{

        beneficiarioRepository.leer()

        .then( async array =>{
            let beneficiarios=[]
            for await (const beneficiario of array){
                const suscriptor = await suscriptorRepository.detalle(beneficiario.idSuscriptor)
                beneficiario.suscriptorEntity = suscriptor
                beneficiarios.push(beneficiario)
            }
            resolve(beneficiarios)
        })
        .catch(err => {
            reject("No es posible leer los beneficiarios")
        })
    })
}

const detalleBeneficiario = (id) => {

    return new Promise((resolve, reject) => {

        beneficiarioRepository.detalle(id)
        .then(async beneficiario=>{

            const suscriptor= await suscriptorRepository.detalle(beneficiario.idSuscriptor)
            beneficiario.suscriptorEntity=suscriptor
            resolve(beneficiario)
        })
        .catch(error => {
            reject(error)
        })
    })
}

const buscarSuscriptor = (id) =>{

    return new Promise(async(resolve, reject)=>{

        beneficiarioRepository.buscarSuscriptor(id)
    
        .then(async beneficiario=>{
          resolve(beneficiario)
        })
        .catch(error =>{
          reject(error)
        })
    })
}

const actualizarBeneficiario = (id, beneficiario)=>{
    
    return  new Promise( async (resolve, reject)=> {

        if(!beneficiario.nombre || !beneficiario.primerApellido || !beneficiario.documento){
            reject("Faltan datos")
        } else {
            
            const beneficiarioDetalle = await beneficiarioRepository.detalle(id)
            beneficiarioDetalle.nombre = beneficiario.nombre
            beneficiarioDetalle.primerApellido = beneficiario.primerApellido
            beneficiarioDetalle.segundoApellido = beneficiario.segundoApellido
            beneficiarioDetalle.documento = beneficiario.documento

            const beneficiarioData = await beneficiarioRepository.actualizar(beneficiarioDetalle)
            const suscriptor = await suscriptorRepository.detalle(beneficiarioData.idSuscriptor)
            beneficiarioData.suscriptorEntity = suscriptor
            resolve(beneficiarioData)
        }
    })
}

const eliminarBeneficiario=(id)=>{

    return new Promise ((resolve ,reject)=> {

        resolve(beneficiarioRepository.eliminar(id))
    })
}

export default { crearBeneficiario, leerBeneficiario, detalleBeneficiario, actualizarBeneficiario, eliminarBeneficiario, buscarSuscriptor }