import moment from "moment"
import { EliminarUsuarioBoton } from "./EliminarUsuarioBoton"

const UsuariosTable=({usuario, contador})=>{

    return (      
      <tr>
        <td>{contador}</td>
        <td>{usuario.nombre + ' ' + usuario.apellido}</td>
        <td>{usuario.documento}</td>
        <td>{usuario.email}</td>
        <td>{usuario.rolEntity.nombre}</td>
        <td>{moment(usuario.fechaRegistro).format('D[/]MM[/]YYYY')}</td>
        <td><EliminarUsuarioBoton   id={usuario.idUsuario}
                                    nombre={usuario.nombre}
        /></td>
      </tr>
    )
}

export {UsuariosTable}