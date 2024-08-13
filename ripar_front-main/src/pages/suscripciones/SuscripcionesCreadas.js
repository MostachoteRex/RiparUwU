import axios from "axios";
import { useEffect, useState } from "react"
import { Card, Container, Row, Col, Form, Table, InputGroup } from "react-bootstrap";
import { SUSCRIPCIONESCREADAS_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { SuscripcionTable } from "../../components/suscripciones/SuscripcionTable";
import { CrearSuscripcion } from "./CrearSuscripcion";


const SuscripcionesCreadas=()=>{

    const [suscripciones, setSuscripciones] = useState([])
    /* const [suscriptores, setSuscriptores] */
    const [buscando, setBuscando] = useState(true)
    const [search, setSearch] = useState('');
    const [cantidadRegistros, setCantidadRegistros] = useState(5);

    useEffect(()=>{
        axios.get(SUSCRIPCIONESCREADAS_GET_ENDPOINT)
        .then(respuesta=>{
            setSuscripciones(respuesta.data)            
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

    return (
        <Container className="mt-3 mb-3" >
            <Row>
                <Col sm={12} md={8} lg={6}>
                <h2 className="margen-title"><strong>Suscripciones</strong></h2>
                <Card className="card-especialidad mt-3 mb-3">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                        <Card.Title className="mt-2">
                            <h4>Lista de suscripciones</h4>
                        </Card.Title>
                        <div className="ms-auto">
                            <CrearSuscripcion />
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
                            {buscando ? "Cargando..." : (suscripciones.length===0 && "No hay suscripciones registradas")}
                            <Table striped bordered hover className="mt-3 mb-3" >
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>No. Contrato</th>
                                    <th>Nombre</th>
                                    <th>Fecha Suscripcion</th>
                                    <th>Fecha Vencimiento</th>
                                    <th>Telefono</th>
                                    <th>Estado</th>
                                    <th>Fecha de Registro</th>                                    
                                </tr>
                                </thead>
                                <tbody>
                                {suscripciones
                                .filter((item, index) => {
                                    if (cantidadRegistros === "all") {
                                      return true; // Mostrar todos los registros
                                    } else {
                                        // console.log(search);
                                        // const nombre = "thomas";
                                        // console.log(item);
                                        // return;
                                        // return item.suscriptorEntity.nombre.toLowerCase().includes(search);
                                            // item.nombre.toLowerCase()
                                       return search.toLocaleLowerCase() === ''
                                         ? index < cantidadRegistros
                                        :  item.suscriptorEntity.nombre.toLowerCase().includes(search)
                                    }
                                })
                                .map((suscripcion, index) => (
                                    <SuscripcionTable key={suscripcion.idSuscripcion} suscripcion={suscripcion} contador={index + 1} />
                                ))}
                                </tbody>
                            </Table>
                            </Card.Body>
                     <Card.Footer>
                        <div className="d-flex justify-content-between align-items-center">
                        <h5>Mostrando {cantidadRegistros} de {suscripciones.length} registros</h5>
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

export {SuscripcionesCreadas}