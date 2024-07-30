import respuestasHttp from "../utils/respuestasHttp.js"
import suscripcionService from "../services/suscripcionService.js"
import { SuscripcionCrearRequestModel, SuscripcionDatosRestModel, SuscripcionActualizarReqModel, SuscripcionDatosResModel } from "../models/suscripcionModel.js"

const postSuscripcion= (req, res)=>{

    suscripcionService.crearSuscripcion(new SuscripcionCrearRequestModel(req.body), req.user)

    .then( (suscripcion)=>{
        respuestasHttp.exito(req, res, new SuscripcionDatosRestModel(suscripcion), 201)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear la suscripcion", 400)        
    })
}


const getSuscripcion= (req, res)=>{

    suscripcionService.leerSuscripcion()

    .then( array =>{

        let lasSuscripciones = []

        array.forEach(suscripciones => {
            lasSuscripciones.push(new SuscripcionDatosRestModel(suscripciones))
        })

        respuestasHttp.exito(req, res, lasSuscripciones, 200)
    })

    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer las suscripciones", 400)
    })
}


const getDetalle= (req, res)=>{

    suscripcionService.detalleSuscripcion(req.params.id)
    .then(suscripcion=>{
        respuestasHttp.exito(req, res, new SuscripcionDatosRestModel(suscripcion), 200)
    })
    .catch( err=>{
        respuestasHttp.error(req, res, err, "Error al leer la suscripcion", 400)
    })
}

const getPorContrato= (req, res)=>{

    suscripcionService.buscarPorContrato(req.params.noContrato)
    
    .then(suscripcion=>{        
        respuestasHttp.exito(req, res, new SuscripcionDatosResModel(suscripcion), 200)
    })
    .catch( err=>{
        respuestasHttp.error(req, res, err, "Error al leer la suscripcion", 400)
        console.log(err)
    })
}

const putSuscripcion= (req, res)=>{

    suscripcionService.actualizarSuscripcion(req.params.id, new SuscripcionActualizarReqModel(req.body))

    .then(suscripcion=>{
        respuestasHttp.exito(req, res, new SuscripcionDatosRestModel(suscripcion), 200)
    })
    .catch(err =>{
        respuestasHttp.error(req, res, err, "Error al actualizar la suscripcion", 500)
    })
}


const deleteSuscripcion= (req, res)=>{

    suscripcionService.eliminarSuscripcion(req.params.id)

    .then(()=>{
        respuestasHttp.exito(req, res, "Suscripcion eliminado con exito", 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "error al eliminar la suscripción", 400)
    })
}

export default { postSuscripcion, getSuscripcion, getDetalle, putSuscripcion, deleteSuscripcion, getPorContrato }