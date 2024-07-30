import cron from "node-cron";
import suscripcionRepository from "./repository/suscripcionRepository.js";


const tareaProgramada = cron.schedule('0 0 * * *', async () => {
  
  const fechaActual = new Date();

  try {
    const suscripciones = await suscripcionRepository.leer();
    
    for (const suscripcion of suscripciones) {
      if (suscripcion.fechaVencimiento < fechaActual) {
        // Cambia el estado de la suscripción a "INACTIVA"
        suscripcion.estado = 'INACTIVA';

        // Guarda la actualización en la base de datos
        await suscripcionRepository.actualizar(suscripcion);
      }
    }

    console.log('Tarea programada ejecutada: Se han actualizado las suscripciones vencidas.');
  } catch (error) {
    console.error('Error en la tarea programada:', error.message);
  }
}, {
  scheduled: true,
  timezone: 'America/Bogota'
});