import respuestasHttp from "../utils/respuestasHttp.js"
import beneficiarioService from "../services/beneficiarioService.js"
import { BeneficiarioCrearRequestModel, BeneficiarioDatosRestModel, BeneficiarioActualizarReqModel, BeneficiarioEntity } from "../models/beneficiarioModel.js"

const postBenenficiario= (req, res)=>{

    beneficiarioService.crearBeneficiario(new BeneficiarioCrearRequestModel(req.body), req.user)

    .then( (beneficiario)=>{        
        respuestasHttp.exito(req, res, new BeneficiarioDatosRestModel(beneficiario), 201)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al crear el beneficiario", 400)
    })
}


const getBeneficiario= (req, res)=>{

    beneficiarioService.leerBeneficiario()

    .then( array =>{

        let losBeneficiarios = []

        array.forEach(beneficiario => {
            losBeneficiarios.push(new BeneficiarioDatosRestModel(beneficiario))
        })

        respuestasHttp.exito(req, res, losBeneficiarios, 200)
    })

    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer los beneficiarios", 400)
    })
}


const getPorSuscriptor= (req, res) => {

    beneficiarioService.buscarSuscriptor(req.params.id)
  
    .then(array=>{
        let losBeneficiarios= []
        array.forEach(beneficiario => {
            losBeneficiarios.push(new BeneficiarioEntity(beneficiario))
        })
        respuestasHttp.exito(req, res, losBeneficiarios, 201)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "Error al leer los beneficiarios", 400)
    })
  }

  
const getDetalle= (req, res)=>{

    beneficiarioService.detalleBeneficiario(req.params.id)
    .then(beneficiario=>{
        respuestasHttp.exito(req, res, new BeneficiarioDatosRestModel(beneficiario), 200)
    })
    .catch( err=>{
        respuestasHttp.error(req, res, err, "Error al leer el beneficiarios", 400)
    })
}


const putBeneficiario= (req, res)=>{

    beneficiarioService.actualizarBeneficiario(req.params.id, new BeneficiarioActualizarReqModel(req.body))

    .then(beneficiario=>{
        respuestasHttp.exito(req, res, new BeneficiarioDatosRestModel(beneficiario), 200)
    })
    .catch(err =>{
        respuestasHttp.error(req, res, err, "Error al actualizar el beneficiario", 500)
    })
}


const deleteBeneficiario= (req, res)=>{

    beneficiarioService.eliminarBeneficiario(req.params.id)

    .then(()=>{
        respuestasHttp.exito(req, res, "Beneficiario eliminado con exito", 200)
    })
    .catch(err=>{
        respuestasHttp.error(req, res, err, "error al eliminar el beneficiario", 400)
    })
}

export default { postBenenficiario, getBeneficiario, getPorSuscriptor, getDetalle, putBeneficiario, deleteBeneficiario }