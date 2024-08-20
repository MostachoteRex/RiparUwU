import axios from "axios";
import { Container, Card, Row, Col, Table, InputGroup, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { USUARIOCREADOS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { UsuariosTable } from "../../components/usuarios/UsuariosTable";
import { CrearUsuario } from "./CrearUsuario";

const UsuariosCreados = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [buscando, setBuscando] = useState(true);
    const [search, setSearch] = useState('');
    const [cantidadRegistros, setCantidadRegistros] = useState(5);
    const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
        axios.get(USUARIOCREADOS_GET_ENDPOINT)
            .then(respuesta => {
                setUsuarios(respuesta.data);
                setBuscando(false);
            }).catch(e => {
                console.error(e);
                setBuscando(false);
            });
    }, []);

    useEffect(() => {
        setPaginaActual(1); // Resetear a la primera página cuando cambie la búsqueda o la cantidad de registros
    }, [search, cantidadRegistros]);

    const filtrarUsuarios = () => {
        if (!Array.isArray(usuarios)) {
            console.error("Datos de usuarios no son un array");
            return [];
        }

        return usuarios.filter((usuario) => {
            return usuario.nombre.toLowerCase().includes(search.toLowerCase());
        });
    };

    const filtrarYPaginarUsuarios = () => {
        const usuariosFiltrados = filtrarUsuarios();

        if (cantidadRegistros === "all") {
            return usuariosFiltrados;
        }

        const indexInicial = (paginaActual - 1) * cantidadRegistros;
        const indexFinal = indexInicial + cantidadRegistros;

        return usuariosFiltrados.slice(indexInicial, indexFinal);
    };

    const totalPaginas = () => {
        const totalRegistros = filtrarUsuarios().length;
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

    const usuariosMostrados = filtrarYPaginarUsuarios();

    return (
        <Container className="mt-3 mb-3">
            <Row className="justify-content">
                <Col sm={12} md={8} lg={6}>
                    <h2 className="margen-title" style={{ marginTop: '90px' }}><strong>Usuarios</strong></h2>
                    <Card className="card-especialidad mt-3 mb-3">
                        <Card.Header className="d-flex justify-content-between align-items-center">
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
                            <div className="d-flex justify-content-between align-items-center">
                                <InputGroup className='my-3' style={{ display: 'flex', alignItems: 'center', marginLeft: '540px' }}>
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
                            {buscando ? "Cargando..." : (usuarios.length === 0 ? "No hay usuarios registrados" : "")}
                            <Table className="table-bordered">
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
                                    {usuariosMostrados.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center">No se encontraron usuarios</td>
                                        </tr>
                                    ) : (
                                        usuariosMostrados.map((usuario, index) => (
                                            <UsuariosTable key={usuario.idUsuario} usuario={usuario} contador={index + 1} />
                                        ))
                                    )}
                                </tbody>
                            </Table>
                            <div className="ms-auto">
                                <CrearUsuario />
                            </div>
                        </Card.Body>
                        {cantidadRegistros !== "all" && (
                            <Card.Footer>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5>
                                        Mostrando {((paginaActual - 1) * cantidadRegistros) + 1} - {Math.min(paginaActual * cantidadRegistros, filtrarUsuarios().length)} de {filtrarUsuarios().length} registros
                                    </h5>
                                    <div>
                                        <button onClick={irPaginaAnterior} disabled={paginaActual === 1}>
                                            Anterior
                                        </button>
                                        <button onClick={irPaginaSiguiente} disabled={paginaActual === totalPaginas()}>
                                            Siguiente
                                        </button>
                                    </div>
                                </div>
                            </Card.Footer>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export { UsuariosCreados };
