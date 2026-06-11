import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Ojas Sharma — Data Scientist & AI Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Branded terminal-window social-share card (LinkedIn / X / iMessage previews). */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0a0e14',
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(122,162,247,0.18), transparent)',
          fontFamily: 'monospace',
          padding: 56,
        }}
      >
        {/* window chrome */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: '#f7768e' }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: '#e0af68' }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: '#9ece6a' }} />
          <div style={{ marginLeft: 18, fontSize: 24, color: '#5c6883' }}>~/whoami — zsh</div>
        </div>

        <div style={{ display: 'flex', fontSize: 30, color: '#7dcfff' }}>
          <span style={{ color: '#9ece6a' }}>ojas</span>
          <span style={{ color: '#5c6883' }}>@portfolio</span>
          <span style={{ color: '#5c6883' }}>:~$ </span>
          <span style={{ color: '#5c6883', marginLeft: 12 }}>whoami</span>
        </div>

        <div style={{ display: 'flex', fontSize: 92, fontWeight: 700, color: '#c8d0e0', marginTop: 18 }}>
          Ojas Sharma
        </div>

        <div style={{ display: 'flex', fontSize: 40, color: '#7dcfff', marginTop: 10 }}>
          Data Scientist &amp; AI Engineer
        </div>

        <div style={{ display: 'flex', fontSize: 28, color: '#5c6883', marginTop: 20, maxWidth: 920 }}>
          ex-pro footballer · 13.6B+ records modeled at Rutgers · LLM / RAG systems
        </div>

        <div style={{ display: 'flex', marginTop: 'auto', gap: 16 }}>
          {['Python', 'PySpark', 'LLMs', 'RAG', 'PyTorch'].map((t) => (
            <div
              key={t}
              style={{
                display: 'flex',
                fontSize: 24,
                color: '#7dcfff',
                border: '1px solid #1e2636',
                borderRadius: 8,
                padding: '8px 18px',
              }}
            >
              {t}
            </div>
          ))}
          <div style={{ display: 'flex', marginLeft: 'auto', fontSize: 26, color: '#5c6883' }}>
            ojassharma.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
