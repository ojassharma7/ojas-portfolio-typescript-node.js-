export const identity = {
  name: 'Ojas Sharma',
  title: 'Data Scientist & AI Engineer',
  tagline:
    'Data Scientist & AI Engineer — ex-pro footballer. I solve problems at scale.',
  location: 'New Brunswick, NJ, USA',
  email: 'ojassharma16@gmail.com',
  phone: '+1 (929) 684-7733',
  github: 'https://github.com/ojassharma7',
  linkedin: 'https://www.linkedin.com/in/ojassharma16',
  x: 'https://x.com/OjasSha92624851',
  strava: 'https://www.strava.com/athletes/141478102',
  /** ISO date of birth — drives the live age counter on the landing page. */
  born: '2001-10-16',
  resume: '/Resume_Ojas_Sharma.pdf',
  education:
    "M.S. in Statistics — Data Science, Rutgers University, New Brunswick (May 2025)",
};

export const rutgers = {
  org: 'Center for Gambling Studies, Rutgers University',
  role: 'Data Scientist',
  period: 'April 2024 — Present',
  location: 'New Brunswick, NJ',
  stats: [
    { value: '4.5 TB', label: 'raw behavioral data' },
    { value: '13.6 B', label: 'records analyzed' },
    { value: '1 M+', label: 'gamblers risk-profiled' },
  ],
  url: 'https://socialwork.rutgers.edu/centers/center-gambling-studies',
  policy:
    'directly influencing multi-billion-dollar policy decisions — across the gambling industry and at the state level.',
  /** plain-language story of the work, for any reader — technical or not */
  story: [
    {
      tag: 'the problem',
      accent: 'red',
      text: 'Millions gamble online, and a hidden cohort quietly spirals into dangerous overspending — yet no platform is required to catch them. Untreated, it cascades into bankruptcy, crime, and worse.',
    },
    {
      tag: 'what I build',
      accent: 'cyan',
      text: 'ML models that read behavioral fingerprints — bigger bets, rising frequency, a growing share of income spent — across 13.6 billion real betting events, to pinpoint the exact tipping point where someone crosses into high-risk.',
    },
    {
      tag: 'the impact',
      accent: 'green',
      text: 'At-risk players get flagged early for support — resources, mandatory cooling-off periods — and the models hand state regulators the evidence to shape policy and require platforms to adopt safeguards.',
    },
  ],
  /** third-party validation — Rutgers School of Social Work AI feature */
  feature: {
    quote:
      'Machine learning can trace these patterns to find a tipping point that places individuals into a risk category. This is virtually impossible to do with human calculations alone.',
    author: 'Dr. Lia Nower',
    role: 'Director, Center for Gambling Studies',
    source: 'Rutgers School of Social Work — feature on AI for social change',
  },
  /** the modeling workflow, rendered as a pipeline diagram on /work (in correct ML order) */
  pipeline: [
    { cmd: 'ingest', title: '4.5 TB · 13.6B events', sub: 'PySpark + SQL across 7 operators' },
    { cmd: 'preprocess', title: 'clean · normalize · reduce', sub: 'missing-value handling, Z-Score & IQR filtering, PCA (95% variance)' },
    { cmd: 'engineer', title: 'behavioral features', sub: 'deposit, session & wagering signals per gambler' },
    { cmd: 'cluster', title: 'K-Means · GMM', sub: '1M+ gamblers segmented · silhouette 0.79' },
    { cmd: 'classify', title: 'SVM · LightGBM', sub: 'multi-class risk · A/B-validated' },
    { cmd: 'deploy', title: 'interventions → policy', sub: 'industry & state-level regulation' },
  ],
  /** measured outcomes, rendered as animated meters on /work */
  impacts: [
    { label: 'intervention effectiveness', display: '+33%', pct: 83 },
    { label: 'early-risk identification', display: '+30%', pct: 75 },
    { label: 'clustering silhouette score', display: '0.79', pct: 79 },
    { label: 'high-risk gambler detection', display: '+6%', pct: 15 },
  ],
  stack: [
    'Python',
    'PySpark',
    'SQL',
    'K-Means / GMM',
    'LightGBM',
    'CatBoost',
    'PCA',
    'A/B Testing',
  ],
  highlights: [
    'Engineered an in-depth analysis on a 4.5 TB dataset with 13.6 billion records from seven gambling operators, identifying high-risk gambler profiles to enable timely early interventions.',
    'Built and deployed data-driven risk assessment models like K-Means and GMM clustering models to classify over 1 million gamblers based on behavioral indicators, achieving a Silhouette Score of 0.79, improving precision of regulatory policy insights.',
    'Enhanced effectiveness of early gambling interventions by 33% through improved multi-class risk classification models (SVM, LightGBM), validated via A/B testing on intervention outcomes.',
    'Monitored an outlier detection pipeline using Z-Score, IQR filtering, and PCA (95% variance retained) to detect irregular deposit patterns, enhancing the accuracy of fraud detection systems.',
    'Accomplished high-risk gambler detection by 6% and boosted early-risk identification by 30%, influencing multi-billion-dollar policy decisions and state-level regulations.',
  ],
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  stack: string[];
  bullets: string[];
  url?: string;
};

