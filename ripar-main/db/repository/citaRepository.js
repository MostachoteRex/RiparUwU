import { db } from "../conexionDB.js";

const crear = (cita) => {

    db.query('INSERT INTO citas SET ?', {idCita:cita.idCita, idSuscripcion:cita.idSuscripcion, idPaciente:cita.paciente, idConvenio:cita.idConvenio, fechaCita:cita.fechaCita, horaCita:cita.horaCita, ahorro:cita.ahorro, idUsuario:cita.idUsuario}, (err, results) => {

        if(err){
            console.log('Error al crear la cita', err)
        } else {
            console.log('Cita creada con éxito')
        }
    })
}

const leer = () => {

    return new Promise((resolve, reject) => {

        db.query("SELECT * FROM citas", (err, results) => {
            if (err) {
                console.error('Error al obtener las citas', err)
                reject(err)
            } else {
                console.log('Citas obtenidos con éxito')
                resolve(results)
            }
        })
    })
}

const detalle = (id) => {

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM citas WHERE idCita = ?', [id], (err, results) => {
            
            if (err) {
                console.error('Error al obtener la cita', err)
                reject(err);

             } else if (results.length === 0){
              console.error('No se encontro ninguna cita', err)
                reject(err); 

            } else {
                console.log('Cita obtenida con éxito')
                resolve(results[0])
            }
        })
    })
}

const buscarPaciente = (id) => {

    return new Promise((resolve, reject) => {

        db.query('SELECT idSuscriptor, documento, nombre, primerApellido, segundoApellido FROM suscriptores WHERE idSuscriptor = ? UNION ALL SELECT idBeneficiario, documento, nombre, primerApellido, segundoApellido FROM beneficiarios WHERE idBeneficiario = ?', [id, id], (err, results) => {
            
            if (err) {
                console.error('Error al obtener el paciente', err)
                reject(err);

             } else if (results.length === 0){
              console.error('No se encontro ningún paciente', err)
                reject(err); 

            } else {
                console.log('Paciente obtenido con éxito')
                resolve(results[0])
            }
        })
    })
}

const actualizar = (citaDetalle) => {

    return new Promise ((resolve ,reject )=>{
    
        db.query('UPDATE citas SET fechaCita = ?, horaCita = ? WHERE idCita = ?', [citaDetalle.fechaCita, citaDetalle.horaCita, citaDetalle.idCita], (err, results)=>{
            if(err){
                console.error('Error al actualizar la cita', err)
                reject(err)
            }
            if(results.length === 0){
                console.error('No se encontró ninguna cita')
            }
            else {
    
                db.query('SELECT * FROM citas WHERE idCita = ?', [citaDetalle.idCita], (err, results) => {
                        
                    if(err){
                        console.error('Error al obtener la cita', err)
                        reject (err)
                    } else {
                        console.log('Cita obtenida con éxtio')
                        resolve(results[0])
                    }
                })
            }
        })
    })
}

const eliminar = (id) => {

    return new Promise((resolve, reject)=>{

        db.query('DELETE FROM citas WHERE idCita = ?', [id], (err, results) =>{
            if(err){
                console.error("Error al borrar la cita", err )
                reject(err)
            }
            if(results.length === 0){
                console.error('No se encontró ninguna cita', err)
                reject(err)
            } else {
                console.log('Cita eliminada con éxito')
                resolve(results)
            }
        })
    })
}

export default {crear, leer, detalle, actualizar, buscarPaciente, eliminar}