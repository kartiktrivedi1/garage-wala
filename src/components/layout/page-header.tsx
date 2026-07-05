export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[24rem] w-[24rem] rounded-full bg-brand/25 blur-[110px]" />
      </div>
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</span>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 text-white/60">{description}</p>}
      </div>
    </section>
  );
}
