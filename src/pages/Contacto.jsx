import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Boton from "../components/Boton";
import FormularioContacto from "../components/FormularioContacto";
import ResumenFormulario from "../components/ResumenFormulario";
import ClienteActual from "../components/ClienteActual";
import Accordion from "../components/Accordion";
import { formatoCOP } from "../data/destinos";
import { FormularioContext } from "../context/FormularioContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

function Contacto() {
  const { formulario, setFormulario, limpiarFormulario, maleta, cantidadPersonas, totalMaleta, vaciarMaleta, registrarReserva } =
    useContext(FormularioContext);
  const { usuario } = useAuth();
  const { mostrarToast } = useToast();

  // Estados locales con useState()
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [confirmacion, setConfirmacion] = useState(null); // copia de lo enviado

  const hayCompra = maleta.length > 0;

  // onChange: actualiza el campo en el contexto y limpia su error
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
    if (errores[name]) {
      setErrores((anteriores) => ({ ...anteriores, [name]: "" }));
    }
  };

  // Validaciones
  const validarFormulario = () => {
    const nuevos = {};
    const nombre = formulario.nombre.trim();
    const telefono = formulario.telefono.replace(/[\s-]/g, "").replace(/^\+?57/, "");

    if (!nombre) nuevos.nombre = "El nombre es obligatorio.";
    else if (nombre.length < 3) nuevos.nombre = "El nombre debe tener al menos 3 caracteres.";
    else if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'.-]+$/.test(nombre)) nuevos.nombre = "El nombre solo puede contener letras.";

    if (!formulario.correo.trim()) nuevos.correo = "El correo es obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.correo.trim())) nuevos.correo = "Ingresa un correo electrónico válido.";

    if (!formulario.telefono.trim()) nuevos.telefono = "El teléfono es obligatorio.";
    else if (!/^\d{10}$/.test(telefono)) nuevos.telefono = "Ingresa un celular válido de 10 dígitos (ej. 300 000 0000).";

    if (hayCompra) {
      if (!formulario.fecha) nuevos.fecha = "Elige la fecha del viaje.";
      else if (formulario.fecha < new Date().toISOString().slice(0, 10)) nuevos.fecha = "La fecha no puede estar en el pasado.";
      if (!formulario.direccion.trim()) nuevos.direccion = "La ciudad de salida es obligatoria.";
      else if (formulario.direccion.trim().length < 3) nuevos.direccion = "Escribe una ciudad válida.";
    } else {
      if (!formulario.mensaje.trim()) nuevos.mensaje = "El mensaje es obligatorio.";
      else if (formulario.mensaje.trim().length < 10) nuevos.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    }

    return nuevos;
  };

  // onSubmit
  const manejarEnvio = (e) => {
    e.preventDefault();
    const nuevos = validarFormulario();
    setErrores(nuevos);

    if (Object.keys(nuevos).length > 0) {
      setEnviado(false);
      mostrarToast("Revisa los campos marcados en rojo.", "error");
      return;
    }

    // Guardamos lo enviado (y la reserva) para el mensaje personalizado
    setConfirmacion({
      ...formulario,
      asunto: hayCompra ? "Reserva de viaje" : formulario.asunto,
      destinos: maleta,
      cantidad: cantidadPersonas,
      total: totalMaleta,
    });
    setEnviado(true);
    if (hayCompra) {
      // Se guarda la reserva (localStorage) asociado a la cuenta, si hay sesión iniciada.
      registrarReserva({
        cuenta: usuario?.correo || null,
        cliente: formulario.nombre.trim(),
        correo: formulario.correo.trim(),
        telefono: formulario.telefono,
        direccion: formulario.direccion,
        fechaViaje: formulario.fecha, // 'fecha' la usa el contexto para la fecha de creación
        comentarios: formulario.mensaje,
        destinos: maleta,
        cantidad: cantidadPersonas,
        total: totalMaleta
      });
      vaciarMaleta(); // la reserva ya fue confirmada
      mostrarToast("¡Reserva confirmado! ☕");
    } else {
      mostrarToast("Mensaje enviado. Te responderemos pronto.");
    }
  };

  const nuevaSolicitud = () => {
    limpiarFormulario();
    setErrores({});
    setConfirmacion(null);
    setEnviado(false);
  };

  const primerNombre = confirmacion?.nombre.trim().split(/\s+/)[0];
  const reserva = confirmacion?.destinos.length > 0;

  return (
    <section className="section contacto">
      <div className="section-head">
        <span className="eyebrow">Hablemos</span>
        <h1>Contáctanos</h1>
        <p>Reservas, consultas o alianzas: te responderemos en menos de 24 horas.</p>
      </div>

      {enviado ? (
        <div className="gracias" role="status">
          <h2>¡Gracias, {primerNombre}! ☕</h2>
          <p>
            Recibimos tu {reserva ? "reserva" : "mensaje"} sobre <strong>{confirmacion.asunto.toLowerCase()}</strong>.
            Te escribiremos a <strong>{confirmacion.correo}</strong> o te llamaremos al{" "}
            <strong>{confirmacion.telefono}</strong> muy pronto.
          </p>
          {reserva && (
            <>
              <ul className="gracias-lista">
                {confirmacion.destinos.map((p) => (
                  <li key={p.id}>{p.cantidad} × {p.nombre} <span>{formatoCOP(p.precio * p.cantidad)}</span></li>
                ))}
              </ul>
              <p>
                Reservamos para {confirmacion.cantidad} {confirmacion.cantidad === 1 ? "persona" : "personas"}, saliendo desde{" "}
                <strong>{confirmacion.direccion}</strong> el <strong>{confirmacion.fecha}</strong>. Total de la reserva: <strong>{formatoCOP(confirmacion.total)}</strong>.
              </p>
            </>
          )}
          <div className="gracias-acciones">
            <Boton variante="secundario" onClick={nuevaSolicitud}>Enviar otra solicitud</Boton>
            <Boton to="/destinos">Seguir explorando</Boton>
          </div>
        </div>
      ) : (
        <>
          {hayCompra ? (
            <div className="purchase-banner">
              <strong>Resumen de tu compra:</strong> {cantidadPersonas} {cantidadPersonas === 1 ? "persona" : "personas"} · {formatoCOP(totalMaleta)}
              <ul>
                {maleta.map((p) => (
                  <li key={p.id}>{p.cantidad} × {p.nombre} <span>{formatoCOP(p.precio * p.cantidad)}</span></li>
                ))}
              </ul>
              <Link to="/destinos">Modificar maleta</Link>
            </div>
          ) : null}

          <div className="contact-grid">
            <FormularioContacto
              errores={errores}
              onChange={manejarCambio}
              onSubmit={manejarEnvio}
              hayCompra={hayCompra}
            />
            <ResumenFormulario hayCompra={hayCompra} />
          </div>
        </>
      )}

      <ClienteActual />

      <div className="faq">
        <span className="eyebrow">Preguntas frecuentes</span>
        <h2>¿Tienes dudas?</h2>
        <Accordion
          items={[
            { pregunta: "¿Con cuánta anticipación debo reservar?", respuesta: <p>Recomendamos hacerlo con 15 días de anticipación; en temporada alta (diciembre y Semana Santa), con un mes.</p> },
            { pregunta: "¿Los tiquetes aéreos están incluidos?", respuesta: <p>Depende del paquete: cada destino indica en la pestaña “Incluye” qué cubre el precio. Si necesitas tiquetes, indícalo en las notas de la reserva y lo cotizamos.</p> },
            { pregunta: "¿Puedo cambiar la fecha de mi viaje?", respuesta: <p>Sí, hasta 7 días antes de la salida y sin costo. Escríbenos desde este formulario con tu nombre y la nueva fecha.</p> },
            { pregunta: "¿Cómo se guarda mi maleta?", respuesta: <p>La maleta se guarda en tu navegador (localStorage), así que sigue ahí si recargas la página.</p> },
            { pregunta: "¿Puedo ver mis reservas anteriores?", respuesta: <p>Sí. Inicia sesión y entra a “Mi perfil” para ver el historial de tus reservas.</p> }
          ]}
        />
      </div>
    </section>
  );
}

export default Contacto;
