import axios from "axios";
import { useEffect, useState } from "react";
import { CONVENIOSCREADOS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { Card, Container, Row, Col, Form, Table, InputGroup } from "react-bootstrap";
import { ConvenioTable } from "../../components/convenio/ConvenioTable";
import { CrearConvenio } from "./CrearConvenio";

const ConveniosCreados = () => {
    const [convenios, setConvenios] = useState([]);
    const [buscando, setBuscando] = useState(true);
    const [search, setSearch] = useState('');
    const [cantidadRegistros, setCantidadRegistros] = useState(5);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);

    useEffect(() => {
        axios.get(CONVENIOSCREADOS_GET_ENDPOINT)
            .then(respuesta => {
                const datos = respuesta.data;
                setConvenios(datos);

                // Calcular el total de páginas
                const totalPaginas = Math.ceil(datos.length / cantidadRegistros);
                setTotalPaginas(totalPaginas);

                setBuscando(false);
            }).catch(e => {
                console.error(e);
                setBuscando(false);
            });
    }, [cantidadRegistros]);

    useEffect(() => {
        // Recalcular el total de páginas cuando cambie la búsqueda o la cantidad de registros
        const totalPaginas = cantidadRegistros === "all"
            ? 1
            : Math.ceil(filtrarConvenios().length / cantidadRegistros);
        setTotalPaginas(totalPaginas);
        setPaginaActual(1); // Resetear a la primera página cuando cambie la búsqueda o la cantidad de registros
    }, [search, cantidadRegistros]);

    const handleCantidadRegistrosChange = (event) => {
        const value = event.target.value;
        setCantidadRegistros(value);
        setPaginaActual(1); // Resetear a la primera página cuando cambie la cantidad de registros
    };

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

    const filtrarConvenios = () => {
        return convenios.filter((item) => {
            if (search.toLowerCase() === '') {
                return true;
            } else {
                const especialidadEntity = item.especialidadEntity;
                const nombreEspecialidad = especialidadEntity && especialidadEntity.nombre;
                return nombreEspecialidad && nombreEspecialidad.toLowerCase().includes(search.toLowerCase());
            }
        });
    };

    const registrosFiltrados = filtrarConvenios();
    const registrosPorPagina = cantidadRegistros === "all" ? registrosFiltrados.length : cantidadRegistros;
    const indexInicial = (paginaActual - 1) * registrosPorPagina;
    const indexFinal = indexInicial + registrosPorPagina;

    const conveniosMostrados = cantidadRegistros === "all"
        ? registrosFiltrados
        : registrosFiltrados.slice(indexInicial, indexFinal);

    return (
        <Container className="mt-3 mb-3">
            <Row>
                <Col sm={12} md={8} lg={6}>
                    <h2 className="margen-title" style={{marginTop: '90px'}}><strong>Convenios</strong></h2>
                    <Card className="card-especialidad mt-3 mb-3">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '50px' }}>
                                    <span style={{paddingRight: '5px'}}>Mostrando</span>
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
                                    <span style={{paddingLeft: '5px'}}>registros</span>
                                </div>
                                <InputGroup className='my-3' style={{ display: 'flex', alignItems: 'center', marginLeft: '550px' }}>
                                    Buscar:
                                    <Form.Control
                                        onChange={(e) => setSearch(e.target.value)}
                                        style={{
                                            borderRadius: '8px',
                                        }}
                                    />
                                </InputGroup>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            {buscando ? "Cargando..." : (convenios.length === 0 && "No hay convenios registrados")}
                            <Table className="table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Especialidad</th>
                                        <th>Institución</th>
                                        <th>Direccion</th>
                                        <th>Nombre Dr.</th>
                                        <th>Tarifa Particular</th>
                                        <th>Tarifa Multipreventiva</th>
                                        <th>Fecha de Registro</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {conveniosMostrados
                                        .map((convenio, index) => (
                                            <ConvenioTable key={convenio.idConvenio} convenio={convenio} contador={index + 1} />
                                        ))}
                                </tbody>
                            </Table>
                            <div className="ms-auto">
                                <CrearConvenio />
                            </div>
                        </Card.Body>
                        {cantidadRegistros !== "all" && (
                            <Card.Footer>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5>
                                        Mostrando {indexInicial + 1} - {Math.min(indexFinal, convenios.length)} de {convenios.length} registros
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

export { ConveniosCreados };
