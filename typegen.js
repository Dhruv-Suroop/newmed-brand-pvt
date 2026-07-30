/* NewMed Skills — Type + Arrow generator.
   Type a headline (press Enter for a forced line break), click a word to start
   the arrow highlight and another to set where it ends. The run is wrapped in
   THE ARROW — rounded start cap on the left end, pointed cap on the right —
   reusing the locked-geometry engine (window.NMArrow). Export as PNG or SVG. */
(function () {
  'use strict';

  var root = document.getElementById('typegen');
  if (!root) return;

  function slice(x) { return Array.prototype.slice.call(x); }

  var input    = root.querySelector('.tg-input');
  var stage    = root.querySelector('.tg-stage');
  var hint     = root.querySelector('.tg-hint');
  var fillBtns = slice(root.querySelectorAll('[data-fill]'));

  var TEXTON = { sunset: 'cream', coral: 'cream', amber: 'ink', ink: 'cream', maroon: 'cream' };
  var HEX = { cream: '#f4f1ea', ink: '#391e1a', amber: '#ff9d00', coral: '#ff5122', maroon: '#7c3134' };

  var tokens = [], count = 0, wtext = [];
  var selStart = -1, selEnd = -1, anchor = -1, hasRange = false, fill = 'sunset';

  // parse the textarea into word / line-break tokens ------------------
  function parse(str) {
    tokens = []; wtext = []; var wi = 0;
    str.split('\n').forEach(function (line, li) {
      if (li > 0) tokens.push({ br: true });
      line.trim().split(/\s+/).filter(Boolean).forEach(function (w) {
        tokens.push({ s: w, i: wi }); wtext[wi] = w; wi++;
      });
    });
    count = wi;
  }

  function word(i, s) {
    var el = document.createElement('span');
    el.className = 'tg-word';
    el.setAttribute('data-i', i);
    el.textContent = s;
    return el;
  }

  function setHint() {
    if (selStart < 0) { hint.textContent = 'Click a word to start the arrow.'; return; }
    if (!hasRange)    { hint.textContent = 'Click another word to set where the arrow ends — or the same word for one.'; return; }
    var n = selEnd - selStart + 1;
    hint.textContent = n < 2
      ? 'Tip: highlight two or more words — the arrow phrase carries the movement.'
      : 'The arrow marks “' + wtext.slice(selStart, selEnd + 1).join(' ') + '”.';
  }

  function render() {
    stage.textContent = '';
    var hl = null, k = 0;
    while (k < tokens.length) {
      var tk = tokens[k];
      if (tk.br) { stage.appendChild(document.createElement('br')); k++; continue; }
      if (tk.i === selStart && selStart >= 0) {
        hl = document.createElement('span');
        hl.className = 'tg-hl';
        hl.setAttribute('data-arw', fill);
        hl.style.setProperty('--tgtext', 'var(--' + (TEXTON[fill] || 'cream') + ')');
        var first = true, m = k;
        for (; m < tokens.length; m++) {
          var t2 = tokens[m];
          if (t2.br) continue;                 // breaks inside a run are dropped — the arrow stays one line
          if (t2.i > selEnd) break;
          if (!first) hl.appendChild(document.createTextNode(' '));
          hl.appendChild(word(t2.i, t2.s)); first = false;
          if (t2.i === selEnd) { m++; break; }
        }
        stage.appendChild(hl);
        stage.appendChild(document.createTextNode(' '));
        k = m;
      } else {
        stage.appendChild(word(tk.i, tk.s));
        stage.appendChild(document.createTextNode(' '));
        k++;
      }
    }
    if (hl && window.NMArrow) window.NMArrow.paint(hl);
    setHint();
  }

  function selectWord(i) {
    if (selStart < 0 || hasRange) { anchor = i; selStart = i; selEnd = i; hasRange = false; }
    else { selStart = Math.min(anchor, i); selEnd = Math.max(anchor, i); hasRange = true; }
    render();
  }

  function rebuild(keepSel) {
    var prev = count; parse(input.value);
    if (!keepSel || selStart >= count || selEnd >= count || count !== prev) {
      if (count >= 2) { selStart = count - 2; selEnd = count - 1; }
      else if (count === 1) { selStart = selEnd = 0; }
      else { selStart = selEnd = -1; }
      anchor = selStart; hasRange = true;
    }
    render();
  }

  // ---- export -------------------------------------------------------
  var _mctx = null;
  function measureCtx() { if (!_mctx) _mctx = document.createElement('canvas').getContext('2d'); return _mctx; }

  function collect() {
    var hl = stage.querySelector('.tg-hl');
    var els = slice(stage.querySelectorAll('.tg-word'));
    if (!els.length) return null;
    var minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
    var boxes = els.map(function (el) {
      var r = el.getBoundingClientRect(), cs = getComputedStyle(el);
      minX = Math.min(minX, r.left); minY = Math.min(minY, r.top);
      maxX = Math.max(maxX, r.right); maxY = Math.max(maxY, r.bottom);
      return { el: el, r: r, cs: cs, inHl: !!(hl && hl.contains(el)) };
    });
    var hlBox = null;
    if (hl) {
      var hr = hl.getBoundingClientRect();
      minX = Math.min(minX, hr.left); minY = Math.min(minY, hr.top);
      maxX = Math.max(maxX, hr.right); maxY = Math.max(maxY, hr.bottom);
      hlBox = { r: hr, W: hl.offsetWidth, H: hl.offsetHeight };
    }
    var pad = Math.round((maxY - minY) * 0.14) + 10;
    minX -= pad; minY -= pad; maxX += pad; maxY += pad;
    return { boxes: boxes, hlBox: hlBox, ox: minX, oy: minY, w: maxX - minX, h: maxY - minY };
  }

  function download(blob, name) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function exportPNG(targetW) {
    var c = collect(); if (!c) return;
    var S = (targetW || 2600) / c.w;
    var cnv = document.createElement('canvas');
    cnv.width = Math.round(c.w * S); cnv.height = Math.round(c.h * S);
    var ctx = cnv.getContext('2d');
    if (c.hlBox) {
      ctx.save();
      ctx.translate((c.hlBox.r.left - c.ox) * S, (c.hlBox.r.top - c.oy) * S); ctx.scale(S, S);
      var p = new Path2D(window.NMArrow.pathD(c.hlBox.W, c.hlBox.H, false));
      if (fill === 'sunset') {
        var g = ctx.createLinearGradient(0, 0, c.hlBox.W, 0);
        g.addColorStop(0, HEX.amber); g.addColorStop(1, HEX.coral); ctx.fillStyle = g;
      } else { ctx.fillStyle = HEX[fill] || HEX.coral; }
      ctx.fill(p); ctx.restore();
    }
    c.boxes.forEach(function (b) {
      var fs = parseFloat(b.cs.fontSize), lh = parseFloat(b.cs.lineHeight) || fs;
      ctx.font = b.cs.fontWeight + ' ' + (fs * S) + 'px "Mona Sans", sans-serif';
      try { ctx.letterSpacing = (fs * S * -0.02) + 'px'; } catch (e) {}
      ctx.textBaseline = 'top';
      ctx.fillStyle = b.inHl ? HEX[TEXTON[fill] || 'cream'] : HEX.ink;
      ctx.fillText(b.el.textContent, (b.r.left - c.ox) * S, (b.r.top - c.oy + (lh - fs) / 2) * S);
    });
    cnv.toBlob(function (bl) { download(bl, 'newmed-headline.png'); }, 'image/png');
  }

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function r2(n) { return Math.round(n * 100) / 100; }

  function exportSVG() {
    var c = collect(); if (!c) return;
    var out = ['<svg xmlns="http://www.w3.org/2000/svg" width="' + Math.round(c.w) +
      '" height="' + Math.round(c.h) + '" viewBox="0 0 ' + r2(c.w) + ' ' + r2(c.h) + '">'];
    out.push('<defs><linearGradient id="nmag" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0" stop-color="' + HEX.amber + '"/><stop offset="1" stop-color="' + HEX.coral + '"/></linearGradient></defs>');
    if (c.hlBox) {
      var f = fill === 'sunset' ? 'url(#nmag)' : (HEX[fill] || HEX.coral);
      out.push('<path transform="translate(' + r2(c.hlBox.r.left - c.ox) + ',' + r2(c.hlBox.r.top - c.oy) + ')" d="' +
        window.NMArrow.pathD(c.hlBox.W, c.hlBox.H, false) + '" fill="' + f + '"/>');
    }
    var mc = measureCtx();
    c.boxes.forEach(function (b) {
      var fs = parseFloat(b.cs.fontSize), lh = parseFloat(b.cs.lineHeight) || fs;
      mc.font = b.cs.fontWeight + ' ' + fs + 'px "Mona Sans", sans-serif';
      var asc = mc.measureText(b.el.textContent).actualBoundingBoxAscent || fs * 0.78;
      var y = (b.r.top - c.oy) + (lh - fs) / 2 + asc;
      var col = b.inHl ? HEX[TEXTON[fill] || 'cream'] : HEX.ink;
      out.push('<text x="' + r2(b.r.left - c.ox) + '" y="' + r2(y) + '" font-family="Mona Sans, sans-serif" ' +
        'font-weight="' + b.cs.fontWeight + '" font-size="' + fs + '" letter-spacing="' + r2(fs * -0.02) +
        '" fill="' + col + '">' + esc(b.el.textContent) + '</text>');
    });
    out.push('</svg>');
    download(new Blob([out.join('')], { type: 'image/svg+xml' }), 'newmed-headline.svg');
  }

  // events ------------------------------------------------------------
  stage.addEventListener('click', function (e) {
    var el = e.target.closest('[data-i]');
    if (el) selectWord(parseInt(el.getAttribute('data-i'), 10));
  });

  input.addEventListener('input', function () { rebuild(true); });

  fillBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      fill = b.getAttribute('data-fill');
      fillBtns.forEach(function (x) { x.classList.toggle('is-on', x === b); });
      render();
    });
  });

  root.querySelectorAll('[data-example]').forEach(function (b) {
    b.addEventListener('click', function () { input.value = b.getAttribute('data-example'); rebuild(false); });
  });

  root.querySelectorAll('[data-export]').forEach(function (b) {
    b.addEventListener('click', function () {
      var lbl = b.textContent;
      b.textContent = 'Saving…';
      try { (b.getAttribute('data-export') === 'svg') ? exportSVG() : exportPNG(2600); } catch (e) {}
      setTimeout(function () { b.textContent = lbl; }, 1400);
    });
  });

  document.addEventListener('nm:repaint', function () { if (stage.offsetWidth > 4) render(); });
  window.addEventListener('resize', function () { clearTimeout(root.__t); root.__t = setTimeout(render, 140); });

  fillBtns.forEach(function (x) { x.classList.toggle('is-on', x.getAttribute('data-fill') === fill); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(render);
  rebuild(false);
})();
