/* NewMed Skills — meeting background generator.

   The brand gradient at 1920x1080 with a logo placed on top. Staff pick a
   wash, pick a lockup, drag it where they want it, and save a JPG they can
   load straight into Teams or Zoom.

   Three decisions worth knowing about:

   - The gradient is NOT reimplemented here. `gradient.js` exposes its engine
     as window.NMGradient and this module composites on top of it, so the two
     can never drift apart. If a recipe changes there, it changes here.

   - The preview is two stacked canvases. The gradient layer renders at a
     fraction of display size and is scaled up by CSS (that is where the soft
     organic blend comes from — same trick as the gradient module); the logo
     layer renders at device resolution so it stays crisp. Drawing the logo
     into the low-res layer would visibly mush it.

   - Position is stored normalised (0..1 of the frame), never in pixels, so
     the 1920px export lands the logo exactly where the preview showed it
     regardless of how wide the preview happens to be on screen. */
(function () {
  'use strict';

  var root = document.getElementById('bggen');
  if (!root) return;

  var q = function (s) { return root.querySelector(s); };

  var OUT_W = 1920, OUT_H = 1080;        // what Teams and Zoom expect
  var AR = OUT_W / OUT_H;
  var MARGIN = 0.055;                    // preset inset, normalised to width

  /* Lockups that ship in both cream and ink read on any ground. The symbol
     only exists in colour, so it carries its own variant list and the colour
     switch is disabled while it is selected. */
  var LOCKUPS = {
    horizontal: { label: 'Horizontal', variants: ['cream', 'ink'], size: 0.30 },
    stack:      { label: 'Stack',      variants: ['cream', 'ink'], size: 0.24 },
    vertical:   { label: 'Vertical',   variants: ['cream', 'ink'], size: 0.16 },
    badge:      { label: 'Badge',      variants: ['cream', 'ink'], size: 0.11 },
    symbol:     { label: 'Symbol',     variants: ['cream', 'ink'], size: 0.10 }
  };

  var HEX = { cream: '#f4f1ea', ink: '#391e1a' };

  /* The symbol ships only in colour, so there is no symbol-cream.svg to load.
     Its `-colour-alt` file declares no fill at all — which is precisely how
     the cream and ink variants of every other lockup are built (a fill on the
     <svg> root, see badge-cream.svg) — so the same mechanism recolours it
     rather than needing new artwork. */
  function resolve(key, variant) {
    if (key === 'symbol') return { file: 'symbol-colour-alt', fill: HEX[variant] || HEX.ink };
    return { file: key + '-' + variant, fill: null };
  }

  var state = {
    recipe: 'organic',
    seed: Math.floor(Math.random() * 1e9),
    blobs: null,
    lockup: 'horizontal',
    variant: 'ink',
    size: LOCKUPS.horizontal.size,
    // Resolved to the bottom-right anchor on first paint, once the artwork's
    // aspect is known. Deliberately not centred: dead centre is behind the
    // caller's head, which is the one place a logo must not go.
    pos: null,
    guide: true
  };

  var bg = q('[data-bg="bg"]');
  var fg = q('[data-bg="fg"]');
  var stage = q('[data-bg="stage"]');
  if (!bg || !fg || !stage) return;

  var bgx = bg.getContext('2d');
  var fgx = fg.getContext('2d');

  /* ---- logo loading -------------------------------------------------- */
  // The SVGs carry a viewBox but no width/height. Firefox will not rasterise
  // such an image into a canvas at a chosen size, so width/height are injected
  // from the viewBox before the blob URL is built.
  var cache = {};
  function loadLogo(key, variant) {
    var spec = resolve(key, variant);
    var id = spec.file + (spec.fill ? '@' + spec.fill : '');
    if (cache[id]) return cache[id];
    cache[id] = fetch('assets/logos/svg/' + spec.file + '.svg')
      .then(function (r) {
        if (!r.ok) throw new Error(spec.file + ' ' + r.status);
        return r.text();
      })
      .then(function (txt) {
        var vb = /viewBox\s*=\s*"([-\d.\s]+)"/.exec(txt);
        if (vb && !/<svg[^>]*\swidth\s*=/.test(txt)) {
          var p = vb[1].trim().split(/[\s,]+/).map(Number);
          txt = txt.replace(/<svg/, '<svg width="' + p[2] + '" height="' + p[3] + '"');
        }
        if (spec.fill) {
          // replace any root fill rather than adding a second one
          txt = txt.replace(/(<svg\b[^>]*?)\s+fill\s*=\s*"[^"]*"/, '$1');
          txt = txt.replace(/<svg/, '<svg fill="' + spec.fill + '"');
        }
        var url = URL.createObjectURL(new Blob([txt], { type: 'image/svg+xml' }));
        return new Promise(function (res, rej) {
          var im = new Image();
          im.onload = function () { res(im); };
          im.onerror = function () { rej(new Error('decode ' + id)); };
          im.src = url;
        });
      })
      .catch(function (e) { cache[id] = null; throw e; });
    return cache[id];
  }

  function currentLogo() {
    var spec = LOCKUPS[state.lockup];
    var v = spec.variants.indexOf(state.variant) >= 0 ? state.variant : spec.variants[0];
    return loadLogo(state.lockup, v);
  }

  /* ---- geometry ------------------------------------------------------ */
  // Logo box in normalised units. Width is the control; height follows from
  // the artwork's own aspect and the frame's, so nothing is ever stretched.
  function logoBox(img) {
    var w = state.size;
    var h = (state.size * (img.naturalHeight / img.naturalWidth)) * AR;
    return { w: w, h: h };
  }

  function clampPos(p, box) {
    if (!p) return anchorPos(1, 1, box);   // not placed yet — fall to the default
    return {
      x: Math.max(box.w / 2, Math.min(1 - box.w / 2, p.x)),
      y: Math.max(box.h / 2, Math.min(1 - box.h / 2, p.y))
    };
  }

  // ax/ay: 0 = start edge, 0.5 = centred, 1 = end edge.
  function anchorPos(ax, ay, box) {
    var mx = MARGIN, my = MARGIN * AR;   // equal visual inset on both axes
    return {
      x: ax === 0.5 ? 0.5 : (ax === 0 ? mx + box.w / 2 : 1 - mx - box.w / 2),
      y: ay === 0.5 ? 0.5 : (ay === 0 ? my + box.h / 2 : 1 - my - box.h / 2)
    };
  }

  /* ---- painting ------------------------------------------------------ */
  function paintBg(ctx, W, H, t) {
    if (!window.NMGradient) return;
    ctx.clearRect(0, 0, W, H);
    window.NMGradient.paint(ctx, W, H, state.blobs, t || 0);
  }

  function paintLogo(ctx, W, H, img) {
    ctx.clearRect(0, 0, W, H);
    if (!img) return;
    var box = logoBox(img);
    var p = clampPos(state.pos, box);
    ctx.drawImage(img, (p.x - box.w / 2) * W, (p.y - box.h / 2) * H, box.w * W, box.h * H);
  }

  var BG_SCALE = 0.2;      // low-res gradient layer, upscaled by CSS
  function sizeCanvases() {
    var r = stage.getBoundingClientRect();
    if (r.width < 4) return false;
    bg.width  = Math.max(2, Math.round(r.width * BG_SCALE));
    bg.height = Math.max(2, Math.round(r.width / AR * BG_SCALE));
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    fg.width  = Math.round(r.width * dpr);
    fg.height = Math.round(r.width / AR * dpr);
    return true;
  }

  function render() {
    if (!sizeCanvases()) return;
    paintBg(bgx, bg.width, bg.height, 0);
    currentLogo().then(function (img) {
      if (!state.pos) {
        state.pos = anchorPos(1, 1, logoBox(img));       // bottom-right default
        markPresetActive(root.querySelector('[data-pos="1,1"]'));
      }
      paintLogo(fgx, fg.width, fg.height, img);
    }).catch(function () {
      fgx.clearRect(0, 0, fg.width, fg.height);
    });
  }

  // Redraw only the logo layer — used while dragging, so a drag never
  // repaints the gradient.
  function renderLogoOnly() {
    currentLogo().then(function (img) {
      paintLogo(fgx, fg.width, fg.height, img);
    }).catch(function () {});
  }

  /* ---- drag ---------------------------------------------------------- */
  var dragging = false, grab = null;

  function ptNorm(e) {
    var r = stage.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
  }

  stage.addEventListener('pointerdown', function (e) {
    currentLogo().then(function (img) {
      var box = logoBox(img);
      var p = ptNorm(e);
      var c = clampPos(state.pos, box);
      // only start a drag on the logo itself, so clicks elsewhere stay free
      if (Math.abs(p.x - c.x) > box.w / 2 || Math.abs(p.y - c.y) > box.h / 2) return;
      dragging = true;
      grab = { dx: c.x - p.x, dy: c.y - p.y };
      stage.setPointerCapture(e.pointerId);
      stage.classList.add('is-drag');
      setHint('Drop it anywhere — the export matches the preview exactly.');
    });
  });

  stage.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    e.preventDefault();
    var p = ptNorm(e);
    currentLogo().then(function (img) {
      state.pos = clampPos({ x: p.x + grab.dx, y: p.y + grab.dy }, logoBox(img));
      renderLogoOnly();
      markPresetActive(null);
    });
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove('is-drag');
    if (e && e.pointerId != null && stage.hasPointerCapture(e.pointerId)) {
      stage.releasePointerCapture(e.pointerId);
    }
    setHint();
  }
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);

  /* ---- controls ------------------------------------------------------ */
  function setHint(msg) {
    var h = q('[data-bg="hint"]');
    if (!h) return;
    h.textContent = msg || 'Drag the logo to place it, or use a preset. ' +
      'Whoever is on the call sits in the middle — keep the logo off centre.';
  }

  function markPresetActive(btn) {
    Array.prototype.slice.call(root.querySelectorAll('[data-pos]')).forEach(function (b) {
      b.classList.toggle('is-on', b === btn);
    });
  }

  // style buttons
  Array.prototype.slice.call(root.querySelectorAll('[data-recipe-pick]')).forEach(function (b) {
    b.addEventListener('click', function () {
      state.recipe = b.getAttribute('data-recipe-pick');
      state.blobs = window.NMGradient.makeBlobs(state.recipe, state.seed);
      Array.prototype.slice.call(root.querySelectorAll('[data-recipe-pick]'))
        .forEach(function (o) { o.classList.toggle('is-on', o === b); });
      autoVariant();
      render();
    });
  });

  // A cream logo disappears on cream. Follow the ground unless the user has
  // deliberately overridden it.
  var variantTouched = false;
  function groundIsDark() {
    var spec = window.NMGradient.RECIPES[state.recipe] || {};
    return spec.ground === 'ink' || spec.ground === 'clay' || spec.ground === 'orange';
  }
  // The guide is a thin stroke; at ink-ground contrast a dark one vanishes.
  // Same test drives the logo variant, so the two never disagree.
  function syncGround() { stage.classList.toggle('on-dark', groundIsDark()); }

  function autoVariant() {
    syncGround();
    if (variantTouched) return;
    state.variant = groundIsDark() ? 'cream' : 'ink';
    syncVariantButtons();
  }
  function syncVariantButtons() {
    Array.prototype.slice.call(root.querySelectorAll('[data-variant]')).forEach(function (b) {
      b.classList.toggle('is-on', b.getAttribute('data-variant') === state.variant);
      b.disabled = LOCKUPS[state.lockup].variants.indexOf(b.getAttribute('data-variant')) < 0;
    });
  }

  Array.prototype.slice.call(root.querySelectorAll('[data-variant]')).forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.disabled) return;
      variantTouched = true;
      state.variant = b.getAttribute('data-variant');
      syncVariantButtons();
      render();
    });
  });

  Array.prototype.slice.call(root.querySelectorAll('[data-lockup]')).forEach(function (b) {
    b.addEventListener('click', function () {
      state.lockup = b.getAttribute('data-lockup');
      state.size = LOCKUPS[state.lockup].size;
      var sl = q('[data-bg="size"]');
      if (sl) sl.value = Math.round(state.size * 100);
      Array.prototype.slice.call(root.querySelectorAll('[data-lockup]'))
        .forEach(function (o) { o.classList.toggle('is-on', o === b); });
      syncVariantButtons();
      // re-clamp: a bigger lockup may no longer fit where the old one sat
      currentLogo().then(function (img) {
        state.pos = clampPos(state.pos, logoBox(img));
        render();
      });
    });
  });

  Array.prototype.slice.call(root.querySelectorAll('[data-pos]')).forEach(function (b) {
    b.addEventListener('click', function () {
      var a = b.getAttribute('data-pos').split(',').map(Number);
      currentLogo().then(function (img) {
        state.pos = anchorPos(a[0], a[1], logoBox(img));
        markPresetActive(b);
        renderLogoOnly();
      });
    });
  });

  var sizeSlider = q('[data-bg="size"]');
  if (sizeSlider) {
    sizeSlider.addEventListener('input', function () {
      state.size = parseInt(sizeSlider.value, 10) / 100;
      currentLogo().then(function (img) {
        state.pos = clampPos(state.pos, logoBox(img));
        renderLogoOnly();
      });
    });
  }

  var shuffle = q('[data-bg="shuffle"]');
  if (shuffle) {
    shuffle.addEventListener('click', function () {
      state.seed = Math.floor(Math.random() * 1e9);
      state.blobs = window.NMGradient.makeBlobs(state.recipe, state.seed);
      render();
    });
  }

  var guideBtn = q('[data-bg="guide"]');
  if (guideBtn) {
    guideBtn.addEventListener('click', function () {
      state.guide = !state.guide;
      stage.classList.toggle('show-guide', state.guide);
      guideBtn.classList.toggle('is-on', state.guide);
      guideBtn.textContent = state.guide ? 'Hide guide' : 'Show guide';
    });
  }

  /* ---- camera ghost --------------------------------------------------- */
  /* A ghosted, mirrored camera feed laid over the preview so the logo can be
     placed around where the caller actually sits. This is NOT background
     removal — that needs a segmentation model (a megabyte-plus download from
     a CDN), and this site ships no external dependencies. Seeing yourself at
     half opacity answers the same question: is the logo behind my head?
     The stream is a DOM <video>, never drawn to canvas, so it cannot reach an
     export; it is never recorded and never leaves the browser. */
  var camStream = null;
  var camEl = q('[data-bg="cam"]');
  var camBtn = q('[data-bg="cam-btn"]');
  var camNote = q('[data-bg="cam-note"]');

  function setCamNote(msg) {
    if (!camNote) return;
    camNote.textContent = msg || '';
    camNote.hidden = !msg;
  }

  function stopCam() {
    if (camStream) {
      camStream.getTracks().forEach(function (t) { t.stop(); });
      camStream = null;
    }
    if (camEl) camEl.srcObject = null;
    stage.classList.remove('cam-on');
    if (camBtn) { camBtn.textContent = 'Turn on camera'; camBtn.classList.remove('is-on'); }
  }

  function startCam() {
    if (!window.isSecureContext || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCamNote('Camera preview needs a secure connection (https). It will not work over plain http.');
      return;
    }
    camBtn.disabled = true;
    camBtn.textContent = 'Starting...';
    navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false
    }).then(function (s) {
      camStream = s;
      camEl.srcObject = s;
      var p = camEl.play();
      if (p && p.catch) p.catch(function () {});
      stage.classList.add('cam-on');
      camBtn.textContent = 'Turn off camera';
      camBtn.classList.add('is-on');
      setCamNote('Preview only — the feed stays in this browser, is never recorded, ' +
                 'and is never part of the saved image. Mirrored, the way Teams and Zoom show you.');
    }).catch(function (e) {
      var n = e && e.name;
      setCamNote(n === 'NotAllowedError'
        ? 'Camera permission was declined. Allow it from the icon in the address bar, then try again.'
        : (n === 'NotFoundError' ? 'No camera found on this machine.'
                                 : 'Could not start the camera (' + (n || 'unknown error') + ').'));
    }).then(function () {
      camBtn.disabled = false;
      if (!camStream) camBtn.textContent = 'Turn on camera';
    });
  }

  if (camBtn) {
    camBtn.addEventListener('click', function () {
      if (camStream) { stopCam(); setCamNote(''); } else { startCam(); }
    });
  }
  // Never leave the camera light on behind a closed tab.
  window.addEventListener('pagehide', stopCam);

  /* ---- export -------------------------------------------------------- */
  // Rendered fresh at 1920x1080, never upscaled from the preview. Positions
  // and radii are normalised, so this is the same composition at full size.
  Array.prototype.slice.call(root.querySelectorAll('[data-bg-save]')).forEach(function (b) {
    b.addEventListener('click', function () {
      var type = b.getAttribute('data-bg-save');            // 'jpg' | 'png'
      var label = b.textContent;
      b.disabled = true; b.textContent = 'Rendering...';

      var out = document.createElement('canvas');
      out.width = OUT_W; out.height = OUT_H;
      var ox = out.getContext('2d');
      paintBg(ox, OUT_W, OUT_H, 0);

      currentLogo().then(function (img) {
        var box = logoBox(img);
        var p = clampPos(state.pos, box);
        ox.drawImage(img, (p.x - box.w / 2) * OUT_W, (p.y - box.h / 2) * OUT_H,
                     box.w * OUT_W, box.h * OUT_H);
      }).catch(function () { /* gradient-only export is still valid */ })
        .then(function () {
          var mime = type === 'jpg' ? 'image/jpeg' : 'image/png';
          out.toBlob(function (blob) {
            if (!blob) { b.disabled = false; b.textContent = label; return; }
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'newmed-meeting-background-' + state.recipe + '.' + type;
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
            b.disabled = false; b.textContent = 'Saved';
            setTimeout(function () { b.textContent = label; }, 1800);
          }, mime, type === 'jpg' ? 0.92 : undefined);
        });
    });
  });

  /* ---- boot ---------------------------------------------------------- */
  function boot() {
    if (!window.NMGradient) return;                // gradient.js must load first
    if (!state.blobs) state.blobs = window.NMGradient.makeBlobs(state.recipe, state.seed);
    autoVariant();
    syncVariantButtons();
    syncGround();
    stage.classList.toggle('show-guide', state.guide);
    setHint();
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  // The section is display:none until navigated to, so the stage measures 0
  // on first paint. Re-render once it is actually visible.
  document.addEventListener('nm:repaint', function () {
    if (stage.getBoundingClientRect().width > 4) boot();
  });

  window.addEventListener('resize', function () {
    clearTimeout(root.__rt);
    root.__rt = setTimeout(function () {
      if (stage.getBoundingClientRect().width > 4) render();
    }, 150);
  });
})();
