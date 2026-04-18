import Link from "next/link";

import { SectionHeading } from "@/components/site/SectionHeading";
import { getPublishedAboutSection } from "@/lib/editorial";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const about = await getPublishedAboutSection();

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/" className="text-sm text-slate-400 transition hover:text-white">
        ← Voltar para a home
      </Link>

      <section className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow">
        <SectionHeading kicker={about.kicker} title={about.title} description={about.description} />

        <div className="mt-8 grid gap-4">
          {about.highlights.map((highlight, index) => (
            <div key={highlight} className="rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-4 text-sm text-slate-200">
              0{index + 1}. {highlight}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {about.metrics.map((metric) => (
            <article key={metric.label} className="rounded-2xl border border-white/10 bg-slate-950/80 p-4">
              <strong className="block text-2xl font-semibold tracking-[-0.05em] text-white">{metric.value}</strong>
              <span className="mt-2 block text-sm text-slate-400">{metric.label}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
