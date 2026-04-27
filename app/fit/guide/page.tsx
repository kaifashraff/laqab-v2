'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface MeasurementGuide {
  id: string;
  title: string;
  description: string;
  steps: string[];
  mistakes: string[];
  diagram: string[];
  icon: string;
}

const measurementGuides: MeasurementGuide[] = [
  {
    id: 'chest',
    title: 'Chest Measurement',
    description: 'The most important measurement for ethnic wear. A wrong chest measurement can make even the most beautiful sherwani look ill-fitted.',
    steps: [
      'Stand straight with your arms relaxed at your sides',
      'Wrap the measuring tape around the fullest part of your chest',
      'The tape should go under your armpits and across your shoulder blades',
      'Keep the tape parallel to the floor — not too tight, not too loose',
      'Breathe normally and take the measurement at the end of a normal exhale',
      'Write down the measurement in inches',
    ],
    mistakes: [
      'Measuring over thick clothing — always measure against bare skin or a thin t-shirt',
      'Puffing out your chest or sucking in your stomach',
      'Holding the tape too tight (it should be snug, not restrictive)',
      'Measuring too high or too low — the fullest part is usually at nipple level',
    ],
    diagram: [
      '    ┌─────────────────────┐',
      '    │                     │',
      '    │   ● ← Measure here  │',
      '    │    (fullest part)   │',
      '    │                     │',
      '    ├─────────────────────┤',
      '    │    Under armpits    │',
      '    └─────────────────────┘',
      '         Tape goes',
      '       across shoulder',
      '        blades in back',
    ],
    icon: '📏',
  },
  {
    id: 'waist',
    title: 'Waist Measurement',
    description: 'The natural waist is the narrowest part of your torso. For ethnic wear, this determines how the garment drapes around your midsection.',
    steps: [
      'Find your natural waist — it is the narrowest part, usually just above your belly button',
      'Wrap the tape around your waist at this point',
      'Keep the tape parallel to the floor',
      'Do not suck in your stomach — stand in a relaxed, natural posture',
      'The tape should be snug but not digging into your skin',
      'Record the measurement in inches',
    ],
    mistakes: [
      'Measuring at your pants waistline instead of your natural waist',
      'Sucking in your stomach (be honest — your sherwani needs the real measurement!)',
      'Holding the tape too loose — it should sit against your skin without gap',
      'Measuring over a belt or thick fabric',
    ],
    diagram: [
      '       ┌──────────────┐',
      '       │              │',
      '       │    Chest     │',
      '       │              │',
      '       ├──────┬───────┤',
      '       │      │       │',
      '  ←─── │ Waist│ ←───  │  ← Tape here',
      '       │      │       │',
      '       ├──────┴───────┤   (narrowest part)',
      '       │              │',
      '       │    Hips      │',
      '       │              │',
      '       └──────────────┘',
    ],
    icon: '📐',
  },
  {
    id: 'shoulder',
    title: 'Shoulder Width',
    description: 'Crucial for sleeve fit and overall garment structure. A mismatch here causes pulling across the back or sagging shoulders.',
    steps: [
      'Stand straight with your shoulders relaxed (not hunched or pulled back)',
      'Find the bony point where your shoulder meets your arm (acromion)',
      'Measure from the edge of one shoulder point to the other',
      'The tape should curve slightly following the natural contour of your back',
      'Keep your arms down and relaxed throughout',
      'Record in inches',
    ],
    mistakes: [
      'Hunching your shoulders forward — this gives a smaller reading',
      'Pulling your shoulders back like a soldier — this gives a larger reading',
      'Measuring across your chest in front instead of across your back',
      'Including your arm bone in the measurement — stop at the joint edge',
    ],
    diagram: [
      '         ┌───────┐',
      '    ←────│       │────→  ← Tape from',
      '         │  BACK │         shoulder edge',
      '         │       │         to shoulder edge',
      '    ──── │       │ ────',
      '         │       │',
      '    ──── │       │ ────',
      '         └───────┘',
      '      (measure across',
      '       the back, not front)',
    ],
    icon: '📏',
  },
  {
    id: 'length',
    title: 'Garment Length',
    description: 'Sherwani length should reach just below the knee. Kurta length varies by style. This is often adjusted by your local tailor after delivery.',
    steps: [
      'Stand straight with your feet together',
      'For Sherwani: Measure from the highest point of your shoulder (near neck) down to just below the knee',
      'For Kurta: Measure from shoulder to mid-thigh or desired length',
      'For Bandhgala: Measure from shoulder to waist level (usually hip bone)',
      'Keep the tape straight down — do not follow body curves',
      'Record in inches',
    ],
    mistakes: [
      'Measuring from the side instead of front — always measure from the front shoulder',
      'Bending or tilting while measuring — this changes the length',
      'Including extra allowance — we add hem allowance automatically',
      'Not considering the footwear — if wearing heels, sherwani length changes',
    ],
    diagram: [
      '       ┌─────┐',
      '  ●────│     │  ← Start at shoulder',
      '       │     │',
      '       │     │',
      '       │     │',
      '       │     │  Sherwani: just below knee',
      '  ←────│─────│── Kurta: mid-thigh',
      '       │     │  Bandhgala: waist level',
      '       └─────┘',
    ],
    icon: '📐',
  },
  {
    id: 'sleeve',
    title: 'Sleeve Length',
    description: 'Sleeve length affects the overall proportion. For sherwanis, the sleeve usually ends at the wrist bone.',
    steps: [
      'Bend your arm slightly at the elbow (about 90 degrees)',
      'Start from the shoulder point (same acromion point as shoulder width)',
      'Run the tape along the outside of your arm, over the elbow',
      'End at the wrist bone (where your hand meets your wrist)',
      'Keep your arm naturally bent — do not stretch it straight',
      'Record in inches',
    ],
    mistakes: [
      'Measuring with arm fully straight — this gives too long a measurement',
      'Starting from the neck instead of the shoulder point',
      'Forgetting to account for the shirt you will wear underneath',
      'Ending at the hand instead of the wrist bone',
    ],
    diagram: [
      '    ●──────┐',
      '  Shoulder  │',
      '            │',
      '       ──── │ ──── →',
      '   Elbow    │      Wrist',
      '            │      bone',
      '            └── ●',
      '  (measure along outside',
      '   of arm, slightly bent)',
    ],
    icon: '📏',
  },
  {
    id: 'tips',
    title: 'Pro Tips for Best Results',
    description: 'Follow these tips to get the most accurate measurements and the best AI recommendation.',
    steps: [
      'Use a cloth measuring tape (not a metal one from a tool kit)',
      'Take all measurements in your underwear or thin fitted clothing',
      'Have someone else measure you — it is more accurate than doing it yourself',
      'Take each measurement 2-3 times and use the average',
      'Stand in front of a mirror to check tape alignment',
      'Do not add extra inches for comfort — our AI handles that based on your fit preference',
    ],
    mistakes: [
      'Using a metal tape or ruler — cloth tape is flexible and accurate',
      'Measuring after a large meal (your waist will be bigger)',
      'Guessing or estimating — take the actual measurement',
      'Converting between cm and inches incorrectly (multiply cm by 0.394 for inches)',
      'Rushing — take your time, accuracy matters',
    ],
    diagram: [
      '  DO ✓                         DON\'T ✗',
      '  ┌─────────────────┐          ┌─────────────────┐',
      '  │  Use cloth tape  │          │  Use metal tape  │',
      '  │  Snug but not    │          │  Too tight/loose  │',
      '  │   tight          │          │                  │',
      '  │  Bare skin/      │          │  Over thick       │',
      '  │   thin shirt     │          │   clothing        │',
      '  │  Natural posture │          │  Sucking in /     │',
      '  │                  │          │   puffing out     │',
      '  │  Measure twice   │          │  Guessing         │',
      '  └─────────────────┘          └─────────────────┘',
    ],
    icon: '💡',
  },
];

