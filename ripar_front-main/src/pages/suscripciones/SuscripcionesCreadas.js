import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Form, Table, InputGroup } from "react-bootstrap";
import { SUSCRIPCIONESCREADAS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { SuscripcionTable } from "../../components/suscripciones/SuscripcionTable";
import { CrearSuscripcion } from "./CrearSuscripcion";

const SuscripcionesCreadas = () => {
    const [suscripciones, setSuscripciones] = useState([]);
    const [buscando, setBuscando] = useState(true);
    const [search, setSearch] = useState('');
    const [cantidadRegistros, setCantidadRegistros] = useState(5);
    const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
        axios.get(SUSCRIPCIONESCREADAS_GET_ENDPOINT)
            .then(respuesta => {
                setSuscripciones(respuesta.data);
                setBuscando(false);
            }).catch(e => {
                console.error(e);
                setBuscando(false);
            });
    }, []);

    const filtrarSuscripciones = () => {
        return suscripciones.filter((item) => {
            return search.toLowerCase() === ''
                ? true
                : item.suscriptorEntity.nombre.toLowerCase().includes(search.toLowerCase());
        });
    };

    const calcularPaginas = () => {
        const totalSuscripciones = filtrarSuscripciones().length;
        return cantidadRegistros === "all"
            ? 1
            : Math.ceil(totalSuscripciones / cantidadRegistros);
    };

    const registrosFiltrados = filtrarSuscripciones();
    const registrosPorPagina = cantidadRegistros === "all" ? registrosFiltrados.length : cantidadRegistros;
    const totalPaginas = calcularPaginas();

    const indexInicial = (paginaActual - 1) * registrosPorPagina;
    const indexFinal = cantidadRegistros === "all"
        ? registrosFiltrados.length
        : indexInicial + registrosPorPagina;

    const suscripcionesMostradas = cantidadRegistros === "all"
        ? registrosFiltrados
        : registrosFiltrados.slice(indexInicial, indexFinal);

    const irPaginaSiguiente = () => {
        if (paginaActual < totalPaginas) {
            setPaginaActual(paginaActual + 1);
        }
    };

    const irPaginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };

    return (
        <Container className="mt-3 mb-3">
            <Row>
                <Col sm={12} md={8} lg={6}>
                    <h2 className="margen-title"><strong>Suscripciones</strong></h2>
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
                            {buscando ? "Cargando..." : (suscripciones.length === 0 && "No hay suscripciones registradas")}
                            <Table className="table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: '#208cbe', color: 'white' }}>#</th>
                                        <th style={{ backgroundColor: '#006cb5cc', color: 'white' }}>No. Contrato</th>
                                        <th style={{ backgroundColor: '#006cb5cc', color: 'white' }}>Nombre</th>
                                        <th style={{ backgroundColor: '#006cb5cc', color: 'white' }}>Fecha Suscripción</th>
                                        <th style={{ backgroundColor: '#006cb5cc', color: 'white' }}>Fecha Vencimiento</th>
                                        <th style={{ backgroundColor: '#006cb5cc', color: 'white' }}>Teléfono</th>
                                        <th style={{ backgroundColor: '#006cb5cc', color: 'white' }}>Estado</th>
                                        <th style={{ backgroundColor: '#006cb5cc', color: 'white' }}>Fecha de Registro</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {suscripcionesMostradas
                                        .map((suscripcion, index) => (
                                            <SuscripcionTable key={suscripcion.idSuscripcion} suscripcion={suscripcion} contador={index + 1} />
                                        ))}
                                </tbody>
                            </Table>
                            <div className="contenedor-inferior">
                                <div className="ms-auto">
                                    <CrearSuscripcion />
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
                                        Mostrando {indexInicial + 1} - {Math.min(indexFinal, registrosFiltrados.length)} de {registrosFiltrados.length} registros
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

export { SuscripcionesCreadas };
