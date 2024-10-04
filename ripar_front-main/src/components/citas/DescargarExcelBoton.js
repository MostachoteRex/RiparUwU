import axios from "axios";
import { GENERARREPORTECITAS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { FaRegFileExcel } from "react-icons/fa6";

const DescargarExcelBoton = () => {

	const descargarExcel = async () => {
		try {
			const response = await axios.get(GENERARREPORTECITAS_GET_ENDPOINT, {
				responseType: 'blob'
			});

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', 'reporte_citas.xlsx'); 
			document.body.appendChild(link);
			link.click();
			link.parentNode.removeChild(link);
		} catch (err) {
			console.error('Error al descargar el archivo Excel', err);
		}
	};

	return (
		<button className="download-button" onClick={descargarExcel}>
			<FaRegFileExcel />
			{/* Descargar Excel */}
		</button>
	);
};

export { DescargarExcelBoton };
