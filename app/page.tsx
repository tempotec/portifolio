import Link from "next/link";

import { PublicFooter } from "@/components/site/PublicFooter";
import { PublicHeader } from "@/components/site/PublicHeader";
import { SectionHeading } from "@/components/site/SectionHeading";
import { HeroSwitchboard } from "@/components/site/HeroSwitchboard";
import { getPublicHomeContent } from "@/lib/editorial";

export const dynamic = "force-dynamic";

const projectToneClasses = {
  blue: "border-sky-200 bg-gradient-to-br from-sky-50 to-white",
  violet: "border-violet-200 bg-gradient-to-br from-violet-50 to-white",
  green: "border-emerald-200 bg-gradient-to-br from-emerald-50 to-white",
} as const;

export default async function HomePage() {
  const { brand, navLinks, hero, services, about, projects, skills, contact, footer } = await getPublicHomeContent();

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-sky-100 via-amber-50 to-transparent" />
      <PublicHeader brand={brand} navLinks={navLinks} />

      <main>
        <section id="inicio" className="mx-auto max-w-[1180px] px-4 pb-14 pt-14 sm:px-6 lg:px-8 lg:pb-20 lg:pt-18">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/90 px-4 py-2 text-sm text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {hero.status}
              </div>

              <div className="space-y-5">
                <p className="section-label">{hero.eyebrow}</p>
                <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.08em] text-slate-900 sm:text-6xl lg:text-[5.2rem]">
                  {hero.titleLead}
                  <span className="block bg-gradient-to-r from-sky-700 via-slate-900 to-slate-500 bg-clip-text text-transparent">
                    {hero.titleAccent}
                  </span>
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">{hero.description}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                {hero.stack.map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={hero.cta.primary.href}
                  className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-700"
                >
                  {hero.cta.primary.text}
                </a>
                <a
                  href={hero.cta.secondary.href}
                  className="inline-flex rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50"
                >
                  {hero.cta.secondary.text}
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">{hero.profileTitle}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-900">{hero.profileSubtitle}</h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {hero.signals.map((signal) => (
                    <article key={signal.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <span className="block text-xs uppercase tracking-[0.24em] text-slate-500">{signal.label}</span>
                      <strong className="mt-3 block text-sm font-semibold text-slate-900">{signal.value}</strong>
                    </article>
                  ))}
                </div>

                <div className="mt-5 rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5">
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-slate-700">
                    {hero.terminalLines.map((line) => (
                      <p key={line} className="rounded-xl bg-white px-3 py-2">
                        <span className="text-sky-700">&gt;</span> {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <HeroSwitchboard
                items={[
                  {
                    key: "automation",
                    label: "Automação",
                    title: "Fluxos que tiram atrito do caminho",
                    description: "O foco é automatizar tarefas repetitivas, reduzir erro manual e deixar operações previsíveis.",
                    bullets: ["rotinas confiáveis", "menos trabalho manual", "mais tempo para decisões"],
                  },
                  {
                    key: "integrations",
                    label: "Integrações",
                    title: "Conectar APIs sem virar gambiarra",
                    description: "A base do projeto conversa com serviços externos, banco e interfaces sem perder rastreabilidade.",
                    bullets: ["dados centralizados", "canais consistentes", "fluxo rastreável"],
                  },
                  {
                    key: "ai",
                    label: "IA aplicada",
                    title: "IA como suporte, não como enfeite",
                    description: "Uso IA quando ela realmente melhora a experiência, organiza contexto ou acelera a operação.",
                    bullets: ["contexto melhor", "respostas mais rápidas", "produtos mais inteligentes"],
                  },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8" id="atuacao">
          <div className="flex items-end justify-between gap-6">
            <SectionHeading kicker={services.kicker} title={services.title} />
            <p className="hidden max-w-sm text-sm leading-7 text-slate-500 lg:block">
              Cada bloco abaixo já nasce como conteúdo editorial e pode ser ligado ao admin sem retrabalho.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.cards.map((card, index) => (
              <article
                key={card.title}
                className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_24px_70px_rgba(14,165,233,0.14)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-700">0{index + 1}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Serviço</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.04em] text-slate-900">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{card.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-white/70">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <SectionHeading kicker={about.kicker} title={about.title} description={about.description} />
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <p className="section-label">Como trabalho</p>
              <div className="mt-6 grid gap-3">
                {about.highlights.map((highlight, index) => (
                  <div key={highlight} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-sm font-semibold text-white">{`0${index + 1}`}</span>
                    <p className="text-sm text-slate-700">{highlight}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {about.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <strong className="block text-2xl font-semibold tracking-[-0.05em] text-slate-900">{metric.value}</strong>
                    <span className="mt-2 block text-sm text-slate-500">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projetos" className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading kicker={projects.kicker} title={projects.title} />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {projects.cards.map((project) => (
              <article
                key={project.slug}
                className={`rounded-[30px] border p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 ${projectToneClasses[project.tone]}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{project.eyebrow}</span>
                  {project.featured ? (
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">Destaque</span>
                  ) : null}
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-slate-900">{project.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{project.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-7">
                  <Link
                    href={`/projetos/${project.slug}`}
                    className="inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-700"
                  >
                    Ver detalhes
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="border-y border-slate-200 bg-white/70">
          <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8">
            <SectionHeading kicker={skills.kicker} title={skills.title} />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {skills.categories.map((category) => (
                <article key={category.title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                  <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-900">{category.title}</h3>
                  <ul className="mt-5 space-y-3 text-sm text-slate-700">
                    {category.items.map((item) => (
                      <li key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                        <span className="block font-medium text-slate-900">{item.title}</span>
                        {item.level ? <span className="mt-1 block text-xs uppercase tracking-[0.24em] text-slate-500">{item.level}</span> : null}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[34px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <SectionHeading kicker={contact.kicker} title={contact.title} description={contact.description} />

              <div className="grid gap-4">
                {contact.info.map((item) => (
                  <article key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">{item.label}</span>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="mt-3 block text-sm font-medium text-slate-900 transition hover:text-sky-700"
                    >
                      {item.value}
                    </a>
                  </article>
                ))}

                <a
                  href="mailto:renan.gomes@seudominio.com"
                  className="inline-flex w-fit rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-sky-500"
                >
                  Entrar em contato
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter brand={brand} footerCopy={footer.copy} />
    </div>
  );
}
