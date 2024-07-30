import axios from "axios";
import { Table, Modal, Button } from "react-bootstrap"
import React, { useEffect, useState } from "react";
import { BENEFICIARIOSCREADOS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { BeneficiariosTable } from "../../components/beneficiarios/BeneficiariosTable";
import { BsArrowsAngleExpand } from "react-icons/bs";

const BeneficiariosCreados=({id})=>{

    const [beneficiarios, setBeneficiarios] = useState([]) 
    const [buscando, setBuscando] = useState(true)
    const [showModal, setShowModal] = useState(false);       

    useEffect(()=>{
        axios.get(`${BENEFICIARIOSCREADOS_GET_ENDPOINT}/${id}`)
        .then(respuesta=>{
            setBeneficiarios(respuesta.data)
            setBuscando(false)            
        }).catch(e=>{
            console.error(e)
            setBuscando(false)            
        })
    },[beneficiarios, id])

    const handleCloseModal = () => {
        setShowModal(false);
      };
    
    const handleShowModal = () => {
        setShowModal(true);
      };

    return (
        <>
            <Button variant="outline-info" onClick={handleShowModal}>
                <BsArrowsAngleExpand />
            </Button>
            <Modal backdrop="static" show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Beneficiarios</Modal.Title>
                </Modal.Header>
                    <Modal.Body>                                                              
                            {buscando ? "Cargando..." : (beneficiarios.length===0 && "No hay beneficiarios registrados")}
                            <Table striped bordered hover className="mt-3 mb-3" >
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Documento</th>
                                    <th>Fecha de Registro</th>
                                    <th>Acción</th>
                                </tr>
                                </thead>
                                <tbody>
                                {beneficiarios
                                .map((beneficiario, index) => (
                                    <BeneficiariosTable key={beneficiario.idBeneficiario} beneficiario={beneficiario} contador={index + 1} />
                                ))}
                                </tbody>
                            </Table>
                        </Modal.Body> 
                        <Modal.Footer>            
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Cerrar
                            </Button>                
                        </Modal.Footer>
                   </Modal>
        </>
    )
}

export { BeneficiariosCreados }