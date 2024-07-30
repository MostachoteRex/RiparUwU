const API_URL="http://localhost:4000"

export const SIGNIN_POST_ENDPOINT = API_URL+"/usuario/login";

export const CREARESPECIALIDAD_POST_ENDPOINT = API_URL+"/especialidad";
export const ESPECIALIDADESCREADAS_GET_ENDPOINT = API_URL+"/especialidad";
export const ESPECIALIDADDETALLE_GET_ENDPOINT = API_URL+"/especialidad";
export const ACTUALIZARESPECIALIDAD_PUT_ENDPOINT = API_URL+"/especialidad";
export const ELIMINARESPECIALIDAD_DELETE_ENDPOINT = API_URL+"/especialidad";

export const CREARINSTITUCION_POST_ENDPOINT = API_URL+"/institucion";
export const INSTITUCIONESCREADAS_GET_ENDPOINT = API_URL+"/institucion";
export const INSTITUCIONDETALLE_GET_ENDPOINT = API_URL+"/institucion";
export const ACTUALIZARINSTITUCION_PUT_ENDPOINT = API_URL+"/institucion";
export const ELIMINARINSTITUCION_DELETE_ENDPOINT = API_URL+"/institucion";
export const BUSCARINSTITUCIONPORESPECIALIDAD_GET_ENDPOINT = API_URL+"/institucion/especialidad"

export const CREARCONVENIO_POST_ENDPOINT = API_URL+"/convenio";
export const CONVENIOSCREADOS_GET_ENDPOINT = API_URL+"/convenio";
export const CONVENIODETALLE_GET_ENDPOINT = API_URL+"/convenio";
export const ACTUALIZARCONVENIO_PUT_ENDPOINT = API_URL+"/convenio";
export const ELIMINARCONVENIO_DELETE_ENDPOINT = API_URL+"/convenio";
export const BUSCARCONVENIOPORINSTITUCION = API_URL+"/convenio/institucion";

export const CREARSUSCRIPCION_POST_ENDPOINT = API_URL+"/suscripcion";
export const SUSCRIPCIONESCREADAS_GET_ENDPOINT = API_URL+"/suscripcion";
export const SUSCRIPCIONDETALLE_GET_ENDPOINT = API_URL+"/suscripcion";
export const ACTUALIZARSUSCRIPCION_PUT_ENDPOINT = API_URL+"/suscripcion";
export const ELIMINARSUSCRIPCION_DELETE_ENDPOINT = API_URL+"/suscripcion";
export const BUSCARSUSCRIPCIONPORCONTRATO_GET_ENDPOINT =  API_URL+"/suscripcion/contrato";

export const CREARSUSCRIPTOR_POST_ENDPOINT = API_URL+"/suscriptor";
export const SUSCRIPTORESCREADAS_GET_ENDPOINT = API_URL+"/suscriptor";
export const SUSCRIPTORDETALLE_GET_ENDPOINT = API_URL+"/suscriptor";
export const ACTUALIZARSUSCRIPTOR_PUT_ENDPOINT = API_URL+"/suscriptor";
export const ELIMINARSUSCRIPTOR_DELETE_ENDPOINT = API_URL+"/suscriptor";

export const CREARCITA_POST_ENDPOINT = API_URL+"/cita";
export const CITASCREADAS_GET_ENDPOINT = API_URL+"/cita";
export const CITADETALLE_GET_ENDPOINT = API_URL+"/cita";
export const ACTUALIZARCITA_PUT_ENDPOINT = API_URL+"/cita";
export const ELIMINARCITA_DELETE_ENDPOINT = API_URL+"/cita";

export const CREARROL_POST_ENDPOINT = API_URL+"/rol";
export const ROLESCREADOS_GET_ENDPOINT = API_URL+"/rol";
export const ROLDETALLE_GET_ENDPOINT = API_URL+"/rol";
export const ACTUALIZARROL_PUT_ENDPOINT = API_URL+"/rol";
export const ELIMINARROL_DELETE_ENDPOINT = API_URL+"/rol";

export const USUARIOSCREADOS_GET_ENDPOINT = API_URL+"/usuario/rol";
export const CREARUSUARIO_POST_ENDPOINT = API_URL+"/usuario";
export const USUARIOCREADOS_GET_ENDPOINT = API_URL+"/usuario/usuarios";
export const ACTUALIZARUSUARIO_PUT_ENDPOINT = API_URL+"/usuario";
export const ELIMINARUSUARIO_DELETE_ENDPOINT = API_URL+"/usuario";

export const REGISTROSCONTABILIDAD_GET_ENDPOINT = API_URL+"/contabilidad";

export const CREARBENEFICIARIO_POST_ENDPOINT = API_URL+"/beneficiario";
export const BENEFICIARIOSCREADOS_GET_ENDPOINT = API_URL+"/beneficiario/suscriptor";
export const ACTUALIZARBENEFICIARIO_PUT_ENDPOINT = API_URL+"/beneficiario";
export const ELIMINARBENEFICIARIO_DELETE_ENDPOINT = API_URL+"/beneficiario";
