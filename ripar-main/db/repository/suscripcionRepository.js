import { db } from "../conexionDB.js";

const crear = (suscripcion) => {

    db.query('INSERT INTO suscripciones SET ?', {idSuscripcion:suscripcion.idSuscripcion, noContrato:suscripcion.noContrato, fechaSuscripcion:suscripcion.fechaSuscripcion, fechaVencimiento:suscripcion.fechaVencimiento, idAsesor:suscripcion.idAsesor, idSuscriptor:suscripcion.idSuscriptor, valor:suscripcion.valor, metodoPago:suscripcion.metodoPago}, (err, results) => {

        if(err){
            console.log('Error al crear la suscripción', err)
        } else {
            console.log('Suscripción creada con éxito')

            db.query('INSERT INTO contabilidad SET ?', {noContrato:suscripcion.noContrato, asesor:suscripcion.idAsesor, suscriptor:suscripcion.idSuscriptor, valor:suscripcion.valor, metodoPago:suscripcion.metodoPago}, (err, results) => {

                if(err){
                    console.log('Error al crear el registro en contabilidad', err)
                } else {
                    console.log('Registro creado con éxito')                        
                }
            })
        }
    })
}

const leer = () => {

    return new Promise((resolve, reject) => {

        db.query("SELECT * FROM suscripciones", (err, results) => {
            if (err) {
                console.error('Error al obtener las suscripciones', err)
                reject(err)
            } else {
                console.log('Suscripciones obtenidos con éxito')
                resolve(results)
            }
        })
    })
}

const detalle = (id) => {

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM suscripciones WHERE idSuscripcion = ?', [id], (err, results) => {
            
            if (err) {
                console.error('Error al obtener la suscripcion', err)
                reject(err);

             } else if (results.length === 0){
              console.error('No se encontro ninguna suscripción', err)
                reject(err);

            } else {
                console.log('Suscripción obtenida con éxito')
                resolve(results[0])
            }
        })
    })
}

const buscarId= (idSuscriptor)=>{

    return new Promise((resolve, reject) => {
  
      db.query('SELECT * FROM suscripciones WHERE idSuscriptor = ?', [idSuscriptor], (err, results) => {
          
        if (err) {
          console.error('Error al obtener el id', err);
          reject(err);
        } 
        else if (results.length === 0){
          console.log('No se encontró ninguna suscripcion con este Id')
          resolve(null)
        } 
        else{
          console.error('Este id ya se encuentra registrado');
          resolve(results[0]) 
        }
      })
    })
}

const buscarPorContrato= (noContrato)=>{

    return new Promise((resolve, reject) => {
  
      db.query('SELECT * FROM suscripciones WHERE noContrato = ?', [noContrato], (err, results) => {
          
        if (err) {
          console.error('Error al obtener la suscripcion por el contrato', err);
          reject(err);
        } 
        else if (results.length === 0){
          console.error('No se encontró ninguna suscripcion con este contrato', err)
          reject(err);
        } 
        else{
          console.log('Este contrato existe');
          resolve(results[0]) 
        }
      })
    })
}

const actualizar = (suscripcionDetalle) => {

    return new Promise ((resolve ,reject )=>{

        db.query('UPDATE suscripciones SET fechaSuscripcion = ?, fechaVencimiento = ?, tipoSuscripcion = ? WHERE idSuscripcion = ?', [suscripcionDetalle.fechaSuscripcion, suscripcionDetalle.fechaVencimiento, suscripcionDetalle.tipoSuscripcion, suscripcionDetalle.idSuscripcion], (err, results)=>{
            if(err){
                console.error('Error al actualizar la suscripción', err)
                reject(err)
            }
            if(results.length === 0){
                console.error('No se encontró ninguna suscripción')
            }
            else {

                db.query('SELECT * FROM suscripciones WHERE idSuscripcion= ?', [suscripcionDetalle.idSuscripcion], (err, results) => {
                    
                    if(err){
                        console.error('Error al obtener la suscripción', err)
                        reject (err)
                    } else {
                        console.log('Suscripción obtenido con éxtio')
                        resolve(results[0])
                    }
                })
            }
        })
    })
}

const eliminar = (id) => {

    return new Promise((resolve, reject)=>{

        db.query('DELETE FROM suscripciones WHERE idSuscripcion = ?', [id], (err, results) =>{
            if(err){
                console.error("Error al borrar la suscripción", err )
                reject(err)
            }
            if(results.length === 0){
                console.error('No se encontró ninguna suscripción', err)
                reject(err)
            } else {
                console.log('Suscripción eliminada con éxito')
                resolve(results)
            }
        })
    })
}

export default { crear, leer, detalle, actualizar, eliminar, buscarId, buscarPorContrato }