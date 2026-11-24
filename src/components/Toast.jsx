import { useEffect } from "react";

// Una notificación Toast: aparece, se cierra sola a los 3 segundos o con la ✕.
const iconos = { success: "✓", error: "✕", warning: "!", info: "i" };

function Toast({ mensaje, tipo = "success", cerrar, duracion = 3500 }) {
  useEffect(() => {
    const temporizador = setTimeout(cerrar, duracion);
    return () => clearTimeout(temporizador); // limpieza al desmontar
  }, [cerrar, duracion]);

  return (
    <div className={`toast toast-${tipo}`} role="status">
      <span className="toast-icon" aria-hidden="true">{iconos[tipo]}</span>
      <span className="toast-text">{mensaje}</span>
      <button type="button" className="toast-close" onClick={cerrar} aria-label="Cerrar notificación">×</button>
    </div>
  );
}

export default Toast;
