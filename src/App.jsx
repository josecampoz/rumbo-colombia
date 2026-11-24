import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RutaProtegida from "./components/RutaProtegida";
import Inicio from "./pages/Inicio";
import Destinos from "./pages/Destinos";
import DestinoDetalle from "./pages/DestinoDetalle";
import Nosotros from "./pages/Nosotros";
import Oficinas from "./pages/Oficinas";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Admin from "./pages/Admin";
import CargarDestino from "./pages/CargarDestino";
import NoEncontrado from "./pages/NoEncontrado";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {/* Vistas públicas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/destinos/:id" element={<DestinoDetalle />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/oficinas" element={<Oficinas />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />

          {/* Vista para cualquier usuario con sesión (usuario o administrador) */}
          <Route path="/perfil" element={<RutaProtegida><Perfil /></RutaProtegida>} />

          {/* Vistas solo para el administrador */}
          <Route path="/admin" element={<RutaProtegida roles={["administrador"]}><Admin /></RutaProtegida>} />
          <Route path="/admin/nuevo" element={<RutaProtegida roles={["administrador"]}><CargarDestino /></RutaProtegida>} />

          <Route path="/404" element={<NoEncontrado />} />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
