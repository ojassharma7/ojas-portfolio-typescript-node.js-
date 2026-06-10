import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import Nav from '@/components/Nav';
import ChatBot from '@/components/ChatBot';
import Background from '@/components/Background';
import CustomCursor from '@/components/CustomCursor';
import './globals.css';

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Ojas Sharma — Data Scientist & AI Engineer',
  description:
    'Data Scientist & AI Engineer, ex-pro footballer. Modeling billions of records at Rutgers and building LLM systems.',
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
        <ChatBot />
      </body>
    </html>
  );
}
