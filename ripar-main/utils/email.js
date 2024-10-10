import { createTransport } from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

// Definir manualmente __dirname en un entorno ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'mostachoterex@gmail.com',
        pass: 'nltf hqdw esxo pdug'
    }
});

const enviarCorreoConfirmacion = async (email, nombrePaciente, documentoPaciente, nombreDr, nombre, direccion, fechaCita, horaCita) => {
    try {
        await transporter.sendMail({
            from: 'mostachoterex512@gmail.com',
            to: email,
            subject: 'Confirmación de Cita Médica',
            html: `
                <h1>Confirmación de Cita Médica</h1>
                <p>Estimado/a ${nombrePaciente} con el número de documento: ${documentoPaciente}.</p>
                <p>Su cita médica con el Dr./Dra. ${nombreDr} está programada para el día <strong>${fechaCita}</strong> a las <strong>${horaCita}</strong>.</p>
                <p><strong>Institución:</strong> ${nombre}</p>
                <p><strong>Dirección:</strong> ${direccion}</p>
                <p>Gracias por confiar en nosotros.</p>
                <img src="cid:imagenCita" alt="Logo Multipreventia" style="width: 250px; height: auto;" />

            `,
            attachments: [{
                filename: 'imageLogo.png',
                path: path.join(__dirname, '../assets/img/imageLogo.png'),
                cid: 'imagenCita'
            }]
        });
        console.log('Correo enviado con éxito.');
    } catch (err) {
        console.error('Error enviando el correo:', err);
    }
};

export { enviarCorreoConfirmacion };