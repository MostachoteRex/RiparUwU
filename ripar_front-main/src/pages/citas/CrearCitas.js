import axios from "axios";
import { useState } from "react";
import { CREARCITA_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import Swal from "sweetalert2";
import { Button, Container, Modal } from "react-bootstrap";
import { BsPlusSquareFill } from "react-icons/bs";
import CrearCitaForm from "../../components/citas/CrearCitaForm";


function CrearCita() {

    const [errores, setErrores] = useState({});
    const [showModal, setShowModal] = useState(false)

    const mostrarAlerta=()=>{
        Swal.fire(
        'Éxito',
        'La Cita se creó correctamente',
        'success')
    }

    const crear = async ({idSuscripcion, paciente, idConvenio, fechaCita, horaCita, idUsuario})=>{

        const errores={};
        setErrores(errores);

        axios.post(CREARCITA_POST_ENDPOINT, {idSuscripcion, paciente, idConvenio, fechaCita, horaCita, idUsuario}
        ).then((response)=>{
            mostrarAlerta();
            handleCloseModal();            
        })
        .catch((error)=>{
            setErrores({new: error.response.data.message});
        })
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
                <BsPlusSquareFill/> Crear Cita
            </Button>
            <Modal className="mi-modal-form" backdrop="static" size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Crear Cita</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <CrearCitaForm errores={errores} callback={crear} />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" type="submit" form="cita-form">
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

export { CrearCita }