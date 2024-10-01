import React from 'react';
import ExcelJS from 'exceljs';

const DescargarExcelBoton = () => {
  const descargarExcel = async () => {
    // Datos de prueba
    const datosCitas = [
      { id: 1, nombre: 'Juan Pérez', fecha: '2024-09-28', hora: '10:00' },
      { id: 2, nombre: 'María Gómez', fecha: '2024-09-29', hora: '11:00' },
      { id: 3, nombre: 'Carlos Torres', fecha: '2024-09-30', hora: '12:00' },
    ];

    // Crear un nuevo libro de trabajo
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Citas');

    // Definir columnas
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre', key: 'nombre', width: 30 },
      { header: 'Fecha', key: 'fecha', width: 15 },
      { header: 'Hora', key: 'hora', width: 10 }
    ];

    // Agregar filas con los datos de prueba
    datosCitas.forEach(cita => {
      worksheet.addRow(cita);
    });

    // Generar el archivo Excel y forzar la descarga
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'citas.xlsx';
    link.click();
  };

  return (
    <button onClick={descargarExcel}>
      Descargar Excel
    </button>
  );
};

export { DescargarExcelBoton };
