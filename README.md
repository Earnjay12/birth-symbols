# 나의 탄생 상징

이름과 생일(양력)을 넣으면 열 가지 탄생 상징을 한 장에 보여주는 정적 웹앱입니다.
서버가 없고, 입력값은 브라우저 안에서만 계산되며 저장·전송되지 않습니다.

표시 항목: 별자리, 탄생석, 이달의 탄생화, 오늘의 탄생화(366일), 탄생색(366일, 일본판),
오행띠, 탄생 타로(Tarot School 계산법), 켈트 나무, 토템 동물(대중판), 수호천사(72천사).

## 파일

| 파일 | 역할 |
|---|---|
| `index.html` | 화면과 자료 출처 |
| `style.css` | 스타일 (라이트/다크 자동) |
| `app.js` | 계산과 렌더링, 이미지 저장 |
| `data-static.js` | 별자리·탄생석·월별 탄생화·타로·켈트·토템·육십갑자 표 |
| `data-daily.js` | 366일 탄생화, 366일 탄생색, 72천사 (생성 파일) |
| `build/` | 원자료(`flowers-full.json`, `angels.json`, `colors.json`, `colors-extra.json`)와 생성 스크립트 |

## 로컬에서 열기

```bash
python -m http.server 8765
```

브라우저에서 http://localhost:8765 를 엽니다. (`file://`로 직접 열어도 동작하지만 이미지 저장은 서버로 열었을 때 안정적입니다.)

## 배포

빌드 과정이 없으므로 폴더를 그대로 올리면 됩니다.

- Vercel / Netlify: 폴더를 드래그 앤 드롭하거나 GitHub 저장소를 연결합니다. 빌드 명령은 비우고 출력 디렉터리는 루트(`.`)로 둡니다.
- GitHub Pages: 저장소에 올린 뒤 Settings → Pages에서 `main` 브랜치 루트를 선택합니다.
- Cloudflare Pages: 프로젝트 생성 후 빌드 명령 없이 루트를 배포합니다.

`build/` 폴더는 배포에 포함되지 않아도 됩니다.

## 자료 수정

`build/` 안의 JSON을 고친 뒤 아래를 실행하면 `data-daily.js`가 다시 만들어집니다.

```bash
node build/make-data.js
```

- `flowers-full.json`: `"MMDD": ["꽃 이름", "영문명", "꽃말"]`
- `colors-extra.json`: `colors.json`보다 우선 적용되는 덮어쓰기 (`"MMDD": ["한국어 이름", "원어 이름", "#HEX"]`)
- `angels.json`: 72천사 이름과 날짜 구간
