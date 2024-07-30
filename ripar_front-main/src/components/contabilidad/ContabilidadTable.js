import moment from "moment"

const ContabilidadTable=({registro, contador})=>{

    return (      
      <tr>
        <td>{contador}</td>
        <td>{registro.noContrato}</td>
        <td>{registro.suscriptorEntity.nombre + ' ' + registro.suscriptorEntity.primerApellido + ' ' + registro.suscriptorEntity.segundoApellido}</td>        
        <td>{registro.valor}</td>
        <td>{registro.metodoPago}</td>
        <td>{registro.usuarioEntity.nombre}</td>
        <td>{moment(registro.fechaRegistro).format('D[/]MM[/]YYYY')}</td>        
      </tr>
    )
}

export {ContabilidadTable}