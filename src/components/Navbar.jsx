import { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Buscador from "./Buscador";
import Dropdown from "./Dropdown";
import { FormularioContext } from "../context/FormularioContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const [buscando, setBuscando] = useState(false);
  const { cantidadPersonas } = useContext(FormularioContext);
  const { usuario, cerrarSesion, esAdmin } = useAuth();
  const { mostrarToast } = useToast();
  const navigate = useNavigate();
  const cerrar = () => setAbierto(false);

  // Opciones del menú de usuario (Dropdown). El administrador ve una opción extra.
  const opcionesUsuario = [
    { valor: "perfil", texto: "👤 Mi perfil" },
    ...(esAdmin ? [{ valor: "admin", texto: "⚙️ Panel de administración" }] : []),
    { valor: "salir", texto: "🚪 Cerrar sesión" }
  ];

  const elegirOpcion = (valor) => {
    cerrar();
    if (valor === "perfil") navigate("/perfil");
    if (valor === "admin") navigate("/admin");
    if (valor === "salir") {
      cerrarSesion();
      navigate("/", { replace: true });
      mostrarToast("Cerraste sesión correctamente.", "info");
    }
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand" onClick={cerrar}>
        <span className="brand-logo" aria-hidden="true">
          <svg viewBox="0 0 40 40" role="img" aria-hidden="true">
            <path d="M36 5 4 18l10 4 4 12 5-8 8 6z" fill="currentColor"/>
            <path d="M14 22 36 5 18 26" fill="none" stroke="var(--forest-2)" strokeWidth="2.2" strokeLinejoin="round"/>
          </svg>
        </span>
        <span>
          <strong>Rumbo Colombia</strong>
          <small>Viaja por el corazón de Colombia</small>
        </span>
      </Link>

      <button className="menu-toggle" onClick={() => setAbierto(!abierto)} aria-label="Abrir menú" aria-expanded={abierto}>
        {abierto ? "✕" : "☰"}
      </button>

      <nav className={abierto ? "open" : ""}>
        <NavLink to="/" end onClick={cerrar}>Inicio</NavLink>
        <NavLink to="/destinos" onClick={cerrar}>Destinos</NavLink>
        <NavLink to="/nosotros" onClick={cerrar}>Nosotros</NavLink>
        <NavLink to="/oficinas" onClick={cerrar}>Oficinas</NavLink>
        <NavLink to="/contacto" onClick={cerrar}>Contacto</NavLink>
        {/* Este enlace solo existe para el administrador */}
        {esAdmin && <NavLink to="/admin" onClick={cerrar}>Admin</NavLink>}
        {/* En móvil, el acceso a la cuenta va dentro del menú */}
        {!usuario && <NavLink to="/login" className="nav-login-mobile" onClick={cerrar}>Iniciar sesión</NavLink>}
      </nav>

      <div className="nav-actions">
        <button className="nav-btn" onClick={() => setBuscando(!buscando)} aria-label="Buscar">⌕</button>
        {usuario ? (
          <Dropdown
            etiqueta={<>👤 <span className="user-text">{esAdmin ? "Admin" : usuario.nombre.split(" ")[0]}</span></>}
            opciones={opcionesUsuario}
            onSeleccionar={elegirOpcion}
            alinear="derecha"
            clase="dropdown-user"
          />
        ) : (
          <Link to="/login" className="nav-login" onClick={cerrar}>Iniciar sesión</Link>
        )}
        <Link to="/destinos" className="nav-cart" onClick={cerrar} aria-label={`Ver maleta (${cantidadPersonas} destinos)`}>
          🧳 <span className="cart-text">Maleta</span> <b>{cantidadPersonas}</b>
        </Link>
      </div>

      {buscando && <Buscador onClose={() => setBuscando(false)} />}
    </header>
  );
}

export default Navbar;
