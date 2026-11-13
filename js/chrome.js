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
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
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
  RT.px = () => Math.min(window.innerWidth / 1293, window.innerHeight / 850);
  RT.gutter = () => Math.max(20 * (phone.matches ? 1 : 0.6), 40 * RT.px());            // = --gutter
  RT.navScale = () => (phone.matches ? 1 : Math.max(0.6, RT.px()));
  function setScale() { document.documentElement.style.setProperty('--nk', RT.navScale().toFixed(4)); }

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

    function loop() {                                            // the lines follow the pointer up and down only
      cy += (ty - cy) * 0.075;
      rows.forEach((row, i) => { row.style.transform = `translate3d(0,${(cy * depth[i % depth.length]).toFixed(2)}px,0)`; });
      raf = open || Math.abs(ty - cy) > 0.05 ? requestAnimationFrame(loop) : 0;
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
      // home: the bar may have to move to its regular inset (js/timeline.js) — let the button glide there
      const glide = () => { toggle.classList.add('is-shifting'); setTimeout(() => toggle.classList.remove('is-shifting'), 650); };
      if (open) {
        toggle.style.color = 'rgb(15,7,2)';
        if (logo) logo.style.backgroundColor = 'rgb(255,97,10)';
        if (RT.timeline && RT.timeline.refresh && !instant) { glide(); RT.timeline.refresh(); }
        if (!raf) raf = requestAnimationFrame(loop);
      } else {
        ty = 0;
        const restore = () => {
          if (open) return;
          toggle.style.color = '';
          if (RT.timeline && RT.timeline.refresh) { if (!instant) glide(); RT.timeline.refresh(); }
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
    let t = 0, c = 0, raf = 0;
    const loop = () => { c += (t - c) * (k || 0.09); apply(c); raf = Math.abs(t - c) > 0.02 ? requestAnimationFrame(loop) : 0; if (!raf) { c = t; apply(c); } };
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
     Rest: turned by `rest`; while the button is down: turned to `press` and a touch smaller, then it springs back.
     The last position is remembered across page changes so the fork is there before the mouse moves again. */
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
    const KEY = 'rt:pointer', MIN = 150;                             // a quick click still shows the whole dip
    let x = 0, y = 0, known = false, downAt = 0, timer = 0;
    const place = () => { node.style.transform = `translate3d(${x}px,${y}px,0)`; };
    const show = () => { if (known) node.classList.add('is-on'); };
    const hide = () => node.classList.remove('is-on');
    img.addEventListener('load', () => {                              // the system pointer is only hidden once the fork can be drawn
      node.appendChild(img); document.body.appendChild(node); root.classList.add('has-fork');
      try { const s = JSON.parse(sessionStorage.getItem(KEY) || 'null'); if (s) { x = s[0]; y = s[1]; known = true; place(); show(); } } catch (e) { /* private mode */ }
    });
    img.src = c.image;
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      x = e.clientX; y = e.clientY; known = true; place(); show();
    }, { passive: true });
    window.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') { hide(); return; }
      x = e.clientX; y = e.clientY; known = true; place(); show();
      clearTimeout(timer); downAt = performance.now(); node.classList.add('is-down');
    }, { passive: true });
    const up = () => { clearTimeout(timer); timer = setTimeout(() => node.classList.remove('is-down'), Math.max(0, MIN - (performance.now() - downAt))); };
    window.addEventListener('pointerup', up, { passive: true });
    window.addEventListener('pointercancel', up, { passive: true });
    window.addEventListener('dragend', up, { passive: true });
    root.addEventListener('mouseleave', hide);
    root.addEventListener('mouseenter', show);
    window.addEventListener('blur', () => node.classList.remove('is-down'));
    window.addEventListener('pagehide', () => { if (known) { try { sessionStorage.setItem(KEY, JSON.stringify([x, y])); } catch (e) { /* private mode */ } } });
  }

  RT.chrome = {
    init() {
      initTop();
      setScale();
      window.addEventListener('resize', setScale);
      initMenu(); initFooter(); initLinks(); initFork();
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
