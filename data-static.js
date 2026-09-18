// data-static.js — 고정 표 (별자리, 탄생석, 월별 탄생화, 타로, 켈트 나무, 토템 동물, 육십갑자)
// 출처 링크는 index.html 하단 "자료 출처" 참고. 키워드 문구는 이 앱에서 새로 쓴 것.
window.BD = window.BD || {};

// 별자리 — 날짜는 한국어 위키백과 황도 12궁 기준
BD.ZODIAC = [
  { name: '염소자리',   en: 'Capricorn',   symbol: '♑', from: [12, 22], to: [1, 19],  element: '흙',   planet: '토성',            modality: '활동궁', kw: '책임감 · 인내 · 현실감각' },
  { name: '물병자리',   en: 'Aquarius',    symbol: '♒', from: [1, 20],  to: [2, 18],  element: '공기', planet: '천왕성 (전통: 토성)', modality: '고정궁', kw: '독창성 · 자유 · 이상' },
  { name: '물고기자리', en: 'Pisces',      symbol: '♓', from: [2, 19],  to: [3, 20],  element: '물',   planet: '해왕성 (전통: 목성)', modality: '변통궁', kw: '감수성 · 공감 · 상상력' },
  { name: '양자리',     en: 'Aries',       symbol: '♈', from: [3, 21],  to: [4, 19],  element: '불',   planet: '화성',            modality: '활동궁', kw: '추진력 · 용기 · 솔직함' },
  { name: '황소자리',   en: 'Taurus',      symbol: '♉', from: [4, 20],  to: [5, 20],  element: '흙',   planet: '금성',            modality: '고정궁', kw: '안정 · 끈기 · 감각' },
  { name: '쌍둥이자리', en: 'Gemini',      symbol: '♊', from: [5, 21],  to: [6, 21],  element: '공기', planet: '수성',            modality: '변통궁', kw: '호기심 · 소통 · 재치' },
  { name: '게자리',     en: 'Cancer',      symbol: '♋', from: [6, 22],  to: [7, 22],  element: '물',   planet: '달',              modality: '활동궁', kw: '보살핌 · 직관 · 애착' },
  { name: '사자자리',   en: 'Leo',         symbol: '♌', from: [7, 23],  to: [8, 22],  element: '불',   planet: '태양',            modality: '고정궁', kw: '자신감 · 관대함 · 표현력' },
  { name: '처녀자리',   en: 'Virgo',       symbol: '♍', from: [8, 23],  to: [9, 22],  element: '흙',   planet: '수성',            modality: '변통궁', kw: '분석력 · 성실 · 섬세함' },
  { name: '천칭자리',   en: 'Libra',       symbol: '♎', from: [9, 23],  to: [10, 22], element: '공기', planet: '금성',            modality: '활동궁', kw: '균형 · 조화 · 사교성' },
  { name: '전갈자리',   en: 'Scorpio',     symbol: '♏', from: [10, 23], to: [11, 21], element: '물',   planet: '명왕성 (전통: 화성)', modality: '고정궁', kw: '집중력 · 통찰 · 열정' },
  { name: '사수자리',   en: 'Sagittarius', symbol: '♐', from: [11, 22], to: [12, 21], element: '불',   planet: '목성',            modality: '변통궁', kw: '모험 · 낙천 · 탐구' },
];