export const experiences: Experience[] = [
  {
    company: rutgers.org,
    role: rutgers.role,
    period: rutgers.period,
    location: rutgers.location,
    stack: rutgers.stack,
    bullets: rutgers.highlights,
    url: rutgers.url,
  },
  {
    company: 'Omalco Extrusion',
    role: 'Data Analyst',
    period: 'August 2022 — July 2023',
    location: 'New Delhi, India',
    stack: ['Power BI', 'D3.js', 'PostgreSQL', 'Couchbase', 'Python', 'ARIMA', 'Prophet'],
    bullets: [
      'Automated financial reporting and market analysis using Power BI and D3.js, improving business team efficiency by 80% and reducing ETL job runtime by 50% through optimized reporting table logic.',
      'Developed real-time data pipelines and applied time-series forecasting (ARIMA, Prophet) to predict sales and demand, driving strategic planning and inventory management.',
      'Architected and deployed hybrid data storage solutions combining PostgreSQL and Couchbase, powering real-time dashboards with D3.js for up-to-the-minute market visualization and faster decision-making.',
      'Leveraged linear regression and hypothesis testing to pinpoint seasonal demand fluctuations, directly informing pricing and inventory strategies, impacting 100+ products from the company’s offerings.',
    ],
  },
];

export type Recommendation = {
  name: string;
  title: string;
  relation: string;
  date: string;
  text: string;
  source: string;
};

export const recommendations: Recommendation[] = [
  {
    name: 'Jackie Friedman Stanmyre',
    title:
      'Assistant Director, Center for Gambling Studies — Rutgers University School of Social Work',
    relation: 'managed Ojas directly',
    date: 'December 2025',
    text: 'Ojas has been an invaluable asset as a data scientist with the Center for Gambling Studies team. He has guided the development of unsupervised machine learning algorithms to classify the risk level of gamblers based on behavioral data. Throughout this process, he has shown an eagerness to understand the base of literature to combine subject matter knowledge with his data science expertise.',
    source: 'LinkedIn',
  },
];

export type Project = {
  title: string;
  file: string;
  github: string;
  stack: string[];
  description: string;
  details: string[];
};

