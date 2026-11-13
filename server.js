import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync } from "node:fs";
import helmet from "helmet";
import compression from "compression";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const SITE_URL = (process.env.SITE_URL || `http://localhost:${PORT}`).replace(
  /\/$/,
  "",
);

const site = {
  title: "Estudos de Gênero",
  subtitle:
    "Teorias feministas, ondas, epistemologias e perspectivas do Sul-Global",
};

app.disable("x-powered-by");
app.use(helmet());
app.use(compression());

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

app.use(
  express.static(join(__dirname, "public"), {
    maxAge: process.env.NODE_ENV === "production" ? "7d" : 0,
  }),
);

app.use((req, res, next) => {
  res.locals.site = site;
  res.locals.sections = sections;
  res.locals.path = req.path;
  res.locals.siteUrl = SITE_URL;
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

app.get("/sobre", (req, res) => {
  res.render("sobre", {
    page: {
      title: `Sobre · ${site.title}`,
      description:
        "Sobre o projeto, a autoria dos textos e as tecnologias do site.",
    },
  });
});

app.get("/robots.txt", (req, res) => {
  res
    .type("text/plain")
    .send(`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
});

app.get("/sitemap.xml", (req, res) => {
  const urls = ["/", "/sobre", ...sections.map((s) => `/secao/${s.slug}`)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE_URL}${u}</loc></url>`).join("\n")}
</urlset>`;
  res.type("application/xml").send(xml);
});

// O 404 sempre por último
app.use((req, res) => {
  res.status(404).render("404", {
    page: { title: `Página não encontrada · ${site.title}`, description: "" },
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).render("erro", {
    page: { title: `Erro · ${site.title}`, description: "" },
  });
});

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});
