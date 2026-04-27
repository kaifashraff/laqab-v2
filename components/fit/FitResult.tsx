'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FitRecommendation } from '@/lib/fitLogic';
import { ProductType } from '@/lib/sizeCharts';
import SizeChartTable from './SizeChartTable';

interface FitResultProps {
  recommendation: FitRecommendation;
  productType: ProductType;
  fitPreference: string;
  onReset: () => void;
}

export default function FitResult({
  recommendation,
  productType,
  fitPreference,
  onReset,
}: FitResultProps) {
  const [showChart, setShowChart] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    recommendedSize,
    alternativeSize,
    confidence,
    notes,
    warnings,
    measurementGaps,
  } = recommendation;

  const confidenceColor =
    confidence >= 90 ? '#D4AF37' : confidence >= 75 ? '#B76E79' : '#800020';

  const handleCopyResults = () => {
    const text = [
      `LAQAB AI Fit Check Results`,
      `========================`,
      `Recommended Size: ${recommendedSize}`,
      alternativeSize ? `Alternative Size: ${alternativeSize}` : '',
      `Confidence: ${confidence}%`,
      `Product Type: ${productType}`,
      `Fit Preference: ${fitPreference}`,
      ``,
      `Notes:`,
      ...notes.map(n => `- ${n}`),
      warnings.length > 0 ? `` : '',
      warnings.length > 0 ? `Warnings:` : '',
      ...warnings.map(w => `- ${w}`),
    ]
      .filter(Boolean)
      .join('\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fit-result"
    >
      {/* Header */}
      <div className="result-header">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="result-icon"
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="result-title"
        >
          Your Recommended Size
        </motion.h2>
      </div>

      {/* Size Display */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 150 }}
        className="size-display"
      >
        <span className="size-value" style={{ color: confidenceColor }}>
          {recommendedSize}
        </span>
        {alternativeSize && (
          <span className="alternative-size">
            or <strong>{alternativeSize}</strong>
          </span>
        )}
      </motion.div>

      {/* Confidence Meter */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="confidence-section"
      >
        <div className="confidence-header">
          <span className="confidence-label">AI Confidence Score</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="confidence-value"
            style={{ color: confidenceColor }}
          >
            {confidence}%
          </motion.span>
        </div>
        <div className="confidence-bar">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ delay: 0.9, duration: 1, ease: 'easeOut' }}
            className="confidence-fill"
            style={{
              background: `linear-gradient(90deg, #800020, ${confidenceColor})`,
            }}
          />
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="confidence-text"
        >
          {confidence >= 90
            ? 'Highly accurate - your measurements align perfectly!'
            : confidence >= 75
              ? 'Good match - verify measurements for best results.'
              : 'Moderate match - we recommend checking twice.'}
        </motion.p>
      </motion.div>

      {/* Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="notes-section"
      >
        <h3 className="section-label">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          Fit Notes
        </h3>
        <ul className="notes-list">
          {notes.map((note, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
            >
              {note}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="warnings-section"
        >
          <h3 className="section-label warning-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#800020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Things to Note
          </h3>
          <ul className="warnings-list">
            {warnings.map((w, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 + i * 0.1 }}
              >
                {w}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Measurement Gaps */}
      {measurementGaps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
          className="gaps-section"
        >
          <p className="gaps-text">
            <span className="text-gold">*</span> {measurementGaps.join(' | ')}
          </p>
        </motion.div>
      )}

      {/* Size Chart Toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="chart-toggle-section"
      >
        <button
          className="btn btn-outline btn-sm"
          onClick={() => setShowChart(!showChart)}
        >
          {showChart ? 'Hide Size Chart' : 'View Size Chart'}
        </button>

        <AnimatePresence>
          {showChart && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="chart-container"
            >
              <SizeChartTable
                productType={productType}
                highlightSize={recommendedSize}
                fitPreference={fitPreference as any}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0 }}
        className="result-actions"
      >
        <button className="btn btn-primary" onClick={handleCopyResults}>
          {copied ? 'Copied!' : 'Share Results'}
        </button>
        <button className="btn btn-secondary" onClick={onReset}>
          Check Again
        </button>
      </motion.div>

      {/* Product Type Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="product-type-note"
      >
        For <strong>{productType}</strong> with <strong>{fitPreference}</strong> fit preference
      </motion.p>

      <style jsx>{`
        .fit-result {
          max-width: 600px;
          margin: 0 auto;
        }

        .result-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .result-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }

        .result-title {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          color: var(--gold);
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .size-display {
          text-align: center;
          margin-bottom: 32px;
        }

        .size-value {
          font-family: var(--font-heading);
          font-size: 4.5rem;
          font-weight: 800;
          line-height: 1;
          display: block;
          text-shadow: 0 2px 12px rgba(212, 175, 55, 0.2);
        }

        .alternative-size {
          display: block;
          margin-top: 8px;
          font-size: 1rem;
          color: var(--gray);
          font-family: var(--font-body);
        }

        .alternative-size strong {
          color: var(--gold-dark);
        }

        .confidence-section {
          margin-bottom: 32px;
        }

        .confidence-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .confidence-label {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--gray);
          font-family: var(--font-body);
        }

        .confidence-value {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
        }

        .confidence-bar {
          width: 100%;
          height: 8px;
          background: var(--cream-dark);
          border-radius: 4px;
          overflow: hidden;
        }

        .confidence-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 1s ease;
        }

        .confidence-text {
          margin-top: 8px;
          font-size: 0.8rem;
          color: var(--gray);
          font-style: italic;
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--charcoal);
          margin-bottom: 12px;
        }

        .warning-label {
          color: var(--maroon);
        }

        .notes-section,
        .warnings-section {
          background: var(--cream);
          border: 1px solid var(--cream-dark);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 16px;
        }

        .warnings-section {
          background: rgba(128, 0, 32, 0.04);
          border-color: rgba(128, 0, 32, 0.15);
        }

        .notes-list,
        .warnings-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .notes-list li,
        .warnings-list li {
          padding: 6px 0;
          font-size: 0.9rem;
          color: var(--charcoal);
          line-height: 1.5;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .notes-list li:last-child,
        .warnings-list li:last-child {
          border-bottom: none;
        }

        .notes-list li::before {
          content: '✦';
          color: var(--gold);
          margin-right: 8px;
          font-size: 0.7rem;
        }

        .warnings-list li::before {
          content: '⚠';
          margin-right: 8px;
          font-size: 0.8rem;
        }

        .gaps-section {
          margin-bottom: 16px;
        }

        .gaps-text {
          font-size: 0.8rem;
          color: var(--gray-light);
          font-style: italic;
          text-align: center;
        }

        .chart-toggle-section {
          margin-bottom: 24px;
          text-align: center;
        }

        .chart-container {
          margin-top: 16px;
          overflow: hidden;
        }

        .result-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .product-type-note {
          text-align: center;
          font-size: 0.75rem;
          color: var(--gray-light);
          margin-top: 20px;
          margin-bottom: 0;
        }

        @media (max-width: 600px) {
          .size-value {
            font-size: 3.5rem;
          }

          .result-actions {
            flex-direction: column;
          }

          .result-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </motion.div>
  );
}
