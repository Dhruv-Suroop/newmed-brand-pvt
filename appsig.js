/* NewMed Skills — email signature generator.
   Staff type their details; the signature renders live and can be copied
   straight into Gmail/Outlook (rich HTML) or downloaded as an .htm file.
   The logo is referenced from the hosted repo so it loads inside email. */
(function () {
  'use strict';

  var root = document.getElementById('siggen');
  if (!root) return;

  // Absolute, and deliberately on a PUBLIC path. Mail clients fetch this with
  // no session and no cookie, so it must never sit behind an auth gate — if
  // the manual is ever put behind Cloudflare Access, this asset has to stay
  // outside it or every staff signature renders as a broken image.
  // 400px wide for a 200px display box, i.e. 2x for retina.
  var LOGO = 'https://newmed-brand-pvt.dhruvsuroop.workers.dev/assets/logos/png/email-signature.png';
  // The tagline is brand copy, not a personal detail, so it is a constant and
  // has no input. Staff cannot reword it, drop it, or leave a stale version in
  // circulation — changing it here changes every signature generated after.
  var TAGLINE = 'Training Talent. Deploying Care.';

  var fields = ['name', 'title', 'creds', 'email', 'phone', 'location'];
  var inputs = {};
  fields.forEach(function (f) { inputs[f] = root.querySelector('[data-f="' + f + '"]'); });
  var preview = root.querySelector('.sig-preview');
  var hint = root.querySelector('.sig-hint');

  function esc(s) {
    return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Web-safe Arial: email clients won't load Mona Sans, so the signature falls
  // back cleanly while keeping the brand colours and structure.
  function build(v) {
    var name = esc(v.name) || 'Your Name';
    var title = esc(v.title) || 'Job title';
    var creds = v.creds ? ' <span style="color:#7C3134;font-weight:normal;">' + esc(v.creds) + '</span>' : '';
    var rows = [];
    if (v.email) rows.push('<a href="mailto:' + esc(v.email) + '" style="color:#FF5122;text-decoration:none;">' + esc(v.email) + '</a>');
    if (v.phone) rows.push('<span style="color:#391E1A;">' + esc(v.phone) + '</span>');
    if (v.location) rows.push('<span style="color:#391E1A;">' + esc(v.location) + '</span>');
    var contact = rows.length
      ? '<div style="font-size:12px;line-height:1.7;padding-top:9px;">' + rows.join('<br>') + '</div>' : '';

    return '' +
'<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#391E1A;border-collapse:collapse;">' +
  '<tr>' +
    '<td style="padding:2px 20px 2px 0;vertical-align:middle;border-right:2px solid #FF5122;">' +
      '<img src="' + LOGO + '" alt="NewMed Skills" width="200" style="display:block;border:0;">' +
    '</td>' +
    '<td style="padding:2px 0 2px 20px;vertical-align:middle;">' +
      '<div style="font-size:16px;font-weight:bold;color:#391E1A;letter-spacing:.2px;">' + name + creds + '</div>' +
      '<div style="font-size:13px;color:#7C3134;padding-top:3px;">' + title + '</div>' +
      contact +
    '</td>' +
  '</tr>' +
  '<tr><td colspan="2" style="padding-top:12px;">' +
    // Signal Orange at full strength. The old muted brown ran at .6 opacity;
    // orange at .6 goes chalky in Outlook, which flattens alpha on some
    // backgrounds, so the weight comes from the colour, not transparency.
    '<div style="font-size:11px;color:#FF5122;">' + esc(TAGLINE) + '</div>' +
  '</td></tr>' +
'</table>';
  }

  function values() {
    var v = {};
    fields.forEach(function (f) { v[f] = inputs[f] ? inputs[f].value.trim() : ''; });
    return v;
  }

  function render() { preview.innerHTML = build(values()); }

  fields.forEach(function (f) { if (inputs[f]) inputs[f].addEventListener('input', render); });

  function flash(msg) { if (hint) { hint.textContent = msg; clearTimeout(root.__t); root.__t = setTimeout(function () { hint.textContent = ''; }, 2400); } }

  // Copy as rich HTML so it pastes formatted into signature editors.
  root.querySelector('[data-copy]').addEventListener('click', function () {
    var html = build(values());
    var plain = (values().name || '') + ' — NewMed Skills';
    if (navigator.clipboard && window.ClipboardItem) {
      navigator.clipboard.write([new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([plain], { type: 'text/plain' })
      })]).then(function () { flash('Signature copied — paste it into your email settings.'); },
        function () { legacyCopy(html); });
    } else { legacyCopy(html); }
  });

  function legacyCopy(html) {
    var box = document.createElement('div');
    box.contentEditable = 'true';
    box.style.cssText = 'position:fixed;left:-9999px;top:0;';
    box.innerHTML = html;
    document.body.appendChild(box);
    var range = document.createRange(); range.selectNodeContents(box);
    var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
    try { document.execCommand('copy'); flash('Signature copied — paste it into your email settings.'); }
    catch (e) { flash('Press Ctrl/Cmd + C to copy.'); }
    sel.removeAllRanges(); document.body.removeChild(box);
  }

  root.querySelector('[data-download]').addEventListener('click', function () {
    var doc = '<!doctype html><html><head><meta charset="utf-8"><title>NewMed Skills signature</title></head><body>' +
      build(values()) + '</body></html>';
    var url = URL.createObjectURL(new Blob([doc], { type: 'text/html' }));
    var a = document.createElement('a');
    a.href = url; a.download = 'newmed-signature.htm';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
    flash('Downloaded newmed-signature.htm');
  });

  render();
})();
