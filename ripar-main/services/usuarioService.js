import usuarioRepository from "../db/repository/usuarioRepository.js"
import rolRepository from "../db/repository/rolRepository.js"
import crypto from "crypto"
import bcrypt from "bcrypt"

const crearUsuario= (usuario)=>{

    return new Promise(async(resolve,reject)=>{

        if(!usuario.nombre || !usuario.apellido || !usuario.documento || !usuario.email || !usuario.password || !usuario.idRol){
            reject("Faltan datos")
        }
        else if(await usuarioRepository.buscarDocumento(usuario.documento) !==null){
            reject("Este documento ya se encuentra registrado")
        } 
        else if(await usuarioRepository.buscarEmail(usuario.email) !==null){
            reject("Este email ya se encuentra registrado")
        }
        else{
        usuario.idUsuario= crypto.randomUUID()
        usuario.passwordEncriptada= bcrypt.hashSync(usuario.password, 10)

        usuarioRepository.crear(usuario)
        usuario.rolEntity = await rolRepository.detalle(usuario.idRol)
        resolve(usuario)
        }
    })

}

const leerUsuarios = () => {

    return new Promise((resolve, reject) => {

        usuarioRepository.leer()

            .then(async array => {
                let usuarios=[]
                for await (const usuario of array){
                    const rol = await rolRepository.detalle(usuario.idRol)
                    usuario.rolEntity = rol
                    usuarios.push(usuario)
                }
                resolve(usuarios);
            })
            .catch(err => {
                reject("No es posible leer los usuarios")
            })
    })
}

const leerUsuario= (documento)=>{

    return new Promise((resolve, reject)=>{

        usuarioRepository.buscarDocumento(documento)
        .then( usuario=>{
            if(usuario == null){
                reject("No se encuentra el usuario")
            }
            resolve(usuario)
        })
    })
}

const buscarPorRol = (id) => {
  
    return new Promise((resolve, reject) => {
      
      usuarioRepository.buscarRol(id)

      .then(async array => {
        let usuarios=[]
        for await (const usuario of array){
            const rol = await rolRepository.detalle(usuario.idRol)
            usuario.rolEntity = rol
            usuarios.push(usuario)
        }
        resolve(usuarios);
        })
        .catch(err => {
            reject("No es posible leer los usuarios por rol")
        })
    })
}

const detalleUsuario=(id)=>{
    return new Promise ((resolve , reject)=> {

        resolve(usuarioRepository.detalle(id))        
    })
}

const actualizarUsuario=(id, usuario)=>{

    return new Promise(async (resolve, reject)=>{

        if(!usuario.nombre || !usuario.apellido || !usuario.documento || !usuario.email || !usuario.idRol){
            reject("Faltan datos")
        }
        else if(await usuarioRepository.buscarDocumento(usuario.documento) !==null){
            reject("Este documento ya se encuentra registrado")
        } 

        else if(await usuarioRepository.buscarEmail(usuario.email) !==null){
            reject("Este email ya se encuentra registrado")
        }
        else{

            const usuarioDetalle = await usuarioRepository.detalle(id)
            usuarioDetalle.nombre = usuario.nombre
            usuarioDetalle.apellido = usuario.apellido
            usuarioDetalle.documento = usuario.documento
            usuarioDetalle.email = usuario.email
            usuarioDetalle.idRol = usuario.idRol

            const usuarioData = await usuarioRepository.actualizar(usuarioDetalle)
        
            resolve(usuarioData)
        }
    })  
}

const actualizarPassword=(id, usuario)=>{
    console.log(usuario)

    return new Promise ( async (resolve, reject)=>{

        if(!usuario.newPassword || !usuario.confirPassword){
            reject("Faltan datos")
        }
        else if(usuario.newPassword !== usuario.confirPassword){
            reject("Las contraseñas no coiciden")
        }
        else{
            const usuarioDetalle = await usuarioRepository.detalle(id)
            usuarioDetalle.passwordEncriptada= bcrypt.hashSync(usuario.newPassword, 10)
            const passwordActualizada = await usuarioRepository.actualizarPassword(usuarioDetalle);
            resolve(passwordActualizada)
        }
    })
}

const eliminarUsuario = (id) =>{

    return new Promise((resolve, reject)=>{
        
        resolve(usuarioRepository.eliminar(id))
    })
}

export default {crearUsuario, leerUsuario, leerUsuarios, buscarPorRol, detalleUsuario, actualizarUsuario, actualizarPassword, eliminarUsuario}