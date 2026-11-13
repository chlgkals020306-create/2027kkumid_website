# Rare Taste — Graduation Exhibition

정적 사이트입니다. 빌드 과정 없이 `index.html` 을 열거나 폴더째 호스팅에 올리면 됩니다.

**사이트 이름(브라우저 탭 제목)** — `Rare Taste | 제36회 건국대학교 글로컬캠퍼스 시각영상디자인학과 영상/디지털 트랙 졸업전시회`. 각 `.html` 의 `<title>` · `og:title` 과 `js/data.js` › `siteName` 에 같은 문구가 들어 있습니다 (바꿀 때는 모두 함께). 프로필 · 작품 · 과목 페이지는 `이름 | 사이트 이름` 형태로 표시됩니다.

## 페이지
| 파일 | Figma 프레임 | 설명 |
| --- | --- | --- |
| `index.html` | 인트로 · 메인 · 컨셉_1~3 · 영상_1~2 · 세부사항 | 스크롤로 진행되는 홈 |
| `introduce.html` | introduce | 지도교수 스트립 + 위원회(COMMITTEE) |
| `works.html` | works_1 | 과목(그룹) 목록 |
| `works-group.html#과목id` | works_2 | 한 과목의 작품 그리드 |
| `designers.html` | designer | 디자이너 그리드 + 이름 검색 |
| `designer.html#디자이너id` | designer_profile → designer_interview → designer_works | 스크롤로 이어지는 한 화면 |
| `work.html#작품id` | works_detail | 작품 세부 (이미지가 여백 없이 연달아 배치) |

메뉴(Figma `menu`)는 모든 페이지 오른쪽 위 햄버거 버튼으로 엽니다 (열리면 버튼이 닫기 ✕ 로 바뀝니다). 항목은 `js/data.js` 의 `menu[]` 에서 추가 · 삭제합니다.

## 구조
```
index.html  introduce.html  works.html  works-group.html  designers.html  designer.html  work.html
css/main.css        토큰 · 타이포 · 네비게이션 · 메뉴 · 홈 씬 · 세부사항 · 반응형
css/pages.css       서브 페이지 (카드 그리드, 검색, 디자이너 스테이지, introduce, works …)
js/data.js          ★ 홈 콘텐츠: 문구, 이미지/영상 경로, 디쉬-과목, 아코디언, 파트너, 메뉴, 스크롤 타임라인
js/data-site.js     ★ 서브 페이지 콘텐츠: 과목(groups), 교수진, 위원회, 디자이너
js/data-works.js    ★ 작품 목록 (제목 · 과목 · 디자이너 · 이미지 순서)
js/chrome.js        공통: 네비게이션 크기, 메뉴 오버레이, 페이지 전환, 등장 애니메이션, 푸터, 타이틀 레터링
js/pages.js         서브 페이지 빌더 (body 의 data-page 값으로 선택)
js/render.js        홈: data.js → DOM
js/logo.js          홈: 인트로 로고 애니메이션 (프레임 시퀀스를 캔버스에 재생)
js/timeline.js      홈: 스크롤 진행도(p) 하나로 씬 01–07 전체를 그리는 엔진
js/dishes.js        홈: 디쉬 호버 / 터치 / 키보드 인터랙션
js/details.js       홈: 세부사항 리빌, 상단 고정(sticky) 패널, 아코디언
assets/img, assets/video
```

## 나중에 교체할 것
`js/data.js`, `js/data-site.js` 에서 `placeholder: true` 또는 `[임시]` 를, `js/data-works.js` 에서 `check: true` 를 검색하세요.

