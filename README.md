# Rumbo Colombia · Agencia de viajes (React + Vite)

Proyecto final del curso: aplicación web de una agencia de viajes con paquetes turísticos por Colombia.
No usa backend: los datos se guardan en el navegador (`localStorage` / `sessionStorage`).

## Enlaces
- **Sitio publicado:** https://rumbo-colombia.vercel.app
- **Código fuente:** https://github.com/josecampoz/rumbo-colombia

## Ejecutar
```bash
npm install
npm run dev      # desarrollo
npm run build    # producción (carpeta dist)
```

## Usuarios de prueba (`src/data/usuarios.js`)
| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `admin@rumbocolombia.com` | `Admin123` |
| Usuario | `usuario@rumbocolombia.com` | `Usuario123` |

## Cómo funciona
1. El visitante explora **destinos**, los agrega a su **maleta** (carrito) indicando cuántas personas viajan.
2. En **Contacto** completa sus datos, la ciudad de salida y la fecha, y confirma la **reserva**.
3. El **usuario** ve sus reservas en *Mi perfil*. El **administrador** ve todas las reservas, registra destinos nuevos (con foto) y elimina los que creó.

## Mapa de requisitos → dónde está en el código
| # | Requisito | Archivos |
|---|---|---|
| 1 | Estructura y navegación | `src/App.jsx` (rutas), `components/`, `pages/`, `context/`, `data/`, `utils/` |
| 2 | Diseño, animaciones y carrusel | `styles.css` (keyframes y `@media`), `components/Carrusel.jsx` (en `Inicio`) |
| 3 | Modal | `components/Modal.jsx` → "Vista rápida" en `DestinoCard` y confirmar eliminación en `Admin` |
| 3 | Tabs | `components/Tabs.jsx` → `DestinoDetalle`, `Perfil`, `Admin` |
| 3 | Acordeón | `components/Accordion.jsx` → preguntas frecuentes en `Contacto` |
| 3 | Dropdown | `components/Dropdown.jsx` → filtros en `Destinos` y menú de usuario en `Navbar` |
| 3 | Toast | `components/Toast.jsx` + `context/ToastContext.jsx` (`useToast()`) |
| 4 | Archivos / imágenes | `pages/CargarDestino.jsx` + `utils/imagen.js` (JPG/PNG/WEBP, máx. 2 MB, vista previa) |
| 5 | Login | `pages/Login.jsx`, `context/AuthContext.jsx`, `data/usuarios.js` |
| 6 | Roles y vistas protegidas | `components/RutaProtegida.jsx` usado en `App.jsx` |
| 7 | Estado y persistencia | `sessionStorage`: sesión · `localStorage`: maleta, formulario, destinos nuevos, reservas |
| 9 | Despliegue | `vercel.json` (necesario para que React Router funcione al recargar) |

## Control de acceso
| Ruta | Sin sesión | Usuario | Administrador |
|---|---|---|---|
| `/`, `/destinos`, `/destinos/:id`, `/nosotros`, `/oficinas`, `/contacto`, `/login` | ✅ | ✅ | ✅ |
| `/perfil` | → `/login` | ✅ | ✅ |
| `/admin`, `/admin/nuevo` | → `/login` | 404 | ✅ |

## Claves de almacenamiento
- `sessionStorage` → `viajes_usuario` (se borra al cerrar la pestaña)
- `localStorage` → `maleta`, `formulario`, `destinos_nuevos`, `reservas`

## Pruebas realizadas (todas correctas)
1. Carrusel: avanza con flechas, puntos y solo cada 5 s; se pausa con el cursor.
2. Login incorrecto → Toast de error; correcto → Toast de bienvenida y vuelve a la página que se quería abrir.
3. La sesión sobrevive a F5 y se cierra con "Cerrar sesión".
4. Sin sesión, `/perfil`, `/admin` y `/admin/nuevo` redirigen al login.
5. Con rol usuario, `/admin` y `/admin/nuevo` muestran 404 y no aparece el enlace "Admin".
6. Modal "Vista rápida" cierra con ✕, Escape y clic fuera.
7. Dropdowns: filtrar por región y ordenar por precio/nombre.
8. Tabs en detalle y perfil; acordeón abre uno a la vez.
9. La maleta y las reservas persisten tras recargar; el usuario ve solo sus reservas y el admin todas, con la fecha del viaje.
10. Carga de imagen: rechaza `.txt` y PNG mayor a 2 MB; muestra vista previa; el destino aparece en el catálogo, persiste tras F5 y se elimina con confirmación.
11. Sin scroll horizontal en pantallas de 360 y 390 px.

Las capturas están en `docs/capturas/`.

## Imágenes
Cinco de los seis destinos usan fotografías de [Unsplash](https://unsplash.com) cargadas por URL (necesitan conexión a internet). Eje Cafetero (`eje-cafetero.jpg`) y la portada (`hero-rumbo-colombia.png`) usan imágenes locales de `public/images/`. El administrador puede registrar destinos con fotos reales desde `/admin/nuevo`.

## Despliegue en Vercel
1. Subir el proyecto a GitHub (`git init && git add . && git commit -m "Versión final" && git push`).
2. En [vercel.com](https://vercel.com) → **Add New… → Project** → importar el repositorio.
3. Vercel detecta Vite solo (Build: `npm run build`, Output: `dist`). Pulsar **Deploy**.
4. Copiar el enlace público para la entrega.

> Las credenciales están en el frontend solo porque la práctica no pide backend. En un proyecto real la autenticación se valida en un servidor.
