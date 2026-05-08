// Crude stick-figure parody SVGs for each quiz item's iconic scene.
// All shapes are drawn from primitives — clearly transformative parody, no traced art.
// Run:  node scripts/generateDrawings.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '..', 'public', 'images');
const DB = path.resolve(__dirname, '..', 'src', 'data', 'quizData.json');

const W = 480, H = 360;

const svg = (body, bg = '#fff') => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="'Comic Sans MS','Courier New',monospace" shape-rendering="crispEdges">
<rect width="${W}" height="${H}" fill="${bg}"/>
${body}
<rect x="2" y="2" width="${W - 4}" height="${H - 4}" fill="none" stroke="#000" stroke-width="5"/>
</svg>`;

const cap = (text, x = W / 2, y = H - 18, fill = '#000') =>
  `<rect x="${x - text.length * 5 - 8}" y="${y - 16}" width="${text.length * 10 + 16}" height="22" fill="#fff" stroke="#000" stroke-width="2"/>
   <text x="${x}" y="${y}" text-anchor="middle" font-size="14" font-weight="bold" fill="${fill}">${text}</text>`;

const D = {

// 1. TITANIC — bow scene: woman arms-out, man behind, slanted ship, orange sunset
1: () => `
  <rect width="${W}" height="220" fill="#ff9c4a"/>
  <circle cx="380" cy="100" r="40" fill="#ffe066"/>
  <rect x="0" y="220" width="${W}" height="${H - 220}" fill="#3a6cb0"/>
  <!-- slanted ship bow -->
  <polygon points="40,260 380,200 420,260 380,300 40,300" fill="#222" stroke="#000" stroke-width="4"/>
  <line x1="80" y1="248" x2="380" y2="200" stroke="#999" stroke-width="3"/>
  <!-- railing -->
  <line x1="280" y1="218" x2="380" y2="200" stroke="#fff" stroke-width="3"/>
  <line x1="290" y1="218" x2="290" y2="240" stroke="#fff" stroke-width="2"/>
  <line x1="320" y1="212" x2="320" y2="232" stroke="#fff" stroke-width="2"/>
  <line x1="350" y1="206" x2="350" y2="226" stroke="#fff" stroke-width="2"/>
  <!-- woman: arms out flying-pose, facing right -->
  <circle cx="350" cy="170" r="14" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
  <path d="M334 170 Q 340 152 358 158 L 360 174 Q 348 174 334 174 Z" fill="#a05" stroke="#000" stroke-width="2"/>
  <line x1="350" y1="184" x2="350" y2="206" stroke="#000" stroke-width="3"/>
  <line x1="350" y1="190" x2="395" y2="180" stroke="#000" stroke-width="4"/>
  <line x1="350" y1="190" x2="305" y2="180" stroke="#000" stroke-width="4"/>
  <polygon points="338,206 362,206 372,260 328,260" fill="#a8b" stroke="#000" stroke-width="2"/>
  <!-- man behind, hands at her waist -->
  <circle cx="328" cy="180" r="12" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
  <line x1="328" y1="192" x2="335" y2="220" stroke="#000" stroke-width="3"/>
  <line x1="328" y1="200" x2="338" y2="208" stroke="#000" stroke-width="3"/>
  ${cap('I FLY, JACK!')}
`,

// 2. JURASSIC PARK — giant T-Rex eye through fence + cup-of-water rumble
2: () => `
  <rect width="${W}" height="${H}" fill="#1a2a1a"/>
  <!-- rain -->
  ${Array.from({ length: 30 }, () => {
    const x = Math.random() * W, y = Math.random() * H;
    return `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x - 6).toFixed(0)}" y2="${(y + 16).toFixed(0)}" stroke="#9be" stroke-width="1"/>`;
  }).join('')}
  <!-- T-rex silhouette big -->
  <path d="M40 290 L 40 220 L 80 180 L 130 160 L 200 150 L 260 160 L 300 180 L 320 220 L 320 250 L 360 250 L 380 230 L 400 240 L 410 280 L 280 290 Z" fill="#0a2a0a" stroke="#000" stroke-width="4"/>
  <!-- mouth zigzag teeth -->
  <polyline points="260,180 270,195 280,180 290,195 300,180" fill="none" stroke="#fff" stroke-width="2"/>
  <!-- eye -->
  <circle cx="280" cy="160" r="6" fill="#ff0"/>
  <circle cx="280" cy="160" r="2" fill="#000"/>
  <!-- tiny arms -->
  <line x1="240" y1="200" x2="248" y2="220" stroke="#000" stroke-width="2"/>
  <line x1="244" y1="200" x2="252" y2="218" stroke="#000" stroke-width="2"/>
  <!-- cup of water in foreground -->
  <rect x="380" y="290" width="40" height="50" fill="#fff" stroke="#000" stroke-width="3"/>
  <ellipse cx="400" cy="296" rx="15" ry="3" fill="#9bf" stroke="#000" stroke-width="2"/>
  <ellipse cx="400" cy="296" rx="9" ry="2" fill="none" stroke="#000" stroke-width="1"/>
  ${cap('OBJECTS BIGGER THAN APPEAR')}
