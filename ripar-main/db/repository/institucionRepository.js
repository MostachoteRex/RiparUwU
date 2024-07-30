import { db } from "../conexionDB.js";

const crear = (institucion) => {
  
    db.query('INSERT INTO institucion SET ?',{idInstitucion:institucion.idInstitucion, nombre:institucion.nombre, direccion:institucion.direccion, idEspecialidad:institucion.idEspecialidad}, (err, results) => {

        if (err) {
            console.error('Error al crear la institucion', err);
        } else {
            console.log('institucion creada con éxito')
      }
    })
  }

const leer = () => {

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM institucion', (err, results) => {
            if (err) {
                console.error('Error al obtener las instituciones', err);
                reject(err)
            } else {
                console.log('Instituciones obtenidas con éxito');
                resolve(results)
            }
        })
    })
}

const detalle= (id)=>{

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM institucion WHERE idInstitucion = ?', [id], (err, results) => {
            
            if (err) {
                console.error('Error al obtener la institucion', err)
                reject(err);

             } else if (results.length === 0){
              console.error('No se encontro ninguna institucion', err)
                reject(err); 

            } else {
                console.log('Institucion obtenida con éxito')
                resolve(results[0])
            }
        })
    })
}

const buscarPorNombre= (nombre)=>{

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM institucion WHERE nombre = ?', [nombre], (err, results) => {
            
            if (err) {
                console.error('Error al obtener la lainstitución', err)
                reject(err);

             } else if (results.length === 0){
                console.log('No se encontró ninguna institución')
                resolve(null)
            } else {
                console.error('Esta institución se encuentra registrada')
                resolve(results)
            }
        });
    });
}

const buscarEspecialidad= (id)=>{
    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM institucion WHERE idEspecialidad = ?', [id], (err, results) => {
            
            if (err) {
                console.error('Error al obtener las instituciones', err)
                reject(err);

             } else if (results.length === 0){
              console.error('No se encontro ninguna institucion', err)
                reject(err); 

            } else {
                console.log('Instituciones obtenidas con éxito')
                resolve(results);
            }
        })
    })
} 

const actualizar= (institucionDetalle)=>{

    return new Promise((resolve, reject)=>{

        const idInstitucion = institucionDetalle.idInstitucion

        db.query('UPDATE institucion SET nombre = ?, direccion = ?, idespecialidad = ? WHERE idInstitucion = ?', [institucionDetalle.nombre, institucionDetalle.direccion, institucionDetalle.idEspecialidad, idInstitucion], (err, results) => {
            if(err){
                console.error('Error al actualizar la institucion', err)
                reject(err)
            }
            if(results.length === 0) {
                console.error('No se encontró ninguna especialidad para actualizar', err)
                reject(err)
            }else{

                db.query('SELECT * FROM institucion WHERE idInstitucion = ?', [institucionDetalle.idInstitucion], (err, results) => {
        
                    if (err) {
                        console.error('Error al obtener la institucion', err)
                        reject(err)
            
                    } else {
                        console.log('Institucion obtenida con éxito')
                        resolve(results[0])
                    }
                })
            }
        })
    })
}

const eliminar = (id) => {
    
    return new Promise((resolve, reject) => {

        db.query('DELETE FROM institucion WHERE idInstitucion = ?', [id], (err, results) => {
            if (err) {
                console.error('Error al eliminar la institucion', err)
                reject(err)
            }    
            if(results.length === 0){
                console.error('No se encontro ninguna institucion', err)
                reject(err)
            } else {
                console.log('institucion eliminada con éxito')
                resolve(results)
            }
        })
    })
}

export default {crear, leer, buscarPorNombre, detalle, actualizar, eliminar, buscarEspecialidad}