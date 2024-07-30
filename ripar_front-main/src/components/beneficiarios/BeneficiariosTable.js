import moment from "moment"
import { EliminarBeneficiarioBoton } from "./EliminarBeneficiarioBoton";

const BeneficiariosTable=({beneficiario, contador})=>{    

    return (
      <tr>
        <td>{contador}</td>
        <td>{beneficiario.nombre + ' ' + beneficiario.primerApellido + ' ' + beneficiario.segundoApellido}</td>
        <td>{beneficiario.documento}</td>
        <td>{moment(beneficiario.fechaRegistro).format('D[/]MM[/]YYYY')}</td>
        <td><EliminarBeneficiarioBoton id={beneficiario.idBeneficiario}
                                       nombre={beneficiario.nombre}
        /></td>
      </tr>
    );
}

export {BeneficiariosTable}