import axios from 'axios';
import { useEffect, useState } from "react";
import { BUSCARINSTITUCIONPORESPECIALIDAD_GET_ENDPOINT, ESPECIALIDADESCREADAS_GET_ENDPOINT, INSTITUCIONDETALLE_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { Alert, Form, Row, Col } from 'react-bootstrap';


function CrearConvenioForm({errores, callback, cselectedEspecialidad="", cselectedInstitucion="", cNombreDr="", cTarifaParticular="", cTarifaMultipreventiva="", cTelefono="", cEmail=""}) {

    const [especialidades, setEspecialidades] = useState([])
    const [instituciones, setInstituciones] = useState([])
    const [direccionInstitucion, setDireccionInstitucion] = useState("");
    const [nombreDr, setNombreDr] = useState(cNombreDr);
    const [tarifaParticular, setTarifaParticular] = useState(cTarifaParticular);
    const [telefono, setTelefono] = useState(cTelefono);
    const [email, setEmail] = useState(cEmail)
    const [tarifaMultipreventiva, setTarifaMultipreventiva] = useState(cTarifaMultipreventiva);
    const [selectedEspecialidad, setSelectedEspecialidad] = useState(cselectedEspecialidad);
    const [selectedInstitucion, setSelectedInstitucion] = useState(cselectedInstitucion);

    useEffect(()=>{
        axios.get(ESPECIALIDADESCREADAS_GET_ENDPOINT)
        .then(respuesta =>{
            setEspecialidades(respuesta.data)
        }).catch(e=>{
            console.error(e)
        })
    },[selectedEspecialidad])

    useEffect(()=>{
        axios.get(`${BUSCARINSTITUCIONPORESPECIALIDAD_GET_ENDPOINT}/${selectedEspecialidad}`
        ).then(respuesta =>{
            setInstituciones(respuesta.data)
        }).catch(e=>{
            console.error(e)
        })
    },[selectedEspecialidad, selectedInstitucion])

    useEffect(()=>{
      axios.get(`${INSTITUCIONDETALLE_GET_ENDPOINT}/${selectedInstitucion}`
      ).then(respuesta=>{
        setDireccionInstitucion(respuesta.data.direccion)
      }).catch(e=>{
        console.error(e)
      })
    })

    const handleSubmit=(e)=>{
        e.preventDefault();
        callback({
          idEspecialidad: selectedEspecialidad,
          idInstitucion: selectedInstitucion,
          nombreDr,
          tarifaParticular,
          tarifaMultipreventiva,
          telefono,
          email,
      })
    }

    return (

    <Form onSubmit={handleSubmit} id="convenio-form">
     <Row className="mb-3">
      <Form.Group as={Col} className="mb-3">
        <Form.Label>Especialidad</Form.Label>
        <Form.Select aria-label="Elija una especialidad"
        value={selectedEspecialidad}
        onChange={(e) => setSelectedEspecialidad(e.target.value)} 
        >
        <option value="">Seleccione una especialidad</option>
        {especialidades.map((especialidad)=> (
            <option key={especialidad.idEspecialidad} value={especialidad.idEspecialidad}>                
            {especialidad.nombre}
            </option>
        ))}
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} className="mb-3">
        <Form.Label>Institución</Form.Label>
        <Form.Select aria-label="Elija una institución"
        value={selectedInstitucion}
        onChange={(e) => setSelectedInstitucion(e.target.value)}
        >
        <option value="">Seleccione una institución</option>
        {instituciones.map((institucion)=> (
            <option key={institucion.idInstitucion} value={institucion.idInstitucion}>                
            {institucion.nombre}
            </option>
        ))}
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} className="mb-3">
        <Form.Label>Dirección</Form.Label>
        <Form.Control
          type="text"          
          value={direccionInstitucion}
          disabled
          readOnly
        />

      </Form.Group>
     </Row>

     <Row className="mb-3">
      <Form.Group as={Col} className="mb-3" controlId="nombre">
        <Form.Label>Nombre del especialista</Form.Label>
        <Form.Control 
          type="text" 
          value={nombreDr}
          onChange={(e) => setNombreDr(e.target.value)}
        />
        {errores.nombreDr && (
          <Alert variant="danger">{errores.nombreDr}</Alert>
        )}
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="tarifaParticular">
        <Form.Label>Tarifa Particular</Form.Label>
        <Form.Control 
          type="text" 
          value={tarifaParticular}
          onChange={(e) => setTarifaParticular(e.target.value)}
        />
        {errores.tarifaParticular && (
          <Alert variant="danger">{errores.tarifaParticular}</Alert>
        )}
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="tarifaMultipreventiva">
        <Form.Label>Tarifa Multipreventiva</Form.Label>
        <Form.Control 
          type="text" 
          value={tarifaMultipreventiva}
          onChange={(e) => setTarifaMultipreventiva(e.target.value)}
        />
        {errores.tarifaMultipreventiva && (
          <Alert variant="danger">{errores.tarifaMultipreventiva}</Alert>
        )}
      </Form.Group>
     </Row>

     <Row className="mb-3">
      <Form.Group as={Col} className="mb-3" controlId="telefono">
        <Form.Label>Telefono</Form.Label>
        <Form.Control 
          type="text" 
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        {errores.telefono && (
          <Alert variant="danger">{errores.telefono}</Alert>
        )}
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="text" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errores.email && (
          <Alert variant="danger">{errores.email}</Alert>
        )}
      </Form.Group>
     </Row>
    </Form>

    )

}

export { CrearConvenioForm }