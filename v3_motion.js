/* NewMed Skills — v3 reveal-on-scroll.
   Calm motion only: a short opacity + vertical settle on a decelerating
   curve. Nothing springs, overshoots or bounces, per the brand rules.

   Note on this site's structure: sections are display:none until you
   navigate to them, so elements are laid out only once their section
   becomes active. IntersectionObserver can't report on a display:none
   subtree, so we (re)arm elements on the app's `nm:repaint` event and
   also sweep anything already in view at that moment. That makes the
   hidden->visible transition deterministic without a blanket timeout
   that would strip the animation off the rest of the page. */
(function () {
  'use strict';

  var SEL = [
    // Brand section (the original v3 proof)
    '.v3-hero', '.v3-sec > .v3-kicker', '.v3-sec > .v3-statement', '.v3-cols > div',
    '.v3-dark .v3-kicker', '.v3-dark blockquote', '.v3-dark .v3-sub',
    '.v3-band img', '.v3-attr',
    // rolled out across every other page
    '.section:not(.home) .sec-head',
    '.cash-sec > .cash-h', '.cash-sec > .cash-lead',
    '.block > h2', '.block > h3', '.block > .body',
    '.variants > div', '.arules > .arule', '.ico-set > .ico-cell',
    '.sw-grid > .swatch', '.dd > .dont', '.panel-2 > div',
    '.wgrid > .wrow', '.a11y-grid > .a11y', '.res-list > .res',
    '.gfx', '.dpanel', '.logo-dl-two > .ldl-card'
  ].join(',');

  function all() {
    return Array.prototype.slice.call(document.querySelectorAll(SEL));
  }
  function show(el) {
    el.classList.remove('reveal');
    el.classList.add('is-in');
  }
  function inView(el) {
    var r = el.getBoundingClientRect();
    if (!r.width && !r.height) return false;          // still display:none
    return r.top < window.innerHeight && r.bottom > 0;
  }

  function init() {
    var reduced = window.matchMedia &&
                  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // No observer or the reader asked for less motion: just show everything.
    // Nothing is ever left at opacity 0.
    if (reduced || !('IntersectionObserver' in window)) {
      all().forEach(show);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var sibs = el.parentNode
          ? Array.prototype.slice.call(el.parentNode.children) : [];
        var i = Math.max(0, sibs.indexOf(el));
        el.style.setProperty('--d', Math.min(i, 5) * 70 + 'ms');
        show(el);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    function arm() {
      all().forEach(function (el) {
        if (el.classList.contains('is-in')) return;
        if (!el.__nmArmed) {
          el.__nmArmed = true;
          el.classList.add('reveal');
          io.observe(el);
        }
        // Element just became laid out and is already on screen: reveal it
        // now rather than waiting on an observer callback that may not come.
        if (inView(el)) { io.unobserve(el); show(el); }
      });
    }

    // A fast scroll can jump an element from below the fold to above it
    // without it ever intersecting, which would leave it hidden for good.
    // Sweep anything the reader has already reached.
    function sweep() {
      all().forEach(function (el) {
        if (el.classList.contains('is-in')) return;
        if (el.getBoundingClientRect().top < window.innerHeight) {
          io.unobserve(el); show(el);
        }
      });
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { ticking = false; sweep(); });
    }

    arm();
    document.addEventListener('nm:repaint', arm);
    window.addEventListener('hashchange', arm);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  try {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else { init(); }
  } catch (err) {
    window.__NM_MOTION_ERR = String((err && err.stack) || err);
    all().forEach(show);   // fail open: content is never left invisible
  }
})();
