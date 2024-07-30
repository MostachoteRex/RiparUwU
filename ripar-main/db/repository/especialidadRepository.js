import { db } from "../conexionDB.js";

const crear = (especialidad) => {
  
    db.query('INSERT INTO especialidad SET ?',{idEspecialidad:especialidad.idEspecialidad, nombre:especialidad.nombre}, (err, results) => {

        if (err) {
            console.error('Error al crear la especialidad:', err)
        } else {
            console.log('Especialidad creada con éxito')
      }
    })
  }

  const leer = () => {

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM especialidad',(err, results) => {
            if (err) {
                console.error('Error al obtener las especialidades', err)
                reject(err); 
            } else {
                console.log('Especialidades obtenidas con éxito')
                resolve(results)
            }
        })
    })
}


const detalle= (id)=>{

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM especialidad WHERE idEspecialidad = ?', [id], (err, results) => {
            
            if (err) {
                console.error('Error al obtener la especialidad', err)
                reject(err);

             } else if (results.length === 0){
              console.error('No se encontro ninguna especialidad', err);
                reject(err); 

            } else {
                console.log('Especialidad obtenida con éxito')
                resolve(results[0]);
            }
        });
    });
}

const buscarPorNombre= (nombre)=>{

    return new Promise((resolve, reject) => {

        db.query('SELECT * FROM especialidad WHERE nombre = ?', [nombre], (err, results) => {
            
            if (err) {
                console.error('Error al obtener la especialidad', err)
                reject(err);

             } else if (results.length === 0){
                console.log('No se encontró ninguna especialidad')
                resolve(null)
            } else {
                console.error('Esta especialidad ya se encuentra registrada')
                resolve(results[0])
            }
        });
    });
}

const actualizar = (especialidadDetalle) => {

    return new Promise((resolve, reject) => {
                
        db.query('UPDATE especialidad SET nombre = ? WHERE idEspecialidad = ?', [especialidadDetalle.nombre, especialidadDetalle.idEspecialidad], (err, results) => {
            if (err) {
                console.error('Error al actualizar la especialidad', err);
                reject(err);
            }
            if (results.length === 0) {
                console.error('No se encontró ninguna especialidad para actualizar', err);
                reject(err);
            } else {

                db.query('SELECT * FROM especialidad WHERE idEspecialidad = ?', [especialidadDetalle.idEspecialidad], (err, results) => {
            
                if (err) {
                    console.error('Error al obtener la especialidad', err)
                    reject(err);
                
                } else {
                    console.log('Especialidad obtenida con éxito');
                    resolve(results[0]); 
                    }
                })
            }
        })
    })
   }
   
   const eliminar = (id) => {
    
    return new Promise((resolve, reject) => {

        db.query('DELETE FROM especialidad WHERE idEspecialidad = ?', [id], (err, results) => {
            if (err) {
                console.error('Error al eliminar la especialidad', err)
                reject(err)
            }    
            if(results.length === 0){
            console.error('No se encontro ninguna especialidad', err)
                reject(err)
            } else {
                console.log('especialidad eliminada con éxito')
                resolve(results)
            }
        })
    })
}

export default {crear, leer, detalle, buscarPorNombre, actualizar, eliminar}
