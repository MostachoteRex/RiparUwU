import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import { BsTrash3Fill } from "react-icons/bs";
import Swal from "sweetalert2";
import { ELIMINARBENEFICIARIO_DELETE_ENDPOINT } from "../../connections/helpers/endpoints";


function EliminarBeneficiarioBoton({ id, nombre }) {

  const navegar = useNavigate()

  const eliminar = async () => {

    axios.delete(`${ELIMINARBENEFICIARIO_DELETE_ENDPOINT}/${id}`)
      .then(respuesta => {
        navegar('/Suscripciones')
      })
      .catch(err => {
        console.log(err)
      })
  }

  const crearAlerta = () => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: `¿Está seguro de eliminar el beneficiario ${nombre}?`,
      text: "No podrás revertir esto.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        eliminar();
        swalWithBootstrapButtons.fire(
          'Eliminado',
          'El beneficiario ha sido eliminado',
          'success'
        )
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelada',
          'El beneficiario sigue registrado :)',
          'error'
        )
      }
    })
  }

  return (

    <Button
      className="delete-button" size="sm"
      onClick={crearAlerta}
    >
      <BsTrash3Fill />
    </Button>
  )
}

export { EliminarBeneficiarioBoton }