import { useState } from "react";
import { CrearSuscripcionForm } from "../../components/suscripciones/CrearSuscripcionForm";
import { CREARSUSCRIPCION_POST_ENDPOINT, CREARSUSCRIPTOR_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import { Modal, Container, Button } from "react-bootstrap";
import { BsPlusSquareFill } from "react-icons/bs";
import Swal from "sweetalert2";
import axios from "axios";


function CrearSuscripcion() {
    const [errores, setErrores] = useState({});
    const [showModal, setShowModal] = useState(false);

    const mostrarAlerta = () => {
        Swal.fire(
            'Éxito',
            'La suscripción se creó correctamente',
            'success'
        );
    };

    const validarDatos = (data) => {
        const requiredFields = [
            'idAsesor', 'documento', 'nombre', 'primerApellido', 'segundoApellido',
            'actividadEconomica', 'telefono', 'fechaNacimiento', 'email', 'direccion',
            'barrio', 'ciudad', 'noContrato', 'fechaSuscripcion', 'valor', 'metodoPago'
        ];
        for (const field of requiredFields) {
            if (!data[field]) {
                return false;
            }
        }
        return true;
    };

    const crear = async (formData) => {
        if (!validarDatos(formData)) {
            Swal.fire(
                'Error',
                'Por favor, complete todos los campos del formulario.',
                'error'
            );
            return;
        }

        setErrores({});

        try {
            // Crear suscriptor
            const responseSuscriptor = await axios.post(CREARSUSCRIPTOR_POST_ENDPOINT, {
                documento: formData.documento,
                nombre: formData.nombre,
                primerApellido: formData.primerApellido,
                segundoApellido: formData.segundoApellido,
                actividadEconomica: formData.actividadEconomica,
                telefono: formData.telefono,
                fechaNacimiento: formData.fechaNacimiento,
                email: formData.email,
                direccion: formData.direccion,
                barrio: formData.barrio,
                ciudad: formData.ciudad,
            });
        
            const idSuscriptor = responseSuscriptor.data.idSuscriptor;
        
            // Crear suscripción
            await axios.post(CREARSUSCRIPCION_POST_ENDPOINT, {
                idSuscriptor,
                idAsesor: formData.idAsesor,
                noContrato: formData.noContrato,
                fechaSuscripcion: formData.fechaSuscripcion,
                valor: formData.valor,
                metodoPago: formData.metodoPago,
            });

            // Mostrar la alerta de éxito después de que ambas solicitudes se completen correctamente
            mostrarAlerta();
        } catch (error) {
            console.log("Error:", error);
            let mensajeError;
            if (error.response && error.response.data) {
                mensajeError = error.response.data.message || "Error inesperado";
            } else {
                mensajeError = "Error inesperado al crear la suscripción";
            }
            setErrores({ new: mensajeError });
            Swal.fire(
                'Error',
                mensajeError,
                'error'
            );
        } finally {
            handleCloseModal();
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    return (
        <Container>
            <Button variant="primary" onClick={handleShowModal}>
                <BsPlusSquareFill /> Crear Suscripción
            </Button>
            <Modal className="mi-modal-form" backdrop="static" size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Suscripción</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CrearSuscripcionForm errores={errores} callback={crear} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" form="suscripcion-form">
                        Crear
                    </Button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export { CrearSuscripcion };
