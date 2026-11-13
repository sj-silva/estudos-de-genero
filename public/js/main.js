// ---------- Tema claro/escuro ----------
const root = document.documentElement;
const btn = document.getElementById("themeToggle");

const syncIcon = () => {
  const dark = root.getAttribute("data-bs-theme") === "dark";
  btn.innerHTML = `<i class="bi ${dark ? "bi-sun" : "bi-moon-stars"}"></i>`;
};
syncIcon();

btn.addEventListener("click", () => {
  const next = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-bs-theme", next);
  try {
    localStorage.setItem("tema", next);
  } catch (e) {}
  syncIcon();
});

// ---------- Barra de progresso + botão "topo" (só nas seções) ----------
const bar = document.getElementById("progresso");
const topo = document.getElementById("topo");

if (bar) {
  const update = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + "%";
    topo.classList.toggle("d-none", scrollY < 600);
  };
  addEventListener("scroll", update, { passive: true });
  update();
  topo.addEventListener("click", () =>
    scrollTo({ top: 0, behavior: "smooth" }),
  );
}

// ---------- Busca e filtro (só na página inicial) ----------
const grade = document.getElementById("grade");

if (grade) {
  const cols = [...grade.querySelectorAll(".card-col")];
  const busca = document.getElementById("busca");
  const vazio = document.getElementById("semResultado");
  const filtros = document.getElementById("filtros");
  let tag = "todos";

  // Tira acentos e põe em minúsculas: "gênero" casa com "genero"
  const norm = (s) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const apply = () => {
    const q = norm(busca.value.trim());
    let n = 0;
    cols.forEach((c) => {
      const ok =
        (tag === "todos" || c.dataset.tag === tag) &&
        norm(c.dataset.text).includes(q);
      c.classList.toggle("d-none", !ok);
      if (ok) n++;
    });
    vazio.classList.toggle("d-none", n > 0);
  };

  busca.addEventListener("input", apply);

  filtros.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-tag]");
    if (!b) return;
    tag = b.dataset.tag;
    filtros.querySelectorAll("button").forEach((x) => {
      const on = x === b;
      x.classList.toggle("btn-primary", on);
      x.classList.toggle("btn-outline-primary", !on);
    });
    apply();
  });
}
