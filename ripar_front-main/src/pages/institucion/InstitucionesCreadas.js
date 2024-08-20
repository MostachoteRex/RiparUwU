import axios from "axios";
import { useEffect, useState } from "react";
import { INSTITUCIONESCREADAS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { Card, Container, Row, Col, Form, Table, InputGroup } from "react-bootstrap";
import { CrearInstitucion } from "./CrearInstitucion";
import { InstitucionTable } from "../../components/institucion/InstitucionTable";

const InstitucionesCreadas = () => {
    const [instituciones, setInstituciones] = useState([]);
    const [buscando, setBuscando] = useState(true);
    const [search, setSearch] = useState('');
    const [cantidadRegistros, setCantidadRegistros] = useState(5);
    const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
        axios.get(INSTITUCIONESCREADAS_GET_ENDPOINT)
            .then(respuesta => {
                setInstituciones(respuesta.data);
                setBuscando(false);
            }).catch(e => {
                console.error(e);
                setBuscando(false);
            });
    }, []);

    useEffect(() => {
        setPaginaActual(1); // Resetear a la primera página cuando cambie la búsqueda o la cantidad de registros
    }, [search, cantidadRegistros]);

    const filtrarInstituciones = () => {
        if (!Array.isArray(instituciones)) {
            console.error("Datos de instituciones no son un array");
            return [];
        }

        return instituciones.filter((item) => {
            const nombreEspecialidad = item.especialidadEntity?.nombre?.toLowerCase() || '';
            return search.toLowerCase() === ''
                ? true
                : nombreEspecialidad.includes(search.toLowerCase());
        });
    };

    const filtrarYPaginarInstituciones = () => {
        const institucionesFiltradas = filtrarInstituciones();

        if (cantidadRegistros === "all") {
            return institucionesFiltradas;
        }

        const indexInicial = (paginaActual - 1) * cantidadRegistros;
        const indexFinal = indexInicial + cantidadRegistros;

        return institucionesFiltradas.slice(indexInicial, indexFinal);
    };

    const totalPaginas = () => {
        const totalRegistros = filtrarInstituciones().length;
        return cantidadRegistros === "all"
            ? 1
            : Math.ceil(totalRegistros / cantidadRegistros);
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

    const institucionesMostradas = filtrarYPaginarInstituciones();

    return (
        <Container className="mt-3 mb-3">
            <Row>
                <Col sm={12} md={8} lg={6}>
                    <h2 className="margen-title" style={{marginTop: '90px'}}><strong>Instituciones</strong></h2>
                    <Card className="card-especialidad mt-3 mb-3">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '50px'    }}>
                                    <span style={{paddingRight: '5px'}}>Mostrando</span>
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
                                    <span style={{paddingLeft: '5px'}}>registros</span>
                                </div>
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
                            {buscando ? "Cargando..." : (instituciones.length === 0 ? "No hay instituciones registradas" : "")}
                            <Table className="table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Especialidad</th>
                                        <th>Institución</th>
                                        <th>Direccion</th>
                                        <th>Fecha de Registro</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {institucionesMostradas.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center">No se encontraron instituciones</td>
                                        </tr>
                                    ) : (
                                        institucionesMostradas.map((institucion, index) => (
                                            <InstitucionTable key={institucion.idInstitucion} institucion={institucion} contador={index + 1} />
                                        ))
                                    )}
                                </tbody>
                            </Table>
                            <div className="ms-auto">
                                <CrearInstitucion />
                            </div>
                        </Card.Body>
                        {cantidadRegistros !== "all" && (
                            <Card.Footer>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5>
                                        Mostrando {((paginaActual - 1) * cantidadRegistros) + 1} - {Math.min(paginaActual * cantidadRegistros, filtrarInstituciones().length)} de {filtrarInstituciones().length} registros
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

export { InstitucionesCreadas };
