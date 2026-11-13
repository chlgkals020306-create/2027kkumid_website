/* ==========================================================================
   pages.js — the sub pages. <body data-page="…"> picks the builder:
     designers · designer · work · introduce · works · group
   Content comes from js/data-site.js (RT.site); shared behaviour from js/chrome.js.
   ========================================================================== */
(function () {
  const RT = window.RT, S = RT.site;
  const { $, $$, el, esc } = RT.dom;
  const { clamp, lerp, seg, ease } = RT.util;
  const flow = window.matchMedia('(max-width: 860px), (max-aspect-ratio: 1/1)');   // same query as css/pages.css › 9
  const pad = (n) => String(n).padStart(2, '0');

  /* — shared builders — */
  function head(copy) {
    const t = $('[data-title]'), b = $('[data-body]');
    if (t && copy.title) { RT.lines(t, copy.title, true); if (copy.title.length > 1) t.classList.add('t-page--two'); }
    if (b && copy.body) RT.lines(b, copy.body);
  }
  function card(o) {
    const n = el(o.href ? 'a' : 'div', 'card' + (o.href ? '' : ' card--static'));
    if (o.href) n.href = o.href; else n.tabIndex = 0;
    n.dataset.rv = 'cell';
    const media = o.img
      ? `<img src="${esc(o.img)}" alt="" loading="lazy" decoding="async" style="object-position:${o.pos == null ? 50 : o.pos}% 50%">`
      : `<span class="card__ph">${esc(o.ph || '')}</span>`;
    n.innerHTML =
      `<span class="card__media">${media}</span><span class="card__shade"></span>` +
      `<span class="card__info"><strong>${esc(o.title)}</strong>${o.sub ? `<span>${esc(o.sub)}</span>` : ''}</span>`;
    n.setAttribute('aria-label', o.sub ? `${o.title} — ${o.sub}` : o.title);
    return n;
  }
  /* Search box: filters the grid while typing; Enter opens the best match. */
  function search(copy, entries, direct) {
    const host = $('[data-search]');
    if (!host) return;
    host.innerHTML =
      `<form class="search__field" role="search"><input type="search" placeholder="${esc(copy.search)}" aria-label="${esc(copy.search)}" autocomplete="off" spellcheck="false">` +
      `<button class="search__btn" type="submit" aria-label="검색"><img src="assets/img/search.svg" alt=""></button></form>` +
      `<p class="search__hint"><img src="assets/img/alert.svg" alt="">${esc(copy.searchHint)}</p>`;
    const input = $('input', host), grid = $('[data-grid]');
    const empty = el('p', 'grid__empty', '검색 결과가 없습니다.'); empty.hidden = true; grid.appendChild(empty);
    const norm = (s) => s.toLowerCase().replace(/\s+/g, '');
    const matches = () => { const q = norm(input.value); return entries.filter((e) => !q || norm(e.text).includes(q)); };
    input.addEventListener('input', () => {
      const hit = new Set(matches());
      entries.forEach((e) => { e.node.hidden = !hit.has(e); });
      empty.hidden = hit.size > 0;
    });
    $('form', host).addEventListener('submit', (ev) => {
      ev.preventDefault();
      const q = norm(input.value);
      if (!q) return;
      const to = (direct && direct(q)) || (matches()[0] || {}).href;
      if (to) RT.go(to);
    });
  }
  const designerHref = (id) => `designer.html#${encodeURIComponent(id)}`;
  const workHref = (id) => `work.html#${encodeURIComponent(id)}`;

  /* ——————————————————————————————————————————————————————————————————
     DESIGNERS (Figma "designer")
     —————————————————————————————————————————————————————————————————— */
  function designers() {
    head(S.copy.designers);
    const grid = $('[data-grid]');
    const entries = S.designers.map((d) => {
      const node = card({ href: designerHref(d.id), img: d.image, pos: d.pos, title: d.name, sub: d.en.join(' ') });
      grid.appendChild(node);
      return { node, href: designerHref(d.id), text: `${d.name} ${d.en.join('')}` };
    });
    search(S.copy.designers, entries);
  }

  /* ——————————————————————————————————————————————————————————————————
     DESIGNER (Figma "designer_profile" → "designer_interview" → "designer_works")
     One pinned screen; `p` = scroll progress in viewport heights.
     —————————————————————————————————————————————————————————————————— */
  const DZ = {
    end: 4.3,                     // pinned length; the footer follows after it
    smoothing: 0.1,
    textOut:  [0.2, 0.85],        // profile texts leave, line by line
    photo:    [0.4, 1.3],         // 513 × 513 → 635 × 750 (the photo itself never disappears here)
    qaIn:     [1.0, 1.8],         // interview rows arrive
    qaOut:    [2.4, 2.95],        // … and leave, one after another
    photoOut: [2.7, 3.1],         // the photo goes last → white
    worksIn:  [3.3, 4.0]          // works build in on the white ground
  };
  function designer() {
    const d = S.get.designer(S.param('id')) || S.designers[0];
    document.title = `${d.name} | ${RT.data.siteName}`;
    const stage = $('[data-dz-stage]'), track = $('[data-dz-track]');
    const works = S.get.worksOf(d.id);
    let i = 0;
    const line = (html) => `<span class="dz-l"><span class="line" style="--i:${i++}">${html}</span></span>`;
    stage.innerHTML =
      `<div class="dz__photo" data-photo><img src="${esc(d.image)}" alt="${esc(d.name)}" decoding="async" style="object-position:${d.pos}% 50%"></div>` +
      `<h1 class="dz__name" aria-label="${esc(d.en.join(' '))}">${d.en.map((t) => line(`<span class="tl">${esc(t)}</span>`)).join('')}</h1>` +
      `<p class="dz__intro">${d.intro.map((t) => line(esc(t))).join('')}</p>` +
      `<dl class="dz__contact">` +
        S.contactsOf(d)
          .map(([k, v, href]) => { const n = i++; return `<div class="dz-l"><dt class="line" style="--i:${n}">${esc(k)}</dt><dd class="line" style="--i:${n}">${href ? `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(v)}</a>` : esc(v)}</dd></div>`; }).join('') +
      `</dl>` +
      `<dl class="dz__interview">${S.copy.questions.map((q, n) => (d.answers[n] ? `<div class="dz__qa"><dt>${esc(q)}</dt><dd>${esc(d.answers[n])}</dd></div>` : '')).join('')}</dl>` +
      `<section class="dz__works" data-works aria-label="Works">` +
        `<div class="dz__bar" data-bar role="scrollbar" aria-orientation="horizontal" aria-controls="dz-strip" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="dz__thumb" data-thumb></span></div>` +
        `<div class="dz__strip" id="dz-strip" data-strip>` +
          works.map((w, n) => `<a class="wcard" href="${workHref(w.id)}">` +
            `<span class="wcard__name">${esc(S.get.designersOf(w).map((x) => x.name).join(' · '))}</span><span class="wcard__title">${esc(w.title)}</span><span class="wcard__group">${esc(S.get.subjectOf(w))}</span>` +
            `<span class="wcard__media"><span class="card__media">${w.thumb ? `<img src="${esc(w.thumb)}" alt="" loading="lazy" decoding="async">` : `<span class="card__ph">${pad(n + 1)}</span>`}</span><span class="card__shade"></span></span>` +
          `</a>`).join('') +
        `</div>` +
      `</section>`;

    const photo = $('[data-photo]', stage), outs = $$('.dz-l', stage), qa = $$('.dz__qa', stage);
    const worksBox = $('[data-works]', stage), bar = $('[data-bar]', stage), thumb = $('[data-thumb]', stage), strip = $('[data-strip]', stage), cards = $$('.wcard', stage);
    track.style.setProperty('--dz-screens', DZ.end + 1);

    let u = 1, vw = 0, vh = 0, top = 0, target = 0, current = 0, drawn = -1, dirty = true, live = false;
    let max = 0, barW = 0, thumbW = 0;
    const stagger = (t, n, count, k) => { const w = 1 / (1 + (count - 1) * k); return clamp((t - n * k * w) / w); };

    /* works strip: follows the pointer left / right; the bar above it is its scrollbar */
    const pan = RT.follow((x) => {
      strip.style.transform = `translate3d(${(-x * max).toFixed(1)}px,0,0)`;
      thumb.style.transform = `translate3d(${(x * (barW - thumbW)).toFixed(1)}px,0,0)`;
      bar.setAttribute('aria-valuenow', Math.round(x * 100));
    }, 0.085);
    function measure() {
      vw = window.innerWidth; vh = window.innerHeight;
      u = Math.min(vw / 1293, vh / 850);
      top = track.getBoundingClientRect().top + window.scrollY;
      const gutter = RT.gutter();
      const total = strip.scrollWidth + gutter, visible = vw - 287 * u;
      const overflow = Math.max(0, total - visible), nudge = 96 * u;
      // Three works usually fit on screen. The row still follows the pointer a little (at least `nudge`),
      // and the bar above it travels with it — thumb length as drawn in Figma (719 of 1033).
      max = Math.max(overflow, nudge);
      barW = bar.clientWidth; thumbW = barW * (overflow > nudge ? clamp(visible / total, 0.18, 0.9) : 719 / 1033);
      thumb.style.width = thumbW.toFixed(1) + 'px';
      pan.set(pan.value, true);
      dirty = true;
    }

    function draw(p) {
      // profile texts → out, one line after another
      const tOut = seg(p, DZ.textOut);
      outs.forEach((n, k) => {
        const v = ease.sine(stagger(tOut, k, outs.length, 0.45));
        n.style.opacity = (1 - v).toFixed(3);
        n.style.transform = `translate3d(0,${(-v * 60).toFixed(2)}%,0)`;
        n.style.pointerEvents = v > 0.5 ? 'none' : '';
      });
      // photo: stays, only its size and ratio change; it leaves last
      const t = ease.inOut(seg(p, DZ.photo)), gone = seg(p, DZ.photoOut);
      photo.style.top = (lerp(91, 95, t) * u).toFixed(1) + 'px';
      photo.style.width = (lerp(513, 635, t) * u).toFixed(1) + 'px';
      photo.style.height = (lerp(513, 750, t) * u).toFixed(1) + 'px';
      photo.style.opacity = (1 - ease.sine(gone)).toFixed(3);
      photo.style.visibility = gone >= 1 ? 'hidden' : '';
      // interview rows
      const tIn = seg(p, DZ.qaIn), tGo = seg(p, DZ.qaOut);
      qa.forEach((n, k) => {
        const v = ease.out(stagger(tIn, k, qa.length, 0.55)), o = ease.sine(stagger(tGo, k, qa.length, 0.55));
        n.style.opacity = (v * (1 - o)).toFixed(3);
        n.style.transform = `translate3d(0,${(((1 - v) * 44 - o * 30) * u).toFixed(1)}px,0)`;
      });
      // works
      const tw = seg(p, DZ.worksIn);
      worksBox.style.visibility = tw > 0 ? 'visible' : 'hidden';
      bar.style.opacity = ease.out(clamp(tw / 0.45)).toFixed(3);
      cards.forEach((n, k) => {
        const v = ease.out(stagger(clamp((tw - 0.1) / 0.9), Math.min(k, 4), Math.min(cards.length, 5), 0.5));
        n.style.opacity = v.toFixed(3);
        n.style.transform = `translate3d(0,${((1 - v) * 56 * u).toFixed(1)}px,0)`;
      });
      live = tw > 0.7;
      worksBox.style.pointerEvents = live ? '' : 'none';
    }
    function clear() { [photo, bar, worksBox, strip, ...outs, ...qa, ...cards].forEach((n) => n.removeAttribute('style')); drawn = -1; }
    function frame() {
      if (flow.matches) { if (drawn !== -2) { clear(); drawn = -2; } requestAnimationFrame(frame); return; }
      if (drawn === -2) { measure(); drawn = -1; }
      target = clamp((window.scrollY - top) / vh, 0, DZ.end);
      const k = RT.env.reduced.matches ? 1 : DZ.smoothing;
      current = Math.abs(target - current) < 0.0006 ? target : current + (target - current) * k;
      if (current !== drawn || dirty) { draw(current); drawn = current; dirty = false; }
      requestAnimationFrame(frame);
    }

    stage.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch' || !live || dragging || flow.matches) return;
      pan.set(clamp((e.clientX / vw - 0.22) / 0.62));
    });
    let dragging = false;
    const fromBar = (e) => pan.set(clamp((e.clientX - bar.getBoundingClientRect().left - thumbW / 2) / Math.max(1, barW - thumbW)));
    bar.addEventListener('pointerdown', (e) => { dragging = true; bar.setPointerCapture(e.pointerId); fromBar(e); });
    bar.addEventListener('pointermove', (e) => { if (dragging) fromBar(e); });
    ['pointerup', 'pointercancel'].forEach((t) => bar.addEventListener(t, () => { dragging = false; }));
    cards.forEach((c, k) => c.addEventListener('focus', () => { if (cards.length > 1) pan.set(k / (cards.length - 1)); }));
    let sx = 0, sp = 0;                                            // touch: drag the strip itself
    strip.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sp = pan.value; }, { passive: true });
    strip.addEventListener('touchmove', (e) => { if (max && !flow.matches) pan.set(clamp(sp - (e.touches[0].clientX - sx) / max), true); }, { passive: true });

    measure();
    target = clamp((window.scrollY - top) / vh, 0, DZ.end); current = target;
    let raf = 0;
    const remeasure = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    window.addEventListener('resize', remeasure);
    window.addEventListener('load', remeasure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(remeasure);
    requestAnimationFrame(frame);
  }

  /* ——————————————————————————————————————————————————————————————————
     WORK (Figma "works_detail")
     —————————————————————————————————————————————————————————————————— */
  function work() {
    const w = S.get.work(S.param('id')) || S.works[0];
    const team = S.get.designersOf(w);
    document.title = `${w.title} — ${team.map((d) => d.name).join(', ')} | ${RT.data.siteName}`;
    /* head: one row per designer — name (link to the profile) · contact */
    const head = $('.work-head');
    head.innerHTML = '';
    team.forEach((d, k) => {
      const name = el(k ? 'p' : 'h1', 'work-head__name', `<a href="${designerHref(d.id)}" aria-label="${esc(d.name)} 프로필"></a>`);
      RT.lines(name.firstChild, [d.en.join(' ')], true);
      name.dataset.rv = 'lines';
      const contact = el('dl', 'work-head__contact', S.contactsOf(d)
        .map(([key, v, href], n) => `<div class="lines"><dt class="line" style="--i:${n + 1}">${esc(key)}</dt><dd class="line" style="--i:${n + 1}">${href ? `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(v)}</a>` : esc(v)}</dd></div>`).join(''));
      contact.dataset.rv = 'lines'; contact.dataset.rvDelay = '0.1';
      if (k) { name.dataset.rvDelay = (0.08 * k).toFixed(2); contact.dataset.rvDelay = (0.1 + 0.08 * k).toFixed(2); }
      head.append(name, contact);
    });
    head.classList.toggle('work-head--team', team.length > 1);
    /* media: title image first, then the sub images in order — edge to edge, no gaps, each at its own proportions */
    const media = $('[data-media]');
    const add = (html, cls) => { const fig = el('div', 'work-media__item' + (cls ? ' ' + cls : ''), html); fig.dataset.rv = 'fade'; media.appendChild(fig); return fig; };
    if (w.images.length) {
      w.images.forEach((src, n) => {
        const img = $('img', add(`<img src="${esc(src)}" alt="${esc(w.title)} ${n + 1}" loading="${n ? 'lazy' : 'eager'}" decoding="async">`));
        const fit = () => { if (img.naturalWidth) img.parentNode.style.setProperty('--ar', `${img.naturalWidth} / ${img.naturalHeight}`); };
        if (img.complete) fit(); else img.addEventListener('load', fit, { once: true });
      });
    } else if (w.thumb) {                                           // only a thumbnail was handed in → shown as a poster
      add(`<img src="${esc(w.thumb)}" alt="${esc(w.title)}" decoding="async">`, 'work-media__item--poster');
    } else {
      Array(S.workImages).fill(0).forEach((_, n) => add(`<div class="work-media__ph"><b>${pad(n + 1)}</b><span>${esc(w.title)} · 16 : 9 작품 이미지 자리</span></div>`));
    }
  }

  /* ——————————————————————————————————————————————————————————————————
     INTRODUCE (Figma "introduce")
     —————————————————————————————————————————————————————————————————— */
  function introduce() {
    head(S.copy.introduce);
    /* Professors (Figma "introduce"): all portraits rest small. Only the portrait under the pointer grows
       and shows its caption; when the pointer is on none of them, none is large. */
    const strip = $('[data-prof-strip]');
    const items = S.professors.map((p) => {
      const node = el('div', 'prof__item');
      node.tabIndex = 0;
      node.setAttribute('aria-label', `${p.name} — ${p.subject}`);
      node.innerHTML =
        `<div class="prof__pic">${p.image ? `<img src="${esc(p.image)}" alt="" decoding="async"${p.pos ? ` style="object-position:${p.pos}"` : ''}>` : ''}</div>` +
        `<div class="prof__label"><strong>${esc(p.name)}</strong><span>${esc(p.subject)}</span></div>`;
      strip.appendChild(node);
      return node;
    });
    const rest = S.professors.findIndex((p) => p.featured);
    const activate = (n) => items.forEach((it, k) => it.classList.toggle('is-on', k === n));
    let back = 0;                                                  // crossing the gap between two portraits must not flash the rest state
    const leave = () => { clearTimeout(back); back = setTimeout(() => activate(rest), 140); };
    items.forEach((it, n) => {
      it.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'touch') { clearTimeout(back); activate(n); } });
      it.addEventListener('pointerleave', (e) => { if (e.pointerType !== 'touch') leave(); });
      it.addEventListener('click', () => { clearTimeout(back); activate(n); });
      it.addEventListener('focus', () => { if (it.matches(':focus-visible')) { clearTimeout(back); activate(n); } });
      it.addEventListener('blur', leave);
    });
    activate(rest);

    /* committee */
    const c = S.copy.committee;
    RT.lines($('[data-ctitle]'), c.title, true);
    RT.lines($('[data-cbody]'), c.body);
    const grid = $('[data-grid]'), tabs = $('[data-filters]');
    const roleLabel = { chair: '위원장', member: '위원' };
    const cards = S.committee.map((m) => {
      const node = card({ href: m.designer ? designerHref(m.designer) : null, img: m.image, pos: m.pos, title: m.name, sub: m.part || roleLabel[m.role] || '' });
      node.dataset.role = m.role;
      grid.appendChild(node);
      return node;
    });
    c.filters.forEach((f, n) => {
      const b = el('button', 'filter', esc(f.label));
      b.type = 'button'; b.dataset.filter = f.id; b.setAttribute('aria-pressed', String(n === 0));
      tabs.appendChild(b);
    });
    tabs.addEventListener('click', (e) => {
      const b = e.target.closest('.filter');
      if (!b || b.getAttribute('aria-pressed') === 'true') return;
      $$('.filter', tabs).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      cards.forEach((n) => { n.hidden = !(b.dataset.filter === 'all' || n.dataset.role === b.dataset.filter); n.classList.remove('is-in'); });
      void grid.offsetWidth;                                       // restart the row-by-row reveal for the new set
      RT.reveal.scan(grid);
    });
  }

  /* ——————————————————————————————————————————————————————————————————
     WORKS (Figma "works_1") and one subject (Figma "works_2")
     —————————————————————————————————————————————————————————————————— */
  function works() {
    head(S.copy.works);
    const list = $('[data-list]');
    S.groups.forEach((g) => {
      const row = el('a', 'wrow');
      row.href = `works-group.html#${encodeURIComponent(g.id)}`;
      row.innerHTML =
        `<span class="wrow__rule" data-rv="rule"></span>` +
        `<div class="wrow__title" data-rv="cell"><strong>${esc(g.ko)}</strong><span>지도교수 | ${esc(g.professor)}</span></div>` +
        `<div class="wrow__desc" data-rv="cell">${g.desc.map((t) => `<p>${esc(t)}</p>`).join('')}</div>` +
        `<div class="wrow__media" data-rv="cell"><img src="${esc(g.cover)}" alt="" loading="lazy" decoding="async"></div>`;
      list.appendChild(row);
    });
  }
  function group() {
    const g = S.get.group(S.param('g')) || S.get.group('smartphone') || S.groups[0];
    document.title = `${g.ko} | ${RT.data.siteName}`;
    head({ title: g.en });
    $('[data-title]').setAttribute('aria-label', `${g.en.join(' ')} — ${g.ko}`);
    const grid = $('[data-grid]');
    const entries = S.get.worksIn(g.id).map((w, n) => {
      const team = S.get.designersOf(w);
      const node = card({ href: workHref(w.id), img: w.thumb, ph: pad(n + 1), title: w.title, sub: team.map((d) => d.name).join(' · ') });
      grid.appendChild(node);
      return { node, href: workHref(w.id), text: `${w.title} ${team.map((d) => `${d.name} ${d.en.join('')}`).join(' ')} ${w.subject || ''}` };
    });
    const norm = (s) => s.toLowerCase().replace(/\s+/g, '');
    search(S.copy.group, entries, (q) => {                         // an exact designer name jumps straight to the profile
      const d = S.designers.find((x) => norm(x.name) === q || norm(x.en.join('')) === q);
      return d ? designerHref(d.id) : null;
    });
  }

  const builders = { designers, designer, work, introduce, works, group };
  // designer / work / subject pages are chosen by the "#…" part: when only that changes, build the page again
  window.addEventListener('hashchange', () => window.location.reload());
  const page = document.body.dataset.page;
  if (builders[page]) builders[page]();
  RT.chrome.init();
  RT.chrome.enter();
})();