`,

// 3. STAR WARS — Vader silhouette + red saber + breath
3: () => `
  <rect width="${W}" height="${H}" fill="#000"/>
  <!-- stars -->
  ${Array.from({ length: 30 }, () => {
    const x = Math.random() * W, y = Math.random() * 280;
    return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="1" fill="#fff"/>`;
  }).join('')}
  <!-- Vader silhouette body -->
  <path d="M180 360 L 180 200 L 200 180 L 280 180 L 300 200 L 300 360 Z" fill="#1a1a1a" stroke="#222" stroke-width="2"/>
  <!-- helmet shape -->
  <path d="M210 180 L 210 140 Q 210 110 240 105 Q 270 110 270 140 L 270 180 Z" fill="#0a0a0a" stroke="#222" stroke-width="2"/>
  <!-- visor mask -->
  <ellipse cx="240" cy="150" rx="22" ry="14" fill="#222"/>
  <!-- triangular eyes -->
  <polygon points="222,144 232,154 222,158" fill="#a00"/>
  <polygon points="258,144 248,154 258,158" fill="#a00"/>
  <!-- mouth grill -->
  <rect x="226" y="160" width="28" height="6" fill="#222" stroke="#666" stroke-width="1"/>
  <line x1="232" y1="160" x2="232" y2="166" stroke="#666"/>
  <line x1="240" y1="160" x2="240" y2="166" stroke="#666"/>
  <line x1="248" y1="160" x2="248" y2="166" stroke="#666"/>
  <!-- red saber -->
  <line x1="290" y1="240" x2="380" y2="100" stroke="#a00" stroke-width="10"/>
  <line x1="290" y1="240" x2="380" y2="100" stroke="#fff" stroke-width="3"/>
  <line x1="285" y1="245" x2="295" y2="235" stroke="#888" stroke-width="6"/>
  ${cap('LUKE... I AM YOUR DAD', W / 2, H - 18, '#000')}
`,

// 4. LOTR — Gandalf on bridge, staff down, balrog
4: () => `
  <rect width="${W}" height="${H}" fill="#1a0a0a"/>
  <!-- chasm/lava glow -->
  <rect x="0" y="280" width="${W}" height="80" fill="#a04020"/>
  <rect x="0" y="320" width="${W}" height="40" fill="#ff5500"/>
  <!-- bridge -->
  <rect x="100" y="240" width="280" height="10" fill="#444" stroke="#000" stroke-width="2"/>
  <rect x="100" y="250" width="280" height="20" fill="#222" stroke="#000" stroke-width="2"/>
  <!-- crack -->
  <polyline points="240,240 235,245 245,250 238,255 248,260 240,270" fill="none" stroke="#ff0" stroke-width="3"/>
  <!-- Gandalf left -->
  <circle cx="170" cy="200" r="14" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
  <!-- beard -->
  <path d="M156 208 Q 170 230 184 208 Z" fill="#fff" stroke="#000" stroke-width="2"/>
  <!-- hat -->
  <polygon points="150,194 170,160 190,194" fill="#888" stroke="#000" stroke-width="3"/>
  <ellipse cx="170" cy="194" rx="22" ry="4" fill="#888" stroke="#000" stroke-width="2"/>
  <!-- robe -->
  <polygon points="158,222 182,222 200,240 140,240" fill="#bbb" stroke="#000" stroke-width="3"/>
  <!-- staff -->
  <line x1="195" y1="170" x2="210" y2="240" stroke="#7a3a1a" stroke-width="5"/>
  <circle cx="195" cy="170" r="6" fill="#fff" stroke="#ff0" stroke-width="2"/>
  <!-- sword in other hand -->
  <line x1="150" y1="200" x2="130" y2="180" stroke="#bbb" stroke-width="3"/>
  <!-- Balrog right: red blob with horns and whip -->
  <path d="M340 240 L 320 200 L 340 180 L 360 160 L 380 180 L 400 200 L 380 240 Z" fill="#a00" stroke="#000" stroke-width="3"/>
  <polygon points="340,180 332,160 348,170" fill="#000"/>
  <polygon points="380,180 388,160 372,170" fill="#000"/>
  <circle cx="350" cy="200" r="3" fill="#ff0"/>
  <circle cx="370" cy="200" r="3" fill="#ff0"/>
  <path d="M400 220 Q 420 200 440 220 Q 460 240 440 260" fill="none" stroke="#000" stroke-width="3"/>
  ${cap('YOU SHALL NOT PASS!', W / 2, 30, '#fff').replace('fill="#fff"', 'fill="#fff" stroke="#fff"').replace(/<rect[^/]*\/>/, '<rect x="80" y="14" width="320" height="22" fill="#000" stroke="#fff" stroke-width="2"/>')}
`,

// 5. HARRY POTTER — close-up: round glasses + lightning scar + smile
5: () => `
  <rect width="${W}" height="${H}" fill="#5a3a1a"/>
  <!-- big face -->
  <circle cx="240" cy="180" r="120" fill="#ffe0c0" stroke="#000" stroke-width="5"/>
  <!-- messy hair -->
  <path d="M120 130 Q 150 80 200 100 Q 220 70 250 100 Q 290 70 320 110 Q 360 90 360 140 L 360 180 L 120 180 Z" fill="#000"/>
  <!-- glasses -->
  <circle cx="200" cy="190" r="28" fill="none" stroke="#000" stroke-width="6"/>
  <circle cx="280" cy="190" r="28" fill="none" stroke="#000" stroke-width="6"/>
  <line x1="228" y1="190" x2="252" y2="190" stroke="#000" stroke-width="6"/>
  <!-- eyes -->
  <circle cx="200" cy="190" r="6" fill="#3a8"/>
  <circle cx="280" cy="190" r="6" fill="#3a8"/>
  <!-- lightning scar on forehead -->
  <polyline points="170,130 178,140 172,150 180,162" fill="none" stroke="#a00" stroke-width="6" stroke-linecap="round"/>
  <!-- smile -->
  <path d="M200 240 Q 240 260 280 240" fill="none" stroke="#000" stroke-width="4"/>
  ${cap('? GLASSES + ZAP ?')}
`,

// 6. MATRIX — bullet-time bend
6: () => `
  <rect width="${W}" height="${H}" fill="#000"/>
  <!-- green code rain -->
  <g fill="#0f0" font-size="16" font-family="monospace">
    ${Array.from({ length: 12 }, (_, i) => {
      const x = i * 40 + 10;
      return Array.from({ length: 8 }, (_, j) =>
        `<text x="${x}" y="${20 + j * 30}" opacity="${(0.3 + j * 0.08).toFixed(2)}">${Math.random() < 0.5 ? '0' : '1'}</text>`
      ).join('');
    }).join('')}
  </g>
  <!-- bullets coming from left -->
  ${Array.from({ length: 5 }, (_, i) => {
    const y = 130 + i * 12;
    return `<circle cx="${40 + i * 10}" cy="${y}" r="4" fill="#ff0"/>
            <line x1="${40 + i * 10}" y1="${y}" x2="${10 + i * 10}" y2="${y}" stroke="#ff0" stroke-width="2"/>`;
  }).join('')}
  <!-- Neo bent backward -->
  <g transform="translate(280 220) rotate(-30)">
    <ellipse cx="0" cy="0" rx="10" ry="14" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <rect x="-10" y="-4" width="20" height="6" fill="#000"/>
    <polygon points="-22,16 22,16 30,80 -30,80" fill="#000" stroke="#0f0" stroke-width="3"/>
    <line x1="-22,18" x2="-50" y1="40" y2="20" stroke="#000" stroke-width="6"/>
    <line x1="-22" y1="40" x2="-50" y2="60" stroke="#000" stroke-width="6"/>
    <line x1="22" y1="40" x2="50" y2="20" stroke="#000" stroke-width="6"/>
    <line x1="-15" y1="80" x2="-30" y2="120" stroke="#000" stroke-width="8"/>
    <line x1="15" y1="80" x2="30" y2="130" stroke="#000" stroke-width="8"/>
  </g>
  ${cap('BULLET? NO THX', W / 2, 30, '#0f0').replace(/<rect[^/]*\/>/, '<rect x="160" y="14" width="160" height="22" fill="#000" stroke="#0f0" stroke-width="2"/>')}
`,

// 7. INCEPTION — folded city L-shape
7: () => `
  <rect width="${W}" height="${H}" fill="#dde6f0"/>
  <!-- folded sky on top -->
  <rect x="0" y="0" width="${W}" height="180" fill="#3a8eff"/>
  <!-- bottom row of buildings (normal) -->
  ${Array.from({ length: 8 }, (_, i) => {
    const h = 80 + (i % 3) * 30;
    return `<rect x="${i * 60}" y="${280 - h}" width="50" height="${h}" fill="#666" stroke="#000" stroke-width="2"/>
            ${Array.from({ length: 4 }, (_, j) =>
              `<rect x="${i * 60 + 6 + (j % 2) * 22}" y="${280 - h + 10 + Math.floor(j / 2) * 18}" width="14" height="10" fill="#ff0"/>`
            ).join('')}`;
  }).join('')}
  <!-- street -->
  <rect x="0" y="280" width="${W}" height="40" fill="#444"/>
  <line x1="0" y1="300" x2="${W}" y2="300" stroke="#ff0" stroke-dasharray="20 10" stroke-width="3"/>
  <!-- folded buildings hanging from sky -->
  ${Array.from({ length: 8 }, (_, i) => {
    const h = 60 + (i % 3) * 30;
    return `<rect x="${i * 60}" y="0" width="50" height="${h}" fill="#666" stroke="#000" stroke-width="2"/>
            ${Array.from({ length: 4 }, (_, j) =>
              `<rect x="${i * 60 + 6 + (j % 2) * 22}" y="${10 + Math.floor(j / 2) * 18}" width="14" height="10" fill="#ff0"/>`
            ).join('')}`;
  }).join('')}
  <!-- spinning top -->
  <polygon points="240,210 220,170 260,170" fill="#cfa050" stroke="#000" stroke-width="3"/>
  <ellipse cx="240" cy="170" rx="20" ry="6" fill="#cfa050" stroke="#000" stroke-width="2"/>
  <line x1="240" y1="170" x2="240" y2="140" stroke="#000" stroke-width="3"/>
  <path d="M212 230 Q 240 200 268 230" fill="none" stroke="#000" stroke-dasharray="3 3" stroke-width="2"/>
  ${cap('CITY FOLDS UP. WHY?')}
`,

// 8. FORREST GUMP — bench, suitcase, feather floating down
8: () => `
  <rect width="${W}" height="220" fill="#cfe6ff"/>
  <rect x="0" y="220" width="${W}" height="${H - 220}" fill="#7ac56a"/>
  <!-- bench -->
  <rect x="60" y="250" width="360" height="14" fill="#a05a2a" stroke="#000" stroke-width="3"/>
  <rect x="60" y="220" width="360" height="6" fill="#a05a2a" stroke="#000" stroke-width="3"/>
  <line x1="80" y1="220" x2="80" y2="290" stroke="#000" stroke-width="3"/>
  <line x1="400" y1="220" x2="400" y2="290" stroke="#000" stroke-width="3"/>
  <!-- forrest sitting -->
  <circle cx="240" cy="200" r="16" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
  <!-- short hair -->
  <path d="M226 196 Q 240 178 254 196 Z" fill="#7a4a1a"/>
  <!-- white shirt body -->
  <rect x="222" y="216" width="36" height="40" fill="#fff" stroke="#000" stroke-width="3"/>
  <!-- tie -->
  <polygon points="236,216 244,216 246,250 234,250" fill="#a00"/>
  <!-- arms holding box -->
  <line x1="222" y1="226" x2="200" y2="246" stroke="#ffe0c0" stroke-width="6"/>
  <line x1="258" y1="226" x2="280" y2="246" stroke="#ffe0c0" stroke-width="6"/>
  <!-- box -->
  <rect x="200" y="246" width="80" height="20" fill="#7a3a1a" stroke="#000" stroke-width="3"/>
  <line x1="200" y1="256" x2="280" y2="256" stroke="#ffd" stroke-width="2"/>
  <text x="240" y="262" text-anchor="middle" font-size="8" fill="#fff">CHOCOLATES</text>
  <!-- legs hang -->
  <line x1="232" y1="256" x2="220" y2="290" stroke="#3a3a8a" stroke-width="6"/>
  <line x1="248" y1="256" x2="260" y2="290" stroke="#3a3a8a" stroke-width="6"/>
  <!-- shoes -->
  <ellipse cx="218" cy="295" rx="10" ry="4" fill="#fff" stroke="#000" stroke-width="2"/>
  <ellipse cx="262" cy="295" rx="10" ry="4" fill="#fff" stroke="#000" stroke-width="2"/>
  <!-- suitcase -->
  <rect x="320" y="218" width="50" height="36" fill="#a05a3a" stroke="#000" stroke-width="3"/>
  <rect x="338" y="210" width="14" height="10" fill="#a05a3a" stroke="#000" stroke-width="2"/>
  <!-- feather -->
  <g transform="translate(120 80)">
    <path d="M0 0 Q 20 20 10 60 Q 5 40 -20 30 Q 5 30 10 10" fill="#fff" stroke="#000" stroke-width="2"/>
    <line x1="10" y1="60" x2="20" y2="100" stroke="#000" stroke-width="2"/>
  </g>
  ${cap('LIFE = CHOCOLATE BOX')}
`,

// 9. SHAWSHANK — arms wide, rain, freedom
9: () => `
  <rect width="${W}" height="${H}" fill="#0a1830"/>
  <!-- lightning -->
  <polyline points="100,0 130,80 110,90 150,180" fill="none" stroke="#ff0" stroke-width="3"/>
  <!-- rain -->
  ${Array.from({ length: 60 }, () => {
    const x = Math.random() * W, y = Math.random() * H;
    return `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x - 8).toFixed(0)}" y2="${(y + 24).toFixed(0)}" stroke="#aef" stroke-width="2"/>`;
  }).join('')}
  <!-- ground/water -->
  <rect x="0" y="280" width="${W}" height="80" fill="#1a2a40"/>
  <!-- man arms-up shouting -->
  <g>
    <circle cx="240" cy="120" r="20" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <!-- open mouth -->
    <ellipse cx="240" cy="128" rx="6" ry="8" fill="#000"/>
    <!-- arms straight up -->
    <line x1="222" y1="138" x2="180" y2="60" stroke="#000" stroke-width="6"/>
    <line x1="258" y1="138" x2="300" y2="60" stroke="#000" stroke-width="6"/>
    <!-- bare torso -->
    <polygon points="222,138 258,138 280,260 200,260" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <!-- legs -->
    <line x1="220" y1="260" x2="200" y2="320" stroke="#000" stroke-width="8"/>
    <line x1="260" y1="260" x2="280" y2="320" stroke="#000" stroke-width="8"/>
  </g>
  ${cap('FREEEEDOM!! (rain + 19 yrs)', W / 2, 30, '#fff').replace(/<rect[^/]*\/>/, '<rect x="60" y="14" width="360" height="22" fill="#000" stroke="#fff" stroke-width="2"/>')}
`,

// 10. GODFATHER — backlit don in chair stroking cat
10: () => `
  <rect width="${W}" height="${H}" fill="#1a0a0a"/>
  <!-- desk lamp glow -->
  <radialGradient id="g10"><stop offset="0%" stop-color="#ffe066"/><stop offset="100%" stop-color="#1a0a0a"/></radialGradient>
  <ellipse cx="240" cy="200" rx="200" ry="150" fill="url(#g10)" opacity="0.6"/>
  <!-- chair back -->
  <rect x="160" y="120" width="160" height="240" fill="#2a1010" stroke="#000" stroke-width="3"/>
  <!-- head silhouette -->
  <circle cx="240" cy="160" r="30" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
  <!-- slicked hair -->
  <path d="M212 156 Q 240 130 268 156 L 264 142 L 240 138 L 216 142 Z" fill="#000"/>
  <!-- mustache + sad mouth -->
  <line x1="226" y1="170" x2="254" y2="170" stroke="#000" stroke-width="3"/>
  <path d="M228 178 Q 240 184 252 178" fill="none" stroke="#000" stroke-width="2"/>
  <!-- jowls/squint eyes -->
  <line x1="226" y1="160" x2="234" y2="160" stroke="#000" stroke-width="3"/>
  <line x1="246" y1="160" x2="254" y2="160" stroke="#000" stroke-width="3"/>
  <!-- suit -->
  <polygon points="200,190 280,190 320,360 160,360" fill="#1a1a1a" stroke="#fff" stroke-width="2"/>
  <polygon points="232,190 248,190 240,210" fill="#fff"/>
  <line x1="240" y1="210" x2="240" y2="360" stroke="#fff" stroke-width="1"/>
  <!-- red rose lapel -->
  <circle cx="220" cy="220" r="6" fill="#a00"/>
  <!-- cat curled on arm -->
  <ellipse cx="200" cy="280" rx="30" ry="14" fill="#ddd" stroke="#000" stroke-width="2"/>
  <circle cx="172" cy="276" r="14" fill="#ddd" stroke="#000" stroke-width="2"/>
  <polygon points="162,266 168,272 172,262" fill="#ddd" stroke="#000" stroke-width="2"/>
  <polygon points="180,266 174,272 184,262" fill="#ddd" stroke="#000" stroke-width="2"/>
  <line x1="166" y1="276" x2="160" y2="277" stroke="#000"/>
  <line x1="178" y1="276" x2="184" y2="277" stroke="#000"/>
  <line x1="166" y1="278" x2="160" y2="280" stroke="#000"/>
  <!-- petting hand -->
  <line x1="240" y1="240" x2="200" y2="270" stroke="#ffe0c0" stroke-width="8"/>
  ${cap('AN OFFER YOU CANT REFUSE', W / 2, H - 18, '#000').replace('fill="#000"', 'fill="#ffd700"').replace(/<rect[^/]*\/>/, '<rect x="60" y="' + (H - 34) + '" width="360" height="22" fill="#000" stroke="#ffd700" stroke-width="2"/>')}
