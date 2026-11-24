import { useContext } from "react";
import { FormularioContext } from "../context/FormularioContext";

// Lee los datos directamente del contexto: se actualiza con cada onChange.
function ResumenFormulario({ hayCompra }) {
  const { formulario } = useContext(FormularioContext);

  const filas = [
    ["Nombre", formulario.nombre],
    ["Correo", formulario.correo],
    ["Teléfono", formulario.telefono],
    ...(hayCompra
      ? [["Ciudad de salida", formulario.direccion], ["Fecha del viaje", formulario.fecha]]
      : [["Asunto", formulario.asunto]]),
  ];

  return (
    <aside className="form-preview">
      <div className="form-heading">
        <span className="eyebrow">02 · Previsualización</span>
        <h2>Tu información</h2>
      </div>

      <div className="preview-card">
        <div className="preview-status">
          <span className="status-dot" />
          Actualización en tiempo real
        </div>
        {filas.map(([etiqueta, valor]) => (
          <div className="preview-item" key={etiqueta}>
            <span>{etiqueta}</span>
            <strong>{valor || "Sin ingresar"}</strong>
          </div>
        ))}
      </div>
    </aside>
  );
}

export default ResumenFormulario;