// 탄생석 — American Gem Society 현행 목록 (1912년 미국 보석상협회 목록 + 1952/2002/2016 추가분)
BD.BIRTHSTONES = {
  1:  { stones: ['가넷'],                         en: 'Garnet',                          meaning: '진실 · 우정 · 충실',        hex: '#8B1A2B' },
  2:  { stones: ['자수정'],                       en: 'Amethyst',                        meaning: '성실 · 평화 · 마음의 안정', hex: '#7B4FB5' },
  3:  { stones: ['아쿠아마린', '블러드스톤'],      en: 'Aquamarine, Bloodstone',          meaning: '침착 · 용기 · 총명',        hex: '#7FD1D9' },
  4:  { stones: ['다이아몬드'],                   en: 'Diamond',                         meaning: '영원한 사랑 · 순결',        hex: '#DCEBF5' },
  5:  { stones: ['에메랄드'],                     en: 'Emerald',                         meaning: '행복 · 행운 · 희망',        hex: '#1F9E6A' },
  6:  { stones: ['진주', '문스톤', '알렉산드라이트'], en: 'Pearl, Moonstone, Alexandrite', meaning: '건강 · 장수 · 부귀',        hex: '#EFE9DF' },
  7:  { stones: ['루비'],                         en: 'Ruby',                            meaning: '열정 · 사랑 · 용기',        hex: '#C41E3A' },
  8:  { stones: ['페리도트', '스피넬', '사도닉스'], en: 'Peridot, Spinel, Sardonyx',       meaning: '화합 · 부부의 행복',        hex: '#A7C957' },
  9:  { stones: ['사파이어'],                     en: 'Sapphire',                        meaning: '성실 · 진실 · 지혜',        hex: '#0F52BA' },
  10: { stones: ['오팔', '투르말린'],              en: 'Opal, Tourmaline',                meaning: '희망 · 순결 · 창조',        hex: '#CFE8F0' },
  11: { stones: ['토파즈', '시트린'],              en: 'Topaz, Citrine',                  meaning: '우정 · 희망 · 건강',        hex: '#F2B134' },
  12: { stones: ['터키석', '탄자나이트', '지르콘'], en: 'Turquoise, Tanzanite, Zircon',    meaning: '성공 · 승리 · 번영',        hex: '#3AB0C1' },
};

// 월별 탄생화 — 미국식 (한국어 위키백과 탄생화 문서의 미국식 표)
BD.MONTH_FLOWERS = {
  1:  { flowers: ['카네이션', '스노드롭'],            meaning: '사랑 · 매혹 · 희망' },
  2:  { flowers: ['제비꽃', '앵초'],                  meaning: '겸손 · 성실 · 젊은 사랑' },
  3:  { flowers: ['수선화'],                          meaning: '새로운 시작 · 자존심' },
  4:  { flowers: ['데이지', '스위트피'],              meaning: '순수 · 희망 · 즐거움' },
  5:  { flowers: ['은방울꽃', '산사나무'],            meaning: '행복의 귀환 · 희망' },
  6:  { flowers: ['장미', '인동'],                    meaning: '사랑 · 헌신' },
  7:  { flowers: ['참제비고깔', '수련'],              meaning: '밝은 마음 · 순결' },
  8:  { flowers: ['글라디올러스', '양귀비'],          meaning: '정열 · 견고함 · 상상' },
  9:  { flowers: ['과꽃', '나팔꽃'],                  meaning: '믿음 · 지혜 · 애정' },
  10: { flowers: ['메리골드', '코스모스'],            meaning: '반드시 오는 행복 · 조화' },
  11: { flowers: ['국화'],                            meaning: '성실 · 진실 · 고결' },
  12: { flowers: ['수선화', '호랑가시나무', '포인세티아'], meaning: '존경 · 축복 · 축하' },
};

// 타로 메이저 아르카나 — 탄생 카드는 Tarot School 계산법 사용
BD.TAROT = {
  0:  { name: '바보',           en: 'The Fool',            kw: '자유 · 새 출발 · 순수' },
  1:  { name: '마법사',         en: 'The Magician',        kw: '창조 · 의지 · 실행력' },
  2:  { name: '여사제',         en: 'The High Priestess',  kw: '직관 · 지혜 · 내면' },
  3:  { name: '여황제',         en: 'The Empress',         kw: '풍요 · 양육 · 창조성' },
  4:  { name: '황제',           en: 'The Emperor',         kw: '질서 · 권위 · 안정' },
  5:  { name: '교황',           en: 'The Hierophant',      kw: '전통 · 가르침 · 신념' },
  6:  { name: '연인',           en: 'The Lovers',          kw: '관계 · 선택 · 조화' },
  7:  { name: '전차',           en: 'The Chariot',         kw: '추진력 · 승리 · 통제' },
  8:  { name: '힘',             en: 'Strength',            kw: '용기 · 인내 · 부드러운 힘' },
  9:  { name: '은둔자',         en: 'The Hermit',          kw: '성찰 · 탐구 · 지혜' },
  10: { name: '운명의 수레바퀴', en: 'Wheel of Fortune',    kw: '전환 · 기회 · 순환' },
  11: { name: '정의',           en: 'Justice',             kw: '균형 · 책임 · 공정' },
  12: { name: '매달린 남자',    en: 'The Hanged Man',      kw: '관점 전환 · 인내 · 희생' },
  13: { name: '죽음',           en: 'Death',               kw: '변화 · 재생 · 끝과 시작' },
  14: { name: '절제',           en: 'Temperance',          kw: '조화 · 중용 · 치유' },
  15: { name: '악마',           en: 'The Devil',           kw: '욕망 · 집착 · 유혹' },
  16: { name: '탑',             en: 'The Tower',           kw: '급변 · 각성 · 해방' },
  17: { name: '별',             en: 'The Star',            kw: '희망 · 영감 · 치유' },
  18: { name: '달',             en: 'The Moon',            kw: '무의식 · 상상 · 직감' },
  19: { name: '태양',           en: 'The Sun',             kw: '활력 · 성공 · 기쁨' },
  20: { name: '심판',           en: 'Judgement',           kw: '부활 · 결단 · 소명' },
  21: { name: '세계',           en: 'The World',           kw: '완성 · 통합 · 성취' },
};

