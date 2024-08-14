import axios from "axios";
import { useEffect, useState } from "react";
import { CITASCREADAS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { Card, Container, Row, Col, Form, Table, InputGroup } from "react-bootstrap";
import { CitaTable } from "../../components/citas/CitasTable";
import { CrearCita } from "./CrearCitas";

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
        setPaginaActual(1); // Resetear a la primera página cuando cambie la búsqueda o la cantidad de registros
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
                    <h2 className="margen-title"><strong>Citas</strong></h2>
                    <Card className="card-especialidad mt-3 mb-3">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <Card.Title className="mt-2">
                                <h4>Lista de citas</h4>
                            </Card.Title>
                            <div className="ms-auto">
                                <CrearCita />
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span>Mostrando </span>
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
                                    <span> registros</span>
                                </div>
                                <InputGroup className='my-3' style={{ display: 'flex', alignItems: 'center' }}>
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
                            {buscando ? "Cargando..." : (citas.length === 0 && "No hay citas registradas")}
                            <Table striped bordered hover className="mt-3 mb-3">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>No Contrato</th>
                                        <th>Nombre del Paciente</th>
                                        <th>Documento</th>
                                        <th>Nombre Dr.</th>
                                        <th>Fecha Cita</th>
                                        <th>Hora Cita</th>
                                        <th>Ahorro</th>
                                        <th>Fecha Registro</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {citasMostradas
                                        .map((cita, index) => (
                                            <CitaTable key={cita.idCita} cita={cita} contador={index + 1} />
                                        ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                        {cantidadRegistros !== "all" && (
                            <Card.Footer>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5>
                                        Mostrando {indexInicial + 1} - {Math.min(indexFinal, registrosFiltrados.length)} de {registrosFiltrados.length} registros
                                    </h5>
                                    <div>
                                        <button onClick={irPaginaAnterior} disabled={paginaActual === 1}>
                                            Anterior
                                        </button>
                                        <button onClick={irPaginaSiguiente} disabled={paginaActual === totalPaginas}>
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

export { CitasCreadas };
