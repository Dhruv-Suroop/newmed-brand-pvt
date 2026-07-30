/* NewMed Skills — business card generator.
   Uses the supplied artwork verbatim (assets/graphics/card-front.svg +
   card-back.svg) so the design matches exactly. The front is fixed brand; on
   the back the real <text> nodes (First Name / DESIGNATION / Email / Phone)
   are bound to the inputs. Export = print-ready PDF (3.5x2in, front then back).
   The HQ address is part of the back artwork. */
(function () {
  'use strict';

  var root = document.getElementById('cardgen');
  if (!root) return;

  var DIR = 'assets/graphics/';
  var fields = ['name', 'designation', 'email', 'phone'];
  var inputs = {};
  fields.forEach(function (f) { inputs[f] = root.querySelector('[data-f="' + f + '"]'); });
  var frontWrap = root.querySelector('.bc-front-wrap');
  var backWrap = root.querySelector('.bc-back-wrap');
  var hint = root.querySelector('.sig-hint');

  var frontSVG = '', backSVG = '', fontCSS = null, bind = {};

  // strip width/height so the artwork scales to the wrapper (viewBox stays)
  function prep(s) {
    return s.replace(/(<svg\b[^>]*?)\s(?:width|height)="[^"]*"/g, '$1')
            .replace(/(<svg\b[^>]*?)\s(?:width|height)="[^"]*"/g, '$1');
  }
  function fit(svgEl) { svgEl.style.width = '100%'; svgEl.style.height = '100%'; svgEl.style.display = 'block'; }
  // render text in the page's Mona Sans (the SVG names per-weight families that aren't loaded)
  function fonts(svgEl) {
    Array.prototype.slice.call(svgEl.querySelectorAll('text')).forEach(function (t) {
      t.style.fontFamily = "'Mona Sans', Arial, sans-serif";
    });
  }

  function injectFront() {
    frontWrap.innerHTML = prep(frontSVG);
    var el = frontWrap.querySelector('svg'); if (el) { fit(el); fonts(el); }
  }

  function injectBack() {
    backWrap.innerHTML = prep(backSVG);
    var el = backWrap.querySelector('svg'); if (!el) return;
    fit(el); fonts(el);
    bind = {};
    Array.prototype.slice.call(el.querySelectorAll('text')).forEach(function (t) {
      var c = (t.textContent || '').trim();
      if (c === 'First Name') { bind.name = t; t.style.fontWeight = '700'; }
      else if (c === 'DESIGNATION') { bind.designation = t; t.style.fontWeight = '600'; }
      else if (c === 'Email ID') { bind.email = t; t.style.fontWeight = '400'; }
      else if (/^\+?\d/.test(c)) { bind.phone = t; t.style.fontWeight = '400'; }
    });
    updateBack();
  }

  function setText(t, val) { if (!t) return; var sp = t.querySelector('tspan'); (sp || t).textContent = val; }
  function updateBack() {
    setText(bind.name, (inputs.name.value || 'First Name'));
    setText(bind.designation, (inputs.designation.value || 'Designation').toUpperCase());
    setText(bind.email, (inputs.email.value || 'Email ID'));
    setText(bind.phone, (inputs.phone.value || '+91 9741671149'));
  }
  fields.forEach(function (f) { if (inputs[f]) inputs[f].addEventListener('input', updateBack); });

  Promise.all([
    fetch(DIR + 'card-front.svg').then(function (r) { return r.text(); }),
    fetch(DIR + 'card-back.svg').then(function (r) { return r.text(); })
  ]).then(function (res) {
    frontSVG = res[0]; backSVG = res[1];
    injectFront(); injectBack();
  }).catch(function () { if (hint) hint.textContent = 'Could not load the card artwork.'; });

  // embed Mona Sans so the printed PDF matches the preview exactly
  function loadFont() {
    if (fontCSS !== null) return Promise.resolve(fontCSS);
    return fetch('assets/fonts/mona-sans-var.woff2').then(function (r) { return r.arrayBuffer(); }).then(function (buf) {
      var bin = '', b = new Uint8Array(buf), i;
      for (i = 0; i < b.length; i++) bin += String.fromCharCode(b[i]);
      fontCSS = "@font-face{font-family:'Mona Sans';font-weight:200 900;src:url(data:font/woff2;base64," + btoa(bin) + ") format('woff2');}";
      return fontCSS;
    }).catch(function () { fontCSS = ''; return ''; });
  }

  root.querySelector('[data-pdf]').addEventListener('click', function () {
    if (!frontWrap.querySelector('svg')) return;
    loadFont().then(function (fcss) {
      var w = window.open('', '_blank');
      if (!w) { if (hint) hint.textContent = 'Allow pop-ups, then click Save as PDF again.'; return; }
      w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>NewMed business card</title><style>' +
        '@page{size:3.5in 2in;margin:0}html,body{margin:0;padding:0}' + (fcss || '') +
        '.card{width:3.5in;height:2in;overflow:hidden;page-break-after:always;}' +
        '.card:last-child{page-break-after:auto}.card svg{width:100%;height:100%;display:block;}' +
        '</style></head><body>' +
        '<div class="card">' + frontWrap.innerHTML + '</div>' +
        '<div class="card">' + backWrap.innerHTML + '</div>' +
        '<scr' + 'ipt>window.onload=function(){setTimeout(function(){window.print();},350);};</scr' + 'ipt>' +
        '</body></html>');
      w.document.close();
      if (hint) { hint.textContent = 'Opened the print dialog — choose “Save as PDF”, 3.5 × 2 in, margins none.'; setTimeout(function () { hint.textContent = ''; }, 4000); }
    });
  });
})();
