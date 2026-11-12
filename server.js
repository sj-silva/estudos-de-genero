import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

const site = {
  title: "Estudos de Gênero",
  subtitle:
    "Teorias feministas, ondas, epistemologias e perspectivas do Sul-Global",
};

app.set("view engine", "ejs");
app.set("views", join(__dirname, "views"));

const sections = JSON.parse(
  readFileSync(join(__dirname, "data", "sections.json"), "utf8"),
);
const bySlug = new Map(sections.map((s) => [s.slug, s])); // NOVO (5.2)

app.use(
  "/vendor/bootstrap",
  express.static(join(__dirname, "node_modules/bootstrap/dist")),
);
app.use(
  "/vendor/icons",
  express.static(join(__dirname, "node_modules/bootstrap-icons/font")),
);
app.use(express.static(join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.sections = sections; // NOVO
  res.locals.path = req.path;
  next();
});

// NOVO: rota da página inicial (volta do Passo 3)
app.get("/", (req, res) => {
  res.render("index", {
    page: {
      title: `${site.title} · Teorias Feministas`,
      description: site.subtitle,
    },
  });
});

app.get("/secao/:slug", (req, res, next) => {
  const section = bySlug.get(req.params.slug);
  if (!section) return next(); // não achou: passa para o 404

  const i = sections.indexOf(section);
  res.render("secao", {
    page: {
      title: `${section.title} · ${site.title}`,
      description: section.excerpt,
    },
    section,
    prev: sections[i - 1] ?? null,
    next: sections[i + 1] ?? null,
  });
});

// O 404 sempre por último
app.use((req, res) => {
  res.status(404).render("404", {
    page: { title: `Página não encontrada · ${site.title}`, description: "" },
  });
});

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});