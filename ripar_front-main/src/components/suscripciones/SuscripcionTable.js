import moment from "moment"
import { useState } from "react";
import { Badge, Button, Container, Modal } from "react-bootstrap"
import { SuscripcionDetalle } from "../../pages/suscripciones/SuscripcionDetalle";
import { EliminarSuscripcionBoton } from "./EliminarSuscripcionBoton";
import { CrearBeneficiario } from "../../pages/beneficiarios/CrearBeneficiarios";

const SuscripcionTable = ({ suscripcion, contador }) => {

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (

    <>
      <tr key={suscripcion.id} onClick={handleShowModal}>
        <td style={{ backgroundColor: '#5cc6d0', color: 'white' }}>{contador}</td>
        <td>{suscripcion.noContrato}</td>
        <td>{suscripcion.suscriptorEntity.nombre + ' ' + suscripcion.suscriptorEntity.primerApellido + ' ' + suscripcion.suscriptorEntity.segundoApellido}</td>
        <td>{moment(suscripcion.fechaSuscripcion).format('D[/]MM[/]YYYY')}</td>
        <td>{moment(suscripcion.fechaVencimiento).format('D[/]MM[/]YYYY')}</td>
        <td>{suscripcion.suscriptorEntity.telefono}</td>
        <td>
          {suscripcion.estado === 'ACTIVA' ? (
            <Badge bg="success">Activa</Badge>
          ) : (
            <Badge bg="danger">Inactiva</Badge>
          )}
        </td>
        <td>{moment(suscripcion.fechaRegistro).format('D[/]MM[/]YYYY')}</td>
      </tr>

      <Container>
        <Modal backdrop="static" size="lg" show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detalle de la Suscripcion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SuscripcionDetalle id={suscripcion.idSuscripcion} />
          </Modal.Body>
          <Modal.Footer className="botones-td d-flex align-items-center">
            <EliminarSuscripcionBoton id={suscripcion.suscriptorEntity.idSuscriptor} />
            <CrearBeneficiario id={suscripcion.suscriptorEntity.idSuscriptor} onClick={handleCloseModal} />
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}

export { SuscripcionTable }