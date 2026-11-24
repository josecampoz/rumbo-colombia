import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatoCOP } from "../data/destinos";
import { FormularioContext } from "../context/FormularioContext";

export const filtrarDestinos = (lista, q) => {
  const t = q.trim().toLowerCase();
  if (!t) return lista;
  return lista.filter((p) =>
    [p.nombre, p.region, p.incluye, p.descripcion].some((c) => c.toLowerCase().includes(t))
  );
};

// Barra de búsqueda que aparece al pulsar la lupa del navbar
function Buscador({ onClose }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { catalogo } = useContext(FormularioContext);
  const resultados = q.trim() ? filtrarDestinos(catalogo, q).slice(0, 5) : [];

  const buscar = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/destinos?q=${encodeURIComponent(q.trim())}`);
    onClose();
  };

  return (
    <div className="search-bar">
      <form onSubmit={buscar}>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
          placeholder="Buscar destino por nombre o región…"
          aria-label="Buscar destinos"
        />
        <button type="submit" className="btn btn-primario">Buscar</button>
      </form>
      {q.trim() && (
        <ul className="search-results">
          {resultados.length === 0 && <li className="search-none">No encontramos resultados para “{q}”.</li>}
          {resultados.map((p) => (
            <li key={p.id}>
              <Link to={`/destinos/${p.id}`} onClick={onClose}>
                <img src={p.imagen} alt="" />
                <span><strong>{p.nombre}</strong><small>{p.region} · {formatoCOP(p.precio)}</small></span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Buscador;
