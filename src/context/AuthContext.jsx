import { createContext, useContext, useState } from "react";
import { usuarios } from "../data/usuarios";

// Contexto de autenticación: guarda quién inició sesión y qué rol tiene.
// La sesión se guarda en sessionStorage: se conserva al recargar (F5)
// pero se borra al cerrar la pestaña del navegador.
const AuthContext = createContext(null);
const CLAVE_SESION = "viajes_usuario";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    try {
      const guardado = sessionStorage.getItem(CLAVE_SESION);
      return guardado ? JSON.parse(guardado) : null;
    } catch {
      return null;
    }
  });

  // Busca el correo y la contraseña en la lista de usuarios predefinidos.
  const iniciarSesion = (correo, password) => {
    const encontrado = usuarios.find(
      (u) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.password === password
    );
    if (!encontrado) return { correcto: false, mensaje: "Correo o contraseña incorrectos." };

    // Nunca guardamos la contraseña en la sesión.
    const { password: _omitida, ...datosPublicos } = encontrado;
    try {
      sessionStorage.setItem(CLAVE_SESION, JSON.stringify(datosPublicos));
    } catch (error) {
      console.error("No se pudo guardar la sesión:", error);
    }
    setUsuario(datosPublicos);
    return { correcto: true, usuario: datosPublicos };
  };

  const cerrarSesion = () => {
    try {
      sessionStorage.removeItem(CLAVE_SESION);
    } catch (error) {
      console.error(error);
    }
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{ usuario, iniciarSesion, cerrarSesion, autenticado: Boolean(usuario), esAdmin: usuario?.rol === "administrador" }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar el contexto con una sola línea: const { usuario } = useAuth();
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return contexto;
}
