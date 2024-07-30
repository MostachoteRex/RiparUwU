import { Router } from "express"
import passport  from "passport"
import usuarioController from "../controllers/usuarioController.js"

const routerUsuario = Router()

routerUsuario.post("/",
    passport.authenticate("jwt", {session: false}),
    usuarioController.postUsuario)

routerUsuario.get("/",
    passport.authenticate("jwt", {session: false}),
    usuarioController.getUsuario)

routerUsuario.get("/usuarios",
    passport.authenticate("jwt", {session: false}),
    usuarioController.getUsuarios)

routerUsuario.get("/rol/:id",
    passport.authenticate("jwt", {session: false}),
    usuarioController.getUsuarioRol)

routerUsuario.get("/:id",
    passport.authenticate("jwt", {session: false}),
    usuarioController.getDetalleUsuario)

routerUsuario.put("/:id",
    passport.authenticate("jwt", {session: false}),
    usuarioController.putUsuario)

routerUsuario.put("/password/:id",
    passport.authenticate("jwt", {session: false}),
    usuarioController.putPassword)

routerUsuario.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    usuarioController.deleteUsuario)

routerUsuario.post("/login",
    passport.authenticate("local", {session: false}),
    usuarioController.postSignin)

export default routerUsuario