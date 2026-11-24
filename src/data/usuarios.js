// Usuarios definidos previamente en el sistema (no hay backend).
// OJO: en un proyecto real las contraseñas NUNCA se guardan en el frontend;
// la autenticación se valida en un servidor. Aquí es solo para la práctica.
export const usuarios = [
  { id: 1, nombre: "Administrador Rumbo", correo: "admin@rumbocolombia.com", password: "Admin123", rol: "administrador" },
  { id: 2, nombre: "Viajero Rumbo", correo: "usuario@rumbocolombia.com", password: "Usuario123", rol: "usuario" }
];
