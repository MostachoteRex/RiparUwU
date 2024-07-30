import { useState } from "react"
import { CrearUsuarioForm } from "../../components/usuarios/CrearUsuarioForm"
import Swal from "sweetalert2";
import axios from "axios";
import { CREARUSUARIO_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import { Button, Container, Modal } from "react-bootstrap";
import { BsPlusSquareFill } from "react-icons/bs";


function CrearUsuario() {

    const [errores, setErrores] = useState({});
    const [showModal, setShowModal] = useState(false)

    const mostrarAlerta=()=>{
        console.log('Mostrando alerta');
        Swal.fire(
        'Éxito',
        'El usuario se creó correctamente',
        'success')
    }

    const crear = async ({nombre, apellido, documento, email, password, idRol})=>{

        const errores={};
        setErrores(errores);

        axios.post(CREARUSUARIO_POST_ENDPOINT, {nombre, apellido, documento, email, password, idRol}
        ).then((response) => {
            mostrarAlerta()
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

    return(
        
        <Container>
            <Button variant="primary" onClick={handleShowModal}>
                <BsPlusSquareFill/> Crear Usuario
            </Button>
            <Modal backdrop="static" size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Crear Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <CrearUsuarioForm errores={errores} callback={crear} />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" type="submit" form="usuario-form">
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

export { CrearUsuario }