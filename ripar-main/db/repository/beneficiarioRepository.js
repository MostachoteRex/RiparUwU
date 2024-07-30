import { db } from "../conexionDB.js";

const crear = (beneficiario) => {

    db.query('INSERT INTO beneficiarios SET ?', {idBeneficiario:beneficiario.idBeneficiario, nombre:beneficiario.nombre, primerApellido:beneficiario.primerApellido, segundoApellido:beneficiario.segundoApellido, documento:beneficiario.documento, idSuscriptor:beneficiario.idSuscriptor}, (err, results) => {

        if(err){
            console.log('Error al crear el beneficiario', err)
        } else {
            console.log('Beneficiario creado con éxito')
        }
    })
}

const leer = () => {

    return new Promise((resolve, reject) => {

        db.query("SELECT * FROM beneficiarios", (err, results) => {
            if (err) {
                console.error('Error al obtener los beneficiarios', err)
                reject(err)
            } else {
                console.log('Beneficiarios obtenidos con éxito')
                resolve(results)
            }
        })
    })
}

const buscarDocumento= (documento)=>{

    return new Promise((resolve, reject) => {
  
      db.query('SELECT * FROM beneficiarios WHERE documento = ?', [documento], (err, results) => {
          
        if (err) {
          console.error('Error al obtener el documento', err)
          reject(err);
        } 
        else if (results.length === 0){
          console.log('No se encontró ningun documento')
          resolve(null)
        } 
        else{
          console.error('Este documento ya se encuentra registrado');
          resolve(results[0]) 
        }
      })
    })
}

const buscarSuscriptor = (id) =>{

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM beneficiarios WHERE idSuscriptor = ?', [id], (err, results) => {
            
            if (err) {
                console.error('Error al obtener los beneficiarios', err)
                reject(err);
            }
            else {
                console.log('Beneficiarios obtenidos con éxito')
                resolve(results)
            }
        })
    })

}

const detalle = (id) => {

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM beneficiarios WHERE idBeneficiario = ?', [id], (err, results) => {
            
            if (err) {
                console.error('Error al obtener los beneficiarios', err)
                reject(err);

             } else if (results.length === 0){
              console.error('No se encontro ningun beneficiario', err)
                reject(err); 

            } else {
                console.log('Beneficiario obtenido con éxito')
                resolve(results[0])
            }
        })
    })
}

const actualizar = (beneficiarioDetalle) => {

    return new Promise ((resolve ,reject )=>{

        db.query('UPDATE beneficiarios SET nombre = ?, primerApellido = ?, segundoApellido = ?, documento = ?, idSuscriptor = ? WHERE idBeneficiario = ?', [beneficiarioDetalle.nombre, beneficiarioDetalle.primerApellido, beneficiarioDetalle.segundoApellido, beneficiarioDetalle.documento, beneficiarioDetalle.idSuscriptor, beneficiarioDetalle.idBeneficiario], (err, results)=>{
            if(err){
                console.error('Error al actualizar el beneficiario', err)
                reject(err)
            }
            if(results.length === 0){
                console.error('No se encontró ningún beneficiario')
            }
            else {

                db.query('SELECT * FROM beneficiarios WHERE idBeneficiario = ?', [beneficiarioDetalle.idBeneficiario], (err, results) => {
                    
                    if(err){
                        console.error('Error al obtener el beneficiario', err)
                        reject (err)
                    } else {
                        console.log('Beneficiarios obtenido con éxtio')
                        resolve(results[0])
                    }
                })
            }
        })
    })
}

const eliminar = (id) => {

    return new Promise((resolve, reject)=>{

        db.query('DELETE FROM beneficiarios WHERE idBeneficiario = ?', [id], (err, results) =>{
            if(err){
                console.error("Error al borrar el Beneficiario", err )
                reject(err)
            }
            if(results.length === 0){
                console.error('No se encontró ningun beneficiarios', err)
                reject(err)
            } else {
                console.log('Beneficiarios eliminado con éxito')
                resolve(results)
            }
        })
    })
}

export default {crear, leer, detalle, actualizar, eliminar, buscarDocumento, buscarSuscriptor}