| 항목 | 위치 |
| --- | --- |
| 메인 필름 (임시 영상) | `data.js` › `film.src`, `film.poster` → 16:9 mp4, 교체 후 `placeholder: false` |
| 전시 정보 · 오시는 길 · 주차 안내 | `data.js` › `offline.groups[]` — 줄(`rows`: 라벨 + 내용, `note` 는 회색 보조 줄)과 약도(`map`)로 구성. 약도는 Figma 에서 내보낸 `assets/img/map-directions.svg`, `map-parking.svg` (같은 이름으로 덮어쓰면 교체) |
| 인트로 로고 애니메이션 | `assets/img/logo-anim/000–085.webp` (logo.mov 에서 추출한 흰색+알파 프레임). 색 · 속도 · 시작 지연은 `data.js` › `intro.logoAnim` 의 `color`, `fps`, `delay`. 영상을 바꾸면 같은 크기(660×458)로 프레임을 다시 뽑아 덮어쓰고 `count` 를 맞추세요 |
| 테이블 · 컨셉 · 과목 사진 | 포스터 원본에서 기존과 같은 구도로 다시 잘라 2배 크기로 넣었습니다: `assets/img/table.webp`(2586×3172 · 1293×1586 비율 유지), `concept-1.webp`(2586×1080) · `concept-2.webp`(1520×1700 — Figma 에 들어 있는 원본에서), `concept-3.webp`(2586×1700), 과목 표지 `works/<과목id>.webp`(2838×1692), 디쉬 카드 `subjects/<과목id>.webp`(808×808). 같은 이름 · 같은 비율로 덮어쓰면 교체됩니다 |
| 디자이너 정보 | `data-site.js` › `designers[]` — 졸업생 65명(휴학생 제외), 이름 가나다순. 도록·명함 정보 시트(영문 이름, 이메일, 인스타그램)와 인터뷰 시트(소개 한 줄, 답변 3개), 프로필 사진(`assets/img/people/영문이름.webp`)에서 가져왔습니다. 전화번호와 학번은 사이트에 넣지 않았습니다. 답변이 비어 있는 항목은 `''` 이며 화면에서 그 줄은 빠집니다 |
| 연락처 표시 방식 | `data-site.js` › `contactShow` — `'all'`(이메일 + 인스타그램) / `'preferred'`(도록에 표시하기로 고른 한 가지만, `designers[].prefer`) |
| 작품 목록 | `js/data-works.js` › `RT.worksData[]` — 작품 하나에 항목 하나 (팀 작품은 `designers` 에 구성원을 모두 적은 항목 하나). 제목은 학생들이 낸 이미지에 적힌 글자를 옮긴 것이라 `check: true` 가 붙은 항목은 확인이 필요하고, `title: ''` 인 항목은 `[제목 확인 필요]` 로 표시됩니다. 프로필 페이지에는 `order` 순서로 최대 3개까지 보이고, 작품이 없는 학생은 `[작품 준비 중]` 카드 하나가 보입니다 (과목 페이지에는 나오지 않음) |
| 작품 이미지 | `assets/img/works/<작품 id>/` 에 `thumb.webp`(4:5 썸네일 — 프로필의 작품 카드와 과목 페이지 카드), `title.webp`(작품 페이지 맨 위), `1.webp` `2.webp` …(그 아래로 번호 순서). 작품 페이지는 `images` 배열 순서대로 여백 없이 이어 붙이고, 각 이미지는 원래 비율 그대로 보입니다. 썸네일만 있는 작품은 썸네일이 포스터처럼 보입니다. GIF 는 움직이는 WebP 로 변환했습니다 |
| 과목 페이지 영문 타이틀 | `data-site.js` › `groups[].en` (`enPlaceholder: true` 는 임의 번역) |
| 교수진 | `data-site.js` › `professors[]` — 8분의 이름 · 담당 과목 · 사진(`assets/img/people/prof-*.webp`, Figma 에 넣어 둔 원본에서 900px 로 내보냄). 배열 순서가 곧 화면의 왼쪽 → 오른쪽 순서입니다. 평소에는 모두 작은 크기로 놓이고, 마우스를 올린 이미지만 커지며 설명이 나타납니다 (한 분을 기본으로 크게 두려면 그 항목에 `featured: true`). VFX 교수님 성함은 사이트에 `하주영`, Figma 레이어 이름은 `하주연` 이라 확인이 필요합니다 |
| 위원회 | `data-site.js` › `committee[]` — 위원장 2명 + 위원 9명. `designer` 에 디자이너 id 를 적으면 이름 · 사진 · 프로필 링크가 따라옵니다. `role: 'chair' | 'member'` 가 위원장 / 위원 필터에 쓰이고, 이름 아래에는 `part`(총무 / 영상팀 / 기획팀 / 디자인팀)가 표시되고, 비어 있으면 위원장 / 위원이 표시됩니다 |

`table.webp` 를 다른 구도로 바꾸면 `dishes[]` 의 x/y/w/h(%), 번호 배지 위치 `badge`(%) 와 `assets/img/dishes/*.png` 마스크도 함께 바꿔야 합니다. 번호 배지(01~08)는 Figma "메인" 의 위치 그대로이며, Figma 에 없는 08(카나페)만 임의로 놓았습니다.

