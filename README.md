# 💍 Invitación de boda online

Invitación digital lista para publicar gratis en **GitHub Pages** y enviar por WhatsApp.
Está pensada para que **cualquier invitado la pueda usar**, aunque casi no use tecnología: letra grande, botones grandes, un menú fijo abajo y un solo botón para cada cosa.

## ¿Qué incluye?

| Sección | Para qué sirve |
|---|---|
| 💌 **Sobre animado** | Lo primero que ve el invitado: “Tocá aquí para abrir”. Si el link es personalizado, lo saluda por su nombre. |
| ⏳ **Cuenta regresiva** | Días, horas, minutos y segundos que faltan. |
| 📅 **Agendar** | Un botón para Google Calendar y otro para iPhone/Outlook (con recordatorio el día anterior). |
| ❤️ **Nuestra historia** | Línea de tiempo con fotos. |
| 📍 **Ceremonia y fiesta** | Hora, dirección, mapa y botón **“Cómo llegar”** (abre Google Maps con el recorrido). |
| 🕒 **Cronograma** | Qué pasa a cada hora. |
| 👗 **Vestimenta** | Código de vestimenta y paleta de colores sugerida. |
| ✅ **Confirmar asistencia** | Formulario simple: nombre, “Sí / No” con botones grandes, cuántas personas (botones + y −), comida especial (vegetariano, sin TACC…), canción para la fiesta y mensaje. **Respeta los lugares reservados para cada invitado.** |
| 📷 **Galería** | Fotos en grilla; al tocar se ven grandes y se pueden pasar deslizando. |
| 🎬 **Videos** | De YouTube o archivos propios. |
| 🎁 **Regalos** | Alias y CBU con botón **“Copiar”**, y link a lista de regalos. |
| 📸 **Compartí tus fotos** | Botón para que los invitados suban sus fotos a un álbum compartido + hashtag. |
| 🏨 **Alojamiento** | Hoteles recomendados (opcional). |
| ❓ **Preguntas frecuentes** | Niños, estacionamiento, dietas, etc. |
| 💬 **Contacto** | Botones de WhatsApp de los novios. |
| 🎵 **Música** | Música de fondo opcional con botón para pausar. |

Las secciones que dejes vacías en la configuración **desaparecen solas**.

---

## 1. Personalizar (un solo archivo)

Todo se cambia en **`config.js`**. Abrilo (en GitHub: tocá el archivo y luego el lápiz ✏️), cambiá los textos entre comillas y guardá con **“Commit changes”**.

### Cargar fotos
1. Entrá a la carpeta **`fotos`** en GitHub → **Add file → Upload files** → arrastrá tus fotos → **Commit changes**.
2. En `config.js`, escribí los nombres en `galeria`, `fotoPortada` o `historia`. Ejemplo:
   ```js
   galeria: ["fotos/playa.jpg", "fotos/compromiso.jpg"],
   ```
> 💡 Usá fotos de menos de **1 MB** cada una (podés achicarlas gratis en squoosh.app) para que la invitación cargue rápido en cualquier celular. Ojo con mayúsculas: `Foto.JPG` no es lo mismo que `foto.jpg`.

### Cargar videos
- **Recomendado:** subilo a YouTube (puede ser “No listado”) y pegá el link:
  `videos: [{ youtube: "https://www.youtube.com/watch?v=XXXX", titulo: "Pre-boda" }]`
- **Archivo propio:** subilo a la carpeta `videos` (máximo 100 MB por archivo, ideal menos de 50 MB, formato `.mp4`):
  `videos: [{ archivo: "videos/mi-video.mp4", titulo: "Pre-boda" }]`

### Música
Subí un `.mp3` a la carpeta `musica` y escribí `musica: "musica/cancion.mp3"`. Empieza a sonar cuando el invitado abre el sobre.

### Fotos de los invitados durante la fiesta
Creá un álbum compartido en **Google Fotos** (o una carpeta de Google Drive con permiso de “Editor” para cualquiera con el link) y pegá el link en `fotosInvitados.url`.

---

## 2. Planilla de confirmaciones (Google Sheets) — recomendado

Así cada confirmación llega sola a una planilla de Google, con una pestaña **“Resumen”** que cuenta cuántas personas vienen.

1. Entrá a **sheets.new** (crea una planilla nueva).
2. Menú **Extensiones → Apps Script**.
3. Borrá lo que aparece y pegá el contenido de **`herramientas/planilla-google.gs`**. Guardá.
4. **Implementar → Nueva implementación** → tipo **Aplicación web** →
   *Ejecutar como:* **Yo** · *Quién tiene acceso:* **Cualquier persona** → **Implementar**.
5. Aceptá los permisos (si aparece “Google no verificó esta app”: *Configuración avanzada → Ir a…*). Es tu propio script, es seguro.
6. Copiá la **URL de la aplicación web** (termina en `/exec`) y pegala en `config.js`:
   ```js
   urlPlanilla: "https://script.google.com/macros/s/XXXXXXXX/exec",
   ```

**Si no configurás la planilla**, la confirmación igual funciona: se abre WhatsApp con el mensaje ya escrito para enviarlo al número de `confirmacion.whatsapp`.

---

## 3. Publicar en GitHub Pages (gratis)

1. Subí estos archivos a la rama **`main`** de tu repositorio (o uní esta rama a `main` con un Pull Request).
2. En GitHub: **Settings → Pages → Build and deployment → Source: “GitHub Actions”**.
3. En la pestaña **Actions** vas a ver “Publicar invitación en GitHub Pages”. Cuando quede en verde ✅, la invitación está online en:
   **`https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`**
4. Cada vez que cambies algo (fotos, textos), se vuelve a publicar sola en 1–2 minutos.

> Alternativa: *Settings → Pages → Source: “Deploy from a branch” → main / (root)*. También funciona.
> El repositorio tiene que ser **público** para usar Pages gratis.

---

## 4. Enviar la invitación (links personalizados)

Abrí **`https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/crear-links.html`** (página solo para ustedes):

1. Escribí el nombre del invitado o familia (ej: “Familia García”).
2. Elegí cuántos lugares le reservás.
3. Tocá **Crear link** → **Enviar por WhatsApp**.

El invitado verá “Querida Familia García…”, “Reservamos **4 lugares** para vos” y no podrá confirmar más personas que esas.
También podés mandar el link general (sin nombre): usa la cantidad de `lugaresPorDefecto`.

Formato manual del link: `https://.../?invitado=Familia%20García&lugares=4`

---

## Cambiar colores
Al principio de **`styles.css`** están los colores (`--acento`, `--fondo`, etc.). Cambiá esos códigos y listo.

## Archivos
```
index.html             → la invitación
config.js              → ✏️ TODOS tus datos (lo único que hay que editar)
styles.css             → diseño y colores
app.js                 → funcionamiento (no hace falta tocarlo)
crear-links.html       → generador de links para invitados
fotos/  videos/  musica/
herramientas/planilla-google.gs → código para la planilla de confirmaciones
```

## Probar en tu computadora
Abrí `index.html` con doble clic, o ejecutá `python3 -m http.server` y entrá a http://localhost:8000.