// 켈트 나무 별자리 — Robert Graves(1948) 13개월 나무 달력
BD.CELTIC = [
  { tree: '자작나무',     en: 'Birch',    ogham: 'Beth',   from: [12, 24], to: [1, 20],  kw: '개척자 · 의욕 · 리더십' },
  { tree: '마가목',       en: 'Rowan',    ogham: 'Luis',   from: [1, 21],  to: [2, 17],  kw: '통찰 · 독창성 · 이상' },
  { tree: '물푸레나무',   en: 'Ash',      ogham: 'Nion',   from: [2, 18],  to: [3, 17],  kw: '상상력 · 직관 · 예술성' },
  { tree: '오리나무',     en: 'Alder',    ogham: 'Fearn',  from: [3, 18],  to: [4, 14],  kw: '용기 · 열정 · 개척' },
  { tree: '버드나무',     en: 'Willow',   ogham: 'Saille', from: [4, 15],  to: [5, 12],  kw: '감성 · 기억력 · 직관' },
  { tree: '산사나무',     en: 'Hawthorn', ogham: 'Uath',   from: [5, 13],  to: [6, 9],   kw: '호기심 · 다재다능 · 적응력' },
  { tree: '참나무',       en: 'Oak',      ogham: 'Duir',   from: [6, 10],  to: [7, 7],   kw: '관대함 · 보호 · 안정감' },
  { tree: '호랑가시나무', en: 'Holly',    ogham: 'Tinne',  from: [7, 8],   to: [8, 4],   kw: '통솔력 · 끈기 · 품격' },
  { tree: '개암나무',     en: 'Hazel',    ogham: 'Coll',   from: [8, 5],   to: [9, 1],   kw: '지성 · 분석력 · 지식' },
  { tree: '포도나무',     en: 'Vine',     ogham: 'Muin',   from: [9, 2],   to: [9, 29],  kw: '세련 · 균형 · 감각' },
  { tree: '담쟁이덩굴',   en: 'Ivy',      ogham: 'Gort',   from: [9, 30],  to: [10, 27], kw: '끈기 · 헌신 · 친화력' },
  { tree: '갈대',         en: 'Reed',     ogham: 'Ngetal', from: [10, 28], to: [11, 24], kw: '탐구심 · 통찰 · 비밀' },
  { tree: '딱총나무',     en: 'Elder',    ogham: 'Ruis',   from: [11, 25], to: [12, 23], kw: '자유 · 솔직함 · 재생' },
];

