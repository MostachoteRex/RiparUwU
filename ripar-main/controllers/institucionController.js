import respuestasHttp from "../utils/respuestasHttp.js"
import institucionService from "../services/institucionService.js";
import { InstitucionCrearRequestModel, InstitucionDatosRestModel, InstitucionActualizarReqModel } from "../models/institucionModel.js";

const postInstitucion= (req, res)=>{

    institucionService.crearInstitucion(new InstitucionCrearRequestModel(req.body), req.user)

    .then( (institucion)=>{
        respuestasHttp.exito(req, res, new InstitucionDatosRestModel(institucion), 201)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear la institucion", 400)
        console.log(err)
    })
}


const getInstitucion= (req, res) => {

    institucionService.leerInstitucion()

    .then(array=>{
        let lasInstituciones= []
        array.forEach(institucion => {
            lasInstituciones.push(new InstitucionDatosRestModel(institucion))
        });
        respuestasHttp.exito(req, res, lasInstituciones, 201)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer las instituciones", 400)
        console.log(err)
    })
}


const getPorEspecialidad= (req, res) => {

  institucionService.buscarEspecialidad(req.params.id)

  .then(array=>{    
      let lasInstituciones= []
      array.forEach(institucion => {
          lasInstituciones.push(new InstitucionDatosRestModel(institucion))
      });
      respuestasHttp.exito(req, res, lasInstituciones, 201)
  })
  .catch(err=>{
      respuestasHttp.error(req, res, err, "Error al leer las instituciones", 400)
      console.log(err)
  })
}


const getDetalle= (req, res) => {

    institucionService.detalleInstitucion(req.params.id)
    .then (institucion =>{
      respuestasHttp.exito(req, res, new InstitucionDatosRestModel(institucion), 200)
    })
    .catch( err =>{
      respuestasHttp.error(req, res, err, "Error al leer la institucion", 500)
    })
}


const putInstitucion= (req, res) => {

    institucionService.actualizarInstitucion(req.params.id, new InstitucionActualizarReqModel(req.body))
  
    .then(institucion => {
        respuestasHttp.exito(req, res, new InstitucionDatosRestModel(institucion), 200)
      })
      .catch(err => {
        respuestasHttp.error(req, res, err, "error al actualizar la institucion", 400)
      })
}
  

const deleteInstitucion= (req, res)=>{

    institucionService.eliminarInstitucion(req.params.id)
  
    .then( () =>{
      respuestasHttp.exito(req, res, "institucion eliminada con exito", 200)
    })
    .catch( err=>{
      respuestasHttp.error(req, res, err, "error al eliminar la institucion", 400)
    })
}

  
export default { postInstitucion, getInstitucion, getPorEspecialidad, getDetalle, putInstitucion, deleteInstitucion }