## 속도 · 타이밍 조절
**홈** — `RT.timelineConfig` (`data.js` 하단). 단위는 "화면 높이 1개만큼의 스크롤".
- `[시작, 끝]` 구간이 길수록 그 전환이 천천히 진행됩니다. 전체를 더 느리게 하려면 구간을 늘리고 `end` 도 함께 늘리세요.
- 메인이 왼쪽으로 완전히 빠진 뒤(`mainSlide` 끝 4.7) 컨셉_1 이 시작되기(`c1ImageIn` 시작 5.1)까지가 흰 배경만 보이는 구간입니다. 길이를 바꾸려면 `c1ImageIn` 이후의 숫자를 모두 같은 만큼 옮기세요.
- 인트로 로고는 `introLogoFade` 구간에서 사라지고, 네비게이션 로고는 `navLogoIn` 구간에서 나타납니다.
- 컨셉_2 사진은 `c2ImageOut` 구간에 오른쪽으로 완전히 빠지고, 그 뒤 `c3In` 구간에 컨셉_3 배경이 fade in 됩니다.
- `smoothing` 을 낮추면 스크롤을 멈춘 뒤에도 더 길게 미끄러지듯 따라옵니다.
- `text` 의 `in` / `out` 은 줄 단위 텍스트가 들어오고 나가는 구간, `lineStagger` 는 줄 사이 간격입니다.
- 세부사항 고정: OFFLINE 패널이 영상 위로 올라온 뒤 화면 상단에 붙어 머무는 길이는 `css/main.css` 의 `.details__hold { height }` 입니다.

**인트로 → 메인 자동 스크롤** — `RT.timelineConfig.introSnap`. 인트로에서 아래로 `from`(화면 높이의 22%) 넘게 스크롤하면 메인이 화면에 꽉 차는 지점(`to`)까지 스스로 내려가고, 메인에서 `back`(30%) 넘게 되올리면 인트로로 돌아갑니다 (`back: null` 이면 되돌아가기 없음, `duration` 은 이동 시간 ms). 마우스 휠 · 키보드에만 적용되고 터치 스크롤은 건드리지 않습니다.

**디자이너 페이지** — `js/pages.js` 의 `DZ` (프로필 텍스트 퇴장, 사진 크기 변화, 인터뷰 등장/퇴장, 작품 등장 지점). 작품은 스크롤에 맞물려 움직이지 않고, 스크롤이 `worksAt`(화면 높이 3.3개 — 사진이 사라진 직후)를 지나면 스크롤바 → 작품 1 · 2 · 3 순서로 스스로 fade in 됩니다. `worksOff`(3.2) 위로 되올리면 한꺼번에 사라지고, 다시 내리면 다시 등장합니다. 등장 속도 · 작품 사이 간격은 `css/pages.css` › `.dz__works.is-in .wcard` 의 시간(1.2s)과 지연(0.2s + 순서 × 0.22s)입니다. 작품 줄(Figma `designer_works`)은 창 **폭**에 맞춘 단위 `--w`(= 창 폭 ÷ 1293)로 배치되어, 어떤 화면에서도 Figma 와 같은 비율로 보입니다: 앞의 두 작품은 온전히 보이고 세 번째 작품은 오른쪽 화면 밖으로 약 30%(350 중 104) 걸쳐 나갑니다. 마우스를 오른쪽으로 옮기거나 위의 가로 스크롤바를 끌면 세 번째 작품이 오른쪽 여백(40px)까지 들어온 지점에서 멈춥니다 — 작품 세 개 외의 빈 자리는 나타나지 않습니다. Figma 프레임보다 가로로 넓은 창에서는 줄 전체가 위로 조금 올라가고(Figma 기준 스크롤바 y 214), 아주 넓은 창에서는 이미지 높이만 조금 줄어듭니다 (`js/pages.js` › `measure`). 작품이 1~2개뿐이면 스크롤할 것이 없어 마우스를 따라 조금만 움직입니다 (`nudge`).

**서브 페이지 등장** — `css/pages.css` › 1. `[data-rv]` (줄 단위 텍스트, 그리드는 한 줄씩 왼쪽 → 오른쪽).

## 크기 기준 — Figma 프레임을 화면에 맞춘 비율
사이트 전체가 "1293×850 Figma 프레임을 지금 창에 맞춰 넣은 것"으로 계산됩니다 (`css/main.css` 맨 위 SCALE).
- `--px` = Figma 1px 이 화면에서 차지하는 크기 = `min(창 폭 ÷ 1293, 창 높이 ÷ 850)`. 폭과 높이 중 더 빠듯한 쪽에 맞추므로, 가로로 넓은 창에서도 글자와 요소가 Figma 보다 커지지 않습니다.
- 모든 글자 · 간격 · 요소 크기는 "Figma px × `--px`" 로 적혀 있습니다. 예: `font-size: max(calc(14px * var(--fl)), calc(16 * var(--px)))` = Figma 16px. 앞의 14px 은 휴대폰 화면용 하한입니다.
- 좌우 여백(`--gutter`)은 모든 페이지에서 창 가장자리로부터 Figma 40px 입니다. 네비게이션 · 타이틀 · 그리드 · 푸터가 모두 이 값에 맞춰 정렬됩니다. 그리드 · 교수진 줄 · 이미지처럼 화면 폭을 채우는 요소는 Figma 처럼 여백에서 여백까지 채웁니다.
- 디자이너 페이지의 `--u`, 교수진 줄의 `--pu` 도 같은 단위입니다. 디자이너 페이지의 작품 줄만 창 폭 기준 단위 `--w` 를 씁니다 (위 "속도 · 타이밍 조절 › 디자이너 페이지" 참고).