`,

// 11. LION KING — Pride Rock cliff, baboon holding cub up at sun
11: () => `
  <defs><linearGradient id="g11" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ff7e3d"/><stop offset="100%" stop-color="#ffce63"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g11)"/>
  <!-- sun -->
  <circle cx="240" cy="180" r="100" fill="#ffe066"/>
  <circle cx="240" cy="180" r="60" fill="#ffeb33"/>
  <!-- pride rock cliff jutting right -->
  <polygon points="0,360 0,260 80,240 200,260 320,290 480,330 480,360" fill="#3a1a0a" stroke="#000" stroke-width="3"/>
  <polygon points="160,260 320,290 320,360 160,360" fill="#5a2a10" stroke="#000" stroke-width="3"/>
  <!-- baboon (Rafiki) at cliff edge -->
  <ellipse cx="220" cy="240" rx="14" ry="22" fill="#5a3a2a" stroke="#000" stroke-width="3"/>
  <!-- baboon head -->
  <circle cx="220" cy="216" r="12" fill="#ffd" stroke="#000" stroke-width="2"/>
  <ellipse cx="220" cy="220" rx="6" ry="8" fill="#a55" stroke="#000" stroke-width="1"/>
  <circle cx="216" cy="216" r="1.5" fill="#000"/>
  <circle cx="224" cy="216" r="1.5" fill="#000"/>
  <!-- two arms holding cub up -->
  <line x1="210" y1="226" x2="195" y2="180" stroke="#5a3a2a" stroke-width="6"/>
  <line x1="230" y1="226" x2="245" y2="180" stroke="#5a3a2a" stroke-width="6"/>
  <!-- cub silhouette held aloft -->
  <ellipse cx="220" cy="160" rx="22" ry="14" fill="#e8a05a" stroke="#000" stroke-width="3"/>
  <circle cx="220" cy="148" r="14" fill="#e8a05a" stroke="#000" stroke-width="3"/>
  <polygon points="208,138 212,144 218,134" fill="#e8a05a" stroke="#000" stroke-width="2"/>
  <polygon points="232,138 228,144 222,134" fill="#e8a05a" stroke="#000" stroke-width="2"/>
  <circle cx="216" cy="148" r="1.5" fill="#000"/>
  <circle cx="224" cy="148" r="1.5" fill="#000"/>
  <ellipse cx="220" cy="153" rx="2" ry="1.5" fill="#000"/>
  <!-- staff with fruit -->
  <line x1="240" y1="226" x2="265" y2="270" stroke="#7a3a1a" stroke-width="3"/>
  <circle cx="263" cy="266" r="3" fill="#a00"/>
  ${cap('BABY UP HIGH = PRINCE')}
`,

// 12. FROZEN — Elsa shooting ice, blue dress, snow castle
12: () => `
  <defs><linearGradient id="g12" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#9be0ff"/><stop offset="100%" stop-color="#ddf2ff"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g12)"/>
  <!-- snowflakes -->
  ${Array.from({ length: 24 }, () => {
    const x = Math.random() * W, y = Math.random() * H;
    return `<text x="${x.toFixed(0)}" y="${y.toFixed(0)}" font-size="14" fill="#fff">*</text>`;
  }).join('')}
  <!-- castle far -->
  <polygon points="320,260 320,160 340,160 340,140 360,140 360,160 380,160 380,120 400,120 400,160 420,160 420,140 440,140 440,260" fill="#cfeaff" stroke="#3aa" stroke-width="3"/>
  <!-- ground snow -->
  <path d="M0 300 Q 80 290 160 300 T 320 300 T 480 300 V 360 H 0 Z" fill="#fff" stroke="#000" stroke-width="3"/>
  <!-- Elsa: long blond hair, blue dress, arm out shooting ice -->
  <g>
    <!-- hair flowing -->
    <path d="M120 160 Q 80 220 70 280 Q 110 260 120 220 Z" fill="#fff7c0" stroke="#000" stroke-width="2"/>
    <!-- head -->
    <circle cx="140" cy="160" r="18" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <!-- eyes + smirk -->
    <circle cx="134" cy="160" r="2" fill="#000"/>
    <circle cx="146" cy="160" r="2" fill="#000"/>
    <path d="M134 170 Q 140 174 146 170" fill="none" stroke="#000" stroke-width="2"/>
    <!-- bun on top -->
    <circle cx="138" cy="142" r="6" fill="#fff7c0" stroke="#000" stroke-width="2"/>
    <!-- body+dress -->
    <line x1="140" y1="178" x2="140" y2="210" stroke="#000" stroke-width="3"/>
    <polygon points="120,210 160,210 200,300 80,300" fill="#7ac8ff" stroke="#000" stroke-width="3"/>
    <!-- glittery dress lines -->
    <line x1="125" y1="240" x2="195" y2="240" stroke="#fff" stroke-width="1" opacity="0.6"/>
    <line x1="115" y1="270" x2="205" y2="270" stroke="#fff" stroke-width="1" opacity="0.6"/>
    <!-- arm out shooting -->
    <line x1="140" y1="200" x2="240" y2="180" stroke="#ffe0c0" stroke-width="6"/>
    <!-- ice blast -->
    <g fill="#7ac8ff" stroke="#000" stroke-width="1">
      <polygon points="240,180 280,160 270,180 290,180 280,200"/>
      <polygon points="290,170 320,150 310,170 330,170 320,190"/>
      <polygon points="330,160 360,140 350,160 370,160 360,180"/>
    </g>
    <!-- left arm down -->
    <line x1="140" y1="200" x2="115" y2="225" stroke="#ffe0c0" stroke-width="6"/>
  </g>
  ${cap('LET IT GOOOO!')}
`,

// 13. BACK TO THE FUTURE — DeLorean leaving fire trails
13: () => `
  <rect width="${W}" height="${H}" fill="#0a0a2a"/>
  <!-- street -->
  <rect x="0" y="280" width="${W}" height="80" fill="#3a3a3a"/>
  <line x1="0" y1="320" x2="60" y2="320" stroke="#ff0" stroke-width="4"/>
  <line x1="120" y1="320" x2="180" y2="320" stroke="#ff0" stroke-width="4"/>
  <line x1="240" y1="320" x2="300" y2="320" stroke="#ff0" stroke-width="4"/>
  <line x1="360" y1="320" x2="420" y2="320" stroke="#ff0" stroke-width="4"/>
  <!-- DeLorean shape: angular silver -->
  <polygon points="240,280 360,280 380,260 360,240 240,240" fill="#cfd8df" stroke="#000" stroke-width="3"/>
  <polygon points="260,240 350,240 360,225 270,225" fill="#9bb0c0" stroke="#000" stroke-width="3"/>
  <!-- gull-wing door open -->
  <polygon points="290,240 310,200 340,200 340,240" fill="#cfd8df" stroke="#000" stroke-width="3"/>
  <line x1="300" y1="240" x2="320" y2="200" stroke="#666" stroke-width="2"/>
  <!-- wheels -->
  <circle cx="270" cy="290" r="14" fill="#000"/>
  <circle cx="350" cy="290" r="14" fill="#000"/>
  <!-- license plate -->
  <rect x="345" y="265" width="30" height="8" fill="#fff" stroke="#000" stroke-width="1"/>
  <text x="360" y="272" text-anchor="middle" font-size="6">OUTATIME</text>
  <!-- fire trails -->
  <polygon points="240,260 100,250 130,265 60,270 140,275 80,290 240,280" fill="#ff5500" stroke="#f00" stroke-width="2"/>
  <polygon points="240,275 80,280 130,290 60,295 140,300 100,310 240,290" fill="#ff0" stroke="#f00" stroke-width="2"/>
  <!-- lightning -->
  <polyline points="120,80 140,140 110,150 150,200 130,210 170,260" fill="none" stroke="#0ff" stroke-width="3"/>
  ${cap('88 MPH = ZAP TIME')}
`,

// 14. TERMINATOR — naked T-800 arriving in lightning crouch
14: () => `
  <rect width="${W}" height="${H}" fill="#000"/>
  <!-- electric ball/circle of light -->
  <circle cx="240" cy="220" r="120" fill="#0a0a3a"/>
  <circle cx="240" cy="220" r="100" fill="#1a1a8a"/>
  <circle cx="240" cy="220" r="60" fill="#3a3aff" opacity="0.7"/>
  <!-- lightning bolts -->
  <polyline points="180,140 200,180 170,180 200,220" fill="none" stroke="#fff" stroke-width="3"/>
  <polyline points="300,140 280,180 310,180 280,220" fill="none" stroke="#fff" stroke-width="3"/>
  <polyline points="160,260 190,250 170,290 200,300" fill="none" stroke="#fff" stroke-width="3"/>
  <polyline points="320,260 290,250 310,290 280,300" fill="none" stroke="#fff" stroke-width="3"/>
  <!-- crouching muscular figure -->
  <g>
    <!-- big head -->
    <circle cx="240" cy="170" r="22" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <!-- shades -->
    <rect x="220" y="166" width="40" height="8" fill="#000"/>
    <!-- frowning mouth -->
    <line x1="228" y1="184" x2="252" y2="184" stroke="#000" stroke-width="3"/>
    <!-- huge bicep arms hanging down -->
    <ellipse cx="208" cy="220" rx="18" ry="28" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <ellipse cx="272" cy="220" rx="18" ry="28" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <!-- huge chest -->
    <polygon points="208,200 272,200 280,260 200,260" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <!-- crouch legs (one knee down) -->
    <line x1="216" y1="260" x2="200" y2="300" stroke="#ffe0c0" stroke-width="14"/>
    <line x1="264" y1="260" x2="280" y2="300" stroke="#ffe0c0" stroke-width="14"/>
    <!-- ground -->
    <ellipse cx="240" cy="305" rx="80" ry="6" fill="#000"/>
  </g>
  ${cap('I WILL RETURN', W / 2, 30, '#fff').replace(/<rect[^/]*\/>/, '<rect x="160" y="14" width="160" height="22" fill="#000" stroke="#fff" stroke-width="2"/>')}
