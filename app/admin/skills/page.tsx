import { revalidatePath } from "next/cache";

import {
  deleteSkillCategory,
  deleteSkillItem,
  getEditableSkillCategories,
  normalizeSlug,
  readSkillCategoryFormData,
  readSkillItemFormData,
  upsertSkillCategory,
  upsertSkillItem,
} from "@/lib/editorial";

export const dynamic = "force-dynamic";

async function saveCategory(formData: FormData) {
  "use server";

  const payload = readSkillCategoryFormData(formData);
  await upsertSkillCategory(payload);

  revalidatePath("/admin/skills");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/api/public/skills");
}

async function removeCategory(formData: FormData) {
  "use server";

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return;
  }

  await deleteSkillCategory(id);

  revalidatePath("/admin/skills");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/api/public/skills");
}

async function saveItem(formData: FormData) {
  "use server";

  const payload = readSkillItemFormData(formData);
  await upsertSkillItem(payload);

  revalidatePath("/admin/skills");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/api/public/skills");
}

async function removeItem(formData: FormData) {
  "use server";

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return;
  }

  await deleteSkillItem(id);

  revalidatePath("/admin/skills");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/api/public/skills");
}

function CategoryEditor({ category }: { category?: Awaited<ReturnType<typeof getEditableSkillCategories>>[number] }) {
  return (
    <form action={saveCategory} className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-6">
      {category ? <input type="hidden" name="id" value={category.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Slug</span>
          <input
            name="slug"
            defaultValue={category?.slug ?? ""}
            placeholder={normalizeSlug("Frontend")}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Status</span>
          <select
            name="status"
            defaultValue={category?.statusValue ?? "DRAFT"}
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
            defaultValue={category?.title ?? ""}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Order</span>
          <input
            name="sortOrder"
            type="number"
            defaultValue={category?.sortOrder ?? 0}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          />
        </label>
      </div>

      <button type="submit" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5">
        {category ? "Salvar categoria" : "Criar categoria"}
      </button>
    </form>
  );
}

function ItemEditor({
  categoryId,
  item,
}: {
  categoryId: string;
  item?: Awaited<ReturnType<typeof getEditableSkillCategories>>[number]["items"][number];
}) {
  return (
    <form action={saveItem} className="space-y-4 rounded-[24px] border border-slate-200 bg-white p-4">
      <input type="hidden" name="categoryId" value={categoryId} />
      {item ? <input type="hidden" name="id" value={item.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Title</span>
          <input
            name="title"
            defaultValue={item?.title ?? ""}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Level</span>
          <input
            name="level"
            defaultValue={item?.level ?? ""}
            placeholder="Avançado"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Status</span>
          <select
            name="status"
            defaultValue={item?.statusValue ?? "DRAFT"}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Order</span>
          <input
            name="sortOrder"
            type="number"
            defaultValue={item?.sortOrder ?? 0}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          />
        </label>
      </div>

      <button type="submit" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5">
        {item ? "Salvar item" : "Criar item"}
      </button>
    </form>
  );
}

export default async function AdminSkillsPage() {
  const categories = await getEditableSkillCategories();

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-500">Admin / Skills</p>
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-900">Categorias e itens de skills</h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-500">
          Competências agora vivem em categorias e itens separados, com publicação e ordenação controladas pelo banco.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Nova categoria</p>
            <div className="mt-4">
              <CategoryEditor />
            </div>
          </div>

          <div className="space-y-4">
            {categories.map((category) => (
              <article key={category.id} className="rounded-[28px] border border-slate-200 bg-white p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{category.slug}</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-900">{category.title}</h2>
                  </div>
                  <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">
                    {category.statusValue}
                  </div>
                </div>

                <div className="mt-5">
                  <CategoryEditor category={category} />
                </div>

                <div className="mt-6 space-y-3">
                  {category.items.map((item) => (
                    <div key={item.id} className="rounded-[22px] border border-slate-200 bg-white p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Skill item</p>
                          <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
                          <p className="mt-1 text-sm text-slate-500">{item.level || "Sem nível definido"}</p>
                        </div>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">
                          {item.statusValue}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-4">
                        <ItemEditor categoryId={category.id} item={item} />
                        <form action={removeItem}>
                          <input type="hidden" name="id" value={item.id} />
                          <button
                            type="submit"
                            className="rounded-full border border-red-400/30 bg-red-400/10 px-5 py-3 text-sm font-semibold text-red-100 transition hover:-translate-y-0.5 hover:bg-red-400/20"
                          >
                            Excluir item
                          </button>
                        </form>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Novo item</p>
                  <div className="mt-4">
                    <ItemEditor categoryId={category.id} />
                  </div>
                </div>

                <form action={removeCategory} className="mt-4">
                  <input type="hidden" name="id" value={category.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-red-400/30 bg-red-400/10 px-5 py-3 text-sm font-semibold text-red-100 transition hover:-translate-y-0.5 hover:bg-red-400/20"
                  >
                    Excluir categoria
                  </button>
                </form>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-4 rounded-[28px] border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-6 text-slate-700">
          <p className="text-xs uppercase tracking-[0.28em] text-sky-700">Regras editoriais</p>
          <ul className="space-y-3 text-sm leading-7 text-slate-600">
            <li className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3">Cada categoria tem slug único.</li>
            <li className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3">Itens pertencem a uma categoria única.</li>
            <li className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3">A home lê apenas categorias e itens publicados.</li>
            <li className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3">A ordem visual vem de sortOrder.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
