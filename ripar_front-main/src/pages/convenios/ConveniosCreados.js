import axios from "axios";
import { useEffect, useState } from "react"
import { CONVENIOSCREADOS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { Card, Container, Row, Col, Form, Table, InputGroup } from "react-bootstrap";
import { ConvenioTable } from "../../components/convenio/ConvenioTable";
import { CrearConvenio } from "./CrearConvenio";


const ConveniosCreados=()=>{

    const [convenios, setConvenios] = useState([])
    const [buscando, setBuscando] = useState(true)
    const [search, setSearch] = useState('');
    const [cantidadRegistros, setCantidadRegistros] = useState(5);

    useEffect(()=>{
        axios.get(CONVENIOSCREADOS_GET_ENDPOINT)
        .then(respuesta=>{
            setConvenios(respuesta.data)
            setBuscando(false)
        }).catch(e=>{
            console.error(e)
            setBuscando(false)
        })
    },[])

    const handleCantidadRegistrosChange = (event) => {
        const value = event.target.value;
        setCantidadRegistros(value); // Asegúrate de que `cantidadRegistros` sea un número
    };

    return(
        <Container className="mt-3 mb-3" >
            <Row>
                <Col sm={12} md={8} lg={6}>
                <h2 className="margen-title"><strong>Convenios</strong></h2>
                <Card className="card-especialidad mt-3 mb-3">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title className="mt-2">
                            <h4>Lista de convenios</h4>
                        </Card.Title>
                        <div className="ms-auto">
                            <CrearConvenio />
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
                            {buscando ? "Cargando..." : (convenios.length===0 && "No hay convenios registrados")}
                            <Table striped bordered hover className="mt-3 mb-3" >
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
                                {convenios
                                .filter((item, index) => {
                                    if (cantidadRegistros === "all") {
                                      return true; // Mostrar todos los registros
                                    } else {
                                      return search.toLowerCase() === ''
                                        ? index < cantidadRegistros
                                        : item.nombre.toLowerCase().includes(search);
                                    }
                                })
                                .map((convenio, index) => (
                                    <ConvenioTable key={convenio.idConvenio} convenio={convenio} contador={index + 1} />
                                ))}
                                </tbody>
                            </Table>
                            </Card.Body>
                     <Card.Footer>
                        <div className="d-flex justify-content-between align-items-center">
                        <h5>Mostrando {cantidadRegistros} de {convenios.length} registros</h5>
                            <div>
                                <button>
                                    Anterior
                                </button>
                                <button>
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

export { ConveniosCreados }