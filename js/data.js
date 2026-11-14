/* ==========================================================================
   Rare Taste — content & configuration
   Everything that is likely to be replaced later lives in this file:
   copy, image / video paths, dish ↔ subject mapping, accordion groups,
   partner logos, menu links and the scroll timeline.
   `placeholder: true` marks temporary content that still needs the real source.
   ========================================================================== */
window.RT = window.RT || {};

RT.data = {
  ui: {
    scroll: '스크롤을 내려보세요',
    hintHover: '디쉬 위에 마우스를 올려보세요',
    hintTouch: '디쉬를 눌러보세요'
  },

  /* Intro logo: the lettering is written on, then TASTE fades in (frames exported from logo.mov,
     white + alpha, tinted with `color` at runtime — '#ffffff' gives the white logo of the Figma frame). */
  intro: {
    logoAnim: { path: 'assets/img/logo-anim/', count: 86, fps: 30, width: 660, height: 458, delay: 0.3, color: '#ff610a',
                loop: true, hold: 1.6, fade: 1.0, gap: 0.4 }       // seconds: finished logo rests → fades out → pause → plays again
  },

  /* Name of the site = the title of the browser tab (the same text is in the <title> of every .html file).
     Profile, work and subject pages put their own name in front of it. */
  siteName: 'Rare Taste | 제36회 건국대학교 글로컬캠퍼스 시각영상디자인학과 영상/디지털 트랙 졸업전시회',

  /* Fork cursor (every page, mouse only). Angles in degrees, clockwise; the tips of the tines are the hot spot.
     rest = normal state, press = while the mouse button is down (the fork also shrinks to `pressScale`). */
  cursor: {
    image: 'assets/img/cursor-fork.webp', height: 108, rest: -30, press: -60, pressScale: 0.95,
    /* The resting fork is handed to the system as a real mouse cursor, so it moves exactly like the normal pointer
       (no delay). These two pictures are the fork drawn at `height` / `rest` (made with tools/cursor_png.py):
       hot = the tips of the tines inside the picture, size = the picture in CSS px (must stay under 128).
       If height or rest change, the pictures have to be made again — or set `native: null` to draw the fork
       with the page only (it then trails the hand by a frame or two). */
    native: { image: 'assets/img/cursor-fork-rest.png', image2x: 'assets/img/cursor-fork-rest-2x.png', hot: [5, 5], size: [66, 101] }
  },

  main: { image: 'assets/img/table.webp' },

  /* SCENE 02 — dishes on the table.
     no / badge  = the small numbered label on the table (Figma "메인") and its top-left corner, in % of the image.
                   08 is not in the Figma frame (it stops at 07) — placed next to the canapé by hand.
     x / y / w / h = position of the dish inside table.webp, in % of the image.
     mask  = alpha cut-out used to keep the hovered dish lit while the rest dims.
     href  = optional link to the subject page (null → no navigation yet). */
  dishes: [
    { id: 'spaghetti',   no: '03', badge: [39.366, 73.026], x: 34.88,  y: 74.716, w: 12.529, h: 3.972, mask: 'assets/img/dishes/spaghetti.png',
      title: '전공연구프로젝트 (영상)', meta: '지도교수 | 박상권', image: 'assets/img/subjects/spaghetti.webp', href: 'works-group.html#spaghetti' },
    { id: 'camera',      no: '02', badge: [58.391, 75.800], x: 47.796, y: 77.175, w: 17.247, h: 5.485, mask: 'assets/img/dishes/camera.png',
      title: '크리에이티브워크샵', meta: '지도교수 | 박철원', image: 'assets/img/subjects/camera.webp', href: 'works-group.html#camera' },
    { id: 'canape',      no: '08', badge: [59.087, 67.718], x: 56.148, y: 68.663, w: 8.275,  h: 3.279, mask: 'assets/img/dishes/canape.png',
      title: '뉴미디어', meta: '지도교수 | 고이관', image: 'assets/img/subjects/canape.webp', href: 'works-group.html#canape' },
    { id: 'ratatouille', no: '01', badge: [45.708, 81.475], x: 40.217, y: 83.039, w: 12.297, h: 5.044, mask: 'assets/img/dishes/ratatouille.png',
      title: '전공연구프로젝트 (디지털)', meta: '지도교수 | 강일', image: 'assets/img/subjects/ratatouille.webp', href: 'works-group.html#ratatouille' },
    { id: 'mouse',       no: '05', badge: [40.062, 68.045], x: 35.576, y: 69.672, w: 7.115,  h: 3.279, mask: 'assets/img/dishes/mouse.png',
      title: 'VFX', meta: '지도교수 | 하주영', image: 'assets/img/subjects/mouse.webp', href: 'works-group.html#mouse' },
    { id: 'cd',          no: '06', badge: [40.758, 61.424], x: 38.592, y: 62.421, w: 10.905, h: 4.54,  mask: 'assets/img/dishes/cd.png',
      title: '애니메이션스튜디오', meta: '지도교수 | 김민훈', image: 'assets/img/subjects/cd.webp', href: 'works-group.html#cd' },
    { id: 'headset',     no: '07', badge: [57.077, 58.146], x: 51.121, y: 59.206, w: 10.131, h: 7.503, mask: 'assets/img/dishes/headset.png',
      title: 'AR/VR 콘텐츠 디자인', meta: '지도교수 | 윤무현', image: 'assets/img/subjects/headset.webp', href: 'works-group.html#headset' },
    { id: 'smartphone',  no: '04', badge: [52.127, 70.945], x: 48.492, y: 72.699, w: 10.518, h: 4.477, mask: 'assets/img/dishes/smartphone.png',
      title: 'UIUX 캡스톤 디자인', meta: '지도교수 | 정혜경', image: 'assets/img/subjects/smartphone.webp', href: 'works-group.html#smartphone' }
  ],

  /* Each array item is one animated line. '' = empty spacer line. */
  concept1: {
    title: ['DIFFERENT', 'TASTES'],
    body: [
      '같은 음식을 맛보아도 우리는 저마다 다른 감각을 발견한다.',
      '같은 재료로 저마다 다르게 요리하고, 익숙한 맛 속에서 새로운 표정을 찾아낸다.',
      '만들고, 덜어내고, 다시 다듬는 동안 낯선 감각은 어느새 나만의 취향이 된다.'
    ],
    image: 'assets/img/concept-1.webp'
  },
  concept2: {
    title: ['OUR', 'OWN WAY'],
    body: [
      '같은 시간을 지나왔어도',
      '그 안에서 쌓아온 경험과 표현은 서로 다르다',
      'Rare Taste는 그렇게 쌓인 안목이 빚어낸 희소한 결이다',
      '',
      '누군가는 평범함을 다르게 보는 안목으로,',
      '누군가는 사소함에서 의미를 찾는 경험으로,',
      '누군가는 이름 없는 감각을 꺼내 보이는 취향으로',
      '',
      '저마다의 고유한 결을 만들어 간다'
    ],
    image: 'assets/img/concept-2.webp'
  },
  concept3: {
    title: ['RARE', 'TASTE'],
    body: [
      '서로 다른 경험과 표현이 겹겹이 포개져 만들어진,',
      '쉽게 대체할 수 없는 나만의 결.',
      '서로 다르기에 더욱 특별한 우리의 감각을 지켜가며,'
    ],
    slogan: ['KEEP IT RARE!'],
    image: 'assets/img/concept-3.webp'
  },

  film: {
    title: ['MAIN FILM'],
    body: ['파인다이닝을 모티브로 졸업전시의 컨셉과 작품을 소개하는 메인 영상입니다'],
    /* Temporary film cut from the Figma stills — replace src/poster with the real film (16:9). */
    src: 'assets/video/main-film-placeholder.mp4',
    poster: 'assets/video/main-film-poster.jpg',
    placeholder: true
  },

  offline: {
    title: ['OFFLINE'],
    body: ['전시 일정과 장소, 주차 및 방문 안내 등 오프라인 전시 관련 정보를 확인할 수 있습니다'],
    /* Accordion groups. Add / remove items freely.
       content blocks: { type: 'rows' } label + lines (note = extra grey lines)
                       { type: 'map' }  w / h = size in the 1293px design, x = indent from the text column,
                                        bleed = how far the exported picture reaches past that box (top, right, bottom, left)
                       { type: 'text' } plain paragraphs */
    groups: [
      {
        title: 'EXHIBITION INFO.', sub: '전시 정보 (날짜 / 장소)',
        content: [
          { type: 'rows', rows: [
            { label: 'OPENING', lines: ['2026. 11. 19 (목) 13:00'] },
            { label: 'TIME', lines: ['2026. 11. 19 (목) - 11. 20 (금) 10:00 - 18:00', '2026. 11. 21 (토) - 11. 22 (일) 10:00 - 20:00'] }
          ] }
        ]
      },
      {
        title: 'DIRECTIONS', sub: '오시는 길 및 교통편',
        content: [
          { type: 'map', src: 'assets/img/map-directions.svg', w: 454, h: 193, x: 20, bleed: [0, 0, 0, 0],
            alt: '약도: 지하철 2호선 성수역 2·3번 출구에서 무신사 본사와 오우드 성수를 지나 HAESO 해소 성수까지' },
          { type: 'rows', rows: [
            { label: 'PLACE', lines: ['서울특별시 성동구 성수이로24길 31 HAESO 해소'] },
            { label: 'SUBWAY', lines: ['지하철 2호선 성수역 하차 후 2번출구에서 도보 10분 소요'] }
          ] }
        ]
      },
      {
        title: 'PARKING', sub: '주차 안내',
        content: [
          { type: 'map', src: 'assets/img/map-parking.svg', w: 449, h: 310.1, x: 25, bleed: [2.5, 4.1, 4.4, 3.9],
            alt: '약도: HAESO 해소 성수 주변의 공영주차장 위치' },
          { type: 'rows', rows: [
            { label: 'PARKING', lines: ['성수 2가 1,3동 공영 주차장 이용 (차로 각각 5분,3분 소요)'], note: ['1시간 기준 3,200원 (5분당 250원)'] }
          ] }
        ]
      }
    ]
  },

  partners: {
    title: ['PARTNERS'],
    body: ['졸업전시를 위해 함께해 주신 후원사와 협력 업체를 소개합니다'],
    /* h = logo height in px at the 1293px design width (taken from Figma), in Figma order. */
    logos: [
      { name: 'RixFont',        src: 'assets/img/partners/rixfont.png',      h: 34 },
      { name: 'CA BOOKS',       src: 'assets/img/partners/cabooks.png',      h: 49 },
      { name: 'Bundaberg',      src: 'assets/img/partners/bundaberg.png',    h: 84 },
      { name: 'ADSLAND',        src: 'assets/img/partners/adsland.png',      h: 47 },
      { name: 'Dancing Cider',  src: 'assets/img/partners/dancingcider.png', h: 73 },
      { name: 'EPSON',          src: 'assets/img/partners/epson.png',        h: 44 },
      { name: 'DYI Workshop',   src: 'assets/img/partners/dyiworkshop.png',  h: 70 },
      { name: '아키라운지',       src: 'assets/img/partners/akilounge.png',    h: 115 },
      { name: '산돌구름',         src: 'assets/img/partners/sandollcloud.png', h: 110 },
      { name: 'WINENARA',       src: 'assets/img/partners/winenara.png',     h: 85 }
    ],
    secondsPerLogo: 4.2   // marquee speed: higher = slower
  },

  footer: {
    logo: 'assets/img/logo-orange.png',
    org: ['2027 건국대학교 글로컬캠퍼스 시각영상디자인학과', '제 36회 영상/디지털트랙 졸업전시회'],
    copyright: '© 2026 Graduation Exhibition. All rights reserved.'
  },

  /* Menu overlay (Figma "menu"): three lines. Add { label, href } for further pages. */
  menu: [
    { label: 'INTRODUCE', href: 'introduce.html' },
    { label: 'WORKS',     href: 'works.html' },
    { label: 'DESIGNERS', href: 'designers.html' }
  ]
};

