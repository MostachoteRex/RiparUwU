import axios from "axios";
import { Container, Card, Row, Col, Table, InputGroup, Form } from "react-bootstrap"
import React, { useEffect, useState } from "react";
import { USUARIOCREADOS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { UsuariosTable } from "../../components/usuarios/UsuariosTable";
import { CrearUsuario } from "./CrearUsuario";

const UsuariosCreados=()=>{

    const [usuarios, setUsuarios] = useState([])
    const [buscando, setBuscando] = useState(true)
    const [search, setSearch] = useState('');
    const [cantidadRegistros, setCantidadRegistros] = useState(5);

    useEffect(()=>{
        axios.get(USUARIOCREADOS_GET_ENDPOINT)
        .then(respuesta=>{
            setUsuarios(respuesta.data)
            setBuscando(false)
        }).catch(e=>{
            console.error(e)
            setBuscando(false)
        })
    },[usuarios, cantidadRegistros, search])

    const handleCantidadRegistrosChange = (event) => {
        const value = event.target.value;
        setCantidadRegistros(value); 
    };

    
    return (
        <Container className="mt-3 mb-3">
            <Row className="justify-content">
                <Col sm={12} md={8} lg={6}>
                    <h2 className="margen-title"><strong>Usuarios</strong></h2>
                    <Card className="card-especialidad mt-3 mb-3">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <Card.Title className="mt-2">
                            <h4>Lista de usuarios</h4>
                            </Card.Title>
                            <div className="ms-auto">
                                <CrearUsuario />
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
                            {buscando ? "Cargando..." : (usuarios.length===0 && "No hay usuarios registrados")}
                            <Table striped bordered hover className="mt-3 mb-3" >
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Documento</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Fecha de Registro</th>
                                    <th>Acción</th>
                                </tr>
                                </thead>
                                <tbody>
                                {usuarios
                                .filter((item, index) => {
                                    if (cantidadRegistros === "all") {
                                      return true; 
                                    } else {
                                      return search.toLowerCase() === ''
                                        ? index < cantidadRegistros
                                        : item.nombre.toLowerCase().includes(search);
                                    }
                                })
                                .map((usuario, index) => (
                                    <UsuariosTable key={usuario.idUsuario} usuario={usuario} contador={index + 1} />
                                ))}
                                </tbody>
                            </Table>
                            </Card.Body>
                            <Card.Footer>
                            <div className="d-flex justify-content-between align-items-center">
                                <h5>Mostrando {cantidadRegistros} de {usuarios.length} registros</h5>
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

export {UsuariosCreados}