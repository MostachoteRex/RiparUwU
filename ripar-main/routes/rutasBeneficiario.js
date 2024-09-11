import { Router } from "express"
import passport from "passport"
import beneficiarioController from "../controllers/beneficiarioController.js"

// Crea una instancia del enrutador para las rutas de beneficiarios
const routerBeneficiario = Router()

/**
 * Ruta para crear un nuevo beneficiario.
 * 
 * Utiliza autenticación JWT para proteger la ruta.
 * 
 * @name POST /beneficiario
 * @function
 * @memberof module:routes/beneficiarioRouter
 * @param {string} / - Ruta base para la creación de beneficiario.
 * @param {function} passport.authenticate - Middleware para autenticar JWT.
 * @param {function} beneficiarioController.postBeneficiario - Controlador para manejar la creación de beneficiario.
 */
routerBeneficiario.post("/",
    passport.authenticate("jwt", { session: false }),
    beneficiarioController.postBeneficiario)

/**
 * Ruta para obtener todos los beneficiarios.
 * 
 * Utiliza autenticación JWT para proteger la ruta.
 * 
 * @name GET /beneficiario
 * @function
 * @memberof module:routes/beneficiarioRouter
 * @param {string} / - Ruta base para obtener beneficiarios.
 * @param {function} passport.authenticate - Middleware para autenticar JWT.
 * @param {function} beneficiarioController.getBeneficiario - Controlador para manejar la obtención de beneficiarios.
 */
routerBeneficiario.get("/",
    passport.authenticate("jwt", { session: false }),
    beneficiarioController.getBeneficiario)

/**
 * Ruta para obtener beneficiarios por ID de suscriptor.
 * 
 * Utiliza autenticación JWT para proteger la ruta.
 * 
 * @name GET /beneficiario/suscriptor/:id
 * @function
 * @memberof module:routes/beneficiarioRouter
 * @param {string} /suscriptor/:id - Ruta base para obtener beneficiarios por ID de suscriptor.
 * @param {function} passport.authenticate - Middleware para autenticar JWT.
 * @param {function} beneficiarioController.getPorSuscriptor - Controlador para manejar la obtención de beneficiarios por ID de suscriptor.
 */
routerBeneficiario.get("/suscriptor/:id",
    passport.authenticate("jwt", { session: false }),
    beneficiarioController.getPorSuscriptor)

/**
 * Ruta para obtener detalles de un beneficiario específico por ID.
 * 
 * Utiliza autenticación JWT para proteger la ruta.
 * 
 * @name GET /beneficiario/:id
 * @function
 * @memberof module:routes/beneficiarioRouter
 * @param {string} /:id - Ruta base para obtener un beneficiario específico por ID.
 * @param {function} passport.authenticate - Middleware para autenticar JWT.
 * @param {function} beneficiarioController.getDetalle - Controlador para manejar la obtención de detalles de un beneficiario.
 */
routerBeneficiario.get("/:id",
    passport.authenticate("jwt", { session: false }),
    beneficiarioController.getDetalle)

/**
 * Ruta para actualizar un beneficiario específico por ID.
 * 
 * Utiliza autenticación JWT para proteger la ruta.
 * 
 * @name PUT /beneficiario/:id
 * @function
 * @memberof module:routes/beneficiarioRouter
 * @param {string} /:id - Ruta base para actualizar un beneficiario específico por ID.
 * @param {function} passport.authenticate - Middleware para autenticar JWT.
 * @param {function} beneficiarioController.putBeneficiario - Controlador para manejar la actualización de un beneficiario.
 */
routerBeneficiario.put("/:id",
    passport.authenticate("jwt", { session: false }),
    beneficiarioController.putBeneficiario)

/**
 * Ruta para eliminar un beneficiario específico por ID.
 * 
 * Utiliza autenticación JWT para proteger la ruta.
 * 
 * @name DELETE /beneficiario/:id
 * @function
 * @memberof module:routes/beneficiarioRouter
 * @param {string} /:id - Ruta base para eliminar un beneficiario específico por ID.
 * @param {function} passport.authenticate - Middleware para autenticar JWT.
 * @param {function} beneficiarioController.deleteBeneficiario - Controlador para manejar la eliminación de un beneficiario.
 */
routerBeneficiario.delete("/:id",
    passport.authenticate("jwt", { session: false }),
    beneficiarioController.deleteBeneficiario)

// Exporta el enrutador para su uso en otros módulos
export default routerBeneficiario