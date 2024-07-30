import { Card, Container, Row, Col } from "react-bootstrap";
import { SuscripcionesGrafico } from "../components/suscripciones/SuscripcionesGrafico";
import { CONVENIOSCREADOS_GET_ENDPOINT, SUSCRIPCIONESCREADAS_GET_ENDPOINT, USUARIOCREADOS_GET_ENDPOINT } from "../connections/helpers/endpoints";
import { useEffect, useState } from "react";
import axios from 'axios';

const Homepage = () => {

  const [suscripciones, setSuscripciones] = useState([]);
  const [convenios, setConvenios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {    
    axios.get(SUSCRIPCIONESCREADAS_GET_ENDPOINT)
      .then(response => {
        setSuscripciones(response.data);
      })
      .catch(error => {
        console.error('Error al obtener suscripciones:', error);
      });
  }, []);

  useEffect(() => {    
    axios.get(CONVENIOSCREADOS_GET_ENDPOINT)
      .then(response => {
        setConvenios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener convenios:', error);
      });
  }, []);

  useEffect(() => {    
    axios.get(USUARIOCREADOS_GET_ENDPOINT)
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los usuarios:', error);
      });
  }, []);
    
  return (
    <Container className="mi-dashboard mb-3">
      <h1 className="text-left mb-3"><strong>Dashboard</strong></h1>            
      <Row className=" mb-5 mt-5">
      <Col>
        <Card className="mi-custom-card">
          <Card.Body>
          <Row className="align-items-end flex-column-reverse">
          <Col>
            <Card.Subtitle style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Suscripciones Registradas</Card.Subtitle>
          </Col>
          <Col className="text-end">
            <Card.Title style={{ fontSize: '4rem', fontWeight: 'bold' }}>{suscripciones.length}</Card.Title>
          </Col>
        </Row>
          </Card.Body>
        </Card>
      </Col>

      <Col>
        <Card className="mi-custom-card">
          <Card.Body>
          <Row className="align-items-end flex-column-reverse">
          <Col>
            <Card.Subtitle style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Convenios Registrados</Card.Subtitle>
          </Col>
          <Col className="text-end">
            <Card.Title style={{ fontSize: '4rem', fontWeight: 'bold' }}>{convenios.length}</Card.Title>
          </Col>
        </Row>
          </Card.Body>
        </Card>
      </Col>

      <Col>
        <Card className="mi-custom-card">
          <Card.Body>
          <Row className="align-items-end flex-column-reverse">
          <Col>
            <Card.Subtitle style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Usuarios Registrados</Card.Subtitle>
          </Col>
          <Col className="text-end">
            <Card.Title style={{ fontSize: '4rem', fontWeight: 'bold' }}>{usuarios.length}</Card.Title>
          </Col>
        </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
      <SuscripcionesGrafico />
    </Container>
  );
}

export { Homepage };