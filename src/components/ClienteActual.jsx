import { useContext } from "react";
import { FormularioContext } from "../context/FormularioContext";

// Muestra los datos del cliente guardados en el contexto (se mantienen entre vistas).
function ClienteActual() {
  const { formulario } = useContext(FormularioContext);

  return (
    <div className="client-card">
      <div>
        <span className="eyebrow">Viajero actual</span>
        <h3>{formulario.nombre || "Sin datos"}</h3>
        <p>{formulario.correo || "Diligencia el formulario de contacto."}</p>
      </div>
      <div className="client-mini-data">
        <span>{formulario.telefono || "Sin teléfono"}</span>
        <span>{formulario.direccion || "Sin dirección"}</span>
      </div>
    </div>
  );
}

export default ClienteActual;
