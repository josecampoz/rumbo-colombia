import { useContext } from "react";
import { FormularioContext } from "../context/FormularioContext";

// El estado del formulario vive en el Context API; los manejadores llegan por props.
function FormularioContacto({ errores, onChange, onSubmit, hayCompra }) {
  const { formulario } = useContext(FormularioContext);

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form-heading">
        <span className="eyebrow">01 · Tus datos</span>
        <h2>{hayCompra ? "Datos para tu reserva" : "Escríbenos"}</h2>
      </div>

      <label>Nombre completo
        <input name="nombre" type="text" value={formulario.nombre} onChange={onChange}
          placeholder="Ej. María Fernanda Ruiz" className={errores.nombre ? "input-error" : ""} />
        {errores.nombre && <small className="error-text">{errores.nombre}</small>}
      </label>

      <label>Correo electrónico
        <input name="correo" type="email" value={formulario.correo} onChange={onChange}
          placeholder="tu@correo.com" className={errores.correo ? "input-error" : ""} />
        {errores.correo && <small className="error-text">{errores.correo}</small>}
      </label>

      <label>Teléfono
        <input name="telefono" type="tel" value={formulario.telefono} onChange={onChange}
          placeholder="300 000 0000" className={errores.telefono ? "input-error" : ""} />
        {errores.telefono && <small className="error-text">{errores.telefono}</small>}
      </label>

      {hayCompra && (
        <label>Fecha del viaje
          <input name="fecha" type="date" value={formulario.fecha} onChange={onChange}
            min={new Date().toISOString().slice(0, 10)} className={errores.fecha ? "input-error" : ""} />
          {errores.fecha && <small className="error-text">{errores.fecha}</small>}
        </label>
      )}

      {hayCompra ? (
        <label>Ciudad de salida
          <textarea name="direccion" rows="3" value={formulario.direccion} onChange={onChange}
            placeholder="Ej. Medellín" className={errores.direccion ? "input-error" : ""} />
          {errores.direccion && <small className="error-text">{errores.direccion}</small>}
        </label>
      ) : (
        <label>Asunto
          <select name="asunto" value={formulario.asunto} onChange={onChange}>
            <option>Consulta general</option>
            <option>Reserva de viaje</option>
            <option>Viajes en grupo</option>
            <option>Alianzas</option>
          </select>
        </label>
      )}

      <label>{hayCompra ? "Notas de la reserva (opcional)" : "Mensaje"}
        <textarea name="mensaje" rows="4" value={formulario.mensaje} onChange={onChange}
          placeholder={hayCompra ? "¿Alergias, celebraciones especiales o preferencias del viaje?" : "Cuéntanos cómo podemos ayudarte"}
          className={errores.mensaje ? "input-error" : ""} />
        {errores.mensaje && <small className="error-text">{errores.mensaje}</small>}
      </label>

      <button className="btn btn-primario" type="submit">
        {hayCompra ? "Confirmar reserva" : "Enviar mensaje"}
      </button>
    </form>
  );
}

export default FormularioContacto;
