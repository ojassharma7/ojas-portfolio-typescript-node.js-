'use client';

import Link from 'next/link';
import Reveal from '@/components/Reveal';
import RunningChart from '@/components/RunningChart';
import StravaDashboard from '@/components/StravaDashboard';
import Window from '@/components/Window';
import { life } from '@/lib/profile';

export default function Life() {
  const km = life.running.weeklyKm;

  return (
    <div className="mx-auto max-w-5xl space-y-20 px-4 py-16">
      {/* header */}
      <Reveal>
        <p className="text-sm text-term-muted">
          <span className="prompt-user">ojas</span>
          <span className="prompt-symbol">@</span>
          <span className="text-term-purple">portfolio</span>
          <span className="prompt-symbol">:</span>
          <span className="prompt-path">~/life</span>
          <span className="prompt-symbol">$ </span>
          <span className="text-term-muted">cat story.md</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold text-term-text sm:text-4xl">
          The other side<span className="text-term-purple">_</span>
        </h1>
        <p className="mt-3 max-w-2xl text-term-muted">
          Before the models and the billions of records, there was a football pitch in
          Germany. This is that story.
        </p>
      </Reveal>

      {/* football -> ACL -> data science timeline */}
      <section>
        <Reveal>
          <h2 className="mb-8 text-2xl font-bold">
            <span className="prompt-symbol">$ </span>git log{' '}
            <span className="text-term-muted">--life --reverse</span>
          </h2>
        </Reveal>
        <div className="relative ml-2 space-y-10 border-l border-term-border pl-8">
          {life.timeline.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.12}>
              <div className="relative">
                <span
                  className={`absolute -left-[2.42rem] top-1.5 h-3 w-3 rounded-full border-2 bg-term-bg ${
                    i === 1 ? 'border-term-red' : 'border-term-purple'
                  }`}
                />
                <p className="text-xs uppercase tracking-widest text-term-muted">{item.year}</p>
                <h3 className={`mt-1 font-bold ${i === 1 ? 'text-term-red' : 'text-term-text'}`}>
                  {item.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-term-muted">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* running dashboard — real Strava data, with a static fallback before creds exist */}
      <Reveal>
        <Window title="~/life/running — strava-sync.log">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-bold text-term-purple">Still running</h2>
            <span className="text-xs text-term-muted">source: Strava</span>
          </div>
          <p className="mt-2 text-sm text-term-muted">{life.running.note}</p>

          <div className="mt-6">
            <StravaDashboard
              fallback={
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="mb-1.5 flex justify-between text-xs text-term-muted">
                      <span>weekly volume — last {life.running.weeks.length} weeks</span>
                      <span className="text-term-yellow">~{km} km / week</span>
                    </div>
                    <RunningChart weeks={life.running.weeks} />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded border border-term-border bg-term-bg px-3 py-3 text-center">
                      <div className="text-lg font-bold text-term-yellow">~{km} km</div>
                      <div className="mt-0.5 text-[11px] text-term-muted">per week</div>
                    </div>
                    <div className="rounded border border-term-border bg-term-bg px-3 py-3 text-center">
                      <div className="text-lg font-bold text-term-yellow">Strava</div>
                      <div className="mt-0.5 text-[11px] text-term-muted">every run logged</div>
                    </div>
                    <div className="rounded border border-term-border bg-term-bg px-3 py-3 text-center">
                      <div className="text-lg font-bold text-term-yellow">ACL ✓</div>
                      <div className="mt-0.5 text-[11px] text-term-muted">rebuilt &amp; tested</div>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </Window>
      </Reveal>

      {/* side builds */}
      <section>
        <Reveal>
          <h2 className="mb-8 text-2xl font-bold">
            <span className="prompt-symbol">$ </span>ls{' '}
            <span className="text-term-muted">~/side-builds/</span>
          </h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-3">
          {life.sideBuilds.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.08}>
              <div className="h-full rounded border border-term-border bg-term-surface p-4 transition-colors hover:border-term-purple/50">
                <h3 className="text-sm font-bold text-term-cyan">./{b.name}</h3>
                <p className="mt-2 text-sm text-term-muted">{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* photo grid placeholder */}
      <section>
        <Reveal>
          <h2 className="mb-8 text-2xl font-bold">
            <span className="prompt-symbol">$ </span>feh{' '}
            <span className="text-term-muted">~/photos/ --montage</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {['pitch-days.jpg', 'long-run.jpg', 'new-jersey.jpg', 'matchday.jpg', 'trail.jpg', 'setup.jpg'].map(
            (name, i) => (
              <Reveal key={name} delay={(i % 3) * 0.08}>
                <div className="flex aspect-square flex-col items-center justify-center rounded border border-dashed border-term-border bg-term-surface/50 text-center">
                  <span className="text-2xl text-term-muted">⊞</span>
                  <span className="mt-2 px-2 text-xs text-term-muted">{name}</span>
                  <span className="mt-1 text-[10px] text-term-border">coming soon</span>
                </div>
              </Reveal>
            )
          )}
        </div>
      </section>

      <Reveal>
        <p className="text-center text-sm text-term-muted">
          <span className="prompt-symbol"># </span>same human, different terminal — if any of
          this resonates, say hi anytime at{' '}
          <a
            href="mailto:ojassharma16@gmail.com"
            className="text-term-cyan underline decoration-term-cyan/40 underline-offset-4 hover:decoration-term-cyan"
          >
            ojassharma16@gmail.com
          </a>
        </p>
        <p className="mt-4 text-center text-sm text-term-muted">
          <Link href="/work" className="text-term-cyan hover:text-term-purple">
            cd ../work →
          </Link>{' '}
          back to the day job.
        </p>
      </Reveal>
    </div>
  );
}
