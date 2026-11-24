import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormularioContext } from "../context/FormularioContext";
import { useToast } from "../context/ToastContext";
import { formatoCOP } from "../data/destinos";
import { imagenADataURL } from "../utils/imagen";

const FORMATOS = ["image/jpeg", "image/png", "image/webp"];
const MAX_MB = 2;
const vacio = { nombre: "", region: "Caribe", duracion: "", incluye: "", precio: "", descripcion: "" };

// Vista protegida (administrador): registra un destino con imagen validada y vista previa.
function CargarDestino() {
  const { agregarDestino } = useContext(FormularioContext);
  const { mostrarToast } = useToast();
  const navigate = useNavigate();

  const [datos, setDatos] = useState(vacio);
  const [archivo, setArchivo] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState("");
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [claveInput, setClaveInput] = useState(0); // cambiarla reinicia el <input type="file">

  // Vista previa: URL temporal del archivo; se libera al cambiar de imagen o salir.
  useEffect(() => {
    if (!archivo) { setVistaPrevia(""); return undefined; }
    const url = URL.createObjectURL(archivo);
    setVistaPrevia(url);
    return () => URL.revokeObjectURL(url);
  }, [archivo]);

  const cambiar = (e) => {
    const { name, value } = e.target;
    setDatos((d) => ({ ...d, [name]: value }));
    if (errores[name]) setErrores((er) => ({ ...er, [name]: "" }));
  };

  // Validación del archivo: tipo y tamaño.
  const elegirImagen = (e) => {
    const elegido = e.target.files?.[0];
    if (!elegido) return;
    if (!FORMATOS.includes(elegido.type)) {
      setErrores((er) => ({ ...er, imagen: "Formato no permitido. Usa JPG, PNG o WEBP." }));
      setArchivo(null);
      setClaveInput((k) => k + 1);
      return;
    }
    if (elegido.size > MAX_MB * 1024 * 1024) {
      setErrores((er) => ({ ...er, imagen: `La imagen pesa más de ${MAX_MB} MB.` }));
      setArchivo(null);
      setClaveInput((k) => k + 1);
      return;
    }
    setErrores((er) => ({ ...er, imagen: "" }));
    setArchivo(elegido);
  };

  const validar = () => {
    const n = {};
    if (datos.nombre.trim().length < 3) n.nombre = "El nombre debe tener al menos 3 caracteres.";
    if (!datos.incluye.trim()) n.incluye = "Indica qué incluye el paquete.";
    if (!(Number(datos.precio) > 0)) n.precio = "Ingresa un precio mayor a 0.";
    if (datos.descripcion.trim().length < 10) n.descripcion = "La descripción debe tener al menos 10 caracteres.";
    if (!archivo) n.imagen = errores.imagen || "Selecciona una imagen del destino.";
    return n;
  };

  const registrar = async (e) => {
    e.preventDefault();
    const n = validar();
    setErrores(n);
    if (Object.keys(n).length) { mostrarToast("Revisa los campos marcados en rojo.", "error"); return; }

    setGuardando(true);
    try {
      const imagen = await imagenADataURL(archivo);
      const guardado = agregarDestino({
        nombre: datos.nombre.trim(),
        region: datos.region,
        duracion: datos.duracion.trim(),
        incluye: datos.incluye.trim(),
        precio: Number(datos.precio),
        descripcion: datos.descripcion.trim(),
        detalle: datos.descripcion.trim(),
        imagen
      });
      if (!guardado) { mostrarToast("No hay espacio en el navegador para guardar la imagen.", "error"); setGuardando(false); return; }
      mostrarToast("Destino registrado y agregado al catálogo ✈️");
      navigate("/admin");
    } catch (error) {
      mostrarToast(error.message, "error");
      setGuardando(false);
    }
  };

  const limpiar = () => { setDatos(vacio); setArchivo(null); setErrores({}); setClaveInput((k) => k + 1); };

  const campoError = (campo) => errores[campo] && <small className="error-text">{errores[campo]}</small>;

  return (
    <section className="section">
      <Link to="/admin" className="volver">← Volver al panel</Link>
      <div className="section-head">
        <span className="eyebrow">Administración</span>
        <h1>Registrar destino</h1>
        <p>Completa los datos y selecciona una imagen (JPG, PNG o WEBP, máximo {MAX_MB} MB).</p>
      </div>

      <div className="upload-grid">
        <form className="form" onSubmit={registrar} noValidate>
          <label>Nombre
            <input name="nombre" value={datos.nombre} onChange={cambiar} placeholder="Ej. Medellín Paisa" className={errores.nombre ? "input-error" : ""} />
            {campoError("nombre")}
          </label>
          <div className="form-row">
            <label>Región
              <select name="region" value={datos.region} onChange={cambiar}>
                {["Caribe", "Insular", "Andina", "Amazonía", "Pacífico", "Orinoquía"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </label>
            <label>Duración
              <input name="duracion" value={datos.duracion} onChange={cambiar} placeholder="4 días / 3 noches" />
            </label>
          </div>
          <div className="form-row">
            <label>Incluye
              <input name="incluye" value={datos.incluye} onChange={cambiar} placeholder="Hotel, desayunos y city tour" className={errores.incluye ? "input-error" : ""} />
              {campoError("incluye")}
            </label>
            <label>Precio por persona (COP)
              <input name="precio" type="number" min="1" step="500" value={datos.precio} onChange={cambiar} placeholder="42000" className={errores.precio ? "input-error" : ""} />
              {campoError("precio")}
            </label>
          </div>
          <label>Descripción
            <textarea name="descripcion" rows="3" value={datos.descripcion} onChange={cambiar} placeholder="Cuéntanos qué hace especial a este destino" className={errores.descripcion ? "input-error" : ""} />
            {campoError("descripcion")}
          </label>
          <label>Imagen del destino
            <input key={claveInput} type="file" accept="image/png,image/jpeg,image/webp" onChange={elegirImagen} className={errores.imagen ? "input-error" : ""} />
            {campoError("imagen")}
          </label>
          <div className="gracias-acciones">
            <button className="btn btn-primario" type="submit" disabled={guardando}>{guardando ? "Guardando…" : "Registrar destino"}</button>
            <button className="btn btn-secundario" type="button" onClick={limpiar}>Limpiar</button>
          </div>
        </form>

        <aside className="form-preview upload-preview">
          <span className="eyebrow">Vista previa</span>
          {vistaPrevia
            ? <img src={vistaPrevia} alt="Vista previa del destino" />
            : <div className="upload-placeholder">La imagen aparecerá aquí</div>}
          <span className="chip">{datos.region}</span>
          <h3>{datos.nombre || "Nombre del destino"}</h3>
          <p>{datos.descripcion || "La descripción se mostrará en la ficha del destino."}</p>
          <strong className="precio">{datos.precio ? formatoCOP(Number(datos.precio)) : "$0"}</strong>
          {archivo && <small>{archivo.name} · {(archivo.size / 1024).toFixed(0)} KB</small>}
        </aside>
      </div>
    </section>
  );
}

export default CargarDestino;