/* --------------------------------------------------------------------------
   Title lettering (Caesura Bold).
   Titles are real text set in Adobe Fonts "caesura" (web kit in index.html).
   If the kit cannot load (offline preview, blocked domain), each title line
   listed here is drawn from a mask exported from Figma instead, so the
   lettering is always Caesura. A title that is not listed simply stays text.
   ar = width / height of the mask.
   -------------------------------------------------------------------------- */
RT.data.titleArt = {
  'DIFFERENT':        { src: 'assets/img/titles/different.png',       ar: 6.75 },
  'TASTES':           { src: 'assets/img/titles/tastes.png',          ar: 4.6378 },
  'OUR':              { src: 'assets/img/titles/our.png',             ar: 2.5947 },
  'OWN WAY':          { src: 'assets/img/titles/own-way.png',         ar: 6.1368 },
  'RARE':             { src: 'assets/img/titles/rare.png',            ar: 3.1459 },
  'TASTE':            { src: 'assets/img/titles/taste.png',           ar: 3.9288 },
  'MAIN FILM':        { src: 'assets/img/titles/main-film.png',       ar: 6.0488 },
  'OFFLINE':          { src: 'assets/img/titles/offline.png',         ar: 4.9096 },
  'PARTNERS':         { src: 'assets/img/titles/partners.png',        ar: 6.0301 },
  'EXHIBITION INFO.': { src: 'assets/img/titles/exhibition-info.png', ar: 10.6 },
  'DIRECTIONS':       { src: 'assets/img/titles/directions.png',      ar: 7.4167 },
  'PARKING':          { src: 'assets/img/titles/parking.png',         ar: 5.2833 },
  /* menu + sub pages. drop = how far the mask hangs below the baseline, in cap heights (the "J"). */
  'INTRODUCE':        { src: 'assets/img/titles/introduce.png',       ar: 7.0732 },
  'WORKS':            { src: 'assets/img/titles/works.png',           ar: 4.6195 },
  'DESIGNERS':        { src: 'assets/img/titles/designers.png',       ar: 6.6585 },
  'GUEST':            { src: 'assets/img/titles/guest.png',           ar: 3.9805 },
  'COMMITTEE':        { src: 'assets/img/titles/committee.png',       ar: 7.4545 },
  'UIUX CAPSTONE':    { src: 'assets/img/titles/uiux-capstone.png',   ar: 9.3566 },
  'DESIGN':           { src: 'assets/img/titles/design.png',          ar: 4.2308 },
  'JO':               { src: 'assets/img/titles/jo.png',              ar: 1.3719, drop: 0.1895 },
  'YESEUL':           { src: 'assets/img/titles/yeseul.png',          ar: 4.6456 },
  'CHOI HAMIN':       { src: 'assets/img/titles/choi-hamin.png',      ar: 7.0 }
};

