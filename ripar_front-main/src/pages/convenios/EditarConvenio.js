import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACTUALIZARCONVENIO_PUT_ENDPOINT, CONVENIODETALLE_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { Container, Button, Modal } from "react-bootstrap";
import { CrearConvenioForm } from "../../components/convenio/CrearConvenioForm";
import { TiEdit } from "react-icons/ti";
import Swal from "sweetalert2";


function EditarConvenio({id}) {

    const [convenio, setConvenio] = useState(null)
    const [errores, setErrores] = useState({});
    const [showModal, setShowModal] = useState(false)
    const navegar = useNavigate();

    useEffect(()=>{
        
        axios.get(`${CONVENIODETALLE_GET_ENDPOINT}/${id}`
        ).then(respuesta=>{
            setConvenio(respuesta.data)
        }).catch(error=>{
            navegar("/Convenios")
        })
    },[id, navegar]);

    const editar= async ({idEspecialidad, idInstitucion, nombreDr, tarifaParticular, tarifaMultipreventiva}) =>{

        const error={}
        setErrores(error)

        axios.put(`${ACTUALIZARCONVENIO_PUT_ENDPOINT}/${id}`, {idEspecialidad, idInstitucion, nombreDr, tarifaParticular, tarifaMultipreventiva}
        ).then(respuesta=>{
            handleCloseModal();
            navegar("/Convenios")
            crearAlerta();
        })
        .catch(err=>{
            setErrores({new: error.response.data.message});
        })
    }

    const crearAlerta=()=>{
        Swal.fire(
            'Éxito',
            'La información del convenio ha sido actualizada',
            'success'
          )
    }

    const handleCloseModal = () => {
        setShowModal(false);
      };
    
    const handleShowModal = () => {
        setShowModal(true);
      };

    
    return(

        <Container>
            <Button className="edit-button" size="sm" onClick={handleShowModal}>
            <TiEdit/>
            </Button>
            <Modal className="modal-convenio" backdrop="static" size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Editar Convenio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {convenio && (                    
                    <CrearConvenioForm 
                    errores={errores}
                    callback={editar}
                    cselectedEspecialidad={convenio.especialidadEntity.idEspecialidad}
                    cselectedInstitucion={convenio.institucionEntity.idInstitucion}
                    cDireccion={convenio.direccion }
                    cNombreDr={convenio.nombreDr}
                    cTarifaParticular={convenio.tarifaParticular}
                    cTarifaMultipreventiva={convenio.tarifaMultipreventiva} 
                    ></CrearConvenioForm>
                )}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" type="submit" form="convenio-form">
                    Guardar Cambios
                </Button>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Cerrar
                </Button>                
                </Modal.Footer>
            </Modal>
        </Container>

    )
}

export { EditarConvenio }