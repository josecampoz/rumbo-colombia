// Datos de ejemplo (en un proyecto real vendrían de una API o base de datos)
// Cada destino es un paquete turístico. El precio es por persona.
export const destinos = [
  { id: 1, nombre: "Cartagena Colonial", region: "Caribe", duracion: "4 días / 3 noches", incluye: "Hotel boutique, city tour y cena en el centro histórico", precio: 1450000,
    imagen: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=1200&q=85",
    descripcion: "Murallas, balcones de colores y atardeceres frente al mar Caribe.",
    detalle: "Recorre la ciudad amurallada con guía local, visita el Castillo de San Felipe y disfruta una cena con vista a la bahía. Incluye traslados aeropuerto-hotel." },
  { id: 2, nombre: "San Andrés Siete Colores", region: "Insular", duracion: "5 días / 4 noches", incluye: "Hotel frente al mar, paseo en lancha y snorkel", precio: 2350000,
    imagen: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=85",
    descripcion: "El mar de siete colores, arena blanca y cayos de postal.",
    detalle: "Cinco días para navegar por Johnny Cay y Acuario, hacer snorkel y recorrer la isla en maleta de golf. Tiquetes aéreos no incluidos." },
  { id: 3, nombre: "Eje Cafetero Aventura", region: "Andina", duracion: "3 días / 2 noches", incluye: "Finca cafetera, Valle de Cocora y termales", precio: 980000,
    imagen: "/images/eje-cafetero.jpg",
    descripcion: "Palmas de cera, cafetales y pueblos patrimonio entre montañas.",
    detalle: "Caminata por el Valle de Cocora, tour del café en finca tradicional y tarde de termales. Ideal para viajar en familia o en pareja." },
  { id: 4, nombre: "Amazonas Selva Viva", region: "Amazonía", duracion: "5 días / 4 noches", incluye: "Lodge en la selva, guía nativo y navegación por el río", precio: 2100000,
    imagen: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85",
    descripcion: "Selva, delfines rosados y noches bajo un cielo lleno de estrellas.",
    detalle: "Convive con comunidades indígenas, navega el río Amazonas y avista fauna con guías locales. Llevar repelente y ropa ligera de manga larga." },
  { id: 5, nombre: "Desierto de la Tatacoa", region: "Andina", duracion: "2 días / 1 noche", incluye: "Camping, observación de estrellas y recorrido por el desierto", precio: 620000,
    imagen: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    descripcion: "Paisajes rojos y grises y uno de los mejores cielos para ver estrellas.",
    detalle: "Caminata guiada por Los Hoyos y el Cusco, observación astronómica y noche de camping. Llevar sombrero, protector solar y abrigo para la noche." },
  { id: 6, nombre: "Tayrona y Santa Marta", region: "Caribe", duracion: "4 días / 3 noches", incluye: "Caminata al Parque Tayrona, ecohabitaciones y desayunos", precio: 1280000,
    imagen: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85",
    descripcion: "Playas escondidas entre selva y las nieves de la Sierra Nevada.",
    detalle: "Ingreso al Parque Tayrona, caminata hasta Cabo San Juan y visita al centro histórico de Santa Marta. Incluye seguro de viaje." },
];

export const formatoCOP = (n) => "$" + n.toLocaleString("es-CO");
