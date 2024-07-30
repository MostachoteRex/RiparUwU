import axios from "axios";
import { useState } from "react";
import { CREARCONVENIO_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import Swal from "sweetalert2";
import { Button, Container, Modal } from "react-bootstrap";
import { BsPlusSquareFill } from "react-icons/bs";
import { CrearConvenioForm } from "../../components/convenio/CrearConvenioForm";


function CrearConvenio() {

    const [errores, setErrores] = useState({});
    const [showModal, setShowModal] = useState(false)

    const mostrarAlerta=()=>{
        Swal.fire(
        'Éxito',
        'El Convenio se creó correctamente',
        'success')
    }

    const crear = async ({idEspecialidad, idInstitucion, nombreDr, tarifaParticular, tarifaMultipreventiva, telefono, email})=>{

        const errores={};
        setErrores(errores);

        axios.post(CREARCONVENIO_POST_ENDPOINT, {idEspecialidad, idInstitucion, nombreDr, tarifaParticular, tarifaMultipreventiva, telefono, email}
        ).then((response)=>{
            handleCloseModal();
            mostrarAlerta();
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
                <BsPlusSquareFill/> Crear Convenio
            </Button>
            <Modal className="mi-modal-form" backdrop="static" size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Crear Convenio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <CrearConvenioForm errores={errores} callback={crear} />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" type="submit" form="convenio-form">
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

export { CrearConvenio }