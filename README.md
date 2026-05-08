# 못그린 영화퀴즈 🎨

> "이 발그림은 어떤 영화일까요?"

세상에서 가장 형편없는, MS Paint 풍 패러디 발그림으로 영화를 맞추는
한국어 웹 퀴즈입니다. 30개의 유명 영화에 대해, 사용자가 직접 그린
**저작권 안전한 발그림**과 공개된 메타데이터(제목/연도/장르/줄거리)만을 사용합니다.

- 프레임워크: React + Vite + TypeScript
- 백엔드: 없음 (MVP)
- 데이터: 로컬 JSON (`src/data/quizData.json`)
- UI 언어: 한국어
- 스타일: 옛날 윈도우 / MS Paint 미감

---

## 빠른 시작

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:5173 을 엽니다.

이미지 파일이 없어도 앱은 정상 동작합니다 — 그림 자리에는
"발그림 미완성" 폴백 박스가 표시되며, 발그림 묘사 프롬프트가 보입니다.

### 메타데이터 보강 + 실행

```bash
npm install
npm run build-db   # (선택) TMDB/OMDb 메타데이터 보강
npm run dev
```

---

## API 키 추가 (선택)

`build-db` 스크립트는 TMDB 또는 OMDb 의 공개 메타데이터(줄거리/장르)만
가져와 보강합니다. **포스터/스틸/배우 사진은 절대 가져오지 않습니다.**

1. `.env.example` 을 `.env` 로 복사:
   ```bash
   cp .env.example .env
   ```
2. 둘 중 하나(혹은 둘 다)를 채워 넣습니다:
   ```env
   TMDB_API_KEY=your_tmdb_key_here
   OMDB_API_KEY=your_omdb_key_here
   ```
3. 다음을 실행:
   ```bash
   npm run build-db
   ```

키가 없는 경우, 스크립트는 기존 placeholder 데이터를 검증만 수행하고
정상 종료합니다.

---

## 발그림(이미지) 추가 방법

이미지 파일은 `public/images/` 안에 다음 이름으로 저장합니다:

```
public/images/movie_001.png
public/images/movie_002.png
...
public/images/movie_030.png
```

각 번호는 `src/data/quizData.json` 의 `imageUrl` 과 일대일 매칭됩니다.

자세한 가이드는 [`public/images/README.md`](./public/images/README.md) 를 참고하세요.

---

## 폴더 구조

```
.
├── public/
│   └── images/             # 발그림(.png) 들어가는 곳
│       └── README.md
├── scripts/
│   └── buildQuizDb.ts      # DB 보강 + 검증 스크립트
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx
│   │   ├── QuizCard.tsx
│   │   └── ResultPage.tsx
│   ├── data/
│   │   └── quizData.json   # 30개 영화 메타데이터
│   ├── App.tsx
│   ├── main.tsx
│   ├── styles.css
│   └── types.ts
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 사용한 NPM 스크립트

| 명령 | 설명 |
| --- | --- |
| `npm run dev` | 개발 서버 실행 (Vite) |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run build-db` | quizData.json 보강 + 검증 |

---

## ⚠️ 저작권 경고

**이 프로젝트의 가장 중요한 규칙입니다. 반드시 지켜주세요.**

- ❌ 영화 포스터, 공식 스틸, 예고편 캡처를 다운로드/저장/표시하지 않습니다.
- ❌ 배우 사진, 감독 사진, 스튜디오 로고를 사용하지 않습니다.
- ❌ 캐릭터 공식 일러스트를 사용하지 않습니다.
- ❌ 원본 이미지를 트레이싱/필터링하여 그대로 옮기지 않습니다.
- ✅ 본인이 직접 그린 단순화된 패러디(발그림) 만 사용합니다.
- ✅ 텍스트 메타데이터(제목/연도/장르/줄거리)만 사용합니다.

저작권 문제가 의심되는 자료는 **즉시 삭제**하세요.
패러디는 변형(transformation) 의 정도가 충분해야 하며, 한눈에 "발그림"임이
드러나는 표현이어야 합니다. 자세한 내용은 `public/images/README.md` 참고.

---

## 배포 (GitHub Pages)

`main` 브랜치에 푸시하면 `.github/workflows/deploy.yml` 가 자동으로
빌드 + GitHub Pages 배포를 수행합니다.

처음 한 번 GitHub 저장소에서 다음을 설정하세요:
- **Settings → Pages → Build and deployment → Source: GitHub Actions**

이후엔 푸시할 때마다 자동 배포됩니다.

배포 URL:
```
https://<your-username>.github.io/<repo-name>/
```

> 자기 포크에서도 그대로 동작합니다 — Vite `base` 경로를 워크플로가
> 저장소 이름에서 자동 추출합니다 (`VITE_BASE_PATH=/<repo>/`).

로컬에서 동일한 base path 로 빌드를 확인하려면:
```bash
VITE_BASE_PATH=/motgrin-movie-quiz/ npm run build
npm run preview
```

---

## 라이선스

이 프로젝트의 코드는 자유롭게 학습/수정/배포 가능합니다.
단, 사용자는 **자신이 추가하는 이미지 자산**의 저작권에 대해
스스로 책임을 집니다.
