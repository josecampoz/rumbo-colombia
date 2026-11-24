import { Link } from "react-router-dom";

// Componente reutilizable #1: botón personalizado.
// Si recibe "to" se comporta como enlace; si no, como botón normal.
function Boton({ to, variante = "primario", children, ...props }) {
  const clase = `btn btn-${variante}`;
  if (to) {
    return <Link to={to} className={clase}>{children}</Link>;
  }
  return <button className={clase} {...props}>{children}</button>;
}

export default Boton;
