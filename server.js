import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

// Arquivos do Bootstrap, servidos direto do node_modules
app.use(
  "/vendor/bootstrap",
  express.static(join(__dirname, "node_modules/bootstrap/dist")),
);
app.use(
  "/vendor/icons",
  express.static(join(__dirname, "node_modules/bootstrap-icons/font")),
);

// Nossos próprios arquivos (css, js, img)
app.use(express.static(join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("<h1>Estudos de Gênero</h1><p>Servidor funcionando!</p>");
});

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});
