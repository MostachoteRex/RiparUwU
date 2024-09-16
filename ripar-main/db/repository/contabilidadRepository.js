import { db } from "../conexionDB.js";

const leer = () => {
    
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM contabilidad', (err, results) => {
            if (err) {
                console.error('Error al obtener el registro de contabilidad', err);
                reject(err); 
            } else {
                console.log('Registro de contabilidad obtenido con éxito');
                resolve(results);
            }
        });
    });
}

export default {leer}