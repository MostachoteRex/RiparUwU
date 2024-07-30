import moment from "moment"
import { EliminarCitaBoton } from "./EliminarCitaBoton"
/* import { EditarConvenio } from "../../pages/convenios/EditarConvenio"  */

const CitaTable=({cita, contador})=>{

    return(
        <tr>
        <td>{contador}</td>
        <td>{cita.suscripcionEntity.noContrato}</td>
        <td>{cita.pacienteEntity.nombre + ' ' + cita.pacienteEntity.primerApellido + ' ' + cita.pacienteEntity.segundoApellido}</td>
        <td>{cita.pacienteEntity.documento}</td>
        <td>{cita.convenioEntity.nombreDr}</td>
        <td>{moment(cita.fechaCita).format('D[/]MM[/]YYYY')}</td>        
        <td>{moment(cita.horaCita, 'HH:mm').format('h:mm A')}</td>
        <td>{cita.ahorro}</td>
        <td>{moment(cita.fechaRegistro).format('D[/]MM[/]YYYY')}</td>
        <td className="botones-td">
          <EliminarCitaBoton id={cita.idCita}
          />
          {/* <EditarConvenio id={convenio.idConvenio}
        /> */}</td>
      </tr>
    )
}

export { CitaTable }