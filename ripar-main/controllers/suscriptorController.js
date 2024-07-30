import respuestasHttp from "../utils/respuestasHttp.js"
import suscriptorService from "../services/suscriptorService.js"
import { SuscriptorCrearRequestModel, SuscriptorDatosRestModel, SuscriptorActualizarReqModel } from "../models/suscriptorModel.js"

const postSuscriptor= (req, res)=>{

    suscriptorService.crearSuscriptor(new SuscriptorCrearRequestModel(req.body), req.user)

    .then( (suscriptor)=>{
        respuestasHttp.exito(req, res, new SuscriptorDatosRestModel(suscriptor), 201)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear el suscriptor", 400)
    })
}


const getSuscriptor= (req, res)=>{

    suscriptorService.leerSuscriptor()

    .then( array =>{

        let losSuscriptores = []

        array.forEach(suscriptor => {
            losSuscriptores.push(new SuscriptorDatosRestModel(suscriptor))
        })

        respuestasHttp.exito(req, res, losSuscriptores, 200)
    })

    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer los suscriptores", 400)
    })
}


const getDetalle= (req, res)=>{

    suscriptorService.detalleSuscriptor(req.params.id)
    .then(suscriptor=>{
        respuestasHttp.exito(req, res, new SuscriptorDatosRestModel(suscriptor), 200)
    })
    .catch( err=>{
        respuestasHttp.error(req, res, err, "Error al leer el suscriptor", 400)
    })
}


const putSuscriptor= (req, res)=>{

    suscriptorService.actualizarSuscriptor(req.params.id, new SuscriptorActualizarReqModel(req.body))

    .then(suscriptor=>{
        respuestasHttp.exito(req, res, new SuscriptorDatosRestModel(suscriptor), 200)
    })
    .catch(err =>{
        respuestasHttp.error(req, res, err, "Error al actualizar el suscriptor", 500)
    })
}


const deleteSuscriptor= (req, res)=>{

    suscriptorService.eliminarSuscriptor(req.params.id)

    .then(()=>{
        respuestasHttp.exito(req, res, "Suscriptor eliminado con exito", 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "error al eliminar el suscriptor", 400)
    })
}


export default { postSuscriptor, getSuscriptor, getDetalle, putSuscriptor, deleteSuscriptor }