import { Router } from "express"
import passport  from "passport"
import suscripcionController from "../controllers/suscripcionController.js"

const routerSuscripcion = Router()

routerSuscripcion.post("/",
    passport.authenticate("jwt", {session: false}),
    suscripcionController.postSuscripcion)

routerSuscripcion.get("/",
    passport.authenticate("jwt", {session: false}),
    suscripcionController.getSuscripcion)

routerSuscripcion.get("/:id",
    passport.authenticate("jwt", {session: false}),
    suscripcionController.getDetalle)

routerSuscripcion.get("/contrato/:noContrato",
    passport.authenticate("jwt", {session: false}),
    suscripcionController.getPorContrato)

routerSuscripcion.put("/:id",
    passport.authenticate("jwt", {session: false}),
    suscripcionController.putSuscripcion)

routerSuscripcion.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    suscripcionController.deleteSuscripcion)

export default routerSuscripcion