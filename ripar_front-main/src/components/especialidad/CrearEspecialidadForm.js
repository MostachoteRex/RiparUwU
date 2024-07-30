import { useState } from 'react';
import { Form, Alert } from 'react-bootstrap';

function EspecialidadForm({errores, callback, eNombre=""}) {

  const [nombre, setNombre] = useState(eNombre);

  const handleSubmit=(e)=>{
    e.preventDefault();
    callback({nombre})
  }

  return (

    <Form onSubmit={handleSubmit} id="especialidad-form">
      <Form.Group controlId="nombre">
        <Form.Label>Nombre de la Especialidad</Form.Label>
        <Form.Control
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        {errores.nombre && (
          <Alert variant="danger">{errores.nombre}</Alert>
        )}
      </Form.Group>
    </Form>
  );
}

export {EspecialidadForm};
