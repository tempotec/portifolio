import { prisma } from "@/lib/prisma";
import { siteContent } from "@/lib/site-content";

export const editorialStatuses = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;
export type EditorialStatus = (typeof editorialStatuses)[number];

export const projectTones = ["blue", "violet", "green"] as const;
export type ProjectTone = (typeof projectTones)[number];

export type LabelValue = {
  label: string;
  value: string;
};

export type LinkItem = {
  label: string;
  href: string;
};

export type HeroView = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  stack: string[];
  cta: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
    };
  };
  status: string;
  profileTitle: string;
  profileSubtitle: string;
  signals: LabelValue[];
  terminalLines: string[];
  social: LinkItem[];
};

export type EditableHero = HeroView & {
  statusValue: EditorialStatus;
};

export type PublicServiceCard = {
  title: string;
  description: string;
  tags: string[];
};

export type EditableService = PublicServiceCard & {
  id: string;
  slug: string;
  sortOrder: number;
  statusValue: EditorialStatus;
  publishedAt: string | null;
};

export type PublicProjectCard = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  featured: boolean;
  tone: ProjectTone;
};

export type ProjectDetailView = PublicProjectCard & {
  summary: string | null;
  stack: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  status: EditorialStatus;
  publishedAt: string | null;
};

export type EditableProject = {
  id: string;
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  stack: string[];
  featured: boolean;
  sortOrder: number;
  liveUrl: string;
  repoUrl: string;
  statusValue: EditorialStatus;
  publishedAt: string | null;
};

export type PublicHomeContent = {
  brand: typeof siteContent.brand;
  navLinks: typeof siteContent.navLinks;
  hero: HeroView;
  services: {
    kicker: string;
    title: string;
    cards: PublicServiceCard[];
  };
  about: AboutView;
  projects: {
    kicker: string;
    title: string;
    cards: PublicProjectCard[];
  };
  skills: {
    kicker: string;
    title: string;
    categories: SkillCategoryView[];
  };
  contact: ContactView;
  footer: typeof siteContent.footer;
};

export type AboutMetric = {
  label: string;
  value: string;
};

export type AboutView = {
  kicker: string;
  title: string;
  description: string;
  highlights: string[];
  metrics: AboutMetric[];
  status: string;
};

export type EditableAbout = AboutView & {
  statusValue: EditorialStatus;
};

export type SkillItemView = {
  id: string;
  title: string;
  level: string;
  sortOrder: number;
  statusValue: EditorialStatus;
};

export type SkillCategoryView = {
  id: string;
  slug: string;
  title: string;
  sortOrder: number;
  statusValue: EditorialStatus;
  items: SkillItemView[];
};

export type EditableSkillCategory = SkillCategoryView;

export type ContactInfoItem = {
  label: string;
  value: string;
  href: string;
};

export type ContactView = {
  kicker: string;
  title: string;
  description: string;
  info: ContactInfoItem[];
  social: ContactInfoItem[];
  status: string;
};

export type EditableContact = ContactView & {
  statusValue: EditorialStatus;
};

type HeroRecordLike = {
  id: string;
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  stackJson: string;
  signalsJson: string;
  ctaPrimaryText: string;
  ctaPrimaryHref: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
  status: string;
  profileTitle: string;
  profileSubtitle: string;
  terminalLinesJson: string;
  socialLinksJson: string;
};

type ServiceRecordLike = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tagsJson: string;
  sortOrder: number;
  status: string;
  publishedAt: Date | null;
};

type ProjectRecordLike = {
  id: string;
  slug: string;
  eyebrow: string;
  title: string;
  summary: string | null;
  description: string;
  featured: boolean;
  sortOrder: number;
  stackJson: string;
  tagsJson: string;
  liveUrl: string | null;
  repoUrl: string | null;
  status: string;
  publishedAt: Date | null;
};

type AboutRecordLike = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  highlightsJson: string;
  metricsJson: string;
  status: string;
};

type SkillItemRecordLike = {
  id: string;
  categoryId: string;
  title: string;
  level: string | null;
  sortOrder: number;
  status: string;
};

type SkillCategoryRecordLike = {
  id: string;
  slug: string;
  title: string;
  sortOrder: number;
  status: string;
  items: SkillItemRecordLike[];
};

type ContactRecordLike = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  infoJson: string;
  socialJson: string;
  status: string;
};

