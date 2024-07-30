import axios from "axios"
import moment from "moment"
import { useEffect, useState } from "react"
import { Form, Col, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { BENEFICIARIOSCREADOS_GET_ENDPOINT, SUSCRIPCIONDETALLE_GET_ENDPOINT } from "../../connections/helpers/endpoints"
import { BeneficiariosCreados } from "../beneficiarios/BeneficiariosCreados"

const SuscripcionDetalle=({id, editando, onInputChange })=>{  

    const [suscripcion, setSuscripcion] = useState(null)
    const [idSuscriptor, setIdSuscriptor] = useState(null)
    const [beneficiarios, setBeneficiarios] = useState(null)
    const navegar = useNavigate()

    useEffect(()=>{
        axios.get(`${SUSCRIPCIONDETALLE_GET_ENDPOINT}/${id}`)
        .then((response)=>{            
            setSuscripcion(response.data)
            setIdSuscriptor(response.data.suscriptorEntity.idSuscriptor)
        }).catch(e=>{            
            navegar(-1)
        })
    },[id, navegar])

    useEffect(()=>{
      axios.get(`${BENEFICIARIOSCREADOS_GET_ENDPOINT}/${idSuscriptor}`)
      .then((response)=>{            
        setBeneficiarios(response.data)            
      }).catch(e=>{            
          navegar(-1)
      })
  },[beneficiarios, idSuscriptor, navegar])

    return(

    suscripcion ? (

    <Form id="editar-suscripcion">      
    <Row>
      <Form.Group as={Col} className="mb-3" controlId="tarifaParticular">
        <Form.Label>No. Contrato</Form.Label>
        <Form.Control 
          type="text"
          value={suscripcion.noContrato}
          onChange={onInputChange}
          disabled={!editando}
        />
        {/* {errores.noContrato && (
          <Alert variant="danger">{errores.noContrato}</Alert>
        )} */}
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="fechaSuscripcion">
        <Form.Label>Fecha Suscripcion</Form.Label>
        <Form.Control 
          type="text"          
          value={moment(suscripcion.fechaSuscripcion).format('D[/]MM[/]YYYY')}          
        />        
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="fechaVencimiento">
        <Form.Label>Fecha Vencimiento</Form.Label>
        <Form.Control 
          type="text"          
          value={moment(suscripcion.fechaVencimiento).format('D[/]MM[/]YYYY')}          
        />     
      </Form.Group>
     </Row>

     <Row className="mb-3">
      <Form.Group as={Col} className="mb-3">
        <Form.Label>Asesor</Form.Label>
        <Form.Control 
          type="text"          
          value={suscripcion.asesorEntity.nombre}
        />
      </Form.Group>

      <Form.Group as={Col} className="mb-3">
        <Form.Label>Valor Suscripción</Form.Label>
        <Form.Control 
          type="text"          
          value={suscripcion.valor}          
        />
      </Form.Group>

      <Form.Group as={Col} className="mb-3">
        <Form.Label>Estado</Form.Label>
        <Form.Control 
          type="text"          
          value={suscripcion.estado}          
        />
      </Form.Group>
     </Row>

     <div>
        <h5>Datos del Suscriptor</h5>
     </div>

     <Row className="mb-3">    
      <Form.Group as={Col} className="mb-3" controlId="noDocumento">
        <Form.Label>No. Documento</Form.Label>
        <Form.Control 
          type="text"          
          value={suscripcion.suscriptorEntity.documento}
        />       
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="nombre">
        <Form.Label>Nombre(s)</Form.Label>
        <Form.Control 
          type="text"          
          value={suscripcion.suscriptorEntity.nombre}
        />
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="primerApellido">
        <Form.Label>Primer Apellido</Form.Label>
        <Form.Control 
          type="text"          
          value={suscripcion.suscriptorEntity.primerApellido}
        />
      </Form.Group>      
     </Row>

     <Row className="mb-3">    
      <Form.Group as={Col} className="mb-3" controlId="segundoApellido">
        <Form.Label>Segundo Apellido</Form.Label>
        <Form.Control 
          type="text"          
          value={suscripcion.suscriptorEntity.segundoApellido}          
        />        
      </Form.Group>

      <Form.Group as={Col} className="mb-3">
        <Form.Label>Actividad Economica</Form.Label>
        <Form.Control 
          type="text"          
          value={suscripcion.suscriptorEntity.actividadEconomica}          
        />   
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="telefono">
        <Form.Label>Telefono</Form.Label>
        <Form.Control 
          type="text"          
          value={suscripcion.suscriptorEntity.telefono}          
        />
        </Form.Group>
     </Row>

     <Row className="mb-3">    
      <Form.Group as={Col} className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control 
          type="text"          
          value={suscripcion.suscriptorEntity.email}
        />   
      </Form.Group>
        
      <Form.Group as={Col} className="mb-3" controlId="beneficiarios">
        <Form.Label>No Beneficiarios</Form.Label>
        <div className="mb-3 d-flex align-items-center">
        <Form.Control 
          type="text"          
          value={beneficiarios?.length || 0}
        />
          <BeneficiariosCreados id={suscripcion.suscriptorEntity.idSuscriptor} />
        </div>
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="fechaNacimiento">
        <Form.Label>Fecha de Nacimiento</Form.Label>
        <Form.Control 
          type="text"          
          value={moment(suscripcion.fechaNacimiento).format('D[/]MM[/]YYYY')}
        />   
      </Form.Group>
     </Row>
    
     <Row className="mb-3">    
      <Form.Group as={Col} className="mb-3" controlId="direccion">
        <Form.Label>Dirección</Form.Label>
        <Form.Control 
          type="text"          
          value={suscripcion.suscriptorEntity.direccion}
        />   
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="barrio">
        <Form.Label>Barrio</Form.Label>
        <Form.Control 
          type="text"          
          value={suscripcion.suscriptorEntity.barrio}
        />   
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="ciudad">
        <Form.Label>Ciudad/Municipio</Form.Label>
        <Form.Control 
          type="text"          
          value={suscripcion.suscriptorEntity.ciudad}          
        />   
      </Form.Group>      
     </Row>
    </Form>

    ) : (
    <p>Cargando datos de la suscripción...</p>
  )
    )
}

export { SuscripcionDetalle }