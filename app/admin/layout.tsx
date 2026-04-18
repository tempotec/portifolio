import Link from "next/link";
import type { ReactNode } from "react";

import { LogoutButton } from "@/components/LogoutButton";

const adminNav = [
  { label: "Dashboard", href: "/admin" },
  { label: "Hero", href: "/admin/hero" },
  { label: "Currículo", href: "/admin/curriculum" },
  { label: "Projetos", href: "/admin/projects" },
  { label: "Servicos", href: "/admin/services" },
  { label: "Sobre", href: "/admin/about" },
  { label: "Skills", href: "/admin/skills" },
  { label: "Contato", href: "/admin/contact" },
  { label: "Midia", href: "/admin/media" },
  { label: "Mensagens", href: "/admin/messages" },
  { label: "Configuracoes", href: "/admin/settings" },
] as const;

export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fbfaf7_0%,#f4f1ea_100%)] text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-[1480px] gap-6 px-4 py-4 lg:grid-cols-[300px_1fr] lg:px-6">
        <aside className="rounded-[32px] border border-slate-200 bg-white/95 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-700">Admin studio</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-900">Renan Gomes</h1>
              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                Base editorial clara, unica fonte de runtime para o site e o painel.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/"
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50 hover:text-slate-900"
              >
                Site
              </Link>
              <LogoutButton />
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-50 hover:text-slate-900"
              >
                <span>{item.label}</span>
                <span className="text-sky-700 opacity-0 transition group-hover:opacity-100">↗</span>
              </Link>
            ))}
          </nav>

          <div className="mt-8 rounded-[28px] border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-4 text-sm text-slate-700">
            Base unica para publico + admin. O conteudo editorial nasce aqui e publica no mesmo fluxo.
          </div>
        </aside>

        <main className="rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:p-8">
          <div className="mb-6 flex items-center justify-between gap-4 rounded-[24px] border border-slate-200 bg-slate-50/80 px-4 py-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">System status</p>
              <p className="mt-1 text-sm text-slate-600">Admin protegido, base local ativa e paginas conectadas ao editorial.</p>
            </div>
            <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
              Live
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
