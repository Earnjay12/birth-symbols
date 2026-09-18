/* app.js — 계산과 화면 표시. 모든 처리는 브라우저 안에서만 이루어지고 서버로 보내지 않는다. */
(function () {
  'use strict';

  const $ = (s) => document.querySelector(s);
  const pad = (n) => String(n).padStart(2, '0');
  const WEEK = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const TOTEM_EMOJI = { '수달': '🦦', '늑대': '🐺', '매': '🦅', '비버': '🦫', '사슴': '🦌', '딱따구리': '🐦', '연어': '🐟', '곰': '🐻', '큰까마귀': '🐦‍⬛', '뱀': '🐍', '올빼미': '🦉', '기러기': '🪿' };

  // ---------- 입력 폼 ----------
  const form = $('#form');
  const yearSel = $('#year'), monthSel = $('#month'), daySel = $('#day');
  const thisYear = new Date().getFullYear();
  for (let y = thisYear; y >= 1900; y--) yearSel.add(new Option(y + '년', y));
  for (let m = 1; m <= 12; m++) monthSel.add(new Option(m + '월', m));
  yearSel.value = '2000';

  function fillDays() {
    const y = +yearSel.value, m = +monthSel.value, keep = +daySel.value || 1;
    const n = new Date(y, m, 0).getDate();
    daySel.innerHTML = '';
    for (let d = 1; d <= n; d++) daySel.add(new Option(d + '일', d));
    daySel.value = String(Math.min(keep, n));
  }
  yearSel.addEventListener('change', fillDays);
  monthSel.addEventListener('change', fillDays);
  fillDays();

  // ---------- 계산 ----------
  function inRange(m, d, from, to) {
    const v = m * 100 + d, a = from[0] * 100 + from[1], b = to[0] * 100 + to[1];
    return a <= b ? (v >= a && v <= b) : (v >= a || v <= b); // 연말을 넘는 구간 처리
  }
  const byDate = (list, m, d) => list.find((x) => inRange(m, d, x.from, x.to));

  function ganji(year) {
    const s = (((year - 4) % 10) + 10) % 10;
    const b = (((year - 4) % 12) + 12) % 12;
    return { stem: BD.STEMS[s], branch: BD.BRANCHES[b] };
  }

  // Tarot School 계산법: MM + DD + 연도 앞 두 자리 + 연도 뒤 두 자리
  function tarotCards(y, m, d) {
    let sum = m + d + Math.floor(y / 100) + (y % 100);
    if (sum >= 100) sum = Math.floor(sum / 10) + (sum % 10); // 세 자리: 앞 두 자리 + 마지막 자리
    if (sum > 22) sum = Math.floor(sum / 10) + (sum % 10);   // 두 자리: 자릿수 합
    if (sum === 19) return [19, 10, 1];                        // 유일한 세 장 조합
    if (sum === 22) sum = 4;                                   // 22는 바보로 보지 않고 4로 환원
    if (sum >= 10) return [sum, Math.floor(sum / 10) + (sum % 10)];
    const pairOf = { 1: 10, 2: 11, 3: 12, 4: 13, 5: 14, 6: 15, 7: 16, 8: 17, 9: 18 };
    return [pairOf[sum], sum];
  }

  function luminance(hex) {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---------- 카드 렌더링 ----------
  function card(o) {
    return `<article class="card" style="--accent:${o.accent || 'var(--accent)'}">
      <div class="card-head"><span class="icon" aria-hidden="true">${o.icon}</span><h3>${o.title}</h3></div>
      ${o.body || ''}
      <p class="main">${o.main}</p>
      ${o.sub ? `<p class="sub">${o.sub}</p>` : ''}
      ${o.meta && o.meta.length ? `<ul class="meta">${o.meta.map((x) => `<li>${x}</li>`).join('')}</ul>` : ''}
      ${o.kw ? `<p class="kw">${o.kw}</p>` : ''}
      ${o.note ? `<p class="note">${o.note}</p>` : ''}
    </article>`;
  }

  let last = null;

  function render(name, y, m, d) {
    const key = pad(m) + pad(d);
    const zod = byDate(BD.ZODIAC, m, d);
    const stone = BD.BIRTHSTONES[m];
    const mf = BD.MONTH_FLOWERS[m];
    const df = (BD.FLOWERS366 || {})[key];
    const col = (BD.COLORS366 || {})[key];
    const gj = ganji(y);
    const tc = tarotCards(y, m, d);
    const celt = byDate(BD.CELTIC, m, d);
    const tot = byDate(BD.TOTEM, m, d);
    const ang = byDate(BD.ANGELS || [], m, d);
    const wd = WEEK[new Date(y, m - 1, d).getDay()];
    const range = (x) => `${x.from[0]}월 ${x.from[1]}일 ~ ${x.to[0]}월 ${x.to[1]}일`;

    const cards = [];

    cards.push(card({
      icon: zod.symbol, title: '별자리', accent: 'var(--accent)',
      main: esc(zod.name), sub: `${zod.en} · ${range(zod)}`,
      meta: [`원소 ${zod.element}`, `지배 행성 ${zod.planet}`, zod.modality],
      kw: zod.kw,
    }));

    cards.push(card({
      icon: '💎', title: '탄생석', accent: stone.hex,
      main: esc(stone.stones.join(' · ')), sub: stone.en,
      meta: [`${m}월의 보석`], kw: `의미 · ${stone.meaning}`,
    }));

    cards.push(card({
      icon: '🌸', title: '이달의 탄생화', accent: '#d98fb0',
      main: esc(mf.flowers.join(' · ')), sub: `${m}월 탄생화 (미국식)`,
      kw: `꽃말 · ${mf.meaning}`,
    }));

    cards.push(card({
      icon: '🌷', title: '오늘의 탄생화', accent: '#8fbf8f',
      main: df ? esc(df[0]) : '자료 없음', sub: `${df && df[2] ? esc(df[2]) + ' · ' : ''}${m}월 ${d}일의 꽃`,
      kw: df && df[1] ? `꽃말 · ${esc(df[1])}` : '',
    }));

    if (col) {
      const light = luminance(col[2]) > 0.6;
      cards.push(card({
        icon: '🎨', title: '탄생색', accent: col[2],
        body: `<div class="swatch ${light ? 'light' : 'dark'}" style="background:${col[2]}">${col[2]}</div>`,
        main: esc(col[0]), sub: `${esc(col[1])} · ${m}월 ${d}일의 색`,
      }));
    } else {
      cards.push(card({ icon: '🎨', title: '탄생색', main: '자료 없음', sub: `${m}월 ${d}일의 색은 이 판본에 없습니다.` }));
    }

    const earlyYear = m === 1 || (m === 2 && d <= 4);
    cards.push(card({
      icon: gj.branch.emoji, title: '오행띠', accent: gj.stem.hex,
      main: `${gj.stem.color} ${gj.branch.animal}띠`,
      sub: `${gj.stem.h}${gj.branch.h}년 (${gj.stem.c}${gj.branch.c}) · ${y}년생`,
      meta: [`오행 ${gj.stem.elName}(${gj.stem.el})`, `색 ${gj.stem.colorHanja}(${gj.stem.color})`],
      note: earlyYear ? '양력 연도 기준입니다. 설날이나 입춘을 기준으로 삼으면 전년도 띠가 될 수 있어요.' : '',
    }));

    cards.push(card({
      icon: '🃏', title: '탄생 타로', accent: '#7a5cc6',
      body: `<div class="tarot-cards">${tc.map((n) => `<div class="tarot-card"><b>${esc(BD.TAROT[n].name)}</b><span>${BD.TAROT[n].en}</span></div>`).join('')}</div>`,
      main: tc.map((n) => BD.TAROT[n].name).join(' · '),
      sub: tc.length === 3 ? '태양이 나오는 유일한 세 장 조합' : '두 장이 짝을 이루는 탄생 카드',
      kw: tc.map((n) => `${BD.TAROT[n].name}: ${BD.TAROT[n].kw}`).join(' / '),
    }));

    cards.push(card({
      icon: '🌳', title: '켈트 나무', accent: '#5e8c61',
      main: esc(celt.tree), sub: `${celt.en} · 오검 문자 ${celt.ogham}`,
      meta: [range(celt)], kw: celt.kw,
    }));

    cards.push(card({
      icon: TOTEM_EMOJI[tot.animal] || '🪶', title: '토템 동물', accent: '#c98a3a',
      main: esc(tot.animal), sub: `${tot.en} · ${range(tot)}`,
      meta: [`원소 ${tot.element}`], kw: tot.kw,
    }));

    if (ang) {
      cards.push(card({
        icon: '👼', title: '수호천사', accent: '#4f86c6',
        main: esc(ang.kr), sub: `${ang.name} · ${ang.n}번째 천사`,
        meta: [range(ang), `${ang.sign} ${ang.deg}`, `${BD.CHOIRS[Math.floor((ang.n - 1) / 8)]} 품계`],
      }));
    }

    $('#result').innerHTML = `
      <div class="hero">
        <h2>${esc(name)}님의 탄생 상징</h2>
        <p>${y}년 ${m}월 ${d}일 ${wd} 출생</p>
      </div>
      <div class="grid">${cards.join('')}</div>`;
    $('#result').hidden = false;
    $('#actions').hidden = false;
    last = { y, m, d };
    $('#result').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#name').value.trim() || '당신';
    render(name, +yearSel.value, +monthSel.value, +daySel.value);
  });

  $('#reset').addEventListener('click', () => {
    $('#result').hidden = true;
    $('#actions').hidden = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('#name').focus();
  });

  // ---------- 이미지 저장 ----------
  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }
  $('#save').addEventListener('click', async () => {
    const btn = $('#save');
    btn.disabled = true; btn.textContent = '이미지 만드는 중…';
    try {
      if (!window.html2canvas) await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      const bg = getComputedStyle(document.body).backgroundColor;
      const canvas = await window.html2canvas($('#result'), { backgroundColor: bg, scale: 2, useCORS: true });
      const a = document.createElement('a');
      a.download = `탄생상징_${last.y}${pad(last.m)}${pad(last.d)}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    } catch (err) {
      alert('이미지를 만들지 못했습니다. 화면을 직접 캡처해 주세요.');
    } finally {
      btn.disabled = false; btn.textContent = '이미지로 저장';
    }
  });
})();
