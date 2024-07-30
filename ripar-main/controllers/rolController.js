import respuestasHttp from "../utils/respuestasHttp.js"
import rolService from "../services/rolService.js"
import { RolCrearRequestModel, RolDatosRestModel, RolActualizarReqModel } from "../models/rolModel.js"

const postRol= (req, res)=>{

    rolService.crearRol(new RolCrearRequestModel(req.body), req.user)

    .then( (rol)=>{
        respuestasHttp.exito(req, res, new RolDatosRestModel(rol), 201)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear el rol", 400)
        console.log(err)
    })
}


const getRol= (req, res) => {

    rolService.leerRol()

    .then(array=>{
        let losRoles= []
        array.forEach(rol => {
            losRoles.push(new RolDatosRestModel(rol))
        })
        respuestasHttp.exito(req, res, losRoles, 201)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer los roles", 400)
        console.log(err)
    })
}


const getDetalle= (req, res) => {

    rolService.detalleRol(req.params.id)
    .then (rol =>{
      respuestasHttp.exito(req, res, new RolDatosRestModel(rol), 200)
    })
    .catch( err =>{
      respuestasHttp.error(req, res, err, "Error al leer el rol", 500)
    })
}


const putRol= (req, res) => {

    rolService.actualizarRol(req.params.id, new RolActualizarReqModel(req.body))
  
    .then(rol => {
        respuestasHttp.exito(req, res, new RolDatosRestModel(rol), 200)
  
      })
      .catch(err => {
        respuestasHttp.error(req, res, err, "error al actualizar el rol", 400)
        console.log(err)
      })
}
  

const deleteRol= (req, res)=>{

    rolService.eliminarRol(req.params.id)
  
    .then( () =>{
      respuestasHttp.exito(req, res, "rol eliminado con exito", 200)
    })
    .catch( err=>{
      respuestasHttp.error(req, res, err, "error al eliminar el rol", 400)
    })
}

  
export default { postRol, getRol, getDetalle, putRol, deleteRol }