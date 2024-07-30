import { Router } from "express"
import passport  from "passport"
import citaController from "../controllers/citaController.js"

const routerCita = Router()

routerCita.post("/",
    passport.authenticate("jwt", {session: false}),
    citaController.postCita)

routerCita.get("/",
    passport.authenticate("jwt", {session: false}),
    citaController.getCita)

routerCita.get("/:id",
    passport.authenticate("jwt", {session: false}),
    citaController.getDetalle)

routerCita.put("/:id",
    passport.authenticate("jwt", {session: false}),
    citaController.putCita)

routerCita.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    citaController.deleteCita)

export default routerCita
