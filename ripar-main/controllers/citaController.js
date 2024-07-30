import respuestasHttp from "../utils/respuestasHttp.js"
import citaService from "../services/citaService.js"
import { CitaCrearRequestModel, CitaDatosRestModel, CitaActualizarReqModel } from "../models/citaModel.js"

const postCita= (req, res)=>{

    citaService.crearCita(new CitaCrearRequestModel(req.body), req.user)

    .then( (cita)=>{
        respuestasHttp.exito(req, res, new CitaDatosRestModel(cita), 201)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear la cita", 400)
        console.log(err)
    })
}


const getCita= (req, res)=>{

    citaService.leerCita()
    .then( array =>{
        let lasCitas = []
        array.forEach(citas => {
            lasCitas.push(new CitaDatosRestModel(citas))
        })
        respuestasHttp.exito(req, res, lasCitas, 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer las citas", 400)
    })
}


const getDetalle= (req, res)=>{

    citaService.detalleCita(req.params.id)
    .then(cita=>{
        respuestasHttp.exito(req, res, new CitaDatosRestModel(cita), 200)
    })
    .catch( err=>{
        respuestasHttp.error(req, res, err, "Error al leer la cita", 400)
    })
}


const putCita= (req, res)=>{

    citaService.actualizarCita(req.params.id, new CitaActualizarReqModel(req.body))

    .then(cita=>{
        respuestasHttp.exito(req, res, new CitaDatosRestModel(cita), 200)
    })
    .catch(err =>{
        respuestasHttp.error(req, res, err, "Error al actualizar la cita", 500)
    })
}


const deleteCita= (req, res)=>{

    citaService.eliminarCita(req.params.id)

    .then(()=>{
        respuestasHttp.exito(req, res, "Cita eliminada con exito", 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "error al eliminar la cita", 400)
        console.log(err)
    })
}

export default { postCita, getCita, getDetalle, putCita, deleteCita }