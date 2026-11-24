import { createContext, useCallback, useContext, useState } from "react";
import Toast from "../components/Toast";

// Notificaciones Toast globales: cualquier componente puede llamar
//   const { mostrarToast } = useToast();
//   mostrarToast("Guardado", "success");   // tipos: success | error | warning | info
const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]); // [{ id, mensaje, tipo }]

  const cerrarToast = useCallback((id) => {
    setToasts((actuales) => actuales.filter((t) => t.id !== id));
  }, []);

  const mostrarToast = useCallback((mensaje, tipo = "success") => {
    const id = Date.now() + Math.random();
    setToasts((actuales) => [...actuales.slice(-3), { id, mensaje, tipo }]); // máximo 4 a la vez
  }, []);

  return (
    <ToastContext.Provider value={{ mostrarToast }}>
      {children}
      <div className="toast-container" aria-live="polite">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} cerrar={() => cerrarToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const contexto = useContext(ToastContext);
  if (!contexto) throw new Error("useToast debe usarse dentro de ToastProvider");
  return contexto;
}
