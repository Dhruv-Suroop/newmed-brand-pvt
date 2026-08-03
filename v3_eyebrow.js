/* NewMed Skills — eyebrow badge (brand manual only).
   Built from Dhruv's optically-corrected SVG, NOT from arrow.js. The
   generator keeps its own programmatic geometry; these optical tweaks
   deliberately do not flow back into it.

   The supplied artwork has its text converted to paths, so it cannot
   carry a different label. We keep the path data verbatim and stretch
   ONLY the two straight horizontal runs — every curve, corner radius
   and the point angle are untouched, so the optical correction holds at
   any label length.

   Markup: <span class="eb2" data-num="01" data-label="What we do"></span>
           add data-on="orange" when it sits on the orange band. */
(function () {
  'use strict';

  var NS = 'http://www.w3.org/2000/svg';

  // --- Dhruv's artwork, verbatim -------------------------------------
  var VB_W = 360.05, VB_H = 84.47;
  var CHIP = 'M75.61,47.43l-23.74,31.6c-1.63,2.17-4.19,3.45-6.91,3.45H5.42c-2.99,0-5.42-2.43-5.42-5.42V7.42C0,4.43,2.43,2,5.42,2h39.54c2.72,0,5.27,1.28,6.91,3.45l23.74,31.6c2.31,3.07,2.31,7.3,0,10.38Z';
  // outline arrow: only M-x and the h-run scale with the label
  function outline(d) {
    return 'M' + (356.32 + d).toFixed(2) + ',47.43l-23.74,31.6c-1.63,2.17-4.19,3.45-6.91,3.45H81.07' +
           'c-2.99,0-5.42-2.43-5.42-5.42V7.42c0-2.99,2.43-5.42,5.42-5.42h' + (244.6 + d).toFixed(2) +
           'c2.72,0,5.27,1.28,6.91,3.45l23.74,31.6c2.31,3.07,2.31,7.3,0,10.38Z';
  }

  var LABEL_X = 108.36;   // where the label starts in the original
  var TAIL    = 43.73;    // label end -> viewBox end, clears the point
  var BASE_Y  = 55.74;    // shared text baseline
  var FS      = 37;       // matches the 26.78 cap height of the artwork

  function build(el) {
    var num   = el.getAttribute('data-num')   || '';
    var label = el.getAttribute('data-label') || '';
    // On the orange band the arrows must invert or they vanish into it.
    var onOrange = el.getAttribute('data-on') === 'orange';
    var line = onOrange ? '#f4f1ea' : '#ff5122';   // Cream / NewMed Orange
    var counter = onOrange ? '#ff5122' : '#f4f1ea';

    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'eb2-svg');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('aria-hidden', 'true');

    var chip = document.createElementNS(NS, 'path');
    chip.setAttribute('d', CHIP);
    chip.setAttribute('fill', line);

    var arw = document.createElementNS(NS, 'path');
    arw.setAttribute('fill', 'none');
    arw.setAttribute('stroke', line);
    arw.setAttribute('stroke-width', '4');
    arw.setAttribute('stroke-miterlimit', '10');

    var tNum = document.createElementNS(NS, 'text');
    tNum.setAttribute('x', '30.5');
    tNum.setAttribute('y', BASE_Y);
    tNum.setAttribute('text-anchor', 'middle');
    tNum.setAttribute('fill', counter);
    tNum.setAttribute('font-size', FS);
    tNum.setAttribute('font-weight', '600');
    tNum.setAttribute('font-family', "'Mona Sans', Arial, sans-serif");
    tNum.textContent = num;

    var tLbl = document.createElementNS(NS, 'text');
    tLbl.setAttribute('x', LABEL_X);
    tLbl.setAttribute('y', BASE_Y);
    tLbl.setAttribute('fill', line);
    tLbl.setAttribute('font-size', FS);
    tLbl.setAttribute('font-weight', '500');
    tLbl.setAttribute('font-family', "'Mona Sans', Arial, sans-serif");
    tLbl.textContent = label;

    svg.appendChild(chip); svg.appendChild(arw);
    svg.appendChild(tNum); svg.appendChild(tLbl);
    el.innerHTML = '';
    el.appendChild(svg);

    // measure the real label, then size the arrow to it
    var w;
    try { w = tLbl.getComputedTextLength(); } catch (e) { w = 0; }
    if (!w) w = label.length * FS * 0.52;          // fallback if not yet laid out
    var total = LABEL_X + w + TAIL;
    arw.setAttribute('d', outline(total - VB_W));
    svg.setAttribute('viewBox', '0 0 ' + total.toFixed(2) + ' ' + VB_H);
    svg.setAttribute('width', total.toFixed(2));
    svg.setAttribute('height', VB_H);
    el.style.setProperty('--eb2-ratio', (total / VB_H).toFixed(4));
  }

  function all() {
    return Array.prototype.slice.call(document.querySelectorAll('.eb2'));
  }
  function paint() { all().forEach(build); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', paint);
  } else { paint(); }

  // Mona Sans changes the measured width once it loads; sections are also
  // display:none until navigated to, so re-measure on both.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(paint);
  document.addEventListener('nm:repaint', paint);
})();
