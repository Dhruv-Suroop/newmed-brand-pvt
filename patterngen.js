/* NewMed Skills — arrow pattern builder.

   Model: rows of arrows, each arrow a flex-grow weight. Every row spans the
   full canvas width, so a row is always "100%" however many arrows it holds
   and whatever their weights — nothing can drift out of alignment.

   Interaction notes, since these are the decisions that make or break it:
   - Resizing borrows from the IMMEDIATE right neighbour (the splitter model),
     not proportionally from the whole row. Proportional redistribution moves
     every arrow on a small drag and you can never land anything. The last
     arrow in a row borrows leftward instead.
   - Adding an arrow SPLITS the last one in half rather than squeezing the
     row, so everything already placed stays where it was put.
   - Delete sits at the arrow's centre and resize on its tip. Putting both on
     the right edge makes them fight under the cursor.
   - Arrows clamp to a minimum width. Below roughly 0.8x the row height the
     point and both corner radii stop resolving and the shape reads as a
     lozenge, not an arrow. `+` disables once a row is full. */
(function () {
  'use strict';

  var root = document.getElementById('patgen');
  if (!root) return;

  var q  = function (s) { return root.querySelector(s); };
  var qa = function (s) { return Array.prototype.slice.call(root.querySelectorAll(s)); };

  var stage = q('[data-pg="stage"]');
  var hint  = q('[data-pg="hint"]');
  if (!stage) return;

  var SEQ = ['orange', 'yellow', 'maroon', 'teal', 'green', 'blue', 'purple', 'pink'];
  var HEX = { orange:'#ff5122', yellow:'#ff9d00', maroon:'#7c3134', teal:'#93cccd',
              green:'#8cce84', blue:'#6f78c9', purple:'#bd7fcc', pink:'#d6699d',
              cream:'#f4f1ea', offwhite:'#efe9e0', ink:'#391e1a' };

  var POINT = 0.426;                 // point length as a share of height
  var MIN_FACTOR = 0.85;             // min arrow width, as a share of row height

  var rows = [[{ w: 1, c: 'orange', o: 1 }]];
  var sel = null;                    // {r, i}
  var rowH = 74;
  var undoStack = [];

  function snapshot() {
    undoStack.push(JSON.stringify(rows));
    if (undoStack.length > 60) undoStack.shift();
  }
  function undo() {
    if (!undoStack.length) return;
    rows = JSON.parse(undoStack.pop());
    sel = null; render();
  }

  function rowTotal(r) {
    return rows[r].reduce(function (a, b) { return a + b.w; }, 0);
  }
  // How many arrows a row can hold before they stop reading as arrows.
  function maxPerRow() {
    var w = stage.clientWidth || 800;
    return Math.max(1, Math.floor(w / (rowH * MIN_FACTOR)));
  }

  /* ---- mutations ---------------------------------------------------- */
  function addArrow(r) {
    if (rows[r].length >= maxPerRow()) return;
    snapshot();
    var last = rows[r][rows[r].length - 1];
    last.w = last.w / 2;                                  // split, don't squeeze
    rows[r].push({ w: last.w, c: last.c, o: last.o });
    render();
  }
  function addRow() {
    snapshot();
    var src = rows[rows.length - 1][0];
    rows.push([{ w: 1, c: src ? src.c : 'orange', o: src ? src.o : 1 }]);
    render();
  }
  function delArrow(r, i) {
    snapshot();
    if (rows[r].length === 1) {                           // last one takes the row
      if (rows.length === 1) { undoStack.pop(); return; } // never empty the canvas
      rows.splice(r, 1);
    } else {
      var freed = rows[r][i].w;
      rows[r].splice(i, 1);
      var take = rows[r][i] || rows[r][i - 1];            // give width to a neighbour
      take.w += freed;
    }
    sel = null; render();
  }

  /* ---- render ------------------------------------------------------- */
  function render() {
    stage.textContent = '';
    stage.style.setProperty('--pg-h', rowH + 'px');

    rows.forEach(function (row, r) {
      var line = document.createElement('div');
      line.className = 'pg-row';

      var total = rowTotal(r);
      row.forEach(function (a, i) {
        var wrap = document.createElement('span');
        wrap.className = 'pg-arw' + (sel && sel.r === r && sel.i === i ? ' is-sel' : '');
        wrap.style.flexGrow = a.w / total;
        wrap.style.opacity = a.o;
        wrap.setAttribute('data-arw', a.c);

        wrap.addEventListener('click', function (e) {
          if (e.target.closest('.pg-x, .pg-handle')) return;
          sel = { r: r, i: i }; render();
        });

        // delete — centred, so it never sits under the resize handle
        var x = document.createElement('button');
        x.className = 'pg-x'; x.type = 'button';
        x.setAttribute('aria-label', 'Remove arrow');
        x.textContent = '−';
        x.addEventListener('click', function (e) { e.stopPropagation(); delArrow(r, i); });
        wrap.appendChild(x);

        // resize — on the tip
        var h = document.createElement('span');
        h.className = 'pg-handle';
        h.addEventListener('pointerdown', function (e) { startResize(e, r, i); });
        wrap.appendChild(h);

        line.appendChild(wrap);
      });

      var plus = document.createElement('button');
      plus.className = 'pg-plus'; plus.type = 'button';
      plus.textContent = '+';
      plus.title = 'Add arrow to this row';
      if (row.length >= maxPerRow()) { plus.disabled = true; plus.title = 'Row is full'; }
      plus.addEventListener('click', function () { addArrow(r); });
      line.appendChild(plus);

      stage.appendChild(line);
    });

    var addR = document.createElement('button');
    addR.className = 'pg-plus pg-plus-row'; addR.type = 'button';
    addR.textContent = '+';
    addR.title = 'Add row';
    addR.addEventListener('click', addRow);
    stage.appendChild(addR);

    requestAnimationFrame(function () {
      qa('.pg-arw').forEach(function (e) { if (window.NMArrow) window.NMArrow.paint(e); });
      setHint();
    });
  }

  function setHint() {
    if (!hint) return;
    var n = rows.reduce(function (a, r) { return a + r.length; }, 0);
    hint.textContent = n + (n === 1 ? ' arrow' : ' arrows') + ' in ' +
      rows.length + (rows.length === 1 ? ' row' : ' rows') +
      (sel ? ' · one selected — colour and opacity apply to it'
           : ' · click an arrow to select it, drag its tip to resize');
  }

  /* ---- resize: borrow from the neighbour ---------------------------- */
  function startResize(e, r, i) {
    e.preventDefault(); e.stopPropagation();
    var line = stage.children[r];
    if (!line) return;
    var px = line.clientWidth;
    var total = rowTotal(r);
    var minW = (rowH * MIN_FACTOR) / px * total;          // min in flex units
    // last arrow has nothing to its right, so it borrows leftward
    var j = (i < rows[r].length - 1) ? i + 1 : i - 1;
    if (j < 0) return;                                    // single arrow: nothing to trade with
    var dir = (j > i) ? 1 : -1;
    var startX = e.clientX;
    var w0 = rows[r][i].w, wN = rows[r][j].w;
    snapshot();

    function move(ev) {
      var d = (ev.clientX - startX) / px * total * dir;
      d = Math.max(-(w0 - minW), Math.min(d, wN - minW));
      rows[r][i].w = w0 + d;
      rows[r][j].w = wN - d;
      var lineEl = stage.children[r];
      var t = rowTotal(r);
      rows[r].forEach(function (a, k) {
        if (lineEl.children[k]) lineEl.children[k].style.flexGrow = a.w / t;
      });
      qa('.pg-arw').forEach(function (el) { if (window.NMArrow) window.NMArrow.paint(el); });
    }
    function up() {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      render();
    }
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  /* ---- export ------------------------------------------------------- */
  function geometry() {
    var sr = stage.getBoundingClientRect();
    var out = [], minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
    qa('.pg-arw').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      out.push({ x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height,
                 c: HEX[el.getAttribute('data-arw')] || '#ff5122',
                 o: parseFloat(el.style.opacity || 1),
                 n: el.hasAttribute('data-notch') });
      minX = Math.min(minX, r.left - sr.left); minY = Math.min(minY, r.top - sr.top);
      maxX = Math.max(maxX, r.right - sr.left); maxY = Math.max(maxY, r.bottom - sr.top);
    });
    if (!out.length) return null;
    return { items: out, w: maxX - minX, h: maxY - minY, ox: minX, oy: minY };
  }

  function svgString() {
    var g = geometry(); if (!g) return '';
    var s = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' +
             g.w.toFixed(1) + ' ' + g.h.toFixed(1) + '" width="' + Math.round(g.w) +
             '" height="' + Math.round(g.h) + '">'];
    g.items.forEach(function (it) {
      var d = window.NMArrow.pathD(it.w, it.h, it.n);
      s.push('<g transform="translate(' + (it.x - g.ox).toFixed(1) + ',' +
             (it.y - g.oy).toFixed(1) + ')"><path d="' + d + '" fill="' + it.c +
             (it.o < 1 ? '" fill-opacity="' + it.o : '') + '"/></g>');
    });
    s.push('</svg>');
    return s.join('');
  }

  function download(blob, name) {
    var u = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = u; a.download = name; a.click();
    setTimeout(function () { URL.revokeObjectURL(u); }, 2000);
  }

  function exportSVG() {
    var s = svgString(); if (!s) return;
    download(new Blob([s], { type: 'image/svg+xml' }), 'newmed-pattern.svg');
  }
  function exportPNG(targetW) {
    var g = geometry(); if (!g) return;
    var S = (targetW || 2400) / g.w;
    var c = document.createElement('canvas');
    c.width = Math.round(g.w * S); c.height = Math.round(g.h * S);
    var ctx = c.getContext('2d');
    g.items.forEach(function (it) {
      ctx.save();
      ctx.translate((it.x - g.ox) * S, (it.y - g.oy) * S);
      ctx.scale(S, S);
      ctx.globalAlpha = it.o;
      ctx.fillStyle = it.c;
      ctx.fill(new Path2D(window.NMArrow.pathD(it.w, it.h, it.n)));
      ctx.restore();
    });
    c.toBlob(function (b) { download(b, 'newmed-pattern.png'); }, 'image/png');
  }

  /* ---- controls ----------------------------------------------------- */
  qa('[data-pg-colour]').forEach(function (b) {
    b.addEventListener('click', function () {
      var c = b.getAttribute('data-pg-colour');
      snapshot();
      if (sel) rows[sel.r][sel.i].c = c;
      else rows.forEach(function (r) { r.forEach(function (a) { a.c = c; }); });
      render();
    });
  });
  var op = q('[data-pg="opacity"]'), opV = q('[data-pg="opacity-val"]');
  if (op) op.addEventListener('input', function () {
    var v = parseInt(op.value, 10) / 100;
    if (opV) opV.textContent = op.value + '%';
    if (sel) rows[sel.r][sel.i].o = v;
    else rows.forEach(function (r) { r.forEach(function (a) { a.o = v; }); });
    render();
  });
  var hh = q('[data-pg="height"]'), hhV = q('[data-pg="height-val"]');
  if (hh) hh.addEventListener('input', function () {
    rowH = parseInt(hh.value, 10);
    if (hhV) hhV.textContent = rowH + 'px';
    render();
  });
  qa('[data-pg-export]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.getAttribute('data-pg-export') === 'svg') exportSVG(); else exportPNG(2400);
    });
  });
  var reset = q('[data-pg="reset"]');
  if (reset) reset.addEventListener('click', function () {
    snapshot(); rows = [[{ w: 1, c: 'orange', o: 1 }]]; sel = null; render();
  });

  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
      if (root.offsetParent) { e.preventDefault(); undo(); }
    }
    if (e.key === 'Escape' && sel) { sel = null; render(); }
  });

  window.addEventListener('resize', function () {
    clearTimeout(root.__t); root.__t = setTimeout(render, 150);
  });
  document.addEventListener('nm:repaint', function () {
    if (stage.clientWidth > 4) render();
  });

  render();
})();
