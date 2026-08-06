/* NewMed Skills — "coming soon" for downloads.

   The asset files are not in the repo yet; the buttons stay in place so the
   layout and the documentation still read correctly, but they explain
   themselves instead of failing. Delegated from the document, so buttons
   added later are covered without touching this file.

   Note: the generators' own Download PNG / SVG buttons are NOT affected —
   those build their output in the browser and never fetch a file. */
(function () {
  'use strict';

  // Looked up lazily, not at load time: the script tag sits above the popup
  // markup, so an eager getElementById returns null and the whole module
  // silently does nothing.
  var lastFocus = null;
  function popup() { return document.getElementById('soon-pop'); }

  function open(trigger) {
    var pop = popup(); if (!pop) return;
    lastFocus = trigger || null;
    pop.hidden = false;
    document.body.classList.add('soon-open');
    var btn = pop.querySelector('[data-soon-close]');
    if (btn) btn.focus();
  }
  function close() {
    var pop = popup(); if (!pop) return;
    pop.hidden = true;
    document.body.classList.remove('soon-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-soon]');
    if (t) { e.preventDefault(); open(t); return; }
    // click the backdrop or the dismiss button
    if (e.target.closest('[data-soon-close]') || e.target === popup()) close();
  });

  document.addEventListener('keydown', function (e) {
    var pop = popup();
    if (e.key === 'Escape' && pop && !pop.hidden) close();
    // the triggers are anchors without href, so they are not keyboard-
    // activatable by default — restore that
    if ((e.key === 'Enter' || e.key === ' ') && document.activeElement &&
        document.activeElement.matches('[data-soon]')) {
      e.preventDefault(); open(document.activeElement);
    }
  });

  // anchors without href drop out of the tab order; put them back
  Array.prototype.slice.call(document.querySelectorAll('[data-soon]')).forEach(function (el) {
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
  });
})();
