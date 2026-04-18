import { revalidatePath } from "next/cache";

import {
  getEditableContactPage,
  joinContactInfoLines,
  readContactFormData,
  upsertContactPage,
} from "@/lib/editorial";

export const dynamic = "force-dynamic";

async function saveContact(formData: FormData) {
  "use server";

  const payload = readContactFormData(formData);
  await upsertContactPage(payload);

  revalidatePath("/admin/contact");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/contato");
  revalidatePath("/api/public/contact");
}

export default async function AdminContactPage() {
  const contact = await getEditableContactPage();

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-500">Admin / Contato</p>
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-900">Conteúdo da página de contato</h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-500">
          O texto fixo da página de contato fica separado do futuro inbox de mensagens. Aqui você edita só o conteúdo público.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <form action={saveContact} className="space-y-6 rounded-[28px] border border-slate-200 bg-white p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Kicker</span>
              <input
                name="kicker"
                defaultValue={contact.kicker}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-600">
              <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Status</span>
              <select
                name="status"
                defaultValue={contact.statusValue}
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
              defaultValue={contact.title}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-600">
            <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Descrição</span>
            <textarea
              name="description"
              rows={4}
              defaultValue={contact.description}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-600">
            <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Info</span>
            <textarea
              name="info"
              rows={5}
              defaultValue={joinContactInfoLines(contact.info)}
              placeholder={"Email|renan@dominio.com\nLinkedIn|https://linkedin.com/in/..."}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
            />
          </label>

          <label className="space-y-2 text-sm text-slate-600">
            <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Social</span>
            <textarea
              name="social"
              rows={5}
              defaultValue={joinContactInfoLines(contact.social)}
              placeholder={"LinkedIn|https://linkedin.com/in/..."}
              className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
            />
          </label>

          <button type="submit" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5">
            Salvar contato
          </button>
        </form>

        <aside className="space-y-4 rounded-[28px] border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-6 text-slate-700">
          <p className="text-xs uppercase tracking-[0.28em] text-sky-700">Preview</p>
          <h2 className="text-2xl font-semibold tracking-[-0.05em] text-slate-900">{contact.title}</h2>
          <p className="text-sm leading-7 text-slate-600">{contact.description}</p>
          <div className="space-y-2">
            {contact.info.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-600">{item.label}</p>
                <p className="mt-2 text-sm text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
