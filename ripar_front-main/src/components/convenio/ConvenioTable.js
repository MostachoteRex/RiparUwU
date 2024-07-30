import moment from "moment"
import { EliminarConvenioBoton } from "./EliminarConvenioBoton"
import { EditarConvenio } from "../../pages/convenios/EditarConvenio"

const ConvenioTable=({convenio, contador})=>{

    return(
        <tr>
        <td>{contador}</td>
        <td>{convenio.especialidadEntity.nombre}</td>
        <td>{convenio.institucionEntity.nombre}</td>
        <td>{convenio.institucionEntity.direccion}</td>
        <td>{convenio.nombreDr}</td>
        <td>{convenio.tarifaParticular}</td>
        <td>{convenio.tarifaMultipreventiva}</td>
        <td>{moment(convenio.fechaRegistro).format('D[/]MM[/]YYYY')}</td>
        <td className="botones-td">
          <EliminarConvenioBoton id={convenio.idConvenio}
          />
          <EditarConvenio id={convenio.idConvenio}
        /></td>        
      </tr>
    )
}

export { ConvenioTable }