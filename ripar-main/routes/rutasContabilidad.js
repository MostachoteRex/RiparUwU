import { Router } from "express"
import passport  from "passport"
import contabilidadController from "../controllers/contabilidadController.js"

const routerContabilidad = Router()

routerContabilidad.get("/",
    passport.authenticate("jwt", {session: false}),
    contabilidadController.getContabilidad)

export default routerContabilidad