/* ==========================================================================
   dishes.js — Scene 02 interaction
   Mouse  : hovering a dish dims the table, keeps that dish lit and shows a card
            that follows the pointer.
   Touch  : tap a dish to pin the card above it; tap elsewhere to dismiss.
   Keyboard: dishes are buttons — focus shows the same pinned card.
   The card never receives pointer events.
   ========================================================================== */
(function () {
  const RT = window.RT;
  const $ = (s) => document.querySelector(s);

  RT.dishes = {
    init() {
      const main = $('[data-scene="main"]'), card = $('[data-dish-card]');
      const img = $('[data-dish-card-img]'), title = $('[data-dish-card-title]'), meta = $('[data-dish-card-meta]');
      const hits = [...document.querySelectorAll('.dish-hit')], lit = [...document.querySelectorAll('.dish-lit')];
      const byId = new Map(RT.data.dishes.map((d) => [d.id, d]));
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
      const LIVE = RT.timelineConfig.mainLive;                    // timeline range where the table is interactive
      let active = null, pinned = false, lastPointer = 'mouse';
      let px = 0, py = 0, cx = 0, cy = 0, tx = 0, ty = 0, raf = 0;

      const setHint = () => { $('[data-main-hint]').textContent = fine.matches ? RT.data.ui.hintHover : RT.data.ui.hintTouch; };
      setHint(); fine.addEventListener && fine.addEventListener('change', setHint);
      RT.data.dishes.forEach((d) => { const pre = new Image(); pre.src = d.image; });   // no pop-in on first hover

      /* The card sits just above the hovered dish, left-aligned a little inside it (as in the Figma
         frame "메인_인터렉션"), and leans a few pixels toward the pointer. No room above → beside it. */
      function aim(hit) {
        const cw = card.offsetWidth, ch = card.offsetHeight, vw = RT.vw(), vh = window.innerHeight;
        const r = hit.getBoundingClientRect(), gap = Math.max(14, vh * 0.028);
        tx = r.left + r.width * 0.14;
        ty = r.top - ch - gap;
        if (ty < 84) {                                            // dishes at the far end of the table
          ty = Math.max(84, r.top + r.height / 2 - ch * 0.5);
          tx = r.right + gap;
          if (tx + cw > vw - 16) tx = r.left - cw - gap;
        }
        if (!pinned) { tx += (px - (r.left + r.width / 2)) * 0.12; ty += (py - (r.top + r.height / 2)) * 0.12; }
        tx = Math.max(16, Math.min(vw - cw - 16, tx));
        ty = Math.max(16, Math.min(vh - ch - 16, ty));
      }
      let prev = 0;
      function loop(now) {
        const k = RT.damp(0.16, prev && now ? now - prev : 1000 / 60); prev = now || 0;
        cx += (tx - cx) * k; cy += (ty - cy) * k;
        card.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
        raf = active || Math.abs(tx - cx) + Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(loop) : 0;
        if (!raf) prev = 0;
      }
      function activate(hit, pin) {
        const id = hit.dataset.dish, d = byId.get(id), wasActive = !!active;
        if (active === id && pinned === pin) return;
        active = id; pinned = pin;
        main.classList.add('is-dimmed');
        lit.forEach((n) => n.classList.toggle('is-on', n.dataset.dish === id));
        img.src = d.image; img.alt = d.title; title.textContent = d.title; meta.textContent = d.meta;
        aim(hit);
        if (!wasActive) { cx = tx; cy = ty; }                     // first show: appear in place, do not fly in
        card.classList.add('is-on');
        if (!raf) raf = requestAnimationFrame(loop);
      }
      function deactivate() {
        if (!active) return;
        active = null; pinned = false;
        main.classList.remove('is-dimmed');
        lit.forEach((n) => n.classList.remove('is-on'));
        card.classList.remove('is-on');
      }

      hits.forEach((hit) => {
        hit.addEventListener('pointerenter', (e) => {
          lastPointer = e.pointerType;
          if (e.pointerType === 'touch') return;
          px = e.clientX; py = e.clientY;
          activate(hit, false);
        });
        hit.addEventListener('pointermove', (e) => {
          if (e.pointerType === 'touch' || pinned) return;
          px = e.clientX; py = e.clientY; aim(hit);
        });
        hit.addEventListener('pointerleave', (e) => { if (e.pointerType !== 'touch' && !pinned) deactivate(); });
        hit.addEventListener('pointerdown', (e) => { lastPointer = e.pointerType; });
        hit.addEventListener('click', (e) => {
          const d = byId.get(hit.dataset.dish);
          if (lastPointer === 'touch' || e.detail === 0) {         // touch tap or keyboard activation
            if (active === d.id && pinned) { if (d.href) go(d.href); else deactivate(); }
            else activate(hit, true);
          } else if (d.href) go(d.href);
        });
        hit.addEventListener('focus', () => { if (hit.matches(':focus-visible')) activate(hit, true); });
        hit.addEventListener('blur', () => { if (pinned) deactivate(); });
      });
      function go(href) { deactivate(); if (RT.go) RT.go(href); else window.location.href = href; }
      document.addEventListener('pointerdown', (e) => { if (pinned && !e.target.closest('.dish-hit')) deactivate(); });

      RT.timeline.on((type, p) => {
        if (type !== 'frame') return;
        const live = p > LIVE[0] && p < LIVE[1];
        if (live !== main.classList.contains('is-live')) main.classList.toggle('is-live', live);
        if (!live && active) deactivate();
      });
    }
  };
})();
