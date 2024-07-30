import moment from "moment"
import { Badge } from "react-bootstrap";
import { EliminarRolBoton } from "./EliminarRolBoton";
import { EditarRol } from "../../pages/rol/EditarRol";

const RolTable=({rol, contador})=>{

    return (      
      <tr>
        <td>{contador}</td>
        <td>{rol.nombre}</td>
        <td>
          {rol.estado === 'ACTIVO' ? (
            <Badge bg="success">Activo</Badge>
          ) : (
            <Badge bg="danger">Inactivo</Badge>
        )}</td>
        <td>{moment(rol.fechaRegistro).format('D[/]MM[/]YYYY')}</td>
        <td className="botones-td">
          <EliminarRolBoton id={rol.idRol}
                            nombre={rol.nombre}
          />
          <EditarRol id={rol.idRol} />
        </td>
      </tr>
    );
}

export {RolTable}