`,

// 15. JOKER — stairs dance
15: () => `
  <rect width="${W}" height="${H}" fill="#3a1a3a"/>
  <!-- stairs going up-right -->
  ${Array.from({ length: 9 }, (_, i) => {
    const x = i * 50;
    const y = 320 - i * 30;
    return `<polygon points="${x},${y} ${x + 60},${y} ${x + 60},${y + 20} ${x},${y + 20}" fill="#aa9a6a" stroke="#000" stroke-width="2"/>
            <polygon points="${x},${y + 20} ${x + 60},${y + 20} ${x + 70},${y + 50} ${x + 10},${y + 50}" fill="#7a6a3a" stroke="#000" stroke-width="2"/>`;
  }).join('')}
  <!-- joker mid-dance -->
  <g transform="translate(220 200)">
    <!-- head -->
    <circle cx="0" cy="0" r="20" fill="#e8f8e8" stroke="#000" stroke-width="3"/>
    <!-- green hair -->
    <path d="M-18 -4 Q -16 -28 0 -22 Q 16 -28 18 -4 Q 8 -14 0 -14 Q -8 -14 -18 -4" fill="#0a0" stroke="#000" stroke-width="2"/>
    <!-- white face paint accent: eye triangles -->
    <polygon points="-10,-2 -4,-8 -2,2" fill="#fff" stroke="#000" stroke-width="1"/>
    <polygon points="10,-2 4,-8 2,2" fill="#fff" stroke="#000" stroke-width="1"/>
    <circle cx="-7" cy="-3" r="1.5" fill="#000"/>
    <circle cx="7" cy="-3" r="1.5" fill="#000"/>
    <!-- huge red smile -->
    <path d="M-14 8 Q 0 24 14 8" fill="#a00" stroke="#000" stroke-width="2"/>
    <path d="M-14 8 L -22 16" stroke="#a00" stroke-width="3"/>
    <path d="M14 8 L 22 16" stroke="#a00" stroke-width="3"/>
    <!-- yellow vest + red suit -->
    <polygon points="-22,18 22,18 30,80 -30,80" fill="#a00" stroke="#000" stroke-width="3"/>
    <polygon points="-12,18 12,18 6,60 -6,60" fill="#ffd24a" stroke="#000" stroke-width="2"/>
    <!-- arms extended in dance pose -->
    <line x1="-22" y1="22" x2="-60" y2="-10" stroke="#a00" stroke-width="8"/>
    <line x1="22" y1="22" x2="60" y2="40" stroke="#a00" stroke-width="8"/>
    <!-- legs: one back, one bent forward (kicking) -->
    <line x1="-12" y1="80" x2="-30" y2="120" stroke="#a00" stroke-width="10"/>
    <line x1="12" y1="80" x2="40" y2="60" stroke="#a00" stroke-width="10"/>
    <!-- shoes -->
    <ellipse cx="-32" cy="124" rx="12" ry="4" fill="#000"/>
    <ellipse cx="44" cy="58" rx="10" ry="4" fill="#000"/>
  </g>
  ${cap('STAIR DANCE = SAD CLOWN', W / 2, H - 18, '#000').replace(/<rect[^/]*\/>/, '<rect x="80" y="' + (H - 34) + '" width="320" height="22" fill="#fff" stroke="#000" stroke-width="2"/>')}
`,

// 16. AVENGERS ENDGAME — purple giant + golden snap gauntlet
16: () => `
  <defs><radialGradient id="g16" cx="80%" cy="50%" r="60%"><stop offset="0%" stop-color="#fff"/><stop offset="40%" stop-color="#ffeb33"/><stop offset="100%" stop-color="#a00"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="#1a0a3a"/>
  <!-- destroyed ground -->
  <rect x="0" y="320" width="${W}" height="40" fill="#3a2a3a"/>
  <line x1="40" y1="330" x2="100" y2="335" stroke="#000" stroke-width="2"/>
  <line x1="120" y1="340" x2="200" y2="340" stroke="#000" stroke-width="2"/>
  <line x1="220" y1="335" x2="280" y2="345" stroke="#000" stroke-width="2"/>
  <!-- big snap energy on right -->
  <circle cx="380" cy="200" r="100" fill="url(#g16)" opacity="0.6"/>
  <!-- THANOS: purple, helmet, big chin -->
  <g>
    <!-- body -->
    <polygon points="160,180 280,180 310,320 130,320" fill="#9a5acf" stroke="#000" stroke-width="3"/>
    <!-- gold armor on chest -->
    <polygon points="180,200 260,200 270,250 170,250" fill="#ffce63" stroke="#000" stroke-width="2"/>
    <!-- arms -->
    <line x1="160" y1="200" x2="120" y2="260" stroke="#9a5acf" stroke-width="22"/>
    <line x1="280" y1="200" x2="380" y2="200" stroke="#9a5acf" stroke-width="26"/>
    <!-- big head with big chin -->
    <ellipse cx="220" cy="140" rx="40" ry="44" fill="#9a5acf" stroke="#000" stroke-width="3"/>
    <!-- chin lines -->
    <line x1="200" y1="160" x2="208" y2="180" stroke="#000" stroke-width="2"/>
    <line x1="220" y1="170" x2="220" y2="184" stroke="#000" stroke-width="2"/>
    <line x1="240" y1="160" x2="232" y2="180" stroke="#000" stroke-width="2"/>
    <!-- gold helmet -->
    <path d="M180 130 Q 220 90 260 130 L 260 100 L 180 100 Z" fill="#ffce63" stroke="#000" stroke-width="3"/>
    <!-- frown -->
    <line x1="200" y1="130" x2="212" y2="130" stroke="#000" stroke-width="3"/>
    <line x1="228" y1="130" x2="240" y2="130" stroke="#000" stroke-width="3"/>
    <path d="M205 154 Q 220 145 235 154" fill="none" stroke="#000" stroke-width="2"/>
  </g>
  <!-- INFINITY GAUNTLET on right hand -->
  <g transform="translate(380 200)">
    <ellipse cx="0" cy="0" rx="30" ry="38" fill="#ffce63" stroke="#000" stroke-width="3"/>
    <!-- thumb + index doing snap -->
    <ellipse cx="-22" cy="-10" rx="8" ry="14" fill="#ffce63" stroke="#000" stroke-width="2"/>
    <ellipse cx="20" cy="-20" rx="8" ry="20" fill="#ffce63" stroke="#000" stroke-width="2"/>
    <!-- 6 stones -->
    <circle cx="-8" cy="-22" r="4" fill="#a00"/>
    <circle cx="2" cy="-26" r="4" fill="#fa0"/>
    <circle cx="12" cy="-22" r="4" fill="#0a0"/>
    <circle cx="-12" cy="0" r="4" fill="#9af"/>
    <circle cx="0" cy="-2" r="4" fill="#90f"/>
    <circle cx="12" cy="0" r="4" fill="#ff0"/>
  </g>
  ${cap('?? SNAP ??', W / 2, H - 18, '#fff').replace(/<rect[^/]*\/>/, '<rect x="180" y="' + (H - 34) + '" width="120" height="22" fill="#000" stroke="#fff" stroke-width="2"/>')}
`,

// 17. PARASITE — big window, family looking at flooding house
17: () => `
  <rect width="${W}" height="${H}" fill="#0a1a2a"/>
  <!-- diagonal rain -->
  ${Array.from({ length: 50 }, () => {
    const x = Math.random() * W, y = Math.random() * H;
    return `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x - 12).toFixed(0)}" y2="${(y + 24).toFixed(0)}" stroke="#9be" stroke-width="1"/>`;
  }).join('')}
  <!-- modern house big square -->
  <rect x="60" y="80" width="360" height="220" fill="#222" stroke="#000" stroke-width="3"/>
  <!-- giant window -->
  <rect x="100" y="120" width="280" height="160" fill="#0a0a0a" stroke="#888" stroke-width="3"/>
  <!-- inside view: garden + storm sky -->
  <rect x="106" y="126" width="268" height="100" fill="#1a3a5a"/>
  <rect x="106" y="226" width="268" height="48" fill="#1a3a1a"/>
  <!-- 4 stick figures looking out -->
  ${[150, 200, 250, 300].map((x, i) => `
    <circle cx="${x}" cy="200" r="10" fill="#ffe0c0" stroke="#000" stroke-width="2"/>
    <line x1="${x}" y1="210" x2="${x}" y2="240" stroke="#000" stroke-width="2"/>
    <polygon points="${x - 12},240 ${x + 12},240 ${x + 14},274 ${x - 14},274" fill="${['#3a3','#a00','#3a3a8a','#fa0'][i]}" stroke="#000" stroke-width="2"/>
  `).join('')}
  <!-- raised ground line -->
  <line x1="60" y1="300" x2="420" y2="300" stroke="#000" stroke-width="3"/>
  ${cap('RICH HOUSE = NICE WINDOW')}
`,

// 18. GLADIATOR — colosseum + helmeted figure arms out, dust
18: () => `
  <defs><linearGradient id="g18" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#9b8c5c"/><stop offset="100%" stop-color="#d6a058"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g18)"/>
  <!-- crowd ring -->
  <ellipse cx="240" cy="100" rx="240" ry="80" fill="#3a2a1a" stroke="#000" stroke-width="3"/>
  <ellipse cx="240" cy="100" rx="220" ry="60" fill="#5a3a2a"/>
  <g fill="#000">
    ${Array.from({ length: 80 }, () => {
      const a = Math.random() * Math.PI * 2;
      const r = 200 + Math.random() * 18;
      const cx = 240 + Math.cos(a) * r;
      const cy = 100 + Math.sin(a) * r * 0.3;
      return `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="2"/>`;
    }).join('')}
  </g>
  <!-- arena floor -->
  <ellipse cx="240" cy="280" rx="200" ry="60" fill="#d8a050" stroke="#000" stroke-width="3"/>
  <!-- maximus center, arms wide, helmeted -->
  <g>
    <circle cx="240" cy="200" r="18" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <!-- helmet w/ plume -->
    <path d="M222 200 Q 240 168 258 200 L 258 184 L 222 184 Z" fill="#888" stroke="#000" stroke-width="3"/>
    <path d="M232 174 Q 240 150 248 174" fill="#a00" stroke="#000" stroke-width="2"/>
    <!-- nose guard -->
    <line x1="240" y1="190" x2="240" y2="208" stroke="#000" stroke-width="3"/>
    <!-- body armored -->
    <polygon points="220,222 260,222 268,290 212,290" fill="#888" stroke="#000" stroke-width="3"/>
    <line x1="220" y1="240" x2="260" y2="240" stroke="#000" stroke-width="2"/>
    <line x1="220" y1="260" x2="260" y2="260" stroke="#000" stroke-width="2"/>
    <!-- arms wide -->
    <line x1="220" y1="232" x2="160" y2="220" stroke="#ffe0c0" stroke-width="10"/>
    <line x1="260" y1="232" x2="320" y2="220" stroke="#ffe0c0" stroke-width="10"/>
    <!-- sword in right hand pointing down -->
    <line x1="320" y1="220" x2="350" y2="280" stroke="#bbb" stroke-width="6"/>
    <polygon points="316,216 326,216 326,224 316,224" fill="#a00"/>
  </g>
  <!-- dust -->
  <ellipse cx="200" cy="320" rx="60" ry="6" fill="#fff" opacity="0.5"/>
  ${cap('NOT ENTERTAINED?!')}
