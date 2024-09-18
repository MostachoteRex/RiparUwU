import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { CREARBENEFICIARIO_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import { Button, Modal } from "react-bootstrap";
import { BsPlusSquareFill } from "react-icons/bs";
import { CrearBeneficiariosForm } from "../../components/beneficiarios/CrearBeneficiariosForm";

function CrearBeneficiario({ id }) {

    // Estado para almacenar los errores de validación o del servidor.
    const [errores, setErrores] = useState({});

    // Estado para controlar la visibilidad del modal.
    const [showModal, setShowModal] = useState(false);

    const mostrarAlerta = (mensaje, tipo) => {
        Swal.fire(
            tipo === 'success' ? 'Éxito' : 'Error',
            mensaje || (tipo === 'success' ? 'El beneficiario se creó correctamente' : 'Ocurrió un error'),
            tipo
        );
    };

    /**
     * Maneja la creación de un beneficiario.
     * Envía una solicitud POST al servidor con los datos del beneficiario.
     *
     * @param {Object} datos - Datos del beneficiario.
     * @param {string} datos.nombre - Nombre del beneficiario.
     * @param {string} datos.primerApellido - Primer apellido del beneficiario.
     * @param {string} datos.segundoApellido - Segundo apellido del beneficiario.
     * @param {string} datos.documento - Documento del beneficiario.
     */
    const crear = async (datos) => {
        const { nombre, primerApellido, segundoApellido, documento } = datos;
        const errores = {};
        setErrores(errores);

        // Validación básica de campos obligatorios.
        if (!nombre || !primerApellido || !documento) {
            setErrores({ general: "Todos los campos son obligatorios" });
            return;
        }

        try {
            // Enviar solicitud POST para crear el beneficiario.
            await axios.post(CREARBENEFICIARIO_POST_ENDPOINT, {
                idSuscriptor: id,
                nombre,
                primerApellido,
                segundoApellido,
                documento
            });
            handleCloseModal(); // Cerrar el modal tras la creación exitosa.
            mostrarAlerta('Beneficiario creado con éxito', 'success');
        } catch (err) {
            // Manejo de errores de la solicitud.
            const responseErrors = err.response && err.response.data && err.response.data.message;
            if (responseErrors === "El suscriptor alcanzó el límite de beneficiarios") {
                mostrarAlerta('No se pueden crear más beneficiarios. Límite alcanzado.', 'error');
            } else {
                setErrores(typeof responseErrors === 'object' && responseErrors !== null ? responseErrors : { general: 'Ocurrió un error al crear el beneficiario.' });
                mostrarAlerta('Ocurrió un error al crear el beneficiario.', 'error');
            }
        }
    };

    /**
     * Cierra el modal estableciendo `showModal` en `false`.
     */
    const handleCloseModal = () => {
        setShowModal(false);
    };

    /**
     * Abre el modal estableciendo `showModal` en `true`.
     */
    const handleShowModal = () => {
        setShowModal(true);
    };

    return (
        <>
            {/* Botón para abrir el modal */}
            <Button variant="primary" onClick={handleShowModal}>
                <BsPlusSquareFill /> Crear Beneficiarios
            </Button>

            {/* Modal para crear un nuevo beneficiario */}
            <Modal backdrop="static" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Beneficiarios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Formulario para crear beneficiarios */}
                    <CrearBeneficiariosForm errores={errores} callback={crear} />
                </Modal.Body>
                <Modal.Footer>
                    {/* Botón para enviar el formulario */}
                    <Button variant="primary" type="submit" form="beneficiario-form">
                        Crear
                    </Button>
                    {/* Botón para cerrar el modal */}
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export { CrearBeneficiario };