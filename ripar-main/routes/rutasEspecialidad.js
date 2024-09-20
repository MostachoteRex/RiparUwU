import { Router } from "express"
import passport  from "passport"
import especialidadController from "../controllers/especialidadController.js"

const routerEspecialidad = Router()

routerEspecialidad.post("/",
    passport.authenticate("jwt", {session: false}),
    especialidadController.postEspecialidad)

routerEspecialidad.get("/",
    passport.authenticate("jwt", {session: false}),
    especialidadController.getEspecialidad)

routerEspecialidad.get("/:id",
    passport.authenticate("jwt", {session: false}),
    especialidadController.detalleEspecialidad)

routerEspecialidad.put("/:id",
    passport.authenticate("jwt", {session: false}),
    especialidadController.putEspecialidad)

routerEspecialidad.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    especialidadController.deleteEspecialidad)

export default routerEspecialidad