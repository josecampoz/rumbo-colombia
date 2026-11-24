import { useContext, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import DestinoCard from "../components/DestinoCard";
import ClienteActual from "../components/ClienteActual";
import Boton from "../components/Boton";
import Dropdown from "../components/Dropdown";
import { filtrarDestinos } from "../components/Buscador";
import { formatoCOP } from "../data/destinos";
import { FormularioContext } from "../context/FormularioContext";
import { useToast } from "../context/ToastContext";

function Destinos() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const [orden, setOrden] = useState("recientes");
  const [region, setRegión] = useState("todos");
  const { mostrarToast } = useToast();

  // El maleta y el catálogo viven en el contexto: se conservan al cambiar de vista.
  const {
    catalogo,
    maleta,
    agregarAMaleta,
    quitarDeMaleta,
    eliminarDeMaleta,
    vaciarMaleta,
    cantidadPersonas,
    totalMaleta
  } = useContext(FormularioContext);

  // Búsqueda → filtro por region → orden (todo con el catálogo del contexto)
  const regiones = [...new Set(catalogo.map((p) => p.region))];
  let lista = filtrarDestinos(catalogo, q);
  if (region !== "todos") lista = lista.filter((p) => p.region === region);
  lista = [...lista].sort((a, b) => {
    if (orden === "precio-asc") return a.precio - b.precio;
    if (orden === "precio-desc") return b.precio - a.precio;
    if (orden === "nombre") return a.nombre.localeCompare(b.nombre);
    return 0; // "recientes": se respeta el orden del catálogo
  });

  const textoOrden = { recientes: "Más recientes", "precio-asc": "Precio: menor a mayor", "precio-desc": "Precio: mayor a menor", nombre: "Nombre (A-Z)" }[orden];

  const eliminar = (destino) => {
    eliminarDeMaleta(destino.id);
    mostrarToast(`${destino.nombre} se quitó de tu maleta.`, "warning");
  };
  const vaciar = () => {
    vaciarMaleta();
    mostrarToast("Maleta vaciada.", "info");
  };

  return (
    <section className="section">
      <div className="section-head">
        <span className="eyebrow">Paquetes turísticos</span>
        <h1>Nuestros destinos</h1>
        <p>Agrega tus destinos favoritos a la maleta y finaliza tu reserva desde Contacto.</p>
        {q && <p>Resultados para “<strong>{q}</strong>” · <Link to="/destinos">Ver todos</Link></p>}
      </div>

      <ClienteActual />

      <div className="cart-panel" id="maleta">
        <div className="cart-header">
          <div>
            <span className="eyebrow">Mi maleta de viaje</span>
            <h2>Tu maleta</h2>
          </div>
          <strong>{cantidadPersonas} {cantidadPersonas === 1 ? "viajero" : "viajeros"}</strong>
        </div>

        {maleta.length === 0 ? (
          <p className="cart-empty">Tu maleta está vacía. ¡Agrega un destino para empezar! 🧳</p>
        ) : (
          <>
            <div className="cart-list">
              {maleta.map((destino) => (
                <div className="cart-item" key={destino.id}>
                  <img src={destino.imagen} alt={destino.nombre} />
                  <div className="cart-item-info">
                    <h3>{destino.nombre}</h3>
                    <p>{formatoCOP(destino.precio)} por persona</p>
                  </div>

                  <div className="cart-quantity">
                    <button className="quantity-button" onClick={() => quitarDeMaleta(destino.id)} aria-label={`Quitar un viajero de ${destino.nombre}`}>−</button>
                    <span>{destino.cantidad}</span>
                    <button className="quantity-button" onClick={() => agregarAMaleta(destino)} aria-label={`Agregar un viajero a ${destino.nombre}`}>+</button>
                  </div>

                  <strong className="cart-item-total">{formatoCOP(destino.precio * destino.cantidad)}</strong>

                  <button className="btn btn-danger" onClick={() => eliminar(destino)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <strong>Total: {formatoCOP(totalMaleta)}</strong>
              <div className="cart-footer-actions">
                <button className="btn btn-secundario" onClick={vaciar}>Vaciar maleta</button>
                <Boton to="/contacto">Continuar a la reserva <span aria-hidden="true">→</span></Boton>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="toolbar">
        <strong>{lista.length} {lista.length === 1 ? "destino" : "destinos"}</strong>
        <div className="toolbar-filters">
          <Dropdown
            etiqueta={`Región: ${region === "todos" ? "Todos" : region}`}
            opciones={[{ valor: "todos", texto: "Todos" }, ...regiones.map((o) => ({ valor: o, texto: o }))]}
            onSeleccionar={setRegión}
          />
          <Dropdown
            etiqueta={`Ordenar: ${textoOrden}`}
            alinear="derecha"
            opciones={[
              { valor: "recientes", texto: "Más recientes" },
              { valor: "precio-asc", texto: "Precio: menor a mayor" },
              { valor: "precio-desc", texto: "Precio: mayor a menor" },
              { valor: "nombre", texto: "Nombre (A-Z)" }
            ]}
            onSeleccionar={setOrden}
          />
        </div>
      </div>

      <div className="grid">
        {lista.map((p) => <DestinoCard key={p.id} {...p} />)}
        {lista.length === 0 && <p>No encontramos destinos con esa búsqueda.</p>}
      </div>
    </section>
  );
}

export default Destinos;
