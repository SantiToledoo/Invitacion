/* =====================================================================
   ✏️  ARCHIVO DE CONFIGURACIÓN — ¡SOLO TENÉS QUE EDITAR ESTE ARCHIVO!
   ---------------------------------------------------------------------
   - Cambiá los textos que están entre comillas "así".
   - Si no querés usar una sección, dejala vacía:  []  o  ""
   - Las fotos van en la carpeta /fotos y los videos en /videos.
   ===================================================================== */

window.BODA = {

  /* ---------- 1. LOS NOVIOS ---------- */
  novio1: "Santi",
  novio2: "Sol",
  iniciales: "S & S",

  // Fecha y hora de la ceremonia. Formato: AAAA-MM-DDTHH:MM:00-03:00 (-03:00 = hora Argentina)
  fecha: "2027-02-05T18:00:00-03:00",
  fechaTexto: "Viernes 5 de febrero de 2027",

  frase: "Hay momentos en la vida que son especiales por sí solos, pero compartirlos con las personas que queremos los hace inolvidables.",
  hashtag: "#SantiYSol2027",

  /* ---------- 2. FOTO DE PORTADA Y MÚSICA ---------- */
  fotoPortada: "",                            // Ej: "fotos/portada.jpg"  (vacío = fondo bordó)
  musica: "",                                 // Ej: "musica/cancion.mp3"  (vacío = sin música)

  /* ---------- 3. NUESTRA HISTORIA (opcional) ---------- */
  historia: [
    // { fecha: "2020", titulo: "Nos conocimos", texto: "...", foto: "fotos/historia1.jpg" }
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
    colores: ["#7b1e2e", "#e8a6b4", "#9a9597", "#1c1a1b"]   // paleta sugerida (opcional, dejá [] si no querés)
  },

  /* ---------- 7. GALERÍA DE FOTOS ---------- */
  // Subí tus fotos a la carpeta /fotos y escribí acá sus nombres.
  galeria: [
    // "fotos/foto1.jpg", "fotos/foto2.jpg"
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
    fechaLimite: "5 de enero de 2027",
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
      { titular: "Santi", banco: "Banco Nación", alias: "SANTI.SOL.BODA", cbu: "0110000000000000000000" }
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
    { p: "¿Hasta cuándo puedo confirmar?", r: "Hasta el 5 de enero de 2027. Necesitamos saberlo para organizar las mesas." },
    { p: "Tengo una dieta especial, ¿qué hago?", r: "Avisanos en el formulario de confirmación y nos ocupamos." }
  ],

  /* ---------- 14. CONTACTO ---------- */
  contactos: [
    { nombre: "Santi", whatsapp: "5491100000000" },
    { nombre: "Sol", whatsapp: "5491100000000" }
  ]
};
