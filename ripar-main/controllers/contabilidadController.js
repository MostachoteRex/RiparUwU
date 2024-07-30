import respuestasHttp from "../utils/respuestasHttp.js"
import { ContabilidadDatosResModel } from "../models/contabilidadModel.js";
import contabilidadService from "../services/contabilidadService.js";


const getContabilidad= (req, res)=>{
    
  contabilidadService.leerContabilidad()

  .then( array =>{

    let registros= []

    array.forEach(contabilidad => {

        registros.push(new ContabilidadDatosResModel(contabilidad))
        
    });
      respuestasHttp.exito(req, res, registros, 200)
  })
  .catch( err =>{
      respuestasHttp.error(req, res, err, "Error al leer el registro de Contabilidad", 500)
      console.log(err)    
  })
}

export default { getContabilidad }