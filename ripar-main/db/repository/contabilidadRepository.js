import { db } from "../conexionDB.js";

const queryAsync = (query, params) => {
    return new Promise((resolve, reject) => {
        db.query(query, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const leer = async () => {
    try {
        const results = await queryAsync('SELECT * FROM contabilidad');
        console.log('Registro de contabilidad obtenido con éxito');
        return results
    } catch (err) {
        console.error('Error al obtener el registro de contabilidad', err);
        throw err;
    }
};

export default {leer}