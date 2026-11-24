import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Boton from "./Boton";
import Modal from "./Modal";
import { formatoCOP } from "../data/destinos";
import { FormularioContext } from "../context/FormularioContext";
import { useToast } from "../context/ToastContext";

// Tarjeta de destino: agrega a la maleta (Context API), avisa con un Toast
// y permite abrir una "Vista rápida" en un Modal.
function DestinoCard(destino) {
  const { id, nombre, region, duracion, incluye, precio, descripcion, imagen } = destino;
  const { agregarAMaleta } = useContext(FormularioContext);
  const { mostrarToast } = useToast();
  const [modalAbierto, setModalAbierto] = useState(false);

  const agregar = () => {
    agregarAMaleta(destino);
    mostrarToast(`${nombre} se agregó a tu maleta 🧳`);
  };

  return (
    <article className="product-card">
      <Link to={`/destinos/${id}`} className="product-img" aria-label={`Ver ${nombre}`}>
        <img src={imagen} alt={`${nombre} - Rumbo Colombia ${region}`} loading="lazy" />
      </Link>
      <div className="product-body">
        <span className="chip">{region}</span>
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
        <div className="product-foot">
          <strong className="precio">{formatoCOP(precio)}</strong>
          <Boton to={`/destinos/${id}`} variante="primario">Ver más <span aria-hidden="true">→</span></Boton>
        </div>
        <div className="product-actions">
          <Boton variante="secundario" onClick={() => setModalAbierto(true)}>Vista rápida</Boton>
          <Boton variante="secundario" onClick={agregar}>Agregar 🧳</Boton>
        </div>
      </div>

      <Modal abierto={modalAbierto} cerrar={() => setModalAbierto(false)} titulo={nombre}>
        <div className="quick-view">
          <img src={imagen} alt={nombre} />
          <div>
            <span className="chip">{region}</span>
            <p>{descripcion}</p>
            <ul className="quick-list">
              {duracion && <li><b>Duración:</b> {duracion}</li>}
              {incluye && <li><b>Incluye:</b> {incluye}</li>}
            </ul>
            <p className="precio">{formatoCOP(precio)}</p>
            <div className="hero-actions">
              <Boton onClick={() => { agregar(); setModalAbierto(false); }}>Agregar a mi maleta 🧳</Boton>
              <Boton to={`/destinos/${id}`} variante="secundario">Ver página completa</Boton>
            </div>
          </div>
        </div>
      </Modal>
    </article>
  );
}

export default DestinoCard;
