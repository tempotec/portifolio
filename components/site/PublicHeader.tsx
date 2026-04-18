"use client";

import { useState } from "react";

import type { SiteContent } from "@/lib/site-content";

type PublicHeaderProps = {
  brand: SiteContent["brand"];
  navLinks: SiteContent["navLinks"];
};

export function PublicHeader({ brand, navLinks }: PublicHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-3 rounded-full border border-slate-200/80 bg-white/85 px-4 py-3 shadow-[0_16px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <a href="#inicio" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-slate-900 text-sm font-bold tracking-[0.18em] text-white">
            {brand.mark}
          </span>
          <span className="text-sm font-semibold text-slate-900">{brand.text}</span>
        </a>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-800 md:hidden"
          aria-expanded={isOpen}
          aria-controls="primary-nav"
          aria-label="Abrir menu"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className="h-0.5 w-4 rounded-full bg-current" />
            <span className="h-0.5 w-4 rounded-full bg-current" />
          </span>
        </button>

        <nav
          id="primary-nav"
          className={`${isOpen ? "flex" : "hidden"} absolute left-4 right-4 top-[72px] flex-col gap-2 rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_16px_50px_rgba(15,23,42,0.08)] md:static md:flex md:flex-row md:items-center md:rounded-full md:border-0 md:bg-slate-50/80 md:p-2`}
          aria-label="Navegação principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-slate-600 transition hover:bg-white hover:text-slate-900"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="hidden rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 md:inline-flex"
        >
          Fale comigo
        </a>
      </div>
    </header>
  );
}
