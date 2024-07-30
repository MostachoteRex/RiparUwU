import { db } from "../conexionDB.js";

const crear = (convenio) => {
  
    db.query('INSERT INTO convenio SET ?',{idConvenio:convenio.idConvenio, idEspecialidad:convenio.idEspecialidad, idInstitucion:convenio.idInstitucion, nombreDr:convenio.nombreDr, tarifaParticular:convenio.tarifaParticular, tarifaMultipreventiva:convenio.tarifaMultipreventiva, telefono:convenio.telefono, email:convenio.email}, (err, results) => {

        if (err) {
        console.error('Error al crear la institucion', err);
      } else {
        console.log('institucion creada con éxito');
      }
    });
  };

const leer = () => {

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM convenio', (err, results) => {
            if (err) {
                console.error('Error al obtener los convenios', err);
                reject(err); 
            } else {
                console.log('Convenios obtenidas con éxito');
                resolve(results);
            }
        });
    });
}

const detalle= (id)=>{

    return new Promise((resolve, reject)=>{

        db.query('SELECT * FROM convenio WHERE idConvenio = ?', [id], (err, results)=>{

            if(err){
                console.error('Error al obtener el convenio', err)
                reject(err)
            } else if(results.length === 0 ){
                console.error('No se encontro ningun convenio', err)
                reject(err)
            } else {
                console.log('Convenio obtenido con exito')
                resolve(results[0])
            }
        })
    })
}

const buscarPorInstitucion= (id)=>{
    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM convenio WHERE idInstitucion = ?', [id], (err, results) => {
            
            if (err) {
                console.error('Error al obtener los convenios', err)
                reject(err);

             } else if (results.length === 0){
              console.error('No se encontro ningun convenio', err)
                reject(err); 

            } else {
                console.log('convenios obtenidos con éxito')
                resolve(results);
            }
        })
    })
}

const actualizar= (convenioDetalle)=>{

    return new Promise((resolve, reject)=>{

        const idConvenio = convenioDetalle.idConvenio

        db.query('UPDATE convenio SET idEspecialidad = ?, idInstitucion = ?, nombreDR = ?, tarifaParticular = ?, tarifaMultipreventiva = ? WHERE  idConvenio = ?', [convenioDetalle.idEspecialidad, convenioDetalle.idInstitucion, convenioDetalle.nombreDr, convenioDetalle.tarifaParticular, convenioDetalle.tarifaMultipreventiva, idConvenio], (err, results)=>{
            if(err){
                console.error('Error al actualizar el convenio', err)
                reject(err)
            }
            if(results.length === 0) {
                console.error('No se encontró ningun convenio', err)
                reject(err)
            } else {
                
                db.query('SELECT * FROM convenio WHERE idConvenio = ?', [convenioDetalle.idConvenio], (err, results)=>{
                    if(err){
                        console.error('Error al obtener el convenio', err)
                        reject(err)
                    } else{
                        console.log('Convenio obtenido con éxito', err)
                        resolve(results[0])
                    }
                })
            }
        })
    })
}

const eliminar= (id)=>{

    return new Promise((resolve, reject)=>{

        db.query('DELETE FROM convenio WHERE idConvenio = ?', [id], (err, results)=>{
            if(err){
                console.error('Error al eliminar el convenio', err)
                reject(err)
            } else {
                console.log('convenio eliminado con exito')
                resolve(results)
            }
        })
    })
}

export default {crear, leer, detalle, buscarPorInstitucion, actualizar, eliminar}