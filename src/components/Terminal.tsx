'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { identity } from '@/lib/profile';

type Entry = { cmd: string; out: string[] };

const HELP: string[] = [
  'available commands:',
  '  help          show this list',
  '  ls            list what lives here',
  '  cd work       go to the professional side',
  '  cd life       go to the other side',
  '  whoami        who is this guy?',
  '  resume        open resume.pdf',
  '  contact       how to reach me',
  '  neofetch      system info',
  '  clear         wipe the screen',
];

/** Typeable fake shell — commands navigate the site or print output. */
export default function Terminal() {
  const router = useRouter();
  const [history, setHistory] = useState<Entry[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const run = (raw: string): string[] | 'clear' | null => {
    const cmd = raw.trim().toLowerCase().replace(/\s+/g, ' ');
    if (!cmd) return null;
    if (cmd === 'help' || cmd === '?') return HELP;
    if (cmd === 'ls' || cmd === 'ls -la')
      return ['work/   life/   resume.pdf   contact.md'];
    if (cmd === 'cd work' || cmd === 'cd ./work' || cmd === 'cd ~/work' || cmd === 'work') {
      router.push('/work');
      return ['entering ~/work ...'];
    }
    if (cmd === 'cd life' || cmd === 'cd ./life' || cmd === 'cd ~/life' || cmd === 'life') {
      router.push('/life');
      return ['entering ~/life ...'];
    }
    if (cmd === 'cd' || cmd === 'cd ~' || cmd === 'cd ..') return ['already home.'];
    if (cmd === 'whoami')
      return [identity.name, identity.tagline];
    if (cmd === 'resume' || cmd === 'cat resume.pdf' || cmd === 'open resume.pdf') {
      window.open(identity.resume, '_blank');
      return ['opening resume.pdf ...'];
    }
    if (cmd === 'contact' || cmd === 'cat contact.md')
      return [
        `email:    ${identity.email}`,
        `github:   ${identity.github}`,
        `linkedin: ${identity.linkedin}`,
      ];
    if (cmd === 'neofetch')
      return [
        '        ▲       ojas@portfolio',
        '       ▲ ▲      ---------------',
        '      ▲   ▲     os:      ojas-os v2.0',
        '     ▲ ▲ ▲ ▲    host:    new brunswick, nj',
        '                kernel:  statistics + ml',
        '                uptime:  ex-footballer, ACL-rebuilt',
        '                shell:   ask-ojas (bottom right)',
      ];
    if (cmd === 'clear') return 'clear';
    if (cmd === 'pwd') return ['/home/ojas'];
    if (cmd === 'date') return [new Date().toString()];
    if (cmd === 'echo' || cmd === '') return [''];
    if (cmd.startsWith('echo ')) return [raw.trim().slice(5)];
    if (cmd === 'hi' || cmd === 'hello' || cmd === 'hey')
      return ['hey 👋 — type `help`, or hit ⌘K for the command palette.'];
    // --- easter eggs ---
    if (cmd === 'sudo' || cmd.startsWith('sudo '))
      return ['nice try. permission denied — this is my machine. 😏'];
    if (cmd === 'rm -rf /' || cmd === 'rm -rf /*' || cmd === 'rm -rf ~')
      return ['whoa. deleting a portfolio I spent weeks on? bold. (request ignored)'];
    if (cmd === 'cmatrix')
      return ['wake up, Neo... 🟢', 'the code rain behind you was already the matrix.'];
    if (cmd === 'sl')
      return ['🚂💨  choo choo — you typed sl instead of ls. classic.'];
    if (cmd === 'coffee' || cmd === 'make coffee')
      return ['     ( (', '      ) )', '   ........', '   |      |]', '   \\      /', "    `----'   brewing... ☕  the real fuel behind the models."];
    if (cmd === 'vim' || cmd === 'emacs')
      return ['let\'s not start a holy war. (`:q!` to escape, if you can)'];
    if (cmd === 'joke')
      return ['there are 10 kinds of people: those who understand binary, and those who don\'t.'];
    if (cmd === 'man' || cmd.startsWith('man '))
      return ['no manual here — but `ask-ojas` (bottom right) knows everything about me.'];
    if (cmd === 'ping') return ['pong. 🏓 latency: somewhere between a tempo run and a long run.'];
    if (cmd === 'ls -a' || cmd === 'ls -la')
      return ['.  ..  .secrets  work/  life/  resume.pdf  contact.md', '(the .secrets file is, well, secret.)'];
    if (cmd === 'cat .secrets')
      return ['recovering striker turned data scientist. that\'s the whole secret. 🔓'];
    if (cmd === 'history')
      return ['1  cd ~/germany', '2  git revert acl-injury  # failed', '3  cd ~/data-science', '4  ./never_quit.sh'];
    if (cmd === 'exit' || cmd === 'q' || cmd === ':q')
      return ['there is no escape. try `cd work` instead.'];
    return [`command not found: ${cmd} — try \`help\` or ⌘K`];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = run(input);
    if (result === 'clear') {
      setHistory([]);
    } else if (result) {
      setHistory((prev) => [...prev.slice(-30), { cmd: input.trim(), out: result }]);
    }
    setInput('');
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    });
  };

  return (
    <div
      className="cursor-text rounded border border-term-border bg-term-bg/60 px-4 py-3 text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="max-h-48 space-y-2 overflow-y-auto">
        {history.length === 0 && (
          <p className="text-term-muted">
            <span className="prompt-symbol"># </span>this prompt is real — type{' '}
            <span className="text-term-cyan">help</span> and hit enter.
          </p>
        )}
        {history.map((entry, i) => (
          <div key={i}>
            <p>
              <span className="prompt-user">ojas</span>
              <span className="prompt-symbol">@</span>
              <span className="text-term-purple">portfolio</span>
              <span className="prompt-symbol">:~$ </span>
              <span className="text-term-text">{entry.cmd}</span>
            </p>
            {entry.out.map((line, j) => (
              <p key={j} className="whitespace-pre-wrap pl-2 text-term-muted">
                {line}
              </p>
            ))}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center gap-0">
          <span className="prompt-user">ojas</span>
          <span className="prompt-symbol">@</span>
          <span className="text-term-purple">portfolio</span>
          <span className="prompt-symbol">:~$&nbsp;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="terminal input"
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-term-text caret-term-cyan outline-none"
          />
        </form>
      </div>
    </div>
  );
}
