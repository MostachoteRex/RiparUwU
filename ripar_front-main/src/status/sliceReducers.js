import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    conectado: false,
    usuario: {}
}

const sliceReducer = createSlice({
    name: 'gestionCredenciales',
    initialState,
    reducers: {
        usuario: (estado, accion) =>{
            estado.conectado= accion.payload.conectado
            estado.usuario= accion.payload.usuario
        }
    }
})

export const { usuario } = sliceReducer.actions
export default sliceReducer.reducer
