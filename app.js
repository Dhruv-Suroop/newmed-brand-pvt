/* NewMed Skills — Brand Guidelines · interactions */
(function () {
  'use strict';

  var sections = Array.prototype.slice.call(document.querySelectorAll('.section'));
  var sidebar = document.getElementById('sidebar');
  var scrim = document.getElementById('scrim');
  var ids = sections.map(function (s) { return s.id; });
  var groups = Array.prototype.slice.call(document.querySelectorAll('.tb-group'));
  var spyRAF = 0;

  var navscreen = document.getElementById('navscreen');

  function closeDrawer() {
    if (sidebar) sidebar.classList.remove('open');
    if (scrim) scrim.classList.remove('show');
    if (navscreen) {
      navscreen.classList.remove('open');
      navscreen.setAttribute('aria-hidden', 'true');
    }
    document.body.classList.remove('nav-open');
  }
  function closeMenus() {
    groups.forEach(function (g) { g.classList.remove('open'); });
  }

  function show(id, push, skipScroll) {
    if (ids.indexOf(id) === -1) id = ids[0];
    sections.forEach(function (s) { s.classList.toggle('is-active', s.id === id); });

    var atHome = (id === 'intro');
    document.body.classList.toggle('at-home', atHome);
    document.body.classList.toggle('at-section', !atHome);

    // sidebar active section (+ its sub-items) and active links
    document.querySelectorAll('.nav-sec').forEach(function (sec) {
      sec.classList.toggle('is-active', sec.getAttribute('data-sec') === id);
    });
    document.querySelectorAll('.ns-link, .tb-btn').forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
    });

    if (push && ('#' + id) !== location.hash) history.pushState(null, '', '#' + id);
    if (!skipScroll) window.scrollTo(0, 0);
    closeDrawer();
    closeMenus();
    updateSpy();
    // arrows must be measured after the section is visible
    requestAnimationFrame(function () { document.dispatchEvent(new Event('nm:repaint')); });
  }

  // Section navigation (top bar, sidebar section links, logo, footer)
  document.querySelectorAll('[data-nav]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href') || '';
      if (href.charAt(0) === '#') { e.preventDefault(); show(href.slice(1), true); }
    });
  });

  // Sub-item navigation: switch to the parent section, then scroll to the block
  document.querySelectorAll('[data-parent]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var parent = a.getAttribute('data-parent');
      var targetId = (a.getAttribute('href') || '').slice(1);
      show(parent, true, true);
      requestAnimationFrame(function () {
        var el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  });

  // Top-bar dropdown menus
  groups.forEach(function (g) {
    var btn = g.querySelector('.tb-btn');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var wasOpen = g.classList.contains('open');
      closeMenus();
      if (!wasOpen) g.classList.add('open');
    });
  });
  document.addEventListener('click', closeMenus);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenus(); });

  // Scroll-spy: highlight the current sub-item within the active section
  function updateSpy() {
    var active = document.querySelector('.section.is-active');
    if (!active) return;
    var navSec = document.querySelector('.nav-sec[data-sec="' + active.id + '"]');
    if (!navSec) return;
    var subs = Array.prototype.slice.call(navSec.querySelectorAll('.ns-subs a'));
    if (!subs.length) return;
    var y = window.scrollY + 110, current = null;
    subs.forEach(function (a) {
      var el = document.getElementById((a.getAttribute('href') || '').slice(1));
      if (el && (el.getBoundingClientRect().top + window.scrollY) <= y) current = a;
    });
    subs.forEach(function (a) { a.classList.toggle('is-current', a === current); });
  }
  window.addEventListener('scroll', function () {
    if (spyRAF) return;
    spyRAF = requestAnimationFrame(function () { spyRAF = 0; updateSpy(); });
  }, { passive: true });

  // Back / forward + initial
  window.addEventListener('popstate', function () { show((location.hash || '#intro').slice(1), false); });
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
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); showToast('Copied  ' + text); }
    catch (err) { showToast('Press ⌘/Ctrl + C'); }
    document.body.removeChild(ta);
  }
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { showToast('Copied  ' + text); })
        .catch(function () { fallbackCopy(text); });
    } else { fallbackCopy(text); }
  }
  document.querySelectorAll('[data-hex]').forEach(function (el) {
    el.addEventListener('click', function () { copyText(el.getAttribute('data-hex')); });
  });

  /* ---- Mobile drawer ---- */
  var hamb = document.getElementById('hamb');
  if (hamb && navscreen) {
    hamb.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !navscreen.classList.contains('open');
      navscreen.classList.toggle('open', open);
      navscreen.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.classList.toggle('nav-open', open);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeDrawer();
  });

  if (scrim) scrim.addEventListener('click', closeDrawer);

  /* ---- Keyboard: left/right between sections ---- */
  document.addEventListener('keydown', function (e) {
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    var cur = ids.indexOf((location.hash || '#intro').slice(1));
    if (cur === -1) cur = 0;
    if (e.key === 'ArrowRight' && cur < ids.length - 1) show(ids[cur + 1], true);
    else if (e.key === 'ArrowLeft' && cur > 0) show(ids[cur - 1], true);
  });


  /* ---- Landing index: preview card follows the cursor ---- */
  Array.prototype.slice.call(document.querySelectorAll('.index-list a')).forEach(function (a) {
    var prev = a.querySelector('.ix-prev');
    if (!prev) return;
    a.addEventListener('pointermove', function (e) {
      var w = prev.offsetWidth || 232, h = prev.offsetHeight || 150, pad = 16;
      var x = e.clientX + 26, y = e.clientY - h / 2;
      if (x + w + pad > window.innerWidth) x = e.clientX - w - 26;   // flip to left near edge
      x = Math.max(pad, x);
      y = Math.max(pad, Math.min(y, window.innerHeight - h - pad));
      prev.style.left = x + 'px';
      prev.style.top = y + 'px';
    });
  });
})();

// Password Gate
(function() {
  const correctPassword = 'NewMed2026';
  
  function setupGate(id) {
    const btn = document.getElementById('btn-pw-' + id);
    const input = document.getElementById('pw-' + id);
    const hint = document.getElementById('hint-pw-' + id);
    const gate = document.getElementById('gate-' + id);
    let content = document.getElementById(id + 'gen');
    if (!content) content = document.getElementById(id + '-dl');
    
    if (!btn || !input || !gate || !content) return;
    
    function unlock() {
      if (input.value === correctPassword) {
        gate.style.display = 'none';
        content.style.display = 'block';
        if (id === 'card' && window.appcard_rebuild) window.appcard_rebuild(); // Trigger resize/render for cardgen if needed
      } else {
        hint.textContent = 'Incorrect password.';
      }
    }
    
    btn.addEventListener('click', unlock);
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') unlock();
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    setupGate('card');
    setupGate('presentation');
  });
})();
