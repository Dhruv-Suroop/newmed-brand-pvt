/* NewMed Skills — Type + Arrow generator.
   Type a headline, click a word to start the arrow highlight and another to end
   it. The run is wrapped in THE ARROW — rounded start cap on the left end,
   pointed cap on the right end — reusing the locked-geometry engine from app.js
   (window.NMArrow). The arrow always sits on the ENDS of the chosen text. */
(function () {
  'use strict';

  var root = document.getElementById('typegen');
  if (!root) return;

  var input   = root.querySelector('.tg-input');
  var stage   = root.querySelector('.tg-stage');
  var hint    = root.querySelector('.tg-hint');
  var fillBtns = Array.prototype.slice.call(root.querySelectorAll('[data-fill]'));

  // text colour that keeps contrast on each fill (no off-palette values)
  var TEXTON = { sunset: 'cream', coral: 'cream', amber: 'ink', ink: 'cream', maroon: 'cream' };

  var words = [];
  var selStart = -1, selEnd = -1;   // inclusive highlighted run
  var anchor = -1, hasRange = false;
  var fill = 'sunset';

  function tokenize(str) {
    return str.trim().split(/\s+/).filter(Boolean);
  }

  function setHint() {
    if (selStart < 0) { hint.textContent = 'Click a word to start the arrow.'; return; }
    if (!hasRange)    { hint.textContent = 'Click another word to set where the arrow ends — or the same word for one.'; return; }
    var n = selEnd - selStart + 1;
    hint.textContent = n < 2
      ? 'Tip: highlight two or more words — the arrow phrase carries the movement.'
      : 'Nice. The arrow marks “' + words.slice(selStart, selEnd + 1).join(' ') + '”.';
  }

  function selectWord(i) {
    if (selStart < 0 || hasRange) {          // fresh anchor
      anchor = i; selStart = i; selEnd = i; hasRange = false;
    } else {                                  // complete the run
      selStart = Math.min(anchor, i);
      selEnd   = Math.max(anchor, i);
      hasRange = true;
    }
    render();
  }

  function render() {
    stage.textContent = '';
    var hl = null;
    for (var i = 0; i < words.length; i++) {
      if (i === selStart && selStart >= 0) {
        // open the arrow highlight and pour the whole run into it
        hl = document.createElement('span');
        hl.className = 'tg-hl';
        hl.setAttribute('data-arw', fill);
        hl.style.setProperty('--tgtext', 'var(--' + (TEXTON[fill] || 'cream') + ')');
        for (var j = selStart; j <= selEnd; j++) {
          if (j > selStart) hl.appendChild(document.createTextNode(' '));
          hl.appendChild(word(j));
        }
        stage.appendChild(hl);
        stage.appendChild(document.createTextNode(' '));
        i = selEnd;
      } else {
        stage.appendChild(word(i));
        stage.appendChild(document.createTextNode(' '));
      }
    }
    // paint the arrow behind the run (synchronous; offset sizes are ready)
    if (hl && window.NMArrow) window.NMArrow.paint(hl);
    setHint();
  }

  function word(i) {
    var s = document.createElement('span');
    s.className = 'tg-word';
    s.setAttribute('data-i', i);
    s.textContent = words[i];
    return s;
  }

  function rebuild(keepSel) {
    var prevLen = words.length;
    words = tokenize(input.value);
    if (!keepSel || selStart >= words.length || selEnd >= words.length || words.length !== prevLen) {
      // default: highlight the last two words, modelling the "last line" rule
      if (words.length >= 2) { selStart = words.length - 2; selEnd = words.length - 1; }
      else if (words.length === 1) { selStart = selEnd = 0; }
      else { selStart = selEnd = -1; }
      anchor = selStart; hasRange = true;
    }
    render();
  }

  // events -------------------------------------------------------------
  stage.addEventListener('click', function (e) {
    var el = e.target.closest('[data-i]');
    if (el) selectWord(parseInt(el.getAttribute('data-i'), 10));
  });

  input.addEventListener('input', function () { rebuild(true); });

  fillBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      fill = b.getAttribute('data-fill');
      fillBtns.forEach(function (x) { x.classList.toggle('is-on', x === b); });
      render();
    });
  });

  root.querySelectorAll('[data-example]').forEach(function (b) {
    b.addEventListener('click', function () {
      input.value = b.getAttribute('data-example');
      rebuild(false);
    });
  });

  // repaint when the type section becomes visible or the window resizes,
  // since the arrow needs real box metrics to size itself
  document.addEventListener('nm:repaint', function () { if (stage.offsetWidth > 4) render(); });
  window.addEventListener('resize', function () {
    clearTimeout(root.__t); root.__t = setTimeout(render, 140);
  });

  fillBtns.forEach(function (x) { x.classList.toggle('is-on', x.getAttribute('data-fill') === fill); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(render);
  rebuild(false);
})();
