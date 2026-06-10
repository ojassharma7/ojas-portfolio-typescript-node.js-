# Ojas Sharma's Portfolio

A dark, terminal-themed portfolio built with Next.js (App Router), Tailwind CSS, and Framer Motion — monospace fonts, shell-prompt styling, window-style cards, and an AI chatbot.

## Features

- 🖥️ Riced-Linux / terminal aesthetic — shell prompts, window chrome, blinking cursors
- ⌨️ Typewriter landing page with two doors: `[WORK]` and `[LIFE]`
- 📊 `/work` — Rutgers Center for Gambling Studies research, experience timeline, projects
- ⚽ `/life` — pro football in Germany, the ACL comeback, running dashboard
- 🤖 `ask-ojas` — a site-wide terminal chatbot (Claude API or free Hugging Face models)
- 🎭 Smooth scroll-reveal animations
- 📱 Fully responsive

## Tech Stack

- [Next.js](https://nextjs.org/) — React framework (App Router)
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Framer Motion](https://www.framer.com/motion/) — animations
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [Claude API](https://platform.claude.com/) / [Hugging Face](https://huggingface.co/) — chatbot

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/ojassharma7/ojas-portfolio-typescript-node.js-.git portfolio
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Enable the chatbot — create `.env.local` with **one** of:
   ```bash
   HF_TOKEN=hf_...            # free (Hugging Face Inference Providers)
   ANTHROPIC_API_KEY=sk-ant-... # paid, better answers (Claude)
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio/
├── public/              # Static files (photo, resume)
├── src/
│   ├── app/
│   │   ├── page.tsx     # Landing — identity + [WORK]/[LIFE] doors
│   │   ├── work/        # Professional page
│   │   ├── life/        # Personal page
│   │   └── api/chat/    # ask-ojas chatbot route (Claude / Hugging Face)
│   ├── components/      # Window, Typewriter, Reveal, Nav, ChatBot
│   └── lib/profile.ts   # All site content + chatbot system prompt
├── tailwind.config.ts
└── package.json
```

## Customization

All content (bio, experience, projects, life facts) lives in `src/lib/profile.ts` — edit it once and both the pages and the chatbot system prompt update.

## Deployment

Deploy on [Vercel](https://vercel.com/new) — set `HF_TOKEN` (or `ANTHROPIC_API_KEY`) in the project's environment variables to enable the chatbot.

## Contact

Reach me at [ojassharma16@gmail.com](mailto:ojassharma16@gmail.com) or connect on [LinkedIn](https://linkedin.com/in/ojassharma16).
