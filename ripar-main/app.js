import express from "express"
import { conectar } from "./db/conexionDB.js"
import { configuracionSeguridad } from "./security/configuracionSeguridad.js"
import { variables } from "./utils/variables.js"
import cors from "cors"


const app = express()
const PORT = variables.EXPRESS_PORT

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))

configuracionSeguridad(app)

conectar()

app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto ${PORT}`)
})