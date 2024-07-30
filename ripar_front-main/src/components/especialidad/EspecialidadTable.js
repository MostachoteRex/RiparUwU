import moment from "moment"
import { EliminarEspecialidadBoton } from "./EliminarEspecialidadBoton"

const EspecialidadTable=({especialidad, contador})=>{

    return (
      <tr>
        <td>{contador}</td>
        <td>{especialidad.nombre}</td>
        <td>{moment(especialidad.fechaRegistro).format('D[/]MM[/]YYYY')}</td>
        <td><EliminarEspecialidadBoton id={especialidad.idEspecialidad}
                                       nombre={especialidad.nombre}
        /></td>
      </tr>
    );
}

export {EspecialidadTable}
