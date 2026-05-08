// Generate parody drawings via OpenAI image API.
// Reads OPENAI_API_KEY from .env. Never hard-code keys.
//
// Run:  npm run gen-openai
//
// What it does:
//  - For each quiz item, sends ONLY the badDrawingPrompt (scene description)
//    to OpenAI's image API with a "crude MS Paint stick-figure" style suffix.
//  - Movie titles / actor names / IP names are NEVER sent — this keeps the
//    request transformative + within content policy.
//  - Saves each result to public/images/movie_NNN.png and points the JSON
//    imageUrl entry to the new .png file.
//
// Tunables: MODEL, SIZE, CONCURRENCY at top.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'images');
const DB = path.join(ROOT, 'src', 'data', 'quizData.json');

const KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
const SIZE = process.env.OPENAI_IMAGE_SIZE || '1024x1024';
// Be polite to the API — small concurrency.
const CONCURRENCY = Number(process.env.OPENAI_CONCURRENCY || 2);

if (!KEY) {
  console.error('❌ OPENAI_API_KEY 가 .env 에 없습니다.');
  console.error('   1) https://platform.openai.com/api-keys 에서 새 키를 발급');
  console.error('   2) 프로젝트 루트의 .env 파일에 다음을 추가:');
  console.error('      OPENAI_API_KEY=sk-...');
  console.error('   3) .env 는 .gitignore 에 들어 있어 커밋되지 않습니다.');
  process.exit(1);
}

if (KEY.length < 20 || !KEY.startsWith('sk-')) {
  console.error('⚠️  OPENAI_API_KEY 형식이 이상합니다. 제대로 된 키인지 확인하세요.');
}

const STYLE_SUFFIX =
  ' Drawn in extremely crude MS Paint style: ' +
  'thick black outlines on white background, stick figures only, ' +
  'flat solid colors, childish doodle aesthetic, no shading, no realism, ' +
  '5-minute mouse-drawn quality. Looks intentionally bad and funny. ' +
  'No text, no letters, no logos, no watermarks.';

const NEGATIVE_GUARD =
  ' Do not include any movie posters, real actors, copyrighted ' +
  'characters or logos. Generic stick figures only.';

async function generateOne(item) {
  const id = item.id;
  const fname = `movie_${String(id).padStart(3, '0')}.png`;
  const outPath = path.join(OUT, fname);

  const prompt = `${item.badDrawingPrompt}${STYLE_SUFFIX}${NEGATIVE_GUARD}`;

  const body = {
    model: MODEL,
    prompt,
    size: SIZE,
    n: 1,
  };

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errText.slice(0, 400)}`);
  }

  const data = await res.json();
  const first = data.data?.[0];
  if (!first) throw new Error('No image in response');

  let buf;
  if (first.b64_json) {
    buf = Buffer.from(first.b64_json, 'base64');
  } else if (first.url) {
    const dl = await fetch(first.url);
    if (!dl.ok) throw new Error(`Download failed: ${dl.status}`);
    buf = Buffer.from(await dl.arrayBuffer());
  } else {
    throw new Error('No b64_json or url in response');
  }

  fs.writeFileSync(outPath, buf);
  return fname;
}

async function pool(items, fn, concurrency) {
  const results = [];
  let cursor = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      const item = items[i];
      try {
        process.stdout.write(`  · (${i + 1}/${items.length}) ${item.titleKo} ... `);
        const t0 = Date.now();
        const fname = await fn(item);
        const dt = ((Date.now() - t0) / 1000).toFixed(1);
        console.log(`${fname} (${dt}s)`);
        results.push({ id: item.id, fname, ok: true });
      } catch (err) {
        console.log(`FAILED — ${err.message}`);
        results.push({ id: item.id, ok: false, err: err.message });
      }
    }
  });
  await Promise.all(workers);
  return results;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const db = JSON.parse(fs.readFileSync(DB, 'utf8'));
  console.log(`🎨 OpenAI 이미지 생성 — 모델 ${MODEL}, ${SIZE}, ${db.length}개`);
  console.log(`   동시 ${CONCURRENCY}개 호출\n`);

  const onlyArg = process.argv.find((a) => a.startsWith('--only='));
  const items = onlyArg
    ? db.filter((x) => onlyArg.slice('--only='.length).split(',').map(Number).includes(x.id))
    : db;

  const t0 = Date.now();
  const results = await pool(items, generateOne, CONCURRENCY);

  // Update DB imageUrl for successful ones
  let updated = 0;
  for (const r of results) {
    if (!r.ok) continue;
    const item = db.find((x) => x.id === r.id);
    if (item) {
      item.imageUrl = `/images/${r.fname}`;
      updated++;
    }
  }
  fs.writeFileSync(DB, JSON.stringify(db, null, 2) + '\n', 'utf8');

  const ok = results.filter((r) => r.ok).length;
  const failed = results.length - ok;
  const dt = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`\n✅ 성공: ${ok}, ❌ 실패: ${failed} (총 ${dt}s)`);
  console.log(`   imageUrl 업데이트: ${updated}개`);

  if (failed > 0) {
    console.log(`\n실패 항목만 다시 생성하려면:`);
    const failedIds = results.filter((r) => !r.ok).map((r) => r.id).join(',');
    console.log(`  npm run gen-openai -- --only=${failedIds}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