## 네비게이션
모든 페이지와 메뉴에서 같은 크기 · 같은 위치입니다 (Figma 홈 프레임 기준: 로고 47×27, x 40 / y 21, 메뉴 버튼 y 32). 좌우 여백은 페이지 여백(`--gutter`, 1293px 에서 40px)과 같아 콘텐츠 가장자리에 맞고, 크기는 다른 요소와 같은 비율(`--nk` = `--px`)을 따릅니다. 홈 인트로(맨 첫 화면)에서도 메뉴 버튼은 다른 페이지와 같은 자리(여백 40px)에 있고, 로고는 스크롤하면 fade in 됩니다.

## 스크롤
- 모든 페이지는 들어올 때(새로고침 · 뒤로 가기 포함) 맨 위에서 시작합니다 (`js/chrome.js` › `initTop`).
- 창 오른쪽의 스크롤바는 모든 페이지에서 숨겨져 있습니다 (`css/main.css` › `html`). 스크롤 자체는 그대로 됩니다.

## 인트로 로고
`data.js` › `intro.logoAnim`. 로고가 써지는 애니메이션이 끝나면 완성된 상태로 `hold`(1.6초) 머물렀다가 `fade`(1초) 동안 서서히 사라지고, `gap`(0.4초) 뒤에 다시 재생됩니다. `loop: false` 로 두면 한 번만 재생하고 멈춥니다. 색은 `color`. 스크롤로 인트로를 벗어나 있는 동안에는 그리지 않습니다.

## 커서
마우스를 쓰는 화면에서는 모든 페이지의 커서가 포크로 바뀝니다. 설정은 `data.js` › `cursor`.

- **평소**: 포크는 실제 시스템 커서(CSS 커서 이미지 `assets/img/cursor-fork-rest.png`, 고해상도 화면용 `-2x.png`)로 그려져서 일반 마우스 포인터와 똑같은 감도로 움직입니다.
- **클릭하는 동안, 창 가장자리 근처**: 페이지가 직접 그립니다(`assets/img/cursor-fork.webp`). 클릭하면 `press`(−60°)로 돌면서 `pressScale`(0.95)로 작아졌다가 돌아오고, 끝나면 다시 시스템 커서로 넘어갑니다. 브라우저는 32px 보다 큰 커서 이미지가 페이지 밖으로 걸치면 기본 화살표로 바꿔 버리기 때문에, 오른쪽 · 아래쪽 가장자리 근처에서도 페이지가 그립니다.
- `height`(길이 108px) · `rest`(기본 각도 −30° = 포크 끝이 왼쪽 위)를 바꾸면 시스템 커서용 그림 두 장도 같은 모양으로 다시 만들어야 합니다 (128px 이하만 가능). `native: null` 로 두면 그림 없이 항상 페이지가 그리는 방식만 쓰는데, 이때는 손보다 한두 프레임 늦게 따라와 감도가 낮게 느껴집니다.
- 포크 끝(tines)이 클릭 지점이고, 터치 기기에서는 나타나지 않습니다. 동작은 `js/chrome.js` › `initFork`, 모양은 `css/main.css` 맨 아래 `.fork`.

## 폰트
- 타이틀: Adobe Fonts **Caesura Bold** (웹 키트 `sut8xhy`, family 이름 `caesura`). 키트가 로드되면 실제 텍스트로 표시됩니다.
- 키트를 불러올 수 없는 환경(등록되지 않은 도메인, 로컬 파일 등)에서는 `RT.data.titleArt` 에 등록된 Figma 추출 Caesura 마스크(`assets/img/titles/`)로 같은 글자를 그립니다. 등록되지 않은 문구(예: 조예슬 외 디자이너의 영문 이름)는 그 환경에서 본문 서체로 보입니다 — 키트가 로드되는 실제 배포 환경에서는 모두 Caesura 입니다.
- 본문: Pretendard(CDN). Noto Sans KR 은 CDN 이 막힌 환경용 대체입니다.
