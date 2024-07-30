import { Router } from "express"
import passport  from "passport"
import rolController from "../controllers/rolController.js"

const routerRol = Router()

routerRol.post("/",
    passport.authenticate("jwt", {session: false}),
    rolController.postRol)

routerRol.get("/",
    passport.authenticate("jwt", {session: false}),
    rolController.getRol)

routerRol.get("/:id",
    passport.authenticate("jwt", {session: false}),
    rolController.getDetalle)

routerRol.put("/:id",
    passport.authenticate("jwt", {session: false}),
    rolController.putRol)

routerRol.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    rolController.deleteRol)

export default routerRol