export type HeroFormInput = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  stack: string[];
  signals: LabelValue[];
  ctaPrimaryText: string;
  ctaPrimaryHref: string;
  ctaSecondaryText: string;
  ctaSecondaryHref: string;
  status: EditorialStatus;
  profileTitle: string;
  profileSubtitle: string;
  terminalLines: string[];
  social: LinkItem[];
};

export type ProjectFormInput = {
  id?: string;
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  stack: string[];
  featured: boolean;
  sortOrder: number;
  liveUrl: string;
  repoUrl: string;
  status: EditorialStatus;
};

export type ServiceFormInput = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
  sortOrder: number;
  status: EditorialStatus;
};

export type AboutFormInput = {
  kicker: string;
  title: string;
  description: string;
  highlights: string[];
  metrics: AboutMetric[];
  status: EditorialStatus;
};

export type SkillCategoryFormInput = {
  id?: string;
  slug: string;
  title: string;
  sortOrder: number;
  status: EditorialStatus;
};

export type SkillItemFormInput = {
  id?: string;
  categoryId: string;
  title: string;
  level: string;
  sortOrder: number;
  status: EditorialStatus;
};

export type ContactFormInput = {
  kicker: string;
  title: string;
  description: string;
  info: ContactInfoItem[];
  social: ContactInfoItem[];
  status: EditorialStatus;
};

function parseJsonArray<T>(value: string | null | undefined, fallback: T[]): T[] {
  if (!value) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    if (Array.isArray(parsed)) {
      return parsed as T[];
    }
  } catch {
    return fallback;
  }

  return fallback;
}

function stringifyJsonArray(value: unknown[]) {
  return JSON.stringify(value);
}

