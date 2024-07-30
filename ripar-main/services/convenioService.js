import convenioRepository from "../db/repository/convenioRepository.js";
import especialidadRepository from "../db/repository/especialidadRepository.js";
import institucionRepository from "../db/repository/institucionRepository.js";
import usuarioRepository from "../db/repository/usuarioRepository.js";
import crypto from "crypto";

const crearConvenio= (convenio, documento)=>{
    
    return new Promise( async (resolve,reject)=>{

        if(!convenio.idEspecialidad || !convenio.idInstitucion || !convenio.nombreDr || !convenio.tarifaParticular || !convenio.tarifaMultipreventiva){
            reject("Faltan datos")
        }

        /* const usuario = await usuarioRepository.buscarDocumento(documento) */
        const especialidad = await especialidadRepository.detalle(convenio.idEspecialidad)
        const institucion = await institucionRepository.detalle(convenio.idInstitucion)

        convenio.idConvenio = crypto.randomUUID()
        /* convenio.usuarioEntity = usuario */
        convenio.especialidadEntity = especialidad
        convenio.institucionEntity = institucion

        await convenioRepository.crear(convenio)

        resolve(convenio)
    })

}



const leerConvenio= ()=>{

    return new Promise((resolve, reject)=>{

        convenioRepository.leer()

        .then(async array=>{
            let convenios= []
            for await (const convenio of array){
                const especialidad = await especialidadRepository.detalle(convenio.idEspecialidad)
                const institucion = await institucionRepository.detalle(convenio.idInstitucion)
                convenio.especialidadEntity=especialidad
                convenio.institucionEntity=institucion
                convenios.push(convenio)
            }
            resolve(convenios)
        })
        .catch(error =>{
            reject(error)
        })
    })
}

const detalleConvenio=(id)=>{
    return new Promise ((resolve , reject)=> {

        convenioRepository.detalle(id)

        .then(async convenio=>{

            const especialidad= await especialidadRepository.detalle(convenio.idEspecialidad)
            const institucion= await institucionRepository.detalle(convenio.idInstitucion)

            convenio.especialidadEntity= especialidad
            convenio.institucionEntity= institucion

            resolve(convenio)
        })
        .catch( error=>{
            reject(error)
        })  
    })
}

const buscarPorInstitucion=(id)=>{

    return new Promise((resolve, reject)=>{
  
      convenioRepository.buscarPorInstitucion(id)
  
      .then(async array=>{
        let convenios= []
          for await (const convenio of array) {
            
            convenio.especialidadEntity= await especialidadRepository.detalle(convenio.idEspecialidad)
            convenio.institucionEntity= await institucionRepository.detalle(convenio.idInstitucion)

            convenios.push(convenio)
          }
          resolve(convenios)
      })
      .catch(error =>{
        reject(error)
      })
    })
  
  }

const actualizarConvenio= (id, convenio)=>{

    return new Promise( async(resolve, reject)=>{

        if(!convenio.idEspecialidad || !convenio.idInstitucion || !convenio.nombreDr || !convenio.tarifaParticular || !convenio.tarifaMultipreventiva){
            reject("Faltan datos")
        }
        else{

            const convenioDetalle = await convenioRepository.detalle(id)
            convenioDetalle.idEspecialidad =convenio.idEspecialidad
            convenioDetalle.idInstitucion = convenio.idInstitucion
            convenioDetalle.nombreDr = convenio.nombreDr
            convenioDetalle.tarifaParticular = convenio.tarifaParticular
            convenioDetalle.tarifaMultipreventiva = convenio.tarifaMultipreventiva

            const Convenio = await convenioRepository.actualizar(convenioDetalle)

            Convenio.especialidadEntity= await especialidadRepository.detalle(Convenio.idEspecialidad)
            Convenio.institucionEntity= await institucionRepository.detalle(Convenio.idInstitucion)
            resolve(Convenio)
        }
    })
}

const eliminarConvenio=(id)=>{

    return new Promise ((resolve, reject)=>{

        resolve(convenioRepository.eliminar(id))
    })
}
export default {crearConvenio, leerConvenio, detalleConvenio, buscarPorInstitucion, actualizarConvenio, eliminarConvenio}