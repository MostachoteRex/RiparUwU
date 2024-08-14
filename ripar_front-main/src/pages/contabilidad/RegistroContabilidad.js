import axios from "axios";
import { Container, Card, Row, Col, Table, InputGroup, Form } from "react-bootstrap"
import React, { useEffect, useState } from "react";
import { REGISTROSCONTABILIDAD_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { ContabilidadTable } from "../../components/contabilidad/ContabilidadTable";

const RegistroContabilidad=()=>{

    const [registros, setRegistros] = useState([])
    const [buscando, setBuscando] = useState(true)
    const [search, setSearch] = useState('');
    const [cantidadRegistros, setCantidadRegistros] = useState(5);    

    useEffect(()=>{
        axios.get(REGISTROSCONTABILIDAD_GET_ENDPOINT)
        .then(respuesta=>{
            setRegistros(respuesta.data)
            setBuscando(false)
        }).catch(e=>{
            console.error(e)
            setBuscando(false)
        })
    },[])

    const handleCantidadRegistrosChange = (event) => {
        const value = event.target.value;
        setCantidadRegistros(value); 
    };

    
    return (
        <Container className="mt-3 mb-3">
            <Row className="justify-content">
                <Col sm={12} md={8} lg={6}>
                    <h2 className="margen-title"><strong>Contabilidad</strong></h2>
                    <Card className="card-especialidad mt-3 mb-3">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <Card.Title className="mt-2">
                            <h4>Lista de contabilidad</h4>
                            </Card.Title>                            
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
                            {buscando ? "Cargando..." : (registros.length===0 && "No hay registros")}
                            <Table striped bordered hover className="mt-3 mb-3" >
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>No. Contrato</th>
                                    <th>Suscriptor</th>
                                    <th>Valor</th>
                                    <th>Metodo de pago</th>
                                    <th>Asesor</th>
                                    <th>Fecha de Registro</th>                                    
                                </tr>
                                </thead>
                                <tbody>
                                {registros
                                .filter((item, index) => {
                                    if (cantidadRegistros === "all") {
                                      return true; 
                                    } else {
                                        const noContrato = item.noContrato;
                                        return noContrato && noContrato.toString().toLowerCase().includes(search.toLowerCase());
                                    }
                                })
                                .map((registro, index) => (
                                    <ContabilidadTable key={registro.id} registro={registro} contador={index + 1} />
                                ))}
                                </tbody>
                            </Table>
                            </Card.Body>
                            <Card.Footer>
                            <div className="d-flex justify-content-between align-items-center">
                                <h5>Mostrando {cantidadRegistros} de {registros.length} registros</h5>
                                <div>
                                    <button >
                                    Anterior
                                    </button>
                                    <button >
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

export {RegistroContabilidad}