import { SignInForm } from "../components/SignInForm"
import { Card, Col, Image, Row } from 'react-bootstrap';
import imageLogin from "../assets/img/imageLogin.jpeg"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { autenticacion } from "../connections/usuarioAcciones";
import { Alert } from "react-bootstrap";
import Swal from "sweetalert2";

function SignIn () {

    const [errores, setErrores]= useState({});
    /* const conectado=useSelector(estado=>estado.conectado); */
    const navegar=useNavigate();
    const enviarAccion= useDispatch();
    let timerInterval;

    /* useEffect(()=>{
        if (conectado){
            navegar("/HomePage");
        }
    }) */

    /* const mostrarAlerta = async () => {
        let timerInterval;
      
        await Swal.fire({
          title: "Bienvenido",
          html: "Será redireccionado en <b></b> milisegundos.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        });              
        console.log("La alerta se cerró");
      }; */

    const login=({documento, password})=>{

        const error={};
        setErrores(error);

        enviarAccion(autenticacion({documento, password}))
        .then(respuesta =>{
            Swal.fire({
                title: "Bienvenido",
                html: "Será redireccionado en <b></b> milisegundos.",
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                  const timer = Swal.getPopup().querySelector("b");
                  timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                  }, 100);
                },
                willClose: () => {
                  clearInterval(timerInterval);
                }
              }).then((result) => {                
                if (result.dismiss === Swal.DismissReason.timer) {
                    navegar("/HomePage")
                }
              });            
        })
        .catch(err=>{        
            Swal.fire({
                title: "Error",
                text: "No se ha podido iniciar sesion",
                icon: "error"
              });
            /* setErrores({ingresar: "No se puede iniciar sesion con estas credenciales"}); */
        })
    }

    return(
        <Card className="loginCard">
        <Row>
            <Col xs={6} md={6} xl={6}>
                <Image src={imageLogin} rounded className="imagen-login" />
            </Col>
            <Col xs={6} md={5} xl={5}>
            <Card.Body>
                <h1 style={{textAlign: "center"}}><strong>Login</strong></h1><br/>
                {errores.ingresar && <Alert variant="danger">{errores.ingresar}</Alert>}
                <SignInForm errores={errores} callback={login}/>
            </Card.Body>
            </Col>
        </Row>
        </Card>
    )
}

export {SignIn}