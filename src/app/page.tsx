'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaXTwitter, FaRegFileLines } from 'react-icons/fa6';
import { SiGmail } from 'react-icons/si';
import AgeCounter from '@/components/AgeCounter';
import ViewCounter from '@/components/ViewCounter';
import BootIntro from '@/components/BootIntro';
import Terminal from '@/components/Terminal';
import Typewriter from '@/components/Typewriter';
import Window from '@/components/Window';
import { identity } from '@/lib/profile';

export default function Home() {
  const [typed, setTyped] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
      <BootIntro />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <Window title="~/whoami — zsh">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="shrink-0"
            >
              <Image
                src="/profile.jpg"
                alt="Ojas Sharma"
                width={180}
                height={180}
                priority
                className="rounded border border-term-cyan/40 object-cover shadow-[0_0_28px_rgba(125,207,255,0.18)]"
              />
            </motion.div>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="mb-2 text-sm">
                <span className="prompt-user">ojas</span>
                <span className="prompt-symbol">@</span>
                <span className="text-term-purple">portfolio</span>
                <span className="prompt-symbol">:~$ </span>
                <span className="text-term-muted">whoami</span>
              </p>
              <h1 className="mb-4 text-3xl font-bold tracking-tight text-term-text sm:text-4xl">
                <Typewriter text={identity.name} speed={80} startDelay={500} onDone={() => setTyped(true)} />
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: typed ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="text-term-muted"
              >
                <span className="font-bold text-term-cyan">Data Scientist &amp; AI Engineer</span>{' '}
                — <span className="text-term-purple">ex-pro footballer</span>.{' '}
                <span className="text-term-text">I solve problems at scale.</span>
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: typed ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-4 space-y-1 text-xs text-term-muted"
              >
                <p>
                  <span className="prompt-symbol">~ </span>
                  <AgeCounter />
                </p>
                <p>
                  <span className="prompt-symbol">~ </span>
                  <ViewCounter />
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: typed ? 1 : 0, y: typed ? 0 : 12 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10"
          >
            <p className="mb-3 text-sm text-term-muted">
              <span className="prompt-symbol"># </span>where to?
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/work"
                className="group rounded border border-term-border bg-term-raised px-6 py-5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-term-cyan/60 hover:shadow-[0_0_24px_rgba(125,207,255,0.14)]"
              >
                <span className="text-lg font-bold tracking-[0.25em] text-term-cyan">
                  [WORK]
                </span>
                <p className="mt-1.5 text-xs text-term-muted group-hover:text-term-text">
                  cd ~/work — data, models, billions of records
                </p>
              </Link>
              <Link
                href="/life"
                className="group rounded border border-term-border bg-term-raised px-6 py-5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-term-purple/60 hover:shadow-[0_0_24px_rgba(187,154,247,0.12)]"
              >
                <span className="text-lg font-bold tracking-[0.25em] text-term-purple">
                  [LIFE]
                </span>
                <p className="mt-1.5 text-xs text-term-muted group-hover:text-term-text">
                  cd ~/life — football, the comeback, the runs
                </p>
              </Link>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-term-text">
                <span className="prompt-symbol"># </span>i love connecting with fellow
                builders, data nerds, and curious minds — reach me anytime at{' '}
                <a
                  href={`mailto:${identity.email}`}
                  className="text-term-cyan underline decoration-term-cyan/40 underline-offset-4 transition-colors hover:decoration-term-cyan"
                >
                  {identity.email}
                </a>
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-5">
                <a
                  href={identity.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  title="X"
                  className="text-term-text transition-all hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgb(var(--t-text)/0.6)]"
                >
                  <FaXTwitter size={22} />
                </a>
                <a
                  href={identity.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  title="GitHub"
                  className="text-term-text transition-all hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgb(var(--t-text)/0.6)]"
                >
                  <FaGithub size={22} />
                </a>
                <a
                  href={identity.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="text-[#0A66C2] transition-all hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.7)]"
                >
                  <FaLinkedin size={22} />
                </a>
                <a
                  href={`mailto:${identity.email}`}
                  aria-label="Email"
                  title="Gmail"
                  className="text-[#EA4335] transition-all hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(234,67,53,0.7)]"
                >
                  <SiGmail size={21} />
                </a>
                <a
                  href={identity.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Resume"
                  title="Resume"
                  className="text-term-yellow transition-all hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgb(var(--t-yellow)/0.7)]"
                >
                  <FaRegFileLines size={21} />
                </a>
              </div>
            </div>

            <div className="mt-6">
              <Terminal />
            </div>
          </motion.div>
        </Window>
      </motion.div>
    </div>
  );
}
