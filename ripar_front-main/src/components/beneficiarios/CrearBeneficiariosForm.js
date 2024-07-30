import { useState } from 'react';
import { Alert, Form, Row, Col } from 'react-bootstrap';

function CrearBeneficiariosForm({errores, callback, bNombre="", bPrimerApellido="", bSegundoApellido="", bDocumento=""}) {

    const [nombre, setNombre] = useState(bNombre);
    const [primerApellido, setPrimerApellido] = useState(bPrimerApellido);
    const [segundoApellido, setSegundoApellido] = useState(bSegundoApellido);
    const [documento, setDocumento] = useState(bDocumento);    

    const handleSubmit=(e)=>{
      e.preventDefault();
      callback({        
        nombre,
        primerApellido,
        segundoApellido,
        documento,        
    })
    }

  return (

    <Form onSubmit={handleSubmit} id="beneficiario-form">
        <Row className="mb-3">    
        <Form.Group as={Col} className="mb-3" controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
            type="text" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            />
            {errores.nombre && (
            <Alert variant="danger">{errores.nombre}</Alert>
            )}
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="primerApellido">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control 
            type="text" 
            value={primerApellido}
            onChange={(e) => setPrimerApellido(e.target.value)}
            />
            {errores.primerApellido && (
            <Alert variant="danger">{errores.primerApellido}</Alert>
            )}
        </Form.Group>        
        </Row>

        <Row className="mb-3">
        <Form.Group as={Col} className="mb-3" controlId="segundoApellido">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control 
            type="text" 
            value={segundoApellido}
            onChange={(e) => setSegundoApellido(e.target.value)}
            />
            {errores.segundoApellido && (
            <Alert variant="danger">{errores.segundoApellido}</Alert>
            )}
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="documento">
            <Form.Label>Documento</Form.Label>
            <Form.Control 
            type="number" 
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            />
            {errores.documento && (
            <Alert variant="danger">{errores.documento}</Alert>
            )}
        </Form.Group>
        </Row>
    </Form>
  );
}

export { CrearBeneficiariosForm }