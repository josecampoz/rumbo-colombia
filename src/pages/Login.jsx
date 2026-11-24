import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { usuarios } from "../data/usuarios";

function Login() {
  const { iniciarSesion, usuario } = useAuth();
  const { mostrarToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Si ya hay sesión no tiene sentido mostrar el formulario.
  if (usuario) return <Navigate to="/" replace />;

  const enviar = (e) => {
    e.preventDefault();
    const resultado = iniciarSesion(correo, password);
    if (!resultado.correcto) {
      setError(resultado.mensaje);
      mostrarToast(resultado.mensaje, "error");
      return;
    }
    mostrarToast(`¡Bienvenido, ${resultado.usuario.nombre}!`);
    // Vuelve a la página que intentaba abrir (si venía de una ruta protegida).
    navigate(location.state?.from || "/", { replace: true });
  };

  // Atajo para la demo: rellena el formulario con un usuario de prueba.
  const rellenar = (u) => {
    setCorreo(u.correo);
    setPassword(u.password);
    setError("");
  };

  return (
    <section className="section auth-section">
      <div className="auth-card">
        <span className="eyebrow">Acceso</span>
        <h1>Iniciar sesión</h1>
        <p className="auth-sub">Ingresa con tu cuenta de usuario o de administrador.</p>

        {location.state?.from && (
          <p className="auth-aviso" role="status">Debes iniciar sesión para ver esa página.</p>
        )}

        <form className="form" onSubmit={enviar}>
          <label>Correo electrónico
            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)}
              placeholder="correo@rumbocolombia.com" required autoComplete="username" />
          </label>
          <label>Contraseña
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña" required autoComplete="current-password" />
          </label>
          {error && <small className="error-text" role="alert">{error}</small>}
          <button className="btn btn-primario" type="submit">Ingresar</button>
        </form>

        <div className="demo-box">
          <strong>Usuarios de demostración</strong>
          {usuarios.map((u) => (
            <button type="button" key={u.id} className="demo-user" onClick={() => rellenar(u)}>
              <span><b>{u.rol === "administrador" ? "Administrador" : "Usuario"}</b><br />{u.correo}</span>
              <code>{u.password}</code>
            </button>
          ))}
          <small>Haz clic en uno para rellenar el formulario.</small>
        </div>
        <Link to="/" className="volver">← Volver a la tienda</Link>
      </div>
    </section>
  );
}

export default Login;
