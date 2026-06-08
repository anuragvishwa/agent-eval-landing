export default function SectionHeading({ eyebrow, title, description, center = false }) {
  return (
    <div
      className={`reveal-on-scroll ${center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl text-left'}`}
    >
      {eyebrow && (
        <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-zinc-950 sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
