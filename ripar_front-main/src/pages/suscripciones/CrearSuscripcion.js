import { useState } from "react";
import { CrearSuscripcionForm } from "../../components/suscripciones/CrearSuscripcionForm";
import { CREARSUSCRIPCION_POST_ENDPOINT, CREARSUSCRIPTOR_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import { Modal, Container, Button } from "react-bootstrap";
import { BsPlusSquareFill } from "react-icons/bs";
import Swal from "sweetalert2";
import axios from "axios";


function CrearSuscripcion() {

    const [errores, setErrores]= useState({});    
    const [showModal, setShowModal] = useState(false);

    const mostrarAlerta=()=>{
        Swal.fire(
        'Éxito',
        'La suscripción se creó correctamente',
        'success')
    }

    const crear = async ({ idAsesor, documento, nombre, primerApellido, segundoApellido, actividadEconomica, telefono, fechaNacimiento, email, direccion, barrio, ciudad, noContrato, fechaSuscripcion, valor, metodoPago }) => {
      
    const errores = {};
    setErrores(errores);

    try {
        
        const responseSuscriptor = await axios.post(CREARSUSCRIPTOR_POST_ENDPOINT, {
            documento,
            nombre,
            primerApellido,
            segundoApellido,
            actividadEconomica,
            telefono,
            fechaNacimiento,
            email,
            direccion,
            barrio,
            ciudad,
        });

        const idSuscriptor = responseSuscriptor.data.idSuscriptor;
      
        await axios.post(CREARSUSCRIPCION_POST_ENDPOINT, {
            idSuscriptor,
            idAsesor,
            noContrato,
            fechaSuscripcion,
            valor,
            metodoPago,
        });
      
        handleCloseModal();
        mostrarAlerta();

    } catch (error) {
      console.log("entra")    
        setErrores({ new: error.response.data.message });
    }
}


    const handleCloseModal = () => {
        setShowModal(false);
      };
    
    const handleShowModal = () => {
        setShowModal(true);
      };

    return (
        <Container>
            <Button variant="primary" onClick={handleShowModal}>
                <BsPlusSquareFill/> Crear Suscripcion
            </Button>
            <Modal className="mi-modal-form" backdrop="static" size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Crear Suscripcion</Modal.Title>
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
    )
}

export { CrearSuscripcion }