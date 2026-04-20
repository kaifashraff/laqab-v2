'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { closePopup } from '@/lib/uiSlice';
import { X, Mail } from 'lucide-react';

export default function NewsletterPopup() {
  const dispatch = useDispatch();
  const { popups } = useSelector((state: RootState) => state.ui);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const newsletterPopup = popups.find(p => p.id === 'newsletter');

  useEffect(() => {
    if (newsletterPopup?.isOpen) {
      const timer = setTimeout(() => {
        dispatch(closePopup('newsletter'));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [newsletterPopup?.isOpen, dispatch]);

  if (!newsletterPopup?.isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        dispatch(closePopup('newsletter'));
      }, 2000);
    }
  };

  return (
    <>
      <div className="popup-overlay" onClick={() => dispatch(closePopup('newsletter'))} />
      <div className="newsletter-popup">
        <button className="popup-close" onClick={() => dispatch(closePopup('newsletter'))}>
          <X size={24} />
        </button>
        <div className="popup-content">
          {submitted ? (
            <div className="popup-success">
              <span className="success-icon">✓</span>
              <h3>Thank You!</h3>
              <p>You've been subscribed to our newsletter.</p>
            </div>
          ) : (
            <>
              <div className="popup-icon">
                <Mail size={32} />
              </div>
              <h3>Get 10% Off</h3>
              <p>Subscribe to our newsletter and receive an exclusive discount code!</p>
              <form onSubmit={handleSubmit} className="popup-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">Get Code</button>
              </form>
              <p className="popup-disclaimer">No spam, unsubscribe anytime.</p>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 2999;
        }

        .newsletter-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 480px;
          background: var(--color-white);
          border-radius: 16px;
          z-index: 3000;
          padding: 48px 40px;
          text-align: center;
          animation: scaleIn 0.3s ease;
        }

        @keyframes scaleIn {
          from { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }

        .popup-close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--color-gray-100);
          cursor: pointer;
        }

        .popup-icon {
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          color: var(--color-black);
        }

        .popup-content h3 {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          margin-bottom: 12px;
        }

        .popup-content p {
          color: var(--color-gray-600);
          margin-bottom: 24px;
        }

        .popup-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .popup-form input {
          padding: 16px;
          border: 1px solid var(--color-gray-300);
          border-radius: 8px;
          font-size: 1rem;
          text-align: center;
        }

        .popup-form input:focus {
          outline: none;
          border-color: var(--color-gold);
        }

        .popup-disclaimer {
          font-size: 0.75rem;
          color: var(--color-gray-500);
          margin-top: 16px;
          margin-bottom: 0;
        }

        .popup-success {
          padding: 20px 0;
        }

        .success-icon {
          width: 64px;
          height: 64px;
          background: #22C55E;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 20px;
        }

        .popup-success h3 {
          margin-bottom: 8px;
        }

        .popup-success p {
          margin-bottom: 0;
        }
      `}</style>
    </>
  );
}
