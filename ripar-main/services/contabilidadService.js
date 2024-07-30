import contabilidadRepository from "../db/repository/contabilidadRepository.js";
import suscriptorRepository from "../db/repository/suscriptorRepository.js";
import usuarioRepository from "../db/repository/usuarioRepository.js";


const leerContabilidad = () => {

    return new Promise((resolve, reject) => {

        contabilidadRepository.leer()

            .then(async array => {
                    console.log(array)
                let registros=[]
                for await (const contabilidad of array){
                    contabilidad.suscriptorEntity = await suscriptorRepository.detalle(contabilidad.suscriptor)
                    contabilidad.usuarioEntity = await usuarioRepository.detalle(contabilidad.asesor)
                    registros.push(contabilidad)
                }
                resolve(registros);
            })
            .catch(err => {
                reject("No es posible leer la contabilidad")
            })
    })
}


export default {leerContabilidad}