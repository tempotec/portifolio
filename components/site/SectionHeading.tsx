type SectionHeadingProps = {
  kicker: string;
  title: string;
  description?: string;
};

export function SectionHeading({ kicker, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-700">{kicker}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-900 sm:text-4xl">{title}</h2>
      {description ? <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">{description}</p> : null}
    </div>
  );
}