`,

// 19. TOY STORY — cowboy doll + spaceman doll falling with style
19: () => `
  <rect width="${W}" height="${H}" fill="#7accff"/>
  <!-- clouds -->
  <ellipse cx="100" cy="80" rx="50" ry="20" fill="#fff"/>
  <ellipse cx="380" cy="100" rx="60" ry="22" fill="#fff"/>
  <ellipse cx="240" cy="60" rx="40" ry="14" fill="#fff"/>
  <!-- cowboy doll (Woody) -->
  <g transform="translate(160 200)">
    <!-- hat -->
    <ellipse cx="0" cy="-30" rx="32" ry="6" fill="#a05a3a" stroke="#000" stroke-width="2"/>
    <path d="M-18 -30 Q 0 -56 18 -30 Z" fill="#a05a3a" stroke="#000" stroke-width="2"/>
    <line x1="-12" y1="-32" x2="12" y2="-32" stroke="#7a3a1a" stroke-width="2"/>
    <!-- head -->
    <circle cx="0" cy="-10" r="16" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <circle cx="-5" cy="-12" r="2" fill="#000"/>
    <circle cx="5" cy="-12" r="2" fill="#000"/>
    <path d="M-6 -2 Q 0 4 6 -2" fill="none" stroke="#000" stroke-width="2"/>
    <!-- yellow checked shirt -->
    <rect x="-22" y="6" width="44" height="40" fill="#ffd24a" stroke="#000" stroke-width="3"/>
    <line x1="-22" y1="20" x2="22" y2="20" stroke="#a07a1a"/>
    <line x1="-22" y1="32" x2="22" y2="32" stroke="#a07a1a"/>
    <line x1="-8" y1="6" x2="-8" y2="46" stroke="#a07a1a"/>
    <line x1="8" y1="6" x2="8" y2="46" stroke="#a07a1a"/>
    <!-- vest cow print -->
    <polygon points="-22,6 -8,6 -8,46 -22,46" fill="#fff" stroke="#000" stroke-width="2"/>
    <ellipse cx="-15" cy="20" rx="3" ry="2" fill="#000"/>
    <ellipse cx="-12" cy="38" rx="4" ry="2" fill="#000"/>
    <polygon points="22,6 8,6 8,46 22,46" fill="#fff" stroke="#000" stroke-width="2"/>
    <ellipse cx="15" cy="22" rx="3" ry="2" fill="#000"/>
    <ellipse cx="14" cy="40" rx="4" ry="2" fill="#000"/>
    <!-- jeans legs -->
    <rect x="-22" y="46" width="20" height="26" fill="#3a5acf" stroke="#000" stroke-width="2"/>
    <rect x="2" y="46" width="20" height="26" fill="#3a5acf" stroke="#000" stroke-width="2"/>
    <!-- arms out flying -->
    <line x1="-22" y1="20" x2="-50" y2="0" stroke="#ffe0c0" stroke-width="6"/>
    <line x1="22" y1="20" x2="50" y2="0" stroke="#ffe0c0" stroke-width="6"/>
  </g>
  <!-- spaceman doll (Buzz) -->
  <g transform="translate(330 220)">
    <!-- helmet bubble -->
    <circle cx="0" cy="-10" r="22" fill="#fff" opacity="0.4" stroke="#000" stroke-width="3"/>
    <ellipse cx="-3" cy="-15" rx="6" ry="3" fill="#fff" opacity="0.8"/>
    <!-- face inside -->
    <circle cx="0" cy="-8" r="14" fill="#ffe0c0" stroke="#000" stroke-width="2"/>
    <circle cx="-5" cy="-10" r="2" fill="#000"/>
    <circle cx="5" cy="-10" r="2" fill="#000"/>
    <!-- jaw chin -->
    <line x1="-6" y1="-2" x2="6" y2="-2" stroke="#000" stroke-width="2"/>
    <!-- white body -->
    <rect x="-20" y="14" width="40" height="40" fill="#fff" stroke="#000" stroke-width="3"/>
    <!-- purple chest panel + buttons -->
    <rect x="-14" y="22" width="28" height="20" fill="#9a5acf" stroke="#000" stroke-width="2"/>
    <circle cx="-6" cy="32" r="2" fill="#ff0"/>
    <circle cx="0" cy="32" r="2" fill="#0f0"/>
    <circle cx="6" cy="32" r="2" fill="#a00"/>
    <!-- wings open -->
    <polygon points="-20,14 -50,8 -50,42 -20,38" fill="#aaa" stroke="#000" stroke-width="3"/>
    <polygon points="20,14 50,8 50,42 20,38" fill="#aaa" stroke="#000" stroke-width="3"/>
    <line x1="-50" y1="25" x2="-20" y2="25" stroke="#000" stroke-width="1"/>
    <line x1="50" y1="25" x2="20" y2="25" stroke="#000" stroke-width="1"/>
    <!-- legs green -->
    <rect x="-20" y="54" width="18" height="20" fill="#3a8" stroke="#000" stroke-width="2"/>
    <rect x="2" y="54" width="18" height="20" fill="#3a8" stroke="#000" stroke-width="2"/>
  </g>
  ${cap('TO INFINITY!! (and beyond)')}
`,

// 20. LA LA LAND — couple dancing in starry observatory dome
20: () => `
  <defs><radialGradient id="g20" cx="50%" cy="100%" r="120%"><stop offset="0%" stop-color="#5a2a8a"/><stop offset="100%" stop-color="#0a0a3a"/></radialGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g20)"/>
  <!-- planetarium dome edge -->
  <path d="M0 360 A 240 200 0 0 1 480 360 Z" fill="none" stroke="#fff" stroke-width="2" opacity="0.4"/>
  <!-- stars + planets -->
  ${Array.from({ length: 60 }, () => {
    const x = Math.random() * W, y = Math.random() * 280;
    const r = (Math.random() * 1.5 + 0.5).toFixed(1);
    return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r}" fill="#fff"/>`;
  }).join('')}
  <ellipse cx="100" cy="80" rx="14" ry="4" fill="none" stroke="#a87a3a" stroke-width="1"/>
  <circle cx="100" cy="80" r="8" fill="#e6c894"/>
  <!-- dancing couple, feet not on ground -->
  <g transform="translate(220 200)">
    <!-- her: yellow dress -->
    <circle cx="0" cy="-10" r="14" fill="#ffe0c0" stroke="#000" stroke-width="2"/>
    <path d="M-12 -16 Q -16 -30 0 -28 Q 16 -30 12 -16" fill="#7a3a1a"/>
    <polygon points="-14,4 14,4 26,80 -26,80" fill="#ffd24a" stroke="#000" stroke-width="2"/>
    <line x1="-26" y1="80" x2="-30" y2="100" stroke="#ffe0c0" stroke-width="4"/>
    <line x1="26" y1="80" x2="30" y2="100" stroke="#ffe0c0" stroke-width="4"/>
    <!-- her right arm on his shoulder -->
    <line x1="14" y1="6" x2="60" y2="-10" stroke="#ffe0c0" stroke-width="6"/>
  </g>
  <g transform="translate(280 200)">
    <!-- him -->
    <circle cx="0" cy="-10" r="14" fill="#ffe0c0" stroke="#000" stroke-width="2"/>
    <path d="M-12 -18 Q 0 -28 12 -18" fill="#3a2010"/>
    <polygon points="-16,4 16,4 14,80 -14,80" fill="#1a1a3a" stroke="#000" stroke-width="2"/>
    <!-- white shirt + tie -->
    <polygon points="-6,4 6,4 4,40 -4,40" fill="#fff"/>
    <polygon points="-3,4 3,4 4,30 -4,30" fill="#a00"/>
    <line x1="-14" y1="80" x2="-18" y2="100" stroke="#1a1a3a" stroke-width="6"/>
    <line x1="14" y1="80" x2="18" y2="100" stroke="#1a1a3a" stroke-width="6"/>
    <!-- his left arm on her waist -->
    <line x1="-16" y1="20" x2="-50" y2="20" stroke="#1a1a3a" stroke-width="6"/>
    <!-- his right arm holding hers up -->
    <line x1="16" y1="6" x2="60" y2="-30" stroke="#1a1a3a" stroke-width="6"/>
  </g>
  <!-- linked hands up -->
  <line x1="280" y1="160" x2="290" y2="155" stroke="#000" stroke-width="3"/>
  ${cap('CITY OF STARS', W / 2, 30, '#ffd24a').replace(/<rect[^/]*\/>/, '<rect x="160" y="14" width="160" height="22" fill="#000" stroke="#ffd24a" stroke-width="2"/>')}
`,

// 21. INTERSTELLAR — giant tidal wave dwarfing tiny astronaut
21: () => `
  <defs><linearGradient id="g21" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6abfd9"/><stop offset="100%" stop-color="#2a4a6a"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g21)"/>
  <!-- wave: huge curl -->
  <path d="M0 360 L 0 80 Q 80 40 160 80 Q 240 130 280 80 Q 320 40 340 90 Q 360 140 350 200 Q 320 220 290 180 Q 280 200 290 240 L 380 240 L 380 360 Z" fill="#3a8eff" stroke="#000" stroke-width="4"/>
  <!-- foam highlights -->
  <path d="M120 70 Q 160 50 200 70" fill="none" stroke="#fff" stroke-width="3"/>
  <path d="M260 70 Q 290 60 320 80" fill="none" stroke="#fff" stroke-width="3"/>
  <!-- spray -->
  <g fill="#fff">
    <circle cx="200" cy="60" r="2"/><circle cx="220" cy="50" r="3"/><circle cx="240" cy="55" r="2"/>
    <circle cx="270" cy="50" r="2"/><circle cx="300" cy="60" r="3"/>
  </g>
  <!-- tiny astronaut on water -->
  <g transform="translate(420 280)">
    <circle cx="0" cy="0" r="6" fill="#fff" stroke="#000" stroke-width="2"/>
    <line x1="0" y1="6" x2="0" y2="14" stroke="#000" stroke-width="2"/>
    <line x1="-4" y1="10" x2="-8" y2="14" stroke="#000" stroke-width="2"/>
    <line x1="4" y1="10" x2="8" y2="14" stroke="#000" stroke-width="2"/>
    <line x1="0" y1="14" x2="-3" y2="22" stroke="#000" stroke-width="2"/>
    <line x1="0" y1="14" x2="3" y2="22" stroke="#000" stroke-width="2"/>
    <text x="-12" y="-6" font-size="10" fill="#fff">!!!</text>
  </g>
  <!-- tiny ship -->
  <ellipse cx="430" cy="320" rx="20" ry="6" fill="#888" stroke="#000" stroke-width="2"/>
  ${cap('JUST A WAVE. SLIGHTLY BIG.')}
