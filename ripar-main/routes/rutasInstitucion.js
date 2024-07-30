import { Router } from "express"
import passport  from "passport"
import institucionController from "../controllers/institucionController.js"

const routerInstitucion = Router()

routerInstitucion.post("/",
    /* passport.authenticate("jwt", {session: false}), */
    institucionController.postInstitucion)

routerInstitucion.get("/",
    passport.authenticate("jwt", {session: false}),
    institucionController.getInstitucion)

routerInstitucion.get("/especialidad/:id",
    passport.authenticate("jwt", {session: false}),
    institucionController.getPorEspecialidad)

routerInstitucion.get("/:id",
    passport.authenticate("jwt", {session: false}),
    institucionController.getDetalle)

routerInstitucion.put("/:id",
    passport.authenticate("jwt", {session: false}),
    institucionController.putInstitucion)

routerInstitucion.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    institucionController.deleteInstitucion)

export default routerInstitucion