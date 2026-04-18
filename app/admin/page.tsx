import Link from "next/link";

import { legacyInventory } from "@/lib/legacy-inventory";
import { getAdminDashboardSummary } from "@/lib/editorial";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const summary = await getAdminDashboardSummary();

  const adminCards = [
    {
      title: "Hero singleton",
      value: summary.heroStatus,
      description: "One record controls the top of the site.",
    },
    {
      title: "Projects",
      value: `${summary.projects}`,
      description: `${summary.publishedProjects} published, ${summary.draftProjects} drafts.`,
    },
    {
      title: "Services",
      value: `${summary.services}`,
      description: "Cards published on the home page and ordered in the database.",
    },
    {
      title: "Legacy migration",
      value: `${legacyInventory.seedCandidates.length} seeds` ,
      description: "Items from the old site still mapped for seed conversion.",
    },
  ] as const;

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-700">Dashboard</p>
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-900">Editorial base online</h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-600">
          The admin already protects entry and session. The cards below reflect the live editorial state in the local SQLite database.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminCards.map((card) => (
          <article key={card.title} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{card.title}</p>
            <strong className="mt-4 block text-2xl font-semibold tracking-[-0.05em] text-slate-900">{card.value}</strong>
            <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Next sprint</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-slate-900">Close the editorial domain</h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
            <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">1. Hero singleton with real read and write.</li>
            <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">2. Full CRUD for projects.</li>
            <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">3. Full CRUD for services.</li>
          </ul>
        </article>

        <article className="rounded-[28px] border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Seed initial</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-slate-900">Legacy already mapped into data</h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
            {legacyInventory.seedCandidates.map((item) => (
              <li key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/hero" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-700">
          Open hero
        </Link>
        <Link
          href="/admin/projects"
          className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50 hover:text-slate-900"
        >
          Open projects
        </Link>
        <Link
          href="/admin/services"
          className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50 hover:text-slate-900"
        >
          Open services
        </Link>
      </div>
    </section>
  );
}
