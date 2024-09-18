import contabilidadRepository from "../db/repository/contabilidadRepository.js";
import suscriptorRepository from "../db/repository/suscriptorRepository.js";
import usuarioRepository from "../db/repository/usuarioRepository.js";


const leerContabilidad = async () => {
    try {
        const array = await contabilidadRepository.leer();
        const registros =  await Promise.all(array.map(async (contabilidad) => {
            contabilidad.suscriptorEntity = await suscriptorRepository.detalle(contabilidad.suscriptor);
            contabilidad.usuarioEntity = await usuarioRepository.detalle(contabilidad.asesor);
            return contabilidad
        }));
        return registros;
    } catch (err) {
        throw new Error("No es posible leer la contabilidad", err.message);
    }
};
// () => {

//     return new Promise((resolve, reject) => {

//         contabilidadRepository.leer()

//             .then(async array => {
//                 let registros = [];
//                 for (const contabilidad of array) {
//                     contabilidad.suscriptorEntity = await suscriptorRepository.detalle(contabilidad.suscriptor);
//                     contabilidad.usuarioEntity = await usuarioRepository.detalle(contabilidad.asesor);
//                     registros.push(contabilidad);
//                 }
//                 resolve(registros);
//             })
//             .catch(err => {
//                 reject("No es posible leer la contabilidad");
//             });
//     });
// }


export default { leerContabilidad }