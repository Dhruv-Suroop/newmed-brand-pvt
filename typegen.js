/* NewMed Skills — Type + Arrow generator.
   Type a headline (press Enter for a forced line break), click a word to start
   the arrow highlight and another to set where it ends. The run is wrapped in
   THE ARROW — rounded start cap on the left end, pointed cap on the right —
   reusing the locked-geometry engine (window.NMArrow). Export as PNG or SVG. */
(function () {
  'use strict';

  // Multi-instance: the Typography page runs a text-highlight generator and
  // the Iconography page runs an icon-chip one. Element lookups use
  // ends-with selectors so a second copy can prefix its ids and stay valid.
  var roots = Array.prototype.slice.call(document.querySelectorAll('.tgen'));
  if (!roots.length) return;
  roots.forEach(initGen);

  function initGen(root) {

  function slice(x) { return Array.prototype.slice.call(x); }

  var input    = root.querySelector('[id$="tg-input"]');
  var stage    = root.querySelector('.tg-stage');
  var hint     = root.querySelector('.tg-hint');
  var fillBtns = slice(root.querySelectorAll('[data-fill]'));

  var TEXTON = { sunset: 'cream', orange: 'cream', yellow: 'ink', coral: 'cream', amber: 'ink', ink: 'cream', maroon: 'cream' };
  var HEX = { cream: '#f4f1ea', ink: '#391e1a', orange: '#ff5122', yellow: '#ff9d00', amber: '#ff9d00', coral: '#ff5122', maroon: '#7c3134' };

  var tokens = [], count = 0, wtext = [];
  var mode = root.getAttribute('data-lock') || 'text';
  var iconInput = root.querySelector('[id$="tg-icon-input"]');
  var iconScaleInput = root.querySelector('[id$="tg-icon-scale"]');
  var iconScaleVal = root.querySelector('[id$="tg-icon-scale-val"]');
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
    var hl = null;

    if (mode === 'icon') {
      hl = document.createElement('span');
      hl.className = 'tg-hl icon-mode';
      hl.setAttribute('data-arw', fill);
      hl.style.setProperty('--tgtext', 'var(--' + (TEXTON[fill] || 'cream') + ')');
      
      var iconBox = document.createElement('span');
      iconBox.className = 'arw-icon-box';
      
      var iconWrapper = document.createElement('span');
      iconWrapper.className = 'arw-icon-svg-wrapper';
      
      var scale = iconScaleInput ? parseInt(iconScaleInput.value, 10) : 70;
      if (iconScaleVal) iconScaleVal.textContent = scale + '%';
      iconWrapper.style.width = (scale / 100) + 'em';
      iconWrapper.style.height = (scale / 100) + 'em';

      /* Optical centring. Centred in the body alone the glyph reads
         left-heavy, because the point adds mass to the right. Nudge it
         right — but only as far as the shape allows: the point tapers, so
         at the glyph's top and bottom edges the arrow is narrower than at
         its middle. Past that limit a square icon pokes out of the arrow.
         The cap depends on the scale, which is why this is not a fixed
         CSS offset. Exports read this element's rect, so they follow. */
      var sEm = scale / 100;
      var W = 1.226, P = 0.426, bodyW = W - P;      // chip geometry, in em
      var boundary = bodyW + (1 - sEm) * P;          // arrow edge at the glyph's top
      var left0 = (bodyW - sEm) / 2;                 // where centring puts it
      var shift = Math.max(0, Math.min(0.3, boundary - sEm - left0));
      iconWrapper.style.transform = 'translateX(' + shift.toFixed(4) + 'em)';
      
      var svgCode = (iconInput.value || '').trim();
      var usingDefault = !svgCode.startsWith('<svg');
      if (usingDefault) {
         // Globe, from the same Material Symbols set as the library above.
         // The old placeholder was a bare triangle, which read as a warning
         // sign rather than as "no icon chosen yet".
         svgCode = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">' +
           '<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93' +
           'c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54' +
           'c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41' +
           'c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>';
      }
      
      iconWrapper.innerHTML = svgCode;
      iconBox.appendChild(iconWrapper);
      hl.appendChild(iconBox);
      stage.appendChild(hl);
      if (window.NMArrow) window.NMArrow.paint(hl);
      hint.textContent = usingDefault
        ? 'Pick an icon from the library above, or paste your own SVG.'
        : 'Icon set. Change the fill or scale, then download.';
      return;
    }

    var k = 0;
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
  function r2(n) { return Math.round(n * 100) / 100; }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  // Exact baseline of a word straight from the browser's own layout — a
  // zero-size inline-block on the baseline. Removes all font-metric guesswork,
  // which is what made words drift up and down in the SVG.
  function baselineOf(el) {
    var s = document.createElement('span');
    s.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
    el.parentNode.insertBefore(s, el.nextSibling);
    var y = s.getBoundingClientRect().top;
    el.parentNode.removeChild(s);
    return y;
  }

  function collect() {
    var hl = stage.querySelector('.tg-hl');
    var els = slice(stage.querySelectorAll('.tg-word'));
    if (!els.length && mode !== 'icon') return null;
    var minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
    var boxes = els.map(function (el) {
      var r = el.getBoundingClientRect(), cs = getComputedStyle(el);
      minX = Math.min(minX, r.left); minY = Math.min(minY, r.top);
      maxX = Math.max(maxX, r.right); maxY = Math.max(maxY, r.bottom);
      return { el: el, r: r, cs: cs, base: baselineOf(el), inHl: !!(hl && hl.contains(el)) };
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

  function fillFor(ctx, w) {
    if (fill !== 'sunset') return HEX[fill] || HEX.coral;
    var g = ctx.createLinearGradient(0, 0, w, 0);
    g.addColorStop(0, HEX.amber); g.addColorStop(1, HEX.coral); return g;
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
      ctx.fillStyle = fillFor(ctx, c.hlBox.W);
      ctx.fill(new Path2D(window.NMArrow.pathD(c.hlBox.W, c.hlBox.H, false)));
      ctx.restore();
    }
    if (mode === 'icon') {
      var svgWrap = stage.querySelector('.arw-icon-svg-wrapper svg');
      if (svgWrap) {
        var svgStr = new XMLSerializer().serializeToString(svgWrap);
        svgStr = svgStr.replace(/currentColor/gi, HEX[TEXTON[fill] || 'cream']);
        var wrapEl = stage.querySelector('.arw-icon-svg-wrapper');
        var wr = wrapEl.getBoundingClientRect();
        var img = new Image();
        img.onload = function() {
          var iw = wr.width * S, ih = wr.height * S;
          var ix = (wr.left - c.ox) * S, iy = (wr.top - c.oy) * S;
          ctx.drawImage(img, ix, iy, iw, ih);
          cnv.toBlob(function (bl) { download(bl, 'newmed-arrow.png'); }, 'image/png');
        };
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);
        return;
      }
    } else {
      c.boxes.forEach(function (b) {
        var fs = parseFloat(b.cs.fontSize);
        ctx.font = b.cs.fontWeight + ' ' + (fs * S) + 'px "Mona Sans", sans-serif';
        try { ctx.letterSpacing = (fs * S * -0.02) + 'px'; } catch (e) {}
        ctx.textBaseline = 'alphabetic';   // pin to the measured baseline
        ctx.fillStyle = b.inHl ? HEX[TEXTON[fill] || 'cream'] : HEX.ink;
        ctx.fillText(b.el.textContent, (b.r.left - c.ox) * S, (b.base - c.oy) * S);
      });
    }
    cnv.toBlob(function (bl) { download(bl, 'newmed-headline.png'); }, 'image/png');
  }

  // embed Mona Sans so the SVG renders identically to the preview, even where
  // the viewer doesn't have the font installed
  var fontCSS = null;
  function loadFont() {
    if (fontCSS !== null) return Promise.resolve(fontCSS);
    return fetch('assets/fonts/mona-sans-var.woff2')
      .then(function (r) { return r.arrayBuffer(); })
      .then(function (buf) {
        var bin = '', bytes = new Uint8Array(buf), i;
        for (i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
        fontCSS = "@font-face{font-family:'Mona Sans';font-weight:200 900;font-style:normal;" +
          "src:url(data:font/woff2;base64," + btoa(bin) + ") format('woff2');}";
        return fontCSS;
      })
      .catch(function () { fontCSS = ''; return ''; });  // fall back to referencing by name
  }

  function exportSVG() {
    var c = collect(); if (!c) return Promise.resolve();
    return loadFont().then(function (fcss) {
      var out = ['<svg xmlns="http://www.w3.org/2000/svg" width="' + Math.round(c.w) +
        '" height="' + Math.round(c.h) + '" viewBox="0 0 ' + r2(c.w) + ' ' + r2(c.h) + '">'];
      out.push('<defs>' + (fcss ? '<style>' + fcss + '</style>' : '') +
        '<linearGradient id="nmag" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="' + HEX.amber + '"/><stop offset="1" stop-color="' + HEX.coral + '"/></linearGradient></defs>');
      if (c.hlBox) {
        var f = fill === 'sunset' ? 'url(#nmag)' : (HEX[fill] || HEX.coral);
        out.push('<path transform="translate(' + r2(c.hlBox.r.left - c.ox) + ',' + r2(c.hlBox.r.top - c.oy) + ')" d="' +
          window.NMArrow.pathD(c.hlBox.W, c.hlBox.H, false) + '" fill="' + f + '"/>');
      }
      if (mode === 'icon') {
        var wrapEl = stage.querySelector('.arw-icon-svg-wrapper');
        var svgWrap = wrapEl && wrapEl.querySelector('svg');
        if (svgWrap) {
          var svgStr = new XMLSerializer().serializeToString(svgWrap);
          // Take the icon's box straight from the rendered preview. Deriving
          // it from the scale slider meant any CSS change to the chip silently
          // desynced the export from what you were looking at.
          var wr = wrapEl.getBoundingClientRect();
          var ix = wr.left - c.ox, iy = wr.top - c.oy;
          var iw = wr.width, ih = wr.height;
          // Keep the source viewBox. Replacing the whole <svg> tag dropped it,
          // so the 24-unit paths stopped scaling to the box and the icon came
          // out tiny inside a full-size arrow.
          var vbm = svgStr.match(/viewBox="([^"]+)"/i);
          var vb = vbm ? vbm[1] : '0 0 24 24';
          var col = HEX[TEXTON[fill] || 'cream'];
          svgStr = svgStr.replace(/currentColor/gi, col);
          svgStr = svgStr.replace(/^<svg[^>]*>/i,
            '<svg viewBox="' + vb + '" x="' + r2(ix) + '" y="' + r2(iy) +
            '" width="' + r2(iw) + '" height="' + r2(ih) + '" overflow="visible">');
          out.push(svgStr);
        }
      } else {
        c.boxes.forEach(function (b) {
          var fs = parseFloat(b.cs.fontSize);
          var col = b.inHl ? HEX[TEXTON[fill] || 'cream'] : HEX.ink;
          out.push('<text x="' + r2(b.r.left - c.ox) + '" y="' + r2(b.base - c.oy) +
            '" font-family="Mona Sans, sans-serif" font-weight="' + b.cs.fontWeight +
            '" font-size="' + fs + '" letter-spacing="' + r2(fs * -0.02) +
            '" fill="' + col + '">' + esc(b.el.textContent) + '</text>');
        });
      }
      out.push('</svg>');
      download(new Blob([out.join('')], { type: 'image/svg+xml' }), mode === 'icon' ? 'newmed-arrow.svg' : 'newmed-headline.svg');
    });
  }

  // events ------------------------------------------------------------
  stage.addEventListener('click', function (e) {
    var el = e.target.closest('[data-i]');
    if (el) selectWord(parseInt(el.getAttribute('data-i'), 10));
  });

  input.addEventListener('input', function () { rebuild(true); });
  if (iconInput) iconInput.addEventListener('input', function() { render(); });
  if (iconScaleInput) iconScaleInput.addEventListener('input', function() { render(); });
  
  // Icon Library logic
  var iconSearch = root.querySelector('[id$="tg-icon-search"]');
  var iconGrid = root.querySelector('[id$="tg-icon-grid"]');
  var icons = window.MATERIAL_ICONS || [];
  
  function renderIconGrid(filter) {
    if (!iconGrid) return;
    iconGrid.innerHTML = '';
    var filtered = icons.filter(function(name) { return name.indexOf(filter) !== -1; });
    filtered.slice(0, 100).forEach(function(name) {
      var btn = document.createElement('button');
      btn.className = 'icon-grid-item';
      btn.textContent = name;
      btn.title = name;
      btn.addEventListener('click', function() {
        btn.classList.add('loading');
        fetch('https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/' + name + '/default/24px.svg')
          .then(function(res) { return res.text(); })
          .then(function(svg) {
            btn.classList.remove('loading');
            slice(iconGrid.querySelectorAll('.icon-grid-item')).forEach(function(b) { b.classList.toggle('selected', b === btn); });
            if (iconInput) {
              iconInput.value = svg;
              render();
            }
          })
          .catch(function() {
            btn.classList.remove('loading');
            alert('Failed to load SVG for ' + name);
          });
      });
      iconGrid.appendChild(btn);
    });
  }
  
  if (iconSearch) {
    iconSearch.addEventListener('input', function() { renderIconGrid(this.value.toLowerCase().trim()); });
    renderIconGrid('');
  }

  var tabs = slice(root.querySelectorAll('.tg-tab'));
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      mode = t.getAttribute('data-mode');
      tabs.forEach(function(x){ x.classList.toggle('active', x === t); });
      root.querySelector('[id$="tg-text-ui"]').style.display = (mode === 'text') ? 'block' : 'none';
      root.querySelector('[id$="tg-icon-ui"]').style.display = (mode === 'icon') ? 'block' : 'none';
      root.querySelector('.tg-examples').style.display = (mode === 'text') ? 'flex' : 'none';
      render();
    });
  });

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
      var done = function () { setTimeout(function () { b.textContent = lbl; }, 1400); };
      try {
        if (b.getAttribute('data-export') === 'svg') {
          var p = exportSVG(); (p && p.then) ? p.then(done, done) : done();
        } else { exportPNG(2600); done(); }
      } catch (e) { done(); }
    });
  });
  loadFont();   // warm the embedded-font cache

  document.addEventListener('nm:repaint', function () { if (stage.offsetWidth > 4) render(); });
  window.addEventListener('resize', function () { clearTimeout(root.__t); root.__t = setTimeout(render, 140); });

  fillBtns.forEach(function (x) { x.classList.toggle('is-on', x.getAttribute('data-fill') === fill); });

  // A locked instance shows only its own controls; the tab strip is pointless
  // when there is nothing to switch to.
  var lock = root.getAttribute('data-lock');
  if (lock) {
    var tabStrip = root.querySelector('.tg-tabs');
    if (tabStrip) tabStrip.style.display = 'none';
    var tUI = root.querySelector('[id$="tg-text-ui"]');
    var iUI = root.querySelector('[id$="tg-icon-ui"]');
    var ex  = root.querySelector('.tg-examples');
    if (tUI) tUI.style.display = (lock === 'text') ? 'block' : 'none';
    if (iUI) iUI.style.display = (lock === 'icon') ? 'block' : 'none';
    if (ex)  ex.style.display  = (lock === 'text') ? 'flex'  : 'none';
  }

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(render);
  rebuild(false);
  }
})();
