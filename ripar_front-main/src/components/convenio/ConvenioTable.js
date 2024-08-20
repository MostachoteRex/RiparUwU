import moment from "moment"
import { EliminarConvenioBoton } from "./EliminarConvenioBoton"
import { EditarConvenio } from "../../pages/convenios/EditarConvenio"

const ConvenioTable=({convenio, contador})=>{

    return(
        <tr>
        <td style={{backgroundColor:'#689CDF', color:'white'}}>{contador}</td>
        <td>{convenio.especialidadEntity.nombre}</td>
        <td>{convenio.institucionEntity.nombre}</td>
        <td>{convenio.institucionEntity.direccion}</td>
        <td>{convenio.nombreDr}</td>
        <td>{parseInt(convenio.tarifaParticular).toLocaleString('es-ES', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</td>
        <td>{parseInt(convenio.tarifaMultipreventiva).toLocaleString('es-ES', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</td>
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