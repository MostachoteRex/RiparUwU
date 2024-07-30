import LocalStrategy from "passport-local"
import usuarioService from "../services/usuarioService.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import constantesSeguridad from "./constantesSeguridad.js"
import { variables } from "../utils/variables.js"

const crearToken = (usuario)=>{

    const payload={
        sub: usuario.documento,
        exp: new Date().getTime() + constantesSeguridad.FECHA_EXPIRACION
    }
    return jwt.sign(payload, variables.TOKEN_SECRETO)
}

const localEstrategia = new LocalStrategy({usernameField: "documento", passwordField: "password"}, 
    (documento, password, callback)=>{

        usuarioService.leerUsuario(documento)
        .then(async (usuario)=>{
            const similar = await bcrypt.compare(password, usuario.passwordEncriptada)

            if(!similar){
                callback(null, {error:"contraseña incorrecta"})
            } else {
                const token= crearToken(usuario)
                callback(null, usuario, token)
            }
        })
        .catch( err=>{
            callback(null, {error:"No se encontró el usuario"})
        })

})

export default { localEstrategia }