export const projects: Project[] = [
  {
    title: 'ReferrAI — AI Job & Referral Engine',
    file: 'referrai.md',
    github:
      'https://github.com/ojassharma7/-ReferrAI-AI-Job-Engine-Automated-Referrals-Outreach-Tracking',
    stack: ['n8n', 'Gemini AI', 'Google Sheets', 'Hunter.io', 'Gmail API'],
    description:
      'A fully automated referral-request workflow that finds contacts, writes tailored outreach, and tracks responses end-to-end.',
    details: [
      'Discovers relevant contacts via Hunter.io and Jobrights.io for each target role.',
      'Drafts personalized referral emails with Gemini AI, tuned to the job description.',
      'Generates customized resumes and cover letters per posting, then sends via Gmail.',
      'Orchestrated in n8n with Google Sheets as the tracker for outreach and replies.',
    ],
  },
  {
    title: 'Advanced RAG Pipeline for Question Answering',
    file: 'rag-pipeline.md',
    github: 'https://github.com/ojassharma7/RAG-Based-LLM-Application',
    stack: ['LLaMA 3', 'LangChain', 'FAISS', 'PyTorch', 'FastAPI'],
    description:
      'High-performance Retrieval-Augmented Generation system integrating LLaMA 3, LangChain, and FAISS.',
    details: [
      'Improved response accuracy by 70% while optimizing retrieval efficiency.',
      'Low-latency vector search with FAISS — query time cut from 90ms to 30ms (~80% speedup).',
      'CI/CD via GitHub Actions for automated deployment and model performance tracking.',
      'FastAPI interface for efficient querying of the RAG system.',
    ],
  },
  {
    title: 'LLM-Powered Product Recommendations',
    file: 'llm-recsys.md',
    github: 'https://github.com/ojassharma7/LLM-Recommendation-System',
    stack: ['PyTorch', 'Hugging Face', 'LoRA / QLoRA', 'NLP'],
    description:
      'Product recommendation system built on fine-tuned LLMs for next-purchase prediction.',
    details: [
      'Fine-tuned Mistral-7B and TinyLlama on the Amazon Review Dataset.',
      '98%+ accuracy in next-purchase prediction via novel prompting and efficient fine-tuning (LoRA, QLoRA).',
      'Advanced NLP for understanding product descriptions and user preferences.',
    ],
  },
  {
    title: 'Comparative Analysis of RAG Techniques',
    file: 'rag-techniques.md',
    github: 'https://github.com/ojassharma7/RAG-TECHNIQUES',
    stack: ['Python', 'RAG', 'Evaluation Metrics'],
    description:
      'A study comparing RAG architectures across latency, coherence, and accuracy.',
    details: [
      'End-to-end evaluation determining Hybrid RAG as the most effective architecture.',
      'Identified key retrieval trade-offs, optimizing contextual relevance while reducing hallucinations.',
      'Developed standardized evaluation metrics for comparing RAG implementations.',
    ],
  },
  {
    title: 'Campus Watch Crime Analytics',
    file: 'campus-watch.md',
    github: 'https://github.com/ojassharma7/Rutgers-Crime-Campus-Watch-Dash-App',
    stack: ['Python', 'Selenium', 'Plotly', 'Dash'],
    description:
      'Real-time interactive dashboard analyzing campus crime patterns and trends.',
    details: [
      'Daily data scraped from SpotCrime via a Selenium-based automated pipeline.',
      'Interactive Plotly charts and geospatial maps of crime hotspots.',
      'Blends data engineering, visualization, and automation for public safety analytics.',
    ],
  },
];

export const skills = [
  { group: 'languages', items: ['Python', 'PySpark', 'SQL', 'R', 'C++', 'C', 'Java', 'Flask', 'MATLAB'] },
  { group: 'ml / dl', items: ['Statistical & Regression Analysis', 'Clustering Algorithms', 'Boosting / Bagging', 'Keras', 'PyTorch'] },
  { group: 'databases / cloud', items: ['Big Data Analytics', 'MySQL', 'PostgreSQL', 'Hadoop', 'Snowflake', 'AWS', 'Vector DBs', 'Pinecone', 'LanceDB'] },
  { group: 'nlp', items: ['LLMs', 'RAG', 'Text Preprocessing', 'Named Entity Recognition', 'Hugging Face', 'LangChain'] },
  { group: 'data viz', items: ['Power BI', 'Tableau', 'GGPLOT2', 'Plotly', 'Seaborn'] },
];

export const life = {
  timeline: [
    {
      year: 'before',
      title: 'Professional footballer — Germany',
      body: 'Played football professionally in Germany. Discipline, pressure, and reading the game in real time — the original pattern-recognition training.',
    },
    {
      year: 'the break',
      title: 'ACL injury',
      body: 'A torn ACL ended the playing career. The recovery months became the pivot point: if I couldn\'t read the game on the pitch, I\'d read it in the data.',
    },
    {
      year: 'now',
      title: 'Data science & AI',
      body: 'Same athlete\'s obsession, new arena — from a Master\'s in Statistics at Rutgers to modeling billions of records and building LLM systems.',
    },
  ],
  running: {
    weeklyKm: 20,
    // fallback bars shown only before the live Strava feed is configured
    weeks: [16, 21, 18, 23, 19, 24, 21, 20],
    source: 'Strava',
    note: 'The knee is rebuilt and the engine still runs — tracked on Strava, synced live below.',
    // personal records (manual — Strava's API doesn't expose these cleanly). Leave '' to hide.
    prs: { fiveK: '19:48', tenK: '44:59' },
  },
  photos: [
    { src: '/photos/p1.jpg', caption: 'golden-hour miles' },
    { src: '/photos/p2.jpg', caption: 'the trophy years' },
    { src: '/photos/p3.jpg', caption: 'M.S. — Rutgers ’25' },
    { src: '/photos/p4.jpg', caption: 'matchday' },
    { src: '/photos/p5.jpg', caption: 'the setup' },
    { src: '/photos/p6.jpg', caption: 'the why' },
  ],
  sideBuilds: [
    { name: 'ask-ojas', desc: 'The terminal chatbot on this very site — ask it anything about me.' },
    { name: 'this portfolio', desc: 'Next.js + Tailwind + Framer Motion, riced like my Linux setup.' },
    { name: 'running analytics', desc: 'A live Strava dashboard on this site — weekly volume, pace trends, recent runs.' },
  ],
};