/* --------------------------------------------------------------------------
   Scroll timeline — unit = one "screen" of scrolling = `scrollUnit` pixels, the same on every device.
   Everything is scrubbed by scroll: [start, end] is the stretch of scrolling
   a move takes. Longer stretch = slower, calmer transition.
   Text groups have an `in` and an `out` stretch; their lines are revealed
   one after another inside that stretch (see `lineStagger`).
   -------------------------------------------------------------------------- */
RT.timelineConfig = {
  /* How many pixels of scrolling one "screen" of this timeline takes. A fixed number, so the same amount of
     scrolling (wheel notches, trackpad swipe, finger travel) moves the site equally far on a large monitor,
     a small laptop window and a tablet. Larger = everything takes more scrolling (slower); smaller = less.
     null = one viewport height (the old behaviour: a low laptop window then runs through the site faster). */
  scrollUnit: 1000,
  end: 20.5,                       // pinned length; the details section rises at the very end
  smoothing: 0.085,                // inertia of the scrub (1 = none). Lower = heavier, more gliding.
                                   // Measured per 1/60 s and converted to the real frame time, so 60 / 120 / 144 Hz
                                   // screens and power-saving 30 fps modes all glide the same way
  lineStagger: 0.45,               // 0 = all lines together, 1 = strictly one after another

  /* Intro → main "sticky" step (mouse wheel / keys; touch scrolling is left alone):
       from  scrolling down past this point glides on by itself until the main scene fills the screen (`to`)
       back  scrolling back up from the main scene by more than this glides back to the intro (null = off)
       duration  milliseconds for the whole distance
       quiet / settle  after the glide the page stays on the main scene until the wheel or trackpad has been
                 still for `quiet` ms (at most `settle` ms) — a trackpad swipe keeps sending momentum long after
                 the fingers have left, and would otherwise carry the page straight past the main scene */
  introSnap: { from: 0.22, to: 2.0, back: 0.3, duration: 1250, quiet: 160, settle: 1600 },

  introToMain:   [0.1, 1.9],       // background pan
  introLogoFade: [0.1, 0.75],      // the intro logo fades out …
  navLogoIn:     [0.55, 1.3],      // … and the navigation logo fades in
  mainLive:      [1.7, 3.25],      // dishes react to hover / touch
  mainSlide:     [3.1, 4.7],       // main moves left until it has completely left the screen
  /* 4.7 → 5.1 : only the white ground. Lengthen / shorten this pause by moving every number below
     by the same amount. */
  c1ImageIn:     [5.1, 6.4],
  c1ImageOut:    [7.25, 8.2],
  c2ImageIn:     [7.6, 8.9],
  c2ImageOut:    [10.0, 10.9],     // concept 02 photo leaves to the right, completely …
  c3In:          [10.9, 11.7],     // … only then the concept 03 background fades in
  sheet:         [12.9, 14.7],     // white square expansion
  filmAppear:    [14.45, 15.2],
  filmExpand:    [15.9, 17.4],     // video → full viewport
  filmSection:   [15.9, 19.5],     // playback runs during the first half, pauses at 50%
  detailsRise:   [19.5, 20.5],

  text: {
    introHint: { in: null,           out: [0.1, 0.55] },
    mainHint:  { in: [1.5, 2.0],     out: [3.1, 3.5] },
    concept1:  { in: [5.2, 6.1],     out: [7.2, 7.8] },
    concept2:  { in: [8.25, 9.2],    out: [9.6, 10.15] },
    concept3:  { in: [11.3, 12.3],   out: [13.7, 14.4] },
    film:      { in: [14.25, 15.05], out: [15.8, 16.35] },
    filmHint:  { in: [17.7, 18.15],  out: [19.25, 19.6] }
  },

  labels: { intro: 0, main: 2.45, concept1: 6.7, concept2: 9.4, concept3: 12.6, film: 15.5 }
};
