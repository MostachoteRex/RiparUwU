import { Router } from "express"
import passport  from "passport"
import suscriptorController from "../controllers/suscriptorController.js"

const routerSuscriptor = Router()

routerSuscriptor.post("/",
    passport.authenticate("jwt", {session: false}),
    suscriptorController.postSuscriptor)

routerSuscriptor.get("/",
    passport.authenticate("jwt", {session: false}),
    suscriptorController.getSuscriptor)

routerSuscriptor.get("/:id",
    passport.authenticate("jwt", {session: false}),
    suscriptorController.getDetalle)

routerSuscriptor.put("/:id",
    passport.authenticate("jwt", {session: false}),
    suscriptorController.putSuscriptor)

routerSuscriptor.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    suscriptorController.deleteSuscriptor)

export default routerSuscriptor