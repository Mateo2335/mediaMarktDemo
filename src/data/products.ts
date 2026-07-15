export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  isFreeShipping: boolean;
  tag?: string; // e.g., "Novedad", "Más vendido", "Día sin IVA", "Oferta"
  description: string;
  specs: string[];
}

export const CATEGORIES = [
  "Todos",
  "Smartphones",
  "Portátiles",
  "Televisores",
  "Gaming",
  "Hogar"
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Apple iPhone 15 Pro, Titanio Natural, 256 GB, 5G",
    category: "Smartphones",
    price: 1129,
    originalPrice: 1249,
    rating: 4.8,
    reviewsCount: 312,
    image: "/images/iphone15_pro.png",
    isFreeShipping: true,
    tag: "Más vendido",
    description: "El primer iPhone con diseño de titanio de calidad aeroespacial, chip A17 Pro y el sistema de cámaras más potente en un iPhone hasta la fecha.",
    specs: ["Pantalla Super Retina XDR de 6.1\"", "Chip A17 Pro con GPU de 6 núcleos", "Cámara principal de 48 Mpx", "Conector USB-C"]
  },
  {
    id: "prod-2",
    name: "Apple MacBook Air 13, Chip M3, 8GB RAM, 256GB SSD, Gris Espacial",
    category: "Portátiles",
    price: 1199,
    originalPrice: 1299,
    rating: 4.7,
    reviewsCount: 184,
    image: "/images/macbook_air.png",
    isFreeShipping: true,
    tag: "Día sin IVA",
    description: "El MacBook Air con chip M3 es ultraportátil y superrápido para que trabajes y te diviertas a tu ritmo en cualquier parte.",
    specs: ["Chip M3 de Apple con CPU de 8 núcleos", "8 GB de memoria unificada", "256 GB de almacenamiento SSD", "Hasta 18 horas de autonomía"]
  },
  {
    id: "prod-3",
    name: "Sony WH-1000XM5, Auriculares de Diadema Inalámbricos, ANC, Negro",
    category: "Televisores", // In electronics stores, audio is often grouped with TV/Audio
    price: 299,
    originalPrice: 379,
    rating: 4.9,
    reviewsCount: 520,
    image: "/images/sony_headphones.png",
    isFreeShipping: true,
    tag: "Oferta especial",
    description: "Auriculares inalámbricos con Noise Cancelling líder del sector, calidad de sonido excepcional y llamadas con una nitidez incomparable.",
    specs: ["Noise Cancelling con procesador V1", "Hasta 30 horas de autonomía", "Carga rápida (3 min para 3h)", "Conectividad multipunto"]
  },
  {
    id: "prod-4",
    name: "Smart TV LG OLED55C34LA, 55\" OLED Evo, UHD 4K, Smart TV",
    category: "Televisores",
    price: 1099,
    originalPrice: 1499,
    rating: 4.8,
    reviewsCount: 198,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80",
    isFreeShipping: true,
    tag: "-26% Descuento",
    description: "El único negro puro que hace que el resto de colores brille. El televisor inteligente con procesador de máxima potencia 4K a9 Gen6 con IA.",
    specs: ["Pantalla OLED Evo de 55 pulgadas", "Resolución Ultra HD 4K", "Procesador Inteligente a9 Gen6", "Dolby Vision y Dolby Atmos"]
  },
  {
    id: "prod-5",
    name: "PlayStation 5 Slim Standard, Edición Chasis D, Blanco/Negro",
    category: "Gaming",
    price: 499,
    originalPrice: 549,
    rating: 4.9,
    reviewsCount: 742,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
    isFreeShipping: true,
    tag: "Novedad",
    description: "Experimenta cargas superrápidas gracias a una unidad de estado sólido (SSD) de alta velocidad, una inmersión más profunda con retroalimentación háptica.",
    specs: ["Almacenamiento SSD de 1 TB", "Gráficos en 4K y hasta 120 fps", "Audio 3D Tempest", "Lector de discos Ultra HD Blu-ray"]
  },
  {
    id: "prod-6",
    name: "Dyson V15 Detect Fluffy, Aspiradora sin Cable, 660W, Amarillo/Níquel",
    category: "Hogar",
    price: 599,
    originalPrice: 699,
    rating: 4.6,
    reviewsCount: 145,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80",
    isFreeShipping: true,
    tag: "Top Calidad",
    description: "La aspiradora sin cable más potente e inteligente de Dyson, con iluminación que revela el polvo microscópico y pantalla LCD en tiempo real.",
    specs: ["Potencia de succión de 240 AW", "Autonomía de hasta 60 minutos", "Sensor acústico de partículas", "Pantalla LCD integrada"]
  },
  {
    id: "prod-7",
    name: "Samsung Galaxy S24 Ultra, 512 GB, 12GB RAM, Amarillo Titanium",
    category: "Smartphones",
    price: 1279,
    originalPrice: 1459,
    rating: 4.8,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    isFreeShipping: true,
    tag: "Galaxy AI",
    description: "Te damos la bienvenida a la era de la IA móvil. Con el nuevo Galaxy S24 Ultra podrás dar rienda suelta a tu creatividad y productividad.",
    specs: ["Pantalla QHD+ Dynamic AMOLED 2X de 6.8\"", "Cámara principal de 200 MP con Zoom Óptico", "Procesador Snapdragon 8 Gen 3 para Galaxy", "S Pen integrado"]
  },
  {
    id: "prod-8",
    name: "Cafetera Superautomática De'Longhi Magnifica Start, ECAM220.22.GB",
    category: "Hogar",
    price: 349,
    originalPrice: 399,
    rating: 4.5,
    reviewsCount: 215,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80",
    isFreeShipping: false,
    tag: "Oferta",
    description: "Introduce el grano de café recién molido para preparar tus bebidas favoritas con solo pulsar un botón. Incluye espumador de leche manual.",
    specs: ["Presión de 15 bares", "Panel de control táctil intuitivo", "Molinillo integrado con 13 ajustes", "Sistema Cappuccino manual"]
  },
  {
    id: "prod-9",
    name: "Consola Nintendo Switch Modelo OLED, Blanco",
    category: "Gaming",
    price: 319,
    originalPrice: 349,
    rating: 4.8,
    reviewsCount: 421,
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80",
    isFreeShipping: true,
    tag: "Más vendido",
    description: "Disfruta de tus juegos favoritos donde, cuando y con quien quieras en la pantalla OLED de 7 pulgadas con colores intensos y contrastes definidos.",
    specs: ["Pantalla OLED de 7 pulgadas", "64 GB de almacenamiento interno", "Soporte ancho ajustable", "Puerto LAN integrado en la base"]
  },
  {
    id: "prod-10",
    name: "HP Victus 16-r0012ns, Intel Core i7-13700H, 16GB RAM, 512GB SSD, RTX 4060",
    category: "Portátiles",
    price: 949,
    originalPrice: 1199,
    rating: 4.4,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80",
    isFreeShipping: true,
    tag: "Gamer Choice",
    description: "La laptop HP Victus de 16,1 pulgadas se ha diseñado para jugar con el máximo rendimiento. Cuenta con procesador Intel de 13ª generación.",
    specs: ["Procesador Intel Core i7-13700H", "16 GB de RAM DDR5", "Gráficos NVIDIA GeForce RTX 4060", "Pantalla de 16.1\" FHD a 144Hz"]
  }
];
