/* ==========================================================================
   Rare Taste — content of the sub pages
   (introduce · works · works-group · designers · designer · work)

   Everything here is meant to be replaced with the real material.
   `placeholder: true` / text starting with "[임시]" marks content that is not
   final yet. Photos live in assets/img/people, covers in assets/img/works,
   the works themselves in js/data-works.js + assets/img/works/<work id>/.
   ========================================================================== */
window.RT = window.RT || {};

RT.site = {
  copy: {
    designers: {
      title: ['DESIGNERS'],
      body: ['제 36회 건국대학교 시각영상디자인학과 영상/디지털트랙 트랙을 빛내준 졸업생들입니다.'],
      search: '디자이너 이름 검색',
      searchHint: '디자이너 이름을 검색하면 바로 프로필로 이동할 수 있습니다'
    },
    introduce: {
      title: ['INTRODUCE'],
      body: ['졸업전시를 함께 준비하며 학생들의 작업과 성장을 이끌어 주신 교수님들을 소개합니다']
    },
    committee: {
      title: ['COMMITTEE'],
      body: ['졸업전시를 함께 준비한 졸업준비위원회 구성원과 각자의 역할을 한눈에 살펴보세요'],
      filters: [{ id: 'all', label: 'ALL' }, { id: 'chair', label: '위원장' }, { id: 'member', label: '위원' }]
    },
    works: { title: ['WORKS'] },
    group: {
      search: '프로젝트 명 / 디자이너 검색',
      searchHint: '디자이너 이름을 검색하면 바로 프로필로 이동할 수 있습니다'
    },
    profile: { email: 'Email', instagram: 'Instagram' },
    /* The three interview questions on the designer page */
    questions: ['졸업하는 나에게 한마디', '졸업 작품은 어떤 맛?', '나를 버티게 해준 조미료']
  },

  /* WORKS — one entry per subject (Figma "works_1"). `id` matches the dish on the home table.
     en = title of the subject page (Figma "works_2"), one array item per line. */
  groups: [
    { id: 'spaghetti', ko: '전공연구프로젝트 (영상)', professor: '박상권', en: ['MAJOR RESEARCH', 'PROJECT : FILM'], enPlaceholder: true,
      cover: 'assets/img/works/spaghetti.webp',
      desc: ['본 과목은 영상 콘텐츠를 비롯한 다양한 매체의 기획과 제작을 유기적으로 연결하는 통합 프로젝트 수업입니다. 학생들은 단편 영화, 애니메이션, 브랜드 캠페인 등 각 분야의 기획 방식과 제작 기법을 탐구하고 최신 매체 트렌드를 접목해 자신만의 작품을 완성합니다. 이 과정에서 통합적 사고력과 창의적 표현 능력을 키우며 산업을 선도할 디렉터로서의 전문성을 갖춥니다.'] },
    { id: 'camera', ko: '크리에이티브워크샵', professor: '박철원', en: ['CREATIVE', 'WORKSHOP'], enPlaceholder: true,
      cover: 'assets/img/works/camera.webp',
      desc: ['크리에이티브워크샵은 세상의 문제를 발견하는 일에서 시작합니다.', 'CSR과 CSV의 관점에서 동시대의 사회적 이슈를 찾아내고, 그것을 자신의 시선으로 다시 정의하여 하나의 캠페인으로 구조화합니다. 이 과정을 통해 흩어진 현상 속에서 진짜 문제를 골라내는 눈, 전달하고자 하는 메시지를 단 하나의 아이디어로 압축하는 힘, 그리고 그 아이디어를 영상과 이미지라는 시각 언어로 번역해내는 연출력을 기르게 됩니다.'] },
    { id: 'canape', ko: '뉴미디어', professor: '고이관', en: ['NEW MEDIA'], enPlaceholder: true,
      cover: 'assets/img/works/canape.webp',
      desc: ['본 과목은 영상 콘텐츠를 비롯한 다양한 매체의 기획과 제작을 유기적으로 연결하는 통합 프로젝트 수업입니다. 학생들은 단편 영화, 애니메이션, 브랜드 캠페인 등 각 분야의 기획 방식과 제작 기법을 탐구하고 최신 매체 트렌드를 접목해 자신만의 작품을 완성합니다. 이 과정에서 통합적 사고력과 창의적 표현 능력을 키우며 산업을 선도할 디렉터로서의 전문성을 갖춥니다.'] },
    { id: 'ratatouille', ko: '전공연구프로젝트 (디지털)', professor: '강일', en: ['MAJOR RESEARCH', 'PROJECT : DIGITAL'], enPlaceholder: true,
      cover: 'assets/img/works/ratatouille.webp',
      desc: ['학생들이 스스로 주제를 탐구하고 체계적인 제작 과정을 설계하여 자신만의 영상 콘텐츠를 완성하는 과정을 목표로 합니다. 다양한 영상 제작 방식과 실무 중심의 워크플로우를 이해하고 적용하며, 기획부터 연출, 제작에 이르기까지 전 과정을 주도적으로 수행하며 창의적인 사고와 실무 역량을 함께 발전시키는 것을 목표로 합니다.'] },
    { id: 'mouse', ko: 'VFX', professor: '하주영', en: ['VFX'],
      cover: 'assets/img/works/mouse.webp',
      desc: ['VFX는 불가능한 상상력을 현실처럼 구현하는 예술적 표현방법입니다. 디지털 공간의 무한한 가능성을 통해 우리는 현실의 한계를 넘어 더 넓은 세계를 창조할 수 있습니다. 영상디자인에서 VFX는 단순한 기술이 아니라, 상상과 현실을 이어주는 창의적 매개체이자 예술적 언어입니다. 이를 통해 우리는 사고의 경계를 넘어 새로운 시각적 표현 방식을 탐구하며, 영상디자인의 현재와 미래 가능성을 확장해 나가고 있습니다.'] },
    { id: 'cd', ko: '애니메이션스튜디오', professor: '김민훈', en: ['ANIMATION', 'STUDIO'], enPlaceholder: true,
      cover: 'assets/img/works/cd.webp',
      desc: ['애니메이션스튜디오’의 작품들은 학생들이 자신의 삶에서 마주한 문제와 관심, 그리고 각자의 취향에서 출발했습니다. 작품에 담긴 다양한 통찰과 해석은 여러 기법과 테크놀로지를 통해 한 편의 애니메이션으로 완성되었습니다. 수많은 스펙터클 이미지와 작은 이야기들이 끊임없이 생산되고, 융합되며, 소비되는 오늘입니다. 이러한 시대 속에서 본 과목의 애니메이션 작품들은 삶과 세계를 바라보는 각자의 관점을 드러내며, 오늘을 반성적으로 비추는 하나의 단서가 되고자 합니다.'] },
    { id: 'headset', ko: 'AR/VR 콘텐츠 디자인', professor: '윤무현', en: ['AR/VR CONTENT', 'DESIGN'], enPlaceholder: true,
      cover: 'assets/img/works/headset.webp',
      desc: ['AR/VR 콘텐츠 디자인은 현실과 가상의 경계에서 새로운 경험을 설계하는, AI와 공존하는 디자이너를 위한 필수 과정입니다. 이 수업은 실감미디어 콘텐츠 기술과 생성형 AI를 융합하여 몰입감 높은 경험을 구현하는 실습 중심의 프로젝트 수업입니다.'] },
    { id: 'smartphone', ko: 'UIUX 캡스톤 디자인', professor: '정혜경', en: ['UIUX CAPSTONE', 'DESIGN'],
      cover: 'assets/img/works/smartphone.webp',
      desc: ['UI/UX캡스톤디자인은 일상생활 속에서 마주치는 불편함과 문제 상황을 발견하고, 이를 사용자 중심의 서비스로 해결해 나가는 전 과정을 실습하는 캡스톤 디자인 과목입니다. 학생들은 문제 정의(Discover·Define)에서 출발하여 아이디어 발산과 구체화(Develop), 프로토타입 제작과 검증(Deliver)에 이르는 디자인 프로세스를 단계적으로 수행합니다. 학생들의 결과물 중 실제 현업에서 활용 가능한 기술은 특허출원을 하고 시제품 제작과 함께 기술이전이 되기도 합니다.'] },
    { id: 'visual', ko: '시각트랙', professor: '김주연, 김주경, 박지은', en: ['VISUAL TRACK'], enPlaceholder: true,
      cover: 'assets/img/works/visual.webp',
      desc: ['전공연구프로젝트, 프로모션디자인프로젝트. 정보디자인프로젝트, 실험디자인프로젝트'] }
  ],

  /* INTRODUCE — professors, in the order of the strip. All portraits rest at the small size; only the
     one under the pointer grows and shows its caption. (Add `featured: true` to one entry if it should
     be large while nothing is hovered.) Photos: the originals stored in the Figma file (285 × 377 crops),
     subject = the course each professor supervises (same as `groups`). */
  professors: [
    { name: '김민훈', subject: '애니메이션스튜디오',        image: 'assets/img/people/prof-kim-minhoon.webp' },
    { name: '고이관', subject: '뉴미디어',                 image: 'assets/img/people/prof-ko-ikwan.webp' },
    { name: '박상권', subject: '전공연구프로젝트 (영상)',   image: 'assets/img/people/prof-park-sangkwon.webp' },
    { name: '정혜경', subject: 'UIUX 캡스톤 디자인',       image: 'assets/img/people/prof-jung-hyekyung.webp' },
    { name: '박철원', subject: '크리에이티브워크샵',        image: 'assets/img/people/prof-park-cheolwon.webp' },
    { name: '강일',   subject: '전공연구프로젝트 (디지털)', image: 'assets/img/people/prof-kang-il.webp' },
    { name: '하주영', subject: 'VFX',                     image: 'assets/img/people/prof-ha.webp' },   // the Figma layer is named "하주연" — confirm the spelling
    { name: '윤무현', subject: 'AR/VR 콘텐츠 디자인',      image: 'assets/img/people/prof-yoon-muhyun.webp' }
  ],
  /* INTRODUCE — graduation committee: two chairs (위원장) and nine members (위원), in the order of the grid.
     designer = id in `designers` below: name, photo and the link to the profile come from there.
     part     = the member's position (총무 / 영상팀 / 기획팀 / 디자인팀) — shown under the name; when it is '' the role
                (위원장 / 위원) is shown instead. */
  committee: [
    { designer: 'eom-jaehyeon',  role: 'chair',  part: '' },
    { designer: 'han-gayoung',   role: 'chair',  part: '' },
    { designer: 'park-sungheon', role: 'member', part: '총무' },
    { designer: 'kang-dongwoo',  role: 'member', part: '영상팀' },
    { designer: 'kim-dohkeom',   role: 'member', part: '영상팀' },
    { designer: 'baek-chaehwan', role: 'member', part: '기획팀' },
    { designer: 'choi-hanyoung', role: 'member', part: '기획팀' },
    { designer: 'jo-yeseul',     role: 'member', part: '디자인팀' },
    { designer: 'choi-hamin',    role: 'member', part: '디자인팀' },
    { designer: 'lee-hyobin',    role: 'member', part: '디자인팀' },
    { designer: 'yim-songun',    role: 'member', part: '디자인팀' }
  ],

  /* DESIGNERS — 65 graduates, in Korean alphabetical order (the grid and the search follow this order).
     Source: the committee's two spreadsheets (catalogue / name-card information, interview answers)
     and the profile photos. Phone and student numbers are deliberately not part of the site.
     en        = lines of the large name on the profile page (family name, given name)
     pos       = horizontal focus of the square photo inside the 3:4 card (object-position)
     intro     = self-introduction, one array item per line (wraps by itself when long)
     instagram = '' when the student gave none
     prefer    = the contact the student chose for the printed catalogue ('email' | 'instagram')
     answers   = one per question in copy.questions; '' = not answered yet (that row is left out) */
  designers: [
    { id: "kang-dongwoo", name: "강동우", en: ["KANG", "DONGWOO"], pos: 50.1,
      intro: ["다양한 것을 만들고싶습니다"],
      email: "birwooddw@gmail.com", instagram: "@owgnod_", prefer: "email",
      answers: ["생각을 똑똑하게 잘하자.", "담배맛", "가족, 여자친구"] },
    { id: "kwak-chaeeun", name: "곽채은", en: ["KWAK", "CHAEEUN"], pos: 40.5,
      intro: ["하고 싶은 걸 하며 살고 싶은 사람입니다."],
      email: "kwakchaedong@gmail.com", instagram: "@k__c.e", prefer: "email",
      answers: ["고생했다~", "아메리카노에 샷추가", "신수호, 교수님, 몽몽이, 침대"] },
    { id: "kwon-taerin", name: "권태린", en: ["KWON", "TAERIN"], pos: 58.8,
      intro: ["사람들을 움직일 아이디어를 찾습니다."],
      email: "undrytlin@gmail.com", instagram: "@drytarn", prefer: "email",
      answers: ["앞으로도 계속 파이팅!", "꼬질꼬질한 맛", "팀원, 친구, 가족들, 나"] },
    { id: "kim-nayeon", name: "김나연", en: ["KIM", "NAYEON"], pos: 81.6,
      intro: ["세상을 조금 더 재미있게 만들고 싶은 크리에이터입니다."],
      email: "nayeon7705@naver.com", instagram: "", prefer: "email",
      answers: ["고생했다.....진짜...", "카페인 100%에 눈물 세 방울 첨가한 맛", "가인아!!너 덕분에 버티고 졸업할 수 있었다!! 고맙다!!"] },
    { id: "kim-dohkeom", name: "김도겸", en: ["KIM", "DOHKEOM"], pos: 69.1,
      intro: ["기술과 시각적 상상력을 연결해 입체적으로 구체화하는 디자이너입니다."],
      email: "dohkeom1009@gmail.com", instagram: "@keomie0._.0", prefer: "instagram",
      answers: ["이때까지 고생했고 앞으로도 고생하자", "쓰고 짜고 달았던, 어쨌든 완성해서 다행인 맛.", "혼자서는 어려웠을 일도 함께라서 끝까지 완성할 수 있었던 동기들."] },
    { id: "kim-sohee", name: "김소희", en: ["KIM", "SOHEE"], pos: 30.3,
      intro: ["멈춰 있던 세계를 움직이는 디자이너입니다."],
      email: "rurururu11q@gmail.com", instagram: "", prefer: "email",
      answers: ["이 경험을 통해 앞으로 더 발전해보자.", "달달한 과일의 껍질 같은 맛", "좋아하는 플레이리스트, 가족과 친구들."] },
    { id: "kim-soomin", name: "김수민", en: ["KIM", "SOOMIN"], pos: 57.3,
      intro: ["관찰하고, 상상하고, 움직이게 하는 디자이너입니다."],
      email: "sumif.atoz@gmail.com", instagram: "", prefer: "email",
      answers: ["이제 시작!", "담백한 맛", "함께 달려준 동기들."] },
    { id: "kim-eunsu", name: "김은수", en: ["KIM", "EUNSU"], pos: 71.1,
      intro: ["이야기를 통해 사람들의 공감을 이끌어내는 디자이너입니다."],
      email: "soosueun@gmail.com", instagram: "", prefer: "email",
      answers: ["하면 된다. 너무 걱정하지 말 것", "진하고 쌉쌀하지만 끝은 달달한 말차 라떼 맛", "친구들과 밤샘 작업을 함께 지켜봐 준 우리 집 햄스터 버터"] },
    { id: "kim-jiyeon", name: "김지연", en: ["KIM", "JIYEON"], pos: 64.7,
      intro: ["관찰하고 정리하고 만듭니다."],
      email: "gezeyon@naver.com", instagram: "", prefer: "email",
      answers: ["고생 많았다.", "처음보다 끝이 나은 맛", "마감이라는 확실한 목표"] },
    { id: "kim-chaeyun", name: "김채윤", en: ["KIM", "CHAEYUN"], pos: 64.4,
      intro: ["문득 눈에 밟히고, 끝내 마음에 오래 남고픈 디자이너입니다."],
      email: "chaeyun0405@naver.com", instagram: "@c.yun45", prefer: "email",
      answers: ["스스로를 의심하지 말 것", "아쉬움의 향을 담은 짭짤한 눈물 맛", "친절한 동기들과 가족의 응원, 12월의 자유, 카페인 한 잔"] },
    { id: "kim-taeeun", name: "김태은", en: ["KIM", "TAEEUN"], pos: 61.0,
      intro: ["안녕하세요, 김태은입니다 !"],
      email: "taeeun4063@gmail.com", instagram: "", prefer: "email",
      answers: ["지금까지 수고했어 앞으로도 잘 부탁해", "커피 맛", "지칠 때마다 힘을 준 사람들"] },
    { id: "lyu-juwon", name: "류주원", en: ["LYU", "JUWON"], pos: 81.3,
      intro: ["문화와 기술, 감각과 기능을 연결해 새로운 가능성을 발견하고 싶은 디자이너입니다."],
      email: "21lyujuwon@gmail.com", instagram: "@juuu_arc", prefer: "instagram",
      answers: ["고민과 좌절도 많이 했지만 포기하지 않고 버티는 법을 배웠다. 새로운 시작을 위해 앞으로 더 열심히 살아보자!", "설탕 한 스푼 넣은 에스프레소 맛", "사랑하는 가족, 친구들, 구름이(강아지), 음악"] },
    { id: "moon-jieun", name: "문지은", en: ["MOON", "JIEUN"], pos: 50,
      intro: ["마음을 움직이는 작품을 만들고자 합니다."],
      email: "mje4396@gmail.com", instagram: "", prefer: "email",
      answers: ["아직 갈 길이 먼 것 같다.", "약 맛", "가족과 음악"] },
    { id: "park-byeongjun", name: "박병준", en: ["PARK", "BYEONGJUN"], pos: 55.5,
      intro: ["긍정적인 마음으로, 내가 꿈꾸는 곳까지 즐겁게 나아가는 사람입니다."],
      email: "qudwnswkd91@gmail.com", instagram: "@jg_pbj", prefer: "instagram",
      answers: ["앞으로도 이 마음 변치 말고 힘내자.", "가장 달콤한 결실을 맺기 위해 오래 가꿔온 과실의 맛.", "소년만화 속 주인공들이 끝까지 포기하지 않는 모습을 보며, 나도 힘을 얻었다."] },
    { id: "park-sungheon", name: "박성헌", en: ["PARK", "SUNGHEON"], pos: 61.1,
      intro: ["아침에 일어나서 이부자리부터 정리합니다."],
      email: "sunghun3927@gmail.com", instagram: "@heolv_", prefer: "instagram",
      answers: ["생각 길게 하지 마라", "홀에서 먹는 황금올리브(뼈)", "27년도 졸업"] },
    { id: "park-subeen", name: "박수빈", en: ["PARK", "SUBEEN"], pos: 45.5,
      intro: ["익숙한 것에 새로운 시선을 더하는 디자이너입니다."],
      email: "subin020605@naver.com", instagram: "@suql_s", prefer: "instagram",
      answers: ["그동안 수고했고, 앞으로 좋은 일만 가득하길!", "따뜻하고 부드러운 맛", "언제나 응원해주는 가족과 친구들"] },
    { id: "park-esther", name: "박에스더", en: ["PARK", "ESTHER"], pos: 62.2,
      intro: ["지루한 일상에서 재미를 찾는 사람입니다"],
      email: "estherwinwin47@gmail.com", instagram: "", prefer: "email",
      answers: ["얼른 졸업하자", "바다거북 스프맛", "스포티파이 플레이리스트와 친구들 그리고 가족"] },
    { id: "park-yeongjoo", name: "박영주", en: ["PARK", "YEONGJOO"], pos: 39.2,
      intro: ["안녕하세요 대구를 너무 좋아하고 인생을 재미로 사는 사람입니다."],
      email: "yeongjoo328@gmail.com", instagram: "@ozzu.archive", prefer: "instagram",
      answers: ["고생했다. 이제 집에 가자!!!", "엄청 신 레몬 맛, 맛있는데 너무 먹기 힘들어서", "가족, 친구들, 좋아하는 음악, 그리고 너무너무 가고싶은 우리집"] },
    { id: "park-hyunyeong", name: "박현영", en: ["PARK", "HYUNYEONG"], pos: 52.0,
      intro: ["상상은 크게, 디테일은 작게 놓치지 않는 디자이너입니다."],
      email: "hyunyoung110@gmail.com", instagram: "@you_gyi", prefer: "instagram",
      answers: ["고치고 또 고치느라 고생 많았다! 그래도 결국 해냈네.", "씁쓸하지만 오래도록 기억에 남을 맛", "머릿속에만 있던 이야기가 하나씩 완성되어 가는 순간들과 끝까지 해내고 싶었던 마음"] },
    { id: "park-heesung", name: "박희성", en: ["PARK", "HEESUNG"], pos: 62.5,
      intro: ["찰나를 만들어내는 모션그래픽 오타쿠, 박희성입니다."],
      email: "hspark301@gmail.com", instagram: "@hspark301", prefer: "email",
      answers: ["잘하니까 조급하지 마라.", "두리안", "시편 56편 3절. 그리고 동역자들."] },
    { id: "baek-chaehwan", name: "백채환", en: ["BAEK", "CHAEHWAN"], pos: 61.8,
      intro: ["상상을 좇는 디자이너입니다."],
      email: "bchwan17@gmail.com", instagram: "@baek2i", prefer: "instagram",
      answers: ["멋있다 !", "볼 맛 나는 맛", "침대와 가족 ❤"] },
    { id: "seo-jiwoo", name: "서지우", en: ["SEO", "JIWOO"], pos: 46.1,
      intro: ["좋아하는 것들을 모아", "더 예쁘게 만들어 갑니다"],
      email: "ffgty1234@gmail.com", instagram: "", prefer: "email",
      answers: ["도망가자!!", "불량식품 맛", "환전해 둔 돈, 동기들"] },
    { id: "seol-suhyeon", name: "설수현", en: ["SEOL", "SUHYEON"], pos: 49.2,
      intro: ["작품을 통해 공감과 영감을 전하고 싶은 디자이너입니다."],
      email: "seolsuhyeon0115@naver.com", instagram: "@snowish.visuals", prefer: "email",
      answers: ["또 다른 시작이다!", "쓴맛! 몸에 좋은, 나를 성장시키는 맛", "함께 견뎌내던 친구들"] },
    { id: "so-juhui", name: "소주희", en: ["SO", "JUHUI"], pos: 51.0,
      intro: ["모든 일에 최선을 다하는 소주희입니다!"],
      email: "sosohe0603@gmail.com", instagram: "@so_si_63", prefer: "email",
      answers: ["탈출이다!", "한약", "친구, 가족, 앵두구름이"] },
    { id: "son-jiin", name: "손지인", en: ["SON", "JIIN"], pos: 48.5,
      intro: ["귀여움으로 감동을 전해주고 싶은 디자이너 입니다."],
      email: "jiinson1004444@gmail.com", instagram: "", prefer: "email",
      answers: ["고생했다.", "몽글몽글한 솜사탕 같은 맛", "힘들고 지치더라도 옆에서 격려해준 교수님들과 주변 친구들덕분에 완성까지 갈수 있었다."] },
    { id: "shin-suho", name: "신수호", en: ["SHIN", "SUHO"], pos: 61.2,
      intro: ["재밌는 걸 보여드리겠습니다."],
      email: "suho3541@gmail.com", instagram: "", prefer: "email",
      answers: ["끝난 게 아닌 거 알지?", "고수맛. 난 이해하기 어렵다.", "곽채은"] },
    { id: "shin-jeongmin", name: "신정민", en: ["SHIN", "JEONGMIN"], pos: 48.0,
      intro: ["안녕하세요 신정민입니다."],
      email: "shinjeongmin33@gmail.com", instagram: "", prefer: "email",
      answers: ["그래도 마쳤다.", "맛소금", "다가오는 마감일과 졸업"] },
    { id: "yang-mingjing", name: "양밍징", en: ["YANG", "MINGJING"], pos: 39.3,
      intro: ["상상 속의 세계를 3D 영상으로 하나씩 구현해 나가는 사람입니다."],
      email: "yangmingjing5221@naver.com", instagram: "@ming_522l", prefer: "instagram",
      answers: ["쉽지 않은 과정이었지만, 끝까지 포기하지 않고 작품을 완성해 줘서 고마워.", "쌉싸름한 다크초콜릿 맛! 작업하는 동안은 씁쓸하고 쉽지 않았지만, 완성하고 나면 오래 기억에 남는 여운이 있는 맛.", "하나씩 완성되어 가는 장면들을 보는 뿌듯함과, 끝까지 작품을 완성하고 싶다는 마음!"] },
    { id: "yang-yoonji", name: "양윤지", en: ["YANG", "YOONJI"], pos: 71.9,
      intro: ["귀여운 것과 세련된 것, 여백의 미를 추구하는 디자이너입니다."],
      email: "slad0110@naver.com", instagram: "@sur__0110", prefer: "instagram",
      answers: ["고생했다, 이제 하고 싶은 것들 잔뜩 해보자!", "탱글탱글하고 달콤한 과일 젤리 맛", "같이 새벽까지 버티며 헛소리를 들어준 지인들과 포기하지 않도록 도와준 교수님들."] },
    { id: "yang-juyeon", name: "양주연", en: ["YANG", "JUYEON"], pos: 60.6,
      intro: ["정해진 정답보다 재미있는 오답을 찾아갑니다."],
      email: "yangju5855@gmail.com", instagram: "@yangju.archive", prefer: "instagram",
      answers: ["일단 웃자!", "해리포터 랜덤젤리맛", "24시간 내내 함께한 음악과 동기들, 가족"] },
    { id: "eom-jaehyeon", name: "엄재현", en: ["EOM", "JAEHYEON"], pos: 50.6,
      intro: ["우산 없이 빗방울을 피해서"],
      email: "222harry@naver.com", instagram: "@__jhynwld", prefer: "instagram",
      answers: ["1RM을 올리자", "사레레맛", "맥풋가쿄"] },
    { id: "oh-yeonu", name: "오연우", en: ["OH", "YEONU"], pos: 62.8,
      intro: ["Subculture Visual Artist @y3onuz1vert"],
      email: "y3onuz1vert@gmail.com", instagram: "@y3onuz1vert", prefer: "instagram",
      answers: ["많은걸 얻어갑니다", "Kaorin NAMI MARKISHA", "Hatsune Miku"] },
    { id: "yoon-seobin", name: "윤서빈", en: ["YOON", "SEOBIN"], pos: 37.1,
      intro: ["아이들을 위한 동화 같은 이야기 속에 어른을 위한 메시지를 담는 사람입니다."],
      email: "seobin70901@daum.net", instagram: "@ossbbbiiy", prefer: "email",
      answers: ["이 기억을 힘으로 앞으로도 열심히.", "담백하지만 자꾸 생각나는 맛.", "완성된 작품을 지인들에게 보여줄 순간을 상상하는 것이 큰 힘이 되었다."] },
    { id: "lee-minkyo", name: "이민교", en: ["LEE", "MINKYO"], pos: 50.1,
      intro: ["크리처와 갑옷을 좋아하는 아트 디자이너입니다."],
      email: "minkyo.art@gmail.com", instagram: "", prefer: "email",
      answers: ["고생많았다. 푹 쉬어라", "쓴맛 (기나긴 역경의 맛)", "잠깐 놀고, 맛있는 거 먹고, 잠 많이 자고, 라디오 방송 듣는 것."] },
    { id: "lee-mina", name: "이민아", en: ["LEE", "MINA"], pos: 59.0,
      intro: ["안녕하세요 이민아입니다."],
      email: "01039772620c@gmail.com", instagram: "", prefer: "email",
      answers: ["곧 끝난다", "쓴 맛", "친구들, 음악"] },
    { id: "lee-somi", name: "이소미", en: ["LEE", "SOMI"], pos: 59.4,
      intro: ["그림으로 나만의 이야기를 만들어 갑니다."],
      email: "ai01h0m@gmail.com", instagram: "", prefer: "email",
      answers: ["안주하지 말고 나아가자", "자몽맛", "실물 제작에 큰 조언과 도움을 준 수빈 언니. 친구들."] },
    { id: "lee-eunsu", name: "이은수", en: ["LEE", "EUNSU"], pos: 42.7,
      intro: ["스토리 구상을 좋아하는 이은수 입니다!"],
      email: "dldmstn2320@gmail.com", instagram: "@e0s0.png", prefer: "instagram",
      answers: ["힘들어도 끝을 보는거야", "어두운 블랙홀맛", ""] },
    { id: "lee-jaeyi", name: "이재이", en: ["LEE", "JAEYI"], pos: 56.5,
      intro: ["다양한 것을 좋아하고 재밌게 표현하는 다재다능 함을 목표로 가지고 있습니다."],
      email: "jayden345@naver.com", instagram: "@leejayden1577", prefer: "email",
      answers: ["알차게 잘 즐겼다!", "담백하지만 중독적인 맛", "함께 해준 팀원들과 친구들 그리고 음악이 있었기에 무사히 마무리 할 수 있었습니다."] },
    { id: "lee-jongyoon", name: "이종윤", en: ["LEE", "JONGYOON"], pos: 37.4,
      intro: ["여러 소스들로 하나의 영상을 완성하는 컴포지터입니다."],
      email: "sunnyskip@naver.com", instagram: "@zottbug", prefer: "instagram",
      answers: ["라이딩 가실", "보라색맛", "YZF-R3 320cc"] },
    { id: "lee-junyoung", name: "이준영", en: ["LEE", "JUNYOUNG"], pos: 51.6,
      intro: ["장면에 생명력을 더하는 \"FX 디자이너\" 입니다."],
      email: "junleeyoung0921@gmail.com", instagram: "@jun.lee_02", prefer: "instagram",
      answers: ["만족하지 말자", "난생처음 사먹은 치킨 맛", "친구들"] },
    { id: "lee-hyobin", name: "이효빈", en: ["LEE", "HYOBIN"], pos: 47.1,
      intro: ["‘Veni, vidi, vici!’ 보고, 만들고, 평정하는 크리에이터."],
      email: "ttobinstudy@naver.com", instagram: "@creator_ttobin", prefer: "instagram",
      answers: ["이것도 다 추억이다!!", "뼈해장국 맵기 선택 잘못해서 눈이 번쩍 떠진 맛.", "호랑이 해장국의 '뼈해장국', 놀라운 떡볶이의 '놀라운 떡볶이(1~2분)+베이컨 토핑 추가+김말이+튀겨만두+펩시제로'"] },
    { id: "yim-seohyun", name: "임서현", en: ["YIM", "SEOHYUN"], pos: 52.5,
      intro: ["완벽한 답보다, 좋아하는 것을 나만의 방식으로 완성해 나가는 디자이너입니다."],
      email: "seohyunyim03@gmail.com", instagram: "", prefer: "email",
      answers: ["이제 끝.", "다 녹아버린 아이스크림", "친구"] },
    { id: "yim-songun", name: "임송운", en: ["YIM", "SONGUN"], pos: 71.2,
      intro: ["작지만 꼭 필요한 반창고처럼,", "작은 불편함까지 세심하게 살피는 디자이너입니다!"],
      email: "songwoonu@naver.com", instagram: "@s.luxk_y", prefer: "email",
      answers: ["후회 없이 다양한 도전을 해온 나에게 박수를! 정말 수고 많았고, 앞으로도 새로운 경험을 마음껏 쌓아가며 살아가자!", "아인슈페너처럼 쌉싸름하면서도 결국은 달콤했던 맛.", "함께 밤을 지새우며 웃고, 잠시 일상에서 벗어나 즐겼던 순간들"] },
    { id: "lim-jungyeon", name: "임정연", en: ["LIM", "JUNGYEON"], pos: 52.8,
      intro: ["디자인으로 일상에 기분 좋은 변화와 공감을 전달합니다."],
      email: "jyeonee.lim@gmail.com", instagram: "", prefer: "email",
      answers: ["고생한 만큼 많이 배웠던 한 해였다. 앞으로도 화이팅!!", "부드러움 속에 선명한 인상을 남기는 아포카토 맛", "우리 가족, 동기들, 동네 친구들"] },
    { id: "lim-junho", name: "임준호", en: ["LIM", "JUNHO"], pos: 33.9,
      intro: ["임준호입니다."],
      email: "dlawnsgh019@gmail.com", instagram: "@luck_ypoint", prefer: "email",
      answers: ["해냈다.", "삼키긴 힘들지만 계속 맛보고 싶은 맛", "가족들과 여자친구"] },
    { id: "joun-yeonjoung", name: "전연정", en: ["JOUN", "YEONJOUNG"], pos: 57.4,
      intro: ["독특한 시선으로 세상을 바라보고 과감한 표현을 추구하는 디자이너입니다."],
      email: "yeonjoung.joun@gmail.com", instagram: "@ye0nxj", prefer: "email",
      answers: ["나아가는 길에 앞을 가로막는 것은 없다.", "강렬한 빨간 맛", "고소한 카페라떼, 응원해 주는 가족과 친구들, 스틸 볼 런"] },
    { id: "jeon-hangyeol", name: "전한결", en: ["JEON", "HANGYEOL"], pos: 48.1,
      intro: ["3D 모션그래픽과 제너러티브 AI, 인터랙티브 기술을 자유롭게 융합해 독창적 미디어 아트 세계를 구현해 내는 '테크-아트(Tech-Art) 모션 디자이너'입니다."],
      email: "jhg010911@gmail.com", instagram: "@cryptomatteboy", prefer: "instagram",
      answers: ["더 발전할 일만 남았다.", "중독적인 맛", "수 많은 사람들이 내 작품을 본다는 부담감"] },
    { id: "jeong-yoonseo", name: "정윤서", en: ["JEONG", "YOONSEO"], pos: 53.0,
      intro: ["다양한 재미있는 것을 만들어 낼 디자이너 입니다."],
      email: "oes56lll@gmail.com", instagram: "@hellllle.n", prefer: "email",
      answers: ["떠나자", "무지개맛", "함께 고생하는 사람들"] },
    { id: "jeong-hwaran", name: "정화란", en: ["JEONG", "HWARAN"], pos: 38.0,
      intro: ["감각을 자극하고 생각을 움직이며 영향력을 끼치고픈 영상디자이너입니다."],
      email: "jeonghwalan@gmail.com", instagram: "@hwaran___", prefer: "instagram",
      answers: ["굿!", "임소초 마라탕 3단계 맛", "선후배, 동기들, 조아진"] },
    { id: "cho-gain", name: "조가인", en: ["CHO", "GAIN"], pos: 53.9,
      intro: [],
      email: "lorajoe@naver.com", instagram: "@cho_ry_2", prefer: "instagram",
      answers: ["", "", ""] },
    { id: "jo-seohee", name: "조서희", en: ["JO", "SEOHEE"], pos: 25.7,
      intro: ["상상을 시각으로 구현하는 디자이너입니다."],
      email: "jshjjang215@gmail.com", instagram: "@jseohee_", prefer: "instagram",
      answers: ["재밌었다!", "오미자 맛", "음식과 게임, 내 작품과 사람들"] },
    { id: "jo-yeseul", name: "조예슬", en: ["JO", "YESEUL"], pos: 65.7,
      intro: [],
      email: "yestay0829@gmail.com", instagram: "@jo_yessssss", prefer: "email",
      answers: ["", "", ""] },
    { id: "cho-hyena", name: "조혜나", en: ["CHO", "HYENA"], pos: 51.9,
      intro: ["오래 보아도 변질되지않는 귀여움과 포근함을 만드는 디자이너"],
      email: "taenabbi32@gmail.com", instagram: "@taenabbi32", prefer: "email",
      answers: ["긴 마라톤을 완주했다고 생각했는데, 앞으로는 더 긴 철인 3종 경기가 펼쳐질 걸 생각하니 각오를 단단히 해야 할 것 같다!", "세 가지 졸업작품이라는 서로 다른 재료를 오랜 시간 정성껏 끓여, 나라는 사람을 표현하는 하나의 메뉴로 완성한 전골맛.", "친구들과의 밤샘 과제와 카페, 음악 그리고 부모님이 만들어주신 안정감"] },
    { id: "choi-kahyun", name: "최가현", en: ["CHOI", "KAHYUN"], pos: 47.9,
      intro: ["이상과 현실을 조율하기 위해 끊임없이 고민해 나가는 사람입니다."],
      email: "visitorkh@gmail.com", instagram: "", prefer: "email",
      answers: ["화이팅", "쓴맛", "보리"] },
    { id: "choi-suyeon", name: "최수연", en: ["CHOI", "SUYEON"], pos: 35.5,
      intro: ["익숙한 것에서 새로운 가능성을 발견하는 최수연입니다."],
      email: "sjdhsu78@gmail.com", instagram: "@klttiy", prefer: "instagram",
      answers: ["자유다", "커피 맛", "친구들, 덕질"] },
    { id: "choi-wonjun", name: "최원준", en: ["CHOI", "WONJUN"], pos: 38.6,
      intro: ["최원준입니다."],
      email: "beenz3814@gmail.com", instagram: "", prefer: "email",
      answers: ["굿", "쓴맛", "졸업"] },
    { id: "choi-yoojeong", name: "최유정", en: ["CHOI", "YOOJEONG"], pos: 34.0,
      intro: ["JUST DO IT!' 하는 콘텐츠 크리에이터"],
      email: "yoojeongchochoi@gmail.com", instagram: "@chochoi_yj", prefer: "email",
      answers: ["그래도 꽤 재미있지 않았냐?", "도파민이 팡팡 터지는 맛", "아낌없이 응원해준 가족, 교수님, 친구들 그리고 내 플레이리스트"] },
    { id: "choi-yoonyoung", name: "최윤영", en: ["CHOI", "YOONYOUNG"], pos: 66.6,
      intro: ["좋아하는 것을 찾아 고민하고 나만의 방식으로 만들어갑니다."],
      email: "03chldbsdud@naver.com", instagram: "@yo_0n0", prefer: "instagram",
      answers: ["할 수 있다", "말차맛", "음악"] },
    { id: "choi-hamin", name: "최하민", en: ["CHOI", "HAMIN"], pos: 52.6,
      intro: [],
      email: "gkals0306@naver.com", instagram: "@dayis_daisy_36", prefer: "email",
      answers: ["", "", ""] },
    { id: "choi-hanyoung", name: "최한영", en: ["CHOI", "HANYOUNG"], pos: 66.9,
      intro: ["계속 보고싶은 사람입니다!"],
      email: "zoayoung31@gmail.com", instagram: "@hyoooio", prefer: "instagram",
      answers: ["이제 진짜 시작이다!", "뒤끝만큼은 달다!", "미래를 향한 기대감"] },
    { id: "choi-hyewon", name: "최혜원", en: ["CHOI", "HYEWON"], pos: 52.9,
      intro: ["상상 속 세계에 생명을 불어넣는 디자이너입니다."],
      email: "chhw0921@naver.com", instagram: "", prefer: "email",
      answers: ["고생 많았다. 고마워!", "얼음 가득 넣은 콜라 맛", "가족, 친구들, 그리고 음악"] },
    { id: "han-gayoung", name: "한가영", en: ["HAN", "GAYOUNG"], pos: 46.2,
      intro: ["안녕하세요, 한가영입니다."],
      email: "hang5518@naver.com", instagram: "@gy__1ga__0", prefer: "instagram",
      answers: ["많은 일이 있던 1년이다 진짜 끝이자 시작!", "도파민 터지는 맛", "친구, 가족"] },
    { id: "han-dayoung", name: "한다영", en: ["HAN", "DAYOUNG"], pos: 54.2,
      intro: ["작은 아이디어를 관찰하고 탐구하며, 저만의 시각으로 새로운 가능성을 만들어가는 디자이너입니다."],
      email: "hanara70039@gmail.com", instagram: "@da_young1111", prefer: "email",
      answers: ["쭉 가보자!!!", "홍삼", "본인 일처럼 함께 고민해준 애인, 서로 밀고 끌어당겨준 팀원들"] },
    { id: "han-dain", name: "한다인", en: ["HAN", "DAIN"], pos: 56.2,
      intro: ["한다인입니다!!"],
      email: "hanjibbeam@gmail.com", instagram: "@dddsouuuup", prefer: "email",
      answers: ["정말정말 고생했고 앞으로도 파이팅!!", "단추맛", "기다려주지 않고 지나가는 시간!"] },
    { id: "heo-hajung", name: "허하정", en: ["HEO", "HAJUNG"], pos: 49.7,
      intro: ["쉽게 만족하지 않습니다! 더 나은 방향을 찾습니다."],
      email: "0838hhj1@naver.com", instagram: "@gjgwjd", prefer: "instagram",
      answers: ["힘들다는 생각은 들었는데 포기라는 생각은 들지 않았다. 잘했어 잘했어~", "짠맛. 눈물이 많이 들어가서.", "손 내밀어준 주변 사람들, 우리 집에 얹혀사는 개."] }
  ],
  /* Which contacts the profile and work pages show: 'all' = e-mail and Instagram (when given),
     'preferred' = only the one the student picked for the catalogue. */
  contactShow: 'all',

  /* WORKS — the list itself lives in js/data-works.js (one entry per work, team works once).
     Every student shows 1 to 3 works. A student without an entry there gets one grey
     placeholder card, so the profile can still be clicked through. */
  works: (window.RT.worksData || []).slice(),
  workImages: 4,                    // placeholder blocks on the work page while a work has no images
  untitled: '[제목 확인 필요]',       // shown while a work's title is still ''
  pending: '[작품 준비 중]'          // title of the placeholder card
};

