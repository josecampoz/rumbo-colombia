import { useContext } from "react";
import Boton from "../components/Boton";
import Carrusel from "../components/Carrusel";
import DestinoCard from "../components/DestinoCard";
import { FormularioContext } from "../context/FormularioContext";

function Inicio() {
  const { catalogo } = useContext(FormularioContext);
  const destacados = catalogo.slice(0, 3);
  return (
    <>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="eyebrow hero-eyebrow">Agencia de viajes en Colombia</span>
          <h1>Descubre los<br />rincones de <em>Colombia</em></h1>
          <p>
            Rumbo Colombia diseña paquetes turísticos por el Caribe, los Andes y la selva:
            hoteles, guías locales y experiencias para viajar tranquilo y volver con historias.
          </p>
          <div className="hero-actions">
            <Boton to="/destinos">Explorar destinos <span aria-hidden="true">→</span></Boton>
            <Boton to="/oficinas" variante="claro">Visitar una oficina</Boton>
          </div>
          <div className="hero-highlights">
            <div><span>✈</span><strong>6 destinos</strong><small>y más en camino</small></div>
            <div><span>⌁</span><strong>Guías locales</strong><small>certificados</small></div>
            <div><span>♡</span><strong>Reserva segura</strong><small>cambios sin costo</small></div>
          </div>
        </div>
      </section>

      <section className="section carrusel-section">
        <div className="section-head centered-head">
          <span className="eyebrow">Destacados</span>
          <h2>Nuestros destinos en un vistazo</h2>
          <p>Pasa el cursor para pausar o usa las flechas para explorar cada paquete.</p>
        </div>
        <Carrusel />
      </section>

      <section className="section origins-section">
        <div className="section-head centered-head">
          <span className="eyebrow">Paquetes más reservados</span>
          <h2>Viajes que cuentan historias</h2>
          <p>Cada región de Colombia tiene un carácter único. Elige la que más te inspire.</p>
        </div>
        <div className="grid">
          {destacados.map((d) => <DestinoCard key={d.id} {...d} />)}
        </div>
        <div className="center"><Boton to="/destinos" variante="secundario">Ver todos los destinos →</Boton></div>
      </section>
    </>
  );
}

export default Inicio;
