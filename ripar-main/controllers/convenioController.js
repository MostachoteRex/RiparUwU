import respuestasHttp from "../utils/respuestasHttp.js"
import convenioService from "../services/convenioService.js";
import { ConvenioActualizarReqModel, ConvenioCrearRequestModel, ConvenioDatosRestModel } from "../models/convenioModel.js";

const postConvenio= (req, res)=>{

    convenioService.crearConvenio(new ConvenioCrearRequestModel(req.body), req.user)

    .then( (convenio)=>{
        console.log(convenio)
        respuestasHttp.exito(req, res, new ConvenioDatosRestModel(convenio), 201)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear el convenio", 400)
    console.log(err)
    })
}


const getConvenio= (req, res)=>{

    convenioService.leerConvenio()

    .then( array =>{

        let losConvenios = []

        array.forEach(convenio => {
            losConvenios.push(new ConvenioDatosRestModel(convenio))
        })

        respuestasHttp.exito(req, res, losConvenios, 200)
    })

    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer los convenios", 400)
        console.log(err)
    })
}


const getDetalle= (req, res)=>{

    convenioService.detalleConvenio(req.params.id)
    .then(convenio=>{
        respuestasHttp.exito(req, res, new ConvenioDatosRestModel(convenio), 200)
    })
    .catch( err=>{
        respuestasHttp.error(req, res, err, "Error al leer el convenio", 400)
    })
}

const getPorInstitucion= (req, res) => {

    convenioService.buscarPorInstitucion(req.params.id)
  
    .then(array=>{    
        let losConvenios= []
        array.forEach(convenio => {
            losConvenios.push(new ConvenioDatosRestModel(convenio))
        });
        respuestasHttp.exito(req, res, losConvenios, 201)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer los convenios por institucion", 400)
        console.log(err)
    })
  }


const putConvenio= (req, res)=>{

    convenioService.actualizarConvenio(req.params.id, new ConvenioActualizarReqModel(req.body))

    .then(convenio=>{
        respuestasHttp.exito(req, res, new ConvenioDatosRestModel(convenio), 200)
    })
    .catch(err =>{
        respuestasHttp.error(req, res, err, "Error al actualizar el convenio", 500)
    })
}


const deleteConvenio= (req, res)=>{

    convenioService.eliminarConvenio(req.params.id)

    .then(()=>{
        respuestasHttp.exito(req, res, "Convenio eliminado con exito", 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "error al eliminar el convenio", 400)
    })
}

export default { postConvenio, getConvenio, getDetalle, getPorInstitucion, putConvenio, deleteConvenio }