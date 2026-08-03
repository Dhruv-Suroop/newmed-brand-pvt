/* NewMed Skills — data visualisation generator.
   Type one item per line, pick a form, export. The preview is built from
   the same components the manual documents (.arw-stack, .arw-row and the
   comparative bars), so whatever you export is on-system by construction.

   Export is WYSIWYG: geometry is read back off the rendered preview and
   re-emitted through window.NMArrow.pathD, so the file always matches
   what is on screen rather than being laid out a second time. */
(function () {
  'use strict';

  var root = document.getElementById('datagen');
  if (!root) return;

  var q = function (s) { return root.querySelector(s); };
  var qa = function (s) { return Array.prototype.slice.call(root.querySelectorAll(s)); };

  var input   = q('[data-dg="input"]');
  var stage   = q('[data-dg="stage"]');
  var hint    = q('[data-dg="hint"]');
  var sizeIn  = q('[data-dg="size"]');
  var sizeVal = q('[data-dg="size-val"]');

  // Palette order is deliberate: orange leads, teal appears only from the
  // fourth series on — it is the most sparing colour in the system.
  var SEQ = [
    { key: 'orange',   hex: '#ff5122', on: '#f4f1ea' },
    { key: 'maroon',   hex: '#7c3134', on: '#f4f1ea' },
    { key: 'yellow',   hex: '#ff9d00', on: '#391e1a' },
    { key: 'teal',     hex: '#93cccd', on: '#391e1a' },
    { key: 'offwhite', hex: '#efe9e0', on: '#391e1a' },
    { key: 'ink',      hex: '#391e1a', on: '#f4f1ea' }
  ];

  var type = 'bars', colourMode = 'palette', size = 62;

  /* ---- parse: "Label 45", "Label, 45", "Label: 45" ---------------- */
  function parse(txt) {
    return txt.split('\n').map(function (raw) {
      var line = raw.trim();
      if (!line) return null;
      var m = line.match(/^(.*?)[\s,:]+(-?[\d.]+)\s*%?$/);
      if (!m) return null;
      var v = parseFloat(m[2]);
      if (!isFinite(v) || v < 0) return null;
      return { label: m[1].trim(), value: v };
    }).filter(Boolean);
  }

  function colourAt(i) {
    return colourMode === 'single' ? SEQ[0] : SEQ[i % SEQ.length];
  }

  function el(tag, cls, css) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (css) e.setAttribute('style', css);
    return e;
  }
  function txtNode(str, cls, css) {
    var e = el('span', cls, css);
    e.setAttribute('data-dg-text', '');
    e.textContent = str;
    return e;
  }
  function arw(fillKey, css, opts) {
    var e = el('span', null, css);
    e.setAttribute('data-arw', fillKey);
    e.setAttribute('data-dg-arw', '');
    if (opts && opts.notch) e.setAttribute('data-notch', '');
    if (opts && opts.outline) { e.setAttribute('data-outline', ''); e.setAttribute('data-sw', '2'); }
    return e;
  }

  /* ---- the three forms -------------------------------------------- */
  function renderBars(rows) {
    var max = Math.max.apply(null, rows.map(function (r) { return r.value; })) || 1;
    var wrap = el('div', null, 'display:flex;flex-direction:column;gap:' + Math.round(size * 0.34) + 'px;width:100%');
    rows.forEach(function (r, i) {
      var c = colourAt(i);
      var row = el('div', null, 'width:100%');
      row.appendChild(txtNode(r.label, null,
        'display:block;font-size:14px;font-weight:600;color:#391e1a;margin-bottom:6px'));
      var line = el('div', null, 'display:flex;align-items:center;gap:12px');
      var pct = Math.max(r.value / max, 0.001) * 100;
      line.appendChild(arw(c.key, 'width:' + pct.toFixed(2) + '%;height:' + size * 0.52 + 'px;flex:none'));
      line.appendChild(txtNode(fmt(r.value), null,
        'font-size:' + Math.round(size * 0.32) + 'px;font-weight:600;color:#391e1a'));
      row.appendChild(line);
      wrap.appendChild(row);
    });
    return wrap;
  }

  function renderShares(rows) {
    var total = rows.reduce(function (a, r) { return a + r.value; }, 0) || 1;
    var box = el('div', null, 'width:100%');
    var bar = el('div', 'arw-stack', '--seg-h:' + size + 'px');
    rows.forEach(function (r, i) {
      var pct = r.value / total * 100;
      bar.appendChild(arw(colourAt(i).key, 'width:' + pct.toFixed(3) + '%', { notch: i > 0 }));
    });
    box.appendChild(bar);
    var key = el('div', 'arw-key');
    rows.forEach(function (r, i) {
      var d = el('div');
      var sw = el('i', null, 'background:' + colourAt(i).hex);
      d.appendChild(sw);
      d.appendChild(txtNode(r.label + ' ', null, ''));
      var b = el('b'); b.setAttribute('data-dg-text', '');
      b.textContent = Math.round(r.value / total * 1000) / 10 + '%';
      d.appendChild(b);
      key.appendChild(d);
    });
    box.appendChild(key);
    return box;
  }

  function renderRow(rows) {
    var wrap = el('div', 'arw-row', '--row-h:' + size + 'px');
    rows.forEach(function (r, i) {
      var item = el('div', 'ar-item', 'flex-grow:' + Math.max(r.value, 0.0001));
      var bar = arw(colourAt(i).key, '');
      bar.className = 'ar-bar';
      item.appendChild(bar);
      var lbl = el('span', 'ar-lbl');
      var b = el('b'); b.setAttribute('data-dg-text', '');
      b.textContent = fmt(r.value);
      lbl.appendChild(b);
      lbl.appendChild(txtNode(r.label, null, ''));
      item.appendChild(lbl);
      wrap.appendChild(item);
    });
    return wrap;
  }

  function fmt(v) {
    return (Math.round(v * 100) / 100).toString();
  }

  /* ---- render ------------------------------------------------------ */
  function render() {
    var rows = parse(input.value);
    stage.innerHTML = '';
    if (!rows.length) {
      hint.textContent = 'Add one item per line, e.g. "United Kingdom 45".';
      return;
    }
    if (rows.length > 8) rows = rows.slice(0, 8);
    stage.appendChild(
      type === 'shares' ? renderShares(rows) :
      type === 'row'    ? renderRow(rows)    : renderBars(rows));

    // arrows need a layout pass before the engine can measure them
    requestAnimationFrame(function () {
      qa('[data-dg-arw]').forEach(function (e) { window.NMArrow.paint(e); });
      hint.textContent = rows.length + (rows.length === 1 ? ' item' : ' items') +
        ' · ' + (type === 'shares' ? 'shares of one whole'
               : type === 'row'    ? 'magnitude per category'
               : 'comparative bars');
    });
  }

  /* ---- collect rendered geometry so exports match the preview ------ */
  var measure = document.createElement('canvas').getContext('2d');

  function collect() {
    var sr = stage.getBoundingClientRect();
    var pad = 4;
    var arrows = [], texts = [];
    qa('[data-dg-arw]').forEach(function (e) {
      var p = e.querySelector('svg.arw-bg path');
      if (!p) return;
      var r = e.getBoundingClientRect();
      arrows.push({
        x: r.left - sr.left + pad, y: r.top - sr.top + pad, w: r.width, h: r.height,
        notch: e.hasAttribute('data-notch'),
        outline: e.hasAttribute('data-outline'),
        colour: p.getAttribute('fill') !== 'none' ? p.getAttribute('fill') : p.getAttribute('stroke'),
        sw: parseFloat(p.getAttribute('stroke-width') || 2)
      });
    });
    qa('[data-dg-text]').forEach(function (e) {
      var t = (e.textContent || '').trim();
      if (!t) return;
      var r = e.getBoundingClientRect();
      var cs = getComputedStyle(e);
      var fs = parseFloat(cs.fontSize);
      measure.font = cs.fontWeight + ' ' + fs + 'px "Mona Sans", Arial, sans-serif';
      var m = measure.measureText(t);
      var asc = (m.actualBoundingBoxAscent && isFinite(m.actualBoundingBoxAscent))
        ? m.actualBoundingBoxAscent : fs * 0.72;
      texts.push({
        x: r.left - sr.left + pad,
        baseline: r.top - sr.top + pad + (r.height - fs) / 2 + asc,
        txt: t, size: fs, weight: cs.fontWeight, colour: cs.color
      });
    });
    // legend swatches are plain rounded rects, not arrows
    var chips = [];
    qa('.arw-key i').forEach(function (e) {
      var r = e.getBoundingClientRect();
      chips.push({ x: r.left - sr.left + pad, y: r.top - sr.top + pad,
                   w: r.width, h: r.height, colour: getComputedStyle(e).backgroundColor });
    });
    return { w: Math.ceil(sr.width) + pad * 2, h: Math.ceil(sr.height) + pad * 2,
             arrows: arrows, texts: texts, chips: chips };
  }

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function buildSVG(d) {
    var o = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + d.w + ' ' + d.h +
             '" width="' + d.w + '" height="' + d.h + '">'];
    o.push('<rect width="' + d.w + '" height="' + d.h + '" fill="#f4f1ea"/>');
    d.arrows.forEach(function (a) {
      var path = window.NMArrow.pathD(a.w, a.h, a.notch);
      o.push('<g transform="translate(' + a.x.toFixed(2) + ',' + a.y.toFixed(2) + ')">' +
        '<path d="' + path + '" ' +
        (a.outline
          ? 'fill="none" stroke="' + a.colour + '" stroke-width="' + a.sw + '" stroke-linejoin="round"'
          : 'fill="' + a.colour + '"') + '/></g>');
    });
    d.chips.forEach(function (c) {
      o.push('<rect x="' + c.x.toFixed(2) + '" y="' + c.y.toFixed(2) + '" width="' + c.w.toFixed(2) +
             '" height="' + c.h.toFixed(2) + '" rx="4" fill="' + c.colour + '"/>');
    });
    d.texts.forEach(function (t) {
      o.push('<text x="' + t.x.toFixed(2) + '" y="' + t.baseline.toFixed(2) + '" fill="' + t.colour +
             '" font-family="Mona Sans, Arial, sans-serif" font-size="' + t.size +
             '" font-weight="' + t.weight + '">' + esc(t.txt) + '</text>');
    });
    o.push('</svg>');
    return o.join('');
  }

  function download(blob, name) {
    var u = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = u; a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(u); a.remove(); }, 400);
  }

  function exportSVG() {
    download(new Blob([buildSVG(collect())], { type: 'image/svg+xml' }), 'newmed-chart.svg');
  }

  // PNG is drawn straight onto a canvas rather than rasterising the SVG,
  // so Mona Sans renders from the page instead of needing to be embedded.
  function exportPNG(scale) {
    var d = collect();
    var s = scale || Math.min(3, Math.max(2, 2400 / d.w));
    var cnv = document.createElement('canvas');
    cnv.width = Math.round(d.w * s); cnv.height = Math.round(d.h * s);
    var c = cnv.getContext('2d');
    c.scale(s, s);
    c.fillStyle = '#f4f1ea'; c.fillRect(0, 0, d.w, d.h);
    d.arrows.forEach(function (a) {
      c.save(); c.translate(a.x, a.y);
      var p = new Path2D(window.NMArrow.pathD(a.w, a.h, a.notch));
      if (a.outline) { c.strokeStyle = a.colour; c.lineWidth = a.sw; c.lineJoin = 'round'; c.stroke(p); }
      else { c.fillStyle = a.colour; c.fill(p); }
      c.restore();
    });
    d.chips.forEach(function (ch) {
      c.fillStyle = ch.colour;
      if (c.roundRect) { c.beginPath(); c.roundRect(ch.x, ch.y, ch.w, ch.h, 4); c.fill(); }
      else c.fillRect(ch.x, ch.y, ch.w, ch.h);
    });
    d.texts.forEach(function (t) {
      c.fillStyle = t.colour;
      c.font = t.weight + ' ' + t.size + 'px "Mona Sans", Arial, sans-serif';
      c.textBaseline = 'alphabetic';
      c.fillText(t.txt, t.x, t.baseline);
    });
    cnv.toBlob(function (b) { download(b, 'newmed-chart.png'); }, 'image/png');
  }

  /* ---- wiring ------------------------------------------------------ */
  input.addEventListener('input', render);

  qa('[data-dg-type]').forEach(function (b) {
    b.addEventListener('click', function () {
      type = b.getAttribute('data-dg-type');
      qa('[data-dg-type]').forEach(function (x) { x.classList.toggle('is-on', x === b); });
      render();
    });
  });
  qa('[data-dg-colour]').forEach(function (b) {
    b.addEventListener('click', function () {
      colourMode = b.getAttribute('data-dg-colour');
      qa('[data-dg-colour]').forEach(function (x) { x.classList.toggle('is-on', x === b); });
      render();
    });
  });
  if (sizeIn) sizeIn.addEventListener('input', function () {
    size = parseInt(this.value, 10);
    if (sizeVal) sizeVal.textContent = size + 'px';
    render();
  });
  qa('[data-dg-export]').forEach(function (b) {
    b.addEventListener('click', function () {
      var lbl = b.textContent; b.textContent = 'Saving…';
      var done = function () { setTimeout(function () { b.textContent = lbl; }, 1200); };
      try { b.getAttribute('data-dg-export') === 'svg' ? exportSVG() : exportPNG(); } catch (e) {}
      done();
    });
  });

  qa('[data-dg-sample]').forEach(function (b) {
    b.addEventListener('click', function () {
      input.value = b.getAttribute('data-dg-sample');
      render();
    });
  });

  window.addEventListener('resize', function () {
    clearTimeout(root.__t); root.__t = setTimeout(render, 150);
  });
  document.addEventListener('nm:repaint', function () {
    if (stage.offsetWidth > 4) render();
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(render);
  render();
})();
