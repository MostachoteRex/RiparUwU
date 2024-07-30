import axios from 'axios';
import { useEffect, useState } from "react";
import { BUSCARCONVENIOPORINSTITUCION, BUSCARINSTITUCIONPORESPECIALIDAD_GET_ENDPOINT, BUSCARSUSCRIPCIONPORCONTRATO_GET_ENDPOINT, CONVENIODETALLE_GET_ENDPOINT, ESPECIALIDADESCREADAS_GET_ENDPOINT, INSTITUCIONDETALLE_GET_ENDPOINT } from "../../connections/helpers/endpoints";
import { Alert, Form, Row, Col, Button } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import Swal from 'sweetalert2'

function CrearCitaForm({errores, callback, cselectedEspecialidad="", cselectedInstitucion="", cselectedConvenio=""}) {

    const [especialidades, setEspecialidades] = useState([])
    const [instituciones, setInstituciones] = useState([])
    const [direccionInstitucion, setDireccionInstitucion] = useState("");
    const [convenios, setConvenios] = useState([]);
    const [fechaCita, setFechaCita] = useState("");    
    const [horaCita, setHoraCita] = useState("");
    const [noContrato, setNoContrato] = useState("");
    const [suscripcion, setSuscripcion] = useState("");
    const [paciente, setPaciente] = useState([]);
    const [selectedPaciente, setSelectedPaciente] = useState("");
    const [selectedEspecialidad, setSelectedEspecialidad] = useState(cselectedEspecialidad);
    const [selectedInstitucion, setSelectedInstitucion] = useState(cselectedInstitucion);
    const [selectedConvenio, setSelectedConvenio] = useState(cselectedConvenio);
    const [detalleConvenio, setDetalleConvenio] = useState("");

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

    useEffect(()=>{
        axios.get(`${BUSCARCONVENIOPORINSTITUCION}/${selectedInstitucion}`
        ).then(respuesta=>{
            setConvenios(respuesta.data)
        }).catch(e=>{
          console.error(e)
        })
      },[selectedInstitucion, selectedConvenio])

      useEffect(()=>{
        axios.get(`${CONVENIODETALLE_GET_ENDPOINT}/${selectedConvenio}`
        ).then(respuesta=>{
          setDetalleConvenio(respuesta.data)
        }).catch(e=>{
          console.error(e)
        })
      })

    const handleSubmit=(e)=>{
        e.preventDefault();
        callback({
          idSuscripcion: suscripcion.idSuscripcion,      
          paciente: selectedPaciente,
          idConvenio: selectedConvenio,
          fechaCita, horaCita, 
          idUsuario: "maria"
      })
    }

    const handleBuscarContrato = () => {
      axios.get(`${BUSCARSUSCRIPCIONPORCONTRATO_GET_ENDPOINT}/${noContrato}`)
        .then((response) => {  
          setSuscripcion(response.data)          
        })
        .catch((e) => {          
          console.error(e)
        });
    };

    useEffect(()=>{
      if (suscripcion.estado === "INACTIVA"){
        Swal.fire({
          title: "La suscripción se encuentra inactiva",          
          icon: "error"
        });
      }
    },[suscripcion])

    useEffect(() => {
      if (selectedPaciente && suscripcion.pacienteEntity) {
        const pacienteEncontrado = suscripcion.pacienteEntity.find(
          (paciente) => paciente.idBeneficiario === selectedPaciente
        );
    
        if (pacienteEncontrado) {
          setPaciente(pacienteEncontrado);
        }
      }
    }, [selectedPaciente, suscripcion.pacienteEntity]);    
    
    return (

    <Form onSubmit={handleSubmit} id="cita-form">
    <Row className="mb-3">
      <Form.Group as={Col} className="mb-3">
        <Form.Label>No. Contrato</Form.Label>
        <Form.Control 
          type="text"
          value={noContrato}
          onChange={(e) => setNoContrato(e.target.value)}
        />
        {errores.noContrato && (
          <Alert variant="danger">{errores.noContrato}</Alert>
        )}
      </Form.Group>

      <Form.Group as={Col} className="mb-3">
        <Form.Label>Paciente</Form.Label>
        <Form.Select aria-label="Elija un paciente"
        value={selectedPaciente}
        onChange={(e) => setSelectedPaciente(e.target.value)} // Maneja el cambio de selección
        disabled={suscripcion && suscripcion.estado === "INACTIVA"}
        >
        <option value="">Seleccione el paciente</option>
        {suscripcion &&
        suscripcion.pacienteEntity.map((paciente)=> (
            <option key={paciente.idBeneficiario} value={paciente.idBeneficiario}>                
            {paciente.nombre} {paciente.primerApellido} {paciente.segundoApellido}
            </option>
        ))}        
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} className="mb-3">
        <Form.Label>No. Documento</Form.Label>
        <Form.Control
          type="text"
          value={paciente.documento}
          disabled
          readOnly
        />
      </Form.Group>

      <Form.Group as={Col} className="mb-3 mt-4">
      <Button variant="success" onClick={handleBuscarContrato}>
          <BsSearch/>
      </Button>
      </Form.Group>
     </Row>

      <div>
        <h5 className="mb-4">Datos de la Cita</h5>
      </div>

     <Row className="mb-3">
      <Form.Group as={Col} className="mb-3">
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
     <Form.Group as={Col} className="mb-3">
        <Form.Label>Nombre del doctor</Form.Label>
        <Form.Select aria-label="Elija un convenio"
        value={selectedConvenio}
        onChange={(e) => setSelectedConvenio(e.target.value)}
        >
        <option>Seleccione</option>
        {convenios.map((convenio)=> (
            <option key={convenio.idConvenio} value={convenio.idConvenio}>                
            {convenio.nombreDr}
            </option>
        ))}
        </Form.Select>
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="tarifaParticular">
        <Form.Label>Tarifa Particular</Form.Label>
        <Form.Control
          type="text"          
          value={detalleConvenio.tarifaParticular}
          disabled
          readOnly
        />
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="tarifaMultipreventiva">
        <Form.Label>Tarifa Multipreventiva</Form.Label>
        <Form.Control
          type="text"          
          value={detalleConvenio.tarifaMultipreventiva}
          disabled
          readOnly
        />
      </Form.Group>
     </Row>

     <Row className="mb-3">  
      <Form.Group as={Col} className="mb-3" controlId="tarifaParticular">
        <Form.Label>Ahorro</Form.Label>
        <Form.Control
          type="text"          
          value={(detalleConvenio.tarifaParticular || 0) -
            (detalleConvenio.tarifaMultipreventiva || 0)}
          disabled
          readOnly
        />
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="fechaCita">
        <Form.Label>Fecha de la Cita</Form.Label>
        <Form.Control 
          type="date"
          value={fechaCita}
          onChange={(e) => setFechaCita(e.target.value)}
        />
        {errores.fechaCita && (
          <Alert variant="danger">{errores.fechaCita}</Alert>
        )}
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="horaCita">
        <Form.Label>Hora de la Cita</Form.Label>
        <Form.Control 
          type="Time" 
          value={horaCita}
          onChange={(e) => setHoraCita(e.target.value)}
        />
        {errores.horaCita && (
          <Alert variant="danger">{errores.horaCita}</Alert>
        )}
      </Form.Group>    
      
     </Row>
    </Form>

    )

}

export { CrearCitaForm }