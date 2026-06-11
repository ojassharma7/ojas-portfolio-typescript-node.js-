type SectionHeaderProps = {
  index: string; // "01"
  label: string; // "EXPERIENCE"
  cmd: string; // "git log --experience"
  sub?: string; // one-line description
};

/** Numbered, divided chapter header so each /work section reads as its own block. */
export default function SectionHeader({ index, label, cmd, sub }: SectionHeaderProps) {
  // split cmd into the command word and the rest so we can color the flag/arg
  const [word, ...rest] = cmd.split(' ');
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-term-cyan">{index}</span>
        <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-term-muted">
          {label}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-term-border to-transparent" />
      </div>
      <h2 className="mt-3 text-2xl font-bold text-term-text">
        <span className="prompt-symbol">$ </span>
        {word}
        {rest.length > 0 && <span className="text-term-cyan/80"> {rest.join(' ')}</span>}
      </h2>
      {sub && <p className="mt-1.5 text-sm text-term-muted">{sub}</p>}
    </div>
  );
}
