'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ProductType, FitPreference } from '@/lib/sizeCharts';
import { UserMeasurements, validateMeasurements } from '@/lib/fitLogic';

interface FitFormProps {
  onCalculate: (measurements: UserMeasurements) => void;
  isCalculating: boolean;
}

interface FormData {
  chest: string;
  waist: string;
  height: string;
  shoulder: string;
  weight: string;
  fitPreference: FitPreference;
  productType: ProductType;
}

interface FormErrors {
  [key: string]: string;
}

export default function FitForm({ onCalculate, isCalculating }: FitFormProps) {
  const [formData, setFormData] = useState<FormData>({
    chest: '',
    waist: '',
    height: '',
    shoulder: '',
    weight: '',
    fitPreference: 'Regular',
    productType: 'Sherwani',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [activeSection, setActiveSection] = useState<'basic' | 'measurements' | 'preferences'>('basic');
  const [showGuide, setShowGuide] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const measurements: Partial<UserMeasurements> = {
        productType: formData.productType,
        fitPreference: formData.fitPreference,
        height: formData.height ? parseFloat(formData.height) : undefined,
        chest: formData.chest ? parseFloat(formData.chest) : undefined,
        waist: formData.waist ? parseFloat(formData.waist) : undefined,
        shoulder: formData.shoulder ? parseFloat(formData.shoulder) : undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
      };

      const validationErrors = validateMeasurements(measurements);

      // Also check individual field emptiness after parsing
      if (formData.height && isNaN(Number(formData.height))) {
        validationErrors.height = 'Please enter a valid number';
      }
      if (formData.chest && isNaN(Number(formData.chest))) {
        validationErrors.chest = 'Please enter a valid number';
      }
      if (formData.waist && isNaN(Number(formData.waist))) {
        validationErrors.waist = 'Please enter a valid number';
      }
      if (formData.shoulder && isNaN(Number(formData.shoulder))) {
        validationErrors.shoulder = 'Please enter a valid number';
      }
      if (formData.weight && isNaN(Number(formData.weight))) {
        validationErrors.weight = 'Please enter a valid number';
      }

      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        // Focus on the section with errors
        if (validationErrors.height || validationErrors.weight) {
          setActiveSection('basic');
        } else if (validationErrors.chest || validationErrors.waist || validationErrors.shoulder) {
          setActiveSection('measurements');
        } else {
          setActiveSection('preferences');
        }
        return;
      }

      onCalculate({
        productType: formData.productType,
        fitPreference: formData.fitPreference,
        height: parseFloat(formData.height),
        chest: formData.chest ? parseFloat(formData.chest) : undefined,
        waist: formData.waist ? parseFloat(formData.waist) : undefined,
        shoulder: formData.shoulder ? parseFloat(formData.shoulder) : undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
      } as UserMeasurements);
    },
    [formData, onCalculate]
  );

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="fit-form"
    >
      {/* Section Navigation */}
      <div className="section-tabs">
        {(['basic', 'measurements', 'preferences'] as const).map(section => (
          <button
            key={section}
            type="button"
            className={`section-tab ${activeSection === section ? 'active' : ''}`}
            onClick={() => setActiveSection(section)}
          >
            <span className="tab-number">
              {section === 'basic' ? '1' : section === 'measurements' ? '2' : '3'}
            </span>
            <span className="tab-label">
              {section === 'basic' ? 'Body' : section === 'measurements' ? 'Measure' : 'Style'}
            </span>
          </button>
        ))}
      </div>

      {/* Basic Info Section */}
      {activeSection === 'basic' && (
        <motion.div
          key="basic"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
          className="form-section"
        >
          <div className="section-heading">
            <h3>Your Body Details</h3>
            <p>Tell us about yourself so we can find your perfect fit</p>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Height <span className="required">*</span>
              </label>
              <div className="input-with-hint">
                <input
                  type="number"
                  step="0.5"
                  className={`form-input ${errors.height ? 'form-input-error' : ''}`}
                  placeholder="e.g. 175"
                  value={formData.height}
                  onChange={e => handleChange('height', e.target.value)}
                />
                <span className="input-hint">cm</span>
              </div>
              {errors.height && <p className="form-error">{errors.height}</p>}
              <p className="field-desc">Your height in centimeters (e.g., 175 cm = 5'9")</p>
            </div>

            <div className="form-group">
              <label className="form-label">Weight</label>
              <div className="input-with-hint">
                <input
                  type="number"
                  step="0.5"
                  className={`form-input ${errors.weight ? 'form-input-error' : ''}`}
                  placeholder="e.g. 75"
                  value={formData.weight}
                  onChange={e => handleChange('weight', e.target.value)}
                />
                <span className="input-hint">kg</span>
              </div>
              {errors.weight && <p className="form-error">{errors.weight}</p>}
              <p className="field-desc">Helps us estimate your body proportions</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Measurements Section */}
      {activeSection === 'measurements' && (
        <motion.div
          key="measurements"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
          className="form-section"
        >
          <div className="section-heading">
            <h3>Your Measurements</h3>
            <p>
              Use a measuring tape. Don't have all? Just chest is enough!
              <button
                type="button"
                className="guide-toggle"
                onClick={() => setShowGuide(!showGuide)}
              >
                {showGuide ? 'Hide Guide' : 'How to measure?'}
              </button>
            </p>
          </div>

          {/* Quick measurement guide */}
          {showGuide && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="quick-guide"
            >
              <div className="guide-grid">
                <div className="guide-item">
                  <strong>Chest</strong>
                  <p>Measure around the fullest part of your chest, under your armpits</p>
                </div>
                <div className="guide-item">
                  <strong>Waist</strong>
                  <p>Measure around your natural waistline, just above your belly button</p>
                </div>
                <div className="guide-item">
                  <strong>Shoulder</strong>
                  <p>Measure from the edge of one shoulder to the other, across your back</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="form-row three-col">
            <div className="form-group">
              <label className="form-label">
                Chest <span className="optional">(inches)</span>
              </label>
              <input
                type="number"
                step="0.5"
                className={`form-input ${errors.chest ? 'form-input-error' : ''}`}
                placeholder="e.g. 40"
                value={formData.chest}
                onChange={e => handleChange('chest', e.target.value)}
              />
              {errors.chest && <p className="form-error">{errors.chest}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Waist <span className="optional">(inches)</span>
              </label>
              <input
                type="number"
                step="0.5"
                className={`form-input ${errors.waist ? 'form-input-error' : ''}`}
                placeholder="e.g. 34"
                value={formData.waist}
                onChange={e => handleChange('waist', e.target.value)}
              />
              {errors.waist && <p className="form-error">{errors.waist}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Shoulder <span className="optional">(inches)</span>
              </label>
              <input
                type="number"
                step="0.25"
                className={`form-input ${errors.shoulder ? 'form-input-error' : ''}`}
                placeholder="e.g. 18"
                value={formData.shoulder}
                onChange={e => handleChange('shoulder', e.target.value)}
              />
              {errors.shoulder && <p className="form-error">{errors.shoulder}</p>}
            </div>
          </div>

          {errors.measurements && (
            <div className="form-error-box">
              <p>{errors.measurements}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Preferences Section */}
      {activeSection === 'preferences' && (
        <motion.div
          key="preferences"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
          className="form-section"
        >
          <div className="section-heading">
            <h3>Your Style Preferences</h3>
            <p>How do you like your outfit to fit?</p>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                Product Type <span className="required">*</span>
              </label>
              <div className="product-type-selector">
                {(['Sherwani', 'Kurta', 'Bandhgala'] as ProductType[]).map(type => (
                  <button
                    key={type}
                    type="button"
                    className={`type-option ${formData.productType === type ? 'selected' : ''}`}
                    onClick={() => handleChange('productType', type)}
                  >
                    <span className="type-icon">
                      {type === 'Sherwani' && '👘'}
                      {type === 'Kurta' && '👕'}
                      {type === 'Bandhgala' && '🧥'}
                    </span>
                    <span className="type-name">{type}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Fit Preference <span className="required">*</span>
            </label>
            <div className="fit-selector">
              {([
                { value: 'Slim' as FitPreference, label: 'Slim Fit', desc: 'Form-fitting, modern silhouette' },
                { value: 'Regular' as FitPreference, label: 'Regular Fit', desc: 'Balanced comfort & style' },
                { value: 'Relaxed' as FitPreference, label: 'Relaxed Fit', desc: 'Extra room, easy comfort' },
              ]).map(option => (
                <button
                  key={option.value}
                  type="button"
                  className={`fit-option ${formData.fitPreference === option.value ? 'selected' : ''}`}
                  onClick={() => handleChange('fitPreference', option.value)}
                >
                  <span className="fit-value">{option.value}</span>
                  <span className="fit-desc">{option.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className="form-navigation">
        {activeSection !== 'basic' && (
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              if (activeSection === 'measurements') setActiveSection('basic');
              if (activeSection === 'preferences') setActiveSection('measurements');
            }}
          >
            ← Back
          </button>
        )}
        {activeSection !== 'preferences' ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (activeSection === 'basic') setActiveSection('measurements');
              if (activeSection === 'measurements') setActiveSection('preferences');
            }}
          >
            Next →
          </button>
        ) : (
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={isCalculating}
          >
            {isCalculating ? (
              <>
                <span className="spinner" />
                Analyzing...
              </>
            ) : (
              'Get My Fit'
            )}
          </button>
        )}
      </div>

      {/* Measurement Error Summary */}
      {Object.keys(errors).length > 0 && activeSection === 'preferences' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="error-summary"
        >
          <p>Please fix the following before calculating:</p>
          <ul>
            {Object.values(errors).map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </motion.div>
      )}

      <style jsx>{`
        .fit-form {
          max-width: 640px;
          margin: 0 auto;
        }

        .section-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 32px;
          justify-content: center;
        }

        .section-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: var(--cream);
          border: 1px solid var(--cream-dark);
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: var(--font-body);
        }

        .section-tab:hover {
          border-color: var(--gold);
          background: rgba(212, 175, 55, 0.08);
        }

        .section-tab.active {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--black);
        }

        .tab-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          font-size: 0.75rem;
          font-weight: 700;
          background: rgba(0, 0, 0, 0.1);
        }

        .section-tab.active .tab-number {
          background: rgba(255, 255, 255, 0.3);
        }

        .tab-label {
          font-size: 0.85rem;
          font-weight: 500;
        }

        .form-section {
          background: var(--white);
          border: 1px solid var(--cream-dark);
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 24px;
        }

        .section-heading {
          margin-bottom: 24px;
        }

        .section-heading h3 {
          font-family: var(--font-display);
          font-size: 1.3rem;
          color: var(--black);
          margin-bottom: 4px;
          text-transform: none;
          letter-spacing: 0.5px;
        }

        .section-heading p {
          font-size: 0.85rem;
          color: var(--gray);
          margin: 0;
        }

        .guide-toggle {
          background: none;
          border: none;
          color: var(--gold-dark);
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: underline;
          cursor: pointer;
          margin-left: 8px;
        }

        .quick-guide {
          background: var(--cream);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
          overflow: hidden;
        }

        .guide-grid {
          display: grid;
          gap: 16px;
        }

        .guide-item strong {
          display: block;
          font-family: var(--font-display);
          font-size: 0.95rem;
          color: var(--maroon);
          margin-bottom: 4px;
        }

        .guide-item p {
          font-size: 0.85rem;
          color: var(--gray);
          margin: 0;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-row.three-col {
          grid-template-columns: 1fr 1fr 1fr;
        }

        .form-group {
          margin-bottom: 0;
        }

        .form-label {
          display: block;
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 8px;
          color: var(--charcoal);
        }

        .required {
          color: var(--maroon);
        }

        .optional {
          color: var(--gray-light);
          font-weight: 400;
          font-size: 0.75rem;
        }

        .input-with-hint {
          position: relative;
        }

        .input-with-hint .form-input {
          padding-right: 48px;
        }

        .input-hint {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.8rem;
          color: var(--gray-light);
          font-weight: 500;
        }

        .field-desc {
          font-size: 0.75rem;
          color: var(--gray-light);
          margin-top: 4px;
          margin-bottom: 0;
        }

        .form-error-box {
          background: rgba(231, 76, 60, 0.08);
          border: 1px solid rgba(231, 76, 60, 0.2);
          border-radius: 8px;
          padding: 12px 16px;
          margin-top: 16px;
        }

        .form-error-box p {
          font-size: 0.85rem;
          color: #e74c3c;
          margin: 0;
        }

        .product-type-selector {
          display: flex;
          gap: 12px;
        }

        .type-option {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 20px 16px;
          background: var(--cream);
          border: 2px solid var(--cream-dark);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .type-option:hover {
          border-color: var(--gold);
          background: rgba(212, 175, 55, 0.06);
        }

        .type-option.selected {
          border-color: var(--gold);
          background: rgba(212, 175, 55, 0.1);
          box-shadow: 0 0 12px rgba(212, 175, 55, 0.15);
        }

        .type-icon {
          font-size: 1.5rem;
        }

        .type-name {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--charcoal);
        }

        .type-option.selected .type-name {
          color: var(--maroon);
        }

        .fit-selector {
          display: flex;
          gap: 12px;
        }

        .fit-option {
          flex: 1;
          padding: 16px;
          background: var(--cream);
          border: 2px solid var(--cream-dark);
          border-radius: 12px;
          cursor: pointer;
          text-align: left;
          transition: all 0.3s ease;
        }

        .fit-option:hover {
          border-color: var(--gold);
          background: rgba(212, 175, 55, 0.06);
        }

        .fit-option.selected {
          border-color: var(--gold);
          background: rgba(212, 175, 55, 0.1);
          box-shadow: 0 0 12px rgba(212, 175, 55, 0.15);
        }

        .fit-value {
          display: block;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 4px;
          color: var(--charcoal);
        }

        .fit-option.selected .fit-value {
          color: var(--maroon);
        }

        .fit-desc {
          display: block;
          font-size: 0.75rem;
          color: var(--gray);
        }

        .form-navigation {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 8px;
        }

        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(0, 0, 0, 0.2);
          border-top-color: var(--black);
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .error-summary {
          background: rgba(231, 76, 60, 0.06);
          border: 1px solid rgba(231, 76, 60, 0.2);
          border-radius: 12px;
          padding: 16px 20px;
          margin-top: 16px;
        }

        .error-summary p {
          font-weight: 600;
          color: #c0392b;
          font-size: 0.85rem;
          margin-bottom: 8px;
        }

        .error-summary ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .error-summary li {
          font-size: 0.8rem;
          color: #e74c3c;
          padding: 3px 0;
        }

        .error-summary li::before {
          content: '•';
          margin-right: 6px;
        }

        @media (max-width: 768px) {
          .form-section {
            padding: 24px 20px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .form-row.three-col {
            grid-template-columns: 1fr;
          }

          .product-type-selector,
          .fit-selector {
            flex-direction: column;
          }

          .section-tabs {
            gap: 4px;
          }

          .section-tab {
            padding: 8px 14px;
          }

          .tab-label {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </motion.form>
  );
}
