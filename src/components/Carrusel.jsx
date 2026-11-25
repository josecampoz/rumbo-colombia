import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormularioContext } from "../context/FormularioContext";
import { formatoCOP } from "../data/destinos";

// Carrusel de destinos destacados: cambia solo cada 5 s, con flechas, puntos y botón de pausa.
function Carrusel() {
  const { catalogo } = useContext(FormularioContext);
  const [actual, setActual] = useState(0);
  const [pausado, setPausado] = useState(false); // pausa con el botón: dura hasta pulsar "Reanudar"
  const [cursorEncima, setCursorEncima] = useState(false); // pausa temporal mientras el cursor está encima
  const detenido = pausado || cursorEncima;
  const total = catalogo.length;
  const indice = actual % total; // por si el catálogo cambia de tamaño
  const p = catalogo[indice];

  const siguiente = () => setActual((i) => (i + 1) % total);
  const anterior = () => setActual((i) => (i - 1 + total) % total);

  // Avance automático. Se reinicia al cambiar de slide o al pausar.
  useEffect(() => {
    if (detenido || total < 2) return undefined;
    const intervalo = setInterval(() => setActual((i) => (i + 1) % total), 5000);
    return () => clearInterval(intervalo);
  }, [detenido, total, actual]);

  return (
    <section
      className="carrusel"
      aria-label="Destinos destacados"
      onPointerEnter={(e) => e.pointerType === "mouse" && setCursorEncima(true)} // un toque en el celular no cuenta
      onPointerLeave={() => setCursorEncima(false)}
    >
      <div className="carrusel-slide" key={p.id}>
        <div className="carrusel-img">
          <img src={p.imagen} alt={`${p.nombre} - Rumbo Colombia`} />
        </div>
        <div className="carrusel-info">
          <span className="chip">{p.region}</span>
          <h3>{p.nombre}</h3>
          <p>{p.descripcion}</p>
          <p className="carrusel-incluye"><b>Incluye:</b> {p.incluye}</p>
          <strong className="precio">{formatoCOP(p.precio)}</strong>
          <Link to={`/destinos/${p.id}`} className="btn btn-primario">Ver destino →</Link>
        </div>
      </div>

      <div className="carrusel-controles">
        <button type="button" className="quantity-button" onClick={anterior} aria-label="Destino anterior">‹</button>
        <div className="carrusel-puntos">
          {catalogo.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={`punto ${i === indice ? "activo" : ""}`}
              onClick={() => setActual(i)}
              aria-label={`Ver ${item.nombre}`}
            />
          ))}
        </div>
        <button type="button" className="quantity-button" onClick={siguiente} aria-label="Destino siguiente">›</button>
        <button type="button" className="link-btn" onClick={() => setPausado((v) => !v)}>
          {pausado ? "▶ Reanudar" : "⏸ Pausar"}
        </button>
      </div>
    </section>
  );
}

export default Carrusel;
