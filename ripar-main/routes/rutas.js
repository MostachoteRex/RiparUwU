import { Router } from "express"
import routerUsuario from "./rutasUsuario.js"
import routerEspecialidad from "./rutasEspecialidad.js"
import routerInstitucion from "./rutasInstitucion.js"
import routerConvenio from "./rutasConvenio.js"
import routerBenenficiario from "./rutasBeneficiario.js"
import routerRol from "./rutasRol.js"
import routerSuscriptor from "./rutasSuscriptor.js"
import routerSuscripcion from "./rutasSuscripcion.js"
import routerCita from "./rutasCita.js"
import routerContabilidad from "./rutasContabilidad.js"

const router = Router()

router.use("/usuario", routerUsuario)
router.use("/especialidad", routerEspecialidad)
router.use("/institucion", routerInstitucion)
router.use("/convenio", routerConvenio)
router.use("/beneficiario", routerBenenficiario)
router.use("/rol", routerRol)
router.use("/suscriptor", routerSuscriptor)
router.use("/suscripcion", routerSuscripcion)
router.use("/cita", routerCita)
router.use("/contabilidad", routerContabilidad)

export default router

