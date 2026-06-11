'use client';

import ContinueFooter from '@/components/ContinueFooter';
import CountUp from '@/components/CountUp';
import GitHubShowcase from '@/components/GitHubShowcase';
import Highlight from '@/components/Highlight';
import ImpactPipeline from '@/components/ImpactPipeline';
import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import Window from '@/components/Window';
import { experiences, identity, projects, rutgers, skills } from '@/lib/profile';

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded border border-term-border bg-term-bg px-2 py-0.5 text-xs text-term-cyan">
      {children}
    </span>
  );
}

export default function Work() {
  return (
    <div className="mx-auto max-w-5xl space-y-20 px-4 py-16">
      {/* header */}
      <Reveal>
        <p className="text-sm text-term-muted">
          <span className="prompt-user">ojas</span>
          <span className="prompt-symbol">@</span>
          <span className="text-term-purple">portfolio</span>
          <span className="prompt-symbol">:</span>
          <span className="prompt-path">~/work</span>
          <span className="prompt-symbol">$ </span>
          <span className="text-term-muted">cat overview.md</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold text-term-text sm:text-4xl">
          The professional side<span className="text-term-cyan">_</span>
        </h1>
        <p className="mt-3 max-w-2xl text-term-muted">
          {identity.title}. {identity.education}. Currently modeling some of the largest
          behavioral gambling datasets in the United States.
        </p>
      </Reveal>

      {/* centerpiece: rutgers */}
      <Reveal>
        <Window title="~/work/rutgers — center-for-gambling-studies.md">
          <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
            <a
              href={rutgers.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-xl font-bold text-term-cyan underline decoration-term-cyan/30 underline-offset-4 transition-colors hover:decoration-term-cyan"
            >
              {rutgers.org}
              <span className="ml-1 text-sm text-term-muted transition-colors group-hover:text-term-cyan">
                ↗
              </span>
            </a>
            <span className="text-xs text-term-muted">{rutgers.period}</span>
          </div>
          <p className="text-sm text-term-muted">
            {rutgers.role} · {rutgers.location}
          </p>

          <div className="my-6 grid grid-cols-3 gap-3">
            {rutgers.stats.map((s) => (
              <div
                key={s.label}
                className="rounded border border-term-border bg-term-bg px-3 py-4 text-center"
              >
                <CountUp value={s.value} className="text-2xl font-bold text-term-yellow" />
                <div className="mt-1 text-[11px] leading-tight text-term-muted">{s.label}</div>
              </div>
            ))}
          </div>

          {/* policy impact banner */}
          <div className="mb-7 rounded-md border border-term-cyan/40 bg-term-cyan/5 px-4 py-3 text-sm leading-relaxed">
            <span className="font-bold text-term-cyan">▸ </span>
            <span className="text-term-text">
              directly influencing{' '}
              <span className="font-bold text-term-cyan">multi-billion-dollar</span> policy
              decisions — across the gambling industry and at the state level.
            </span>
          </div>

          <ImpactPipeline />

          <div className="mt-7 flex flex-wrap gap-2">
            {rutgers.stack.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </Window>
      </Reveal>

      {/* experience timeline */}
      <section>
        <Reveal>
          <SectionHeader
            index="01"
            label="experience"
            cmd="git log --experience"
            sub="where I've worked and what I shipped."
          />
        </Reveal>
        <div className="relative ml-2 space-y-10 border-l border-term-border pl-8">
          {experiences.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.1}>
              <div className="relative">
                <span className="absolute -left-[2.42rem] top-1.5 h-3 w-3 rounded-full border-2 border-term-cyan bg-term-bg" />
                <p className="text-xs text-term-muted">{exp.period}</p>
                <h3 className="mt-1 font-bold text-term-text">{exp.role}</h3>
                <p className="text-sm text-term-blue">
                  {exp.url ? (
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-term-blue/30 underline-offset-2 transition-colors hover:text-term-cyan hover:decoration-term-cyan"
                    >
                      {exp.company} ↗
                    </a>
                  ) : (
                    exp.company
                  )}{' '}
                  · <span className="text-term-muted">{exp.location}</span>
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-term-text/85">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="shrink-0 text-term-cyan">▸</span>
                      <span>
                        <Highlight>{b}</Highlight>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-2">
                  {exp.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* projects */}
      <section>
        <Reveal>
          <SectionHeader
            index="02"
            label="projects"
            cmd="ls ~/projects/"
            sub="things I've built end-to-end, on my own time."
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.12}>
              <Window title={`~/projects/${p.file}`} className="h-full">
                <h3 className="font-bold text-term-text">{p.title}</h3>
                <p className="mt-2 text-sm text-term-text/75">{p.description}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-term-text/85">
                  {p.details.map((d, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="shrink-0 text-term-cyan">▸</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-sm text-term-blue transition-colors hover:text-term-cyan"
                >
                  [view on github →]
                </a>
              </Window>
            </Reveal>
          ))}
        </div>
      </section>

      {/* github — live activity */}
      <section>
        <Reveal>
          <SectionHeader
            index="03"
            label="github"
            cmd="gh activity"
            sub="live from github — what I've been building lately."
          />
        </Reveal>
        <Reveal>
          <GitHubShowcase />
        </Reveal>
      </section>

      {/* skills */}
      <section>
        <Reveal>
          <SectionHeader
            index="04"
            label="stack"
            cmd="cat skills.yaml"
            sub="the tools I reach for, by category."
          />
        </Reveal>
        <div className="overflow-hidden rounded-lg border border-term-border bg-term-surface">
          {skills.map((s, i) => {
            const accents = [
              'text-term-cyan',
              'text-term-purple',
              'text-term-blue',
              'text-term-yellow',
              'text-term-green',
            ];
            const accent = accents[i % accents.length];
            return (
              <Reveal key={s.group} delay={i * 0.06}>
                <div
                  className={`flex flex-col gap-2.5 px-5 py-4 sm:flex-row sm:items-baseline ${
                    i > 0 ? 'border-t border-term-border/60' : ''
                  }`}
                >
                  <span className={`w-44 shrink-0 text-sm font-bold ${accent}`}>
                    {s.group}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span
                        key={item}
                        className="rounded border border-term-border bg-term-bg px-2.5 py-1 text-xs text-term-text/90 transition-all hover:-translate-y-0.5 hover:border-term-cyan/60 hover:text-term-cyan"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* resume + contact */}
      <Reveal>
        <Window title="~/work/contact.sh">
          <p className="text-sm text-term-muted">
            <span className="prompt-symbol"># </span>open to interesting problems in data science,
            ML, and AI systems. i love connecting with fellow builders, researchers, and
            curious minds — reach me anytime.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <a
              href={identity.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-term-cyan/60 bg-term-cyan/10 px-4 py-2 font-bold text-term-cyan transition-all hover:-translate-y-0.5 hover:bg-term-cyan/20"
            >
              [download resume.pdf]
            </a>
            <a
              href={`mailto:${identity.email}`}
              className="rounded border border-term-border px-4 py-2 text-term-text transition-all hover:-translate-y-0.5 hover:border-term-blue/60 hover:text-term-blue"
            >
              [email]
            </a>
            <a
              href={identity.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-term-border px-4 py-2 text-term-text transition-all hover:-translate-y-0.5 hover:border-term-blue/60 hover:text-term-blue"
            >
              [linkedin]
            </a>
            <a
              href={identity.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-term-border px-4 py-2 text-term-text transition-all hover:-translate-y-0.5 hover:border-term-blue/60 hover:text-term-blue"
            >
              [github]
            </a>
            <a
              href={`tel:${identity.phone.replace(/[^\d+]/g, '')}`}
              className="rounded border border-term-border px-4 py-2 text-term-text transition-all hover:-translate-y-0.5 hover:border-term-blue/60 hover:text-term-blue"
            >
              [call]
            </a>
          </div>
          <p className="mt-5 text-xs text-term-muted">
            {identity.email} · {identity.phone} · {identity.location}
          </p>
        </Window>
      </Reveal>

      <Reveal>
        <ContinueFooter
          href="/life"
          cmd="cd ~/life"
          label="there's more to me than models — football, the comeback, the runs."
        />
      </Reveal>
    </div>
  );
}
