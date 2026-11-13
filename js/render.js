/* ==========================================================================
   render.js — builds the home page DOM from RT.data (no content is hard-coded in HTML)
   Menu, footer and the title lettering fallback are shared with the sub pages → js/chrome.js
   ========================================================================== */
(function () {
  const RT = window.RT;
  const get = (path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), RT.data);
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* Reusable line-by-line text: one <span class="line"> per array item, indexed for the stagger. */
  function renderLines() {
    const counters = new Map();
    document.querySelectorAll('[data-lines]').forEach((node) => {
      const scope = node.dataset.group || node.closest('[data-reveal]') || node;
      let i = counters.get(scope) || 0;
      (get(node.dataset.lines) || []).forEach((text) => {
        const body = text === '' ? '&nbsp;' : esc(text);
        const line = el('span', 'line', node.hasAttribute('data-art') ? `<span class="tl">${body}</span>` : body);
        line.style.setProperty('--i', i++);
        node.appendChild(line);
      });
      counters.set(scope, i);
    });
  }

  function renderSimple() {
    document.querySelectorAll('[data-text]').forEach((n) => { n.textContent = get(n.dataset.text); });
    document.querySelectorAll('[data-src]').forEach((n) => { n.src = get(n.dataset.src); });
    const org = document.querySelector('[data-footer-org]');
    RT.data.footer.org.forEach((t) => org.appendChild(el('span', '', esc(t))));
    const film = RT.data.film;
    const video = document.querySelector('[data-film-video]');
    video.poster = film.poster; video.src = film.src;
    document.querySelector('[data-film-badge]').hidden = !film.placeholder;
  }

  /* Dishes: a lit cut-out (photo masked by the dish alpha) + an elliptical hit target. */
  function renderDishes() {
    const host = document.querySelector('[data-dishes]');
    RT.data.dishes.forEach((d) => {
      const lit = el('div', 'dish-lit');
      lit.dataset.dish = d.id;
      lit.style.cssText = `left:${d.x}%;top:${d.y}%;width:${d.w}%;height:${d.h}%;` +
        `background-image:url("${RT.data.main.image}");` +
        `background-size:${10000 / d.w}% ${10000 / d.h}%;` +
        `background-position:${(d.x / (100 - d.w)) * 100}% ${(d.y / (100 - d.h)) * 100}%;`;
      lit.style.setProperty('-webkit-mask-image', `url("${d.mask}")`);
      lit.style.setProperty('mask-image', `url("${d.mask}")`);
      host.appendChild(lit);
    });
    RT.data.dishes.forEach((d) => {                              // numbered labels (Figma "메인")
      if (!d.badge) return;
      const no = el('span', 'dish-no', esc(d.no));
      no.dataset.dish = d.id; no.setAttribute('aria-hidden', 'true');
      no.style.cssText = `left:${d.badge[0]}%;top:${d.badge[1]}%;--i:${parseInt(d.no, 10) - 1};`;
      host.appendChild(no);
    });
    RT.data.dishes.forEach((d) => {
      const hit = el('button', 'dish-hit');
      hit.type = 'button';
      hit.dataset.dish = d.id;
      hit.setAttribute('aria-label', `${d.title} — ${d.meta}`);
      const padX = d.w * 0.04, padY = d.h * 0.1;
      hit.style.cssText = `left:${d.x - padX}%;top:${d.y - padY}%;width:${d.w + padX * 2}%;height:${d.h + padY * 2}%;`;
      host.appendChild(hit);
    });
  }

  function renderAccordion() {
    const host = document.querySelector('[data-accordion]');
    RT.data.offline.groups.forEach((g, idx) => {
      const id = `acc-panel-${idx}`;
      const item = el('div', 'acc-item');
      const blocks = g.content.map((b) => {
        if (b.type === 'rows') {
          return `<div class="info">` + b.rows.map((r) => `<div class="info-row"><span class="info-row__label">${esc(r.label)}</span><span class="info-row__lines">` +
            r.lines.map((l) => `<span>${esc(l)}</span>`).join('') + (r.note || []).map((l) => `<span class="info-row__note">${esc(l)}</span>`).join('') + `</span></div>`).join('') + `</div>`;
        }
        if (b.type === 'map') {
          const [t, r, bo, l] = b.bleed || [0, 0, 0, 0];             // the picture is a little larger than the map's own box
          return `<div class="acc-map" style="--w:${b.w + l + r};--ar:${b.w + l + r} / ${b.h + t + bo};--x:${(b.x || 0) - l};--t:${-t};--b:${-bo}">` +
            `<img src="${esc(b.src)}" alt="${esc(b.alt || '')}" loading="lazy" decoding="async"></div>`;
        }
        return `<div class="acc-text">${b.lines.map((l) => `<p>${esc(l)}</p>`).join('')}</div>`;
      }).join('');
      item.innerHTML =
        `<button class="acc-head" type="button" aria-expanded="false" aria-controls="${id}">` +
          `<span class="acc-head__num">${String(idx + 1).padStart(2, '0')}</span>` +
          `<span><span class="acc-head__title"><span class="tl">${esc(g.title)}</span></span><span class="acc-head__sub">${esc(g.sub)}</span></span>` +
          `<img class="acc-head__arrow" src="assets/img/arrow-down.png" alt="">` +
        `</button>` +
        `<div class="acc-panel" id="${id}" role="region"><div class="acc-panel__clip"><div class="acc-panel__content">${blocks}</div></div></div>`;
      host.appendChild(item);
    });
  }

  /* Marquee: the logo set is rendered twice so the -50% loop is seamless. */
  function renderMarquee() {
    const host = document.querySelector('[data-marquee]');
    const { logos, secondsPerLogo } = RT.data.partners;
    const track = el('div', 'marquee__track');
    const minSets = 2;
    for (let s = 0; s < minSets; s++) {
      const set = el('div', 'marquee__set');
      if (s > 0) set.setAttribute('aria-hidden', 'true');
      logos.forEach((l) => {
        let node;
        if (l.src) {
          node = el('img', 'marquee__logo'); node.src = l.src; node.alt = l.name; node.loading = 'lazy';
        } else {
          node = el('span', 'marquee__ph', `LOGO<br>${esc(l.name)}`); node.style.setProperty('--w', l.w || 140);
        }
        node.style.setProperty('--h', l.h);
        set.appendChild(node);
      });
      track.appendChild(set);
    }
    host.style.setProperty('--marquee-duration', `${logos.length * secondsPerLogo}s`);
    host.appendChild(track);
  }

  RT.render = function () { renderLines(); renderSimple(); renderDishes(); renderAccordion(); renderMarquee(); };
})();
