/* main.js — home page boot order: content → shared chrome → timeline → interactions → title lettering check */
(function () {
  const RT = window.RT;
  RT.render();
  RT.chrome.init();
  RT.timeline.init();
  RT.introLogo.init();
  RT.dishes.init();
  RT.details.init();
  RT.fonts.caesuraReady().then((ok) => {
    if (!ok) RT.fonts.applyTitleArt();
    RT.timeline.remeasure();
  });
})();
