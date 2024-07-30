import axios from "axios";
import { Container, Card, Row, Col, Table, InputGroup, Form } from "react-bootstrap"
import { EspecialidadTable } from "../../components/especialidad/EspecialidadTable"
import React, { useEffect, useState } from "react";
import { ESPECIALIDADESCREADAS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { CrearEspecialidad } from "./CrearEspecialidad";

const EspecialidadesCreadas=()=>{

    const [especialidades, setEspecialidades] = useState([])
    const [buscando, setBuscando] = useState(true)
    const [search, setSearch] = useState('');
    const [cantidadRegistros, setCantidadRegistros] = useState(5);
    /* const [currentPage, setCurrentPage] = useState(0); */
    /* const [items, setItems] = useState([...especialidades].splice(0, cantidadRegistros)) */

    useEffect(()=>{
        axios.get(ESPECIALIDADESCREADAS_GET_ENDPOINT)
        .then(respuesta=>{
            setEspecialidades(respuesta.data)
            setBuscando(false)
        }).catch(e=>{
            console.error(e)
            setBuscando(false)
        })
    },[especialidades, /* currentPage, */ cantidadRegistros, search])

    const handleCantidadRegistrosChange = (event) => {
        const value = event.target.value;
        setCantidadRegistros(value); // Asegúrate de que `cantidadRegistros` sea un número
    };

    /* const nextHandler = () => {
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * cantidadRegistros;
      
        if (firstIndex >= especialidades.length) return;
      
        setItems([...especialidades].slice(firstIndex, firstIndex + cantidadRegistros));
        setCurrentPage(nextPage);
    }

    const prevHandler = () => {
        const prevPage = currentPage - 1;
      
        if (prevPage < 0) return;
      
        const firstIndex = prevPage * cantidadRegistros;
      
        setItems([...especialidades].slice(firstIndex, firstIndex + cantidadRegistros));
        setCurrentPage(prevPage);
      } */
    /* const indexOfFirstRecord = indexOfLastRecord - cantidadRegistros; */
    /* const currentRecords = cantidadRegistros === "all" ? especialidades : especialidades.slice(indexOfFirstRecord, indexOfLastRecord);*/ 

    return (
        <Container className="mt-3 mb-3">
            <Row className="justify-content">
                <Col sm={12} md={8} lg={6}>
                    <h2 className="margen-title"><strong>Especialidades</strong></h2>
                    <Card className="card-especialidad mt-3 mb-3">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <Card.Title className="mt-2">
                            <h4>Lista de especialidades</h4>
                            </Card.Title>
                            <div className="ms-auto">
                                <CrearEspecialidad />
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">                            
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span>Mostrando </span>
                                <Form.Select
                                    value={cantidadRegistros}
                                    onChange={handleCantidadRegistrosChange}
                                    >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value="all">All</option>
                                </Form.Select>
                                <span> registros</span>
                            </div>
                            <InputGroup className='my-3' style={{ display: 'flex', alignItems: 'center' }}>
                            Buscar: 
                                <Form.Control                            
                                onChange={(e) => setSearch(e.target.value)}                                
                                style={{                                                                                                          
                                    borderRadius: '8px',       
                                }}
                                />
                            </InputGroup>
                            </div>                                        
                            {buscando ? "Cargando..." : (especialidades.length===0 && "No hay especialidades registradas")}
                            <Table striped bordered hover className="mt-3 mb-3" >
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Especialidad</th>
                                    <th>Fecha de Registro</th>
                                    <th>Acción</th>
                                </tr>
                                </thead>
                                <tbody>
                                {especialidades
                                .filter((item, index) => {
                                    if (cantidadRegistros === "all") {
                                      return true; // Mostrar todos los registros
                                    } else {
                                      return search.toLowerCase() === ''
                                        ? index < cantidadRegistros
                                        : item.nombre.toLowerCase().includes(search);
                                    }
                                })
                                .map((especialidad, index) => (
                                    <EspecialidadTable key={especialidad.idEspecialidad} especialidad={especialidad} contador={index + 1} />
                                ))}
                                </tbody>
                            </Table>
                            </Card.Body>
                            <Card.Footer>
                            <div className="d-flex justify-content-between align-items-center">
                                <h5>Mostrando {cantidadRegistros} de {especialidades.length} registros</h5>
                                <div>
                                    <button /* onClick={prevHandler} */>
                                    Anterior
                                    </button>
                                    <button /* onClick={nextHandler} */>
                                    Siguiente
                                    </button>
                                </div>
                            </div>
                            </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export {EspecialidadesCreadas}