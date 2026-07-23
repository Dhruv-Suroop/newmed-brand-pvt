/* NewMed Skills — Brand Guidelines · interactions */
(function () {
  'use strict';

  var sections = Array.prototype.slice.call(document.querySelectorAll('.section'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  var sidebar = document.getElementById('sidebar');
  var scrim = document.getElementById('scrim');
  var main = document.getElementById('main');

  var ids = sections.map(function (s) { return s.id; });

  function closeDrawer() {
    if (sidebar) sidebar.classList.remove('open');
    if (scrim) scrim.classList.remove('show');
  }

  function show(id, push) {
    if (ids.indexOf(id) === -1) id = ids[0];
    sections.forEach(function (s) { s.classList.toggle('is-active', s.id === id); });
    // active state only on the main nav links (those inside #nav)
    document.querySelectorAll('#nav a').forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
    });
    if (push && ('#' + id) !== location.hash) {
      history.pushState(null, '', '#' + id);
    }
    // reset scroll to top of the content
    window.scrollTo(0, 0);
    if (main && main.scrollTop) main.scrollTop = 0;
    closeDrawer();
  }

  // Intercept nav clicks
  navLinks.forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) === '#') {
        e.preventDefault();
        show(href.slice(1), true);
      }
    });
  });

  // Back / forward
  window.addEventListener('popstate', function () {
    show((location.hash || '#intro').slice(1), false);
  });

  // Initial
  show((location.hash || '#intro').slice(1), false);

  /* ---- Copy to clipboard ---- */
  var toast = document.getElementById('toast');
  var toastMsg = document.getElementById('toast-msg');
  var toastTimer = null;

  function showToast(msg) {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 1600);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast('Copied  ' + text);
      }).catch(function () { fallbackCopy(text); });
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); showToast('Copied  ' + text); }
    catch (err) { showToast('Press ⌘/Ctrl + C'); }
    document.body.removeChild(ta);
  }

  document.querySelectorAll('[data-hex]').forEach(function (el) {
    el.addEventListener('click', function () {
      copyText(el.getAttribute('data-hex'));
    });
  });

  /* ---- Mobile drawer ---- */
  var hamb = document.getElementById('hamb');
  if (hamb) {
    hamb.addEventListener('click', function () {
      var open = sidebar.classList.toggle('open');
      scrim.classList.toggle('show', open);
    });
  }
  if (scrim) scrim.addEventListener('click', closeDrawer);

  /* ---- Keyboard: left/right to move between sections ---- */
  document.addEventListener('keydown', function (e) {
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    var cur = ids.indexOf((location.hash || '#intro').slice(1));
    if (cur === -1) cur = 0;
    if (e.key === 'ArrowRight' && cur < ids.length - 1) { show(ids[cur + 1], true); }
    else if (e.key === 'ArrowLeft' && cur > 0) { show(ids[cur - 1], true); }
  });
})();