/**
 * Extra knowledge for the ask-ojas chatbot. This is the easy place to add
 * unlimited detail about yourself — the bot reads all of it, no infra needed.
 *
 * - `notes`: freeform facts/stories (one string per idea, any length).
 * - `faq`:   anticipated questions + the exact answer you'd want the bot to give.
 *
 * Everything here is injected into the system prompt automatically.
 */
export const knowledge = {
  notes: [
    // — Builder mindset & drive —
    "Ojas loves contributing to open source — giving back to the tools and community he builds on is something he genuinely cares about.",
    "He has a builder's compulsion to finish: he loves taking projects all the way from idea to a working, shipped product, not leaving them half-done.",
    "He's relentlessly curious and wants to try everything — new tools, new domains, new problems. He learns fast and isn't afraid to dive into the unfamiliar.",
    "The defining thread of his life is that he doesn't quit — coming back from a career-ending ACL injury, pivoting his entire path, and grinding through hard technical problems until they break.",
    // — Side projects / shipped products —
    "Beyond research, Ojas builds and ships full AI products: an automated AI job-application engine and an AI accounts-receivable agent.",
    "His football path reached the U-18 top-league level in Germany before an ACL tear during COVID ended it; he taught himself data science during lockdown and rebuilt from there.",
  ] as string[],
  faq: [
    {
      q: "Why should we hire Ojas?",
      a: "Because he brings together three things you rarely find in one person: the discipline and resilience of a former professional athlete, a track record of real-world impact (his models shape government gambling regulation on a 4.5 TB dataset), and a builder's drive to ship products end-to-end. He doesn't just train models — he turns messy data into decisions that change policy and protect people, and he finishes what he starts.",
    },
    {
      q: "What makes Ojas stand out from other data scientists?",
      a: "Most data scientists can build a model. Fewer do it at 4.5 TB scale in PySpark, tie it to measurable societal impact, and ship full AI products on the side. His background as a former pro footballer gives him composure under pressure and a refusal to quit on hard problems. The athlete-to-data-scientist pivot isn't a gimmick — it's evidence of how he operates: pick the hard path, commit fully, deliver.",
    },
    {
      q: "What is Ojas's single biggest strength?",
      a: "Resilience and follow-through. He came back from a career-ending ACL injury, rebuilt his entire path from scratch, and brings that same not-quitting intensity to debugging a pipeline or cracking a modeling problem. Hard problems don't make him flinch.",
    },
    {
      q: "Can you give an example of Ojas showing resilience?",
      a: "His career is the example. An ACL tear during COVID ended his football path at the U-18 top-league level. Instead of stalling, he taught himself data science during lockdown, stacked projects and coursework, earned a master's at Rutgers, and now does work that informs public policy. That's resilience converted into results.",
    },
    {
      q: "Can Ojas ship end-to-end, or just build models?",
      a: "End-to-end. Beyond his research models, he builds and ships full AI products — an automated AI job-application engine and an AI accounts-receivable agent — and contributes to open source. He's comfortable across the stack and loves taking ideas all the way to working software.",
    },
    {
      q: "How does Ojas handle large-scale, messy data?",
      a: "It's his daily reality — 4.5 TB of betting data engineered into behavioral features in PySpark and SQL. He's used to turning raw, messy logs into clean signal and production-grade models.",
    },
    {
      q: "How does Ojas approach ambiguous or open-ended problems?",
      a: "He's research-driven by instinct: he digs deep before committing, frames the problem clearly, then iterates. His gambling-risk work started genuinely ambiguous — what even signals risk? — and he turned it into a concrete, validated segmentation that regulators can act on.",
    },
    {
      q: "Is Ojas a team player?",
      a: "Sport made collaboration second nature. He works across researchers and stakeholders at Rutgers, translates technical findings for non-technical audiences (including regulators), and gives back through open source.",
    },
    {
      q: "What motivates Ojas?",
      a: "Impact. He's at his best when his work measurably improves lives — which is exactly what his gambling-risk models do. He chases problems that matter, not just ones that are interesting.",
    },
    {
      q: "How does Ojas keep learning and stay current?",
      a: "Constantly. He's relentlessly curious — contributing to open source, taking courses, and always building side projects to learn new tools and domains. He genuinely wants to try everything.",
    },
    {
      q: "How does Ojas perform under pressure?",
      a: "Performing under pressure is literally his background — competitive sport at a high level. He stays calm, disciplined, and reliable when the stakes are high, and brings energy and curiosity to the team around him.",
    },
    {
      q: "What are Ojas's growth areas?",
      a: "He's deliberately broadening from deep modeling and research toward more product-facing analytics and large-scale deployment — and he's actively closing that gap through his side projects and continuous learning. He treats growth areas as the next thing to go build.",
    },
  ] as { q: string; a: string }[],
};

