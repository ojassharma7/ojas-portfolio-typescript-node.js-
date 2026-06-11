import { Fragment, ReactNode } from 'react';

// Tech terms worth emphasizing in experience bullets (longest first to match greedily).
const TERMS = [
  'Silhouette Score',
  'multi-class',
  'K-Means',
  'GMM',
  'SVM',
  'LightGBM',
  'CatBoost',
  'Z-Score',
  'IQR',
  'PCA',
  'A/B testing',
  'A/B',
  'Power BI',
  'D3.js',
  'ARIMA',
  'Prophet',
  'PostgreSQL',
  'Couchbase',
  'linear regression',
  'hypothesis testing',
  'time-series forecasting',
  'ETL',
];

// numbers + units / percentages, e.g. "4.5 TB", "13.6 billion", "80%", "0.79", "100+"
const METRIC = String.raw`\d[\d.,]*\s?(?:TB|GB|billion|million|%|\+)?`;

const pattern = new RegExp(
  `(${METRIC}|${TERMS.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
  'gi'
);

/** Renders a bullet string with metrics emphasized (cyan bold) and tech terms bolded. */
export default function Highlight({ children }: { children: string }) {
  const parts = children.split(pattern);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        // odd indices are the captured matches
        if (i % 2 === 1) {
          const isMetric = /\d/.test(part);
          return (
            <strong
              key={i}
              className={isMetric ? 'font-bold text-term-cyan' : 'font-semibold text-term-text'}
            >
              {part}
            </strong>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

export type { ReactNode };
