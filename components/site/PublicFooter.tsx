import type { SiteContent } from "@/lib/site-content";

type PublicFooterProps = {
  brand: SiteContent["brand"];
  footerCopy: SiteContent["footer"]["copy"];
};

export function PublicFooter({ brand, footerCopy }: PublicFooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-white/70">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-5 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold text-slate-900">{brand.text}</p>
          <p className="mt-1 text-sm text-slate-500">{footerCopy}</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
          <a href="#inicio" className="transition hover:text-slate-900">
            Início
          </a>
          <a
            href="https://www.linkedin.com/in/renangomes"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-slate-900"
          >
            LinkedIn
          </a>
          <a href="https://github.com/renangomes" target="_blank" rel="noreferrer" className="transition hover:text-slate-900">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
