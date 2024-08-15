import moment from "moment"

const ContabilidadTable=({registro, contador})=>{

    return (      
      <tr>
        <td>{contador}</td>
        <td>{registro.noContrato}</td>
        <td>{registro.suscriptorEntity.nombre + ' ' + registro.suscriptorEntity.primerApellido + ' ' + registro.suscriptorEntity.segundoApellido}</td>        
        <td>{parseFloat(registro.valor)
        .toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
        <td>{registro.metodoPago}</td>
        <td>{registro.usuarioEntity.nombre}</td>
        <td>{moment(registro.fechaRegistro).format('D[/]MM[/]YYYY')}</td>        
      </tr>
    )
}

export {ContabilidadTable}