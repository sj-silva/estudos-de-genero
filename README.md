# Estudos de Gênero

Site educacional sobre **estudos de gênero e teorias feministas**, construído com Node.js, Express, EJS e Bootstrap 5. O conteúdo reúne textos sobre as ondas do feminismo, a relação do feminismo com o marxismo, o liberalismo e o pós-estruturalismo, epistemologia feminista, teoria feminista africana, pós-colonialismo e estudos de gênero no Sul-Global.

## Tecnologias

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Express](https://expressjs.com/): servidor e rotas
- [EJS](https://ejs.co/): templates renderizados no servidor
- [Bootstrap 5](https://getbootstrap.com/) e Bootstrap Icons: layout e componentes
- [Helmet](https://helmetjs.github.io/) e [compression](https://github.com/expressjs/compression): segurança e desempenho

## Como rodar

```bash
git clone https://github.com/sj-silva/estudos-de-genero.git
cd estudos-de-genero
npm install
npm start
```

Acesse http://localhost:3000.

Para desenvolvimento, com reinício automático ao salvar arquivos:

```bash
npm run dev
```

Para usar outra porta:

```bash
PORT=8080 npm start
```

No Windows (PowerShell): `$env:PORT=8080; npm start`.

## Estrutura do projeto

```
estudos-de-genero/
├── server.js              # servidor Express, middlewares e rotas
├── package.json
├── data/
│   └── sections.json      # as seções do texto em formato JSON
├── views/
│   ├── index.ejs          # página inicial
│   ├── secao.ejs          # página de cada tema
│   ├── 404.ejs            # página não encontrada
│   └── partials/          # cabeçalho e rodapé reutilizáveis
└── public/
    ├── css/               # estilos próprios
    ├── js/                # JavaScript do navegador
    └── img/               # ilustrações
```

## Rotas

| Rota           | Descrição                           |
| -------------- | ----------------------------------- |
| `/`            | Página inicial com a lista de temas |
| `/secao/:slug` | Leitura de um tema específico       |
| qualquer outra | Página 404                          |

## Estrutura dos dados

Cada seção em `data/sections.json` segue este formato:

```json
{
  "number": 1,
  "slug": "introducao-aos-estudos-de-genero",
  "title": "Introdução aos Estudos de Gênero",
  "tag": "Fundamentos",
  "img": "01-discurso.svg",
  "excerpt": "Resumo exibido no card…",
  "minutes": 6,
  "paragraphs": ["Primeiro parágrafo…", "Segundo parágrafo…"]
}
```

Para acrescentar ou alterar um tema, edite esse arquivo e reinicie o servidor (no modo `npm run dev` isso acontece sozinho).

## Roteiro de desenvolvimento

- [x] Passo 1: base do projeto e servidor Express
- [ ] Passo 2: arquivos estáticos e Bootstrap
- [ ] Passo 3: views e partials com EJS
- [ ] Passo 4: dados em JSON
- [ ] Passo 5: rotas
- [ ] Passo 6: páginas completas (cards e artigo)
- [ ] Passo 7: CSS e JavaScript do cliente
- [ ] Passo 8: ilustrações SVG
- [ ] Passo 9: segurança, desempenho e publicação

## Licença

Defina aqui a licença. O código pode usar uma licença aberta (por exemplo, MIT), mas o texto do conteúdo pertence ao autor e só deve ser reutilizado com autorização.

## Autoria

Textos de **Meyre Silva** ([@meyresilva](https://github.com/meyresilva)).
