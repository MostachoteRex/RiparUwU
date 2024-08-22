import moment from "moment"
import { EliminarBeneficiarioBoton } from "./EliminarBeneficiarioBoton";
import React from "react";

const BeneficiariosTable=({beneficiario, contador})=>{    

    return (
      <tr>
        <td style={{backgroundColor:'#689CDF', color:'white'}}>{contador}</td>
        <td>{beneficiario.nombre + ' ' + beneficiario.primerApellido + ' ' + beneficiario.segundoApellido}</td>
        <td>{beneficiario.documento}</td>
        <td>{moment(beneficiario.fechaRegistro).format('D[/]MM[/]YYYY')}</td>
        <td><EliminarBeneficiarioBoton id={beneficiario.idBeneficiario}
                                       nombre={beneficiario.nombre}/>
        </td>
      </tr>
    );
}

export {BeneficiariosTable};