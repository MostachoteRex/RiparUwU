import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Form, Row, Col } from 'react-bootstrap';
import { ROLESCREADOS_GET_ENDPOINT } from '../../connections/helpers/endpoints';

function CrearUsuarioForm({errores, callback, uNombre="", iApellido="", iDocumento="", iPassword="", iEmail=""}) {

    const [nombre, setNombre] = useState(uNombre);
    const [apellido, setApellido] = useState(iApellido);
    const [documento, setDocumento] = useState(iDocumento);
    const [email, setEmail] = useState(iEmail);
    const [password, setPassword] = useState(iPassword);
    const [roles, setRoles] = useState([])
    const [selectedRol, setSelectedRol] = useState("");

    useEffect(()=>{
        axios.get(ROLESCREADOS_GET_ENDPOINT)
        .then(respuesta =>{
            setRoles(respuesta.data)
        }).catch(e=>{
            console.error(e)
        })
    },[roles])

    const handleSubmit=(e)=>{
      e.preventDefault();
      callback({
        idRol: selectedRol,
        nombre,
        apellido,
        documento,
        email,
        password,

    })
    }

  return (

    <Form onSubmit={handleSubmit} id="usuario-form">
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

        <Form.Group as={Col} className="mb-3" controlId="apellido">
            <Form.Label>Apellido</Form.Label>
            <Form.Control 
            type="text" 
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            />
            {errores.apellido && (
            <Alert variant="danger">{errores.apellido}</Alert>
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

        <Row className="mb-3">        
        <Form.Group as={Col} className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            {errores.email && (
            <Alert variant="danger">{errores.email}</Alert>
            )}
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            {errores.password && (
            <Alert variant="danger">{errores.password}</Alert>
            )}
        </Form.Group>

        <Form.Group as={Col} className="mb-3" controlId="rol">
            <Form.Label>Rol</Form.Label>
            <Form.Select aria-label="Elija un rol"
            value={selectedRol}
            onChange={(e) => setSelectedRol(e.target.value)} 
            >
            <option value="">Seleccione una rol</option>
            {roles.map((rol)=> (
                <option key={rol.idRol} value={rol.idRol}>                
                {rol.nombre}
                </option>
            ))}
            </Form.Select>
        </Form.Group>
        </Row>
    </Form>
  );
}

export { CrearUsuarioForm }