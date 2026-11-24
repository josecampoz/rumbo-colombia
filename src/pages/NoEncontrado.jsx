import Boton from "../components/Boton";

function NoEncontrado() {
  return (
    <section className="section not-found">
      <div className="nf-cup">🧭</div>
      <h1>404</h1>
      <h2>¡Ups! Te saliste del mapa.</h2>
      <p>La página que buscas no existe o fue movida.</p>
      <Boton to="/">Volver al inicio</Boton>
    </section>
  );
}

export default NoEncontrado;
