import { Router } from "express"
import routerUsuario from "./rutasUsuario.js"
import routerEspecialidad from "./rutasEspecialidad.js"
import routerInstitucion from "./rutasInstitucion.js"
import routerConvenio from "./rutasConvenio.js"
import routerBeneficiario from "./rutasBeneficiario.js"
import routerRol from "./rutasRol.js"
import routerSuscriptor from "./rutasSuscriptor.js"
import routerSuscripcion from "./rutasSuscripcion.js"
import routerCita from "./rutasCita.js"
import routerContabilidad from "./rutasContabilidad.js"

// Crea una instancia del enrutador de Express
const router = Router()
// Define las rutas para los diferentes recursos
router.use("/usuario", routerUsuario)         // Ruta para las operaciones relacionadas con usuarios
router.use("/especialidad", routerEspecialidad) // Ruta para las operaciones relacionadas con especialidades
router.use("/institucion", routerInstitucion) // Ruta para las operaciones relacionadas con instituciones
router.use("/convenio", routerConvenio)       // Ruta para las operaciones relacionadas con convenios
router.use("/beneficiario", routerBeneficiario) // Ruta para las operaciones relacionadas con beneficiarios
router.use("/rol", routerRol)                 // Ruta para las operaciones relacionadas con roles
router.use("/suscriptor", routerSuscriptor)   // Ruta para las operaciones relacionadas con suscriptores
router.use("/suscripcion", routerSuscripcion) // Ruta para las operaciones relacionadas con suscripciones
router.use("/cita", routerCita)               // Ruta para las operaciones relacionadas con citas
router.use("/contabilidad", routerContabilidad) // Ruta para las operaciones relacionadas con contabilidad

export default router

