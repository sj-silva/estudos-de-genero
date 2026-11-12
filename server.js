import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Estudos de Gênero</h1><p>Servidor funcionando ...</p>");
});

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});
