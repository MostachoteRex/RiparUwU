import axios from "axios";
import { Table, Modal, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { BENEFICIARIOSCREADOS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { BeneficiariosTable } from "../../components/beneficiarios/BeneficiariosTable";
import { BsArrowsAngleExpand } from "react-icons/bs";

const BeneficiariosCreados = ({ id }) => {
    const [beneficiarios, setBeneficiarios] = useState([]);
    const [buscando, setBuscando] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // console.log(id);
        
        if (id !== null) {
            console.log(id);
            
            axios.get(`${BENEFICIARIOSCREADOS_GET_ENDPOINT}/${id}`)
                .then(respuesta => {
                    if (Array.isArray(respuesta.data)) {
                        setBeneficiarios(respuesta.data);
                        setError(null);
                    } else {
                        setError('La respuesta del servidor no es un array.');
                    }
                })
                .catch(e => {
                    console.error('Error al obtener los beneficiarios:', e.response ? e.response.data : e.message);
                    setError('No se pudieron cargar los beneficiarios.');
                })
                .finally(() => {
                    setBuscando(false);
                });
        } else {
            setError('ID de suscriptor no válido.');
            setBuscando(false);
        }
    }, []);

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
                    <Modal.Title>Beneficiarios Creados</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {buscando ? "Cargando..." : (
                        error ? (
                            <p>{error}</p>
                        ) : (
                            Array.isArray(beneficiarios) && beneficiarios.length === 0 ? 
                            "No hay beneficiarios registrados" : (
                                <Table className="table-bordered">
                                    <thead>
                                        <tr>
                                            <th style={{backgroundColor:'#3A6FB3', color:'white'}}>#</th>
                                            <th style={{backgroundColor:'#3A6FB3', color:'white'}}>Nombre</th>
                                            <th style={{backgroundColor:'#3A6FB3', color:'white'}}>Documento</th>
                                            <th style={{backgroundColor:'#3A6FB3', color:'white'}}>Fecha de Registro</th>
                                            <th style={{backgroundColor:'#3A6FB3', color:'white'}}>Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {beneficiarios.map((beneficiario, index) => (
                                            <BeneficiariosTable 
                                                key={beneficiario.idBeneficiario} 
                                                beneficiario={beneficiario} 
                                                contador={index + 1} 
                                            />
                                        ))}
                                    </tbody>
                                </Table>
                            )
                        )
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export { BeneficiariosCreados };
