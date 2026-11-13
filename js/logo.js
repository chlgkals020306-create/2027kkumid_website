/* ==========================================================================
   logo.js — intro logo animation
   "Rare" is written on stroke by stroke, then TASTE fades in (reference: logo.mov).
   The movie is shipped as a frame sequence (white + alpha) and drawn on a canvas, tinted with
   RT.data.intro.logoAnim.color — works in every browser, also when opened from the file system.
   It loops: write on → the finished logo rests for `hold` seconds → fades out over `fade` seconds →
   a short `gap` → starts again. (loop: false = play once and stay. Reduced motion: finished logo only.)
   ========================================================================== */
(function () {
  const RT = (window.RT = window.RT || {});

  RT.introLogo = {
    init() {
      const canvas = document.querySelector('[data-logo-canvas]');
      const cfg = RT.data && RT.data.intro && RT.data.intro.logoAnim;
      if (!canvas || !cfg) return;
      const ctx = canvas.getContext('2d');
      canvas.width = cfg.width; canvas.height = cfg.height;
      const last = cfg.count - 1;
      const src = (i) => `${cfg.path}${String(i).padStart(3, '0')}.webp`;
      const frames = new Array(cfg.count);
      let shown = -1;

      function draw(i) {
        const img = frames[i];
        if (!img || !img.naturalWidth || i === shown) return;
        shown = i;
        ctx.globalCompositeOperation = 'copy';
        ctx.drawImage(img, 0, 0, cfg.width, cfg.height);
        ctx.globalCompositeOperation = 'source-in';              // keep the alpha, replace the colour
        ctx.fillStyle = cfg.color;
        ctx.fillRect(0, 0, cfg.width, cfg.height);
      }
      function load(i) {
        return new Promise((resolve) => {
          const img = new Image();
          img.decoding = 'async';
          img.onload = () => { frames[i] = img; (img.decode ? img.decode().catch(() => {}) : Promise.resolve()).then(resolve); };
          img.onerror = resolve;
          img.src = src(i);
        });
      }
      const finished = () => load(last).then(() => draw(last));

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) { finished(); return; }

      Promise.all(frames.fill(0).map((_, i) => load(i))).then(() => {
        if (frames.filter(Boolean).length < cfg.count) { finished(); return; }   // a frame is missing → no half animation
        const play = cfg.count / cfg.fps, hold = cfg.hold == null ? 1.6 : cfg.hold, fade = cfg.fade == null ? 1 : cfg.fade, gap = cfg.gap == null ? 0.4 : cfg.gap;
        const cycle = play + hold + fade + gap, loop = cfg.loop !== false;
        let t0 = 0, alpha = -1;
        const setAlpha = (v) => { if (v !== alpha) { alpha = v; canvas.style.opacity = v; } };
        const step = (now) => {
          if (!t0) t0 = now + (cfg.delay || 0) * 1000;
          if (window.scrollY < window.innerHeight) {                // the intro is on screen (further down nothing is drawn)
            let t = Math.max(0, (now - t0) / 1000);
            if (loop) t %= cycle;
            if (t < play + hold || !loop) {                          // writing on, then resting
              draw(Math.min(last, Math.floor(t * cfg.fps))); setAlpha(1);
            } else if (t < play + hold + fade) {                     // fading out
              const k = (t - play - hold) / fade;
              draw(last); setAlpha((1 - k * k * (3 - 2 * k)).toFixed(3));
            } else {                                                 // empty, ready for the next round
              setAlpha(0); draw(0);
            }
          }
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }
  };
})();