`,

// 22. PIRATES — Jack on tiny half-sunk mast pose
22: () => `
  <defs><linearGradient id="g22" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#ffce63"/><stop offset="100%" stop-color="#6abfd9"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g22)"/>
  <!-- water -->
  <path d="M0 280 Q 60 270 120 280 T 240 280 T 360 280 T 480 280 V 360 H 0 Z" fill="#3a8eff" stroke="#000" stroke-width="3"/>
  <!-- tiny sinking ship — only mast + crow's nest above water -->
  <line x1="240" y1="100" x2="240" y2="290" stroke="#5a3a1a" stroke-width="6"/>
  <rect x="225" y="180" width="30" height="20" fill="#5a3a1a" stroke="#000" stroke-width="2"/>
  <line x1="200" y1="160" x2="280" y2="160" stroke="#5a3a1a" stroke-width="3"/>
  <!-- ragged sail -->
  <polygon points="200,160 220,200 240,180 260,200 280,160" fill="#f8e8c0" stroke="#000" stroke-width="2"/>
  <!-- jack standing on yardarm in dramatic pose -->
  <g transform="translate(240 150)">
    <!-- tricorn hat -->
    <ellipse cx="0" cy="-20" rx="16" ry="4" fill="#000"/>
    <path d="M-12 -20 Q 0 -36 12 -20 Z" fill="#000" stroke="#000" stroke-width="2"/>
    <!-- bandana under hat -->
    <path d="M-12 -16 Q 0 -10 12 -16 L 14 -8 L -14 -8 Z" fill="#a00"/>
    <!-- head -->
    <circle cx="0" cy="-2" r="10" fill="#ffe0c0" stroke="#000" stroke-width="2"/>
    <!-- dreads/beard -->
    <line x1="-8" y1="0" x2="-12" y2="14" stroke="#3a2010" stroke-width="3"/>
    <line x1="-4" y1="4" x2="-6" y2="16" stroke="#3a2010" stroke-width="3"/>
    <line x1="2" y1="6" x2="4" y2="20" stroke="#3a2010" stroke-width="3"/>
    <line x1="6" y1="2" x2="10" y2="14" stroke="#3a2010" stroke-width="3"/>
    <!-- eyes squint -->
    <circle cx="-3" cy="-3" r="1" fill="#000"/>
    <circle cx="3" cy="-3" r="1" fill="#000"/>
    <line x1="-6" y1="-5" x2="-1" y2="-3" stroke="#000" stroke-width="1"/>
    <line x1="6" y1="-5" x2="1" y2="-3" stroke="#000" stroke-width="1"/>
    <!-- crooked smile -->
    <path d="M-4 4 Q 0 8 6 4" fill="none" stroke="#000" stroke-width="1"/>
    <!-- coat -->
    <polygon points="-12,8 12,8 18,40 -18,40" fill="#5a2a1a" stroke="#000" stroke-width="2"/>
    <line x1="0" y1="8" x2="0" y2="40" stroke="#fff" stroke-width="1"/>
    <!-- arms one up dramatic -->
    <line x1="-12" y1="14" x2="-30" y2="-10" stroke="#5a2a1a" stroke-width="6"/>
    <line x1="12" y1="14" x2="20" y2="40" stroke="#5a2a1a" stroke-width="6"/>
    <!-- sword in right hand -->
    <line x1="-30" y1="-10" x2="-40" y2="-30" stroke="#bbb" stroke-width="3"/>
  </g>
  ${cap('WHY IS THE RUM GONE?')}
`,

// 23. NOTEBOOK — boat, kissing in rain
23: () => `
  <rect width="${W}" height="${H}" fill="#5a7a8a"/>
  <!-- rain -->
  ${Array.from({ length: 60 }, () => {
    const x = Math.random() * W, y = Math.random() * H;
    return `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x - 8).toFixed(0)}" y2="${(y + 18).toFixed(0)}" stroke="#fff" stroke-width="1.5"/>`;
  }).join('')}
  <!-- water with ripples -->
  <rect x="0" y="240" width="${W}" height="120" fill="#2a4a6a"/>
  ${Array.from({ length: 8 }, (_, i) => {
    const cx = 60 + i * 60;
    return `<ellipse cx="${cx}" cy="280" rx="14" ry="3" fill="none" stroke="#fff" stroke-width="1"/>`;
  }).join('')}
  <!-- rowboat -->
  <path d="M120 240 L 360 240 L 340 290 L 140 290 Z" fill="#7a4a2a" stroke="#000" stroke-width="3"/>
  <line x1="180" y1="260" x2="180" y2="285" stroke="#5a2a1a" stroke-width="2"/>
  <line x1="300" y1="260" x2="300" y2="285" stroke="#5a2a1a" stroke-width="2"/>
  <!-- two heads kissing in profile -->
  <g transform="translate(240 180)">
    <!-- her hair right -->
    <path d="M14 -8 Q 30 0 28 30 Q 18 36 14 30 Z" fill="#7a3a1a"/>
    <circle cx="14" cy="0" r="14" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <line x1="22" y1="0" x2="26" y2="0" stroke="#000" stroke-width="1"/>
    <!-- his hair left -->
    <path d="M-14 -8 Q -28 -8 -28 12 L -16 12 Z" fill="#3a2010"/>
    <circle cx="-14" cy="0" r="14" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <line x1="-22" y1="0" x2="-26" y2="0" stroke="#000" stroke-width="1"/>
    <!-- lips overlap -->
    <ellipse cx="0" cy="2" rx="6" ry="3" fill="#a00"/>
    <!-- arms wrapping -->
    <path d="M-25 14 Q -10 30 14 14" fill="none" stroke="#000" stroke-width="3"/>
    <!-- bodies -->
    <polygon points="-26,14 -2,14 -8,60 -36,60" fill="#3a3a3a"/>
    <polygon points="2,14 26,14 36,60 8,60" fill="#a05050"/>
  </g>
  ${cap('KISS + RAIN = MOVIE', W / 2, 30, '#fff').replace(/<rect[^/]*\/>/, '<rect x="100" y="14" width="280" height="22" fill="#000" stroke="#fff" stroke-width="2"/>')}
`,

// 24. SILENCE OF THE LAMBS — masked face, bars
24: () => `
  <rect width="${W}" height="${H}" fill="#1a1a1a"/>
  <!-- giant face -->
  <circle cx="240" cy="180" r="120" fill="#ffe0c0" stroke="#fff" stroke-width="4"/>
  <!-- slicked hair -->
  <path d="M120 160 Q 150 100 240 100 Q 330 100 360 160 L 360 180 L 120 180 Z" fill="#5a3a1a"/>
  <!-- eyes wide intense -->
  <ellipse cx="200" cy="170" rx="14" ry="10" fill="#fff"/>
  <ellipse cx="280" cy="170" rx="14" ry="10" fill="#fff"/>
  <circle cx="200" cy="170" r="6" fill="#3aa"/>
  <circle cx="280" cy="170" r="6" fill="#3aa"/>
  <circle cx="200" cy="170" r="3" fill="#000"/>
  <circle cx="280" cy="170" r="3" fill="#000"/>
  <!-- eyebrows -->
  <line x1="184" y1="156" x2="218" y2="160" stroke="#000" stroke-width="3"/>
  <line x1="262" y1="160" x2="296" y2="156" stroke="#000" stroke-width="3"/>
  <!-- hockey-style mouth muzzle -->
  <rect x="180" y="200" width="120" height="60" fill="#a89a78" stroke="#000" stroke-width="4"/>
  ${Array.from({ length: 6 }, (_, i) => `<line x1="${180 + i * 20}" y1="200" x2="${180 + i * 20}" y2="260" stroke="#000" stroke-width="2"/>`).join('')}
  ${Array.from({ length: 3 }, (_, i) => `<line x1="180" y1="${200 + i * 20}" x2="300" y2="${200 + i * 20}" stroke="#000" stroke-width="2"/>`).join('')}
  <!-- straps -->
  <line x1="180" y1="220" x2="120" y2="220" stroke="#a89a78" stroke-width="6"/>
  <line x1="300" y1="220" x2="360" y2="220" stroke="#a89a78" stroke-width="6"/>
  <!-- prison bars in foreground -->
  ${Array.from({ length: 5 }, (_, i) => `<rect x="${40 + i * 100}" y="0" width="14" height="${H}" fill="#444" stroke="#000" stroke-width="2"/>`).join('')}
  ${cap('HELLO CLARICE', W / 2, H - 18, '#fff').replace(/<rect[^/]*\/>/, '<rect x="160" y="' + (H - 34) + '" width="160" height="22" fill="#000" stroke="#fff" stroke-width="2"/>')}
`,

// 25. PULP FICTION — twist contest dancing
25: () => `
  <rect width="${W}" height="${H}" fill="#7a1010"/>
  <!-- checkered floor in perspective -->
  ${Array.from({ length: 8 }, (_, r) =>
    Array.from({ length: 12 }, (_, c) => {
      const sw = 30 + r * 6;
      const x = c * sw - r * 4;
      const y = 280 + r * 10;
      const fill = (r + c) % 2 ? '#000' : '#fff';
      return `<rect x="${x}" y="${y}" width="${sw}" height="10" fill="${fill}"/>`;
    }).join('')
  ).join('')}
  <!-- left dancer (Vincent) -->
  <g transform="translate(170 180)">
    <circle cx="0" cy="-10" r="14" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <!-- long dark slick hair tied -->
    <path d="M-12 -12 Q 0 -28 12 -12 L 16 4 Q 0 0 -16 4 Z" fill="#000"/>
    <line x1="-3" y1="-12" x2="3" y2="-12" stroke="#000" stroke-width="1"/>
    <!-- mustache -->
    <line x1="-6" y1="2" x2="6" y2="2" stroke="#000" stroke-width="2"/>
    <!-- black suit white shirt -->
    <polygon points="-18,4 18,4 24,90 -24,90" fill="#000"/>
    <polygon points="-6,4 6,4 4,30 -4,30" fill="#fff"/>
    <line x1="-1" y1="4" x2="1" y2="30" stroke="#000" stroke-width="2"/>
    <!-- arms peace V's -->
    <line x1="-18" y1="20" x2="-50" y2="-10" stroke="#000" stroke-width="6"/>
    <line x1="-50" y1="-10" x2="-58" y2="-30" stroke="#ffe0c0" stroke-width="4"/>
    <line x1="-50" y1="-10" x2="-44" y2="-30" stroke="#ffe0c0" stroke-width="4"/>
    <line x1="18" y1="20" x2="50" y2="-10" stroke="#000" stroke-width="6"/>
    <line x1="50" y1="-10" x2="58" y2="-30" stroke="#ffe0c0" stroke-width="4"/>
    <line x1="50" y1="-10" x2="44" y2="-30" stroke="#ffe0c0" stroke-width="4"/>
    <!-- bare-foot legs (sock) -->
    <line x1="-12" y1="90" x2="-22" y2="130" stroke="#000" stroke-width="8"/>
    <line x1="12" y1="90" x2="22" y2="130" stroke="#000" stroke-width="8"/>
    <line x1="-22" y1="130" x2="-32" y2="130" stroke="#fff" stroke-width="4"/>
    <line x1="22" y1="130" x2="32" y2="130" stroke="#fff" stroke-width="4"/>
  </g>
  <!-- right dancer (Mia) -->
  <g transform="translate(310 180)">
    <circle cx="0" cy="-10" r="14" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <!-- bob haircut -->
    <path d="M-14 -16 Q 0 -28 14 -16 L 16 4 L -16 4 Z" fill="#000"/>
    <!-- fringe -->
    <line x1="-10" y1="-6" x2="10" y2="-6" stroke="#000" stroke-width="3"/>
    <!-- red lips -->
    <ellipse cx="0" cy="2" rx="4" ry="2" fill="#a00"/>
    <!-- white shirt black slacks -->
    <polygon points="-16,4 16,4 18,46 -18,46" fill="#fff" stroke="#000" stroke-width="2"/>
    <polygon points="-18,46 18,46 22,90 -22,90" fill="#000"/>
    <!-- arms peace V's -->
    <line x1="-16" y1="20" x2="-50" y2="-10" stroke="#fff" stroke-width="6"/>
    <line x1="-50" y1="-10" x2="-44" y2="-30" stroke="#ffe0c0" stroke-width="4"/>
    <line x1="-50" y1="-10" x2="-58" y2="-30" stroke="#ffe0c0" stroke-width="4"/>
    <line x1="16" y1="20" x2="50" y2="-10" stroke="#fff" stroke-width="6"/>
    <line x1="50" y1="-10" x2="44" y2="-30" stroke="#ffe0c0" stroke-width="4"/>
    <line x1="50" y1="-10" x2="58" y2="-30" stroke="#ffe0c0" stroke-width="4"/>
    <line x1="-12" y1="90" x2="-22" y2="130" stroke="#000" stroke-width="8"/>
    <line x1="12" y1="90" x2="22" y2="130" stroke="#000" stroke-width="8"/>
  </g>
  ${cap('THE TWIST. ON 5.', W / 2, 30, '#ffce63').replace(/<rect[^/]*\/>/, '<rect x="140" y="14" width="200" height="22" fill="#000" stroke="#ffce63" stroke-width="2"/>')}
