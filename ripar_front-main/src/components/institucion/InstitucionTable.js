import moment from "moment"
import { EliminarInstitucionBoton } from "./EliminarInstitucionBoton";


const InstitucionTable=({institucion, contador})=>{

    return (      
      <tr>
        <td style={{ backgroundColor: '#5cc6d0', color: 'white' }}>{contador}</td>
        <td>{institucion.especialidadEntity.nombre}</td>
        <td>{institucion.nombre}</td>
        <td>{institucion.direccion}</td>
        <td>{moment(institucion.fechaRegistro).format('D[/]MM[/]YYYY')}</td>
        <td><EliminarInstitucionBoton id={institucion.idInstitucion}
                                       nombre={institucion.nombre}
        /></td>
      </tr>
    );
}

export {InstitucionTable}