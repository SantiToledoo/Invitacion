/**
 * PLANILLA DE CONFIRMACIONES — Google Apps Script
 * ------------------------------------------------
 * 1. Creá una Planilla de Google nueva (sheets.new).
 * 2. Menú "Extensiones" > "Apps Script".
 * 3. Borrá todo lo que aparece y pegá ESTE archivo completo. Guardá (ícono de disquete).
 * 4. Botón azul "Implementar" > "Nueva implementación".
 *      - Tipo (engranaje): "Aplicación web"
 *      - Ejecutar como: "Yo"
 *      - Quién tiene acceso: "Cualquier persona"
 * 5. Autorizá los permisos (si dice "app no verificada": Configuración avanzada > Ir a ... ).
 * 6. Copiá la "URL de la aplicación web" (termina en /exec) y pegala en config.js
 *    en  confirmacion.urlPlanilla
 */

var COLUMNAS = ["fecha", "invitacion", "lugaresReservados", "nombre", "asiste", "personas",
                "acompanantes", "comida", "cancion", "mensaje"];
var TITULOS  = ["Fecha", "Invitación (link)", "Lugares reservados", "Nombre", "¿Asiste?", "Personas",
                "Acompañantes", "Comida especial", "Canción", "Mensaje"];

function hoja_() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var h = libro.getSheetByName("Confirmaciones");
  if (!h) {
    h = libro.insertSheet("Confirmaciones");
    h.appendRow(TITULOS);
    h.getRange(1, 1, 1, TITULOS.length).setFontWeight("bold").setBackground("#e8ecdc");
    h.setFrozenRows(1);
  }
  return h;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var p = (e && e.parameter) || {};
    var fila = COLUMNAS.map(function (c) { return String(p[c] || "").slice(0, 1000); });
    hoja_().appendRow(fila);
    actualizarResumen_();
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/** Crea/actualiza una pestaña "Resumen" con el total de personas confirmadas. */
function actualizarResumen_() {
  var libro = SpreadsheetApp.getActiveSpreadsheet();
  var r = libro.getSheetByName("Resumen") || libro.insertSheet("Resumen");
  r.clear();
  r.getRange("A1:B4").setValues([
    ["Personas que vienen", "=SUMIF(Confirmaciones!E:E;\"Sí\";Confirmaciones!F:F)"],
    ["Respuestas \"Sí\"", "=COUNTIF(Confirmaciones!E:E;\"Sí\")"],
    ["Respuestas \"No\"", "=COUNTIF(Confirmaciones!E:E;\"No\")"],
    ["Total de respuestas", "=COUNTA(Confirmaciones!D:D)-1"]
  ]);
  r.getRange("A1:A4").setFontWeight("bold");
}

/** Para probar que funciona: abrí la URL /exec en el navegador. */
function doGet() {
  return ContentService.createTextOutput("✅ La planilla de confirmaciones está funcionando.");
}
