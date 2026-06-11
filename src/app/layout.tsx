import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import Nav from '@/components/Nav';
import ChatBot from '@/components/ChatBot';
import Background from '@/components/Background';
import CustomCursor from '@/components/CustomCursor';
import CommandPalette from '@/components/CommandPalette';
import './globals.css';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const SITE_URL = 'https://ojassharma.vercel.app';
const TITLE = 'Ojas Sharma — Data Scientist & AI Engineer';
const DESCRIPTION =
  'Data Scientist & AI Engineer, ex-pro footballer. Modeling 13.6B+ records at Rutgers (informing multi-billion-dollar policy) and shipping LLM / RAG systems.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Ojas Sharma',
    'Data Scientist',
    'AI Engineer',
    'Machine Learning',
    'LLM',
    'RAG',
    'Rutgers',
    'PySpark',
    'data science portfolio',
  ],
  authors: [{ name: 'Ojas Sharma', url: SITE_URL }],
  creator: 'Ojas Sharma',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'ojas@portfolio',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@OjasSha92624851',
  },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={mono.variable} suppressHydrationWarning>
      <body>
        {/* set theme class before first paint to avoid a flash of the wrong mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}`,
          }}
        />
        <Background />
        <CustomCursor />
        <Nav />
        <main className="pt-14">{children}</main>
        <CommandPalette />
        <ChatBot />
      </body>
    </html>
  );
}
