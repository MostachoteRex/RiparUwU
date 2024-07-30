import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function SignInForm({ errores, callback }) {

  const [documento, setDocumento] = useState("")
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    callback({documento, password})
  };

  return (
    <div>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Documento</Form.Label>
        <Form.Control
          type="text"          
          value={documento}
          onChange={e=>setDocumento(e.target.value)}
          placeholder="Ingrese el documento"
          isInvalid={errores.documento}
        />    
      </Form.Group>
      <Form.Control.Feedback type="invalid">
        {errores.documento && "El documento es requerido"}
      </Form.Control.Feedback>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"          
          value={password}
          onChange={e=>setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
          isInvalid={errores.password}
        />
      <Form.Control.Feedback type="invalid">
        {errores.password && "La contraseña es requerida"}
      </Form.Control.Feedback>
      </Form.Group>

      <Button className="SignIn-Button" type='submit' >
        Ingresar
      </Button>
    </Form>
    {/* <MostrarModal
    show={showModal}
    onHide={closeModal}
    title="Usuario no registrado"
    content="El usuario no se encuentra registrado."
  /> */}
  </div>
  );
}

export { SignInForm };
