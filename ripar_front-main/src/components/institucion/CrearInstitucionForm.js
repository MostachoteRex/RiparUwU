import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { ESPECIALIDADESCREADAS_GET_ENDPOINT } from '../../connections/helpers/endpoints';

function CrearInstitucionForm({errores, callback, iNombre="", iDireccion=""}) {

    const [nombre, setNombre] = useState(iNombre);
    const [direccion, setDireccion] = useState(iDireccion);
    const [especialidades, setEspecialidades] = useState([])
    const [selectedEspecialidad, setSelectedEspecialidad] = useState("");

    useEffect(()=>{
        axios.get(ESPECIALIDADESCREADAS_GET_ENDPOINT)
        .then(respuesta =>{
            setEspecialidades(respuesta.data)
        }).catch(e=>{
            console.error(e)
        })
    },[especialidades])

    const handleSubmit=(e)=>{
      e.preventDefault();
      callback({
        idEspecialidad: selectedEspecialidad,
        nombre,
        direccion,
    })
    }

  return (

    <Form onSubmit={handleSubmit} id="institucion-form">
      <Form.Group className="mb-3">
        <Form.Label>Especialidad</Form.Label>
        <Form.Select aria-label="Elija una especialidad"
        value={selectedEspecialidad}
        onChange={(e) => setSelectedEspecialidad(e.target.value)} // Maneja el cambio de selección
        >
        <option value="">Seleccione una especialidad</option>
        {especialidades.map((especialidad)=> (
            <option key={especialidad.idEspecialidad} value={especialidad.idEspecialidad}>                
            {especialidad.nombre}
            </option>
        ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="nombre">
        <Form.Label>Nombre de la Institución</Form.Label>
        <Form.Control 
          type="text" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        {errores.nombre && (
          <Alert variant="danger">{errores.nombre}</Alert>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="direccion">
        <Form.Label>Dirección de la Institución</Form.Label>
        <Form.Control 
          type="text" 
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
        {errores.direccion && (
          <Alert variant="danger">{errores.direccion}</Alert>
        )}
      </Form.Group>    
    </Form>
  );
}

export {CrearInstitucionForm}