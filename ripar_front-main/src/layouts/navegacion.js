import { Link, NavLink } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import imageLogo from "../assets/img/imageLogo.png";
import { FaHandshake, FaRegCalendarCheck } from "react-icons/fa";
import { BiLayerPlus } from "react-icons/bi";
import { GiReceiveMoney, GiExitDoor } from "react-icons/gi";
import { BsClipboard2Pulse, BsColumnsGap, BsHospital, BsPersonFill, BsCardChecklist } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { cerrarSesion } from '../connections/usuarioAcciones';
import { useState } from 'react';

function Navegacion() {
  const expand = 'xxl';
  const conectado = useSelector(estado => estado.conectado);
  const dispatch = useDispatch();

  // Estado para controlar la visibilidad del Offcanvas
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  // Funciones para abrir y cerrar el Offcanvas
  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <div>
      {conectado ? (
        <>
          <Navbar key={expand} expand={expand} className="navegacion">
            <Container fluid className="justify-content-between">
              <div className="d-flex align-items-center">
                <Navbar.Brand as={Link} to="/">
                  <img
                    src={imageLogo}
                    alt="Logo Multipreventiva"
                    className="d-inline-block align-top"
                  />
                </Navbar.Brand>
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${expand}`}
                  className="fixed-toggle-button custom-toggle-button"
                  onClick={handleShow}
                />
              </div>
              <Nav.Link as={Link} to="/" onClick={() => dispatch(cerrarSesion())} className="ms-3">
                <GiExitDoor style={{ fontSize: '20px' }} /> Cerrar sesión
              </Nav.Link>
              <Navbar.Offcanvas
                className="custom-offcanvas"
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
                show={showOffcanvas} // Controla la visibilidad
                onHide={handleClose} // Maneja el cierre
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    <div className="d-flex align-items-center justify-content-center">
                      <img
                        src={imageLogo}
                        alt="Logo de MultiPreventiva"
                        className="me-2"
                      />
                    </div>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <h3>Menú</h3>
                    <Nav.Link as={NavLink} to={"/HomePage"} onClick={handleClose}>
                      <BsColumnsGap style={{ fontSize: '20px' }} /> Inicio
                    </Nav.Link>
                    <Nav.Link as={NavLink} to={"/Convenios"} onClick={handleClose}>
                      <FaHandshake style={{ fontSize: '20px' }} /> Convenios
                    </Nav.Link>
                    <Nav.Link as={NavLink} to={"/Suscripciones"} onClick={handleClose}>
                      <BiLayerPlus style={{ fontSize: '20px' }} /> Suscripciones
                    </Nav.Link>
                    <Nav.Link as={NavLink} to={"/Citas"} onClick={handleClose}>
                      <FaRegCalendarCheck style={{ fontSize: '20px' }} /> Citas
                    </Nav.Link>
                    <Nav.Link as={NavLink} to={"/Contabilidad"} onClick={handleClose}>
                      <GiReceiveMoney style={{ fontSize: '20px' }} /> Contabilidad
                    </Nav.Link>
                    <Nav.Link as={NavLink} to={"/Especialidad"} onClick={handleClose}>
                      <BsClipboard2Pulse style={{ fontSize: '20px' }} /> Especialidad
                    </Nav.Link>
                    <Nav.Link as={NavLink} to={"/Institucion"} onClick={handleClose}>
                      <BsHospital style={{ fontSize: '20px' }} /> Institución
                    </Nav.Link>
                    <Nav.Link as={NavLink} to={"/Usuario"} onClick={handleClose}>
                      <BsPersonFill style={{ fontSize: '20px' }} /> Usuarios
                    </Nav.Link>
                    <Nav.Link as={NavLink} to={"/Rol"} onClick={handleClose}>
                      <BsCardChecklist style={{ fontSize: '20px' }} /> Rol
                    </Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </>
      ) : (
        <Navbar style={{ backgroundColor: '#072146', color: '#fff' }}>
          <Container>
            <h1 className="mb-3 mt-3">MultiPreventiva</h1>
          </Container>
        </Navbar>
      )}
    </div>
  );
}

export { Navegacion };
