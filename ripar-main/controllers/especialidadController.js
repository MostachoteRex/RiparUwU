import respuestasHttp from "../utils/respuestasHttp.js"
import especialidadService from "../services/especialidadService.js";
import { EspecialidadActualizarReqModel, EspecialidadCrearRequestModel, EspecialidadDatosRestModel } from "../models/especialidadModel.js";
import institucionRepository from "../db/repository/institucionRepository.js";

const postEspecialidad= (req, res)=>{

    especialidadService.crearEspecialidad(new EspecialidadCrearRequestModel(req.body), req.user)

    .then( (especialidad)=>{
        respuestasHttp.exito(req, res, new EspecialidadDatosRestModel(especialidad), 201)        
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear la especialidad", 400)
    })
}


const getEspecialidad= (req, res)=>{
    
  especialidadService.leerEspecialidad()

  .then( array =>{

    let lasEspecialidades= []

    array.forEach(especialidad => {

        lasEspecialidades.push(new EspecialidadDatosRestModel(especialidad))
        
    });
      respuestasHttp.exito(req, res, lasEspecialidades, 200)      
  })
  .catch( err =>{
      respuestasHttp.error(req, res, err, "Error al leer las especialidades", 500)      
  })
}


const detalleEspecialidad= (req, res) => {

  especialidadService.detalleEspecialidad(req.params.id)
  .then (especialidad =>{
    respuestasHttp.exito(req, res, new EspecialidadDatosRestModel(especialidad), 200)
  })
  .catch( err =>{
    respuestasHttp.error(req, res, err, "Error al leer la especialidad", 500)
  })
}


const actualizarEspecialidad= (req, res) => {

  especialidadService.actualizarEspecialidad(req.params.id, new EspecialidadActualizarReqModel(req.body))

  .then(especialidad => {
      respuestasHttp.exito(req, res, new EspecialidadDatosRestModel(especialidad), 200)
    })
    .catch(err => {
      respuestasHttp.error(req, res, err, "error al actualizar la especialidad", 400)      
    })
}


const eliminarEspecialidad= (req, res)=>{

  especialidadService.eliminarEspecialidad(req.params.id)

  .then( () =>{
    respuestasHttp.exito(req, res, "especialidad eliminada con exito", 200)
  })
  .catch( err=>{
    respuestasHttp.error(req, res, err, "error al eliminar la especialidad", 400)
  })
}


export default { postEspecialidad, getEspecialidad, detalleEspecialidad, actualizarEspecialidad, eliminarEspecialidad }