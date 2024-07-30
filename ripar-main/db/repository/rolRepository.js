import { db } from "../conexionDB.js";

const crear = (rol) => {
  
    db.query('INSERT INTO rol SET ?',{nombre:rol.nombre}, (err, results) => {

        if (err) {
        console.error('Error al crear el rol', err);
      } else {
        console.log('Rol creado con éxito');
      }
    })
  }

const leer = () => {

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM rol', (err, results) => {
            if (err) {
                console.error('Error al obtener los roles', err);
                reject(err); 
            } else {
                /* console.log('Roles obtenidos con éxito'); */
                resolve(results);
            }
        })
    })
}

const detalle= (id)=>{

    return new Promise((resolve, reject)=>{

        db.query('SELECT * FROM rol WHERE idRol = ?', [id], (err, results)=>{

            if(err){
                console.error('Error al obtener el rol', err)
                reject(err)
            } else if(results.length === 0 ){
                console.error('No se encontro ningun rol', err)
                reject(err)
            } else {
                console.log('rol obtenido con exito')
                resolve(results[0])
            }
        })
    })
}

const actualizar= (rolDetalle)=>{
    
    return new Promise((resolve, reject)=>{

        db.query('UPDATE rol SET estado = ? WHERE idRol = ?', [rolDetalle.estado, rolDetalle.idRol], (err, results)=>{
            if(err){
                console.error('Error al actualizar el rol', err)
                reject(err)
            }
            if(results.length === 0) {
                console.error('No se encontró ningun rol', err)
                reject(err)
            } else {
                
                db.query('SELECT * FROM rol WHERE idRol = ?', [rolDetalle.idRol], (err, results)=>{
                    if(err){
                        console.error('Error al obtener el rol', err)
                        reject(err)
                    } else{
                        console.log('rol obtenido con éxito', err)
                        resolve(results[0])
                    }
                })
            }
        })
    })
}

const eliminar= (id)=>{

    return new Promise((resolve, reject)=>{

        db.query('DELETE FROM rol WHERE idRol = ?', [id], (err, results)=>{
            if(err){
                console.error('Error al eliminar el rol', err)
                reject(err)
            } else {
                console.log('rol eliminado con exito')
                resolve(results)
            }
        })
    })
}

export default {crear, leer, detalle, actualizar, eliminar}