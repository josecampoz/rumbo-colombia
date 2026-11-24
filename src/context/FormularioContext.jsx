import { createContext, useEffect, useMemo, useState } from "react";
import { destinos as destinosBase } from "../data/destinos";

// Contexto con el estado compartido de toda la aplicación:
// datos del cliente (formulario) y maleta de compras.
// Sesión 9: ambos estados se guardan en localStorage y se recuperan al recargar la página.
export const FormularioContext = createContext(null);

export const formularioInicial = {
  nombre: "",
  correo: "",
  telefono: "",
  direccion: "",
  fecha: "",
  asunto: "Consulta general",
  mensaje: ""
};

const CLAVE_CARRITO = "maleta";
const CLAVE_FORMULARIO = "formulario";
const CLAVE_NUEVOS = "destinos_nuevos"; // destinos que registra el administrador
const CLAVE_RESERVAS = "reservas";

// localStorage solo guarda texto: JSON.parse() convierte el texto en objeto o arreglo.
// Si no hay nada guardado, o el texto está dañado, se devuelve el valor por defecto.
function leerLocalStorage(clave, valorPorDefecto) {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : valorPorDefecto;
  } catch (error) {
    console.error(`No se pudo recuperar "${clave}":`, error);
    return valorPorDefecto;
  }
}

// JSON.stringify() convierte el objeto o arreglo en texto antes de guardarlo.
function guardarLocalStorage(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch (error) {
    // Puede fallar en modo privado o si el navegador no permite almacenamiento.
    console.error(`No se pudo guardar "${clave}":`, error);
  }
}

function FormularioProvider({ children }) {
  // useState con función: se calcula el valor inicial solo una vez, al cargar la página.
  // Se combina con formularioInicial por si en el futuro se agregan campos nuevos.
  const [formulario, setFormulario] = useState(() => ({
    ...formularioInicial,
    ...leerLocalStorage(CLAVE_FORMULARIO, {})
  }));

  const [maleta, setMaleta] = useState(() => {
    const guardado = leerLocalStorage(CLAVE_CARRITO, []);
    return Array.isArray(guardado) ? guardado : [];
  }); // [{ ...destino, cantidad }]

  // Destinos agregados por el administrador (se suman a los destinos base).
  const [destinosNuevos, setDestinosNuevos] = useState(() => {
    const guardado = leerLocalStorage(CLAVE_NUEVOS, []);
    return Array.isArray(guardado) ? guardado : [];
  });

  // Reservas confirmados (el usuario ve los suyos y el administrador todos).
  const [reservas, setReservas] = useState(() => {
    const guardado = leerLocalStorage(CLAVE_RESERVAS, []);
    return Array.isArray(guardado) ? guardado : [];
  });

  // Catálogo completo = destinos nuevos primero + destinos base.
  const catalogo = useMemo(() => [...destinosNuevos, ...destinosBase], [destinosNuevos]);

  // useEffect se ejecuta después de renderizar cuando cambia la dependencia.
  // Cada cambio de la maleta o de los datos del cliente se guarda automáticamente.
  useEffect(() => {
    guardarLocalStorage(CLAVE_CARRITO, maleta);
  }, [maleta]);

  useEffect(() => {
    guardarLocalStorage(CLAVE_FORMULARIO, formulario);
  }, [formulario]);

  useEffect(() => {
    guardarLocalStorage(CLAVE_NUEVOS, destinosNuevos);
  }, [destinosNuevos]);

  useEffect(() => {
    guardarLocalStorage(CLAVE_RESERVAS, reservas);
  }, [reservas]);

  // Devuelve true si se pudo guardar. Falla si el navegador se quedó sin espacio.
  const agregarDestino = (datos) => {
    const nuevo = { ...datos, id: Date.now() };
    try {
      localStorage.setItem(CLAVE_NUEVOS, JSON.stringify([nuevo, ...destinosNuevos]));
    } catch (error) {
      console.error("No hay espacio para guardar el destino:", error);
      return false;
    }
    setDestinosNuevos((anteriores) => [nuevo, ...anteriores]);
    return true;
  };

  const eliminarDestino = (id) => {
    setDestinosNuevos((anteriores) => anteriores.filter((p) => p.id !== id));
    setMaleta((anterior) => anterior.filter((item) => item.id !== id));
  };

  const registrarReserva = (reserva) => {
    setReservas((anteriores) => [{ ...reserva, id: Date.now(), fecha: new Date().toISOString() }, ...anteriores]);
  };

  const limpiarFormulario = () => setFormulario(formularioInicial);

  const agregarAMaleta = (destino) => {
    setMaleta((maletaAnterior) => {
      const existente = maletaAnterior.find((item) => item.id === destino.id);

      if (existente) {
        return maletaAnterior.map((item) =>
          item.id === destino.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      return [...maletaAnterior, { ...destino, cantidad: 1 }];
    });
  };

  const quitarDeMaleta = (id) => {
    setMaleta((maletaAnterior) =>
      maletaAnterior
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarDeMaleta = (id) => {
    setMaleta((maletaAnterior) => maletaAnterior.filter((item) => item.id !== id));
  };

  const vaciarMaleta = () => setMaleta([]);

  const cantidadPersonas = useMemo(
    () => maleta.reduce((total, item) => total + item.cantidad, 0),
    [maleta]
  );

  const totalMaleta = useMemo(
    () => maleta.reduce((total, item) => total + item.precio * item.cantidad, 0),
    [maleta]
  );

  return (
    <FormularioContext.Provider
      value={{
        formulario,
        setFormulario,
        limpiarFormulario,
        catalogo,
        destinosNuevos,
        agregarDestino,
        eliminarDestino,
        reservas,
        registrarReserva,
        maleta,
        agregarAMaleta,
        quitarDeMaleta,
        eliminarDeMaleta,
        vaciarMaleta,
        cantidadPersonas,
        totalMaleta
      }}
    >
      {children}
    </FormularioContext.Provider>
  );
}

export default FormularioProvider;
