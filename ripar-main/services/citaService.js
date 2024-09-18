import citaRepository from "../db/repository/citaRepository.js";
import suscripcionRepository from "../db/repository/suscripcionRepository.js";
import suscriptorRepository from "../db/repository/suscriptorRepository.js";
import beneficiarioRepository from "../db/repository/beneficiarioRepository.js";
import suscripcionService from "./suscripcionService.js";
import convenioService from "./convenioService.js";
import crypto from "crypto";

const crearCita = async (cita) => {
    try {
        if (!cita.idSuscripcion || !cita.paciente || !cita.idConvenio || !cita.fechaCita || !cita.horaCita) {
            throw new Error("Faltan datos");
        }
        const suscripcion = await suscripcionRepository.detalle(cita.idSuscripcion);
        const suscriptor = await suscriptorRepository.detalle(suscripcion.idSuscriptor);
        const beneficiario = await beneficiarioRepository.buscarSuscriptor(suscriptor.idSuscriptor);
        const paciente = [suscriptor.idSuscriptor, ...(beneficiario.map(b => b.idBeneficiario))];
        const convenio = await convenioService.detalleConvenio(cita.idConvenio);
        const ahorro = await convenio.tarifaParticular - convenio.tarifaMultipreventiva;

        if (paciente.includes(cita.paciente)) {
            cita.idCita = crypto.randomUUID();
            cita.ahorro = ahorro;
            await citaRepository.crear(cita);
            cita.suscripcionEntity = await suscripcionService.detalleSuscripcion(cita.idSuscripcion);
            cita.pacienteEntity = await citaRepository.buscarPaciente(cita.paciente);
            cita.convenioEntity = convenio;
            return cita;
        } else {
            throw new Error("Este paciente no pertenece a esta suscripcion");
        }
    } catch (err) {
        throw err;
    }
};

const leerCita = async () => {
    try {
        const array = await citaRepository.leer();
        const citas = await Promise.all(array.map(async(cita) => {
            cita.suscripcionEntity = await suscripcionService.detalleSuscripcion(cita.idSuscripcion);
            cita.pacienteEntity = await citaRepository.buscarPaciente(cita.idPaciente);
            cita.convenioEntity = await convenioService.detalleConvenio(cita.idConvenio);
            return cita;
        }));
        return citas;
    } catch (err) {
        throw new Error("No es posible leer las citas", err.message);
    }
};

const detalleCita = async (id) => {
    try {
        const cita = await citaRepository.detalle(id);
        cita.suscripcionEntity = await suscripcionService.detalleSuscripcion(cita.idSuscripcion);
        cita.pacienteEntity = await citaRepository.buscarPaciente(cita.idPaciente);
        cita.convenioEntity = await convenioService.detalleConvenio(cita.idConvenio);
        return cita;
    } catch (err) {
        throw err;
    }
};

const actualizarCita = async (id, cita) => {
    try {
        if (!cita.fechaCita || !cita.horaCita) {
            throw new Error("Faltan datos");
        }
        const citaDetalle = await citaRepository.detalle(id)
        citaDetalle.fechaCita = cita.fechaCita;
        citaDetalle.horaCita = cita.horaCita;

        const citaData = await citaRepository.actualizar(citaDetalle);
        citaData.suscripcionEntity = await suscripcionService.detalleSuscripcion(citaData.idSuscripcion);
        citaData.pacienteEntity = await citaRepository.buscarPaciente(citaData.idPaciente);
        citaData.convenioEntity = await convenioService.detalleConvenio(citaData.idConvenio);
        
        return cita;
    } catch (err) {
        throw err
    }
};

const eliminarCita = async (id) => {
    try {
        const eliminacion = await citaRepository.eliminar(id);
        return eliminacion;
    } catch (err) {
        throw err;
    }
};

// const generarExcelCitasSemana = async () => {
//     const citas = await citaRepository.citasSemanaActual();

//     const wb = new excel.Workbook();
//     const ws = wb.addWorksheet('Citas de la Semana');

//     // Definir los encabezados de la tabla
//     const encabezados = [
//         'ID Cita', 'No Contrato', 'Nombre del Paciente', 
//         'Documento', 'Nombre Dr.', 'Fecha Cita', 
//         'Hora Cita', 'Ahorro', 'Fecha Registro'
//     ];

//     // Agregar encabezados a la primera fila
//     encabezados.forEach((header, index) => {
//         ws.cell(1, index + 1).string(header);
//     });

//     // Agregar los datos de las citas
//     citas.forEach((cita, rowIndex) => {
//         ws.cell(rowIndex + 2, 1).number(cita.idCita);
//         ws.cell(rowIndex + 2, 2).string(cita.noContrato || '');
//         ws.cell(rowIndex + 2, 3).string(cita.nombrePaciente || '');
//         ws.cell(rowIndex + 2, 4).string(cita.documento || '');
//         ws.cell(rowIndex + 2, 5).string(cita.nombreDr || '');
//         ws.cell(rowIndex + 2, 6).string(cita.fechaCita || '');
//         ws.cell(rowIndex + 2, 7).string(cita.horaCita || '');
//         ws.cell(rowIndex + 2, 8).number(cita.ahorro || 0);
//         ws.cell(rowIndex + 2, 9).string(cita.fechaRegistro || '');
//     });

//     return wb;
// };

export default { crearCita, leerCita, detalleCita, actualizarCita, eliminarCita, /*generarExcelCitasSemana*/ }