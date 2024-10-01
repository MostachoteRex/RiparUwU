import axios from "axios";
import { GENERARREPORTECITAS_GET_ENDPOINT } from "../../connections/helpers/endpoints"; // Asegúrate de que la ruta sea correcta
// import { Button } from "react-bootstrap";
// import Swal from "sweetalert2";

const DescargarExcelBoton = () => {

	const descargarExcel = async () => {
		try {
			const response = await axios.get(GENERARREPORTECITAS_GET_ENDPOINT, {
				responseType: 'blob' // Esto es importante para manejar el archivo
			});

			// Crear un enlace para descargar el archivo
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'reporte_citas.xlsx'); // Nombre del archivo
			document.body.appendChild(link);
			link.click();
			link.parentNode.removeChild(link);
		} catch (err) {
			console.error('Error al descargar el archivo Excel', err);
		}
	};

	// const crearAlerta = () => {
	// 	Swal.fire({
	// 		title: '¿Deseas descargar las citas en formato Excel?',
	// 		icon: 'question',
	// 		showCancelButton: true,
	// 		confirmButtonText: 'Si, Descargar',
	// 		cancelButtonText: 'No, Cancelar',
	// 	}).then((result) => {
	// 		if (result.isConfirmed) {
	// 			descargarExcel(); // Llama a la función para descargar el Excel
	// 		} else {
	// 			Swal.fire(
	// 				'Cancelado',
	// 				'La descarga fue cancelada',
	// 				'error'
	// 			);
	// 		}
	// 	});
	// };

	return (
		<button onClick={descargarExcel}>
			Descargar Excel
		</button>
	);
};

export { DescargarExcelBoton };
