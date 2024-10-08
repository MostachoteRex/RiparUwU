import axios from "axios";
import { Container, Card, Row, Col, Table, InputGroup, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { ROLESCREADOS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { RolTable } from "../../components/rol/RolTable";
import { CrearRol } from "./CrearRol";

const RolesCreados = () => {

    const [roles, setRoles] = useState([]);
    const [buscando, setBuscando] = useState(true);
    const [search, setSearch] = useState('');
    const [cantidadRegistros, setCantidadRegistros] = useState(5);
    const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
        axios.get(ROLESCREADOS_GET_ENDPOINT)
            .then(respuesta => {
                setRoles(respuesta.data);
                setBuscando(false);
            }).catch(e => {
                console.error(e);
                setBuscando(false);
            });
    }, []);

    useEffect(() => {
        setPaginaActual(1); // Resetear a la primera página cuando cambie la búsqueda o la cantidad de registros
    }, [search, cantidadRegistros]);

    const filtrarRoles = () => {
        if (!Array.isArray(roles)) {
            console.error("Datos de roles no son un array");
            return [];
        }

        return roles.filter((rol) => {
            return rol.nombre.toLowerCase().includes(search.toLowerCase());
        });
    };

    const filtrarYPaginarRoles = () => {
        const rolesFiltrados = filtrarRoles();

        if (cantidadRegistros === "all") {
            return rolesFiltrados;
        }

        const indexInicial = (paginaActual - 1) * cantidadRegistros;
        const indexFinal = indexInicial + cantidadRegistros;

        return rolesFiltrados.slice(indexInicial, indexFinal);
    };

    const totalPaginas = () => {
        const totalRegistros = filtrarRoles().length;
        return cantidadRegistros === "all" ? 1 : Math.ceil(totalRegistros / cantidadRegistros);
    };

    const irPaginaSiguiente = () => {
        if (paginaActual < totalPaginas()) {
            setPaginaActual(paginaActual + 1);
        }
    };

    const irPaginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };

    const rolesMostrados = filtrarYPaginarRoles();

    return (
        <Container className="mt-3 mb-3">
            <Row className="justify-content">
                <Col sm={12} md={8} lg={6}>
                    <h2 className="margen-title"><strong>Roles</strong></h2>
                    <Card className="card-especialidad mt-3 mb-3">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '50px' }}>
                                    <span style={{ paddingRight: '5px' }}>Mostrando</span>
                                    <Form.Select
                                        value={cantidadRegistros}
                                        onChange={(e) => {
                                            setCantidadRegistros(e.target.value);
                                            setPaginaActual(1); // Resetear a la primera página cuando cambie la cantidad de registros
                                        }}
                                    >
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                        <option value="all">All</option>
                                    </Form.Select>
                                    <span style={{ paddingLeft: '5px' }}>registros</span>
                                </div>
                                <InputGroup className='my-3' style={{ display: 'flex', alignItems: 'center', marginLeft: '570px' }}>
                                    Buscar:
                                    <Form.Control
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setPaginaActual(1); // Resetear a la primera página cuando cambie la búsqueda
                                        }}
                                        style={{
                                            borderRadius: '8px',
                                        }}
                                    />
                                </InputGroup>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            {buscando ? "Cargando..." : (roles.length === 0 ? "No hay roles registrados" : "")}
                            <Table className="table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: '#208cbe', color: 'white' }}>#</th>
                                        <th style={{ backgroundColor: '#006cb5cc', color: 'white' }}>Rol</th>
                                        <th style={{ backgroundColor: '#006cb5cc', color: 'white' }}>Estado</th>
                                        <th style={{ backgroundColor: '#006cb5cc', color: 'white' }}>Fecha de Registro</th>
                                        <th style={{ backgroundColor: '#006cb5cc', color: 'white' }}>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rolesMostrados.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center">No se encontraron roles</td>
                                        </tr>
                                    ) : (
                                        rolesMostrados.map((rol, index) => (
                                            <RolTable key={rol.idRol} rol={rol} contador={index + 1} />
                                        ))
                                    )}
                                </tbody>
                            </Table>
                            <div className="contenedor-inferior">
                                <div className="ms-auto">
                                    <CrearRol />
                                </div>
                                <div className="boton-a-s">
                                    <button className="boton-anterior" onClick={irPaginaAnterior} disabled={paginaActual === 1}>
                                        Anterior
                                    </button>
                                    <button className="boton-siguiente" onClick={irPaginaSiguiente} disabled={paginaActual === totalPaginas}>
                                        Siguiente
                                    </button>
                                </div>
                            </div>
                        </Card.Body>
                        {cantidadRegistros !== "all" && (
                            <Card.Footer>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5>
                                        Mostrando {((paginaActual - 1) * cantidadRegistros) + 1} - {Math.min(paginaActual * cantidadRegistros, filtrarRoles().length)} de {filtrarRoles().length} registros
                                    </h5>
                                </div>
                            </Card.Footer>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export { RolesCreados };
