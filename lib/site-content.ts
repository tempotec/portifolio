export type NavLink = {
  label: string;
  href: string;
};

export type HeroSignal = {
  label: string;
  value: string;
};

export type ServiceCard = {
  title: string;
  description: string;
  tags: string[];
};

export type ProjectCard = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  featured: boolean;
  tone: "blue" | "violet" | "green";
};

export type SkillCategory = {
  title: string;
  items: string[];
};

export const siteContent = {
  brand: {
    mark: "RG",
    text: "Renan Gomes",
  },
  seo: {
    title: "Renan Gomes | Portfólio",
    description:
      "Portfólio de Renan Gomes, desenvolvedor de software focado em automação, integrações e IA aplicada.",
  },
  navLinks: [
    { label: "Início", href: "#inicio" },
    { label: "Projetos", href: "#projetos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Skills", href: "#skills" },
    { label: "Contato", href: "#contato" },
  ] satisfies NavLink[],
  hero: {
    eyebrow: "Olá, eu sou Renan Gomes",
    titleLead: "Desenvolvedor de Software focado em",
    titleAccent: "Automação, Integrações e IA",
    description:
      "Desenvolvo aplicações web, automações de processos e soluções digitais com foco em integração de sistemas e resolução de problemas reais.",
    stack: ["Automação", "Integrações", "IA aplicada"],
    cta: {
      primary: { text: "Ver projetos", href: "#projetos" },
      secondary: { text: "Contato", href: "#contato" },
    },
    status: "Disponível para projetos de automação e produtos digitais",
    profileTitle: "Software Developer",
    profileSubtitle: "Arquitetura prática para soluções com impacto real",
    signals: [
      { label: "Automação", value: "Fluxos confiáveis" },
      { label: "Integrações", value: "APIs e sistemas" },
      { label: "IA aplicada", value: "Produtos inteligentes" },
    ] satisfies HeroSignal[],
    terminalLines: [
      "arquitetura orientada a resultado",
      "foco em confiabilidade operacional",
      "experiências web limpas e responsivas",
    ],
    social: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/renangomes" },
      { label: "GitHub", href: "https://github.com/renangomes" },
      { label: "Email", href: "mailto:renan.gomes@seudominio.com" },
    ],
  },
  services: {
    kicker: "Áreas de atuação",
    title: "Soluções que desenvolvo com foco em eficiência, automação e integração",
    cards: [
      {
        title: "Automação de Processos",
        description:
          "Desenvolvimento de rotinas e fluxos automatizados para reduzir tarefas manuais, aumentar confiabilidade e melhorar produtividade.",
        tags: ["Python", "Automação", "Eficiência"],
      },
      {
        title: "Integração de Sistemas",
        description:
          "Criação de integrações entre APIs, serviços e sistemas externos para centralizar dados e otimizar operações.",
        tags: ["APIs REST", "Node.js", "Integrações"],
      },
      {
        title: "Aplicações Web",
        description:
          "Construção de interfaces e sistemas web responsivos, organizados e voltados para problemas reais.",
        tags: ["React", "JavaScript", "TypeScript"],
      },
      {
        title: "Soluções com IA",
        description:
          "Desenvolvimento de produtos e funcionalidades com inteligência artificial aplicada, análise de dados e automação inteligente.",
        tags: ["IA aplicada", "Machine Learning", "Dados"],
      },
    ] satisfies ServiceCard[],
  },
  about: {
    kicker: "Sobre mim",
    title: "Construindo produtos digitais com clareza técnica e visão prática",
    description:
      "Sou desenvolvedor de software com experiência em automação, integrações, aplicações web e soluções com inteligência artificial. Atuo na criação de produtos digitais práticos, com foco em confiabilidade, organização e resolução de problemas reais.",
    highlights: [
      "Entender o problema e o contexto",
      "Construir soluções práticas e escaláveis",
      "Entregar com foco em qualidade e impacto",
    ],
    metrics: [
      { value: "2+", label: "anos de experiência" },
      { value: "10+", label: "projetos desenvolvidos" },
      { value: "Real", label: "foco em soluções reais" },
    ],
  },
  projects: {
    kicker: "Projetos em destaque",
    title: "Alguns trabalhos e soluções desenvolvidos com foco em automação, integração e impacto prático",
    cards: [
      {
        slug: "tutor-educacional-com-ia",
        eyebrow: "Projeto 01",
        title: "Tutor educacional com IA",
        description:
          "Solução voltada ao apoio educacional de alunos, utilizando inteligência artificial para criar uma experiência digital com potencial de impacto social e educacional.",
        tags: ["Python", "APIs", "IA"],
        featured: true,
        tone: "blue",
      },
      {
        slug: "analise-de-video-para-varejo",
        eyebrow: "Projeto 02",
        title: "Análise de vídeo para varejo",
        description:
          "Sistema para geração de indicadores como fluxo de pessoas e áreas mais visitadas a partir de câmeras de segurança, apoiando decisões operacionais e de layout.",
        tags: ["Visão computacional", "Análise de dados", "Integrações"],
        featured: true,
        tone: "violet",
      },
      {
        slug: "automacoes-e-integracoes-de-processos",
        eyebrow: "Projeto 03",
        title: "Automações e integrações de processos",
        description:
          "Desenvolvimento de rotinas para reduzir trabalho manual, tratar erros com confiabilidade e integrar dados com sistemas externos.",
        tags: ["Python", "JavaScript", "APIs REST"],
        featured: true,
        tone: "green",
      },
    ] satisfies ProjectCard[],
  },
  skills: {
    kicker: "Skills",
    title: "Tecnologias e conhecimentos que utilizo no desenvolvimento de soluções",
    categories: [
      { title: "Linguagens", items: ["Python", "JavaScript", "TypeScript"] },
      { title: "Front-end", items: ["React", "React Native", "HTML", "CSS"] },
      { title: "Back-end e APIs", items: ["Node.js", "APIs REST", "Integrações"] },
      {
        title: "Outros conhecimentos",
        items: ["Git", "GitHub", "Automação", "IA aplicada", "Visão computacional", "Análise de dados"],
      },
    ] satisfies SkillCategory[],
  },
  contact: {
    kicker: "Contato",
    title: "Vamos conversar sobre projetos, oportunidades ou soluções digitais",
    description:
      "Estou disponível para discutir novos produtos, integrações, automações e iniciativas com inteligência artificial aplicada.",
    info: [
      { label: "Email", value: "renan.gomes@seudominio.com", href: "mailto:renan.gomes@seudominio.com" },
      { label: "LinkedIn", value: "linkedin.com/in/renangomes", href: "https://www.linkedin.com/in/renangomes" },
      { label: "GitHub", value: "github.com/renangomes", href: "https://github.com/renangomes" },
    ],
  },
  footer: {
    copy: "© 2026. Todos os direitos reservados.",
  },
} as const;

export type SiteContent = typeof siteContent;
