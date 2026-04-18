import { revalidatePath } from "next/cache";

import { deleteService, getEditableServices, joinLines, readServiceFormData, upsertService } from "@/lib/editorial";

export const dynamic = "force-dynamic";

async function saveService(formData: FormData) {
  "use server";

  const payload = readServiceFormData(formData);
  await upsertService(payload);

  revalidatePath("/admin/services");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/api/public/services");
}

async function removeService(formData: FormData) {
  "use server";

  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    return;
  }

  await deleteService(id);
  revalidatePath("/admin/services");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/api/public/services");
}

function ServiceEditor({ service }: { service?: Awaited<ReturnType<typeof getEditableServices>>[number] }) {
  return (
    <form action={saveService} className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-6">
      {service ? <input type="hidden" name="id" value={service.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Slug</span>
          <input
            name="slug"
            defaultValue={service?.slug ?? ""}
            placeholder="automacao-de-processos"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Status</span>
          <select
            name="status"
            defaultValue={service?.statusValue ?? "DRAFT"}
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
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Title</span>
          <input
            name="title"
            defaultValue={service?.title ?? ""}
            placeholder="Serviço"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Order</span>
          <input
            name="sortOrder"
            type="number"
            defaultValue={service?.sortOrder ?? 0}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm text-slate-600">
        <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Description</span>
        <textarea
          name="description"
          rows={4}
          defaultValue={service?.description ?? ""}
          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
        />
      </label>

      <label className="space-y-2 text-sm text-slate-600">
        <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Tags</span>
        <textarea
          name="tags"
          rows={4}
          defaultValue={joinLines(service?.tags ?? [])}
          placeholder={"React\nPrisma\nAPIs"}
          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
        />
      </label>

      <button type="submit" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5">
        {service ? "Salvar serviço" : "Criar serviço"}
      </button>
    </form>
  );
}

export default async function AdminServicesPage() {
  const services = await getEditableServices();

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-500">Admin / Serviços</p>
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-900">CRUD editorial de serviços</h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-500">
          Serviços são cards simples da home, controlados por status e ordem. A publicação do site vem só dos itens publicados.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Novo serviço</p>
            <div className="mt-4">
              <ServiceEditor />
            </div>
          </div>

          <div className="grid gap-4">
            {services.map((service) => (
              <article key={service.id} className="rounded-[28px] border border-slate-200 bg-white p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{service.slug}</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-900">{service.title}</h2>
                  </div>
                  <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">
                    {service.statusValue}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">{service.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-4">
                  <ServiceEditor service={service} />
                </div>

                <form action={removeService} className="mt-4">
                  <input type="hidden" name="id" value={service.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-red-400/30 bg-red-400/10 px-5 py-3 text-sm font-semibold text-red-100 transition hover:-translate-y-0.5 hover:bg-red-400/20"
                  >
                    Excluir
                  </button>
                </form>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-4 rounded-[28px] border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-6 text-slate-700">
          <p className="text-xs uppercase tracking-[0.28em] text-sky-700">Regras editoriais</p>
          <ul className="space-y-3 text-sm leading-7 text-slate-600">
            <li className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3">Slug único por serviço.</li>
            <li className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3">Somente itens published entram na home.</li>
            <li className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3">Order controla a posição visual.</li>
            <li className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3">A exclusão remove o registro do banco local.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