export function normalizeLines(value: string | null | undefined) {
  return (value ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function joinLines(values: string[]) {
  return values.join("\n");
}

export function parseLabelValueLines(value: string | null | undefined, separator = "|") {
  return normalizeLines(value)
    .map((line) => {
      const [label, ...rest] = line.split(separator);
      const mergedValue = rest.join(separator).trim();

      if (!label?.trim() || !mergedValue) {
        return null;
      }

      return {
        label: label.trim(),
        value: mergedValue,
      } satisfies LabelValue;
    })
    .filter((item): item is LabelValue => item !== null);
}

export function joinLabelValueLines(items: LabelValue[], separator = "|") {
  return items.map((item) => `${item.label}${separator}${item.value}`).join("\n");
}

export function parseKeyValueLines(value: string | null | undefined, separator = "|") {
  return normalizeLines(value)
    .map((line) => {
      const [label, ...rest] = line.split(separator);
      const mergedValue = rest.join(separator).trim();

      if (!label?.trim() || !mergedValue) {
        return null;
      }

      return {
        label: label.trim(),
        value: mergedValue,
      } satisfies AboutMetric;
    })
    .filter((item): item is AboutMetric => item !== null);
}

export function joinKeyValueLines(items: AboutMetric[], separator = "|") {
  return items.map((item) => `${item.label}${separator}${item.value}`).join("\n");
}

export function parseContactInfoLines(value: string | null | undefined) {
  return normalizeLines(value)
    .map((line) => {
      const [label, href, ...rest] = line.split("|");
      const valueText = rest.length > 0 ? [href, ...rest].join("|").trim() : href?.trim();

      if (!label?.trim() || !valueText) {
        return null;
      }

      return {
        label: label.trim(),
        value: valueText,
        href: valueText,
      } satisfies ContactInfoItem;
    })
    .filter((item): item is ContactInfoItem => item !== null);
}

export function joinContactInfoLines(items: ContactInfoItem[]) {
  return items.map((item) => `${item.label}|${item.href}`).join("\n");
}

function toEditorialStatus(value: string | null | undefined, fallback: EditorialStatus = "DRAFT"): EditorialStatus {
  return editorialStatuses.includes(value as EditorialStatus) ? (value as EditorialStatus) : fallback;
}

function toProjectTone(index: number): ProjectTone {
  return projectTones[index % projectTones.length];
}

export function normalizeSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

function resolveHumanStatus(status: string) {
  return status === "PUBLISHED" ? siteContent.hero.status : "Conteudo editorial em revisao";
}

function mapHeroRecord(record: HeroRecordLike | null): HeroView {
  if (!record) {
    return {
      eyebrow: siteContent.hero.eyebrow,
      titleLead: siteContent.hero.titleLead,
      titleAccent: siteContent.hero.titleAccent,
      description: siteContent.hero.description,
      stack: [...siteContent.hero.stack],
      cta: {
        primary: { ...siteContent.hero.cta.primary },
        secondary: { ...siteContent.hero.cta.secondary },
      },
      status: siteContent.hero.status,
      profileTitle: siteContent.hero.profileTitle,
      profileSubtitle: siteContent.hero.profileSubtitle,
      signals: [...siteContent.hero.signals],
      terminalLines: [...siteContent.hero.terminalLines],
      social: [...siteContent.hero.social],
    };
  }

  return {
    eyebrow: record.eyebrow,
    titleLead: record.titleLead,
    titleAccent: record.titleAccent,
    description: record.description,
    stack: parseJsonArray(record.stackJson, [...siteContent.hero.stack]),
    cta: {
      primary: {
        text: record.ctaPrimaryText,
        href: record.ctaPrimaryHref,
      },
      secondary: {
        text: record.ctaSecondaryText,
        href: record.ctaSecondaryHref,
      },
    },
    status: resolveHumanStatus(record.status),
    profileTitle: record.profileTitle,
    profileSubtitle: record.profileSubtitle,
    signals: parseJsonArray(record.signalsJson, [...siteContent.hero.signals]),
    terminalLines: parseJsonArray(record.terminalLinesJson, [...siteContent.hero.terminalLines]),
    social: parseJsonArray(record.socialLinksJson, [...siteContent.hero.social]),
  };
}

function mapServiceRecord(record: ServiceRecordLike): EditableService {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    description: record.description,
    tags: parseJsonArray(record.tagsJson, []),
    sortOrder: record.sortOrder,
    statusValue: toEditorialStatus(record.status),
    publishedAt: record.publishedAt ? record.publishedAt.toISOString() : null,
  };
}

function mapServiceToPublicCard(record: ServiceRecordLike): PublicServiceCard {
  return {
    title: record.title,
    description: record.description,
    tags: parseJsonArray(record.tagsJson, []),
  };
}

function mapProjectRecord(record: ProjectRecordLike): EditableProject {
  return {
    id: record.id,
    slug: record.slug,
    eyebrow: record.eyebrow,
    title: record.title,
    summary: record.summary ?? "",
    description: record.description,
    tags: parseJsonArray(record.tagsJson, []),
    stack: parseJsonArray(record.stackJson, []),
    featured: record.featured,
    sortOrder: record.sortOrder,
    liveUrl: record.liveUrl ?? "",
    repoUrl: record.repoUrl ?? "",
    statusValue: toEditorialStatus(record.status),
    publishedAt: record.publishedAt ? record.publishedAt.toISOString() : null,
  };
}

function mapProjectToPublicCard(record: ProjectRecordLike, tone: ProjectTone): PublicProjectCard {
  return {
    slug: record.slug,
    eyebrow: record.eyebrow,
    title: record.title,
    description: record.summary ?? record.description,
    tags: parseJsonArray(record.tagsJson, []),
    featured: record.featured,
    tone,
  };
}

function mapProjectToDetail(record: ProjectRecordLike, tone: ProjectTone): ProjectDetailView {
  return {
    slug: record.slug,
    eyebrow: record.eyebrow,
    title: record.title,
    description: record.description,
    summary: record.summary,
    tags: parseJsonArray(record.tagsJson, []),
    stack: parseJsonArray(record.stackJson, []),
    featured: record.featured,
    tone,
    liveUrl: record.liveUrl,
    repoUrl: record.repoUrl,
    status: toEditorialStatus(record.status),
    publishedAt: record.publishedAt ? record.publishedAt.toISOString() : null,
  };
}

function mapAboutRecord(record: AboutRecordLike | null): AboutView {
  if (!record) {
    return {
      kicker: siteContent.about.kicker,
      title: siteContent.about.title,
      description: siteContent.about.description,
      highlights: [...siteContent.about.highlights],
      metrics: siteContent.about.metrics.map((metric) => ({ ...metric })),
      status: "Conteudo editorial em revisao",
    };
  }

  return {
    kicker: record.kicker,
    title: record.title,
    description: record.description,
    highlights: parseJsonArray(record.highlightsJson, [...siteContent.about.highlights]),
    metrics: parseJsonArray(record.metricsJson, [...siteContent.about.metrics]),
    status: resolveHumanStatus(record.status),
  };
}

function mapSkillCategoryRecord(record: SkillCategoryRecordLike): SkillCategoryView {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    sortOrder: record.sortOrder,
    statusValue: toEditorialStatus(record.status),
    items: record.items
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map((item) => ({
        id: item.id,
        title: item.title,
        level: item.level ?? "",
        sortOrder: item.sortOrder,
        statusValue: toEditorialStatus(item.status),
      })),
  };
}

