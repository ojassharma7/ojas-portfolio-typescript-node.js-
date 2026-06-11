'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Typewriter from '@/components/Typewriter';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GREETING =
  'hi — ask me anything about ojas: the gambling-research work at rutgers, his projects, or how a pro footballer ended up in data science.';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const openChat = () => {
    setIsOpen(true);
    setEverOpened(true);
    setShowNudge(false);
  };
  const toggleChat = () => (isOpen ? setIsOpen(false) : openChat());

  // red: close + wipe the conversation (next open starts fresh)
  const handleClose = () => {
    setIsOpen(false);
    setMaximized(false);
    setMessages([]);
    setInput('');
  };
  // green: just hide the window — conversation is kept for next open
  const handleMinimize = () => setIsOpen(false);
  // yellow: toggle a roomier size (not fullscreen)
  const handleMaximize = () => setMaximized((v) => !v);

  // typed nudge bubble: appears a few seconds in, retires after first open
  useEffect(() => {
    if (everOpened) return;
    const show = setTimeout(() => setShowNudge(true), 3500);
    const hide = setTimeout(() => setShowNudge(false), 15000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [everOpened]);

  // cursor-reactive magnet: button brightens & leans toward a nearby cursor
  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    if (isOpen || !window.matchMedia('(pointer: fine)').matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const prox = Math.max(0, 1 - Math.hypot(dx, dy) / 300); // 0 (far) … 1 (on it)
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        btn.style.transform = `translateY(${prox * -5}px) scale(${1 + prox * 0.09})`;
        btn.style.boxShadow = `0 8px 32px rgba(0,0,0,0.5), 0 0 ${18 + prox * 46}px rgba(125,207,255,${0.08 + prox * 0.45})`;
        btn.style.borderColor = `rgba(125,207,255,${0.3 + prox * 0.6})`;
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      btn.style.transform = '';
      btn.style.boxShadow = '';
      btn.style.borderColor = '';
    };
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // let the command palette open the chat
  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener('ojas:open-chat', open);
    return () => window.removeEventListener('ojas:open-chat', open);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage || isLoading) return;

    const history = [...messages, { role: 'user' as const, content: userMessage }];
    setInput('');
    setMessages(history);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      const data = await response.json();
      const reply = response.ok
        ? data.response
        : data.error ?? 'something went wrong. try again?';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'connection error — try again in a moment.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        {/* attention cues — retire once the chat has been opened */}
        {!everOpened && !isOpen && (
          <>
            {/* breathing glow behind the button */}
            <span className="pointer-events-none absolute inset-0 -z-10 rounded-lg bg-term-cyan/30 blur-xl animate-glow-pulse" />
            {/* guiding light beam darting toward the button */}
            <span className="pointer-events-none absolute right-6 top-1/2 -z-10 h-px w-28 origin-right -rotate-[24deg] bg-gradient-to-l from-term-cyan to-transparent animate-beam-sweep" />
          </>
        )}

        {/* typed nudge bubble */}
        <AnimatePresence>
          {showNudge && !isOpen && (
            <motion.button
              onClick={openChat}
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-full right-0 mb-3 w-max max-w-[78vw] rounded-lg border border-term-cyan/40 bg-term-surface px-3 py-2 text-left text-xs text-term-text shadow-[0_8px_28px_rgba(0,0,0,0.5)]"
            >
              <span className="prompt-symbol"># </span>
              <Typewriter
                text="psst — ask me anything about ojas ↓"
                speed={32}
                startDelay={120}
              />
              {/* little pointer tail */}
              <span className="absolute -bottom-1 right-6 h-2 w-2 rotate-45 border-b border-r border-term-cyan/40 bg-term-surface" />
            </motion.button>
          )}
        </AnimatePresence>

        <button
          ref={buttonRef}
          onClick={toggleChat}
          aria-label="Open ask-ojas chat"
          className="relative rounded-lg border border-term-cyan/50 bg-term-surface px-4 py-2.5 text-sm text-term-cyan shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-colors"
        >
          {isOpen ? '[x] close' : '$ ask-ojas'}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className={`fixed bottom-20 right-5 z-50 flex flex-col overflow-hidden rounded-lg border border-term-border bg-term-surface shadow-[0_16px_48px_rgba(0,0,0,0.6)] transition-[width,height] duration-200 ${
              maximized
                ? 'h-[min(760px,88vh)] w-[min(620px,calc(100vw-2.5rem))]'
                : 'h-[min(560px,70vh)] w-[min(400px,calc(100vw-2.5rem))]'
            }`}
          >
            <div className="flex items-center gap-2 border-b border-term-border bg-term-raised px-4 py-2.5">
              <button
                onClick={handleClose}
                aria-label="Close and clear conversation"
                title="close + new chat"
                className="group flex h-3 w-3 items-center justify-center rounded-full bg-term-red/80 transition-transform hover:scale-110"
              >
                <span className="text-[7px] font-bold leading-none text-term-bg opacity-0 group-hover:opacity-100">
                  ✕
                </span>
              </button>
              <button
                onClick={handleMaximize}
                aria-label={maximized ? 'Restore size' : 'Maximize'}
                title={maximized ? 'restore' : 'maximize'}
                className="group flex h-3 w-3 items-center justify-center rounded-full bg-term-yellow/80 transition-transform hover:scale-110"
              >
                <span className="text-[7px] font-bold leading-none text-term-bg opacity-0 group-hover:opacity-100">
                  {maximized ? '−' : '+'}
                </span>
              </button>
              <button
                onClick={handleMinimize}
                aria-label="Minimize (keep conversation)"
                title="hide (keeps chat)"
                className="group flex h-3 w-3 items-center justify-center rounded-full bg-term-green/80 transition-transform hover:scale-110"
              >
                <span className="text-[7px] font-bold leading-none text-term-bg opacity-0 group-hover:opacity-100">
                  –
                </span>
              </button>
              <span className="ml-3 text-xs text-term-muted">ask-ojas — interactive session</span>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm leading-relaxed">
              <div>
                <span className="text-term-muted"># </span>
                <span className="text-term-muted">{GREETING}</span>
              </div>
              {messages.map((m, i) =>
                m.role === 'user' ? (
                  <div key={i}>
                    <span className="prompt-user">you</span>
                    <span className="prompt-symbol">$ </span>
                    <span>{m.content}</span>
                  </div>
                ) : (
                  <div key={i} className="whitespace-pre-wrap">
                    <span className="text-term-cyan">ask-ojas</span>
                    <span className="prompt-symbol">&gt; </span>
                    <span className="text-term-text">{m.content}</span>
                  </div>
                )
              )}
              {isLoading && (
                <div>
                  <span className="text-term-cyan">ask-ojas</span>
                  <span className="prompt-symbol">&gt; </span>
                  <span className="cursor-block" />
                </div>
              )}
              <div ref={endRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t border-term-border p-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="prompt-user shrink-0">you</span>
                <span className="prompt-symbol shrink-0">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="type a question…"
                  className="w-full bg-transparent text-term-text placeholder-term-muted/60 caret-term-cyan outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="shrink-0 text-term-cyan transition-opacity disabled:opacity-40"
                >
                  [enter]
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
