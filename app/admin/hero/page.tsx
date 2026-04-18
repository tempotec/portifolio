import { revalidatePath } from "next/cache";

import {
  getEditableHeroSection,
  joinLabelValueLines,
  joinLines,
  readHeroFormData,
  upsertHeroSection,
} from "@/lib/editorial";

export const dynamic = "force-dynamic";

async function saveHero(formData: FormData) {
  "use server";

  const payload = readHeroFormData(formData);

  await upsertHeroSection(payload);
  revalidatePath("/admin/hero");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/api/public/home");
}

export default async function AdminHeroPage() {
  const hero = await getEditableHeroSection();

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-500">Admin / Hero</p>
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-900">Hero singleton editorial</h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-500">
          Esta tela controla a única hero section ativa do site. O público lê apenas o registro publicado; o admin atualiza este mesmo
          registro.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <form action={saveHero} className="space-y-6 rounded-[28px] border border-slate-200 bg-white p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Eyebrow</span>
              <input
                name="eyebrow"
                defaultValue={hero.eyebrow}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-0 placeholder:text-slate-600 focus:border-cyan-400/50"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Status</span>
              <select
                name="status"
                defaultValue={hero.statusValue}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Title lead</span>
              <input
                name="titleLead"
                defaultValue={hero.titleLead}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Title accent</span>
              <input
                name="titleAccent"
                defaultValue={hero.titleAccent}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm text-slate-600">
            <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Description</span>
            <textarea
              name="description"
              rows={4}
              defaultValue={hero.description}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Stack</span>
              <textarea
                name="stack"
                rows={4}
                defaultValue={joinLines(hero.stack)}
                placeholder={"Automation\nAPIs\nAI"}
                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Signals</span>
              <textarea
                name="signals"
                rows={4}
                defaultValue={joinLabelValueLines(hero.signals)}
                placeholder={"Automation|Reliable flows\nIntegrations|APIs and systems\nAI|Smart products"}
                className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Primary CTA text</span>
              <input
                name="ctaPrimaryText"
                defaultValue={hero.cta.primary.text}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Primary CTA href</span>
              <input
                name="ctaPrimaryHref"
                defaultValue={hero.cta.primary.href}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Secondary CTA text</span>
              <input
                name="ctaSecondaryText"
                defaultValue={hero.cta.secondary.text}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Secondary CTA href</span>
              <input
                name="ctaSecondaryHref"
                defaultValue={hero.cta.secondary.href}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Profile title</span>
              <input
                name="profileTitle"
                defaultValue={hero.profileTitle}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Profile subtitle</span>
              <input
                name="profileSubtitle"
                defaultValue={hero.profileSubtitle}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm text-slate-600">
            <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Terminal lines</span>
            <textarea
              name="terminalLines"
              rows={4}
              defaultValue={joinLines(hero.terminalLines)}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-600">
            <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Social links</span>
            <textarea
              name="social"
              rows={4}
              defaultValue={joinLabelValueLines(hero.social.map((item) => ({ label: item.label, value: item.href })))}
              placeholder={"LinkedIn|https://linkedin.com/in/...\nGitHub|https://github.com/..."}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
            />
          </label>

          <button type="submit" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5">
            Salvar hero singleton
          </button>
        </form>

        <aside className="space-y-4 rounded-[28px] border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-6 text-slate-700">
          <p className="text-xs uppercase tracking-[0.28em] text-sky-700">Estado atual</p>
          <h2 className="text-2xl font-semibold tracking-[-0.05em] text-slate-900">{hero.titleLead}</h2>
          <p className="text-sm leading-7 text-slate-600">{hero.description}</p>
          <div className="rounded-3xl border border-slate-200 bg-slate-100 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-600">{hero.statusValue}</p>
            <p className="mt-2 text-sm text-slate-700">{hero.status}</p>
          </div>
          <div className="space-y-2">
            {hero.signals.map((signal) => (
              <div key={`${signal.label}-${signal.value}`} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-600">{signal.label}</p>
                <p className="mt-2 text-sm text-slate-900">{signal.value}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
