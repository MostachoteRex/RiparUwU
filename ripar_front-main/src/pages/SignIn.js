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
          
          timer: 1,
          
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 50);
          },
           */

    const login=({documento, password})=>{

        const error={};
        setErrores(error);

        enviarAccion(autenticacion({ documento, password }))
            .then(respuesta => {
                navegar("/HomePage");
            })
            .catch(err => {
                Swal.fire({
                    title: "Error",
                    text: "No se ha podido iniciar sesión",
                    icon: "error"
                });
            });
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