'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GREETING =
  'hi — ask me anything about ojas: the gambling-research work at rutgers, his projects, or how a pro footballer ended up in data science.';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

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
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open ask-ojas chat"
        className="fixed bottom-5 right-5 z-50 rounded border border-term-border bg-term-surface px-4 py-2.5 text-sm text-term-cyan shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-0.5 hover:border-term-cyan/50"
      >
        {isOpen ? '[x] close' : '$ ask-ojas'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-20 right-5 z-50 flex h-[min(560px,70vh)] w-[min(400px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-lg border border-term-border bg-term-surface shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-2 border-b border-term-border bg-term-raised px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-term-red/80" />
              <span className="h-3 w-3 rounded-full bg-term-yellow/80" />
              <span className="h-3 w-3 rounded-full bg-term-green/80" />
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
