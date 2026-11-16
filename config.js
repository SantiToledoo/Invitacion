/* =====================================================================
   ✏️  ARCHIVO DE CONFIGURACIÓN — ¡SOLO TENÉS QUE EDITAR ESTE ARCHIVO!
   ---------------------------------------------------------------------
   - Cambiá los textos que están entre comillas "así".
   - Si no querés usar una sección, dejala vacía:  []  o  ""
   - Las fotos van en la carpeta /fotos y los videos en /videos.
   ===================================================================== */

window.BODA = {

  /* ---------- 1. LOS NOVIOS ---------- */
  novio1: "Sofía",
  novio2: "Martín",
  iniciales: "S & M",

  // Fecha y hora de la ceremonia. Formato: AAAA-MM-DDTHH:MM:00-03:00 (-03:00 = hora Argentina)
  fecha: "2027-03-20T18:00:00-03:00",
  fechaTexto: "Sábado 20 de marzo de 2027",

  frase: "Hay momentos en la vida que son especiales por sí solos, pero compartirlos con las personas que queremos los hace inolvidables.",
  hashtag: "#SofiYMartin2027",

  /* ---------- 2. FOTO DE PORTADA Y MÚSICA ---------- */
  fotoPortada: "fotos/portada.svg",           // Ej: "fotos/portada.jpg"
  musica: "",                                 // Ej: "musica/cancion.mp3"  (vacío = sin música)

  /* ---------- 3. NUESTRA HISTORIA (opcional) ---------- */
  historia: [
    { fecha: "2019", titulo: "Nos conocimos", texto: "Un cumpleaños de amigos en común y una charla que no terminó nunca.", foto: "fotos/historia1.svg" },
    { fecha: "2022", titulo: "Nos mudamos juntos", texto: "Primera casa, primeras plantas y la llegada de Lola, nuestra perrita.", foto: "fotos/historia2.svg" },
    { fecha: "2025", titulo: "¡Dijimos que sí!", texto: "Frente al mar, con anillo escondido en la mochila.", foto: "fotos/historia3.svg" }
  ],

  /* ---------- 4. CEREMONIA Y FIESTA ---------- */
  // "direccion" se usa para el mapa y el botón "Cómo llegar". Escribila como la buscarías en Google Maps.
  eventos: [
    {
      titulo: "Ceremonia",
      icono: "💍",
      hora: "18:00 hs",
      lugar: "Parroquia Nuestra Señora del Pilar",
      direccion: "Junín 1904, Recoleta, Buenos Aires"
    },
    {
      titulo: "Fiesta",
      icono: "🥂",
      hora: "20:30 hs",
      lugar: "Salón Los Jazmines",
      direccion: "Av. del Libertador 4100, Buenos Aires"
    }
  ],

  /* ---------- 5. CRONOGRAMA DEL DÍA (opcional) ---------- */
  cronograma: [
    { hora: "18:00", texto: "Ceremonia", icono: "💍" },
    { hora: "20:30", texto: "Recepción", icono: "🥂" },
    { hora: "22:00", texto: "Cena", icono: "🍽️" },
    { hora: "23:30", texto: "¡A bailar!", icono: "💃" },
    { hora: "05:00", texto: "Fin de fiesta", icono: "🌙" }
  ],

  /* ---------- 6. CÓDIGO DE VESTIMENTA ---------- */
  vestimenta: {
    titulo: "Elegante",
    texto: "Les pedimos evitar el color blanco, reservado para la novia. ¡Traigan zapatos cómodos para bailar!",
    colores: ["#8a9a5b", "#c9a227", "#6d4c41", "#2f4858"]   // paleta sugerida (opcional, dejá [] si no querés)
  },

  /* ---------- 7. GALERÍA DE FOTOS ---------- */
  // Subí tus fotos a la carpeta /fotos y escribí acá sus nombres.
  galeria: [
    "fotos/galeria1.svg",
    "fotos/galeria2.svg",
    "fotos/galeria3.svg",
    "fotos/galeria4.svg",
    "fotos/galeria5.svg",
    "fotos/galeria6.svg"
  ],

  /* ---------- 8. VIDEOS ---------- */
  // Dos opciones:
  //  a) Video de YouTube:  { youtube: "https://www.youtube.com/watch?v=XXXXXXX", titulo: "..." }
  //  b) Archivo propio:    { archivo: "videos/mi-video.mp4", titulo: "..." }   (recomendado: menos de 50 MB)
  videos: [
    // { youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", titulo: "Nuestra pre-boda" }
  ],

  /* ---------- 9. CONFIRMACIÓN DE ASISTENCIA (RSVP) ---------- */
  confirmacion: {
    fechaLimite: "20 de febrero de 2027",
    // Pegá acá la dirección de tu Google Apps Script (ver README, paso "Planilla de confirmaciones").
    // Si lo dejás vacío, las confirmaciones se envían por WhatsApp.
    urlPlanilla: "",
    // WhatsApp que recibe las confirmaciones: código de país + área sin 0 + número sin 15. Ej: 5491123456789
    whatsapp: "5491100000000",
    // Máximo de lugares si el link NO trae una cantidad personalizada
    lugaresPorDefecto: 2,
    preguntarComida: true,
    preguntarCancion: true
  },

  /* ---------- 10. REGALOS ---------- */
  regalos: {
    texto: "Su presencia es nuestro mejor regalo. Si además desean hacernos un obsequio, pueden colaborar con nuestra luna de miel ✈️",
    cuentas: [
      { titular: "Sofía Pérez", banco: "Banco Nación", alias: "SOFI.MARTIN.BODA", cbu: "0110000000000000000000" }
    ],
    listaUrl: ""   // Link a una lista de regalos (opcional)
  },

  /* ---------- 11. FOTOS DE LOS INVITADOS ---------- */
  // Creá una carpeta compartida en Google Drive o un álbum de Google Fotos con permiso para "agregar"
  // y pegá el link acá. Los invitados podrán subir sus fotos de la fiesta.
  fotosInvitados: {
    texto: "¡Queremos ver la fiesta desde tus ojos! Subí tus fotos y videos del casamiento a nuestro álbum compartido.",
    url: ""
  },

  /* ---------- 12. ALOJAMIENTO (opcional, para invitados de otras ciudades) ---------- */
  alojamiento: [
    // { nombre: "Hotel Ejemplo", texto: "A 5 cuadras del salón. Mencioná la boda para un descuento.", url: "https://..." }
  ],

  /* ---------- 13. PREGUNTAS FRECUENTES ---------- */
  preguntas: [
    { p: "¿Puedo llevar a mis hijos?", r: "Amamos a sus peques, pero la fiesta será solo para adultos. ¡Gracias por entender!" },
    { p: "¿Hay estacionamiento?", r: "Sí, el salón cuenta con estacionamiento gratuito." },
    { p: "¿Hasta cuándo puedo confirmar?", r: "Hasta el 20 de febrero de 2027. Necesitamos saberlo para organizar las mesas." },
    { p: "Tengo una dieta especial, ¿qué hago?", r: "Avisanos en el formulario de confirmación y nos ocupamos." }
  ],

  /* ---------- 14. CONTACTO ---------- */
  contactos: [
    { nombre: "Sofía", whatsapp: "5491100000000" },
    { nombre: "Martín", whatsapp: "5491100000000" }
  ]
};
