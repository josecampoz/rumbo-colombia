import { useEffect, useRef, useState } from "react";

// Menú desplegable reutilizable.
// opciones = [{ valor, texto }]; al elegir una se llama onSeleccionar(valor).
// Se cierra al hacer clic fuera o con Escape.
function Dropdown({ etiqueta, opciones, onSeleccionar, alinear = "izquierda", clase = "" }) {
  const [abierto, setAbierto] = useState(false);
  const contenedor = useRef(null); // referencia al <div> para saber si el clic fue fuera

  useEffect(() => {
    const cerrarFuera = (e) => {
      if (contenedor.current && !contenedor.current.contains(e.target)) setAbierto(false);
    };
    const cerrarEscape = (e) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("mousedown", cerrarFuera);
    document.addEventListener("keydown", cerrarEscape);
    return () => {
      document.removeEventListener("mousedown", cerrarFuera);
      document.removeEventListener("keydown", cerrarEscape);
    };
  }, []);

  return (
    <div className="dropdown" ref={contenedor}>
      <button
        type="button"
        className={`dropdown-btn ${clase}`}
        aria-haspopup="menu"
        aria-expanded={abierto}
        onClick={() => setAbierto((v) => !v)}
      >
        {etiqueta} <span aria-hidden="true">▾</span>
      </button>
      {abierto && (
        <ul className={`dropdown-menu align-${alinear}`} role="menu">
          {opciones.map((op) => (
            <li key={op.valor}>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onSeleccionar(op.valor);
                  setAbierto(false);
                }}
              >
                {op.texto}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