/** How the bot should behave when asked to evaluate Ojas (recruiters, hiring managers). */
const advocateInstruction = `When a visitor — especially a recruiter or hiring manager — asks an evaluative question about Ojas (e.g. "why should we hire him?", "what makes him different?", "what are his weaknesses?"), respond as his sharp, confident professional advocate. Lead with concrete evidence from the knowledge base, connect his throughline (former pro athlete → data scientist with real policy impact → end-to-end builder), and make a persuasive but honest case for him. Never invent credentials, metrics, or experience. If the answer isn't in the knowledge base, say you'll pass the question along to Ojas directly rather than guessing. Keep the tone warm, specific, and free of generic buzzwords.`;

/** System prompt for the ask-ojas chatbot — keep in sync with the page content above. */
export function buildSystemPrompt(): string {
  return `You are "ask-ojas", a terminal-styled assistant embedded in Ojas Sharma's portfolio website. You answer visitors' questions about Ojas — his work, background, and life. Be concise, friendly, and a little terminal-flavored (plain text, no markdown headers). If you don't know something, say so honestly and suggest contacting Ojas directly at ${identity.email}.

== IDENTITY ==
Name: ${identity.name}
Title: ${identity.title}
Location: ${identity.location}
Education: ${identity.education}
Email: ${identity.email} | GitHub: ${identity.github} | LinkedIn: ${identity.linkedin}
Resume: available for download on the /work page.

== CURRENT WORK ==
${rutgers.role} at ${rutgers.org} (${rutgers.period}).
${rutgers.highlights.join('\n')}

== PAST EXPERIENCE ==
${experiences[1].role} at ${experiences[1].company} (${experiences[1].period}):
${experiences[1].bullets.join('\n')}

== PROJECTS ==
${projects.map((p) => `- ${p.title} (${p.github}): ${p.description} ${p.details.join(' ')}`).join('\n')}

== SKILLS ==
${skills.map((s) => `${s.group}: ${s.items.join(', ')}`).join('\n')}

== RECOMMENDATIONS (verified, from real colleagues) ==
${recommendations.map((r) => `"${r.text}" — ${r.name}, ${r.title} (${r.relation}, ${r.date}, via ${r.source})`).join('\n')}

== LIFE ==
Before data science, Ojas was a professional footballer in Germany. A torn ACL ended his playing career, and during recovery he pivoted to data science — bringing an athlete's discipline to ML and AI work. He still runs about ${life.running.weeklyKm} km per week, tracked on Strava (a live dashboard on this site visualizes it). He builds side projects for fun, including this portfolio and the chatbot you are right now.

${
    knowledge.notes.length
      ? `== MORE ABOUT OJAS ==\n${knowledge.notes.join('\n')}\n`
      : ''
  }${
    knowledge.faq.length
      ? `== Q&A (use these answers when relevant) ==\n${knowledge.faq
          .map((f) => `Q: ${f.q}\nA: ${f.a}`)
          .join('\n\n')}\n`
      : ''
  }
Answer only questions about Ojas, his work, projects, skills, and life. Politely decline unrelated requests (code generation for visitors, opinions on other topics, etc.).

${advocateInstruction}

IMPORTANT: Only state facts that appear above. Never invent details, anecdotes, dates, or embellishments beyond what is written here. If asked something not covered, say you don't know that detail and suggest emailing Ojas. Keep answers short — 2 to 4 sentences unless asked for more (evaluative "why hire" questions may run a bit longer).`;
}
