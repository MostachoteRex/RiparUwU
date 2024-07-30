import { useState } from "react";
import { CREARESPECIALIDAD_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import { Modal, Container, Button } from "react-bootstrap";
import { EspecialidadForm } from "../../components/especialidad/CrearEspecialidadForm";
import { BsPlusSquareFill } from "react-icons/bs";
import Swal from "sweetalert2";
import axios from "axios";


function CrearEspecialidad() {

    const [errores, setErrores]= useState({});    
    const [showModal, setShowModal] = useState(false);

    const mostrarAlerta=()=>{
        Swal.fire(
        'Éxito',
        'La especialidad se creó correctamente',
        'success')
    }

    const crear= async ({nombre})=>{
    
        const errores={};
        setErrores(errores);

        axios.post(CREARESPECIALIDAD_POST_ENDPOINT, {nombre}
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

    return (
        <Container>
            <Button variant="primary" onClick={handleShowModal}>
                <BsPlusSquareFill/> Crear Especialidad
            </Button>
            <Modal backdrop="static" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Crear Especialidad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <EspecialidadForm errores={errores} callback={crear} />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" type="submit" form="especialidad-form">
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

export {CrearEspecialidad}