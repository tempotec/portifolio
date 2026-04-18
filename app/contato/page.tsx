import Link from "next/link";

import { SectionHeading } from "@/components/site/SectionHeading";
import { getPublishedContactPage } from "@/lib/editorial";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const contact = await getPublishedContactPage();

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/" className="text-sm text-slate-400 transition hover:text-white">
        ← Voltar para a home
      </Link>

      <section className="mt-8 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow">
        <SectionHeading kicker={contact.kicker} title={contact.title} description={contact.description} />

        <div className="mt-8 grid gap-4">
          {contact.info.map((item) => (
            <article key={item.label} className="rounded-2xl border border-white/10 bg-slate-950/80 p-5">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-400">{item.label}</span>
              <a href={item.href} className="mt-3 block text-sm text-white transition hover:text-slate-200">
                {item.value}
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
