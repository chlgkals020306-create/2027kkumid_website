/* ==========================================================================
   chrome.js — everything the home page and the sub pages share
     • navigation scale (--nk) and the menu overlay (Figma "menu")
     • page transitions: the current page fades out, the next one builds in
     • reveal engine for the sub pages: text line by line, grids row by row
     • footer, title lettering fallback (Caesura masks), small DOM helpers
   ========================================================================== */
(function () {
  const RT = (window.RT = window.RT || {});

  /* — helpers — */
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const seg = (p, range) => clamp((p - range[0]) / (range[1] - range[0]));
  const ease = {
    inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    sine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
    out: (t) => 1 - Math.pow(1 - t, 3),
    in: (t) => t * t
  };
  RT.util = RT.util || { clamp, lerp, seg, ease };
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  RT.dom = { $, $$, el, esc };
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  /* Reduced motion: only honoured when RT.motion.respectReducedMotion is true (js/data.js) — otherwise the site
     plays the same motion on every device, whatever the system's animation setting is. Every module asks this
     one object, and the CSS uses html.reduced-motion instead of the media query. */
  const systemReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = {
    get matches() { return !!(RT.motion && RT.motion.respectReducedMotion) && systemReduced.matches; },
    onChange(fn) { if (systemReduced.addEventListener) systemReduced.addEventListener('change', () => fn(reduced.matches)); }
  };
  const flagReduced = () => document.documentElement.classList.toggle('reduced-motion', reduced.matches);
  flagReduced(); reduced.onChange(flagReduced);
  RT.env = { fine, reduced };

  /* Line-by-line text: one <span class="line"> per array item. `art` wraps the text for the
     Caesura title lettering (see RT.fonts). Returns the created lines. */
  RT.lines = function (node, list, art) {
    node.classList.add('lines');
    return (list || []).map((text, i) => {
      const body = text === '' ? '&nbsp;' : esc(text);
      const line = el('span', 'line', art ? `<span class="tl">${body}</span>` : body);
      line.style.setProperty('--i', i);
      node.appendChild(line);
      return line;
    });
  };

  /* — navigation scale: 1 at the 1293px design width, growing with the viewport up to 1.4 — */
  /* The same scale as css/main.css › SCALE: one Figma pixel on screen = the 1293 × 850 frame fitted
     into the window by width and by height. */
  const phone = window.matchMedia('(max-width: 860px), (max-aspect-ratio: 1/1)');
  RT.vw = () => document.documentElement.clientWidth || window.innerWidth;              // page width without the window scrollbar (= --vw)
  RT.px = () => Math.min(RT.vw() / 1293, window.innerHeight / 850);
  RT.gutter = () => Math.max(20 * (phone.matches ? 1 : 0.6), 40 * RT.px());            // = --gutter
  RT.navScale = () => (phone.matches ? 1 : Math.max(0.6, RT.px()));
  /* One "screen" of scroll-driven motion in pixels (RT.timelineConfig.scrollUnit) — the same on every device.
     Used by the home timeline, the designer page and, through --su, by the CSS that sizes their scroll tracks. */
  RT.unit = () => { const u = RT.timelineConfig && RT.timelineConfig.scrollUnit; return u > 0 ? u : window.innerHeight; };
  /* Easing factors in this site are written "per frame at 60 fps". RT.damp converts one to the time that really
     passed since the last frame, so motion takes equally long at 30, 60, 120 or 144 fps. */
  RT.damp = (k, dt) => 1 - Math.pow(1 - k, Math.min(Math.max(dt, 0), 100) / (1000 / 60));
  function setScale() {
    const root = document.documentElement, u = RT.timelineConfig && RT.timelineConfig.scrollUnit;
    root.style.setProperty('--vw', RT.vw() + 'px');
    root.style.setProperty('--nk', RT.navScale().toFixed(4));
    if (u > 0) root.style.setProperty('--su', u + 'px'); else root.style.removeProperty('--su');
  }

  /* — title lettering —
     Titles are live text in Caesura when the Adobe Fonts kit is available; otherwise the same
     lettering is drawn from Figma-exported masks (RT.data.titleArt). Text stays in the DOM either way. */
  let artMode = false;
  RT.fonts = {
    async caesuraReady() {
      if (!document.fonts) return false;
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      try { await Promise.race([document.fonts.load('700 48px caesura', 'RARE'), wait(2500)]); } catch (e) { /* ignore */ }
      return [...document.fonts].some((f) => /caesura/i.test(f.family) && f.status === 'loaded');
    },
    /* Safe to call again after new titles were added to the DOM. */
    applyTitleArt(root) {
      const art = (RT.data && RT.data.titleArt) || {};
      artMode = true;
      document.documentElement.classList.add('no-caesura');
      $$('.tl:not(.tl--art)', root || document).forEach((n) => {
        const label = n.textContent.trim(), a = art[label.toUpperCase()];
        if (!a) return;
        n.classList.add('tl--art');
        n.setAttribute('role', 'img'); n.setAttribute('aria-label', label);
        n.style.setProperty('--ar', a.ar);
        if (a.drop) { n.classList.add('tl--drop'); n.style.setProperty('--drop', a.drop); }
        n.style.setProperty('-webkit-mask-image', `url("${a.src}")`);
        n.style.setProperty('mask-image', `url("${a.src}")`);
      });
    },
    refresh(root) { if (artMode) RT.fonts.applyTitleArt(root); }
  };

  /* — page transitions — */
  let leaving = false;
  RT.go = function (href) {
    if (leaving || !href) return;
    leaving = true;
    document.body.classList.add('is-leaving');
    // the page has faded out by now: put it back to the top before the next one takes over
    setTimeout(() => { toTop(); window.location.href = href; }, reduced.matches ? 0 : 460);
  };
  function initLinks() {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const href = a.getAttribute('href');
      if (!href || a.target || /^(https?:|mailto:|tel:)/i.test(href)) return;
      e.preventDefault();
      if (href[0] === '#') { fadeToTop(); return; }
      RT.go(href);
    });
    window.addEventListener('pageshow', (e) => {                // back / forward cache: undo the leave state
      if (!e.persisted) return;
      leaving = false;
      document.body.classList.remove('is-leaving');
      if (RT.menu) RT.menu.close(true);
    });
  }

  /* — menu overlay — */
  function initMenu() {
    const menu = $('[data-menu]'), toggle = $('[data-menu-toggle]'), logo = $('[data-nav-logo]');
    if (!menu || !toggle) return;
    const items = (RT.data && RT.data.menu) || [];
    menu.innerHTML = '<div class="menu__sheet"></div><ul class="menu__list" data-menu-list></ul>';
    const list = $('[data-menu-list]', menu);
    items.forEach((m, i) => {
      const li = el('li', 'menu__item');
      const num = String(i + 1).padStart(2, '0');
      li.innerHTML =
        `<span class="line" style="--i:${i}">` +
          `<a class="menu__link" ${m.href ? `href="${esc(m.href)}"` : 'role="link" aria-disabled="true" tabindex="0"'}>` +
            `<span class="menu__num" aria-hidden="true">${num}</span>` +
            `<span class="menu__word"><span class="tl">${esc(m.label)}</span></span>` +
          `</a>` +
        `</span>`;
      list.appendChild(li);
    });
    menu.hidden = false;
    const rows = $$('.menu__item', list);
    const depth = [1, 1.3, 0.85, 1.2];                           // each line follows the pointer a little differently
    let open = false, raf = 0, ty = 0, cy = 0;

    let prev = 0;
    function loop(now) {                                         // the lines follow the pointer up and down only
      const dt = prev && now ? now - prev : 1000 / 60; prev = now || 0;
      cy += (ty - cy) * RT.damp(0.075, dt);
      rows.forEach((row, i) => { row.style.transform = `translate3d(0,${(cy * depth[i % depth.length]).toFixed(2)}px,0)`; });
      raf = open || Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(loop) : 0;
      if (!raf) prev = 0;
    }
    menu.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch' || reduced.matches) return;
      const h = window.innerHeight;
      ty = (e.clientY / h - 0.5) * 2 * Math.min(26, h * 0.03);
      if (!raf) raf = requestAnimationFrame(loop);
    });
    menu.addEventListener('pointerleave', () => { ty = 0; });
    const block = (e) => { if (open) e.preventDefault(); };      // the page underneath must not scroll
    menu.addEventListener('wheel', block, { passive: false });
    menu.addEventListener('touchmove', block, { passive: false });

    function setOpen(next, instant) {
      open = next;
      document.body.classList.toggle('menu-open', open);
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
      menu.inert = !open;
      if (open) {
        toggle.style.color = 'rgb(15,7,2)';
        if (logo) logo.style.backgroundColor = 'rgb(255,97,10)';
        if (RT.timeline && RT.timeline.refresh && !instant) RT.timeline.refresh();
        if (!raf) raf = requestAnimationFrame(loop);
      } else {
        ty = 0;
        const restore = () => {
          if (open) return;
          toggle.style.color = '';
          if (RT.timeline && RT.timeline.refresh) RT.timeline.refresh();
        };
        if (instant || reduced.matches) restore(); else setTimeout(restore, 420);   // the sheet is still sliding down
      }
    }
    setOpen(false, true);
    toggle.addEventListener('click', () => setOpen(!open));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && open) { setOpen(false); toggle.focus(); } });
    list.addEventListener('keydown', (e) => { if (e.key === 'Enter' && e.target.matches('[aria-disabled="true"]')) e.preventDefault(); });
    RT.menu = { open: () => setOpen(true), close: (instant) => setOpen(false, instant), get isOpen() { return open; } };
  }

  /* — footer (sub pages; the home page has it in its markup) — */
  function initFooter() {
    const host = $('[data-footer]');
    if (!host || !RT.data) return;
    const f = RT.data.footer;
    host.innerHTML =
      `<div class="footer__top"><img class="footer__logo" src="${esc(f.logo)}" alt="Rare Taste" loading="lazy">` +
      `<p class="footer__org">${f.org.map((t) => `<span>${esc(t)}</span>`).join('')}</p></div>` +
      `<p class="footer__copy">${esc(f.copyright)}</p>`;
  }

  /* — reveal engine (sub pages) —
     [data-rv]        fades up as one block
     [data-rv="lines"] its .line children rise in one after another (same motion as the home page)
     [data-rv="cell"]  grid cells: every row arrives when it scrolls into view, left → right
     Nothing starts before the page has entered (body.is-ready). */
  let io = null;
  const pending = [];
  function show(batch) {
    const rows = new Map();
    batch.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
    batch.forEach((n) => {
      let d = 0;
      if (n.dataset.rv === 'cell') {
        const key = Math.round(n.getBoundingClientRect().top / 8);
        d = rows.get(key) || 0; rows.set(key, d + 1);
      }
      n.style.setProperty('--d', `${(d * 0.11 + (parseFloat(n.dataset.rvDelay) || 0)).toFixed(2)}s`);
      n.classList.add('is-in');
    });
  }
  RT.reveal = {
    scan(root) {
      const nodes = $$('[data-rv]:not(.is-in)', root || document);
      if (!('IntersectionObserver' in window)) { nodes.forEach((n) => n.classList.add('is-in')); return; }
      if (!io) {
        io = new IntersectionObserver((entries) => {
          const batch = entries.filter((e) => e.isIntersecting).map((e) => e.target);
          batch.forEach((n) => io.unobserve(n));
          if (batch.length) show(batch);
        }, { rootMargin: '0px 0px -7% 0px', threshold: 0.08 });
      }
      if (!document.body.classList.contains('is-ready')) { pending.push(...nodes); return; }
      nodes.forEach((n) => io.observe(n));
    },
    start() { if (io) pending.splice(0).forEach((n) => { if (!n.classList.contains('is-in')) io.observe(n); }); }
  };

  /* Card hover helper: a strip / layer that drifts with the pointer. `apply(x)` gets a smoothed value. */
  RT.follow = function (apply, k) {
    let t = 0, c = 0, raf = 0, prev = 0;
    const loop = (now) => {
      const dt = prev && now ? now - prev : 1000 / 60; prev = now || 0;
      c += (t - c) * RT.damp(k || 0.09, dt); apply(c);
      raf = Math.abs(t - c) > 0.02 ? requestAnimationFrame(loop) : 0;
      if (!raf) { c = t; apply(c); prev = 0; }
    };
    return { set(v, instant) { t = v; if (instant) { c = v; apply(c); } else if (!raf) raf = requestAnimationFrame(loop); }, get value() { return c; } };
  };

  /* Every page opens at the very top — also on reload and when coming back with the browser's
     back button (the browser would otherwise restore the last scroll position). */
  function toTop() {
    window.scrollTo(0, 0);
    if (RT.timeline && RT.timeline.snap) RT.timeline.snap();     // home: no visible rewind through the scenes
  }
  function initTop() {
    try { if ('scrollRestoration' in history) history.scrollRestoration = 'manual'; } catch (e) { /* ignore */ }
    toTop();
    /* A page always opens at the top. Browsers (and embedded previews) sometimes put a previous scroll
       position back while the page is still loading; until the visitor scrolls themselves, any such
       jump is undone in the same frame — before it is painted, so nothing is seen moving. */
    let guard = true;
    const release = () => { guard = false; };
    ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach((t) => window.addEventListener(t, release, { passive: true, capture: true }));
    window.addEventListener('scroll', () => { if (guard && window.scrollY) toTop(); }, { passive: true });
    const settle = () => setTimeout(release, 600);
    if (document.readyState === 'complete') settle(); else window.addEventListener('load', settle);
    setTimeout(release, 8000);
    // Leaving: reset while the page is no longer on screen, so coming back also finds it at the top.
    window.addEventListener('pagehide', toTop);
    window.addEventListener('pageshow', (e) => { if (e.persisted) toTop(); });
  }
  /* Same-page link to the top (the logo on the home page): fade out, reset, fade in — the scroll
     itself is never seen running back. */
  function fadeToTop() {
    if (leaving || window.scrollY < 4) return;
    const body = document.body;
    body.classList.add('is-leaving');
    setTimeout(() => {
      toTop();
      requestAnimationFrame(() => requestAnimationFrame(() => body.classList.remove('is-leaving')));
    }, reduced.matches ? 0 : 440);
  }

  /* Fork cursor — replaces the mouse pointer on every page (RT.data.cursor). The tips of the tines are the hot spot.

     Two ways of drawing it, switched automatically:
       native  the resting fork is a real system cursor (CSS cursor image) → it moves exactly like the normal pointer.
       drawn   a picture moved by the page. Needed where the system cannot do it:
               · while the button is down (the fork turns to `press`, shrinks a touch and springs back), and
               · near the window edges — browsers swap a large cursor image for the plain arrow as soon as it would
                 reach outside the page, so there the page draws the fork itself.
     Without `cursor.native` (or if its picture fails to load) the fork is always drawn by the page. */
  function initFork() {
    const c = RT.data && RT.data.cursor, fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!c || !fine.matches) return;
    const root = document.documentElement, node = document.createElement('div'), img = new Image();
    node.className = 'fork'; node.setAttribute('aria-hidden', 'true');
    img.className = 'fork__img'; img.alt = ''; img.decoding = 'async';
    root.style.setProperty('--fork-h', c.height + 'px');
    root.style.setProperty('--fork-rest', c.rest + 'deg');
    root.style.setProperty('--fork-press', c.press + 'deg');
    root.style.setProperty('--fork-scale', c.pressScale);
    const KEY = 'rt:pointer', MIN = 150, BACK = 380;                 // a quick click still shows the whole dip · time to spring back
    const N = c.native && c.native.size[0] <= 128 && c.native.size[1] <= 128 ? c.native : null;
    let x = 0, y = 0, known = false, ready = false, native = false, busy = false, downAt = 0, timer = 0, mode = '';
    const place = () => { node.style.transform = `translate3d(${x}px,${y}px,0)`; };
    /* would the cursor picture reach past the page? (2px spare) */
    const edge = () => known && (x - N.hot[0] < 2 || y - N.hot[1] < 2 ||
      x - N.hot[0] + N.size[0] > RT.vw() - 2 || y - N.hot[1] + N.size[1] > window.innerHeight - 2);
    function sync() {
      if (!ready) return;
      const next = native && !busy && !edge() ? 'native' : 'drawn';
      if (next !== mode) {
        mode = next;
        root.classList.toggle('fork-native', mode === 'native');
        root.classList.toggle('has-fork', mode === 'drawn');
      }
      node.classList.toggle('is-on', mode === 'drawn' && known && inside);
    }
    let inside = true;
    img.addEventListener('load', () => {                              // the system pointer is only hidden once the fork can be drawn
      node.appendChild(img); document.body.appendChild(node); ready = true;
      try { const s = JSON.parse(sessionStorage.getItem(KEY) || 'null'); if (s) { x = s[0]; y = s[1]; known = true; place(); } } catch (e) { /* private mode */ }
      sync();
    });
    img.src = c.image;
    if (N) {                                                          // the system-drawn fork: 1x picture, 2x where the browser can pick
      const probe = new Image();
      probe.addEventListener('load', () => {
        const abs = (u) => new URL(u, document.baseURI).href;       // absolute: a url() inside a custom property has no reliable base
        const hot = `${N.hot[0]} ${N.hot[1]}, auto`, one = `url("${abs(N.image)}")`;
        const set = `${one} 1x, url("${abs(N.image2x || N.image)}") 2x`;
        const can = (v) => !!(window.CSS && CSS.supports && CSS.supports('cursor', v));
        const value = [`image-set(${set}) ${hot}`, `-webkit-image-set(${set}) ${hot}`].find(can) || `${one} ${hot}`;
        root.style.setProperty('--fork-cursor', value);              // used by html.fork-native in main.css
        native = true; sync();
      });
      probe.src = N.image;
      if (N.image2x) new Image().src = N.image2x;
    }
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      x = e.clientX; y = e.clientY; known = true; inside = x < RT.vw();   // on the window scrollbar the system shows its own arrow
      if (mode !== 'native') place();
      sync();
    }, { passive: true });
    window.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') { inside = false; sync(); return; }
      if (e.clientX >= RT.vw()) { inside = false; sync(); return; }   // a press on the window scrollbar: not a click on the page
      x = e.clientX; y = e.clientY; known = true; inside = true; busy = true; place(); sync();
      clearTimeout(timer); downAt = performance.now();
      node.getBoundingClientRect();                                   // the fork is in place in its resting pose before it starts to turn
      node.classList.add('is-down');
    }, { passive: true });
    const up = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        node.classList.remove('is-down');
        timer = setTimeout(() => { busy = false; place(); sync(); }, BACK);   // sprung back → hand it over to the system again
      }, Math.max(0, MIN - (performance.now() - downAt)));
    };
    window.addEventListener('pointerup', up, { passive: true });
    window.addEventListener('pointercancel', up, { passive: true });
    window.addEventListener('dragend', up, { passive: true });
    root.addEventListener('mouseleave', () => { inside = false; sync(); });
    root.addEventListener('mouseenter', () => { inside = true; sync(); });
    window.addEventListener('resize', sync);
    window.addEventListener('blur', () => { node.classList.remove('is-down'); busy = false; sync(); });
    window.addEventListener('pagehide', () => { if (known) { try { sessionStorage.setItem(KEY, JSON.stringify([x, y])); } catch (e) { /* private mode */ } } });
  }

  /* — wheel & trackpad: the same pace on every device —
     A mouse wheel reports about 100px per notch; a trackpad swipe reports several times that and keeps sending
     momentum after the fingers have left, so the same gesture used to run through far more of a scroll-driven page
     on a laptop. On pages with such a part (a "zone", registered by the home timeline and the designer page) this
     takes the wheel over and moves the page itself (settings: RT.timelineConfig.wheel in js/data.js):
       · inside a zone a trackpad's distance is scaled down (`trackpad`), the page never moves faster than
         `maxSpeed`, and it runs on at most `lead` px after the input stops — a hard flick cannot skip scenes;
       · outside the zones (the details section, the footer) the distance is left as it is, only eased.
     Touch, keyboard, pinch-zoom, sideways scrolling and scrollable boxes inside the page are left to the browser. */
  const zones = [];
  RT.wheel = { zone(fn) { zones.push(fn); } };
  function initWheel() {
    const W = RT.timelineConfig && RT.timelineConfig.wheel;
    if (!W) return;
    let pos = 0, goal = 0, raf = 0, prev = 0, lastSet = 0, kind = 'wheel', lastEvent = 0;
    const active = () => zones.map((fn) => fn()).filter(Boolean);
    const within = (list, y) => list.some((z) => y >= z[0] - 1 && y <= z[1] + 1);
    const maxY = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const scrollsItself = (node) => {
      for (; node && node.nodeType === 1 && node !== document.body && node !== document.documentElement; node = node.parentElement) {
        if (node.scrollHeight > node.clientHeight + 1 && /(auto|scroll)/.test(getComputedStyle(node).overflowY)) return true;
      }
      return false;
    };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; prev = 0; };
    function loop(now) {
      const dt = prev ? now - prev : 1000 / 60; prev = now;
      if (RT.gliding || Math.abs(window.scrollY - lastSet) > 3) { stop(); return; }   // something else moved the page: hand over
      let step = (goal - pos) * RT.damp(W.ease || 0.16, dt);
      if (W.maxSpeed && within(active(), pos)) { const m = (W.maxSpeed * Math.min(dt, 100)) / 1000; step = clamp(step, -m, m); }
      pos += step;
      if (Math.abs(goal - pos) < 0.5) pos = goal;
      window.scrollTo(0, pos); lastSet = window.scrollY;
      if (pos === goal) { stop(); return; }
      raf = requestAnimationFrame(loop);
    }
    window.addEventListener('wheel', (e) => {
      if (document.body.classList.contains('menu-open')) { stop(); if (e.cancelable) e.preventDefault(); return; }   // nothing scrolls under the open menu
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || reduced.matches) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || scrollsItself(e.target)) return;
      const list = active();
      if (!list.length) return;                                    // no scroll-driven part on this page (or phone layout)
      if (RT.gliding) { stop(); if (e.cancelable) e.preventDefault(); return; }   // the intro ⇄ main glide owns the page
      if (!e.cancelable) { stop(); return; }                       // the browser is already scrolling this gesture itself
      e.preventDefault();
      const now = performance.now();
      // mouse wheel or trackpad? A wheel reports whole notches (wheelDelta in steps of 120, or lines / pages);
      // decided at the start of a gesture and kept for as long as its events keep coming.
      if (now - lastEvent > 150) { const wd = Math.abs(e.wheelDeltaY || 0); kind = e.deltaMode !== 0 || (wd >= 120 && wd % 120 === 0) ? 'wheel' : 'pad'; }
      lastEvent = now;
      let d = e.deltaY * (e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? window.innerHeight * 0.9 : 1);
      if (!raf || Math.abs(window.scrollY - lastSet) > 3) { pos = goal = lastSet = window.scrollY; }
      const zoned = within(list, pos);
      if (zoned && kind === 'pad') d *= W.trackpad == null ? 1 : W.trackpad;
      goal = clamp(goal + d, 0, maxY());
      if (zoned && W.lead) goal = clamp(goal, pos - W.lead, pos + W.lead);
      if (!raf) raf = requestAnimationFrame(loop);
    }, { passive: false });
  }

  RT.chrome = {
    init() {
      initTop();
      setScale();
      window.addEventListener('resize', setScale);
      // The window scrollbar takes its width from the page the moment the content becomes taller than the window —
      // without a resize event. Follow the real page width, and let every module measure again.
      if (window.ResizeObserver) {
        let seen = RT.vw();
        new ResizeObserver(() => {
          const now = RT.vw();
          if (now === seen) return;
          seen = now; setScale(); window.dispatchEvent(new Event('resize'));
        }).observe(document.documentElement);
      }
      initMenu(); initFooter(); initLinks(); initFork(); initWheel();
    },
    /* Sub pages: call once the page content has been rendered. */
    enter() {
      const body = document.body;
      const begin = () => {
        if (body.classList.contains('is-ready')) return;
        body.classList.add('is-ready');
        RT.reveal.start();
        window.dispatchEvent(new Event('rt:enter'));
      };
      RT.reveal.scan();
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      const fonts = RT.fonts.caesuraReady().then((ok) => { if (!ok) RT.fonts.applyTitleArt(); });
      Promise.race([fonts, wait(1200)]).then(() => requestAnimationFrame(() => requestAnimationFrame(begin)));
    }
  };
})();
