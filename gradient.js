/* NewMed Skills — live organic gradient generator.
   Renders the brand's organic wash on canvas, drifts it gently, and exports
   at high resolution. Palette-locked: every stop is one of the seven brand
   colours, so a generated gradient can never introduce a new colour. */
(function () {
  'use strict';

  var PALETTE = {
    orange: [255, 81, 34],
    amber:  [255, 157, 0],
    clay:   [124, 49, 52],
    teal:   [147, 204, 205],
    cream:  [244, 241, 234],
    linen:  [239, 233, 224],
    ink:    [57, 30, 26]
  };

  /* Recipes name which palette colours may appear, and the ground they sit on.
     `swap` points at the inverted pairing, for the switch control. */
  var RECIPES = {
    organic:    { ground: 'cream',  blobs: ['amber', 'orange', 'linen', 'amber', 'orange'] },
    sunrise:    { ground: 'orange', blobs: ['amber', 'amber', 'amber', 'amber'], swap: 'sunriseAlt',
                  label: 'Sunrise', stops: 'Amber on Signal Orange' },
    sunriseAlt: { ground: 'amber',  blobs: ['orange', 'orange', 'orange', 'orange'], swap: 'sunrise',
                  label: 'Sunrise, inverted', stops: 'Signal Orange on Amber' },
    deep:       { ground: 'clay',   blobs: ['orange', 'orange', 'amber', 'orange'], swap: 'deepAlt',
                  label: 'Deep', stops: 'Signal Orange on Clay' },
    deepAlt:    { ground: 'ink',    blobs: ['orange', 'orange', 'amber', 'orange'], swap: 'deep',
                  label: 'Deep, ink', stops: 'Signal Orange on Clinical Ink' }
  };

  function rgba(c, a) { return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }

  // Deterministic PRNG so a seed always reproduces the same gradient.
  function rng(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function makeBlobs(recipe, seed) {
    var r = rng(seed), spec = RECIPES[recipe] || RECIPES.organic, out = [];
    spec.blobs.forEach(function (name, i) {
      out.push({
        colour: name,
        x: 0.12 + r() * 0.76,          // normalised centre
        y: 0.12 + r() * 0.76,
        rad: 0.42 + r() * 0.46,        // normalised radius
        alpha: 0.62 + r() * 0.34,
        // drift: unhurried but perceptible. Periods are unequal and coprime-ish
        // so the composition never visibly repeats. ~14-26s per cycle.
        px: 0.10 + r() * 0.13,
        py: 0.09 + r() * 0.12,
        sx: 2300 + r() * 1900,
        sy: 2700 + r() * 2100,
        phase: r() * Math.PI * 2
      });
    });
    return { ground: spec.ground, blobs: out };
  }

  /* Paint one frame. Drawn at low internal resolution then scaled up, which is
     what gives the soft organic blend rather than hard-edged circles. */
  function paint(ctx, W, H, state, t) {
    var g = PALETTE[state.ground];
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgb(' + g[0] + ',' + g[1] + ',' + g[2] + ')';
    ctx.fillRect(0, 0, W, H);

    var span = Math.sqrt(W * W + H * H);
    state.blobs.forEach(function (b) {
      var cx = (b.x + Math.sin(t / b.sx + b.phase) * b.px) * W;
      var cy = (b.y + Math.cos(t / b.sy + b.phase) * b.py) * H;
      var rad = b.rad * span * 0.55;
      var col = PALETTE[b.colour];
      var grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      grd.addColorStop(0, rgba(col, b.alpha));
      grd.addColorStop(0.45, rgba(col, b.alpha * 0.35));
      grd.addColorStop(1, rgba(col, 0));
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
    });
  }

  function initModule(root) {
    var canvas = root.querySelector('canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var recipe = root.getAttribute('data-recipe') || 'organic';
    var seed = Math.floor(Math.random() * 1e9);
    var state = makeBlobs(recipe, seed);
    var running = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var raf = 0, SCALE = 0.2;    // internal render scale: low = soft and cheap

    function size() {
      var r = canvas.getBoundingClientRect();
      canvas.width = Math.max(2, Math.round(r.width * SCALE));
      canvas.height = Math.max(2, Math.round(r.height * SCALE));
    }

    function frame(now) {
      paint(ctx, canvas.width, canvas.height, state, now);
      if (running) raf = requestAnimationFrame(frame);
    }

    function start() { if (!raf) raf = requestAnimationFrame(frame); }
    function stop() { cancelAnimationFrame(raf); raf = 0; }

    size();
    // paint one frame even when motion is reduced
    paint(ctx, canvas.width, canvas.height, state, 0);
    if (running) start();

    // pause when scrolled out of view
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && running) start(); else stop();
        });
      }, { threshold: 0.05 }).observe(canvas);
    }

    window.addEventListener('resize', function () {
      clearTimeout(root.__rt);
      root.__rt = setTimeout(function () {
        size();
        paint(ctx, canvas.width, canvas.height, state, performance.now());
      }, 150);
    });

    // ---- controls ---- (a module may carry several save sizes)
    var shuffles = Array.prototype.slice.call(root.querySelectorAll('[data-shuffle]'));
    var toggles  = Array.prototype.slice.call(root.querySelectorAll('[data-toggle]'));
    var saves    = Array.prototype.slice.call(root.querySelectorAll('[data-save]'));

    shuffles.forEach(function (b) {
      b.addEventListener('click', function () {
        seed = Math.floor(Math.random() * 1e9);
        state = makeBlobs(recipe, seed);
        paint(ctx, canvas.width, canvas.height, state, performance.now());
      });
    });

    toggles.forEach(function (b) {
      b.addEventListener('click', function () {
        running = !running;
        b.textContent = running ? 'Pause' : 'Play';
        if (running) start(); else stop();
      });
    });

    var swaps = Array.prototype.slice.call(root.querySelectorAll('[data-swap]'));
    swaps.forEach(function (b) {
      b.addEventListener('click', function () {
        var next = (RECIPES[recipe] || {}).swap;
        if (!next) return;
        recipe = next;
        state = makeBlobs(recipe, seed);
        paint(ctx, canvas.width, canvas.height, state, performance.now());
        var spec = RECIPES[recipe];
        var nm = root.querySelector('.gen-meta .nm');
        var st = root.querySelector('.gen-meta .st');
        if (nm && spec.label) nm.textContent = spec.label;
        if (st && spec.stops) st.textContent = spec.stops;
        // ground luminance decides whether the caption sits in ink or cream
        var meta = root.querySelector('.gen-meta');
        if (meta) meta.classList.toggle('on-dark', spec.ground === 'clay' || spec.ground === 'ink');
      });
    });

    saves.forEach(function (b) {
      b.addEventListener('click', function () {
        var W = parseInt(b.getAttribute('data-w'), 10) || 3840;
        var box = canvas.getBoundingClientRect();
        if (!box.width) return;
        var H = Math.round(W * (box.height / box.width));
        var lbl = b.getAttribute('data-label') || b.textContent;
        b.disabled = true; b.textContent = 'Rendering...';
        // render fresh at full resolution; radii are normalised so it scales exactly
        var out = document.createElement('canvas');
        out.width = W; out.height = H;
        paint(out.getContext('2d'), W, H, state, performance.now());
        out.toBlob(function (blob) {
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = 'newmed-gradient-' + recipe + '-' + W + 'w.png';
          document.body.appendChild(a); a.click(); document.body.removeChild(a);
          setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
          b.disabled = false;
          b.textContent = 'Saved';
          setTimeout(function () { b.textContent = lbl; }, 1800);
        }, 'image/png');
      });
    });
  }

  function boot() {
    Array.prototype.slice.call(document.querySelectorAll('[data-gradient]')).forEach(initModule);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
  document.addEventListener('nm:repaint', function () {
    // sections are display:none until active; re-measure once visible
    Array.prototype.slice.call(document.querySelectorAll('[data-gradient] canvas')).forEach(function (c) {
      var r = c.getBoundingClientRect();
      if (r.width > 2 && c.width < 3) window.dispatchEvent(new Event('resize'));
    });
  });
})();
