import '../css/App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Navegacion } from '../layouts/navegacion';
import { Homepage } from '../pages/Homepage';
import { SignIn } from '../pages/SignIn';
import { Footer } from '../layouts/footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EspecialidadesCreadas } from '../pages/especialidad/EspecialidadesCreadas';
import { Provider } from 'react-redux';
import { store } from '../status/store';
import { getAutenticacionToken } from '../connections/helpers/token';
import { InstitucionesCreadas } from '../pages/institucion/InstitucionesCreadas';
import { ConveniosCreados } from '../pages/convenios/ConveniosCreados';
import { SuscripcionesCreadas } from '../pages/suscripciones/SuscripcionesCreadas';
import { CitasCreadas } from '../pages/citas/CitasCreadas';
import { RolesCreados } from '../pages/rol/RolesCreados';
import { UsuariosCreados } from '../pages/usuarios/UsuariosCreados';
import { RegistroContabilidad } from '../pages/contabilidad/RegistroContabilidad';

getAutenticacionToken()

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navegacion />
        <Routes>          
          <Route path="/" element={<SignIn />} />
          <Route path='/HomePage' element={<Homepage />} />
          <Route path='/Especialidad' element={<EspecialidadesCreadas/>} />
          <Route path='/Institucion' element={<InstitucionesCreadas />} />
          <Route path='/Convenios' element={<ConveniosCreados />} />
          <Route path='/Suscripciones' element={<SuscripcionesCreadas />} />
          <Route path='/Citas' element={<CitasCreadas />} />
          <Route path='/Rol' element={<RolesCreados />} />
          <Route path='/Usuario' element={<UsuariosCreados />} />
          <Route path='/Contabilidad' element={<RegistroContabilidad />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </Provider>
  );
}

export default App;
