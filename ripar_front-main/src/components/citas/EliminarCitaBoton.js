import axios from "axios"
import { ELIMINARCITA_DELETE_ENDPOINT } from "../../connections/helpers/endpoints"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import { BsTrash3Fill } from "react-icons/bs";
import Swal from "sweetalert2";


function EliminarCitaBoton({id}) {
   
    const navegar= useNavigate()

    const eliminar= async()=>{

        axios.delete(`${ELIMINARCITA_DELETE_ENDPOINT}/${id}`)
        .then(respuesta =>{
            navegar('/Citas')
        })
        .catch(err =>{
            console.error(err);
        })

    }
        const crearAlerta=() =>{

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })
              
              swalWithBootstrapButtons.fire({
                title: `¿Está seguro de eliminar la Cita?`,
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
                    'La cita ha sido eliminada',
                    'success'
                  )
                } else if (              
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelada',
                    'La cita sigue registrada :)',
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
                <BsTrash3Fill/>
            </Button>
        )
    }

export { EliminarCitaBoton }