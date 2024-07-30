import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { TiEdit } from "react-icons/ti";
import Swal from "sweetalert2";
import { ACTUALIZARSUSCRIPCION_PUT_ENDPOINT, SUSCRIPCIONDETALLE_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { SuscripcionDetalle } from "./SuscripcionDetalle";


function EditarSuscripcion({id}) {

    const [suscripcion, setSuscripcion] = useState(null)
    const [errores, setErrores] = useState({});
    const [showModal, setShowModal] = useState(false)
    const [editando, setEditando] = useState(false);
    const navegar = useNavigate();

    useEffect(()=>{
        
        axios.get(`${SUSCRIPCIONDETALLE_GET_ENDPOINT}/${id}`
        ).then(respuesta=>{
            setSuscripcion(respuesta.data)
        }).catch(error=>{
            navegar("/Suscripciones")
        })
    },[id, navegar]);

/*     const editar= async ({idEspecialidad, idInstitucion, nombreDr, tarifaParticular, tarifaMultipreventiva}) =>{

        const error={}
        setErrores(error)

        axios.put(`${ACTUALIZARSUSCRIPCION_PUT_ENDPOINT}/${id}`, {idEspecialidad, idInstitucion, nombreDr, tarifaParticular, tarifaMultipreventiva}
        ).then(respuesta=>{
            handleCloseModal();
            navegar("/Suscripcion")
            crearAlerta();
        })
        .catch(err=>{
            setErrores({new: error.response.data.message});
        })
    } */

    const crearAlerta=()=>{
        Swal.fire(
            'Éxito',
            'La información de la suscripción ha sido actualizada',
            'success'
          )
    }

    const handleCloseModal = () => {
        setShowModal(false);
      };
    
    const handleShowModal = () => {
        setShowModal(true);
      };

      const editar = () =>{
        setEditando(true)
        console.log('Estado editando cambiado a true');
      }

      const handleInputChange = (e) => {
        setSuscripcion({
          ...suscripcion,
          [e.target.name]: e.target.value,
        });
      };
    
    return(

        <>
            <Button className="mi-edit-button" size="sm" onClick={editar}>
                <TiEdit/> Editar
            </Button>
            <Modal className="modal-suscripcion" backdrop="static" size="lg" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Editar Suscripción</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {suscripcion && (                    
                    <SuscripcionDetalle suscripcion={suscripcion} editando={editando} onInputChange={handleInputChange} />                  
                )}
                </Modal.Body>                
            </Modal>
        </>

    )
}

export { EditarSuscripcion }