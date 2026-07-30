/* NewMed Skills — business card generator.
   Staff type their details; front + back render live and export as a
   print-ready PDF (3.5 x 2 in, one face per page) via the browser's
   Save-as-PDF. Self-contained: the card CSS is shared between the on-page
   preview and the print window, logos load from the hosted brand assets. */
(function () {
  'use strict';

  var root = document.getElementById('cardgen');
  if (!root) return;

  var BASE = 'https://dhruv-suroop.github.io/newmed-brand/assets/logos';
  var LOGO = BASE + '/png/stack-colour.png';
  var LOGO_C = BASE + '/svg/stack-cream.svg';

  // locked-geometry arrow (radius 10% of height, point 42.6%) for the accent
  function arrowPathD(W, H) {
    var s = H / 165.88, r = 16.59 * s, P = 70.59 * s, x0 = Math.max(W - P, r);
    var pt = 'c ' + (7.82 * s) + ' 0 ' + (15.19 * s) + ' ' + (3.68 * s) + ' ' + (19.89 * s) + ' ' + (9.93 * s) +
      ' l ' + (47.37 * s) + ' ' + (63.04 * s) +
      ' c ' + (4.44 * s) + ' ' + (5.9 * s) + ' ' + (4.44 * s) + ' ' + (14.03 * s) + ' 0 ' + (19.93 * s) +
      ' l ' + (-47.37 * s) + ' ' + (63.04 * s) +
      ' c ' + (-4.7 * s) + ' ' + (6.25 * s) + ' ' + (-12.07 * s) + ' ' + (9.93 * s) + ' ' + (-19.89 * s) + ' ' + (9.93 * s);
    return 'M ' + r + ' 0 H ' + x0 + ' ' + pt + ' H ' + r +
      ' c ' + (-9.16 * s) + ' 0 ' + (-16.59 * s) + ' ' + (-7.43 * s) + ' ' + (-16.59 * s) + ' ' + (-16.59 * s) +
      ' V ' + r + ' c 0 ' + (-9.16 * s) + ' ' + (7.43 * s) + ' ' + (-16.59 * s) + ' ' + (16.59 * s) + ' ' + (-16.59 * s) + ' Z';
  }
  var ACCENT = arrowPathD(100, 34);

  // visual rules in em so one template scales to the preview (px) and print (in)
  var CARD_CSS =
    '.bcard{position:relative;overflow:hidden;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;}' +
    '.bcard *{box-sizing:border-box;}' +
    '.bcard-front{background:#f4f1ea;padding:1.35em 1.6em;}' +
    '.bc-logo{height:2.5em;display:block;}' +
    '.bc-accent{position:absolute;top:1.5em;right:0;width:3.6em;height:1.22em;}' +
    '.bc-info{position:absolute;left:1.6em;right:1.2em;bottom:1.35em;}' +
    '.bc-name{font-size:1.5em;font-weight:bold;color:#391e1a;line-height:1;}' +
    '.bc-name .cr{color:#7c3134;font-weight:normal;font-size:.72em;}' +
    '.bc-title{font-size:1em;color:#7c3134;margin-top:.35em;}' +
    '.bc-contact{font-size:.82em;color:#391e1a;margin-top:.95em;line-height:1.55;}' +
    '.bc-contact a{color:#ff5122;text-decoration:none;}' +
    '.bcard-back{background:#ff5122;display:flex;flex-direction:column;align-items:center;justify-content:center;}' +
    '.bc-logo-c{height:3em;}' +
    '.bc-tag{font-size:.92em;color:#f4f1ea;margin-top:1.15em;}';

  var st = document.createElement('style'); st.textContent = CARD_CSS; document.head.appendChild(st);

  var fields = ['name', 'creds', 'title', 'email', 'phone', 'website', 'tagline'];
  var inputs = {};
  fields.forEach(function (f) { inputs[f] = root.querySelector('[data-f="' + f + '"]'); });
  var front = root.querySelector('.bc-front-wrap');
  var back = root.querySelector('.bc-back-wrap');

  function esc(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function vals() { var v = {}; fields.forEach(function (f) { v[f] = inputs[f] ? inputs[f].value.trim() : ''; }); return v; }

  function innerFront(v) {
    var name = esc(v.name) || 'Your Name';
    var creds = v.creds ? ' <span class="cr">' + esc(v.creds) + '</span>' : '';
    var lines = [];
    if (v.email) lines.push('<a href="mailto:' + esc(v.email) + '">' + esc(v.email) + '</a>');
    if (v.phone) lines.push(esc(v.phone));
    if (v.website) lines.push(esc(v.website));
    return '<img class="bc-logo" src="' + LOGO + '" alt="NewMed Skills">' +
      '<svg class="bc-accent" viewBox="0 0 100 34" preserveAspectRatio="none" aria-hidden="true"><path d="' + ACCENT + '" fill="#ff5122"/></svg>' +
      '<div class="bc-info"><div class="bc-name">' + name + creds + '</div>' +
      '<div class="bc-title">' + (esc(v.title) || 'Job title') + '</div>' +
      '<div class="bc-contact">' + lines.join('<br>') + '</div></div>';
  }
  function innerBack(v) {
    return '<img class="bc-logo-c" src="' + LOGO_C + '" alt="NewMed Skills">' +
      '<div class="bc-tag">' + (esc(v.tagline) || 'From first assessment to first shift.') + '</div>';
  }

  function render() { var v = vals(); front.innerHTML = innerFront(v); back.innerHTML = innerBack(v); }
  fields.forEach(function (f) { if (inputs[f]) inputs[f].addEventListener('input', render); });

  var hint = root.querySelector('.sig-hint');
  root.querySelector('[data-pdf]').addEventListener('click', function () {
    var v = vals();
    var w = window.open('', '_blank');
    if (!w) { if (hint) hint.textContent = 'Allow pop-ups, then click Save as PDF again.'; return; }
    w.document.write('<!doctype html><html><head><meta charset="utf-8"><title>NewMed business card</title><style>' +
      '@page{size:3.5in 2in;margin:0}html,body{margin:0;padding:0}' +
      '.bcard{width:3.5in;height:2in;font-size:.125in;page-break-after:always;}' +
      '.bcard:last-child{page-break-after:auto}' + CARD_CSS +
      '</style></head><body>' +
      '<div class="bcard bcard-front">' + innerFront(v) + '</div>' +
      '<div class="bcard bcard-back">' + innerBack(v) + '</div>' +
      '<scr' + 'ipt>window.onload=function(){setTimeout(function(){window.print();},300);};</scr' + 'ipt>' +
      '</body></html>');
    w.document.close();
    if (hint) { hint.textContent = 'Opened the print dialog — choose “Save as PDF”, size 3.5 × 2 in.'; setTimeout(function () { hint.textContent = ''; }, 4000); }
  });

  render();
})();
