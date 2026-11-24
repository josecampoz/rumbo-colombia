import { useContext } from "react";
import { Link } from "react-router-dom";
import Tabs from "../components/Tabs";
import ListaReservas from "../components/ListaReservas";
import { useAuth } from "../context/AuthContext";
import { FormularioContext } from "../context/FormularioContext";

// Vista protegida: cualquier usuario con sesión puede entrar.
function Perfil() {
  const { usuario, esAdmin } = useAuth();
  const { reservas } = useContext(FormularioContext);
  const misReservas = reservas.filter((p) => p.cuenta === usuario.correo);

  return (
    <section className="section">
      <div className="section-head">
        <span className="eyebrow">Mi cuenta</span>
        <h1>Hola, {usuario.nombre.split(" ")[0]} ✈️</h1>
        <p>Aquí puedes ver tus datos y el historial de tus reservas.</p>
      </div>

      <Tabs
        items={[
          {
            titulo: "Mis datos",
            contenido: (
              <dl className="ficha perfil-datos">
                <div><dt>Nombre</dt><dd>{usuario.nombre}</dd></div>
                <div><dt>Correo</dt><dd>{usuario.correo}</dd></div>
                <div><dt>Rol</dt><dd><span className="chip">{usuario.rol}</span></dd></div>
                {esAdmin && <div><dt>Acceso</dt><dd><Link to="/admin">Ir al panel de administración →</Link></dd></div>}
              </dl>
            )
          },
          {
            titulo: `Mis reservas (${misReservas.length})`,
            contenido: misReservas.length ? (
              <ListaReservas reservas={misReservas} />
            ) : (
              <p className="cart-empty">Aún no tienes reservas. <Link to="/destinos">Explora los destinos →</Link></p>
            )
          }
        ]}
      />
    </section>
  );
}

export default Perfil;
