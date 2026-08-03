/* NewMed Skills — THE ARROW engine (locked geometry).
   Standalone so both the app and the static handoff pages can paint arrows
   without pulling in the navigation code. Exposes window.NMArrow. */
(function () {
  'use strict';

  /* ---- THE ARROW ----
     Geometry ported verbatim from the brand's master SVGs:
     corner radius = 10% of height, point length = 42.6% of height.
     Only colour may change; radius and point angle never do. */
  var ARROW_M = 165.88;

  function arrowPathD(W, H, notch) {
    var s = H / ARROW_M;
    var r = 16.59 * s, P = 70.59 * s;
    var x0 = Math.max(W - P, notch ? 6 : r);
    var pt = 'c ' + (7.82*s) + ' 0 ' + (15.19*s) + ' ' + (3.68*s) + ' ' + (19.89*s) + ' ' + (9.93*s) +
             ' l ' + (47.37*s) + ' ' + (63.04*s) +
             ' c ' + (4.44*s) + ' ' + (5.9*s) + ' ' + (4.44*s) + ' ' + (14.03*s) + ' 0 ' + (19.93*s) +
             ' l ' + (-47.37*s) + ' ' + (63.04*s) +
             ' c ' + (-4.7*s) + ' ' + (6.25*s) + ' ' + (-12.07*s) + ' ' + (9.93*s) + ' ' + (-19.89*s) + ' ' + (9.93*s);
    if (notch) {
      var nt = 'c ' + (7.82*s) + ' 0 ' + (15.19*s) + ' ' + (-3.68*s) + ' ' + (19.89*s) + ' ' + (-9.93*s) +
               ' l ' + (47.37*s) + ' ' + (-63.04*s) +
               ' c ' + (4.44*s) + ' ' + (-5.9*s) + ' ' + (4.44*s) + ' ' + (-14.03*s) + ' 0 ' + (-19.93*s) +
               ' l ' + (-47.37*s) + ' ' + (-63.04*s) +
               ' c ' + (-4.7*s) + ' ' + (-6.25*s) + ' ' + (-12.07*s) + ' ' + (-9.93*s) + ' ' + (-19.89*s) + ' ' + (-9.93*s);
      return 'M 0 0 H ' + x0 + ' ' + pt + ' H 0 ' + nt + ' Z';
    }
    return 'M ' + r + ' 0 H ' + x0 + ' ' + pt + ' H ' + r +
           ' c ' + (-9.16*s) + ' 0 ' + (-16.59*s) + ' ' + (-7.43*s) + ' ' + (-16.59*s) + ' ' + (-16.59*s) +
           ' V ' + r + ' c 0 ' + (-9.16*s) + ' ' + (7.43*s) + ' ' + (-16.59*s) + ' ' + (16.59*s) + ' ' + (-16.59*s) + ' Z';
  }

  // Portrait variant: arrow clips the bottom only; the head juts freely above.
  function arrowOpenTopD(W, H) {
    var s = H / ARROW_M, B = 4000;
    var r = 16.59 * s, P = 70.59 * s;
    var x0 = Math.max(W - P, r);
    var pt = 'c ' + (7.82*s) + ' 0 ' + (15.19*s) + ' ' + (3.68*s) + ' ' + (19.89*s) + ' ' + (9.93*s) +
             ' l ' + (47.37*s) + ' ' + (63.04*s) +
             ' c ' + (4.44*s) + ' ' + (5.9*s) + ' ' + (4.44*s) + ' ' + (14.03*s) + ' 0 ' + (19.93*s) +
             ' l ' + (-47.37*s) + ' ' + (63.04*s) +
             ' c ' + (-4.7*s) + ' ' + (6.25*s) + ' ' + (-12.07*s) + ' ' + (9.93*s) + ' ' + (-19.89*s) + ' ' + (9.93*s);
    return 'M ' + (-B) + ' ' + (-B) + ' H ' + B + ' V 0 H ' + x0 + ' ' + pt + ' H ' + r +
           ' c ' + (-9.16*s) + ' 0 ' + (-16.59*s) + ' ' + (-7.43*s) + ' ' + (-16.59*s) + ' ' + (-16.59*s) +
           ' V ' + r + ' c 0 ' + (-9.16*s) + ' ' + (7.43*s) + ' ' + (-16.59*s) + ' ' + (16.59*s) + ' ' + (-16.59*s) +
           ' H ' + (-B) + ' Z';
  }

  var NS = 'http://www.w3.org/2000/svg';
  var gseq = 0;

  function paintArrow(el) {
    var W = el.offsetWidth, H = el.offsetHeight;
    if (W < 4 || H < 4) return;
    var fill = el.getAttribute('data-arw') || 'orange';
    var notch = el.hasAttribute('data-notch');
    var outline = el.hasAttribute('data-outline');
    var old = el.querySelector(':scope > svg.arw-bg');
    if (old) old.remove();

    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'arw-bg');
    svg.setAttribute('width', W); svg.setAttribute('height', H);
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('aria-hidden', 'true');

    var f = fill;
    if (fill === 'sunset') {
      var id = 'nmarw' + (++gseq);
      var defs = document.createElementNS(NS, 'defs');
      var lg = document.createElementNS(NS, 'linearGradient');
      lg.setAttribute('id', id); lg.setAttribute('x1','0'); lg.setAttribute('y1','0');
      lg.setAttribute('x2','1'); lg.setAttribute('y2','0');
      [['0','#ff9d00'],['1','#ff5122']].forEach(function (p) {
        var st = document.createElementNS(NS, 'stop');
        st.setAttribute('offset', p[0]); st.setAttribute('stop-color', p[1]);
        lg.appendChild(st);
      });
      defs.appendChild(lg); svg.appendChild(defs);
      f = 'url(#' + id + ')';
    } else {
      var map = { orange:'#ff5122', yellow:'#ff9d00', teal:'#93cccd', maroon:'#7c3134',
                  cream:'#f4f1ea', offwhite:'#efe9e0', ink:'#391e1a',
                  // legacy aliases, kept so older markup keeps painting
                  amber:'#ff9d00', coral:'#ff5122', white:'#f4f1ea', bone:'#efe9e0' };
      f = map[fill] || fill;
    }

    var path = document.createElementNS(NS, 'path');
    path.setAttribute('d', arrowPathD(W, H, notch));
    if (outline) {
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', f);
      path.setAttribute('stroke-width', el.getAttribute('data-sw') || 2);
      path.setAttribute('stroke-linejoin', 'round');
    } else {
      path.setAttribute('fill', f);
    }
    svg.appendChild(path);
    el.insertBefore(svg, el.firstChild);
  }

  /* Portrait: an arrow occupies the lower part of the frame; the cutout is
     clipped to it on the bottom only, so head and shoulders jut freely above. */
  function paintPortrait(el) {
    var img = el.querySelector('img');
    if (!img) return;
    var W = img.offsetWidth, H = img.offsetHeight;
    if (W < 4 || H < 4) return;

    var frac = parseFloat(el.getAttribute('data-arw-portrait')) || 0.58; // arrow height as share of image
    var aH = Math.round(H * frac), aTop = H - aH;

    var shape = el.querySelector(':scope > .pa-arrow');
    if (!shape) {
      shape = document.createElement('span');
      shape.className = 'pa-arrow';
      shape.setAttribute('data-arw', el.getAttribute('data-fill') || 'orange');
      el.insertBefore(shape, el.firstChild);
    }
    shape.style.height = aH + 'px';
    paintArrow(shape);

    var id = el.getAttribute('data-clip-id');
    if (!id) { id = 'nmclip' + (++gseq); el.setAttribute('data-clip-id', id); }
    var old = el.querySelector(':scope > svg.arw-clip');
    if (old) old.remove();
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'arw-clip'); svg.setAttribute('width', '0'); svg.setAttribute('height', '0');
    var defs = document.createElementNS(NS, 'defs');
    var cp = document.createElementNS(NS, 'clipPath');
    cp.setAttribute('id', id); cp.setAttribute('clipPathUnits', 'userSpaceOnUse');
    var pth = document.createElementNS(NS, 'path');
    pth.setAttribute('d', arrowOpenTopD(W, aH));
    pth.setAttribute('transform', 'translate(0,' + aTop + ')');
    cp.appendChild(pth); defs.appendChild(cp); svg.appendChild(defs);
    el.insertBefore(svg, el.firstChild);
    img.style.clipPath = 'url(#' + id + ')';
  }

  function paintAllArrows() {
    Array.prototype.slice.call(document.querySelectorAll('[data-arw]')).forEach(paintArrow);
    Array.prototype.slice.call(document.querySelectorAll('[data-arw-portrait]')).forEach(paintPortrait);
  }

  // Expose the locked-geometry engine so other modules (e.g. the type
  // generator) reuse the exact arrow rather than re-deriving its maths.
  window.NMArrow = { paint: paintArrow, pathD: arrowPathD, paintAll: paintAllArrows };

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(paintAllArrows);
  paintAllArrows();
  window.addEventListener('resize', function () {
    clearTimeout(window.__arwT);
    window.__arwT = setTimeout(paintAllArrows, 120);
  });
  document.addEventListener('nm:repaint', paintAllArrows);
})();
