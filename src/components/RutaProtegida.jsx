import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Protege una vista según la sesión y el rol:
// - Sin sesión → manda al Login (y recuerda a qué página quería entrar).
// - Con sesión pero rol no permitido → muestra la página 404.
// Si no se indican roles, basta con haber iniciado sesión.
function RutaProtegida({ children, roles = [] }) {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  if (roles.length > 0 && !roles.includes(usuario.rol)) {
    return <Navigate to="/404" replace />;
  }
  return children;
}

export default RutaProtegida;
