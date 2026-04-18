import Link from "next/link";
import { notFound } from "next/navigation";

import { getPublishedProjectBySlug } from "@/lib/editorial";

export const dynamic = "force-dynamic";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getPublishedProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[340px] bg-gradient-to-b from-sky-100 via-amber-50 to-transparent" />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Link href="/projetos" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900">
          <span>←</span>
          Voltar para projetos
        </Link>

        <article className="mt-8 rounded-[34px] border border-slate-200 bg-white p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-700">{project.eyebrow}</p>
            {project.featured ? (
              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                Destaque
              </span>
            ) : null}
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-slate-900">{project.title}</h1>
          <p className="mt-6 text-base leading-8 text-slate-700">{project.description}</p>

          {project.summary ? <p className="mt-4 text-sm leading-7 text-slate-500">{project.summary}</p> : null}

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                {tag}
              </span>
            ))}
          </div>

          {project.stack.length > 0 ? (
            <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Stack</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-700"
              >
                Abrir projeto
              </a>
            ) : (
              <div className="rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-500">Sem link publico</div>
            )}

            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50 hover:text-slate-900"
              >
                Ver repositorio
              </a>
            ) : null}
          </div>
        </article>
      </div>
    </main>
  );
}
