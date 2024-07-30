import { db } from "../conexionDB.js";

const crear = (suscriptor) => {

    db.query('INSERT INTO suscriptores SET ?', {idSuscriptor:suscriptor.idSuscriptor, documento:suscriptor.documento, nombre:suscriptor.nombre, primerApellido:suscriptor.primerApellido, segundoApellido:suscriptor.segundoApellido, actividadEconomica:suscriptor.actividadEconomica, telefono:suscriptor.telefono, fechaNacimiento:suscriptor.fechaNacimiento, email:suscriptor.email, direccion:suscriptor.direccion, barrio:suscriptor.barrio, ciudad:suscriptor.ciudad}, (err, results) => {

        if(err){
            console.log('Error al crear el suscriptor', err)
        } else {
            console.log('Suscriptor creado con éxito')
        }
    })
}

const leer = () => {

    return new Promise((resolve, reject) => {

        db.query("SELECT * FROM suscriptores", (err, results) => {
            if (err) {
                console.error('Error al obtener los suscriptores', err)
                reject(err)
            } else {
                console.log('Suscriptores obtenidos con éxito')
                resolve(results)
            }
        })
    })
}

const buscarDocumento= (documento)=>{

    return new Promise((resolve, reject) => {
  
      db.query('SELECT * FROM suscriptores WHERE documento = ?', [documento], (err, results) => {
          
        if (err) {
          console.error('Error al obtener el documento', err);
          reject(err);
        } 
        else if (results.length === 0){
          console.log('No se encontró ningún documento')
          resolve(null)
        } 
        else{
          console.error('Este documento ya se encuentra registrado');
          resolve(results[0]) 
        }
      })
    })
}

const buscarEmail = (email) => {

    return new Promise((resolve, reject) => {

      db.query('SELECT * FROM suscriptores WHERE email = ?', [email], (err, results) => {
          
          if (err) {
              console.error('Error al obtener el email', err)
              reject(err);
  
           } 
           else if (results.length === 0){
            console.log('No se encontró ningún email')
            resolve(null)
          }
          else{
            console.error('Este email ya se encuentra registrado');
            resolve(results[0]) 
          }
      })
    })
}

const detalle = (id) => {

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM suscriptores WHERE idSuscriptor = ?', [id], (err, results) => {
            
            if (err) {
                console.error('Error al obtener los suscriptores', err)
                reject(err);

             } else if (results.length === 0){
              console.error('No se encontro ningun suscriptor', err)
                reject(err); 

            } else {
                console.log('Suscriptor obtenido con éxito')
                resolve(results[0])
            }
        })
    })
}

const actualizar = (suscriptorDetalle) => {

    return new Promise ((resolve ,reject )=>{

        db.query('UPDATE suscriptores SET documento = ?, nombre = ?, primerApellido = ?, segundoApellido = ?, actividadEconomica = ?, telefono = ?, fechaNacimiento = ?, email = ?, direccion = ?, barrio = ?, ciudad = ? WHERE idSuscriptor = ?', [suscriptorDetalle.documento, suscriptorDetalle.nombre, suscriptorDetalle.primerApellido, suscriptorDetalle.segundoApellido, suscriptorDetalle.actividadEconomica, suscriptorDetalle.telefono, suscriptorDetalle.fechaNacimiento, suscriptorDetalle.email, suscriptorDetalle.direccion, suscriptorDetalle.barrio, suscriptorDetalle.ciudad, suscriptorDetalle.idSuscriptor], (err, results)=>{
            if(err){
                console.error('Error al actualizar el suscriptor', err)
                reject(err)
            }
            if(results.length === 0){
                console.error('No se encontró ningún suscriptor')
            }
            else {

                db.query('SELECT * FROM suscriptores WHERE idSuscriptor = ?', [suscriptorDetalle.idSuscriptor], (err, results) => {
                    
                    if(err){
                        console.error('Error al obtener el suscriptor', err)
                        reject (err)
                    } else {
                        console.log('Suscriptor obtenido con éxtio')
                        resolve(results[0])
                    }
                })
            }
        })
    })
}

const eliminar = (id) => {

    return new Promise((resolve, reject)=>{

        db.query('DELETE FROM suscriptores WHERE idSuscriptor = ?', [id], (err, results) =>{
            if(err){
                console.error("Error al borrar el suscriptor", err )
                reject(err)
            }
            if(results.length === 0){
                console.error('No se encontró ningun suscriptor', err)
                reject(err)
            } else {
                console.log('Suscriptor eliminado con éxito')
                resolve(results)
            }
        })
    })
}

export default {crear, leer, detalle, actualizar, eliminar, buscarDocumento, buscarEmail}