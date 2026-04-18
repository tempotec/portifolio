import Link from "next/link";

type AdminModulePageProps = {
  title: string;
  description: string;
  checklist: string[];
  routeLabel: string;
  nextStep?: string;
};

export function AdminModulePage({ title, description, checklist, routeLabel, nextStep }: AdminModulePageProps) {
  return (
    <section className="space-y-6">
      <div className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-700">{routeLabel}</p>
        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-slate-900">{title}</h1>
        <p className="text-sm leading-7 text-slate-600">{description}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Checklist</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            {checklist.map((item) => (
              <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[28px] border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-700">Next move</h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            {nextStep ?? "Connect this module to the Prisma schema and admin routes before opening real editing."}
          </p>
          <div className="mt-6">
            <Link
              href="/admin"
              className="inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-700"
            >
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
