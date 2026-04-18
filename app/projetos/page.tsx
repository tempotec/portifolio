import Link from "next/link";

import { SectionHeading } from "@/components/site/SectionHeading";
import { listPublishedProjects } from "@/lib/editorial";
import { siteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await listPublishedProjects();

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[320px] bg-gradient-to-b from-sky-100 via-amber-50 to-transparent" />
      <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            kicker={siteContent.projects.kicker}
            title="Portfolio published"
            description="A clear view of all projects currently published from the editorial database."
          />
          <Link
            href="/"
            className="inline-flex w-fit rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50 hover:text-slate-900"
          >
            Back to home
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_24px_70px_rgba(14,165,233,0.12)]"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">0{index + 1}</span>
                {project.featured ? (
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                    Featured
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.28em] text-slate-400">{project.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-slate-900">{project.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/projetos/${project.slug}`}
                className="mt-7 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-700"
              >
                Open project
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
