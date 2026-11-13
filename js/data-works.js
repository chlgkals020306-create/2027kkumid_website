/* ————————————————————————————————————————————————————————————————————————————
   RARE TASTE — works (generated from the students' image folders)

   One entry per work. A team work is ONE entry with several designers.
     id        folder name under assets/img/works/ and the address: work.html#<id>
     title     work title — read off the artwork; entries with `check: true` still need
               to be confirmed (or filled in when the title is '')
     group     subject page it belongs to (RT.site.groups[].id)
     subject   only when the card should show another subject name than the group's
     designers RT.site.designers[].id — every member of the team
     order     position on each designer's profile (1 – 3)
     images    work page, top to bottom: 'title' = title image, then the sub images by number.
               Each name is a file in the work's folder (title.webp, 1.webp …);
               a full path ('assets/…/x.webp') works too.
     thumb     false → no thumbnail yet (grey placeholder)
   Images: assets/img/works/<id>/thumb.webp · title.webp · 1.webp …
   ———————————————————————————————————————————————————————————————————————————— */
window.RT = window.RT || {};

RT.worksData = [
  /* 곽채은, 신수호 */
  { id: 'kwak-chaeeun-spaghetti', title: '쇠고기야채죽', group: 'spaghetti',
    designers: ['kwak-chaeeun', 'shin-suho'], order: { 'kwak-chaeeun': 1, 'shin-suho': 1 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 곽채은, 신수호 */
  { id: 'kwak-chaeeun-camera', title: 'shorts', group: 'camera',
    designers: ['kwak-chaeeun', 'shin-suho'], order: { 'kwak-chaeeun': 2, 'shin-suho': 2 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 곽채은 */
  { id: 'kwak-chaeeun-smartphone', title: 'Toki', group: 'smartphone',
    designers: ['kwak-chaeeun'], order: { 'kwak-chaeeun': 3 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 권태린, 한다인 */
  { id: 'kwon-taerin-camera', title: '청년주거', group: 'camera',
    designers: ['kwon-taerin', 'han-dain'], order: { 'kwon-taerin': 2, 'han-dain': 2 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 권태린, 이재이, 조서희 */
  { id: 'kwon-taerin-mouse', title: 'THE PLANT', group: 'mouse',
    designers: ['kwon-taerin', 'lee-jaeyi', 'jo-seohee'], order: { 'kwon-taerin': 3, 'lee-jaeyi': 3, 'jo-seohee': 3 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 김나연, 조가인 */
  { id: 'kim-nayeon-ratatouille', title: '심연', group: 'ratatouille',
    designers: ['kim-nayeon', 'cho-gain'], order: { 'kim-nayeon': 1, 'cho-gain': 3 },
    images: ['title', 1, 2, 3, 4] },
  /* 김나연, 조가인 */
  { id: 'kim-nayeon-smartphone', title: 'WEDDY', group: 'smartphone',
    designers: ['kim-nayeon', 'cho-gain'], order: { 'kim-nayeon': 3, 'cho-gain': 1 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 김나연, 조가인 */
  { id: 'kim-nayeon-cd', title: '시간을 잇는 빛', group: 'cd',
    designers: ['kim-nayeon', 'cho-gain'], order: { 'kim-nayeon': 2, 'cho-gain': 2 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 김소희 */
  { id: 'kim-sohee-canape', title: 'BEHIND STAGE', group: 'canape',
    designers: ['kim-sohee'], order: { 'kim-sohee': 1 },
    images: ['title', 1, 2, 3, 4] },
  /* 김소희 */
  { id: 'kim-sohee-cd', title: 'EGOAT: 0-317', check: true, group: 'cd',
    designers: ['kim-sohee'], order: { 'kim-sohee': 2 },
    images: ['title', 1, 2, 3, 4] },
  /* 김수민 */
  { id: 'kim-soomin-ratatouille', title: 'ChatGPT Work', group: 'ratatouille',
    designers: ['kim-soomin'], order: { 'kim-soomin': 1 },
    images: ['title', 1, 2, 3] },
  /* 김수민 */
  { id: 'kim-soomin-cd', title: 'Spark', group: 'cd',
    designers: ['kim-soomin'], order: { 'kim-soomin': 2 },
    images: ['title', 1, 2, 3] },
  /* 김은수 */
  { id: 'kim-eunsu-ratatouille', title: 'Nintendo Switch 2', check: true, group: 'ratatouille',
    designers: ['kim-eunsu'], order: { 'kim-eunsu': 1 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 김은수 */
  { id: 'kim-eunsu-visual', title: 'Poco', group: 'visual', subject: '프로모션디자인프로젝트',
    designers: ['kim-eunsu'], order: { 'kim-eunsu': 2 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 김은수 */
  { id: 'kim-eunsu-smartphone', title: '꼬박', group: 'smartphone',
    designers: ['kim-eunsu'], order: { 'kim-eunsu': 3 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 김지연 */
  { id: 'kim-jiyeon-ratatouille', title: '1984', group: 'ratatouille',
    designers: ['kim-jiyeon'], order: { 'kim-jiyeon': 1 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 김지연 */
  { id: 'kim-jiyeon-headset', title: 'AKAI', group: 'headset',
    designers: ['kim-jiyeon'], order: { 'kim-jiyeon': 2 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 김지연, 신정민 */
  { id: 'kim-jiyeon-canape', title: 'EDITED SELF', group: 'canape',
    designers: ['kim-jiyeon', 'shin-jeongmin'], order: { 'kim-jiyeon': 3, 'shin-jeongmin': 3 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 김채윤 */
  { id: 'kim-chaeyun-cd', title: '위저드 베이커리', group: 'cd',
    designers: ['kim-chaeyun'], order: { 'kim-chaeyun': 1 },
    images: ['title', 1, 2, 3, 4] },
  /* 김채윤 */
  { id: 'kim-chaeyun-ratatouille', title: 'Ib', group: 'ratatouille',
    designers: ['kim-chaeyun'], order: { 'kim-chaeyun': 2 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 김채윤 */
  { id: 'kim-chaeyun-visual', title: '나 개강한 대학생 김동백인데?', check: true, group: 'visual', subject: '프로모션디자인프로젝트',
    designers: ['kim-chaeyun'], order: { 'kim-chaeyun': 3 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 김태은 */
  { id: 'kim-taeeun-spaghetti', title: '청춘계급', group: 'spaghetti',
    designers: ['kim-taeeun'], order: { 'kim-taeeun': 1 },
    images: ['title', 1, 2, 3, 4] },
  /* 김태은, 소주희, 한다영 */
  { id: 'kim-taeeun-cd', title: '망각의 정원', group: 'cd',
    designers: ['kim-taeeun', 'so-juhui', 'han-dayoung'], order: { 'kim-taeeun': 2, 'so-juhui': 2, 'han-dayoung': 3 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 김태은, 소주희 */
  { id: 'kim-taeeun-smartphone', title: '이랑', group: 'smartphone',
    designers: ['kim-taeeun', 'so-juhui'], order: { 'kim-taeeun': 3, 'so-juhui': 3 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 류주원 */
  { id: 'lyu-juwon-smartphone', title: 'Mediflow', group: 'smartphone',
    designers: ['lyu-juwon'], order: { 'lyu-juwon': 99 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 류주원 */
  { id: 'lyu-juwon-canape', title: 'Conttio', group: 'canape',
    designers: ['lyu-juwon'], order: { 'lyu-juwon': 99 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 류주원 */
  { id: 'lyu-juwon-visual', title: 'AXIS', group: 'visual', subject: '전공연구프로젝트 (시각)',
    designers: ['lyu-juwon'], order: { 'lyu-juwon': 99 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 박병준 */
  { id: 'park-byeongjun-ratatouille', title: 'Re:Frame', group: 'ratatouille',
    designers: ['park-byeongjun'], order: { 'park-byeongjun': 1 },
    images: ['title', 1, 2, 3, 4] },
  /* 박병준, 박희성, 오연우 */
  { id: 'park-byeongjun-canape', title: 'Project: BALANCE', group: 'canape',
    designers: ['park-byeongjun', 'park-heesung', 'oh-yeonu'], order: { 'park-byeongjun': 3, 'park-heesung': 3, 'oh-yeonu': 1 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 박병준 — 타이틀 이미지 없음 */
  { id: 'park-byeongjun-cd', title: 'STARRY ORBIT', group: 'cd',
    designers: ['park-byeongjun'], order: { 'park-byeongjun': 2 },
    images: [1, 2, 3, 5] },
  /* 박수빈 */
  { id: 'park-subeen-ratatouille', title: 'JELLYCAT DINER', group: 'ratatouille',
    designers: ['park-subeen'], order: { 'park-subeen': 1 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 박수빈 */
  { id: 'park-subeen-cd', title: '금 (GOLD & CRACK)', group: 'cd',
    designers: ['park-subeen'], order: { 'park-subeen': 2 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 박에스더 */
  { id: 'park-esther-smartphone', title: '피어싱 체크', group: 'smartphone',
    designers: ['park-esther'], order: { 'park-esther': 1 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 박에스더 */
  { id: 'park-esther-spaghetti', title: 'Tall Boots', group: 'spaghetti',
    designers: ['park-esther'], order: { 'park-esther': 2 },
    images: ['title', 1, 2, 3, 4] },
  /* 박에스더 */
  { id: 'park-esther-visual', title: '경계', check: true, group: 'visual', subject: '실험디자인',
    designers: ['park-esther'], order: { 'park-esther': 3 },
    images: ['title', 1, 2, 3] },
  /* 박영주 */
  { id: 'park-yeongjoo-ratatouille', title: '方相氏才人', check: true, group: 'ratatouille',
    designers: ['park-yeongjoo'], order: { 'park-yeongjoo': 1 },
    images: ['title', 1, 2, 3, 4] },
  /* 박영주 */
  { id: 'park-yeongjoo-cd', title: '초록색 행진', group: 'cd',
    designers: ['park-yeongjoo'], order: { 'park-yeongjoo': 2 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 박영주 */
  { id: 'park-yeongjoo-visual', title: 'Space Cleaning', group: 'visual', subject: '정보디자인프로젝트',
    designers: ['park-yeongjoo'], order: { 'park-yeongjoo': 3 },
    images: ['title', 1, 2, 3, 4] },
  /* 박현영, 박희성 */
  { id: 'park-hyunyeong-spaghetti', title: '가시', group: 'spaghetti',
    designers: ['park-hyunyeong', 'park-heesung'], order: { 'park-hyunyeong': 1, 'park-heesung': 2 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 박현영 */
  { id: 'park-hyunyeong-cd', title: '신(神) 용대출 불가', group: 'cd',
    designers: ['park-hyunyeong'], order: { 'park-hyunyeong': 2 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 박현영 */
  { id: 'park-hyunyeong-canape', title: 'Persona Archive', group: 'canape',
    designers: ['park-hyunyeong'], order: { 'park-hyunyeong': 3 },
    images: ['title', 1, 2, 3, 4] },
  /* 박희성 */
  { id: 'park-heesung-camera', title: '단장', group: 'camera',
    designers: ['park-heesung'], order: { 'park-heesung': 1 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 서지우, 양주연 */
  { id: 'seo-jiwoo-cd', title: 'ERROR 404 : HERO', group: 'cd',
    designers: ['seo-jiwoo', 'yang-juyeon'], order: { 'seo-jiwoo': 1, 'yang-juyeon': 2 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 서지우 */
  { id: 'seo-jiwoo-smartphone', title: 'OTT', check: true, group: 'smartphone',
    designers: ['seo-jiwoo'], order: { 'seo-jiwoo': 3 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 설수현, 조혜나 */
  { id: 'seol-suhyeon-smartphone', title: '한땀', group: 'smartphone',
    designers: ['seol-suhyeon', 'cho-hyena'], order: { 'seol-suhyeon': 3, 'cho-hyena': 3 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 설수현 — 썸네일만 제출 */
  { id: 'seol-suhyeon-headset', title: 'LOOP', group: 'headset',
    designers: ['seol-suhyeon'], order: { 'seol-suhyeon': 0.7 },
    images: [] },
  /* 설수현 — 썸네일만 제출 */
  { id: 'seol-suhyeon-ratatouille', title: 'HPIX', group: 'ratatouille',
    designers: ['seol-suhyeon'], order: { 'seol-suhyeon': 0.4 },
    images: [] },
  /* 소주희, 윤서빈 */
  { id: 'so-juhui-spaghetti', title: '양초의 밤', group: 'spaghetti',
    designers: ['so-juhui', 'yoon-seobin'], order: { 'so-juhui': 1, 'yoon-seobin': 1 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 손지인 */
  { id: 'son-jiin-canape', title: '오늘 만나러 갈게', group: 'canape',
    designers: ['son-jiin'], order: { 'son-jiin': 1 },
    images: ['title', 1, 2, 3] },
  /* 손지인 */
  { id: 'son-jiin-mouse', title: '100 BAD DAYS', group: 'mouse',
    designers: ['son-jiin'], order: { 'son-jiin': 2 },
    images: ['title', 1, 2, 3] },
  /* 손지인 */
  { id: 'son-jiin-headset', title: '오늘의 행복', group: 'headset',
    designers: ['son-jiin'], order: { 'son-jiin': 3 },
    images: ['title', 1, 2, 3] },
  /* 신정민 */
  { id: 'shin-jeongmin-ratatouille', title: 'THE SUBSTANCE', group: 'ratatouille',
    designers: ['shin-jeongmin'], order: { 'shin-jeongmin': 1 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 신정민 */
  { id: 'shin-jeongmin-headset', title: '紅月商店', check: true, group: 'headset',
    designers: ['shin-jeongmin'], order: { 'shin-jeongmin': 2 },
    images: ['title', 1, 2, 3, 4] },
  /* 양밍징 */
  { id: 'yang-mingjing-cd', title: 'GRACE : 신멸', check: true, group: 'cd',
    designers: ['yang-mingjing'], order: { 'yang-mingjing': 1 },
    images: ['title', 1, 2, 3] },
  /* 양밍징 */
  { id: 'yang-mingjing-ratatouille', title: 'GRACE : 윤회', group: 'ratatouille',
    designers: ['yang-mingjing'], order: { 'yang-mingjing': 2 },
    images: ['title', 1, 2, 3] },
  /* 양밍징 */
  { id: 'yang-mingjing-mouse', title: '잠시, 다른 세계로', group: 'mouse',
    designers: ['yang-mingjing'], order: { 'yang-mingjing': 3 },
    images: ['title', 1, 2, 3] },
  /* 양윤지 */
  { id: 'yang-yoonji-ratatouille', title: 'Duck to Chik', group: 'ratatouille',
    designers: ['yang-yoonji'], order: { 'yang-yoonji': 1 },
    images: ['title', 1, 2, 3, 4] },
  /* 양윤지 */
  { id: 'yang-yoonji-canape', title: 'Duck to Chik', group: 'canape',
    designers: ['yang-yoonji'], order: { 'yang-yoonji': 2 },
    images: ['title', 1, 2, 3, 4] },
  /* 양윤지 */
  { id: 'yang-yoonji-smartphone', title: 'OnO', group: 'smartphone',
    designers: ['yang-yoonji'], order: { 'yang-yoonji': 3 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 양주연 */
  { id: 'yang-juyeon-smartphone', title: 'B-CUT', group: 'smartphone',
    designers: ['yang-juyeon'], order: { 'yang-juyeon': 1 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 양주연, 임정연 */
  { id: 'yang-juyeon-ratatouille', title: 'By Nature, For Nature, For All', group: 'ratatouille',
    designers: ['yang-juyeon', 'lim-jungyeon'], order: { 'yang-juyeon': 3, 'lim-jungyeon': 2 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 오연우 */
  { id: 'oh-yeonu-cd', title: '완벽한 햄버거를 찾아서', group: 'cd',
    designers: ['oh-yeonu'], order: { 'oh-yeonu': 2 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 윤서빈 */
  { id: 'yoon-seobin-cd', title: 'Under the Pond', group: 'cd',
    designers: ['yoon-seobin'], order: { 'yoon-seobin': 2 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 윤서빈 */
  { id: 'yoon-seobin-smartphone', title: 'Zooki', group: 'smartphone',
    designers: ['yoon-seobin'], order: { 'yoon-seobin': 3 },
    images: ['title', 1, 2, 3, 4] },
  /* 이민교 */
  { id: 'lee-minkyo-spaghetti', title: '야만천사', group: 'spaghetti',
    designers: ['lee-minkyo'], order: { 'lee-minkyo': 1 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 이민교 */
  { id: 'lee-minkyo-canape', title: '야만천사 보드 게임', group: 'canape',
    designers: ['lee-minkyo'], order: { 'lee-minkyo': 2 },
    images: ['title', 1, 2, 3, 4] },
  /* 이민교 */
  { id: 'lee-minkyo-smartphone', title: '작은 발걸음', check: true, group: 'smartphone',
    designers: ['lee-minkyo'], order: { 'lee-minkyo': 3 },
    images: ['title', 1, 2, 3] },
  /* 이민아 */
  { id: 'lee-mina-cd', title: '박제의 조건', group: 'cd',
    designers: ['lee-mina'], order: { 'lee-mina': 1 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 이민아 */
  { id: 'lee-mina-ratatouille', title: 'ART BOX', group: 'ratatouille',
    designers: ['lee-mina'], order: { 'lee-mina': 2 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 이민아 */
  { id: 'lee-mina-canape', title: '복불복 간지뽑기', group: 'canape',
    designers: ['lee-mina'], order: { 'lee-mina': 3 },
    images: ['title', 1, 2, 3, 4, 6] },
  /* 이소미 */
  { id: 'lee-somi-visual', title: '', check: true, group: 'visual', subject: '정보디자인프로젝트',
    designers: ['lee-somi'], order: { 'lee-somi': 1 },
    images: ['title', 1, 2, 3] },
  /* 이소미 */
  { id: 'lee-somi-cd', title: '그래도 좋아?!', group: 'cd',
    designers: ['lee-somi'], order: { 'lee-somi': 2 },
    images: ['title', 1, 2, 3] },
  /* 이은수 */
  { id: 'lee-eunsu-visual', title: '나에게 내가 너에게', check: true, group: 'visual', subject: '정보디자인프로젝트',
    designers: ['lee-eunsu'], order: { 'lee-eunsu': 1 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 이은수 — 과목 표기가 "전공연구프로젝트"뿐이라 디지털로 분류 */
  { id: 'lee-eunsu-ratatouille', title: 'MARIPOSA', group: 'ratatouille',
    designers: ['lee-eunsu'], order: { 'lee-eunsu': 2 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 이은수 */
  { id: 'lee-eunsu-cd', title: 'CROWN OF VENGEANCE', group: 'cd',
    designers: ['lee-eunsu'], order: { 'lee-eunsu': 3 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 이재이, 조서희 */
  { id: 'lee-jaeyi-cd', title: 'RIDE OR DIE', group: 'cd',
    designers: ['lee-jaeyi', 'jo-seohee'], order: { 'lee-jaeyi': 1, 'jo-seohee': 1 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 이재이 */
  { id: 'lee-jaeyi-spaghetti', title: '형제와 바다', group: 'spaghetti',
    designers: ['lee-jaeyi'], order: { 'lee-jaeyi': 2 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 이종윤 */
  { id: 'lee-jongyoon-ratatouille', title: 'SHOEI NXR2', group: 'ratatouille',
    designers: ['lee-jongyoon'], order: { 'lee-jongyoon': 2 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 이종윤, 전한결 */
  { id: 'lee-jongyoon-canape', title: 'Atman', check: true, group: 'canape',
    designers: ['lee-jongyoon', 'jeon-hangyeol'], order: { 'lee-jongyoon': 3, 'jeon-hangyeol': 2 },
    images: ['title', 1, 2, 3] },
  /* 이준영 */
  { id: 'lee-junyoung-ratatouille', title: '', check: true, group: 'ratatouille',
    designers: ['lee-junyoung'], order: { 'lee-junyoung': 1 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 이준영 */
  { id: 'lee-junyoung-canape', title: 'TITAN : OUT OF CONTROL', group: 'canape',
    designers: ['lee-junyoung'], order: { 'lee-junyoung': 2 },
    images: ['title', 1, 2, 3] },
  /* 이준영 */
  { id: 'lee-junyoung-smartphone', title: 'AIRSYNCE', group: 'smartphone',
    designers: ['lee-junyoung'], order: { 'lee-junyoung': 3 },
    images: ['title', 1, 2, 3] },
  /* 임서현 */
  { id: 'yim-seohyun-ratatouille', title: 'duolingo', check: true, group: 'ratatouille',
    designers: ['yim-seohyun'], order: { 'yim-seohyun': 1 },
    images: ['title', 1, 2, 3] },
  /* 임정연 */
  { id: 'lim-jungyeon-cd', title: 'Hold Us Please!', group: 'cd',
    designers: ['lim-jungyeon'], order: { 'lim-jungyeon': 1 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 임준호 */
  { id: 'lim-junho-ratatouille', title: '불량연애', group: 'ratatouille',
    designers: ['lim-junho'], order: { 'lim-junho': 1 },
    images: ['title', 1, 2, 3, 4] },
  /* 임준호 */
  { id: 'lim-junho-mouse', title: '한 그릇의 조화', group: 'mouse',
    designers: ['lim-junho'], order: { 'lim-junho': 2 },
    images: ['title', 1, 2, 3] },
  /* 임준호 */
  { id: 'lim-junho-headset', title: '언제나 우린 너와 함께해', group: 'headset',
    designers: ['lim-junho'], order: { 'lim-junho': 3 },
    images: ['title', 1, 2, 3] },
  /* 전연정 */
  { id: 'joun-yeonjoung-smartphone', title: 'Re:tape', group: 'smartphone',
    designers: ['joun-yeonjoung'], order: { 'joun-yeonjoung': 1 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 전연정 */
  { id: 'joun-yeonjoung-ratatouille', title: 'AWAKEN THE PREDATOR', group: 'ratatouille',
    designers: ['joun-yeonjoung'], order: { 'joun-yeonjoung': 2 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 전연정 */
  { id: 'joun-yeonjoung-visual', title: 'VIVARTA', group: 'visual', subject: '정보디자인프로젝트',
    designers: ['joun-yeonjoung'], order: { 'joun-yeonjoung': 3 },
    images: ['title', 1, 2, 3, 6] },
  /* 전한결 */
  { id: 'jeon-hangyeol-ratatouille', title: 'Comfy', group: 'ratatouille',
    designers: ['jeon-hangyeol'], order: { 'jeon-hangyeol': 1 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 정윤서 */
  { id: 'jeong-yoonseo-camera', title: 'ExpandHope', group: 'camera',
    designers: ['jeong-yoonseo'], order: { 'jeong-yoonseo': 2 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 정윤서 */
  { id: 'jeong-yoonseo-visual', title: 'HappyEnd And', check: true, group: 'visual', subject: '프로모션디자인프로젝트',
    designers: ['jeong-yoonseo'], order: { 'jeong-yoonseo': 3 },
    images: ['title', 1, 2, 3] },
  /* 정화란 */
  { id: 'jeong-hwaran-canape', title: 'REDLINE 911', group: 'canape',
    designers: ['jeong-hwaran'], order: { 'jeong-hwaran': 1 },
    images: ['title', 1, 2, 3] },
  /* 정화란 */
  { id: 'jeong-hwaran-ratatouille', title: 'PORSCHE : LEGACY IN MOTION', group: 'ratatouille',
    designers: ['jeong-hwaran'], order: { 'jeong-hwaran': 2 },
    images: ['title', 1, 2, 3] },
  /* 정화란 */
  { id: 'jeong-hwaran-mouse', title: 'Melancholia', group: 'mouse',
    designers: ['jeong-hwaran'], order: { 'jeong-hwaran': 3 },
    images: ['title', 1, 2, 3] },
  /* 조서희 */
  { id: 'jo-seohee-ratatouille', title: 'TABASCO', group: 'ratatouille',
    designers: ['jo-seohee'], order: { 'jo-seohee': 2 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 조혜나 */
  { id: 'cho-hyena-ratatouille', title: '슬로우랜드', group: 'ratatouille',
    designers: ['cho-hyena'], order: { 'cho-hyena': 1 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 조혜나 */
  { id: 'cho-hyena-headset', title: 'Fluffy Scary', group: 'headset',
    designers: ['cho-hyena'], order: { 'cho-hyena': 2 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 최가현 */
  { id: 'choi-kahyun-smartphone', title: 'Withy', group: 'smartphone',
    designers: ['choi-kahyun'], order: { 'choi-kahyun': 1 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 최수연 */
  { id: 'choi-suyeon-cd', title: '작은 동맹', group: 'cd',
    designers: ['choi-suyeon'], order: { 'choi-suyeon': 1 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 최수연 */
  { id: 'choi-suyeon-ratatouille', title: '', check: true, group: 'ratatouille',
    designers: ['choi-suyeon'], order: { 'choi-suyeon': 2 },
    images: ['title', 1, 2, 3, 4] },
  /* 최수연 */
  { id: 'choi-suyeon-smartphone', title: 'curio', group: 'smartphone',
    designers: ['choi-suyeon'], order: { 'choi-suyeon': 3 },
    images: ['title', 1, 2, 3] },
  /* 최원준 */
  { id: 'choi-wonjun-spaghetti', title: 'Today\'s Sweat, Tomorrow\'s Breeze', group: 'spaghetti',
    designers: ['choi-wonjun'], order: { 'choi-wonjun': 1 },
    images: ['title', 1, 2, 3, 4] },
  /* 최원준 */
  { id: 'choi-wonjun-camera', title: '팩트레이', check: true, group: 'camera',
    designers: ['choi-wonjun'], order: { 'choi-wonjun': 2 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 최원준 */
  { id: 'choi-wonjun-visual', title: 'mel\'T', group: 'visual', subject: '프로모션디자인프로젝트',
    designers: ['choi-wonjun'], order: { 'choi-wonjun': 3 },
    images: ['title', 1, 2, 3, 4] },
  /* 최유정 */
  { id: 'choi-yoojeong-spaghetti', title: 'LUDDITE', group: 'spaghetti',
    designers: ['choi-yoojeong'], order: { 'choi-yoojeong': 1 },
    images: ['title', 1, 2, 3, 4] },
  /* 최유정 */
  { id: 'choi-yoojeong-mouse', title: 'My Last Archive', group: 'mouse',
    designers: ['choi-yoojeong'], order: { 'choi-yoojeong': 3 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 최한영, 한다인 */
  { id: 'choi-hanyoung-spaghetti', title: 'Geminiminimini', check: true, group: 'spaghetti',
    designers: ['choi-hanyoung', 'han-dain'], order: { 'choi-hanyoung': 1, 'han-dain': 1 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 최혜원 */
  { id: 'choi-hyewon-canape', title: 'RE:LIGHT', group: 'canape',
    designers: ['choi-hyewon'], order: { 'choi-hyewon': 1 },
    images: ['title', 1, 2, 3] },
  /* 최혜원 */
  { id: 'choi-hyewon-cd', title: '404 Not Found', group: 'cd',
    designers: ['choi-hyewon'], order: { 'choi-hyewon': 2 },
    images: ['title', 1, 2, 3, 4] },
  /* 최혜원 */
  { id: 'choi-hyewon-ratatouille', title: 'BREATH', group: 'ratatouille',
    designers: ['choi-hyewon'], order: { 'choi-hyewon': 3 },
    images: ['title', 1, 2, 3, 4] },
  /* 한다영 */
  { id: 'han-dayoung-ratatouille', title: '', check: true, group: 'ratatouille',
    designers: ['han-dayoung'], order: { 'han-dayoung': 1 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 한다영 */
  { id: 'han-dayoung-smartphone', title: '뜨개러 투게더', group: 'smartphone',
    designers: ['han-dayoung'], order: { 'han-dayoung': 2 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 한다인 */
  { id: 'han-dain-visual', title: 'Birth Button', group: 'visual', subject: '프로모션디자인프로젝트',
    designers: ['han-dain'], order: { 'han-dain': 3 },
    images: ['title', 1, 2, 3, 4, 5] },
  /* 허하정 */
  { id: 'heo-hajung-cd', title: '', check: true, group: 'cd',
    designers: ['heo-hajung'], order: { 'heo-hajung': 1 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 허하정 */
  { id: 'heo-hajung-visual', title: '곰아저씨 어디갔어?', group: 'visual', subject: '정보디자인프로젝트',
    designers: ['heo-hajung'], order: { 'heo-hajung': 2 },
    images: ['title', 1, 2, 3, 4, 5, 6] },
  /* 허하정 */
  { id: 'heo-hajung-ratatouille', title: 'NETFLIX', check: true, group: 'ratatouille',
    designers: ['heo-hajung'], order: { 'heo-hajung': 3 },
    images: ['title', 1, 2, 3, 4, 5, 6] }
];
