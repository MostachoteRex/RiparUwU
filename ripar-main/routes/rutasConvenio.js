import { Router } from "express"
import passport  from "passport"
import convenioController from "../controllers/convenioController.js"

const routerConvenio = Router()

routerConvenio.post("/",
    passport.authenticate("jwt", {session: false}),
    convenioController.postConvenio)

routerConvenio.get("/",
    passport.authenticate("jwt", {session: false}),
    convenioController.getConvenio)

routerConvenio.get("/:id",
    passport.authenticate("jwt", {session: false}),
    convenioController.getDetalle)

routerConvenio.get("/institucion/:id",
    passport.authenticate("jwt", {session: false}),
    convenioController.getPorInstitucion)

routerConvenio.put("/:id",
    passport.authenticate("jwt", {session: false}),
    convenioController.putConvenio)

routerConvenio.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    convenioController.deleteConvenio)

export default routerConvenio