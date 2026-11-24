import { useEffect } from "react";
import { createPortal } from "react-dom";

// Ventana modal reutilizable. Se cierra con la ✕, con Escape o al hacer clic fuera.
function Modal({ abierto, cerrar, titulo, children }) {
  useEffect(() => {
    if (!abierto) return undefined;
    const alPresionar = (e) => e.key === "Escape" && cerrar();
    window.addEventListener("keydown", alPresionar);
    document.body.style.overflow = "hidden"; // evita que la página de fondo se desplace
    return () => {
      window.removeEventListener("keydown", alPresionar);
      document.body.style.overflow = "";
    };
  }, [abierto, cerrar]);

  if (!abierto) return null;

  // createPortal dibuja el modal directamente en <body>, fuera de la tarjeta que lo abre.
  return createPortal(
    <div className="modal-overlay" onMouseDown={cerrar}>
      <section
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{titulo}</h2>
          <button type="button" className="modal-close" onClick={cerrar} aria-label="Cerrar ventana">×</button>
        </div>
        <div className="modal-body">{children}</div>
      </section>
    </div>,
    document.body
  );
}

export default Modal;
