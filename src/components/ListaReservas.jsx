import { formatoCOP } from "../data/destinos";

// Lista de reservas. Con mostrarCliente (vista del administrador) se ve quién compró.
function ListaReservas({ reservas, mostrarCliente = false }) {
  if (reservas.length === 0) return <p className="cart-empty">Todavía no hay reservas.</p>;

  return (
    <div className="reservas">
      {reservas.map((reserva) => (
        <article className="reserva" key={reserva.id}>
          <header>
            <strong>Reserva #{String(reserva.id).slice(-6)}</strong>
            <span>{new Date(reserva.fecha).toLocaleString("es-CO", { dateStyle: "medium", timeStyle: "short" })}</span>
          </header>
          {mostrarCliente && <p className="reserva-cliente">{reserva.cliente} · {reserva.correo} · {reserva.telefono}</p>}
          <ul>
            {reserva.destinos.map((p) => (
              <li key={p.id}>{p.cantidad} {p.cantidad === 1 ? "persona" : "personas"} · {p.nombre} <span>{formatoCOP(p.precio * p.cantidad)}</span></li>
            ))}
          </ul>
          <footer>
            <small>Sale desde {reserva.direccion} · viaja el {reserva.fechaViaje ? new Date(reserva.fechaViaje + "T00:00").toLocaleDateString("es-CO", { dateStyle: "long" }) : "por definir"}</small>
            <strong>{formatoCOP(reserva.total)}</strong>
          </footer>
        </article>
      ))}
    </div>
  );
}

export default ListaReservas;
