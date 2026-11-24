import { useState } from "react";

// Acordeón: recibe items = [{ pregunta, respuesta }]. Solo una respuesta abierta a la vez.
function Accordion({ items }) {
  const [abierto, setAbierto] = useState(null); // índice abierto o null

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const expandido = abierto === i;
        return (
          <div className={`accordion-item ${expandido ? "open" : ""}`} key={item.pregunta}>
            <button
              type="button"
              className="accordion-trigger"
              aria-expanded={expandido}
              onClick={() => setAbierto(expandido ? null : i)}
            >
              {item.pregunta}
              <span aria-hidden="true">{expandido ? "−" : "+"}</span>
            </button>
            {expandido && <div className="accordion-panel">{item.respuesta}</div>}
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