`,

// 26. DARK KNIGHT — Joker leaning out cop car upside-down, hair flying
26: () => `
  <rect width="${W}" height="${H}" fill="#1a1a2a"/>
  <!-- streaky lights -->
  <line x1="0" y1="100" x2="${W}" y2="100" stroke="#fff" stroke-width="1" opacity="0.4"/>
  <line x1="0" y1="60" x2="${W}" y2="60" stroke="#ff0" stroke-width="1" opacity="0.4"/>
  <!-- street motion blur -->
  <line x1="0" y1="320" x2="${W}" y2="320" stroke="#888" stroke-width="2"/>
  ${Array.from({ length: 8 }, (_, i) => `<line x1="${i * 60}" y1="340" x2="${i * 60 + 30}" y2="340" stroke="#ff0" stroke-width="3"/>`).join('')}
  <!-- police car (side) -->
  <rect x="60" y="220" width="360" height="80" fill="#fff" stroke="#000" stroke-width="3"/>
  <rect x="80" y="180" width="320" height="40" fill="#fff" stroke="#000" stroke-width="3"/>
  <rect x="120" y="190" width="100" height="30" fill="#9be" stroke="#000" stroke-width="2"/>
  <rect x="240" y="190" width="100" height="30" fill="#9be" stroke="#000" stroke-width="2"/>
  <!-- POLICE stripe -->
  <rect x="60" y="260" width="360" height="14" fill="#1a3aff"/>
  <text x="240" y="272" text-anchor="middle" font-size="12" font-weight="bold" fill="#fff">POLICE</text>
  <!-- light bar -->
  <rect x="160" y="170" width="60" height="14" fill="#a00" stroke="#000" stroke-width="2"/>
  <rect x="220" y="170" width="60" height="14" fill="#1a3aff" stroke="#000" stroke-width="2"/>
  <!-- wheels -->
  <circle cx="120" cy="310" r="22" fill="#000"/>
  <circle cx="120" cy="310" r="10" fill="#888"/>
  <circle cx="360" cy="310" r="22" fill="#000"/>
  <circle cx="360" cy="310" r="10" fill="#888"/>
  <!-- joker leaning out passenger window upside-down -->
  <g transform="translate(280 200)">
    <!-- head upside (below window) -->
    <circle cx="0" cy="40" r="20" fill="#e8f8e8" stroke="#000" stroke-width="3"/>
    <!-- green hair flying back (down to car) -->
    <path d="M-20 50 Q -50 80 -80 100 Q -50 70 -30 60 Z" fill="#0a0" stroke="#000" stroke-width="2"/>
    <path d="M-10 60 Q -40 100 -70 120 Q -30 90 -20 70 Z" fill="#0a0" stroke="#000" stroke-width="2"/>
    <!-- face paint -->
    <polygon points="-8,32 -4,38 -2,28" fill="#fff"/>
    <polygon points="8,32 4,38 2,28" fill="#fff"/>
    <circle cx="-5" cy="34" r="1.5" fill="#000"/>
    <circle cx="5" cy="34" r="1.5" fill="#000"/>
    <!-- wide grin (upside down so it looks frowny but mouth big) -->
    <path d="M-12 46 Q 0 38 12 46" fill="none" stroke="#a00" stroke-width="3"/>
    <line x1="-12" y1="46" x2="-18" y2="50" stroke="#a00" stroke-width="3"/>
    <line x1="12" y1="46" x2="18" y2="50" stroke="#a00" stroke-width="3"/>
    <!-- arm hanging out blissful -->
    <line x1="0" y1="20" x2="-10" y2="-20" stroke="#9a5acf" stroke-width="6"/>
  </g>
  ${cap('WHY SO SERIOUS?', W / 2, 30, '#0f0').replace(/<rect[^/]*\/>/, '<rect x="140" y="14" width="200" height="22" fill="#000" stroke="#0f0" stroke-width="2"/>')}
`,

// 27. OLDBOY — corridor side profile with hammer, enemies
27: () => `
  <rect width="${W}" height="${H}" fill="#3a1a0a"/>
  <!-- floor -->
  <rect x="0" y="270" width="${W}" height="90" fill="#2a0a05"/>
  <!-- ceiling -->
  <rect x="0" y="0" width="${W}" height="80" fill="#1a0500"/>
  <!-- corridor walls (horizontal lines for perspective) -->
  ${Array.from({ length: 6 }, (_, i) => `
    <line x1="0" y1="${100 + i * 30}" x2="${W}" y2="${100 + i * 30}" stroke="#5a2a1a" stroke-width="1"/>
    <line x1="0" y1="${260 - i * 30}" x2="${W}" y2="${260 - i * 30}" stroke="#5a2a1a" stroke-width="1"/>
  `).join('')}
  <!-- main hero in profile facing right, hammer raised -->
  <g transform="translate(120 200)">
    <!-- spiky hair -->
    <path d="M-8 -20 L -2 -30 L 4 -22 L 10 -32 L 14 -22 L 20 -32 L 22 -20 Z" fill="#000"/>
    <!-- side-profile head -->
    <ellipse cx="6" cy="-8" rx="14" ry="16" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <!-- nose -->
    <polygon points="20,-10 24,-6 20,-2" fill="#ffe0c0" stroke="#000" stroke-width="2"/>
    <!-- eye angry -->
    <line x1="12" y1="-12" x2="20" y2="-10" stroke="#000" stroke-width="2"/>
    <circle cx="16" cy="-10" r="2" fill="#000"/>
    <!-- mouth determined -->
    <line x1="16" y1="-2" x2="22" y2="0" stroke="#000" stroke-width="2"/>
    <!-- body -->
    <polygon points="-10,8 18,8 24,70 -16,70" fill="#5a3a3a" stroke="#000" stroke-width="3"/>
    <!-- legs walking -->
    <line x1="-6" y1="70" x2="-16" y2="120" stroke="#000" stroke-width="8"/>
    <line x1="14" y1="70" x2="24" y2="120" stroke="#000" stroke-width="8"/>
    <!-- arm raising hammer behind -->
    <line x1="-4" y1="20" x2="-30" y2="-10" stroke="#5a3a3a" stroke-width="6"/>
    <line x1="14" y1="20" x2="40" y2="-30" stroke="#ffe0c0" stroke-width="6"/>
    <!-- hammer -->
    <rect x="34" y="-50" width="14" height="22" fill="#888" stroke="#000" stroke-width="2"/>
    <line x1="40" y1="-30" x2="48" y2="-50" stroke="#5a3a1a" stroke-width="3"/>
  </g>
  <!-- 3 enemies in front to right -->
  ${[260, 330, 400].map((x, i) => {
    const s = 1 - i * 0.15;
    return `<g transform="translate(${x} ${210 + i * 8}) scale(${s})">
      <circle cx="0" cy="0" r="12" fill="#ffe0c0" stroke="#000" stroke-width="2"/>
      <line x1="-10" y1="-2" x2="-5" y2="-2" stroke="#000" stroke-width="2"/>
      <line x1="5" y1="-2" x2="10" y2="-2" stroke="#000" stroke-width="2"/>
      <ellipse cx="0" cy="6" rx="3" ry="2" fill="#000"/>
      <polygon points="-12,12 12,12 16,60 -16,60" fill="#3a2a3a" stroke="#000" stroke-width="2"/>
      <line x1="-12" y1="20" x2="-30" y2="40" stroke="#3a2a3a" stroke-width="6"/>
      <line x1="12" y1="20" x2="30" y2="40" stroke="#3a2a3a" stroke-width="6"/>
      <line x1="-8" y1="60" x2="-14" y2="100" stroke="#000" stroke-width="6"/>
      <line x1="8" y1="60" x2="14" y2="100" stroke="#000" stroke-width="6"/>
    </g>`;
  }).join('')}
  ${cap('ONE TAKE. ALL HAMMER.', W / 2, 30, '#ff0').replace(/<rect[^/]*\/>/, '<rect x="120" y="14" width="240" height="22" fill="#000" stroke="#ff0" stroke-width="2"/>')}
