import { useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Boton from "../components/Boton";
import Tabs from "../components/Tabs";
import DestinoCard from "../components/DestinoCard";
import NoEncontrado from "./NoEncontrado";
import { formatoCOP } from "../data/destinos";
import { FormularioContext } from "../context/FormularioContext";
import { useToast } from "../context/ToastContext";

function DestinoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { catalogo, agregarAMaleta, maleta, cantidadPersonas } = useContext(FormularioContext);
  const { mostrarToast } = useToast();
  const [agregado, setAgregado] = useState(false);

  const p = catalogo.find((x) => x.id === Number(id));
  if (!p) return <NoEncontrado />;
  const relacionados = catalogo.filter((x) => x.id !== p.id).slice(0, 2);
  const enMaleta = maleta.find((x) => x.id === p.id)?.cantidad || 0;

  const agregar = () => {
    agregarAMaleta(p);
    setAgregado(true);
    mostrarToast(`${p.nombre} se agregó a tu maleta 🧳`);
  };

  return (
    <section className="section">
      <Link to="/destinos" className="volver">← Volver a destinos</Link>
      <div className="detalle">
        <div className="detalle-img">
          <img src={p.imagen} alt={`${p.nombre} - Rumbo Colombia`} />
        </div>
        <div className="detalle-content">
          <span className="chip">{p.region}</span>
          <h1>{p.nombre}</h1>
          <p className="lead">{p.descripcion}</p>
          <dl className="ficha">
            <div><dt>Duración</dt><dd>{p.duracion}</dd></div>
            <div><dt>Incluye</dt><dd>{p.incluye}</dd></div>
            <div><dt>Precio</dt><dd>Por persona</dd></div>
          </dl>
          <p className="precio-grande">{formatoCOP(p.precio)}</p>
          <div className="hero-actions">
            <Boton onClick={agregar}>Agregar a mi maleta 🧳</Boton>
            <Boton to="/destinos" variante="secundario">Ver maleta ({cantidadPersonas})</Boton>
            <Boton onClick={() => navigate(-1)} variante="secundario">← Volver</Boton>
          </div>
          <Tabs
            items={[
              { titulo: "Descripción", contenido: <p>{p.detalle || p.descripcion}</p> },
              { titulo: "Incluye", contenido: <p>Tu paquete incluye: <strong>{p.incluye || "por definir"}</strong>.</p> },
              { titulo: "Recomendaciones", contenido: <p>Lleva documento de identidad, ropa cómoda, protector solar y repelente. Confirma el clima antes de salir.</p> },
              { titulo: "Cancelación", contenido: <p>Puedes cancelar o cambiar la fecha sin costo hasta 7 días antes de la salida.</p> }
            ]}
          />
          {agregado && (
            <p className="aviso-agregado" role="status">
              ✓ Agregado. Tienes {enMaleta} {enMaleta === 1 ? "viajero" : "viajeros"} para {p.nombre} en tu maleta.
            </p>
          )}
        </div>
      </div>
      <div className="section-head related-head"><h2>También te puede gustar</h2></div>
      <div className="grid grid-2">{relacionados.map((r) => <DestinoCard key={r.id} {...r} />)}</div>
    </section>
  );
}

export default DestinoDetalle;
