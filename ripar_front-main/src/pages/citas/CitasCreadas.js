import axios from "axios";
import { useEffect, useState } from "react";
import { CITASCREADAS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { Card, Container, Row, Col, Form, Table, InputGroup } from "react-bootstrap";
import { CitaTable } from "../../components/citas/CitasTable";
import { CrearCita } from "./CrearCitas";
import { DescargarExcelBoton } from "../../components/citas/DescargarExcelBoton";

const CitasCreadas = () => {
    const [citas, setCitas] = useState([]);
    const [buscando, setBuscando] = useState(true);
    const [search, setSearch] = useState('');
    const [cantidadRegistros, setCantidadRegistros] = useState(5);
    const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
        axios.get(CITASCREADAS_GET_ENDPOINT)
            .then(respuesta => {
                setCitas(respuesta.data);
                setBuscando(false);
            }).catch(e => {
                console.error(e);
                setBuscando(false);
            });
    }, []);

    useEffect(() => {
        setPaginaActual(1);
    }, [search, cantidadRegistros]);

    const filtrarCitas = () => {
        return citas.filter((item) => {
            return search.toLowerCase() === ''
                ? true
                : item.pacienteEntity && item.pacienteEntity.nombre.toLowerCase().includes(search.toLowerCase());
        });
    };

    const calcularPaginas = () => {
        const totalCitas = filtrarCitas().length;
        return cantidadRegistros === "all"
            ? 1
            : Math.ceil(totalCitas / cantidadRegistros);
    };

    const registrosFiltrados = filtrarCitas();
    const registrosPorPagina = cantidadRegistros === "all" ? registrosFiltrados.length : cantidadRegistros;
    const totalPaginas = calcularPaginas();

    const indexInicial = (paginaActual - 1) * registrosPorPagina;
    const indexFinal = cantidadRegistros === "all"
        ? registrosFiltrados.length
        : indexInicial + registrosPorPagina;

    const citasMostradas = cantidadRegistros === "all"
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
                    <h2 className="margen-title" style={{ marginTop: '90px' }}><strong>Citas</strong>
                        <DescargarExcelBoton />
                    </h2>
                    <Card className="card-especialidad mt-3 mb-3">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '50px' }}>
                                    <span style={{ paddingRight: '5px' }}>Mostrando</span>
                                    <Form.Select
                                        value={cantidadRegistros}
                                        onChange={(e) => {
                                            setCantidadRegistros(e.target.value);
                                            setPaginaActual(1);
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
                                    <span style={{ paddingRight: '5px' }}>Buscar:</span>
                                    <Form.Control
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setPaginaActual(1);
                                        }}
                                        style={{
                                            borderRadius: '8px',
                                        }}
                                    />
                                </InputGroup>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            {buscando ? "Cargando..." : (citas.length === 0 && "No hay citas registradas")}
                            <Table className="table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: '#3A6FB3', color: 'white' }}>#</th>
                                        <th style={{ backgroundColor: '#3A6FB3', color: 'white' }}>No Contrato</th>
                                        <th style={{ backgroundColor: '#3A6FB3', color: 'white' }}>Nombre del Paciente</th>
                                        <th style={{ backgroundColor: '#3A6FB3', color: 'white' }}>Documento</th>
                                        <th style={{ backgroundColor: '#3A6FB3', color: 'white' }}>Nombre Dr.</th>
                                        <th style={{ backgroundColor: '#3A6FB3', color: 'white' }}>Fecha Cita</th>
                                        <th style={{ backgroundColor: '#3A6FB3', color: 'white' }}>Hora Cita</th>
                                        <th style={{ backgroundColor: '#3A6FB3', color: 'white' }}>Ahorro</th>
                                        <th style={{ backgroundColor: '#3A6FB3', color: 'white' }}>Fecha Registro</th>
                                        <th style={{ backgroundColor: '#3A6FB3', color: 'white' }}>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {citasMostradas
                                        .map((cita, index) => (
                                            <CitaTable key={cita.idCita} cita={cita} contador={index + 1} />
                                        ))}
                                </tbody>
                            </Table>
                            <div className="contenedor-inferior">
                                <div style={{ marginLeft: '40px' }}>
                                    <CrearCita />
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

export { CitasCreadas };
