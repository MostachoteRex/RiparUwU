import { useState } from "react"
import { CrearInstitucionForm } from "../../components/institucion/CrearInstitucionForm"
import Swal from "sweetalert2";
import axios from "axios";
import { CREARINSTITUCION_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import { Button, Container, Modal } from "react-bootstrap";
import { BsPlusSquareFill } from "react-icons/bs";


function CrearInstitucion() {

    const [errores, setErrores] = useState({});
    const [showModal, setShowModal] = useState(false)

    const mostrarAlerta=()=>{
        Swal.fire(
        'Éxito',
        'La Institución se creó correctamente',
        'success')
    }

    const crear = async ({nombre, idEspecialidad, direccion})=>{

        const errores={};
        setErrores(errores);

        axios.post(CREARINSTITUCION_POST_ENDPOINT, {nombre, idEspecialidad, direccion}
        ).then((response) => {
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

    return(
        
        <Container>
            <Button variant="primary" onClick={handleShowModal}>
                <BsPlusSquareFill/> Crear Institución
            </Button>
            <Modal backdrop="static" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Crear Institución</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <CrearInstitucionForm errores={errores} callback={crear} />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" type="submit" form="institucion-form">
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

export { CrearInstitucion }