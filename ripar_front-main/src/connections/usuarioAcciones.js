import axios from "axios"
import { SIGNIN_POST_ENDPOINT } from "./helpers/endpoints"
import { setAutenticacionToken } from "./helpers/token"
import { usuario } from "../status/sliceReducers"
import { jwtDecode } from "jwt-decode"


export const autenticacion = (datos) =>dispatch=>{
    
    return new Promise((resolve, reject) =>{

        axios.post(SIGNIN_POST_ENDPOINT, datos, {
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },            
          }
        )        
        .then((respuesta) =>{                    
            
            const {authorization}= respuesta.headers;
        
            localStorage.setItem('token', authorization);    
            
            setAutenticacionToken(authorization);

            const decodificado= jwtDecode(authorization)

            dispatch(usuario({conectado:true, usuario:decodificado}))

            resolve(authorization)

        }).catch(err=>{            
            reject(err)
        })
    } )
}

export const cerrarSesion = () => dispatch => {
    
    localStorage.removeItem('token');

    setAutenticacionToken(false);

    dispatch(usuario({usuario:{}, conectado:false}));
}
