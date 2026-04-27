'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { UserMeasurements, calculateFit, FitRecommendation } from '@/lib/fitLogic';
import FitForm from '@/components/fit/FitForm';
import FitResult from '@/components/fit/FitResult';
import { ProductType, FitPreference } from '@/lib/sizeCharts';

export default function FitPage() {
  const [recommendation, setRecommendation] = useState<FitRecommendation | null>(null);
  const [lastInput, setLastInput] = useState<{
    productType: ProductType;
    fitPreference: FitPreference;
  }>({ productType: 'Sherwani', fitPreference: 'Regular' });
  const [isCalculating, setIsCalculating] = useState(false);
  const [mode, setMode] = useState<'form' | 'photo'>('form');

  const handleCalculate = useCallback((measurements: UserMeasurements) => {
    setIsCalculating(true);
    // Simulate a brief delay for UX (the logic itself is instant)
    setTimeout(() => {
      const result = calculateFit(measurements);
      setRecommendation(result);
      setLastInput({
        productType: measurements.productType,
        fitPreference: measurements.fitPreference,
      });
      setIsCalculating(false);
    }, 600);
  }, []);

  const handleReset = useCallback(() => {
    setRecommendation(null);
  }, []);

  return (
    <div className="fit-page">
      {/* Announcement Banner */}
      <div className="w-full bg-gradient-to-r from-[#800020] via-[#800020] to-[#6B001A] py-3 px-4 text-center">
        <p className="text-[#FFF8E7] text-sm md:text-base font-medium">
          <span className="text-[#D4AF37]">✨ AI-Powered Size Check</span>
          {' | '}
          <span>Get Your Perfect Fit in Seconds</span>
          {' | '}
          <Link href="/fit/guide" className="ml-2 text-[#D4AF37] underline hover:text-white transition-colors">
            How to Measure Guide
          </Link>
        </p>
      </div>

      {/* Hero Section */}
      <section className="fit-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-content"
          >
            <span className="section-subtitle">LAQAB AI</span>
            <h1>AI Fit Check</h1>
            <p className="hero-description">
              Confident nahi ho size ko lekar? Humara AI aapke measurements analyse karega
              aur bataega ki kaunsa size aapke liye perfect hai. Sherwani ho, Kurta ho, ya Bandhgala
              — sahi size ka pata lagayein, phir order karein!
            </p>
            <div className="hero-badges">
              <span className="badge badge-gold">Instant Results</span>
              <span className="badge badge-maroon">95%+ Accuracy</span>
              <span className="badge badge-cream">AI-Powered</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mode Selector */}
      <section className="section mode-section">
        <div className="container">
          <div className="mode-selector">
            <button
              className={`mode-btn ${mode === 'form' ? 'active' : ''}`}
              onClick={() => setMode('form')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Manual Measurements
            </button>
            <button
              className={`mode-btn ${mode === 'photo' ? 'active' : ''}`}
              onClick={() => setMode('photo')}
              disabled
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              Upload Photo
              <span className="coming-soon">Coming Soon</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section main-section">
        <div className="container">
          <AnimatePresence mode="wait">
            {!recommendation ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {mode === 'form' && (
                  <FitForm onCalculate={handleCalculate} isCalculating={isCalculating} />
                )}
                {mode === 'photo' && (
                  <div className="photo-placeholder">
                    <div className="placeholder-icon">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    <h3>Photo-Based Fit Check</h3>
                    <p>Upload a photo of yourself and our AI will estimate your measurements instantly.</p>
                    <p className="coming-soon-text">This feature is under development. Stay tuned!</p>
                    <button className="btn btn-primary" onClick={() => setMode('form')}>
                      Use Manual Measurements Instead
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FitResult
                  recommendation={recommendation}
                  productType={lastInput.productType}
                  fitPreference={lastInput.fitPreference}
                  onReset={handleReset}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section trust-section">
        <div className="container">
          <div className="trust-grid-mini">
            <div className="trust-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <div>
                <h4>AI-Powered</h4>
                <p>Smart algorithm trained on 1000+ Indian body types</p>
              </div>
            </div>
            <div className="trust-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <div>
                <h4>Easy Returns</h4>
                <p>Still not sure? 7-day easy return policy</p>
              </div>
            </div>
            <div className="trust-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <div>
                <h4>Size Guide</h4>
                <p>Detailed measurement guide for accuracy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide CTA */}
      <section className="section guide-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Measurements Kaise Lein?</h2>
            <p>Step-by-step guide with diagrams and common mistakes to avoid.</p>
            <Link href="/fit/guide" className="btn btn-primary btn-lg">
              View Measurement Guide
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .fit-page {
          min-height: 100vh;
        }

        .fit-hero {
          padding: 80px 0 40px;
          text-align: center;
          position: relative;
        }

        .hero-content {
          max-width: 700px;
          margin: 0 auto;
        }

        .hero-content h1 {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          color: var(--black);
          margin-bottom: 16px;
          letter-spacing: 6px;
        }

        .hero-description {
          font-size: 1.05rem;
          color: var(--gray);
          line-height: 1.8;
          margin-bottom: 24px;
        }

        .hero-badges {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .mode-section {
          padding: 0 0 40px;
        }

        .mode-selector {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        .mode-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          background: var(--white);
          border: 2px solid var(--cream-dark);
          border-radius: 50px;
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--charcoal);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mode-btn:hover:not(:disabled) {
          border-color: var(--gold);
          background: rgba(212, 175, 55, 0.05);
        }

        .mode-btn.active {
          border-color: var(--gold);
          background: var(--gold);
          color: var(--black);
        }

        .mode-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .coming-soon {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 2px 8px;
          background: var(--maroon);
          color: var(--white);
          border-radius: 4px;
        }

        .photo-placeholder {
          text-align: center;
          max-width: 500px;
          margin: 0 auto;
          padding: 60px 32px;
          background: var(--cream);
          border: 2px dashed var(--cream-dark);
          border-radius: 24px;
        }

        .placeholder-icon {
          margin-bottom: 20px;
        }

        .photo-placeholder h3 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          margin-bottom: 12px;
          color: var(--black);
        }

        .photo-placeholder p {
          color: var(--gray);
          font-size: 0.9rem;
          margin-bottom: 8px;
        }

        .coming-soon-text {
          color: var(--maroon) !important;
          font-weight: 600;
          margin-bottom: 24px !important;
        }

        .main-section {
          padding-top: 0;
        }

        .trust-section {
          background: var(--cream);
        }

        .trust-grid-mini {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          max-width: 900px;
          margin: 0 auto;
        }

        .trust-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .trust-item h4 {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--black);
          margin-bottom: 4px;
        }

        .trust-item p {
          font-size: 0.8rem;
          color: var(--gray);
          margin: 0;
        }

        .guide-cta {
          text-align: center;
        }

        .cta-content {
          max-width: 500px;
          margin: 0 auto;
        }

        .cta-content h2 {
          font-family: var(--font-heading);
          margin-bottom: 12px;
        }

        .cta-content p {
          color: var(--gray);
          margin-bottom: 24px;
        }

        @media (max-width: 768px) {
          .fit-hero {
            padding: 48px 0 24px;
          }

          .mode-selector {
            flex-direction: column;
            align-items: center;
          }

          .mode-btn {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }

          .trust-grid-mini {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
}
