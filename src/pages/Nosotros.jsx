const valores = [
  {
    icono: (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M24 39V23" />
        <path d="M24 29c-7-1-11-5-12-12 7 0 12 3 12 10" />
        <path d="M24 24c1-8 6-12 14-13 0 8-4 13-14 13" />
        <path d="M17 39h14" />
      </svg>
    ),
    titulo: "Turismo responsable",
    texto: "Trabajamos con operadores locales y cuidamos la naturaleza y las comunidades que visitamos."
  },
  {
    icono: (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <circle cx="24" cy="24" r="17" />
        <path d="M15 24h18" />
        <path d="M24 15v18" />
        <path d="m19 20 5 4 5-4" />
        <path d="m19 28 5-4 5 4" />
      </svg>
    ),
    titulo: "Precios claros",
    texto: "Cada paquete dice exactamente qué incluye. Sin costos ocultos ni letra pequeña."
  },
  {
    icono: (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="m24 9 3.2 9.8H38l-8.7 6.1 3.3 9.9L24 29l-8.6 6.8 3.3-9.9L10 18.8h10.8L24 9Z" />
        <path d="M38 10v7M34.5 13.5h7M10 30v6M7 33h6" />
      </svg>
    ),
    titulo: "Experiencias de calidad",
    texto: "Seleccionamos hoteles, guías y rutas probados para que tu viaje salga como lo soñaste."
  },
  {
    icono: (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M8 32V19l8-7 8 7 8-7 8 7v13" />
        <path d="M8 32h32" />
        <path d="M17 32v7h14v-7" />
        <path d="M24 19v7" />
      </svg>
    ),
    titulo: "Orgullo colombiano",
    texto: "Celebramos nuestra diversidad y la compartimos con viajeros de todo el mundo."
  },
];

function Nosotros() {
  return (
    <section className="section">
      <div className="section-head">
        <span className="eyebrow">Nuestra historia</span>
        <h1>Nacimos para mostrar Colombia.</h1>
      </div>

      <div className="historia">
        <p>
          Rumbo Colombia nació en 2014 en Medellín, cuando tres amigos guías de turismo
          decidieron ofrecer viajes pensados por gente local: sin afanes, con buenos
          hoteles y con tiempo para conocer de verdad cada lugar.
        </p>
        <p>
          Hoy organizamos paquetes por seis regiones del país con más de treinta aliados
          locales. Conocemos cada ruta, cada hospedaje y cada guía, porque creemos que un
          gran viaje empieza mucho antes de subir al avión.
        </p>
      </div>

      <div className="section-head"><h2>Lo que nos guía</h2></div>
      <div className="grid grid-4">
        {valores.map((v) => (
          <div className="valor" key={v.titulo}>
            <span className="valor-icono">{v.icono}</span>
            <h3>{v.titulo}</h3>
            <p>{v.texto}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Nosotros;
