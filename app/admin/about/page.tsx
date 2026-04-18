import { revalidatePath } from "next/cache";

import {
  getEditableAboutSection,
  joinKeyValueLines,
  joinLines,
  readAboutFormData,
  upsertAboutSection,
} from "@/lib/editorial";

export const dynamic = "force-dynamic";

async function saveAbout(formData: FormData) {
  "use server";

  const payload = readAboutFormData(formData);
  await upsertAboutSection(payload);

  revalidatePath("/admin/about");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/sobre");
  revalidatePath("/api/public/about");
}

export default async function AdminAboutPage() {
  const about = await getEditableAboutSection();

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-500">Admin / Sobre</p>
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-900">Editor da seção sobre</h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-500">
          A biografia do site agora nasce como conteúdo editorial único, com highlights e métricas persistidos no banco.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <form action={saveAbout} className="space-y-6 rounded-[28px] border border-slate-200 bg-white p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Kicker</span>
              <input
                name="kicker"
                defaultValue={about.kicker}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Status</span>
              <select
                name="status"
                defaultValue={about.statusValue}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </label>
          </div>

          <label className="space-y-2 text-sm text-slate-600">
            <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Título</span>
            <input
              name="title"
              defaultValue={about.title}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-600">
            <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Descrição</span>
            <textarea
              name="description"
              rows={5}
              defaultValue={about.description}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-600">
            <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Highlights</span>
            <textarea
              name="highlights"
              rows={5}
              defaultValue={joinLines(about.highlights)}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-600">
            <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Metrics</span>
            <textarea
              name="metrics"
              rows={5}
              defaultValue={joinKeyValueLines(about.metrics)}
              placeholder={"2+|anos de experiência\n10+|projetos desenvolvidos"}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
            />
          </label>

          <button type="submit" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5">
            Salvar sobre
          </button>
        </form>

        <aside className="space-y-4 rounded-[28px] border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-6 text-slate-700">
          <p className="text-xs uppercase tracking-[0.28em] text-sky-700">Preview</p>
          <h2 className="text-2xl font-semibold tracking-[-0.05em] text-slate-900">{about.title}</h2>
          <p className="text-sm leading-7 text-slate-600">{about.description}</p>
          <div className="space-y-2">
            {about.highlights.map((highlight) => (
              <div key={highlight} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900">
                {highlight}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