`,

// 28. INDIANA JONES — running from boulder
28: () => `
  <rect width="${W}" height="${H}" fill="#dab780"/>
  <!-- cave wall texture -->
  <path d="M0 60 Q 100 40 200 60 T 480 60 V 0 H 0 Z" fill="#7a4a2a" stroke="#000" stroke-width="3"/>
  <path d="M0 360 V 320 Q 100 340 200 320 T 480 320 V 360 Z" fill="#7a4a2a" stroke="#000" stroke-width="3"/>
  <!-- ground line -->
  <line x1="0" y1="320" x2="${W}" y2="320" stroke="#000" stroke-width="3"/>
  <!-- big boulder right -->
  <circle cx="380" cy="220" r="100" fill="#5a3a1a" stroke="#000" stroke-width="4"/>
  <circle cx="350" cy="190" r="10" fill="#3a2a1a"/>
  <circle cx="410" cy="240" r="14" fill="#3a2a1a"/>
  <circle cx="370" cy="260" r="6" fill="#3a2a1a"/>
  <!-- motion swooshes -->
  <line x1="450" y1="180" x2="480" y2="180" stroke="#000" stroke-width="3"/>
  <line x1="440" y1="220" x2="475" y2="220" stroke="#000" stroke-width="3"/>
  <line x1="450" y1="260" x2="480" y2="260" stroke="#000" stroke-width="3"/>
  <!-- dust under boulder -->
  <ellipse cx="380" cy="320" rx="80" ry="6" fill="#fff" opacity="0.6"/>
  <!-- Indy running left -->
  <g transform="translate(140 220)">
    <!-- fedora -->
    <ellipse cx="0" cy="-30" rx="26" ry="4" fill="#5a3a1a" stroke="#000" stroke-width="2"/>
    <path d="M-16 -30 Q 0 -50 16 -30 Z" fill="#5a3a1a" stroke="#000" stroke-width="2"/>
    <line x1="-12" y1="-32" x2="12" y2="-32" stroke="#3a2010" stroke-width="2"/>
    <!-- head -->
    <circle cx="0" cy="-10" r="12" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <!-- scared face -->
    <ellipse cx="-3" cy="-12" rx="2" ry="3" fill="#fff"/>
    <ellipse cx="3" cy="-12" rx="2" ry="3" fill="#fff"/>
    <circle cx="-3" cy="-12" r="1" fill="#000"/>
    <circle cx="3" cy="-12" r="1" fill="#000"/>
    <ellipse cx="0" cy="-2" rx="3" ry="3" fill="#000"/>
    <!-- shirt+jacket -->
    <polygon points="-14,4 14,4 16,40 -16,40" fill="#a07a3a" stroke="#000" stroke-width="3"/>
    <!-- running legs (one back, one forward) -->
    <line x1="-6" y1="40" x2="-30" y2="60" stroke="#5a3a1a" stroke-width="8"/>
    <line x1="6" y1="40" x2="20" y2="80" stroke="#5a3a1a" stroke-width="8"/>
    <ellipse cx="-32" cy="62" rx="10" ry="3" fill="#3a2010"/>
    <ellipse cx="22" cy="82" rx="10" ry="3" fill="#3a2010"/>
    <!-- arms running -->
    <line x1="-14" y1="14" x2="-40" y2="0" stroke="#a07a3a" stroke-width="6"/>
    <line x1="14" y1="14" x2="40" y2="-10" stroke="#a07a3a" stroke-width="6"/>
    <!-- whip in hand -->
    <path d="M40 -10 Q 60 -20 70 0 Q 60 20 50 30" fill="none" stroke="#3a2010" stroke-width="3"/>
  </g>
  ${cap('!!!!!!!!')}
`,

// 29. ALIEN — chestburster scene
29: () => `
  <rect width="${W}" height="${H}" fill="#0a0a1a"/>
  <!-- table -->
  <rect x="40" y="220" width="400" height="20" fill="#666" stroke="#000" stroke-width="3"/>
  <line x1="80" y1="240" x2="80" y2="320" stroke="#666" stroke-width="6"/>
  <line x1="400" y1="240" x2="400" y2="320" stroke="#666" stroke-width="6"/>
  <!-- guy lying back, head left -->
  <g transform="translate(120 210)">
    <circle cx="0" cy="0" r="20" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <!-- screaming open mouth -->
    <ellipse cx="6" cy="6" rx="6" ry="10" fill="#000"/>
    <!-- eyes squeezed -->
    <line x1="-8" y1="-4" x2="-2" y2="-2" stroke="#000" stroke-width="3"/>
    <line x1="2" y1="-2" x2="8" y2="-4" stroke="#000" stroke-width="3"/>
    <!-- sweat -->
    <path d="M-16 -16 Q -22 -14 -20 -8" fill="none" stroke="#9be" stroke-width="2"/>
  </g>
  <!-- body lying on table -->
  <ellipse cx="240" cy="220" rx="120" ry="14" fill="#fff" stroke="#000" stroke-width="3"/>
  <!-- arms flailing -->
  <line x1="160" y1="220" x2="120" y2="180" stroke="#fff" stroke-width="14" stroke-linecap="round"/>
  <line x1="320" y1="220" x2="360" y2="180" stroke="#fff" stroke-width="14" stroke-linecap="round"/>
  <ellipse cx="120" cy="180" rx="10" ry="6" fill="#ffe0c0" stroke="#000" stroke-width="2"/>
  <ellipse cx="360" cy="180" rx="10" ry="6" fill="#ffe0c0" stroke="#000" stroke-width="2"/>
  <!-- legs -->
  <ellipse cx="380" cy="226" rx="40" ry="8" fill="#fff" stroke="#000" stroke-width="3"/>
  <!-- BURSTER hole + alien -->
  <ellipse cx="260" cy="216" rx="20" ry="6" fill="#a00" stroke="#000" stroke-width="2"/>
  <!-- shredded shirt edges -->
  <polyline points="240,216 244,210 248,218 252,210 256,218 260,210 264,218 268,210 272,218 276,210 280,216" fill="none" stroke="#000" stroke-width="2"/>
  <!-- Alien chestburster popping out -->
  <g transform="translate(260 200)">
    <!-- elongated head -->
    <ellipse cx="0" cy="0" rx="14" ry="22" fill="#1a1a1a" stroke="#0f8" stroke-width="2"/>
    <!-- inner mouth tongue -->
    <ellipse cx="0" cy="2" rx="6" ry="8" fill="#5a0a0a"/>
    <!-- teeth zigzag -->
    <polyline points="-6,-2 -3,4 0,-2 3,4 6,-2" fill="none" stroke="#fff" stroke-width="2"/>
    <!-- highlight ridge -->
    <ellipse cx="-4" cy="-8" rx="3" ry="2" fill="#0f8" opacity="0.4"/>
  </g>
  <!-- blood splatter -->
  <g fill="#a00">
    <circle cx="220" cy="200" r="3"/><circle cx="300" cy="200" r="3"/>
    <circle cx="240" cy="190" r="2"/><circle cx="280" cy="190" r="2"/>
    <circle cx="260" cy="180" r="4"/>
    <line x1="240" y1="200" x2="220" y2="180" stroke="#a00" stroke-width="2"/>
    <line x1="280" y1="200" x2="300" y2="180" stroke="#a00" stroke-width="2"/>
  </g>
  ${cap('IN SPACE NO ONE HEARS PT 1', W / 2, 30, '#0f8').replace(/<rect[^/]*\/>/, '<rect x="80" y="14" width="320" height="22" fill="#000" stroke="#0f8" stroke-width="2"/>')}
`,

// 30. ABOUT TIME — closet, crouching figure with reverse clock
30: () => `
  <rect width="${W}" height="${H}" fill="#cce0ff"/>
  <!-- closet doors -->
  <rect x="80" y="40" width="320" height="300" fill="#a07a5a" stroke="#000" stroke-width="4"/>
  <line x1="240" y1="40" x2="240" y2="340" stroke="#000" stroke-width="3"/>
  <rect x="160" y="180" width="20" height="6" fill="#5a3a1a"/>
  <rect x="300" y="180" width="20" height="6" fill="#5a3a1a"/>
  <!-- inside dim -->
  <rect x="86" y="46" width="308" height="288" fill="#5a4030"/>
  <!-- hanging clothes outline -->
  <g stroke="#000" stroke-width="2" fill="none">
    <line x1="120" y1="70" x2="380" y2="70"/>
    ${[140, 180, 220, 320, 360].map(x => `
      <line x1="${x}" y1="70" x2="${x}" y2="80" stroke="#000"/>
      <polygon points="${x - 14},80 ${x + 14},80 ${x + 18},150 ${x - 18},150" fill="#3a2010"/>
    `).join('')}
  </g>
  <!-- crouching figure -->
  <g transform="translate(240 220)">
    <circle cx="0" cy="-30" r="18" fill="#ffe0c0" stroke="#000" stroke-width="3"/>
    <!-- short brown hair -->
    <path d="M-16 -36 Q 0 -50 16 -36 L 12 -28 L -12 -28 Z" fill="#7a3a1a"/>
    <!-- eyes squeezed shut -->
    <line x1="-8" y1="-32" x2="-2" y2="-32" stroke="#000" stroke-width="2"/>
    <line x1="2" y1="-32" x2="8" y2="-32" stroke="#000" stroke-width="2"/>
    <!-- mouth tense -->
    <line x1="-4" y1="-22" x2="4" y2="-22" stroke="#000" stroke-width="2"/>
    <!-- folded body -->
    <polygon points="-14,-12 14,-12 18,30 -18,30" fill="#2a4a8a" stroke="#000" stroke-width="3"/>
    <!-- arms hugging knees -->
    <line x1="-14" y1="-2" x2="-22" y2="20" stroke="#2a4a8a" stroke-width="6"/>
    <line x1="14" y1="-2" x2="22" y2="20" stroke="#2a4a8a" stroke-width="6"/>
    <!-- clenched fists -->
    <circle cx="-22" cy="20" r="6" fill="#ffe0c0" stroke="#000" stroke-width="2"/>
    <circle cx="22" cy="20" r="6" fill="#ffe0c0" stroke="#000" stroke-width="2"/>
    <!-- bent legs (knees up) -->
    <line x1="-10" y1="30" x2="-30" y2="50" stroke="#3a2010" stroke-width="8"/>
    <line x1="-30" y1="50" x2="-20" y2="80" stroke="#3a2010" stroke-width="8"/>
    <line x1="10" y1="30" x2="30" y2="50" stroke="#3a2010" stroke-width="8"/>
    <line x1="30" y1="50" x2="20" y2="80" stroke="#3a2010" stroke-width="8"/>
  </g>
  <!-- swirling time arrows around figure -->
  <g fill="none" stroke="#ff0" stroke-width="3">
    <path d="M150 220 Q 120 180 150 140" stroke-dasharray="6 4"/>
    <polygon points="150,140 145,148 158,148" fill="#ff0"/>
    <path d="M330 220 Q 360 180 330 140" stroke-dasharray="6 4"/>
    <polygon points="330,140 322,148 335,148" fill="#ff0"/>
  </g>
  <!-- reverse clock above head -->
  <circle cx="240" cy="100" r="28" fill="#fff" stroke="#000" stroke-width="3"/>
  <text x="240" y="86" text-anchor="middle" font-size="9">12</text>
  <text x="216" y="104" text-anchor="middle" font-size="9">9</text>
  <text x="240" y="124" text-anchor="middle" font-size="9">6</text>
  <text x="262" y="104" text-anchor="middle" font-size="9">3</text>
  <line x1="240" y1="100" x2="240" y2="84" stroke="#000" stroke-width="3"/>
  <line x1="240" y1="100" x2="226" y2="100" stroke="#000" stroke-width="3"/>
  <path d="M268 92 A 24 24 0 1 0 268 108" fill="none" stroke="#a00" stroke-width="3"/>
  <polygon points="266,108 274,112 274,104" fill="#a00"/>
  ${cap('CLOSET = TIME MACHINE')}
`,
};

// --- write ---
fs.mkdirSync(OUT, { recursive: true });
const db = JSON.parse(fs.readFileSync(DB, 'utf8'));
let n = 0;
for (const item of db) {
  const fn = D[item.id];
  if (!fn) {
    console.warn('!! No drawing for id', item.id);
    continue;
  }
  const fname = `movie_${String(item.id).padStart(3, '0')}.svg`;
  fs.writeFileSync(path.join(OUT, fname), svg(fn()), 'utf8');
  item.imageUrl = `/images/${fname}`;
  n++;
}
fs.writeFileSync(DB, JSON.stringify(db, null, 2) + '\n', 'utf8');
console.log(`Wrote ${n} SVG drawings; updated quizData.json imageUrls -> .svg`);
