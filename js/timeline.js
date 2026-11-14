/* ==========================================================================
   timeline.js — scroll-driven choreography of the pinned stage (scenes 01–07)

   Every visual state is a pure function of one number: `p`, the scroll
   progress in "screens" (one screen = RT.timelineConfig.scrollUnit pixels of
   scrolling, the same on every device). Nothing is "played" — scrolling fast,
   slow or backwards always lands on the correct frame.
     • scene motion → transforms / opacity / clip-path computed from p
     • text         → every line has its own slice of the group's scroll
                      stretch, so lines rise in one after another as you scroll
                      and leave the same way (RT.timelineConfig.text)
   ========================================================================== */
(function () {
  const RT = window.RT;
  const C = RT.timelineConfig;

  /* — shared helpers (also used by other modules) — */
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const seg = (p, range) => clamp((p - range[0]) / (range[1] - range[0]));
  const ease = {
    inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    sine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
    out: (t) => 1 - Math.pow(1 - t, 3),
    in: (t) => t * t
  };
  const mix = (a, b, t) => `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], t))).join(',')})`;
  RT.util = { clamp, lerp, seg, ease };

  const WHITE = [255, 255, 255], ORANGE = [255, 97, 10], INK = [15, 7, 2];
  const PHOTO = { w: 1293, h: 1586, frameH: 850, introCenter: 425, mainCenter: 736 + 425 }; // table.webp, design px

  const $ = (s) => document.querySelector(s);
  let dom, geo = {}, target = 0, current = 0, lastDrawn = -1, dirty = true, reduce = false;
  let glideY = null, lastTime = 0;    // glideY: where the intro ⇄ main glide is right now (null = not gliding)
  const groups = new Map();           // text group name → its .line elements, in reading order
  const groupKey = new Map();
  const listeners = [];
  const state = {};                   // last applied values, to skip redundant style writes

  function set(key, node, prop, value) {
    if (state[key] === value) return;
    state[key] = value;
    node.style[prop] = value;
  }
  function toggleScene(node, on) {
    const key = 'vis:' + node.dataset.scene;
    if (state[key] === on) return;
    state[key] = on;
    if (on) node.removeAttribute('data-off'); else node.setAttribute('data-off', '');
  }

  /* — measure: everything that depends on the viewport size — */
  function measure() {
    const vw = dom.stage.clientWidth, vh = dom.stage.clientHeight;
    geo.vw = vw; geo.vh = vh;
    geo.unit = RT.unit();                                      // pixels of scrolling per "screen" of the timeline
    geo.trackTop = dom.track.getBoundingClientRect().top + window.scrollY;

    // Background photo: "cover" the design frame (1293 × 850) and pan between two focus points.
    const scale = Math.max(vw / PHOTO.w, vh / PHOTO.frameH);
    const bw = PHOTO.w * scale, bh = PHOTO.h * scale;
    const yFor = (center) => clamp(vh / 2 - center * scale, vh - bh, 0);
    const wide = clamp((vw / vh - 1.52) / 0.7);                // on wide screens keep the dishes centred
    geo.pan = { w: bw, x: (vw - bw) / 2, y0: yFor(PHOTO.introCenter), y1: yFor(PHOTO.mainCenter - 40 * wide) };
    dom.pan.style.width = bw + 'px';
    dom.pan.style.setProperty('--dp', (bw / PHOTO.w).toFixed(4) + 'px');   // one photo pixel (for the numbered labels)

    // Navigation logo: its size and y come from CSS (Figma "navigation": 47 × 27 at y 21, scaled by --nk);
    // the side inset is the page gutter on every scene — the intro included — exactly like the sub pages.
    geo.gutter = RT.gutter();
    const stageBox = dom.stage.getBoundingClientRect();

    // Film: natural size = 16:9 box that covers the viewport; scaled down into the slot under the heading.
    const cw = Math.max(vw, (vh * 16) / 9), ch = (cw * 9) / 16;
    const slotBox = dom.filmSlot.getBoundingClientRect();
    geo.film = {
      cx: (vw - cw) / 2, cy: (vh - ch) / 2, cw,
      sx: slotBox.left - stageBox.left, sy: slotBox.top - stageBox.top, s: slotBox.width / cw
    };
    dom.player.style.width = cw + 'px';
    dom.player.style.height = ch + 'px';

    geo.sheet0 = Math.round(Math.min(vw, vh) * 0.3);            // side of the white square when it emerges
    dirty = true;
  }

  /* Progress of line i (of n) inside a group progress t: staggered, overlapping windows. */
  function lineT(t, i, n) {
    const k = C.lineStagger, w = 1 / (1 + (n - 1) * k);
    return clamp((t - i * k * w) / w);
  }
  /* Scrub one text group. Lines rise + fade in one by one, and lift away one by one. */
  function drawGroup(name, p) {
    const cfg = C.text[name], lines = groups.get(name);
    if (!cfg || !lines) return 0;
    const tIn = cfg.in ? seg(p, cfg.in) : 1, tOut = cfg.out ? seg(p, cfg.out) : 0;
    const key = tIn.toFixed(4) + '|' + tOut.toFixed(4);
    if (groupKey.get(name) === key) return tIn * (1 - tOut);
    groupKey.set(name, key);
    const n = lines.length, travel = reduce ? 0 : 1;
    for (let i = 0; i < n; i++) {
      const v = ease.out(lineT(tIn, i, n)), u = ease.sine(lineT(tOut, i, n));
      const st = lines[i].style;
      st.opacity = (v * (1 - u)).toFixed(3);
      st.transform = `translate3d(0,${(((1 - v) * 90 - u * 60) * travel).toFixed(2)}%,0)`;
    }
    return tIn * (1 - tOut);
  }

  /* — draw one frame for progress p — */
  function draw(p) {
    const { vw, vh } = geo;

    // 01 → 02  Intro → Main: one continuous photograph, panned.
    const tPan = ease.sine(seg(p, C.introToMain));
    const tSlide = ease.sine(seg(p, C.mainSlide));
    const panY = lerp(geo.pan.y0, geo.pan.y1, tPan);
    // The photograph moves with the scene, 1:1 — it stays whole until it has left the screen.
    set('pan', dom.pan, 'transform', `translate3d(${geo.pan.x.toFixed(2)}px,${panY.toFixed(2)}px,0)`);
    set('logoO', dom.introLogo, 'opacity', (1 - seg(p, C.introLogoFade)).toFixed(3));
    toggleScene(dom.intro, p < C.introToMain[1]);
    const docked = p >= C.navLogoIn[1];
    if (state.docked !== docked) { state.docked = docked; document.body.classList.toggle('logo-docked', docked); }

    // Intro logo out, navigation logo in: two plain fades — nothing travels between them.
    // The navigation sits at the regular 40px inset (the page gutter) on every scene, the intro included —
    // the same place as on the sub pages. The menu button is placed there by CSS.
    const inset = geo.gutter;
    const tNav = ease.sine(seg(p, C.navLogoIn));
    set('r', dom.navLogo, 'transform', `translate3d(${inset.toFixed(2)}px,0,0)`);
    set('ro', dom.navLogo, 'opacity', tNav.toFixed(3));
    set('rp', dom.navLogo, 'pointerEvents', tNav > 0.5 ? 'auto' : 'none');

    // 02 → 03  Main slides left, the white ground appears.
    set('main', dom.main, 'transform', `translate3d(${(-tSlide * 100).toFixed(3)}%,0,0)`);
    toggleScene(dom.main, p < C.mainSlide[1]);

    // 03  Concept 01 image: up from below, later back down.
    const c1 = (1 - ease.out(seg(p, C.c1ImageIn))) + ease.in(seg(p, C.c1ImageOut));
    set('c1', dom.c1Media, 'transform', `translate3d(0,${(c1 * 105).toFixed(3)}%,0)`);
    toggleScene(dom.c1, p > C.mainSlide[0] && p < C.c2ImageIn[1] + 0.1);

    // 04  Concept 02 image: in from the right, and out to the right again.
    const c2 = (1 - ease.out(seg(p, C.c2ImageIn))) + ease.in(seg(p, C.c2ImageOut));
    set('c2', dom.c2Media, 'transform', `translate3d(${(c2 * 101).toFixed(3)}%,0,0)`);
    // 04 → 05  Once the photo is gone, the concept 03 background fades in on the white ground.
    set('c3o', dom.c3, 'opacity', ease.sine(seg(p, C.c3In)).toFixed(3));
    toggleScene(dom.c2, p > C.c1ImageOut[0] && p < C.c2ImageOut[1]);
    toggleScene(dom.c3, p > C.c3In[0] && p < C.sheet[1]);

    // 05 → 06  White square: rises from the bottom edge, then grows until it is the whole viewport.
    const tS = seg(p, C.sheet);
    toggleScene(dom.film, tS > 0);
    if (tS >= 1) set('clip', dom.clip, 'clipPath', 'none');
    else {
      const rise = ease.out(clamp(tS / 0.3));                    // the square slides up from below the fold…
      const grow = ease.inOut(clamp((tS - 0.22) / 0.78));        // …then grows, bottom-anchored, into the full viewport
      const w = lerp(geo.sheet0, vw, grow), h = lerp(geo.sheet0, vh, grow) * rise;
      const x = (vw - w) / 2;
      set('clip', dom.clip, 'clipPath', `inset(${(vh - h).toFixed(1)}px ${x.toFixed(1)}px 0px ${x.toFixed(1)}px)`);
    }

    // 06 → 07  Film: appears in its slot, then expands (uniform scale, no re-cropping) to fill the viewport.
    const f = geo.film;
    const tA = seg(p, C.filmAppear), tE = ease.inOut(seg(p, C.filmExpand));
    const fs = lerp(f.s, 1, tE);
    const fx = lerp(f.sx, f.cx, tE), fy = lerp(f.sy, f.cy, tE) + (1 - ease.out(tA)) * vh * 0.08;
    set('film', dom.player, 'transform', `translate3d(${fx.toFixed(2)}px,${fy.toFixed(2)}px,0) scale(${fs.toFixed(5)})`);
    set('filmO', dom.player, 'opacity', tA.toFixed(3));

    // Playback is owned by scroll: plays during the first half of the film section, pauses at 50%.
    const half = (C.filmSection[0] + C.filmSection[1]) / 2;
    const shouldPlay = p >= C.filmSection[0] && p < half;
    if (shouldPlay !== state.playing) {
      state.playing = shouldPlay;
      if (shouldPlay) { const pr = dom.video.play(); if (pr && pr.catch) pr.catch(() => {}); }
      else dom.video.pause();
    }

    // Text: scrubbed line by line.
    let hint = 0;
    for (const name in C.text) { const vis = drawGroup(name, p); if (name === 'filmHint') hint = vis; }
    set('shade', dom.shade, 'opacity', hint.toFixed(3));

    // Navigation colours follow whatever is underneath.
    if (!document.body.classList.contains('menu-open')) {
      set('rc', dom.navLogo, 'backgroundColor', logoColor(p));
      set('mc', dom.navMenu, 'color', menuColor(p));
    }
  }

  const within = (r, a, b) => [lerp(r[0], r[1], a), lerp(r[0], r[1], b)];
  function logoColor(p) {
    const toC3 = seg(p, within(C.c3In, 0.25, 0.8));
    const back = seg(p, within(C.sheet, 0.86, 1));
    return mix(ORANGE, WHITE, clamp(toC3 - back));
  }
  function menuColor(p) {                                       // dark on white ground, white on imagery
    let dark = seg(p, within(C.mainSlide, 0.1, 0.17));          // main slides away → white ground under the button
    dark -= seg(p, within(C.c2ImageIn, 0.02, 0.1));             // concept 02 image arrives
    dark += seg(p, within(C.c2ImageOut, 0.9, 1));               // … and leaves: white ground again
    dark -= seg(p, within(C.c3In, 0.25, 0.8));                  // concept 03 background fades in
    dark += seg(p, within(C.sheet, 0.86, 1));                   // white sheet reaches the top
    dark -= seg(p, within(C.filmExpand, 0.62, 0.8));            // film covers the top
    dark += seg(p, [C.detailsRise[1] - 0.06, C.detailsRise[1]]); // details sheet arrives
    return mix(WHITE, INK, clamp(dark));
  }

  /* — loop — */
  function readTarget() {
    const y = glideY != null ? glideY : window.scrollY;        // during the glide: its own position, not what the wheel adds on top
    target = clamp((y - geo.trackTop) / geo.unit, 0, C.end);
  }
  function frame(now) {
    readTarget();
    const dt = lastTime && now ? now - lastTime : 1000 / 60; lastTime = now || 0;
    const k = reduce ? 1 : RT.damp(C.smoothing, dt);           // same glide at every refresh rate
    current = Math.abs(target - current) < 0.0006 ? target : current + (target - current) * k;
    if (current !== lastDrawn || dirty) {
      draw(current); lastDrawn = current; dirty = false;
      listeners.forEach((fn) => fn('frame', current));
    }
    requestAnimationFrame(frame);
  }

  /* — intro ⇄ main: a sticky step —
     Scrolling down from the intro: once past C.introSnap.from the page glides on by itself until the main scene
     fills the screen (C.introSnap.to). Scrolling back up from there by more than `back` glides to the top again.
     The glide owns the scroll position: wheel, trackpad and key input is swallowed while it runs, and after it
     has arrived the page stays put until that input has gone quiet (`quiet`, at most `settle` ms) — the momentum
     of a trackpad swipe outlasts the glide and would otherwise push the page on, past the main scene.
     Touch scrolling is left alone (it has its own momentum). */
  function initSnap() {
    const S = C.introSnap;
    if (!S) return;
    const KEYS = [' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
    const QUIET = S.quiet == null ? 160 : S.quiet, SETTLE = S.settle == null ? 1600 : S.settle;
    let last = window.scrollY, gliding = false, raf = 0, touching = false, lastWheel = 0;
    const mainY = () => geo.trackTop + S.to * geo.unit;
    const release = () => { cancelAnimationFrame(raf); gliding = RT.gliding = false; glideY = null; last = window.scrollY; };
    function glide(to) {
      const from = window.scrollY, full = S.to * geo.unit || 1;
      const ms = reduce ? 0 : S.duration * clamp(Math.abs(to - from) / full, 0.5, 1), t0 = performance.now();
      let arrived = 0;
      gliding = RT.gliding = true;                             // js/chrome.js › initWheel stands back meanwhile
      const step = (now) => {
        const t = ms ? clamp((now - t0) / ms) : 1;
        glideY = from + (to - from) * ease.inOut(t);
        if (Math.abs(window.scrollY - glideY) > 0.5) window.scrollTo(0, glideY);   // also undoes whatever the wheel moved meanwhile
        if (t < 1) { raf = requestAnimationFrame(step); return; }
        if (!arrived) arrived = now;
        if (now - lastWheel < QUIET && now - arrived < SETTLE) raf = requestAnimationFrame(step);   // momentum still coming in: hold
        else release();
      };
      raf = requestAnimationFrame(step);
    }
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (gliding) return;
      const dir = y - last; last = y;
      if (touching || !dir || document.body.classList.contains('menu-open')) return;
      const top = geo.trackTop, a = top + S.from * geo.unit, b = mainY();
      if (dir > 0 && y > a && y < b - 2) glide(b);
      else if (dir < 0 && S.back != null && y > top + 2 && y < b - S.back * geo.unit) glide(top);
    }, { passive: true });
    window.addEventListener('wheel', (e) => {
      touching = false; lastWheel = performance.now();
      if (gliding && e.cancelable) e.preventDefault();
    }, { passive: false });
    window.addEventListener('keydown', (e) => { if (gliding && KEYS.includes(e.key)) e.preventDefault(); });
    window.addEventListener('touchstart', () => { touching = true; if (gliding) release(); }, { passive: true });
    window.addEventListener('mousemove', () => { touching = false; }, { passive: true });
  }

  RT.timeline = {
    /* Jump to the current scroll position without the usual glide (used when the page is reset to the top). */
    snap() { if (!dom) return; readTarget(); current = target; dirty = true; },
    init() {
      dom = {
        track: $('[data-track]'), stage: $('[data-stage]'),
        intro: $('[data-scene="intro"]'), introLogo: $('[data-intro-logo]'),
        main: $('[data-scene="main"]'), pan: $('[data-pan]'),
        c1: $('[data-scene="concept1"]'), c1Media: $('[data-c1-media]'),
        c2: $('[data-scene="concept2"]'), c2Media: $('[data-c2-media]'),
        c3: $('[data-scene="concept3"]'),
        film: $('[data-scene="film"]'), clip: $('[data-film-clip]'), filmSlot: $('[data-film-slot]'),
        player: $('[data-film-player]'), video: $('[data-film-video]'), shade: $('[data-film-shade]'),
        navLogo: $('[data-nav-logo]'), navMenu: $('[data-menu-toggle]')
      };
      document.documentElement.style.setProperty('--screens', C.end + 1);
      document.querySelectorAll('[data-group]').forEach((n) => {
        const list = groups.get(n.dataset.group) || [];
        n.querySelectorAll('.line').forEach((l) => list.push(l));
        groups.set(n.dataset.group, list);
      });
      reduce = RT.env.reduced.matches;                         // false unless RT.motion.respectReducedMotion (js/data.js)
      RT.env.reduced.onChange((on) => { reduce = on; groupKey.clear(); dirty = true; });

      measure();
      readTarget(); current = target;                          // no intro "catch-up" when the page loads mid-scroll
      let raf = 0;
      const remeasure = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
      window.addEventListener('resize', remeasure);
      window.addEventListener('orientationchange', remeasure);
      window.addEventListener('load', remeasure);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);
      dom.navLogo.classList.add('is-ready');
      initSnap();
      RT.wheel.zone(() => [geo.trackTop, geo.trackTop + C.end * geo.unit]);   // the pinned stretch: wheel / trackpad evened out
      requestAnimationFrame(frame);
    },
    on(fn) { listeners.push(fn); },
    get progress() { return current; },
    remeasure() { measure(); },
    /* Re-apply everything on the next frame (used after another module overrides inline styles). */
    refresh() { for (const k in state) delete state[k]; groupKey.clear(); dirty = true; },
    /* Scroll to a timeline label (RT.timelineConfig.labels) or to an element selector. */
    scrollTo(to) {
      let y;
      if (to in C.labels) y = geo.trackTop + C.labels[to] * geo.unit;
      else { const n = document.querySelector(to); if (!n) return; y = n.getBoundingClientRect().top + window.scrollY; }
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    }
  };
})();
