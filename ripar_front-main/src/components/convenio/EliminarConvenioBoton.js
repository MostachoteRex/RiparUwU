import axios from "axios"
import { ELIMINARCONVENIO_DELETE_ENDPOINT } from "../../connections/helpers/endpoints"
import { useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import { BsTrash3Fill } from "react-icons/bs";
import Swal from "sweetalert2";


function EliminarConvenioBoton({id}) {
   
    const navegar= useNavigate()

    const eliminar= async()=>{

        axios.delete(`${ELIMINARCONVENIO_DELETE_ENDPOINT}/${id}`)
        .then(respuesta =>{
            navegar('/Convenios')
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
                title: `¿Está seguro de eliminar el convenio?`,
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
                    'El convenio ha sido eliminado',
                    'success'
                  )
                } else if (              
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelada',
                    'El convenio sigue registrado :)',
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

export { EliminarConvenioBoton }