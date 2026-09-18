// build/make-data.js — 수집한 원자료를 합쳐 ../data-daily.js 를 만든다.
// 사용법: node build/make-data.js <browser-batch 결과 파일 경로>
'use strict';
const fs = require('fs');
const path = require('path');

const here = __dirname;
const resultFile = process.argv[2];

// 1) 366일 탄생화 (나무위키 목록) + 선택적 꽃말
const flowers = {};
const raw = fs.readFileSync(path.join(here, 'flowers-raw.txt'), 'utf8');
for (const line of raw.split(/\r?\n/)) {
  const m = line.match(/^(\d{1,2})월 (\d{1,2})일:\s*(.+?)\s*$/);
  if (!m) continue;
  const key = m[1].padStart(2, '0') + m[2].padStart(2, '0');
  flowers[key] = [m[3].replace(/\[\d+\]/g, '').trim(), ''];
}
// 한국에서 통용되는 목록(이름, 영문명, 꽃말)이 있으면 그것을 우선 사용 — 형식: [이름, 꽃말, 영문명]
const fullFile = path.join(here, 'flowers-full.json');
if (fs.existsSync(fullFile)) {
  const full = JSON.parse(fs.readFileSync(fullFile, 'utf8'));
  for (const [k, v] of Object.entries(full)) flowers[k] = [v[0], v[2] || '', v[1] || ''];
}

// 2) 탄생색 (브라우저에서 긁은 결과 파일에서 JSON 문자열 4덩어리 추출)
const colorsJP = {}, colorsEN = {};
if (resultFile && fs.existsSync(resultFile)) {
  const items = JSON.parse(fs.readFileSync(resultFile, 'utf8'));
  for (const it of items) {
    const text = it.text || '';
    const m = text.match(/\[javascript_tool:javascript_exec\]\s*("(?:[^"\\]|\\.)*")/);
    if (!m) {
      if (text.includes('"snippet"')) console.log('--- 0229 snippet ---\n' + text.slice(0, 900) + '\n');
      continue;
    }
    let obj;
    try { obj = JSON.parse(JSON.parse(m[1])); } catch (e) { continue; }
    for (const [k, v] of Object.entries(obj)) {
      if (!/^\d{4}$/.test(k) || !v) continue;
      if (v.jp) colorsJP[k] = [v.jp.kr, v.jp.name, v.jp.hex];
      if (v.en) colorsEN[k] = [v.en.kr, v.en.name, v.en.hex];
    }
  }
}
// 긁은 결과는 build/colors.json 에 보관한다. 결과 파일 없이 실행하면 이 보관본을 읽는다.
const colorsFile = path.join(here, 'colors.json');
if (Object.keys(colorsJP).length) {
  fs.writeFileSync(colorsFile, JSON.stringify({ jp: colorsJP, en: colorsEN }, null, 1), 'utf8');
} else if (fs.existsSync(colorsFile)) {
  const saved = JSON.parse(fs.readFileSync(colorsFile, 'utf8'));
  Object.assign(colorsJP, saved.jp || {});
  Object.assign(colorsEN, saved.en || {});
}
const extraFile = path.join(here, 'colors-extra.json');
if (fs.existsSync(extraFile)) {
  const extra = JSON.parse(fs.readFileSync(extraFile, 'utf8'));
  for (const [k, v] of Object.entries(extra.jp || {})) colorsJP[k] = v;
  for (const [k, v] of Object.entries(extra.en || {})) colorsEN[k] = v;
}

// 3) 72천사
const angels = JSON.parse(fs.readFileSync(path.join(here, 'angels.json'), 'utf8'));

// 4) 출력
const sortObj = (o) => Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]]));
const j = (o) => JSON.stringify(o, null, 0).replace(/\],"/g, '],\n  "').replace(/^\{/, '{\n  ').replace(/\}$/, '\n}');
const out = `// data-daily.js — 일별 자료 (build/make-data.js 로 생성)
// FLOWERS366: [꽃 이름, 꽃말]  COLORS366: [한국어 색 이름, 원어 이름, HEX] (일본판)  COLORS366_EN: 미국판(Colorstrology 계열)
window.BD = window.BD || {};
BD.FLOWERS366 = ${j(sortObj(flowers))};
BD.COLORS366 = ${j(sortObj(colorsJP))};
BD.COLORS366_EN = ${j(sortObj(colorsEN))};
BD.ANGELS = ${JSON.stringify(angels)};
`;
fs.writeFileSync(path.join(here, '..', 'data-daily.js'), out, 'utf8');
console.log(`flowers: ${Object.keys(flowers).length}, colorsJP: ${Object.keys(colorsJP).length}, colorsEN: ${Object.keys(colorsEN).length}, angels: ${angels.length}`);
const missingC = [];
const dim = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
for (let m = 1; m <= 12; m++) for (let d = 1; d <= dim[m - 1]; d++) {
  const k = String(m).padStart(2, '0') + String(d).padStart(2, '0');
  if (!colorsJP[k]) missingC.push(k);
  if (!flowers[k]) console.log('missing flower', k);
}
console.log('missing colors:', missingC.join(',') || 'none');
