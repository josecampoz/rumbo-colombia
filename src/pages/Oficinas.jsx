import Boton from "../components/Boton";

const oficinas = [
  { ciudad: "Medellín", nombre: "Rumbo Colombia El Poblado", direccion: "Calle 10 # 36-15, El Poblado", horario: "Lun–Sáb · 8:00 a.m. – 7:00 p.m." },
  { ciudad: "Bogotá", nombre: "Rumbo Colombia Chapinero", direccion: "Carrera 13 # 59-20, Chapinero", horario: "Lun–Sáb · 8:00 a.m. – 7:00 p.m." },
  { ciudad: "Cartagena", nombre: "Rumbo Colombia Centro Histórico", direccion: "Calle del Arsenal # 8B-10, Centro", horario: "Lun–Dom · 9:00 a.m. – 8:00 p.m." },
  { ciudad: "Armenia", nombre: "Rumbo Colombia Eje Cafetero", direccion: "Carrera 14 # 20-30, Armenia, Quindío", horario: "Lun–Vie · 8:00 a.m. – 6:00 p.m." },
];

function Oficinas() {
  return (
    <section className="section">
      <div className="section-head">
        <span className="eyebrow">Visítanos</span>
        <h1>Nuestras oficinas</h1>
        <p>Ven a planear tu próximo viaje con nuestros asesores.</p>
      </div>
      <div className="grid grid-2">
        {oficinas.map((t) => (
          <article className="tienda" key={t.nombre}>
            <span className="tienda-ciudad">📍 {t.ciudad}</span>
            <h3>{t.nombre}</h3>
            <p>{t.direccion}</p>
            <p className="horario">🕐 {t.horario}</p>
            <a className="btn btn-secundario" target="_blank" rel="noreferrer"
               href={`https://www.google.com/maps/search/${encodeURIComponent(t.direccion + ", " + t.ciudad + ", Colombia")}`}>
              Cómo llegar
            </a>
          </article>
        ))}
      </div>
      <div className="center"><Boton to="/contacto" variante="secundario">¿Dudas? Escríbenos</Boton></div>
    </section>
  );
}

export default Oficinas;
