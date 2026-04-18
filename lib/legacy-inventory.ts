export const legacyInventory = {
  files: [
    { path: "index.html", role: "conteúdo visual e estrutural" },
    { path: "styles.css", role: "design system legado" },
    { path: "script.js", role: "interatividade de navegação e scrollspy" },
    { path: "server.js", role: "servidor HTTP mínimo e fallback de arquivos" },
  ],
  keepAsReference: [
    "copy do hero",
    "listas de serviços",
    "cards de projetos",
    "descrição do sobre",
    "categorias de skills",
    "dados de contato",
  ],
  seedCandidates: [
    "brand mark e brand text",
    "nav links",
    "hero copy, stack e CTAs",
    "services cards",
    "projects cards",
    "about highlights e metrics",
    "skills categories",
    "contact info",
  ],
  discardCandidates: [
    "HTML estático como fonte de verdade",
    "servidor Node servindo arquivos diretamente",
    "JavaScript de scrollspy como regra principal de navegação",
  ],
  migrationRules: [
    "o conteúdo aprovado vira seed inicial",
    "imagens inexistentes viram placeholders de mídia até o storage estar pronto",
    "módulos que ainda não têm formulário admin ficam como stub funcional",
  ],
} as const;
