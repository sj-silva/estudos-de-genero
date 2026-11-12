import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const raw = readFileSync(join(__dirname, "texto.md"), "utf8");

// Troca espaços invisíveis e repetidos por um espaço simples
const clean = (s) =>
  s
    .replace(/[\u200b\u00a0]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Escapa caracteres que o HTML interpretaria como código
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const META = [
  {
    slug: "introducao-aos-estudos-de-genero",
    tag: "Fundamentos",
    img: "01-discurso.svg",
  },
  { slug: "bell-hooks", tag: "Pensadoras", img: "02-margem-centro.svg" },
  { slug: "pos-estruturalismo", tag: "Teoria", img: "03-fragmentos.svg" },
  { slug: "feminismo-e-marxismo", tag: "Teoria", img: "04-engrenagens.svg" },
  { slug: "feminismo-e-liberalismo", tag: "Teoria", img: "05-balanca.svg" },
  { slug: "primeira-onda", tag: "Ondas", img: "06-urna.svg" },
  { slug: "segunda-onda", tag: "Ondas", img: "07-megafone.svg" },
  { slug: "terceira-onda", tag: "Ondas", img: "08-interseccao.svg" },
  { slug: "quarta-onda", tag: "Ondas", img: "09-rede.svg" },
  {
    slug: "migracoes-e-fronteiras",
    tag: "Subjetividades",
    img: "10-fronteira.svg",
  },
  { slug: "epistemologia", tag: "Teoria", img: "11-olhar.svg" },
  {
    slug: "teoria-feminista-africana",
    tag: "Perspectivas do Sul",
    img: "12-padrao-africano.svg",
  },
  {
    slug: "pos-colonialismo",
    tag: "Perspectivas do Sul",
    img: "13-bussola.svg",
  },
  { slug: "mariama-ba", tag: "Perspectivas do Sul", img: "14-carta.svg" },
  { slug: "sul-global", tag: "Perspectivas do Sul", img: "15-globo-sul.svg" },
];

const TITLE_FIX = {
  "A Pimeira Onda Feminista": "A Primeira Onda Feminista",
  "Estudos de Gênero o Sul-Global": "Estudos de Gênero no Sul-Global",
  "Quarta Onda Feminista": "A Quarta Onda Feminista",
  "Feminismo e pós-colonialismo": "Feminismo e Pós-colonialismo",
};

const sections = [];
let current = null;

for (const line of raw.split("\n")) {
  const t = clean(line);
  if (!t) continue; // pula linhas vazias
  if (/^\d+\.$/.test(t)) continue; // pula o "6." solto

  const h = t.match(/^(\d+)\.\s+(.{3,})$/); // "N. Título"?
  if (h && t.length < 90) {
    const title = TITLE_FIX[h[2]] ?? h[2];
    current = { title, paragraphs: [] };
    sections.push(current);
  } else if (current) {
    current.paragraphs.push(t);
  }
}

const out = sections.map((s, i) => {
  const words = s.paragraphs.join(" ").split(" ").length;
  const first = s.paragraphs[0] ?? "";
  const excerpt =
    first.length > 230
      ? first.slice(0, 230).replace(/\s+\S*$/, "") + "…"
      : first;

  return {
    number: i + 1, // renumera de 1 a 15
    ...META[i], // slug, tag, img
    title: s.title,
    excerpt,
    words,
    minutes: Math.max(1, Math.round(words / 200)), // ~200 palavras por minuto
    paragraphs: s.paragraphs.map(esc),
  };
});

writeFileSync(
  join(__dirname, "..", "data", "sections.json"),
  JSON.stringify(out, null, 2),
);
console.log(
  `OK: ${out.length} seções, ${out.reduce((a, s) => a + s.words, 0)} palavras.`,
);
