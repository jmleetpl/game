/**
 * scripts/buildQuizDb.ts
 *
 * 옵션 1) TMDB 또는 OMDb API 키가 .env 에 있으면, 공개된 메타데이터(제목/연도/장르/요약)만 가져와
 *         기존 src/data/quizData.json 의 항목을 보강합니다.
 * 옵션 2) API 키가 없으면 기존 placeholder JSON 을 그대로 유지/검증합니다.
 *
 * ⚠️ 저작권: 어떠한 경우에도 포스터/스틸/배우 사진/로고 등 저작권 이미지를 다운로드하거나 저장하지 않습니다.
 *           이미지(imageUrl)는 항상 사용자가 제작한 패러디(발그림) 경로만을 가리킵니다.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DB_PATH = path.join(ROOT, 'src/data/quizData.json');

interface QuizItem {
  id: number;
  titleKo: string;
  titleEn: string;
  releaseYear: number;
  genre: string;
  shortPlot: string;
  famousSceneDescription: string;
  badDrawingPrompt: string;
  imageUrl: string;
  hint: string;
  choices: string[];
  answer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const TMDB_KEY = process.env.TMDB_API_KEY;
const OMDB_KEY = process.env.OMDB_API_KEY;

async function readDb(): Promise<QuizItem[]> {
  const raw = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(raw) as QuizItem[];
}

async function writeDb(items: QuizItem[]): Promise<void> {
  const json = JSON.stringify(items, null, 2);
  await fs.writeFile(DB_PATH, json + '\n', 'utf-8');
}

interface TmdbResult {
  title?: string;
  release_date?: string;
  overview?: string;
  genre_ids?: number[];
  vote_average?: number;
}

async function fetchFromTmdb(titleEn: string, year: number): Promise<Partial<QuizItem> | null> {
  if (!TMDB_KEY) return null;
  const url =
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}` +
    `&query=${encodeURIComponent(titleEn)}&year=${year}&language=ko-KR`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  ! TMDB 응답 실패: ${res.status}`);
      return null;
    }
    const data = (await res.json()) as { results?: TmdbResult[] };
    const first = data.results?.[0];
    if (!first) return null;
    return {
      shortPlot: first.overview?.slice(0, 240) || undefined,
    };
  } catch (err) {
    console.warn(`  ! TMDB 호출 에러: ${(err as Error).message}`);
    return null;
  }
}

interface OmdbResult {
  Title?: string;
  Year?: string;
  Genre?: string;
  Plot?: string;
  Response?: string;
}

async function fetchFromOmdb(titleEn: string, year: number): Promise<Partial<QuizItem> | null> {
  if (!OMDB_KEY) return null;
  const url =
    `https://www.omdbapi.com/?apikey=${OMDB_KEY}` +
    `&t=${encodeURIComponent(titleEn)}&y=${year}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as OmdbResult;
    if (data.Response !== 'True') return null;
    return {
      genre: data.Genre || undefined,
      shortPlot: data.Plot || undefined,
    };
  } catch (err) {
    console.warn(`  ! OMDb 호출 에러: ${(err as Error).message}`);
    return null;
  }
}

function validateItem(item: QuizItem, index: number): string[] {
  const errors: string[] = [];
  const requiredKeys: (keyof QuizItem)[] = [
    'id', 'titleKo', 'titleEn', 'releaseYear', 'genre',
    'shortPlot', 'famousSceneDescription', 'badDrawingPrompt',
    'imageUrl', 'hint', 'choices', 'answer', 'explanation', 'difficulty',
  ];
  for (const k of requiredKeys) {
    if (item[k] === undefined || item[k] === null || item[k] === '') {
      errors.push(`#${index} (${item.titleKo ?? '?'}): "${k}" 필드 누락`);
    }
  }
  if (Array.isArray(item.choices) && item.choices.length !== 4) {
    errors.push(`#${index} (${item.titleKo}): choices 는 4개여야 함 (현재 ${item.choices.length})`);
  }
  if (item.choices && !item.choices.includes(item.answer)) {
    errors.push(`#${index} (${item.titleKo}): answer 가 choices 에 없음`);
  }
  if (item.imageUrl && !item.imageUrl.startsWith('/images/')) {
    errors.push(`#${index} (${item.titleKo}): imageUrl 은 /images/ 로 시작해야 함`);
  }
  return errors;
}

async function main() {
  console.log('🎨 못그린 영화퀴즈 — DB 빌드 시작\n');

  const hasKey = Boolean(TMDB_KEY || OMDB_KEY);
  if (!hasKey) {
    console.log('ℹ️  .env 에 TMDB_API_KEY / OMDB_API_KEY 가 없습니다.');
    console.log('    기존 src/data/quizData.json 을 검증만 수행합니다.\n');
  } else {
    console.log(`🔑 사용 가능한 API: ${TMDB_KEY ? 'TMDB ' : ''}${OMDB_KEY ? 'OMDb' : ''}`);
    console.log('   (포스터/이미지는 절대 가져오지 않으며, 메타데이터만 보강합니다.)\n');
  }

  const items = await readDb();
  console.log(`📚 항목 수: ${items.length}\n`);

  if (hasKey) {
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      console.log(`  · (${i + 1}/${items.length}) ${it.titleEn} (${it.releaseYear})`);
      const merged: Partial<QuizItem> = {};
      const t = await fetchFromTmdb(it.titleEn, it.releaseYear);
      if (t) Object.assign(merged, t);
      if (!merged.shortPlot || !merged.genre) {
        const o = await fetchFromOmdb(it.titleEn, it.releaseYear);
        if (o) {
          if (!merged.shortPlot && o.shortPlot) merged.shortPlot = o.shortPlot;
          if (!merged.genre && o.genre) merged.genre = o.genre;
        }
      }
      // 메타데이터만 머지 (이미지/제목 등은 손대지 않음)
      if (merged.shortPlot && merged.shortPlot.length > 20) {
        items[i].shortPlot = merged.shortPlot;
      }
      if (merged.genre) {
        items[i].genre = merged.genre;
      }
      // API rate-limit friendly
      await new Promise((r) => setTimeout(r, 250));
    }
    await writeDb(items);
    console.log('\n💾 메타데이터를 보강하여 저장했습니다.\n');
  }

  // 검증
  console.log('🔍 데이터 검증 중...');
  const errors: string[] = [];
  items.forEach((it, idx) => {
    errors.push(...validateItem(it, idx + 1));
  });
  if (errors.length === 0) {
    console.log(`✅ 모든 ${items.length}개 항목이 유효합니다.`);
  } else {
    console.error(`❌ 검증 실패: ${errors.length}개 문제`);
    errors.forEach((e) => console.error('   - ' + e));
    process.exitCode = 1;
  }

  console.log('\n⚠️  알림: imageUrl 은 /images/movie_*.png 경로만 가리킵니다.');
  console.log('   원본 영화 포스터/스틸/로고는 절대 사용하지 마세요. 패러디 발그림만 추가하세요.');
  console.log('   public/images/README.md 를 참고하세요.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
