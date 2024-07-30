import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACTUALIZARROL_PUT_ENDPOINT, ROLDETALLE_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { Container, Button, Modal, Form } from "react-bootstrap";
import { TiEdit } from "react-icons/ti";
import Swal from "sweetalert2";


function EditarRol({id}) {

    const [rol, setRol] = useState(null)
    const [estado, setEstado] = useState("");
    const [errores, setErrores] = useState({});
    const [showModal, setShowModal] = useState(false)
    const navegar = useNavigate();

    useEffect(()=>{
        
        axios.get(`${ROLDETALLE_GET_ENDPOINT}/${id}`
        ).then(respuesta=>{
            setRol(respuesta.data)
        }).catch(error=>{
            navegar("/Convenios")
        })
    },[id, navegar]);

    const editar= async () =>{        

        const error={}
        setErrores(error)

        axios.put(`${ACTUALIZARROL_PUT_ENDPOINT}/${id}`, {estado}
        ).then(respuesta=>{
            handleCloseModal();
            navegar("/Rol")
            crearAlerta();
        })
        .catch(err=>{
            setErrores({new: error.response.data.message});
        })
    }

    const crearAlerta=()=>{
        Swal.fire(
            'Éxito',
            'El estado del rol ha sido actualizado',
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
                <Modal.Title>Editar Rol</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {rol && (                    
                    <Form id="edit-rol-form">
                        <Form.Group className="mb-3" controlId="nombre">
                          <Form.Label>Nombre Rol</Form.Label>
                          <Form.Control
                            type="text"          
                            value={rol.nombre}
                            disabled
                            readOnly
                            />
                        </Form.Group>
                  
                        <Form.Group className="mb-3" controlId="estado">
                          <Form.Label>Estado</Form.Label>
                          <Form.Select aria-label="Default select example"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            isInvalid={errores.estado}
                            >
                            <option>Seleccione</option>
                            <option value="1">Activo</option>
                            <option value="2">Inactivo</option>                            
                            </Form.Select>
                          <Form.Control.Feedback type="invalid">{errores.estado}</Form.Control.Feedback>
                        </Form.Group>                        
                    </Form>
                )}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={editar}>
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

export { EditarRol }