// Gera as 15 ilustrações SVG originais (public/img). Edite à vontade ou substitua por fotos.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const dir = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "img",
);
const W = 800,
  H = 450;
const C = {
  cream: "#fff7ec",
  gold: "#ffc857",
  coral: "#ff6b6b",
  teal: "#2ec4b6",
  ink: "#2b1055",
};

const wrap = (
  id,
  c1,
  c2,
  body,
) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-hidden="true">
<defs><linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>
<rect width="${W}" height="${H}" fill="url(#g${id})"/>
<circle cx="700" cy="60" r="150" fill="#fff" opacity=".07"/><circle cx="90" cy="400" r="190" fill="#fff" opacity=".06"/>
${body}
</svg>`;

const art = {
  // 1 — Discurso: balões de fala + símbolo de Vênus
  "01-discurso.svg": wrap(
    1,
    "#3b1c6e",
    "#c2307a",
    `
  <g fill="${C.cream}" opacity=".95">
    <rect x="90" y="90" width="270" height="120" rx="28"/><path d="M150 210 l-10 50 50-50z"/>
    <rect x="440" y="170" width="270" height="120" rx="28" opacity=".8"/><path d="M640 290 l20 50 -50-50z"/>
  </g>
  <g stroke="${C.ink}" stroke-width="10" stroke-linecap="round" opacity=".5"><path d="M130 130h190M130 160h140M480 210h190M480 240h120"/></g>
  <g fill="none" stroke="${C.gold}" stroke-width="14" stroke-linecap="round"><circle cx="400" cy="335" r="46"/><path d="M400 381v44M379 404h42"/></g>`,
  ),
  // 2 — Margem ao centro
  "02-margem-centro.svg": wrap(
    2,
    "#7b2d8e",
    "#f08a24",
    `
  <g fill="none" stroke="${C.cream}" stroke-width="6" opacity=".35"><circle cx="400" cy="225" r="190"/><circle cx="400" cy="225" r="130"/><circle cx="400" cy="225" r="70"/></g>
  <g fill="${C.cream}"><rect x="320" y="150" width="40" height="150" rx="4" fill="${C.gold}"/><rect x="368" y="130" width="44" height="170" rx="4"/><rect x="420" y="160" width="36" height="140" rx="4" fill="${C.coral}"/><rect x="464" y="140" width="40" height="160" rx="4" fill="${C.teal}"/></g>
  <rect x="300" y="300" width="230" height="14" rx="7" fill="${C.cream}"/>
  <g fill="${C.cream}" opacity=".9"><circle cx="110" cy="110" r="14"/><circle cx="690" cy="340" r="14"/><circle cx="650" cy="90" r="9"/><circle cx="140" cy="360" r="9"/></g>`,
  ),
  // 3 — Fragmentos / desconstrução
  "03-fragmentos.svg": wrap(
    3,
    "#1d3557",
    "#7b2d8e",
    `
  <g>${[
    [120, 80, 150, 110, C.coral, -8],
    [290, 60, 120, 90, C.gold, 6],
    [420, 100, 160, 130, C.teal, -4],
    [600, 70, 110, 110, C.cream, 9],
    [170, 230, 130, 120, C.cream, 5],
    [330, 230, 150, 100, C.coral, -7],
    [510, 260, 140, 110, C.gold, 4],
    [660, 240, 90, 120, C.teal, -9],
  ]
    .map(
      ([x, y, w, h, f, r]) =>
        `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${f}" opacity=".88" transform="rotate(${r} ${x + w / 2} ${y + h / 2})"/>`,
    )
    .join("")}</g>
  <g stroke="${C.cream}" stroke-width="4" stroke-dasharray="10 12" opacity=".7"><path d="M60 215h680M400 30v390"/></g>`,
  ),
  // 4 — Engrenagens (trabalho, capital)
  "04-engrenagens.svg": wrap(
    4,
    "#6a040f",
    "#e85d04",
    (() => {
      const gear = (cx, cy, r, teeth, f) => {
        let d = "";
        for (let i = 0; i < teeth; i++) {
          d += `<rect x="${cx - 12}" y="${cy - r - 18}" width="24" height="30" rx="4" transform="rotate(${(360 / teeth) * i} ${cx} ${cy})" fill="${f}"/>`;
        }
        return (
          d +
          `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}"/><circle cx="${cx}" cy="${cy}" r="${r * 0.4}" fill="#6a040f"/>`
        );
      };
      return (
        gear(290, 225, 80, 10, C.cream) +
        gear(470, 160, 55, 8, C.gold) +
        gear(520, 300, 62, 9, C.coral) +
        `<g fill="none" stroke="${C.cream}" stroke-width="8" stroke-linecap="round" opacity=".6"><path d="M90 380h620"/><path d="M110 380v-30M200 380v-20M610 380v-30M700 380v-20"/></g>`
      );
    })(),
  ),
  // 5 — Balança (liberalismo, direitos)
  "05-balanca.svg": wrap(
    5,
    "#0b3954",
    "#2ec4b6",
    `
  <g stroke="${C.cream}" stroke-width="10" stroke-linecap="round" fill="none"><path d="M400 90v270"/><path d="M230 140h340"/><path d="M300 380h200"/>
    <path d="M230 140l-70 120M230 140l70 120M570 140l-70 120M570 140l70 120" stroke-width="5"/></g>
  <g fill="${C.gold}"><path d="M150 260h160a80 50 0 0 1-160 0z"/><path d="M490 260h160a80 50 0 0 1-160 0z" fill="${C.coral}"/></g>
  <circle cx="400" cy="85" r="18" fill="${C.cream}"/>`,
  ),
  // 6 — Urna (voto)
  "06-urna.svg": wrap(
    6,
    "#5a189a",
    "#ff7b9c",
    `
  <rect x="250" y="190" width="300" height="180" rx="16" fill="${C.cream}"/>
  <rect x="330" y="205" width="140" height="14" rx="7" fill="${C.ink}" opacity=".6"/>
  <g transform="rotate(-8 400 150)"><rect x="345" y="70" width="110" height="140" rx="8" fill="#fff"/><path d="M365 125l22 24 40-50" fill="none" stroke="${C.teal}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></g>
  <g fill="${C.gold}"><rect x="90" y="330" width="60" height="14" rx="7"/><rect x="650" y="330" width="60" height="14" rx="7"/></g>
  <text x="400" y="320" text-anchor="middle" font-family="Georgia,serif" font-size="46" font-weight="700" fill="${C.ink}" opacity=".8">1848 · 1920</text>`,
  ),
  // 7 — Megafone
  "07-megafone.svg": wrap(
    7,
    "#9d0208",
    "#ff9f1c",
    `
  <g fill="${C.cream}"><path d="M200 190l260-110v290l-260-110z"/><rect x="130" y="190" width="100" height="90" rx="14"/><rect x="215" y="280" width="46" height="90" rx="10" transform="rotate(-12 238 325)"/></g>
  <g fill="none" stroke="${C.gold}" stroke-width="12" stroke-linecap="round"><path d="M520 150q50 75 0 150"/><path d="M570 110q90 115 0 230"/><path d="M620 70q130 155 0 310"/></g>`,
  ),
  // 8 — Interseccionalidade
  "08-interseccao.svg": wrap(
    8,
    "#240046",
    "#3c096c",
    `
  <g style="mix-blend-mode:screen"><circle cx="330" cy="200" r="120" fill="${C.coral}" opacity=".8"/><circle cx="470" cy="200" r="120" fill="${C.teal}" opacity=".8"/><circle cx="400" cy="300" r="120" fill="${C.gold}" opacity=".8"/></g>
  <circle cx="400" cy="233" r="24" fill="${C.cream}"/>
  <g fill="#fff" font-family="Georgia,serif" font-size="26" font-weight="700"><text x="120" y="110">gênero</text><text x="600" y="110">raça</text><text x="560" y="400">classe</text></g>`,
  ),
  // 9 — Rede digital
  "09-rede.svg": wrap(
    9,
    "#03045e",
    "#7209b7",
    (() => {
      const n = [
        [150, 120],
        [300, 80],
        [470, 130],
        [640, 90],
        [220, 260],
        [400, 230],
        [580, 270],
        [130, 370],
        [330, 370],
        [520, 380],
        [690, 360],
      ];
      const e = [
        [0, 1],
        [1, 2],
        [2, 3],
        [0, 4],
        [1, 5],
        [2, 5],
        [3, 6],
        [4, 5],
        [5, 6],
        [4, 7],
        [4, 8],
        [5, 8],
        [5, 9],
        [6, 9],
        [6, 10],
        [2, 6],
      ];
      return (
        `<g stroke="${C.cream}" stroke-width="3" opacity=".55">${e.map(([a, b]) => `<line x1="${n[a][0]}" y1="${n[a][1]}" x2="${n[b][0]}" y2="${n[b][1]}"/>`).join("")}</g>` +
        n
          .map(
            ([x, y], i) =>
              `<circle cx="${x}" cy="${y}" r="${i === 5 ? 26 : 16}" fill="${[C.coral, C.gold, C.teal][i % 3]}"/>`,
          )
          .join("") +
        `<text x="400" y="240" text-anchor="middle" font-family="Georgia,serif" font-size="30" font-weight="700" fill="${C.ink}">#</text>`
      );
    })(),
  ),
  // 10 — Fronteira
  "10-fronteira.svg": wrap(
    10,
    "#bc4749",
    "#f2cc8f",
    `
  <path d="M0 300 Q200 250 400 290 T800 260 V450 H0z" fill="#3d405b" opacity=".55"/>
  <g stroke="${C.cream}" stroke-width="8" stroke-dasharray="26 16" stroke-linecap="round" fill="none"><path d="M410 20 L380 140 L430 230 L390 340 L420 440"/></g>
  <g fill="${C.cream}"><circle cx="230" cy="260" r="20"/><path d="M200 340q30-85 60 0z"/><circle cx="560" cy="260" r="20" fill="#3d405b"/><path d="M530 340q30-85 60 0z" fill="#3d405b"/></g>
  <g fill="none" stroke="${C.cream}" stroke-width="5" stroke-linecap="round" opacity=".8"><path d="M300 110q15-18 30 0q15-18 30 0"/><path d="M470 80q12-14 24 0q12-14 24 0"/><path d="M520 140q10-12 20 0q10-12 20 0"/></g>`,
  ),
  // 11 — Olhar / epistemologia
  "11-olhar.svg": wrap(
    11,
    "#1b4332",
    "#52b788",
    `
  <path d="M120 225q280-190 560 0q-280 190-560 0z" fill="${C.cream}"/>
  <circle cx="400" cy="225" r="78" fill="${C.teal}"/><circle cx="400" cy="225" r="40" fill="${C.ink}"/><circle cx="420" cy="205" r="14" fill="#fff"/>
  <g stroke="${C.cream}" stroke-width="6" stroke-linecap="round" opacity=".7"><path d="M400 60v50M270 85l25 40M530 85l-25 40"/></g>
  <g fill="${C.gold}"><rect x="260" y="360" width="280" height="16" rx="8"/><rect x="290" y="380" width="220" height="14" rx="7" opacity=".7"/></g>`,
  ),
  // 12 — Padrão geométrico africano (inspiração têxtil)
  "12-padrao-africano.svg": wrap(
    12,
    "#7f4f24",
    "#e09f3e",
    (() => {
      let s = "";
      const cols = [C.cream, C.coral, C.teal, C.ink, C.gold];
      for (let r = 0; r < 5; r++)
        for (let c = 0; c < 10; c++) {
          const x = 40 + c * 72,
            y = 45 + r * 78,
            col = cols[(r + c) % 5];
          s +=
            (r + c) % 2
              ? `<path d="M${x} ${y + 34} L${x + 30} ${y} L${x + 60} ${y + 34} L${x + 30} ${y + 68}z" fill="${col}" opacity=".9"/>`
              : `<circle cx="${x + 30}" cy="${y + 34}" r="26" fill="none" stroke="${col}" stroke-width="9"/>`;
        }
      return s;
    })(),
  ),
  // 13 — Bússola (pós-colonial)
  "13-bussola.svg": wrap(
    13,
    "#264653",
    "#e76f51",
    `
  <circle cx="400" cy="225" r="170" fill="none" stroke="${C.cream}" stroke-width="10"/><circle cx="400" cy="225" r="140" fill="none" stroke="${C.cream}" stroke-width="3" opacity=".5"/>
  <g stroke="${C.cream}" stroke-width="4" opacity=".6">${Array.from({ length: 24 }, (_, i) => `<line x1="400" y1="65" x2="400" y2="${i % 2 ? 78 : 90}" transform="rotate(${i * 15} 400 225)"/>`).join("")}</g>
  <path d="M400 110l32 115-32 115-32-115z" fill="${C.gold}" transform="rotate(35 400 225)"/><path d="M400 110l32 115h-64z" fill="${C.coral}" transform="rotate(35 400 225)"/>
  <circle cx="400" cy="225" r="14" fill="${C.cream}"/>`,
  ),
  // 14 — Carta e pena (Une si longue lettre)
  "14-carta.svg": wrap(
    14,
    "#4a1942",
    "#ee6c4d",
    `
  <rect x="170" y="140" width="380" height="230" rx="16" fill="${C.cream}"/>
  <path d="M170 150l190 130 190-130" fill="none" stroke="${C.ink}" stroke-width="8" stroke-linejoin="round" opacity=".45"/>
  <g transform="rotate(32 600 190)"><path d="M600 70c40 40 40 130-5 220-35-60-45-150 5-220z" fill="${C.gold}"/><path d="M600 80v230" stroke="${C.ink}" stroke-width="5" opacity=".5"/></g>
  <path d="M520 330q40 20 80-10" fill="none" stroke="${C.cream}" stroke-width="6" stroke-linecap="round" opacity=".7"/>
  <g fill="${C.coral}"><circle cx="360" cy="320" r="10"/></g>`,
  ),
  // 15 — Globo / Sul
  "15-globo-sul.svg": wrap(
    15,
    "#023e8a",
    "#00b4d8",
    `
  <circle cx="400" cy="225" r="170" fill="#0077b6" stroke="${C.cream}" stroke-width="8"/>
  <g fill="none" stroke="${C.cream}" stroke-width="3" opacity=".55"><ellipse cx="400" cy="225" rx="170" ry="60"/><ellipse cx="400" cy="225" rx="70" ry="170"/><path d="M230 225h340M400 55v340"/></g>
  <path d="M230 225h340a170 170 0 0 1-340 0z" fill="${C.gold}" opacity=".85"/>
  <g fill="${C.coral}"><circle cx="330" cy="300" r="9"/><circle cx="450" cy="330" r="9"/><circle cx="520" cy="270" r="9"/></g>
  <path d="M330 300L450 330 520 270" fill="none" stroke="${C.cream}" stroke-width="3" stroke-dasharray="6 6"/>`,
  ),
};

for (const [name, svg] of Object.entries(art))
  writeFileSync(join(dir, name), svg);
// favicon
writeFileSync(
  join(dir, "favicon.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#7b2d8e"/><g fill="none" stroke="#fff7ec" stroke-width="5" stroke-linecap="round"><circle cx="32" cy="26" r="12"/><path d="M32 38v16M24 47h16"/></g></svg>`,
);
console.log(`OK: ${Object.keys(art).length} ilustrações + favicon`);
