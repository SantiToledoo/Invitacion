/* =====================================================================
   Lógica de la invitación. No hace falta tocar este archivo:
   todo se configura en config.js
   ===================================================================== */
(function () {
  "use strict";
  var B = window.BODA || {};
  var $ = function (id) { return document.getElementById(id); };

  function esc(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function ocultarSeccion(id) {
    var el = $(id); if (el) el.classList.add("oculto");
    var link = document.querySelector('.menu-inferior a[href="#' + id + '"]');
    if (link) link.classList.add("oculto");
  }
  function aviso(msg) {
    var a = $("aviso");
    a.textContent = msg;
    a.classList.add("visible");
    clearTimeout(aviso._t);
    aviso._t = setTimeout(function () { a.classList.remove("visible"); }, 2600);
  }
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

  /* ---------- Invitado personalizado (desde el link) ---------- */
  var params = new URLSearchParams(location.search);
  var invitado = (params.get("invitado") || params.get("i") || "").trim().slice(0, 80);
  var lugaresParam = parseInt(params.get("lugares") || params.get("l"), 10);
  var conf = B.confirmacion || {};
  var maxLugares = lugaresParam > 0 ? Math.min(lugaresParam, 30) : (conf.lugaresPorDefecto || 2);
  var claveRsvp = "rsvp:" + (invitado || "general");

  /* ---------- Textos básicos ---------- */
  var nombres = (B.novio1 || "") + " & " + (B.novio2 || "");
  document.title = "¡Nos casamos! " + nombres;
  $("sello").textContent = B.iniciales || "♥";
  $("sobre-nombres").textContent = nombres;
  if (invitado) $("sobre-para").textContent = "Querido/a " + invitado + ", tenés una invitación especial";
  $("titulo-nombres").innerHTML = esc(B.novio1) + "<br>&amp;<br>" + esc(B.novio2);
  $("fecha-texto").textContent = B.fechaTexto || "";
  $("pie-nombres").textContent = nombres;
  $("pie-fecha").textContent = B.fechaTexto || "";
  $("frase").textContent = B.frase || "";
  if (B.fotoPortada) $("portada-foto").style.backgroundImage = "url('" + encodeURI(B.fotoPortada) + "')";
  if (invitado) {
    var s = $("saludo-invitado");
    s.textContent = "✨ Invitación para: " + invitado;
    s.classList.remove("oculto");
  }

  /* ---------- Sobre de bienvenida ---------- */
  var sobre = $("sobre");
  document.body.classList.add("bloqueado");
  function abrirSobre() {
    sobre.classList.add("abierto");
    document.body.classList.remove("bloqueado");
    setTimeout(function () { sobre.remove(); }, 900);
    if (B.musica) reproducir();
  }
  sobre.addEventListener("click", abrirSobre);
  sobre.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); abrirSobre(); } });

  /* ---------- Música ---------- */
  var audio = $("audio"), btnM = $("btn-musica");
  function reproducir() {
    audio.play().then(function () { btnM.classList.add("sonando"); btnM.textContent = "🎵"; })
      .catch(function () { btnM.classList.remove("sonando"); btnM.textContent = "🔇"; });
  }
  if (B.musica) {
    audio.src = B.musica;
    btnM.classList.remove("oculto");
    btnM.addEventListener("click", function () {
      if (audio.paused) reproducir();
      else { audio.pause(); btnM.classList.remove("sonando"); btnM.textContent = "🔇"; }
    });
  }

  /* ---------- Cuenta regresiva ---------- */
  var fechaBoda = new Date(B.fecha);
  function tick() {
    var d = fechaBoda - new Date();
    if (isNaN(d)) return;
    if (d <= 0) {
      $("cuenta").innerHTML = '<p class="destacado-texto" style="grid-column:1/-1">¡Llegó el gran día! 🎉</p>';
      clearInterval(timer);
      return;
    }
    $("c-dias").textContent = Math.floor(d / 864e5);
    $("c-horas").textContent = Math.floor(d / 36e5) % 24;
    $("c-min").textContent = Math.floor(d / 6e4) % 60;
    $("c-seg").textContent = Math.floor(d / 1e3) % 60;
  }
  var timer = setInterval(tick, 1000); tick();

  /* ---------- Agendar en calendario ---------- */
  (function () {
    if (isNaN(fechaBoda)) return;
    var fin = new Date(fechaBoda.getTime() + 10 * 36e5);
    var fmt = function (d) { return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); };
    var lugar = (B.eventos && B.eventos[0]) ? B.eventos[0].lugar + ", " + B.eventos[0].direccion : "";
    var titulo = "Casamiento de " + nombres;
    var g = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(titulo) +
      "&dates=" + fmt(fechaBoda) + "/" + fmt(fin) + "&location=" + encodeURIComponent(lugar) +
      "&details=" + encodeURIComponent(location.origin + location.pathname);
    var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Invitacion//ES", "BEGIN:VEVENT",
      "UID:" + fmt(fechaBoda) + "@invitacion", "DTSTAMP:" + fmt(new Date()), "DTSTART:" + fmt(fechaBoda), "DTEND:" + fmt(fin),
      "SUMMARY:" + titulo, "LOCATION:" + lugar.replace(/,/g, "\\,"),
      "BEGIN:VALARM", "TRIGGER:-P1D", "ACTION:DISPLAY", "DESCRIPTION:Mañana es el casamiento", "END:VALARM",
      "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    var icsUrl = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    $("botones-calendario").innerHTML =
      '<a class="boton" target="_blank" rel="noopener" href="' + esc(g) + '">📅 Agendar en Google</a>' +
      '<a class="boton secundario" download="casamiento.ics" href="' + icsUrl + '">📆 Agendar en iPhone / otro</a>';
  })();

  /* ---------- Historia ---------- */
  if (B.historia && B.historia.length) {
    $("lista-historia").innerHTML = B.historia.map(function (h) {
      return '<article class="hito aparecer">' + (h.foto ? '<img loading="lazy" src="' + esc(h.foto) + '" alt="' + esc(h.titulo) + '">' : "") +
        '<div><span class="anio">' + esc(h.fecha) + '</span><h3>' + esc(h.titulo) + '</h3><p>' + esc(h.texto) + '</p></div></article>';
    }).join("");
  } else ocultarSeccion("historia");

  /* ---------- Eventos / lugares ---------- */
  if (B.eventos && B.eventos.length) {
    $("lista-eventos").innerHTML = B.eventos.map(function (ev) {
      var q = encodeURIComponent(ev.lugar + ", " + ev.direccion);
      return '<article class="tarjeta aparecer"><div class="tarjeta-cuerpo">' +
        '<p class="icono-grande">' + esc(ev.icono || "📍") + '</p><h3>' + esc(ev.titulo) + '</h3>' +
        '<p class="hora">' + esc(ev.hora) + '</p><p><b>' + esc(ev.lugar) + '</b></p>' +
        '<p class="direccion">' + esc(ev.direccion) + '</p>' +
        '<a class="boton boton-ancho" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=' + q + '">🚗 Cómo llegar</a>' +
        '</div><iframe loading="lazy" title="Mapa ' + esc(ev.titulo) + '" src="https://www.google.com/maps?q=' + q + '&output=embed"></iframe></article>';
    }).join("");
  } else ocultarSeccion("lugar");

  /* ---------- Cronograma ---------- */
  if (B.cronograma && B.cronograma.length) {
    $("lista-cronograma").innerHTML = B.cronograma.map(function (c) {
      return '<li class="aparecer"><span class="c-icono">' + esc(c.icono) + '</span><span class="c-hora">' + esc(c.hora) + '</span><span>' + esc(c.texto) + '</span></li>';
    }).join("");
  } else ocultarSeccion("cronograma");

  /* ---------- Vestimenta ---------- */
  if (B.vestimenta && B.vestimenta.titulo) {
    $("vestimenta-titulo").textContent = B.vestimenta.titulo;
    $("vestimenta-texto").textContent = B.vestimenta.texto || "";
    $("vestimenta-colores").innerHTML = (B.vestimenta.colores || []).map(function (c) {
      return '<span style="background:' + esc(c) + '"></span>';
    }).join("");
  } else ocultarSeccion("vestimenta");

  /* ---------- Galería + visor ---------- */
  var fotos = B.galeria || [], actual = 0;
  if (fotos.length) {
    $("grilla-fotos").innerHTML = fotos.map(function (f, i) {
      return '<button class="aparecer" data-i="' + i + '" aria-label="Ver foto ' + (i + 1) + '"><img loading="lazy" src="' + esc(f) + '" alt="Foto ' + (i + 1) + '"></button>';
    }).join("");
    $("grilla-fotos").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (b) abrirVisor(+b.dataset.i);
    });
  } else ocultarSeccion("galeria");
  function abrirVisor(i) {
    actual = (i + fotos.length) % fotos.length;
    $("visor-img").src = fotos[actual];
    $("visor").classList.remove("oculto");
    document.body.classList.add("bloqueado");
  }
  function cerrarVisor() { $("visor").classList.add("oculto"); document.body.classList.remove("bloqueado"); }
  $("visor-cerrar").onclick = cerrarVisor;
  $("visor-ant").onclick = function () { abrirVisor(actual - 1); };
  $("visor-sig").onclick = function () { abrirVisor(actual + 1); };
  $("visor").addEventListener("click", function (e) { if (e.target.id === "visor") cerrarVisor(); });
  document.addEventListener("keydown", function (e) {
    if ($("visor").classList.contains("oculto")) return;
    if (e.key === "Escape") cerrarVisor();
    if (e.key === "ArrowLeft") abrirVisor(actual - 1);
    if (e.key === "ArrowRight") abrirVisor(actual + 1);
  });
  var tx = null;
  $("visor").addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  $("visor").addEventListener("touchend", function (e) {
    if (tx === null) return;
    var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 50) abrirVisor(actual + (dx < 0 ? 1 : -1));
  });

  /* ---------- Videos ---------- */
  function idYoutube(url) {
    var m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : null;
  }
  if (B.videos && B.videos.length) {
    $("lista-videos").innerHTML = B.videos.map(function (v) {
      var inner = "";
      if (v.youtube && idYoutube(v.youtube)) {
        inner = '<iframe loading="lazy" title="' + esc(v.titulo || "Video") + '" src="https://www.youtube-nocookie.com/embed/' + idYoutube(v.youtube) +
          '" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      } else if (v.archivo) {
        inner = '<video controls playsinline preload="metadata" src="' + esc(v.archivo) + '"></video>';
      }
      return '<div class="aparecer">' + (v.titulo ? '<h3>' + esc(v.titulo) + '</h3>' : "") + '<div class="video-caja">' + inner + '</div></div>';
    }).join("");
  } else ocultarSeccion("videos");

  /* ---------- Regalos ---------- */
  var R = B.regalos || {};
  if (R.texto || (R.cuentas && R.cuentas.length) || R.listaUrl) {
    $("regalos-texto").textContent = R.texto || "";
    if (R.cuentas && R.cuentas.length) {
      $("cuentas").innerHTML = R.cuentas.map(function (c) {
        var fila = function (et, val, copiable) {
          if (!val) return "";
          return '<div class="dato"><div><b>' + et + '</b><code>' + esc(val) + '</code></div>' +
            (copiable ? '<button class="btn-copiar" data-copiar="' + esc(val) + '">📋 Copiar</button>' : "") + '</div>';
        };
        return '<div class="cuenta-banco">' + fila("Titular", c.titular) + fila("Banco", c.banco) + fila("Alias", c.alias, true) + fila("CBU / CVU", c.cbu, true) + '</div>';
      }).join("");
      $("btn-ver-cuentas").onclick = function () {
        var c = $("cuentas"); c.classList.toggle("oculto");
        this.textContent = c.classList.contains("oculto") ? "Ver datos bancarios" : "Ocultar datos bancarios";
      };
    } else $("btn-ver-cuentas").classList.add("oculto");
    if (R.listaUrl) $("regalos-lista").innerHTML = '<p><a class="boton secundario" target="_blank" rel="noopener" href="' + esc(R.listaUrl) + '">🛍️ Ver lista de regalos</a></p>';
  } else ocultarSeccion("regalos");

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-copiar]"); if (!b) return;
    var t = b.getAttribute("data-copiar");
    var ok = function () { aviso("✅ ¡Copiado! Ya lo podés pegar"); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(t).then(ok, function () { copiarViejo(t); ok(); });
    else { copiarViejo(t); ok(); }
  });
  function copiarViejo(t) {
    var ta = document.createElement("textarea"); ta.value = t; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} ta.remove();
  }

  /* ---------- Fotos de invitados ---------- */
  var FI = B.fotosInvitados || {};
  $("hashtag").textContent = B.hashtag || "";
  if (FI.url || B.hashtag) {
    $("fotos-invitados-texto").textContent = FI.texto || "";
    if (FI.url) $("btn-subir-fotos").href = FI.url; else $("btn-subir-fotos").classList.add("oculto");
  } else ocultarSeccion("fotos-invitados");

  /* ---------- Alojamiento ---------- */
  if (B.alojamiento && B.alojamiento.length) {
    $("lista-alojamiento").innerHTML = B.alojamiento.map(function (a) {
      return '<article class="tarjeta aparecer"><div class="tarjeta-cuerpo"><p class="icono-grande">🏨</p><h3>' + esc(a.nombre) + '</h3><p>' + esc(a.texto) + '</p>' +
        (a.url ? '<a class="boton" target="_blank" rel="noopener" href="' + esc(a.url) + '">Ver más</a>' : "") + '</div></article>';
    }).join("");
  } else ocultarSeccion("alojamiento");

  /* ---------- Preguntas ---------- */
  if (B.preguntas && B.preguntas.length) {
    $("lista-preguntas").innerHTML = B.preguntas.map(function (q) {
      return '<details class="aparecer"><summary>' + esc(q.p) + '</summary><p>' + esc(q.r) + '</p></details>';
    }).join("");
  } else ocultarSeccion("preguntas");

  /* ---------- Contacto ---------- */
  if (B.contactos && B.contactos.length) {
    $("lista-contactos").innerHTML = B.contactos.map(function (c) {
      return '<a class="boton" target="_blank" rel="noopener" href="https://wa.me/' + esc(String(c.whatsapp).replace(/\D/g, "")) + '">💬 ' + esc(c.nombre) + '</a>';
    }).join("");
  } else ocultarSeccion("contacto");

  /* =====================================================================
     CONFIRMACIÓN DE ASISTENCIA
     ===================================================================== */
  var form = $("form-rsvp"), cantidad = 1;
  if (conf.fechaLimite) $("texto-limite").innerHTML = "Por favor, confirmá antes del <b>" + esc(conf.fechaLimite) + "</b>";
  if (invitado) {
    $("f-nombre").value = invitado;
    var li = $("lugares-info");
    li.innerHTML = "🎟️ Reservamos <b>" + maxLugares + (maxLugares === 1 ? " lugar" : " lugares") + "</b> para vos";
    li.classList.remove("oculto");
  }
  if (!conf.preguntarComida) $("bloque-comida").classList.add("oculto");
  if (!conf.preguntarCancion) $("bloque-cancion").classList.add("oculto");

  function pintarCantidad() {
    $("cantidad").textContent = cantidad;
    $("menos").disabled = cantidad <= 1;
    $("mas").disabled = cantidad >= maxLugares;
    $("ayuda-lugares").textContent = "Podés confirmar hasta " + maxLugares + (maxLugares === 1 ? " persona." : " personas.");
  }
  $("menos").onclick = function () { if (cantidad > 1) { cantidad--; pintarCantidad(); } };
  $("mas").onclick = function () { if (cantidad < maxLugares) { cantidad++; pintarCantidad(); } };
  cantidad = maxLugares; pintarCantidad();

  form.addEventListener("change", function (e) {
    if (e.target.name === "asiste") $("bloque-asiste").classList.toggle("oculto", e.target.value !== "Sí");
  });

  function mostrarConfirmado(d) {
    var box = $("ya-confirmado");
    var si = d.asiste === "Sí";
    box.innerHTML = '<p class="icono-grande">' + (si ? "🥳" : "💌") + '</p>' +
      '<h3>' + (si ? "¡Gracias, " + esc(d.nombre) + "! Te esperamos" : "¡Gracias por avisarnos, " + esc(d.nombre) + "!") + '</h3>' +
      (si ? '<p>Confirmaste <b>' + d.personas + (d.personas == 1 ? " lugar" : " lugares") + '</b>.</p>' : '<p>Te vamos a extrañar.</p>') +
      '<button class="boton secundario" id="btn-cambiar">✏️ Cambiar mi respuesta</button>';
    box.classList.remove("oculto");
    form.classList.add("oculto");
    $("btn-cambiar").onclick = function () {
      lsDel(claveRsvp);
      box.classList.add("oculto");
      form.classList.remove("oculto");
    };
  }
  var previo = lsGet(claveRsvp);
  if (previo) { try { mostrarConfirmado(JSON.parse(previo)); } catch (e) {} }

  function enviarPorWhatsapp(d) {
    var txt = "¡Hola! Soy *" + d.nombre + "*.\n" +
      (d.asiste === "Sí"
        ? "✅ Confirmo asistencia al casamiento de " + nombres + ".\n👥 Personas: " + d.personas +
          (d.acompanantes ? "\n🧑‍🤝‍🧑 Acompañantes: " + d.acompanantes : "") +
          (d.comida ? "\n🍽️ Comida: " + d.comida : "") +
          (d.cancion ? "\n🎶 Canción: " + d.cancion : "")
        : "❌ Lamentablemente no voy a poder ir al casamiento de " + nombres + ".") +
      (d.mensaje ? "\n💌 " + d.mensaje : "");
    window.open("https://wa.me/" + String(conf.whatsapp || "").replace(/\D/g, "") + "?text=" + encodeURIComponent(txt), "_blank");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var err = $("error-form");
    var fd = new FormData(form);
    var nombre = (fd.get("nombre") || "").trim();
    var asiste = fd.get("asiste");
    if (!nombre) { err.textContent = "👆 Por favor, escribí tu nombre."; err.classList.remove("oculto"); $("f-nombre").focus(); return; }
    if (!asiste) { err.textContent = "👆 Por favor, tocá si venís o no."; err.classList.remove("oculto"); return; }
    err.classList.add("oculto");

    var comida = fd.getAll("comida");
    if ((fd.get("comidaOtra") || "").trim()) comida.push(fd.get("comidaOtra").trim());
    var si = asiste === "Sí";
    var d = {
      fecha: new Date().toLocaleString("es-AR"),
      invitacion: invitado || "(link general)",
      lugaresReservados: maxLugares,
      nombre: nombre,
      asiste: asiste,
      personas: si ? cantidad : 0,
      acompanantes: si ? (fd.get("acompanantes") || "").trim() : "",
      comida: si ? comida.join(", ") : "",
      cancion: si ? (fd.get("cancion") || "").trim() : "",
      mensaje: (fd.get("mensaje") || "").trim()
    };

    var btn = $("btn-enviar");
    var terminar = function () {
      lsSet(claveRsvp, JSON.stringify(d));
      mostrarConfirmado(d);
      $("confirmar").scrollIntoView({ behavior: "smooth" });
      if (si) lanzarConfeti();
    };

    if (conf.urlPlanilla) {
      btn.disabled = true; btn.textContent = "⏳ Enviando...";
      fetch(conf.urlPlanilla, { method: "POST", mode: "no-cors", body: new URLSearchParams(d) })
        .then(function () { aviso("✅ ¡Confirmación enviada!"); terminar(); })
        .catch(function () {
          aviso("Sin conexión: te abrimos WhatsApp para enviarla");
          enviarPorWhatsapp(d); terminar();
        })
        .then(function () { btn.disabled = false; btn.textContent = "✅ Enviar confirmación"; });
    } else {
      enviarPorWhatsapp(d); terminar();
    }
  });

  /* ---------- Confeti ---------- */
  function lanzarConfeti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var c = document.createElement("canvas");
    c.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:400";
    c.width = innerWidth; c.height = innerHeight; document.body.appendChild(c);
    var ctx = c.getContext("2d"), cols = ["#7b1e2e", "#e8a6b4", "#9a9597", "#ffffff", "#1c1a1b"], ps = [];
    for (var i = 0; i < 140; i++) ps.push({ x: Math.random() * c.width, y: -20 - Math.random() * c.height * .5, r: 4 + Math.random() * 6, vy: 2 + Math.random() * 3, vx: -1 + Math.random() * 2, a: Math.random() * 6, col: cols[i % cols.length] });
    var t0 = Date.now();
    (function loop() {
      ctx.clearRect(0, 0, c.width, c.height);
      ps.forEach(function (p) { p.y += p.vy; p.x += p.vx + Math.sin(p.a += .05); ctx.fillStyle = p.col; ctx.fillRect(p.x, p.y, p.r, p.r * .6); });
      if (Date.now() - t0 < 3500) requestAnimationFrame(loop); else c.remove();
    })();
  }

  /* ---------- Animación al hacer scroll ---------- */
  var els = document.querySelectorAll(".aparecer");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
    }, { threshold: .12 });
    els.forEach(function (el) { io.observe(el); });
  } else els.forEach(function (el) { el.classList.add("visible"); });
})();