export default function FitGuidePage() {
  return (
    <div className="guide-page">
      {/* Announcement Banner */}
      <div className="w-full bg-gradient-to-r from-[#800020] via-[#800020] to-[#6B001A] py-3 px-4 text-center">
        <p className="text-[#FFF8E7] text-sm md:text-base font-medium">
          <span className="text-[#D4AF37]">📏 How to Measure Guide</span>
          {' | '}
          <span>Get Accurate Measurements for Perfect Fit</span>
          {' | '}
          <Link href="/fit" className="ml-2 text-[#D4AF37] underline hover:text-white transition-colors">
            Back to AI Fit Check
          </Link>
        </p>
      </div>

      {/* Hero */}
      <section className="guide-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-content"
          >
            <h1>How to Measure Yourself</h1>
            <p className="subtitle">
              Sahi measurement = Perfect fit. Yeh guide aapko step-by-step batayega ki
              kaise apne measurements lein. Do minute ka kaam hai!
            </p>
            <div className="quick-tips">
              <p>What you need: A cloth measuring tape, a mirror, and 5 minutes</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guides */}
      <section className="section guides-section">
        <div className="container">
          <div className="guides-list">
            {measurementGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="guide-card"
                id={guide.id}
              >
                <div className="guide-header">
                  <span className="guide-icon">{guide.icon}</span>
                  <div>
                    <h2>{guide.title}</h2>
                    <p className="guide-summary">{guide.description}</p>
                  </div>
                </div>

                <div className="guide-body">
                  <div className="guide-steps">
                    <h3>Steps to Measure</h3>
                    <ol>
                      {guide.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="guide-mistakes">
                    <h3>Common Mistakes ❌</h3>
                    <ul>
                      {guide.mistakes.map((mistake, i) => (
                        <li key={i}>{mistake}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {guide.diagram.length > 0 && (
                  <div className="guide-diagram">
                    <h3>Visual Guide</h3>
                    <pre className="ascii-diagram">{guide.diagram.join('\n')}</pre>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Reference Table */}
      <section className="section reference-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="reference-card"
          >
            <h2>Quick Reference Summary</h2>
            <p>Use this as a checklist when taking your measurements</p>

            <div className="ref-table-wrapper">
              <table className="ref-table">
                <thead>
                  <tr>
                    <th>Measurement</th>
                    <th>Where to Measure</th>
                    <th>Tape Position</th>
                    <th>For Which Garment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Chest</td>
                    <td>Fullest part of chest</td>
                    <td>Under armpits, across shoulder blades</td>
                    <td>Sherwani, Kurta, Bandhgala</td>
                  </tr>
                  <tr>
                    <td>Waist</td>
                    <td>Narrowest part of torso</td>
                    <td>Above belly button</td>
                    <td>Sherwani, Kurta, Bandhgala</td>
                  </tr>
                  <tr>
                    <td>Shoulder</td>
                    <td>Edge to edge of shoulders</td>
                    <td>Across the back</td>
                    <td>Sherwani, Kurta, Bandhgala</td>
                  </tr>
                  <tr>
                    <td>Length</td>
                    <td>Shoulder to desired hem</td>
                    <td>Straight down (front)</td>
                    <td>Varies by type</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section guide-cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2>Ready to Find Your Perfect Fit?</h2>
            <p>Apna measurements le liya? Ab AI Fit Check use karein!</p>
            <div className="cta-actions">
              <Link href="/fit" className="btn btn-primary btn-lg">
                Go to AI Fit Check
              </Link>
              <Link href="/products" className="btn btn-outline btn-lg">
                Browse Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .guide-page {
          min-height: 100vh;
        }

        .guide-hero {
          padding: 80px 0 40px;
          text-align: center;
        }

        .hero-content {
          max-width: 650px;
          margin: 0 auto;
        }

        .hero-content h1 {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 4vw, 3rem);
          color: var(--black);
          margin-bottom: 16px;
          letter-spacing: 4px;
        }

        .subtitle {
          font-size: 1.05rem;
          color: var(--gray);
          line-height: 1.8;
        }

        .quick-tips {
          margin-top: 24px;
          padding: 12px 20px;
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 50px;
          display: inline-block;
        }

        .quick-tips p {
          font-size: 0.85rem;
          color: var(--maroon);
          font-weight: 500;
          margin: 0;
        }

        .guides-list {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .guide-card {
          background: var(--white);
          border: 1px solid var(--cream-dark);
          border-radius: 20px;
          padding: 36px;
          transition: box-shadow 0.3s ease;
        }

        .guide-card:hover {
          box-shadow: var(--shadow-lg);
        }

        .guide-header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--cream-dark);
        }

        .guide-icon {
          font-size: 2.5rem;
          line-height: 1;
          flex-shrink: 0;
        }

        .guide-header h2 {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          color: var(--black);
          margin-bottom: 6px;
          letter-spacing: 2px;
        }

        .guide-summary {
          font-size: 0.9rem;
          color: var(--gray);
          margin: 0;
        }

        .guide-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          margin-bottom: 24px;
        }

        .guide-body h3 {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--charcoal);
          margin-bottom: 16px;
          text-transform: none;
          letter-spacing: 0.5px;
        }

        .guide-steps ol {
          list-style: none;
          padding: 0;
          margin: 0;
          counter-reset: step-counter;
        }

        .guide-steps li {
          counter-increment: step-counter;
          padding: 8px 0 8px 36px;
          position: relative;
          font-size: 0.9rem;
          color: var(--charcoal);
          line-height: 1.6;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        .guide-steps li::before {
          content: counter(step-counter);
          position: absolute;
          left: 0;
          top: 8px;
          width: 24px;
          height: 24px;
          background: var(--gold);
          color: var(--black);
          font-size: 0.75rem;
          font-weight: 700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .guide-mistakes ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .guide-mistakes li {
          padding: 8px 0 8px 24px;
          position: relative;
          font-size: 0.9rem;
          color: var(--charcoal);
          line-height: 1.6;
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }

        .guide-mistakes li::before {
          content: '✗';
          position: absolute;
          left: 0;
          color: var(--maroon);
          font-weight: 700;
        }

        .guide-diagram {
          background: var(--cream);
          border-radius: 12px;
          padding: 20px 24px;
        }

        .guide-diagram h3 {
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--charcoal);
          margin-bottom: 12px;
          text-transform: none;
        }

        .ascii-diagram {
          font-family: 'Courier New', monospace;
          font-size: 0.75rem;
          line-height: 1.4;
          color: var(--maroon);
          white-space: pre;
          overflow-x: auto;
          margin: 0;
        }

        .reference-section {
          background: var(--cream);
        }

        .reference-card {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .reference-card h2 {
          font-family: var(--font-heading);
          margin-bottom: 8px;
        }

        .reference-card > p {
          color: var(--gray);
          margin-bottom: 32px;
        }

        .ref-table-wrapper {
          overflow-x: auto;
          border-radius: 12px;
          border: 1px solid var(--cream-dark);
          background: var(--white);
        }

        .ref-table {
          width: 100%;
          border-collapse: collapse;
        }

        .ref-table th {
          padding: 14px 16px;
          background: var(--black);
          color: var(--white);
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .ref-table td {
          padding: 12px 16px;
          font-size: 0.85rem;
          color: var(--charcoal);
          border-bottom: 1px solid var(--cream-dark);
        }

        .ref-table tr:last-child td {
          border-bottom: none;
        }

        .ref-table tbody tr:hover td {
          background: rgba(212, 175, 55, 0.04);
        }

        .guide-cta {
          text-align: center;
        }

        .cta-content h2 {
          font-family: var(--font-heading);
          margin-bottom: 12px;
        }

        .cta-content p {
          color: var(--gray);
          margin-bottom: 24px;
        }

        .cta-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .guide-card {
            padding: 24px 20px;
          }

          .guide-body {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .guide-header {
            flex-direction: column;
            gap: 12px;
          }

          .cta-actions {
            flex-direction: column;
            align-items: center;
          }

          .cta-actions .btn {
            width: 100%;
            max-width: 300px;
          }

          .quick-tips {
            border-radius: 12px;
            padding: 12px 16px;
          }
        }
      `}</style>
    </div>
  );
}