// 토템 동물 — Sun Bear & Wabun(1980) 메디슨 휠에서 파생된 대중판 12동물
BD.TOTEM = [
  { animal: '수달',     en: 'Otter',      from: [1, 20],  to: [2, 18],  element: '공기', kw: '독창성 · 자유 · 친근함' },
  { animal: '늑대',     en: 'Wolf',       from: [2, 19],  to: [3, 20],  element: '물',   kw: '감성 · 직관 · 헌신' },
  { animal: '매',       en: 'Falcon',     from: [3, 21],  to: [4, 19],  element: '불',   kw: '결단력 · 리더십 · 추진력' },
  { animal: '비버',     en: 'Beaver',     from: [4, 20],  to: [5, 20],  element: '흙',   kw: '근면 · 안정 · 실용' },
  { animal: '사슴',     en: 'Deer',       from: [5, 21],  to: [6, 20],  element: '공기', kw: '사교성 · 재치 · 활력' },
  { animal: '딱따구리', en: 'Woodpecker', from: [6, 21],  to: [7, 22],  element: '물',   kw: '보살핌 · 공감 · 헌신' },
  { animal: '연어',     en: 'Salmon',     from: [7, 23],  to: [8, 22],  element: '불',   kw: '열정 · 자신감 · 창의' },
  { animal: '곰',       en: 'Bear',       from: [8, 23],  to: [9, 22],  element: '흙',   kw: '실용 · 신중 · 인내' },
  { animal: '큰까마귀', en: 'Raven',      from: [9, 23],  to: [10, 22], element: '공기', kw: '매력 · 균형 · 외교' },
  { animal: '뱀',       en: 'Snake',      from: [10, 23], to: [11, 21], element: '물',   kw: '신비 · 변화 · 통찰' },
  { animal: '올빼미',   en: 'Owl',        from: [11, 22], to: [12, 21], element: '불',   kw: '모험 · 낙천 · 지혜' },
  { animal: '기러기',   en: 'Goose',      from: [12, 22], to: [1, 19],  element: '흙',   kw: '목표지향 · 끈기 · 성실' },
];

// 육십갑자 — 천간(오행·색)과 지지(띠)
BD.STEMS = [
  { h: '갑', c: '甲', el: '목', elName: '나무', color: '푸른', colorHanja: '청', hex: '#2F6FB0' },
  { h: '을', c: '乙', el: '목', elName: '나무', color: '푸른', colorHanja: '청', hex: '#2F6FB0' },
  { h: '병', c: '丙', el: '화', elName: '불',   color: '붉은', colorHanja: '적', hex: '#C8362B' },
  { h: '정', c: '丁', el: '화', elName: '불',   color: '붉은', colorHanja: '적', hex: '#C8362B' },
  { h: '무', c: '戊', el: '토', elName: '흙',   color: '노란', colorHanja: '황', hex: '#D9A520' },
  { h: '기', c: '己', el: '토', elName: '흙',   color: '노란', colorHanja: '황', hex: '#D9A520' },
  { h: '경', c: '庚', el: '금', elName: '쇠',   color: '흰',   colorHanja: '백', hex: '#B9BFC7' },
  { h: '신', c: '辛', el: '금', elName: '쇠',   color: '흰',   colorHanja: '백', hex: '#B9BFC7' },
  { h: '임', c: '壬', el: '수', elName: '물',   color: '검은', colorHanja: '흑', hex: '#2B2F36' },
  { h: '계', c: '癸', el: '수', elName: '물',   color: '검은', colorHanja: '흑', hex: '#2B2F36' },
];
BD.BRANCHES = [
  { h: '자', c: '子', animal: '쥐',     emoji: '🐭' },
  { h: '축', c: '丑', animal: '소',     emoji: '🐮' },
  { h: '인', c: '寅', animal: '호랑이', emoji: '🐯' },
  { h: '묘', c: '卯', animal: '토끼',   emoji: '🐰' },
  { h: '진', c: '辰', animal: '용',     emoji: '🐲' },
  { h: '사', c: '巳', animal: '뱀',     emoji: '🐍' },
  { h: '오', c: '午', animal: '말',     emoji: '🐴' },
  { h: '미', c: '未', animal: '양',     emoji: '🐑' },
  { h: '신', c: '申', animal: '원숭이', emoji: '🐵' },
  { h: '유', c: '酉', animal: '닭',     emoji: '🐔' },
  { h: '술', c: '戌', animal: '개',     emoji: '🐶' },
  { h: '해', c: '亥', animal: '돼지',   emoji: '🐷' },
];

// 72천사 9품계 (순서대로 8명씩)
BD.CHOIRS = ['세라핌', '케루빔', '트로니', '도미니온', '파워', '버추', '프린시펄리티', '아크엔젤', '엔젤'];
