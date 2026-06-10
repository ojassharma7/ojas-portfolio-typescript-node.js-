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
    { value: '7', label: 'gambling operators' },
    { value: '1 M+', label: 'gamblers clustered' },
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
    'Analyzing a 4.5 TB dataset of 13.6 billion records from seven gambling operators to identify high-risk gambling behaviors and build predictive models for early intervention.',
    'Built K-Means & GMM clustering models classifying 1M+ gamblers by behavioral indicators (Silhouette Score 0.79).',
    'A/B tested multi-class models (SVM, LightGBM, CatBoost), boosting intervention accuracy by 33%.',
    'Outlier detection pipeline (Z-Score, IQR, PCA at 99% variance) for irregular deposit patterns.',
    'Drove a 30% increase in early detection of risky financial behavior, informing state-level policy.',
  ],
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  stack: string[];
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    company: rutgers.org,
    role: rutgers.role,
    period: rutgers.period,
    location: rutgers.location,
    stack: rutgers.stack,
    bullets: rutgers.highlights,
  },
  {
    company: 'Omalco Extrusion',
    role: 'Data Analyst',
    period: 'August 2022 — July 2023',
    location: 'New Delhi, India',
    stack: ['Power BI', 'D3.js', 'PostgreSQL', 'Couchbase', 'Python', 'ARIMA', 'Prophet'],
    bullets: [
      'Automated financial reporting and market analysis with Power BI and D3.js — business team efficiency up 80%, ETL runtime down 50%.',
      'Built real-time data pipelines and time-series forecasting (ARIMA, Prophet) for dynamic market analysis.',
      'Implemented hybrid data architectures and real-time dashboards on PostgreSQL, Couchbase, and D3.js.',
      'Statistical analysis (regression, hypothesis testing) surfacing price elasticity, seasonal demand, and profitability shifts.',
    ],
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
  { group: 'AI / ML', items: ['LLMs', 'RAG', 'Fine-tuning (LoRA/QLoRA)', 'Deep Learning', 'NLP', 'Clustering', 'Vector DBs'] },
  { group: 'Engineering', items: ['Python', 'PySpark', 'SQL', 'FastAPI', 'PostgreSQL', 'MongoDB', 'TypeScript'] },
  { group: 'Cloud / Tooling', items: ['AWS', 'GCP', 'Docker', 'Airflow', 'Kafka', 'CI/CD', 'LangChain'] },
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
    // last 8 weeks of volume, oldest first — swap in real Garmin exports later
    weeks: [16, 21, 18, 23, 19, 24, 21, 20],
    source: 'Garmin',
    note: 'The knee is rebuilt and the engine still runs — roughly 20 km a week, tracked on Garmin.',
  },
  sideBuilds: [
    { name: 'ask-ojas', desc: 'The terminal chatbot on this very site — ask it anything about me.' },
    { name: 'this portfolio', desc: 'Next.js + Tailwind + Framer Motion, riced like my Linux setup.' },
    { name: 'running analytics', desc: 'Tinkering with Garmin data exports — pace, cadence, recovery trends.' },
  ],
};

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

== LIFE ==
Before data science, Ojas was a professional footballer in Germany. A torn ACL ended his playing career, and during recovery he pivoted to data science — bringing an athlete's discipline to ML and AI work. He still runs about ${life.running.weeklyKm} km per week, tracked on Garmin. He builds side projects for fun, including this portfolio and the chatbot you are right now.

Answer only questions about Ojas, his work, projects, skills, and life. Politely decline unrelated requests (code generation for visitors, opinions on other topics, etc.).

IMPORTANT: Only state facts that appear above. Never invent details, anecdotes, dates, or embellishments beyond what is written here. If asked something not covered, say you don't know that detail and suggest emailing Ojas. Keep answers short — 2 to 4 sentences unless asked for more.`;
}
