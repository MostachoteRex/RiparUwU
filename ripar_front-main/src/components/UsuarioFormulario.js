import { MostrarModal } from "./modal"
import { Button } from "react-bootstrap"
import { useState } from "react";
import { Form } from "react-bootstrap";
import { BsFillPlusCircleFill } from "react-icons/bs";

const UsuarioFormulario = ({ onUserSubmit }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    onUserSubmit(userData);

    setName('');
    setEmail('');
    setPassword('');
    closeModal();
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="UsuarioForm">
      <Button className="newUsuario-button" onClick={openModal}><BsFillPlusCircleFill size={20}/>Crear Usuario</Button>
      <MostrarModal
        show={showModal}
        onHide={closeModal}
        title="Crear Nuevo Usuario"
        content={
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                /* placeholder="Ingrese el nombre del usuario" */
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo Electrónico:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                /* placeholder="Ingrese el email" */
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /* placeholder="Ingrese la contraseña" */
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Crear Usuario
            </Button>
          </Form>
        }
      />
    </div>
  );
}

export { UsuarioFormulario }