/* Derived data + lookups */
(function () {
  const S = RT.site;
  S.designers.forEach((d) => { d.image = d.image || `assets/img/people/${d.id}.webp`; });
  S.committee.forEach((m) => {                                     // a member is one of the designers
    const d = S.designers.find((x) => x.id === m.designer);
    if (!d) return;
    m.name = m.name || d.name; m.image = m.image || d.image; if (m.pos == null) m.pos = d.pos;
  });
  /* Contact rows of a designer: [label, text, link] — used by the profile and the work page. */
  S.contactsOf = (d) => {
    const rows = [];
    const want = (k) => S.contactShow !== 'preferred' || !d.prefer || d.prefer === k;
    if (d.email && want('email')) rows.push([S.copy.profile.email, d.email, `mailto:${d.email}`]);
    if (d.instagram && want('instagram')) rows.push([S.copy.profile.instagram, d.instagram, `https://www.instagram.com/${d.instagram.replace(/^@/, '')}/`]);
    return rows;
  };
  /* Works: file names → paths, one designer → list, missing titles → visible reminder. */
  const file = (id, v) => (/[\/.]/.test(String(v)) ? String(v) : `assets/img/works/${id}/${v}.webp`);
  S.works.forEach((w) => {
    w.designers = w.designers || (w.designer ? [w.designer] : []);
    w.designer = w.designers[0];
    w.title = w.title || S.untitled;
    w.thumb = w.thumb === false || w.thumb === null ? null : file(w.id, w.thumb === undefined || w.thumb === true ? 'thumb' : w.thumb);
    w.images = (w.images || []).map((v) => file(w.id, v));
  });
  S.designers.forEach((d) => {                                     // nobody is left without a card
    if (S.works.some((w) => w.designers.includes(d.id))) return;
    S.works.push({ id: `${d.id}-1`, designers: [d.id], designer: d.id, group: null, title: S.pending, thumb: null, images: [], placeholder: true });
  });
  const by = (list) => new Map(list.map((x) => [x.id, x]));
  const groups = by(S.groups), designers = by(S.designers), works = by(S.works);
  S.get = {
    group: (id) => groups.get(id), designer: (id) => designers.get(id), work: (id) => works.get(id),
    worksOf: (id) => S.works.filter((w) => w.designers.includes(id))                           // a student shows at most three,
      .sort((a, b) => ((a.order || {})[id] || 99) - ((b.order || {})[id] || 99)).slice(0, 3),  // in the order they handed them in
    worksIn: (groupId) => S.works.filter((w) => w.group === groupId && !w.placeholder),
    designersOf: (w) => w.designers.map((id) => designers.get(id)).filter(Boolean),
    subjectOf: (w) => w.subject || (groups.get(w.group) || {}).ko || ''
  };
  /* Which designer / work / subject a page shows comes after the "#": designer.html#kang-dongwoo
     (the older designer.html?id=kang-dongwoo form is still understood). */
  S.param = (key) => new URLSearchParams(window.location.search).get(key) || decodeURIComponent(window.location.hash.slice(1)) || null;
})();
