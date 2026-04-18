import "dotenv/config";

import { siteContent } from "@/lib/site-content";
import { hashPassword } from "@/lib/password";
import {
  normalizeSlug,
  upsertAboutSection,
  upsertContactPage,
  upsertHeroSection,
  upsertProject,
  upsertService,
  upsertSkillCategory,
  upsertSkillItem,
} from "@/lib/editorial";
import { prisma } from "@/lib/prisma";

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@localhost";
  const password = process.env.ADMIN_PASSWORD ?? "change-me";
  const passwordHash = process.env.ADMIN_PASSWORD_HASH ?? hashPassword(password);

  await prisma.user.upsert({
    where: { email },
    update: {
      name: "Admin",
      passwordHash,
      role: "ADMIN",
    },
    create: {
      name: "Admin",
      email,
      passwordHash,
      role: "ADMIN",
    },
  });

  await upsertHeroSection({
    eyebrow: siteContent.hero.eyebrow,
    titleLead: siteContent.hero.titleLead,
    titleAccent: siteContent.hero.titleAccent,
    description: siteContent.hero.description,
    stack: [...siteContent.hero.stack],
    signals: [...siteContent.hero.signals],
    ctaPrimaryText: siteContent.hero.cta.primary.text,
    ctaPrimaryHref: siteContent.hero.cta.primary.href,
    ctaSecondaryText: siteContent.hero.cta.secondary.text,
    ctaSecondaryHref: siteContent.hero.cta.secondary.href,
    status: "PUBLISHED",
    profileTitle: siteContent.hero.profileTitle,
    profileSubtitle: siteContent.hero.profileSubtitle,
    terminalLines: [...siteContent.hero.terminalLines],
    social: siteContent.hero.social.map((item) => ({
      label: item.label,
      href: item.href,
    })),
  });

  for (const [index, card] of siteContent.services.cards.entries()) {
    await upsertService({
      slug: normalizeSlug(card.title),
      title: card.title,
      description: card.description,
      tags: [...card.tags],
      sortOrder: index + 1,
      status: "PUBLISHED",
    });
  }

  for (const [index, project] of siteContent.projects.cards.entries()) {
    await upsertProject({
      slug: project.slug,
      eyebrow: project.eyebrow,
      title: project.title,
      summary: project.description,
      description: project.description,
      tags: [...project.tags],
      stack: [...project.tags],
      featured: project.featured,
      sortOrder: index + 1,
      liveUrl: "",
      repoUrl: "",
      status: "PUBLISHED",
    });
  }

  await upsertAboutSection({
    kicker: siteContent.about.kicker,
    title: siteContent.about.title,
    description: siteContent.about.description,
    highlights: [...siteContent.about.highlights],
    metrics: [...siteContent.about.metrics],
    status: "PUBLISHED",
  });

  await upsertContactPage({
    kicker: siteContent.contact.kicker,
    title: siteContent.contact.title,
    description: siteContent.contact.description,
    info: [...siteContent.contact.info],
    social: siteContent.hero.social.map((item) => ({
      label: item.label,
      value: item.href,
      href: item.href,
    })),
    status: "PUBLISHED",
  });

  await prisma.skillItem.deleteMany();
  await prisma.skillCategory.deleteMany();

  for (const [categoryIndex, category] of siteContent.skills.categories.entries()) {
    const savedCategory = await upsertSkillCategory({
      slug: normalizeSlug(category.title),
      title: category.title,
      sortOrder: categoryIndex + 1,
      status: "PUBLISHED",
    });

    for (const [itemIndex, item] of category.items.entries()) {
      await upsertSkillItem({
        categoryId: savedCategory.id,
        title: item,
        level: "",
        sortOrder: itemIndex + 1,
        status: "PUBLISHED",
      });
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