function mapContactRecord(record: ContactRecordLike | null): ContactView {
  if (!record) {
    return {
      kicker: siteContent.contact.kicker,
      title: siteContent.contact.title,
      description: siteContent.contact.description,
      info: siteContent.contact.info.map((item) => ({ ...item })),
      social: siteContent.hero.social.map((item) => ({
        label: item.label,
        value: item.href,
        href: item.href,
      })),
      status: "Conteudo editorial em revisao",
    };
  }

  return {
    kicker: record.kicker,
    title: record.title,
    description: record.description,
    info: parseJsonArray(record.infoJson, [...siteContent.contact.info]),
    social: parseJsonArray(record.socialJson, siteContent.hero.social.map((item) => ({
      label: item.label,
      value: item.href,
      href: item.href,
    }))),
    status: resolveHumanStatus(record.status),
  };
}

export function readHeroFormData(formData: FormData): HeroFormInput {
  return {
    eyebrow: String(formData.get("eyebrow") ?? "").trim(),
    titleLead: String(formData.get("titleLead") ?? "").trim(),
    titleAccent: String(formData.get("titleAccent") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    stack: normalizeLines(String(formData.get("stack") ?? "")),
    signals: parseLabelValueLines(String(formData.get("signals") ?? "")),
    ctaPrimaryText: String(formData.get("ctaPrimaryText") ?? "").trim(),
    ctaPrimaryHref: String(formData.get("ctaPrimaryHref") ?? "").trim(),
    ctaSecondaryText: String(formData.get("ctaSecondaryText") ?? "").trim(),
    ctaSecondaryHref: String(formData.get("ctaSecondaryHref") ?? "").trim(),
    status: toEditorialStatus(String(formData.get("status") ?? "DRAFT")),
    profileTitle: String(formData.get("profileTitle") ?? "").trim(),
    profileSubtitle: String(formData.get("profileSubtitle") ?? "").trim(),
    terminalLines: normalizeLines(String(formData.get("terminalLines") ?? "")),
    social: parseLabelValueLines(String(formData.get("social") ?? ""), "|").map((item) => ({
      label: item.label,
      href: item.value,
    })),
  };
}

export function readProjectFormData(formData: FormData): ProjectFormInput {
  return {
    id: String(formData.get("id") ?? "").trim() || undefined,
    slug: normalizeSlug(String(formData.get("slug") ?? "")),
    eyebrow: String(formData.get("eyebrow") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    tags: normalizeLines(String(formData.get("tags") ?? "")),
    stack: normalizeLines(String(formData.get("stack") ?? "")),
    featured: formData.get("featured") === "on",
    sortOrder: Number.parseInt(String(formData.get("sortOrder") ?? "0"), 10) || 0,
    liveUrl: String(formData.get("liveUrl") ?? "").trim(),
    repoUrl: String(formData.get("repoUrl") ?? "").trim(),
    status: toEditorialStatus(String(formData.get("status") ?? "DRAFT")),
  };
}

export function readServiceFormData(formData: FormData): ServiceFormInput {
  const title = String(formData.get("title") ?? "").trim();

  return {
    id: String(formData.get("id") ?? "").trim() || undefined,
    slug: normalizeSlug(String(formData.get("slug") ?? title)),
    title,
    description: String(formData.get("description") ?? "").trim(),
    tags: normalizeLines(String(formData.get("tags") ?? "")),
    sortOrder: Number.parseInt(String(formData.get("sortOrder") ?? "0"), 10) || 0,
    status: toEditorialStatus(String(formData.get("status") ?? "DRAFT")),
  };
}

export function readAboutFormData(formData: FormData): AboutFormInput {
  return {
    kicker: String(formData.get("kicker") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    highlights: normalizeLines(String(formData.get("highlights") ?? "")),
    metrics: parseKeyValueLines(String(formData.get("metrics") ?? "")),
    status: toEditorialStatus(String(formData.get("status") ?? "DRAFT")),
  };
}

export function readSkillCategoryFormData(formData: FormData): SkillCategoryFormInput {
  return {
    id: String(formData.get("id") ?? "").trim() || undefined,
    slug: normalizeSlug(String(formData.get("slug") ?? "")),
    title: String(formData.get("title") ?? "").trim(),
    sortOrder: Number.parseInt(String(formData.get("sortOrder") ?? "0"), 10) || 0,
    status: toEditorialStatus(String(formData.get("status") ?? "DRAFT")),
  };
}

export function readSkillItemFormData(formData: FormData): SkillItemFormInput {
  return {
    id: String(formData.get("id") ?? "").trim() || undefined,
    categoryId: String(formData.get("categoryId") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    level: String(formData.get("level") ?? "").trim(),
    sortOrder: Number.parseInt(String(formData.get("sortOrder") ?? "0"), 10) || 0,
    status: toEditorialStatus(String(formData.get("status") ?? "DRAFT")),
  };
}

export function readContactFormData(formData: FormData): ContactFormInput {
  return {
    kicker: String(formData.get("kicker") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    info: parseContactInfoLines(String(formData.get("info") ?? "")),
    social: parseContactInfoLines(String(formData.get("social") ?? "")),
    status: toEditorialStatus(String(formData.get("status") ?? "DRAFT")),
  };
}

export async function getEditableHeroSection(): Promise<EditableHero> {
  const hero = await prisma.heroSection.findFirst({
    where: { singletonKey: "hero" },
  });

  const fallback = mapHeroRecord(null);

  if (!hero) {
    return {
      ...fallback,
      statusValue: "DRAFT",
    };
  }

  return {
    ...mapHeroRecord(hero),
    statusValue: toEditorialStatus(hero.status),
  };
}

export async function getPublishedHeroSection(): Promise<HeroView> {
  const hero = await prisma.heroSection.findFirst({
    where: {
      singletonKey: "hero",
      status: "PUBLISHED",
    },
  });

  return mapHeroRecord(hero ?? null);
}

export async function upsertHeroSection(input: HeroFormInput) {
  return prisma.heroSection.upsert({
    where: { singletonKey: "hero" },
    update: {
      eyebrow: input.eyebrow,
      titleLead: input.titleLead,
      titleAccent: input.titleAccent,
      description: input.description,
      stackJson: stringifyJsonArray(input.stack),
      signalsJson: stringifyJsonArray(input.signals),
      ctaPrimaryText: input.ctaPrimaryText,
      ctaPrimaryHref: input.ctaPrimaryHref,
      ctaSecondaryText: input.ctaSecondaryText,
      ctaSecondaryHref: input.ctaSecondaryHref,
      status: input.status,
      profileTitle: input.profileTitle,
      profileSubtitle: input.profileSubtitle,
      terminalLinesJson: stringifyJsonArray(input.terminalLines),
      socialLinksJson: stringifyJsonArray(input.social),
    },
    create: {
      singletonKey: "hero",
      eyebrow: input.eyebrow,
      titleLead: input.titleLead,
      titleAccent: input.titleAccent,
      description: input.description,
      stackJson: stringifyJsonArray(input.stack),
      signalsJson: stringifyJsonArray(input.signals),
      ctaPrimaryText: input.ctaPrimaryText,
      ctaPrimaryHref: input.ctaPrimaryHref,
      ctaSecondaryText: input.ctaSecondaryText,
      ctaSecondaryHref: input.ctaSecondaryHref,
      status: input.status,
      profileTitle: input.profileTitle,
      profileSubtitle: input.profileSubtitle,
      terminalLinesJson: stringifyJsonArray(input.terminalLines),
      socialLinksJson: stringifyJsonArray(input.social),
    },
  });
}

export async function listAdminServices(): Promise<EditableService[]> {
  const services = await prisma.service.findMany({
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return services.map((service) => ({
    id: service.id,
    slug: service.slug,
    title: service.title,
    description: service.description,
    tags: parseJsonArray(service.tagsJson, []),
    sortOrder: service.sortOrder,
    statusValue: toEditorialStatus(service.status),
    publishedAt: service.publishedAt ? service.publishedAt.toISOString() : null,
  }));
}

export async function listPublishedServices(): Promise<PublicServiceCard[]> {
  const services = await prisma.service.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  if (services.length === 0) {
    return [...siteContent.services.cards];
  }

  return services.map((service) => mapServiceToPublicCard(service));
}

export async function upsertService(input: ServiceFormInput) {
  const payload = {
    slug: input.slug || normalizeSlug(input.title),
    title: input.title,
    description: input.description,
    tagsJson: stringifyJsonArray(input.tags),
    sortOrder: input.sortOrder,
    status: input.status,
  };

  if (input.id) {
    return prisma.service.update({
      where: { id: input.id },
      data: payload,
    });
  }

  return prisma.service.upsert({
    where: { slug: payload.slug },
    update: payload,
    create: payload,
  });
}

export async function deleteService(id: string) {
  return prisma.service.delete({
    where: { id },
  });
}

export async function listAdminProjects(): Promise<EditableProject[]> {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return projects.map((project) => mapProjectRecord(project));
}

export async function listPublishedProjects(): Promise<PublicProjectCard[]> {
  const projects = await prisma.project.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  if (projects.length === 0) {
    return [...siteContent.projects.cards];
  }

  return projects.map((project, index) => mapProjectToPublicCard(project, toProjectTone(index)));
}

export async function getPublishedProjectBySlug(slug: string): Promise<ProjectDetailView | null> {
  const project = await prisma.project.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
  });

  if (project) {
    return mapProjectToDetail(project, toProjectTone(0));
  }

  const fallback = siteContent.projects.cards.find((item) => item.slug === slug);

  if (!fallback) {
    return null;
  }

  return {
    slug: fallback.slug,
    eyebrow: fallback.eyebrow,
    title: fallback.title,
    description: fallback.description,
    summary: null,
    tags: [...fallback.tags],
    stack: [...fallback.tags],
    featured: fallback.featured,
    tone: fallback.tone,
    liveUrl: null,
    repoUrl: null,
    status: "PUBLISHED",
    publishedAt: null,
  };
}

export async function upsertProject(input: ProjectFormInput) {
  const payload = {
    slug: input.slug || normalizeSlug(input.title),
    eyebrow: input.eyebrow,
    title: input.title,
    summary: input.summary || null,
    description: input.description,
    tagsJson: stringifyJsonArray(input.tags),
    stackJson: stringifyJsonArray(input.stack),
    featured: input.featured,
    sortOrder: input.sortOrder,
    liveUrl: input.liveUrl || null,
    repoUrl: input.repoUrl || null,
    status: input.status,
  };

  if (input.id) {
    return prisma.project.update({
      where: { id: input.id },
      data: payload,
    });
  }

  return prisma.project.upsert({
    where: { slug: payload.slug },
    update: payload,
    create: payload,
  });
}

export async function deleteProject(id: string) {
  return prisma.project.delete({
    where: { id },
  });
}

export async function getEditableAboutSection(): Promise<EditableAbout> {
  const about = await prisma.aboutSection.findFirst({
    where: { singletonKey: "about" },
  });

  const fallback = mapAboutRecord(null);

  if (!about) {
    return {
      ...fallback,
      statusValue: "DRAFT",
    };
  }

  return {
    ...mapAboutRecord(about),
    statusValue: toEditorialStatus(about.status),
  };
}

export async function getPublishedAboutSection(): Promise<AboutView> {
  const about = await prisma.aboutSection.findFirst({
    where: {
      singletonKey: "about",
      status: "PUBLISHED",
    },
  });

  return mapAboutRecord(about ?? null);
}

export async function upsertAboutSection(input: AboutFormInput) {
  return prisma.aboutSection.upsert({
    where: { singletonKey: "about" },
    update: {
      kicker: input.kicker,
      title: input.title,
      description: input.description,
      highlightsJson: stringifyJsonArray(input.highlights),
      metricsJson: stringifyJsonArray(input.metrics),
      status: input.status,
    },
    create: {
      singletonKey: "about",
      kicker: input.kicker,
      title: input.title,
      description: input.description,
      highlightsJson: stringifyJsonArray(input.highlights),
      metricsJson: stringifyJsonArray(input.metrics),
      status: input.status,
    },
  });
}

export async function getEditableSkillCategories(): Promise<EditableSkillCategory[]> {
  const categories = await prisma.skillCategory.findMany({
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    include: {
      items: {
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      },
    },
  });

  return categories.map((category) => mapSkillCategoryRecord(category));
}

export async function getPublishedSkillCategories(): Promise<SkillCategoryView[]> {
  const categories = await prisma.skillCategory.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    include: {
      items: {
        where: { status: "PUBLISHED" },
        orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      },
    },
  });

  if (categories.length === 0) {
    return siteContent.skills.categories.map((category, index) => ({
      id: `fallback-${index}`,
      slug: normalizeSlug(category.title),
      title: category.title,
      sortOrder: index,
      statusValue: "PUBLISHED",
      items: category.items.map((item, itemIndex) => ({
        id: `${index}-${itemIndex}`,
        title: item,
        level: "",
        sortOrder: itemIndex,
        statusValue: "PUBLISHED",
      })),
    }));
  }

  return categories.map((category) => mapSkillCategoryRecord(category));
}

export async function upsertSkillCategory(input: SkillCategoryFormInput) {
  const payload = {
    slug: input.slug || normalizeSlug(input.title),
    title: input.title,
    sortOrder: input.sortOrder,
    status: input.status,
  };

  if (input.id) {
    return prisma.skillCategory.update({
      where: { id: input.id },
      data: payload,
    });
  }

  return prisma.skillCategory.upsert({
    where: { slug: payload.slug },
    update: payload,
    create: payload,
  });
}

export async function deleteSkillCategory(id: string) {
  return prisma.skillCategory.delete({
    where: { id },
  });
}

export async function getResume() {
  const resume = await prisma.resume.findFirst({
    where: { singletonKey: "resume" },
    include: {
      experiences: {
        orderBy: { sortOrder: "asc" },
      },
      educations: {
        orderBy: { sortOrder: "asc" },
      },
      certifications: {
        orderBy: { sortOrder: "asc" },
      },
      languages: {
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!resume) {
    return null;
  }

  return {
    ...resume,
    experiences: resume.experiences.map((exp) => ({
      ...exp,
      skills: JSON.parse(exp.skillsJson),
    })),
  };
}

export async function upsertResume(input: any) {
  const resumeData = {
    singletonKey: "resume",
    fullName: input.fullName,
    email: input.email,
    phone: input.phone || null,
    location: input.location || null,
    profileImageUrl: input.profileImageUrl || null,
    profileImageAlt: input.profileImageAlt || "Foto de perfil",
    professionalSummary: input.professionalSummary,
    nationalId: input.nationalId || null,
    linkedinUrl: input.linkedinUrl || null,
    portfolioUrl: input.portfolioUrl || null,
    githubUrl: input.githubUrl || null,
    status: input.status || "DRAFT",
  };

  const resume = await prisma.resume.upsert({
    where: { singletonKey: "resume" },
    update: resumeData,
    create: resumeData,
  });

  // Delete existing relations
  await prisma.experience.deleteMany({
    where: { resumeId: resume.id },
  });
  await prisma.education.deleteMany({
    where: { resumeId: resume.id },
  });
  await prisma.certification.deleteMany({
    where: { resumeId: resume.id },
  });
  await prisma.language.deleteMany({
    where: { resumeId: resume.id },
  });

  // Create new experiences
  if (input.experiences && input.experiences.length > 0) {
    await prisma.experience.createMany({
      data: input.experiences.map((exp: any, index: number) => ({
        resumeId: resume.id,
        company: exp.company,
        position: exp.position,
        description: exp.description,
        startDate: exp.startDate,
        endDate: exp.endDate || null,
        isCurrent: exp.isCurrent || false,
        skillsJson: JSON.stringify(
          exp.skills ? (typeof exp.skills === "string" ? exp.skills.split(",").map((s: string) => s.trim()) : exp.skills) : []
        ),
        imageUrl: exp.imageUrl || null,
        imageAlt: exp.imageAlt || null,
        sortOrder: index,
      })),
    });
  }

  // Create new educations
  if (input.educations && input.educations.length > 0) {
    await prisma.education.createMany({
      data: input.educations.map((edu: any, index: number) => ({
        resumeId: resume.id,
        institution: edu.institution,
        course: edu.course,
        degree: edu.degree || null,
        area: edu.area || null,
        startDate: edu.startDate,
        endDate: edu.endDate || null,
        isCurrent: edu.isCurrent || false,
        description: edu.description || null,
        imageUrl: edu.imageUrl || null,
        imageAlt: edu.imageAlt || null,
        sortOrder: index,
      })),
    });
  }

  // Create new certifications
  if (input.certifications && input.certifications.length > 0) {
    await prisma.certification.createMany({
      data: input.certifications.map((cert: any, index: number) => ({
        resumeId: resume.id,
        title: cert.title,
        issuer: cert.issuer,
        credentialUrl: cert.credentialUrl || null,
        issueDate: cert.issueDate,
        expiryDate: cert.expiryDate || null,
        imageUrl: cert.imageUrl || null,
        imageAlt: cert.imageAlt || null,
        sortOrder: index,
      })),
    });
  }

  // Create new languages
  if (input.languages && input.languages.length > 0) {
    await prisma.language.createMany({
      data: input.languages.map((lang: any, index: number) => ({
        resumeId: resume.id,
        name: lang.name,
        proficiency: lang.proficiency || "Intermediário",
        sortOrder: index,
      })),
    });
  }

  return resume;
}

export async function upsertSkillItem(input: SkillItemFormInput) {
  const payload = {
    categoryId: input.categoryId,
    title: input.title,
    level: input.level || null,
    sortOrder: input.sortOrder,
    status: input.status,
  };

  if (input.id) {
    return prisma.skillItem.update({
      where: { id: input.id },
      data: payload,
    });
  }

  return prisma.skillItem.create({
    data: payload,
  });
}

export async function deleteSkillItem(id: string) {
  return prisma.skillItem.delete({
    where: { id },
  });
}

export async function getEditableContactPage(): Promise<EditableContact> {
  const contact = await prisma.contactPage.findFirst({
    where: { singletonKey: "contact" },
  });

  const fallback = mapContactRecord(null);

  if (!contact) {
    return {
      ...fallback,
      statusValue: "DRAFT",
    };
  }

  return {
    ...mapContactRecord(contact),
    statusValue: toEditorialStatus(contact.status),
  };
}

export async function getPublishedContactPage(): Promise<ContactView> {
  const contact = await prisma.contactPage.findFirst({
    where: {
      singletonKey: "contact",
      status: "PUBLISHED",
    },
  });

  return mapContactRecord(contact ?? null);
}

export async function upsertContactPage(input: ContactFormInput) {
  return prisma.contactPage.upsert({
    where: { singletonKey: "contact" },
    update: {
      kicker: input.kicker,
      title: input.title,
      description: input.description,
      infoJson: stringifyJsonArray(input.info),
      socialJson: stringifyJsonArray(input.social),
      status: input.status,
    },
    create: {
      singletonKey: "contact",
      kicker: input.kicker,
      title: input.title,
      description: input.description,
      infoJson: stringifyJsonArray(input.info),
      socialJson: stringifyJsonArray(input.social),
      status: input.status,
    },
  });
}

export async function getEditableProjects() {
  return listAdminProjects();
}

export async function getEditableServices() {
  return listAdminServices();
}

export async function getAdminDashboardSummary() {
  const [projects, services, publishedProjects, draftProjects, archivedProjects, hero] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.project.count({ where: { status: "PUBLISHED" } }),
    prisma.project.count({ where: { status: "DRAFT" } }),
    prisma.project.count({ where: { status: "ARCHIVED" } }),
    prisma.heroSection.findFirst({ where: { singletonKey: "hero" } }),
  ]);

  return {
    projects,
    services,
    publishedProjects,
    draftProjects,
    archivedProjects,
    heroStatus: hero?.status ?? "DRAFT",
  };
}

export async function getPublicHomeContent(): Promise<PublicHomeContent> {
  const [hero, services, about, projects, skills, contact] = await Promise.all([
    getPublishedHeroSection(),
    listPublishedServices(),
    getPublishedAboutSection(),
    listPublishedProjects(),
    getPublishedSkillCategories(),
    getPublishedContactPage(),
  ]);

  return {
    brand: siteContent.brand,
    navLinks: siteContent.navLinks,
    hero,
    services: {
      kicker: siteContent.services.kicker,
      title: siteContent.services.title,
      cards: services,
    },
    about,
    projects: {
      kicker: siteContent.projects.kicker,
      title: siteContent.projects.title,
      cards: projects,
    },
    skills: {
      kicker: siteContent.skills.kicker,
      title: siteContent.skills.title,
      categories: skills,
    },
    contact,
    footer: siteContent.footer,
  };
}
