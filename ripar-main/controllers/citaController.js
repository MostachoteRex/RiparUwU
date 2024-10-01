import respuestasHttp from "../utils/respuestasHttp.js";
import citaService from "../services/citaService.js";
import citaRepository from "../db/repository/citaRepository.js";
import { CitaCrearRequestModel, CitaDatosRestModel, CitaActualizarReqModel } from "../models/citaModel.js";
import ExcelJS from 'exceljs';

/**
 * Crea una nueva cita.
 * 
 * @async
 * @function postCita
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con los datos de la cita creada.
 */
const postCita = async (req, res) => {
    try {
        const cita = await citaService.crearCita(new CitaCrearRequestModel(req.body), req.user);
        respuestasHttp.exito(req, res, new CitaDatosRestModel(cita), 201);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al crear la cita", 400);
        console.log(err);
    }
};

/**
 * Obtiene una lista de citas.
 * 
 * @async
 * @function getCita
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con el listado de citas.
 */
const getCita = async (req, res) => {
    try {
        const citas = await citaService.leerCita();
        const lasCitas = citas.map(cita => new CitaDatosRestModel(cita));
        respuestasHttp.exito(req, res, lasCitas, 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al leer las citas", 400);
    }
};

/**
 * Obtiene el detalle de una cita específica.
 * 
 * @async
 * @function getDetalle
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con los datos de la cita.
 */
const getDetalle = async (req, res) => {
    try {
        const cita = await citaService.detalleCita(req.params.id);
        respuestasHttp.exito(req, res, new CitaDatosRestModel(cita), 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al leer la cita", 400);
    }
};

/**
 * Actualiza una cita existente.
 * 
 * @async
 * @function putCita
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con los datos de la cita actualizada.
 */
const putCita = async (req, res) => {
    try {
        const cita = await citaService.actualizarCita(req.params.id, new CitaActualizarReqModel(req.body));
        respuestasHttp.exito(req, res, new CitaDatosRestModel(cita), 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "Error al actualizar la cita", 500);
    }
};

/**
 * Elimina una cita.
 * 
 * @async
 * @function deleteCita
 * @param {Object} req - Objeto de la solicitud HTTP.
 * @param {Object} res - Objeto de la respuesta HTTP.
 * @returns {Promise<void>} Devuelve una respuesta HTTP indicando que la cita fue eliminada.
 */
const deleteCita = async (req, res) => {
    try {
        await citaService.eliminarCita(req.params.id);
        respuestasHttp.exito(req, res, "Cita eliminada con exito", 200);
    } catch (err) {
        respuestasHttp.error(req, res, err, "error al eliminar la cita", 400);
        console.log(err);
    }
};

const generarReporteCitas = async (req, res) => {
    try {
        // Llamamos a la función en el repository para obtener los datos
        const citas = await citaRepository.obtenerCitas();

        // Crear un nuevo libro de Excel
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Reporte de Citas');

        // Definir los encabezados de las columnas
        worksheet.columns = [
            { header: 'No. Contrato', key: 'noContrato', width: 15 },
            { header: 'Nombre Paciente', key: 'nombrePaciente', width: 30 },
            { header: 'Documento Paciente', key: 'documento', width: 20 },
            { header: 'Nombre Doctor', key: 'nombreDr', width: 20 },
            { header: 'Fecha Cita', key: 'fechaCita', width: 15 },
            { header: 'Hora Cita', key: 'horaCita', width: 15 },
            { header: 'Ahorro', key: 'ahorro', width: 15 },
            { header: 'Fecha Registro', key: 'fechaRegistro', width: 15 },
        ];

        // Agregar los datos a la hoja de Excel
        citas.forEach((cita) => {
            worksheet.addRow({
                // idCita: cita.idCita,
                noContrato: cita.noContrato,
                nombrePaciente: cita.nombrePaciente,
                documento: cita.documento,
                nombreDoctor: cita.nombreDr, // Asegúrate de que este campo exista en la consulta
                fechaCita: cita.fechaCita,
                horaCita: cita.horaCita,
                ahorro: cita.ahorro,
                fechaRegistro: cita.fechaRegistro
            });
        });

        // Generar el archivo Excel y enviarlo como respuesta
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=reporte_citas.xlsx');

        await workbook.xlsx.write(res);
        res.end();

    } catch (err) {
        console.error('Error al generar el reporte de citas:', err);
        res.status(500).send('Error al generar el reporte');
    }
};

export default { postCita, getCita, getDetalle, putCita, deleteCita, generarReporteCitas };