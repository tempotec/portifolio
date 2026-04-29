import { revalidatePath } from "next/cache";

import { getEditableProjects, joinLines, readProjectFormData, deleteProject, upsertProject } from "@/lib/editorial";

export const dynamic = "force-dynamic";

async function saveProject(formData: FormData) {
  "use server";

  const payload = readProjectFormData(formData);
  await upsertProject(payload);

  revalidatePath("/admin/projects");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/projetos");
  revalidatePath("/api/public/projects");
}

async function removeProject(formData: FormData) {
  "use server";

  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    return;
  }

  await deleteProject(id);
  revalidatePath("/admin/projects");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/projetos");
  revalidatePath("/api/public/projects");
}

function ProjectEditor({ project }: { project?: Awaited<ReturnType<typeof getEditableProjects>>[number] }) {
  return (
    <form action={saveProject} className="space-y-4 rounded-[28px] border border-slate-200 bg-white p-6">
      {project ? <input type="hidden" name="id" value={project.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Slug</span>
          <input
            name="slug"
            defaultValue={project?.slug ?? ""}
            placeholder="meu-projeto"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Status</span>
          <select
            name="status"
            defaultValue={project?.statusValue ?? "DRAFT"}
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
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Eyebrow</span>
          <input
            name="eyebrow"
            defaultValue={project?.eyebrow ?? ""}
            placeholder="Projeto 01"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Title</span>
          <input
            name="title"
            defaultValue={project?.title ?? ""}
            placeholder="Nome do projeto"
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm text-slate-600">
        <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Summary</span>
        <textarea
          name="summary"
          rows={3}
          defaultValue={project?.summary ?? ""}
          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
        />
      </label>

      <label className="space-y-2 text-sm text-slate-600">
        <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Description</span>
        <textarea
          name="description"
          rows={5}
          defaultValue={project?.description ?? ""}
          className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
        />
      </label>

      <label className="space-y-2 text-sm text-slate-600">
        <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Cover Image URL</span>
        <input
          name="coverImageUrl"
          type="url"
          defaultValue={project?.coverImageUrl ?? ""}
          placeholder="https://..."
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
        />
        {project?.coverImageUrl && (
          <div className="mt-3 rounded-2xl overflow-hidden border border-slate-200">
            <img
              src={project.coverImageUrl}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
          </div>
        )}
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Tags</span>
          <textarea
            name="tags"
            rows={4}
            defaultValue={joinLines(project?.tags ?? [])}
            placeholder={"React\nNode.js\nAI"}
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Stack</span>
          <textarea
            name="stack"
            rows={4}
            defaultValue={joinLines(project?.stack ?? [])}
            placeholder={"Next.js\nPrisma\nPostgreSQL"}
            className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Live URL</span>
          <input
            name="liveUrl"
            defaultValue={project?.liveUrl ?? ""}
            placeholder="https://..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Repo URL</span>
          <input
            name="repoUrl"
            defaultValue={project?.repoUrl ?? ""}
            placeholder="https://github.com/..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <label className="inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
          <input type="checkbox" name="featured" defaultChecked={project?.featured ?? false} className="h-4 w-4 rounded border-white/20 bg-transparent" />
          Featured
        </label>
        <label className="space-y-2 text-sm text-slate-600">
          <span className="block text-xs uppercase tracking-[0.28em] text-slate-500">Order</span>
          <input
            name="sortOrder"
            type="number"
            defaultValue={project?.sortOrder ?? 0}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-cyan-400/50"
          />
        </label>
        <button type="submit" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5">
          {project ? "Salvar projeto" : "Criar projeto"}
        </button>
      </div>
    </form>
  );
}

export default async function AdminProjectsPage() {
  const projects = await getEditableProjects();

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-500">Admin / Projetos</p>
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-900">CRUD editorial de projetos</h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-500">
          Projetos são registros publicados por slug. A home e a página de detalhe leem apenas itens publicados.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Novo projeto</p>
            <div className="mt-4">
              <ProjectEditor />
            </div>
          </div>

          <div className="grid gap-4">
            {projects.map((project) => (
              <article key={project.id} className="rounded-[28px] border border-slate-200 bg-white p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-slate-500">{project.eyebrow}</p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-900">{project.title}</h2>
                    <p className="mt-2 text-sm text-slate-500">/{project.slug}</p>
                  </div>
                  <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-600">
                    {project.statusValue}
                  </div>
                </div>

                {project.coverImageUrl && (
                  <div className="mt-4 rounded-2xl overflow-hidden border border-slate-200">
                    <img
                      src={project.coverImageUrl}
                      alt={project.title}
                      className="w-full h-56 object-cover"
                    />
                  </div>
                )}

                <p className="mt-4 text-sm leading-7 text-slate-600">{project.summary || project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 rounded-[24px] border border-slate-200 bg-white p-4">
                  <ProjectEditor project={project} />
                </div>

                <form action={removeProject} className="mt-4">
                  <input type="hidden" name="id" value={project.id} />
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
            <li className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3">Slug único por projeto.</li>
            <li className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3">A home mostra somente projetos publicados.</li>
            <li className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3">Featured e sortOrder controlam a prioridade visual.</li>
            <li className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3">A exclusão remove o registro do banco local.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
