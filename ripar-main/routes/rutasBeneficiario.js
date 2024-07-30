import { Router } from "express"
import passport  from "passport"
import beneficiarioController from "../controllers/beneficiarioController.js"

const routerBenenficiario = Router()

routerBenenficiario.post("/",
    passport.authenticate("jwt", {session: false}),
    beneficiarioController.postBenenficiario)

routerBenenficiario.get("/",
    passport.authenticate("jwt", {session: false}),
    beneficiarioController.getBeneficiario)

routerBenenficiario.get("/suscriptor/:id",
    passport.authenticate("jwt", {session: false}),
    beneficiarioController.getPorSuscriptor)

routerBenenficiario.get("/:id",
    passport.authenticate("jwt", {session: false}),
    beneficiarioController.getDetalle)

routerBenenficiario.put("/:id",
    passport.authenticate("jwt", {session: false}),
    beneficiarioController.putBeneficiario)

routerBenenficiario.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    beneficiarioController.deleteBeneficiario)

    
export default routerBenenficiario