// Botón "Pegar en Urosoft" (bookmarklet para Firefox).
// Abre un recuadro donde la doctora pega el reporte; al confirmar, lo inserta en el campo
// HALLAZGOS de la Nota Operatoria y, si ella lo elige, marca "Material enviado a patología".
// No guarda, no firma y no toca ningún otro campo.
(function () {
  var ID = '__reporte_urosoft';
  var existing = document.getElementById(ID);
  if (existing) { existing.remove(); return; }

  function norm(t) {
    return (t || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/\s+/g, ' ').trim().toUpperCase();
  }

  // Urosoft puede usar marcos (frames): se recorren todos los del mismo sitio.
  function allDocs() {
    var out = [];
    (function walk(w) {
      try { out.push(w.document); } catch (e) { return; }
      for (var i = 0; i < w.frames.length; i++) walk(w.frames[i]);
    })(window.top);
    return out;
  }

  // Elemento más interno cuyo texto es exactamente `label`.
  function findLabel(doc, label) {
    var found = null;
    var els = doc.body ? doc.body.getElementsByTagName('*') : [];
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (/^(SCRIPT|STYLE|TEXTAREA|INPUT|SELECT|OPTION)$/.test(el.tagName)) continue;
      if (box.contains(el)) continue; // nunca el propio recuadro del botón
      if (norm(el.textContent) !== label) continue;
      if (!found || found.contains(el)) found = el; // primera coincidencia, bajando al elemento más interno
    }
    return found;
  }

  function findHallazgos() {
    var docs = allDocs();
    for (var i = 0; i < docs.length; i++) {
      var byName = docs[i].querySelector('textarea[name*="hallaz" i], textarea[id*="hallaz" i]');
      if (byName) return byName;
    }
    for (var j = 0; j < docs.length; j++) {
      var label = findLabel(docs[j], 'HALLAZGOS');
      if (!label) continue;
      var tas = docs[j].querySelectorAll('textarea');
      for (var k = 0; k < tas.length; k++) {
        if (box.contains(tas[k])) continue;
        if (label.compareDocumentPosition(tas[k]) & Node.DOCUMENT_POSITION_FOLLOWING) return tas[k];
      }
    }
    return null;
  }

  // Radios SÍ/NO de "MATERIAL ENVIADO A PATOLOGIA": el ancestro más cercano que contenga dos radios.
  function findPatologia() {
    var docs = allDocs();
    for (var i = 0; i < docs.length; i++) {
      var label = findLabel(docs[i], 'MATERIAL ENVIADO A PATOLOGIA');
      if (!label) continue;
      var node = label;
      for (var up = 0; up < 6 && node; up++, node = node.parentElement) {
        var radios = node.querySelectorAll('input[type="radio"]');
        if (radios.length >= 2) {
          var si = radios[0], no = radios[1];
          for (var r = 0; r < radios.length; r++) {
            var v = norm(radios[r].value);
            if (v === 'SI' || v === 'S' || v === '1') si = radios[r];
            if (v === 'NO' || v === 'N' || v === '0') no = radios[r];
          }
          return { si: si, no: no };
        }
      }
    }
    return null;
  }

  // Quita las líneas que no van en Urosoft: Entidad, Sedación y la macro de imágenes.
  function limpiar(texto) {
    return texto.replace(/\r\n/g, '\n').split('\n').filter(function (l) {
      var n = norm(l);
      return !/^ENTIDAD\s*:/.test(n) && !/^SEDACION\s*:/.test(n) && !/^<#Q/.test(n) && !/^```/.test(l.trim());
    }).join('\n').replace(/^\n+/, '').replace(/\n+$/, '');
  }

  function sugerirPatologia(texto) {
    var m = texto.match(/^\s*Biops[ií]as?\s*:\s*(.*)$/im);
    if (!m) return '';
    return /^\s*no\b/i.test(m[1]) || /no fue posible/i.test(m[1]) ? 'no' : 'si';
  }

  function marcar(el, color) {
    el.style.outline = '3px solid ' + color;
    el.style.outlineOffset = '2px';
    el.scrollIntoView({ block: 'center' });
  }

  // ---------- recuadro ----------
  var box = document.createElement('div');
  box.id = ID;
  box.style.cssText = 'position:fixed;top:16px;right:16px;z-index:2147483647;width:440px;max-width:calc(100vw - 32px);' +
    'background:#fff;color:#222;border:2px solid #e8742a;border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,.25);' +
    'font:14px/1.4 system-ui,-apple-system,Segoe UI,sans-serif;padding:14px';
  box.innerHTML =
    '<div style="font-weight:700;margin-bottom:6px">Pegar reporte en HALLAZGOS</div>' +
    '<div style="font-size:12px;color:#555;margin-bottom:8px">Pega aquí el reporte que te dio Claude (Cmd/Ctrl + V). ' +
    'Se quitan solas las líneas Entidad, Sedación e imágenes.</div>' +
    '<textarea data-r="txt" style="width:100%;height:180px;box-sizing:border-box;font:12px/1.35 ui-monospace,Menlo,monospace;padding:6px"></textarea>' +
    '<div style="margin:8px 0 4px;font-weight:600">Material enviado a patología</div>' +
    '<label style="margin-right:12px"><input type="radio" name="__pat" value="si"> SÍ</label>' +
    '<label style="margin-right:12px"><input type="radio" name="__pat" value="no"> NO</label>' +
    '<label><input type="radio" name="__pat" value="" checked> No tocar</label>' +
    '<div data-r="msg" style="margin-top:8px;font-size:12px;min-height:1em"></div>' +
    '<div style="display:flex;gap:8px;justify-content:flex-end;margin-top:10px">' +
    '<button data-r="cancel" style="padding:6px 12px">Cerrar</button>' +
    '<button data-r="ok" style="padding:6px 12px;background:#e8742a;color:#fff;border:0;border-radius:6px;font-weight:600">Insertar</button></div>';
  document.body.appendChild(box);

  var txt = box.querySelector('[data-r="txt"]');
  var msg = box.querySelector('[data-r="msg"]');
  function aviso(t, color) { msg.textContent = t; msg.style.color = color || '#b00020'; }
  function patElegida() { var c = box.querySelector('input[name="__pat"]:checked'); return c ? c.value : ''; }

  txt.addEventListener('input', function () {
    var s = sugerirPatologia(txt.value);
    if (s) {
      box.querySelector('input[name="__pat"][value="' + s + '"]').checked = true;
      aviso('Según "Biopsias", patología: ' + (s === 'si' ? 'SÍ' : 'NO') + '. Cámbialo si no es así.', '#555');
    }
  });
  box.querySelector('[data-r="cancel"]').onclick = function () { box.remove(); };
  box.querySelector('[data-r="ok"]').onclick = function () {
    var texto = limpiar(txt.value);
    if (!texto) { aviso('Primero pega el reporte.'); return; }

    var campo = findHallazgos();
    if (!campo) { aviso('No encontré el campo HALLAZGOS. Abre la Nota Operatoria del acto quirúrgico y vuelve a intentarlo.'); return; }
    if (campo.value.trim() && !window.confirm('HALLAZGOS ya tiene texto. ¿Reemplazarlo?')) return;
    if (campo.maxLength > 0 && texto.length > campo.maxLength) {
      aviso('El reporte (' + texto.length + ' caracteres) supera el límite del campo (' + campo.maxLength + '). No se insertó.');
      return;
    }

    campo.focus();
    campo.value = texto;
    campo.dispatchEvent(new Event('input', { bubbles: true }));
    campo.dispatchEvent(new Event('change', { bubbles: true }));
    marcar(campo, '#1a7f37');

    var pat = patElegida(), extra = '';
    if (pat) {
      var radios = findPatologia();
      if (radios) { radios[pat].click(); marcar(radios[pat], '#1a7f37'); extra = ' Patología marcada: ' + (pat === 'si' ? 'SÍ' : 'NO') + '.'; }
      else extra = ' No encontré "Material enviado a patología": márcalo a mano.';
    }
    aviso('Listo: reporte pegado en HALLAZGOS.' + extra + ' Revisa, completa lo demás y guarda tú.', '#1a7f37');
  };
  txt.focus();
})();
