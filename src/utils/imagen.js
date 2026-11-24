// Reduce la imagen elegida a un máximo de 800 px y la convierte en texto (Data URL).
// Así cabe en localStorage (límite aprox. 5 MB) sin necesidad de un servidor.
export function imagenADataURL(archivo, maximo = 800) {
  return new Promise((resolver, rechazar) => {
    const lector = new FileReader();
    lector.onerror = () => rechazar(new Error("No fue posible leer el archivo."));
    lector.onload = () => {
      const img = new Image();
      img.onerror = () => rechazar(new Error("El archivo no es una imagen válida."));
      img.onload = () => {
        const escala = Math.min(1, maximo / Math.max(img.width, img.height));
        const lienzo = document.createElement("canvas");
        lienzo.width = Math.round(img.width * escala);
        lienzo.height = Math.round(img.height * escala);
        const ctx = lienzo.getContext("2d");
        ctx.fillStyle = "#fff"; // fondo blanco para PNG con transparencia
        ctx.fillRect(0, 0, lienzo.width, lienzo.height);
        ctx.drawImage(img, 0, 0, lienzo.width, lienzo.height);
        resolver(lienzo.toDataURL("image/jpeg", 0.85));
      };
      img.src = lector.result;
    };
    lector.readAsDataURL(archivo);
  });
}
