import { useContext, useState } from "react";
import Boton from "../components/Boton";
import Modal from "../components/Modal";
import Tabs from "../components/Tabs";
import ListaReservas from "../components/ListaReservas";
import { FormularioContext } from "../context/FormularioContext";
import { useToast } from "../context/ToastContext";
import { formatoCOP } from "../data/destinos";

// Vista protegida: solo el administrador. Gestiona destinos y consulta todos las reservas.
function Admin() {
  const { catalogo, destinosNuevos, eliminarDestino, reservas } = useContext(FormularioContext);
  const { mostrarToast } = useToast();
  const [aEliminar, setAEliminar] = useState(null); // destino pendiente de confirmar

  const ventas = reservas.reduce((suma, p) => suma + p.total, 0);
  const esNuevo = (id) => destinosNuevos.some((p) => p.id === id);

  const confirmarEliminar = () => {
    eliminarDestino(aEliminar.id);
    mostrarToast(`${aEliminar.nombre} fue eliminado del catálogo.`, "warning");
    setAEliminar(null);
  };

  return (
    <section className="section">
      <div className="section-head">
        <span className="eyebrow">Administración</span>
        <h1>Panel de control</h1>
        <p>Registra destinos nuevos, elimina los que agregaste y revisa las reservas recibidas.</p>
      </div>

      <div className="stats">
        <div><span>Destinos</span><strong>{catalogo.length}</strong></div>
        <div><span>Reservas</span><strong>{reservas.length}</strong></div>
        <div><span>Ventas</span><strong>{formatoCOP(ventas)}</strong></div>
      </div>

      <Tabs
        items={[
          {
            titulo: "Destinos",
            contenido: (
              <>
                <div className="admin-bar">
                  <p>Los destinos base no se pueden eliminar; los que registres tú sí.</p>
                  <Boton to="/admin/nuevo">＋ Registrar destino</Boton>
                </div>
                <div className="tabla-wrap">
                  <table className="tabla">
                    <thead><tr><th></th><th>Nombre</th><th>Región</th><th>Precio</th><th></th></tr></thead>
                    <tbody>
                      {catalogo.map((p) => (
                        <tr key={p.id}>
                          <td><img src={p.imagen} alt="" /></td>
                          <td><strong>{p.nombre}</strong></td>
                          <td>{p.region}</td>
                          <td>{formatoCOP(p.precio)}</td>
                          <td>
                            {esNuevo(p.id)
                              ? <button className="btn btn-danger" onClick={() => setAEliminar(p)}>Eliminar</button>
                              : <span className="chip">Base</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )
          },
          { titulo: `Reservas (${reservas.length})`, contenido: <ListaReservas reservas={reservas} mostrarCliente /> }
        ]}
      />

      <Modal abierto={Boolean(aEliminar)} cerrar={() => setAEliminar(null)} titulo="¿Eliminar destino?">
        <p>Vas a eliminar <strong>{aEliminar?.nombre}</strong> del catálogo. Esta acción no se puede deshacer.</p>
        <div className="hero-actions">
          <button className="btn btn-danger" onClick={confirmarEliminar}>Sí, eliminar</button>
          <Boton variante="secundario" onClick={() => setAEliminar(null)}>Cancelar</Boton>
        </div>
      </Modal>
    </section>
  );
}

export default Admin;
