import { useState } from "react";

// Pestañas: recibe items = [{ titulo, contenido }] y muestra una a la vez.
function Tabs({ items }) {
  const [activo, setActivo] = useState(0);

  return (
    <div className="tabs">
      <div className="tabs-list" role="tablist">
        {items.map((item, i) => (
          <button
            key={item.titulo}
            type="button"
            role="tab"
            aria-selected={activo === i}
            className={`tab-btn ${activo === i ? "active" : ""}`}
            onClick={() => setActivo(i)}
          >
            {item.titulo}
          </button>
        ))}
      </div>
      <div className="tab-panel" role="tabpanel" key={activo}>
        {items[activo].contenido}
      </div>
    </div>
  );
}

export default Tabs;
