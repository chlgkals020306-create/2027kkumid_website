/* ==========================================================================
   details.js — Scene 08: reveal on scroll, pinned OFFLINE panel, accordion
   ========================================================================== */
(function () {
  const RT = window.RT;
  const $ = (s) => document.querySelector(s);

  /* Scene 08 is normal page flow, so its reveal is scrubbed by each block's position in the
     viewport: 0 when the block's top is near the bottom edge, 1 once it has travelled up ~40%.
     Lines inside a block take turns (same stagger as the pinned scenes). */
  function initReveal() {
    const { clamp, ease } = RT.util;
    const K = RT.timelineConfig.lineStagger;
    const mq = RT.env.reduced;
    const items = [...document.querySelectorAll('[data-reveal]')].map((node) => ({ node, lines: [...node.querySelectorAll('.line')], key: '' }));
    let queued = false;
    const draw = () => {
      queued = false;
      const vh = window.innerHeight, travel = mq.matches ? 0 : 1;
      items.forEach((it) => {
        const top = it.node.getBoundingClientRect().top;
        const t = clamp((vh * 0.94 - top) / (vh * 0.4));
        const key = t.toFixed(4);
        if (key === it.key) return;
        it.key = key;
        const n = it.lines.length;
        if (!n) {                                                 // a block without lines (accordion, marquee) moves as one
          const v = ease.out(t);
          it.node.style.opacity = v.toFixed(3);
          it.node.style.transform = `translate3d(0,${((1 - v) * 36 * travel).toFixed(1)}px,0)`;
          return;
        }
        const w = 1 / (1 + (n - 1) * K);
        it.lines.forEach((line, i) => {
          const v = ease.out(clamp((t - i * K * w) / w));
          line.style.opacity = v.toFixed(3);
          line.style.transform = `translate3d(0,${((1 - v) * 90 * travel).toFixed(2)}%,0)`;
        });
      });
    };
    const request = () => { if (!queued) { queued = true; requestAnimationFrame(draw); } };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    draw();
  }

  /* Accordion: each group toggles independently; height via grid-template-rows (no measuring). */
  function initAccordion() {
    document.querySelectorAll('.acc-item').forEach((item) => {
      const head = item.querySelector('.acc-head');
      head.addEventListener('click', () => {
        const open = item.classList.toggle('is-open');
        head.setAttribute('aria-expanded', String(open));
      });
    });
  }

  /* OFFLINE panel: the sheet rises over the film, sticks to the top of the viewport and holds there
     (CSS: .details__panel is sticky inside .details__pin, the spacer after it is the hold distance).
     While it is held, the accordion rows arrive one after another, scrubbed by the scroll. */
  function initPin() {
    const pin = $('[data-pin]'), rows = [...document.querySelectorAll('.acc-item')];
    if (!pin || !rows.length) return;
    const { clamp, ease } = RT.util;
    const mq = RT.env.reduced;
    const space = pin.querySelector('.details__hold');
    let queued = false, last = '';
    const draw = () => {
      queued = false;
      const hold = space.offsetHeight || 1;
      const t = clamp((-pin.getBoundingClientRect().top + window.innerHeight * 0.32) / (hold * 0.62 + window.innerHeight * 0.32));
      const key = t.toFixed(4);
      if (key === last) return;
      last = key;
      const n = rows.length, k = 0.6, w = 1 / (1 + (n - 1) * k), travel = mq.matches ? 0 : 1;
      rows.forEach((row, i) => {
        const v = ease.out(clamp((t - i * k * w) / w));
        row.style.opacity = v.toFixed(3);
        row.style.transform = `translate3d(0,${((1 - v) * 28 * travel).toFixed(1)}px,0)`;
      });
    };
    const request = () => { if (!queued) { queued = true; requestAnimationFrame(draw); } };
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    draw();
  }

  RT.details = { init() { initReveal(); initPin(); initAccordion(); } };
})();
