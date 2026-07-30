/* NewMed Skills — business card generator.
   Reproduces the supplied two-artboard design:
   FRONT  = coral, cream logo + rule + tagline, website centred at the foot.
   BACK   = linen, a white arrow band holding the name + designation with the
            coral symbol at its point, then email/phone and address in two
            columns. Staff fill the back; export a print-ready PDF (3.5x2in). */
(function () {
  'use strict';

  var root = document.getElementById('cardgen');
  if (!root) return;

  var BASE = 'https://dhruv-suroop.github.io/newmed-brand/assets/logos';
  var LOGO_CREAM = BASE + '/svg/stack-cream.svg';
  var SYMBOL = BASE + '/png/symbol-colour.png';

  var CARD_CSS =
    '.bcard{position:relative;overflow:hidden;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;}' +
    '.bcard *{box-sizing:border-box;}' +
    /* front */
    '.bcard-front{background:#ff5122;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.4em;}' +
    '.bc-lock{display:flex;align-items:center;gap:1.1em;}' +
    '.bc-flogo{height:3em;display:block;}' +
    '.bc-rule{width:1.5px;height:3.2em;background:#f4f1ea;opacity:.85;}' +
    '.bc-tagline{color:#f4f1ea;font-weight:bold;font-size:1em;line-height:1.18;max-width:8.6em;}' +
    '.bc-web{position:absolute;left:0;right:0;bottom:1.3em;text-align:center;color:#f4f1ea;font-size:.92em;}' +
    /* back */
    '.bcard-back{background:#f4f1ea;}' +
    '.bc-band{position:absolute;top:1.5em;left:0;width:80%;height:2.7em;background:#fff;' +
      'display:flex;flex-direction:column;justify-content:center;padding-left:2.1em;' +
      'clip-path:polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%);}' +
    '.bc-name2{color:#7c3134;font-weight:bold;font-size:1.55em;line-height:1;}' +
    '.bc-desig{color:#ff5122;font-weight:bold;font-size:.72em;letter-spacing:.09em;margin-top:.25em;}' +
    '.bc-symbol{position:absolute;top:1.5em;right:1.4em;height:2.7em;}' +
    '.bc-cols{position:absolute;left:2.1em;right:1.5em;bottom:1.5em;display:flex;justify-content:space-between;gap:1.4em;}' +
    '.bc-col{color:#391e1a;font-size:.85em;line-height:1.45;max-width:9.5em;}';

  var st = document.createElement('style'); st.textContent = CARD_CSS; document.head.appendChild(st);

  var fields = ['name', 'designation', 'email', 'phone', 'address'];
  var inputs = {};
  fields.forEach(function (f) { inputs[f] = root.querySelector('[data-f="' + f + '"]'); });
  var front = root.querySelector('.bc-front-wrap');
  var back = root.querySelector('.bc-back-wrap');

  function esc(s) { return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function vals() { var v = {}; fields.forEach(function (f) { v[f] = inputs[f] ? inputs[f].value : ''; }); return v; }

  function innerFront() {
    return '<div class="bc-lock">' +
        '<img class="bc-flogo" src="' + LOGO_CREAM + '" alt="NewMed Skills">' +
        '<span class="bc-rule"></span>' +
        '<div class="bc-tagline">Building Workforce-Ready Healthcare Talent.</div>' +
      '</div>' +
      '<div class="bc-web">newmedskills.com</div>';
  }

  function innerBack(v) {
    var name = esc((v.name || '').trim()) || 'First Name';
    var desig = esc((v.designation || '').trim()).toUpperCase() || 'DESIGNATION';
    var left = [];
    if ((v.email || '').trim()) left.push(esc(v.email.trim()));
    if ((v.phone || '').trim()) left.push(esc(v.phone.trim()));
    var addr = esc((v.address || '').trim()).replace(/\n/g, '<br>');
    return '<div class="bc-band"><div class="bc-name2">' + name + '</div>' +
        '<div class="bc-desig">' + desig + '</div></div>' +
      '<img class="bc-symbol" src="' + SYMBOL + '" alt="">' +
      '<div class="bc-cols"><div class="bc-col">' + left.join('<br>') + '</div>' +
        '<div class="bc-col">' + addr + '</div></div>';
  }

  function render() { var v = vals(); front.innerHTML = innerFront(); back.innerHTML = innerBack(v); }
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
      '<div class="bcard bcard-front">' + innerFront() + '</div>' +
      '<div class="bcard bcard-back">' + innerBack(v) + '</div>' +
      '<scr' + 'ipt>window.onload=function(){setTimeout(function(){window.print();},300);};</scr' + 'ipt>' +
      '</body></html>');
    w.document.close();
    if (hint) { hint.textContent = 'Opened the print dialog — choose “Save as PDF”, size 3.5 × 2 in, margins none.'; setTimeout(function () { hint.textContent = ''; }, 4000); }
  });

  render();
})();
