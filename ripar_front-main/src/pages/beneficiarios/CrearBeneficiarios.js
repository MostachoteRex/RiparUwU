import { useState } from "react"
import Swal from "sweetalert2";
import axios from "axios";
import { CREARBENEFICIARIO_POST_ENDPOINT } from "../../connections/helpers/endpoints";
import { Button, Modal } from "react-bootstrap";
import { BsPlusSquareFill } from "react-icons/bs";
import { CrearBeneficiariosForm } from "../../components/beneficiarios/CrearBeneficiariosForm";


function CrearBeneficiario({id}) {

    const [errores, setErrores] = useState({});
    const [showModal, setShowModal] = useState(false)

    const mostrarAlerta=()=>{
        Swal.fire(
        'Éxito',
        'El beneficiario se creó correctamente',
        'success')
    }

    const crear = async ({nombre, primerApellido, segundoApellido, documento})=>{

        const errores={};
        setErrores(errores);

        axios.post(CREARBENEFICIARIO_POST_ENDPOINT, {idSuscriptor:id, nombre, primerApellido, segundoApellido, documento}
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
        
        <>
            <Button variant="primary" onClick={handleShowModal}>
                <BsPlusSquareFill/> Crear Beneficiarios
            </Button>
            <Modal backdrop="static" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Crear Beneficiarios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <CrearBeneficiariosForm errores={errores} callback={crear} />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" type="submit" form="beneficiario-form">
                    Crear
                </Button>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cerrar
                </Button>                
                </Modal.Footer>
            </Modal>
        </>
    )
}

export { CrearBeneficiario }