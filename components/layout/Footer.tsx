'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <div className="container">
          <div className="newsletter-grid">
            <div className="newsletter-content">
              <h3>Join the LAQAB Family</h3>
              <p>Subscribe to receive exclusive offers, new collection updates, and style inspiration.</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-column footer-brand">
              <h2 className="footer-logo">LAQAB</h2>
              <p className="footer-tagline">
                Where tradition meets elegance. Premium ethnic menswear crafted for the modern gentleman.
              </p>
              <div className="footer-social">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Youtube size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li><Link href="/collections">All Collections</Link></li>
                <li><Link href="/products?collection=wedding-special">Wedding Special</Link></li>
                <li><Link href="/products?category=sherwani">Sherwani</Link></li>
                <li><Link href="/products?category=kurta">Kurtas</Link></li>
                <li><Link href="/products?featured=true">Featured Products</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-column">
              <h4>Customer Service</h4>
              <ul>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/shipping">Shipping Information</Link></li>
                <li><Link href="/returns">Returns & Exchanges</Link></li>
                <li><Link href="/size-guide">Size Guide</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/track-order">Track Order</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-column">
              <h4>Contact Us</h4>
              <div className="footer-contact">
                <div className="contact-item">
                  <Mail size={18} />
                  <a href="mailto:laqabinfo@gmail.com">laqabinfo@gmail.com</a>
                </div>
                <div className="contact-item">
                  <Phone size={18} />
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
                <div className="contact-item">
                  <MapPin size={18} />
                  <span>Ahmedabad, Gujarat, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment & Trust */}
      <div className="footer-trust">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <span className="trust-icon">🚚</span>
              <div>
                <h5>Free Shipping</h5>
                <p>On orders above ₹5,000</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🔒</span>
              <div>
                <h5>Secure Payment</h5>
                <p>100% secure transactions</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">↩️</span>
              <div>
                <h5>Easy Returns</h5>
                <p>7 days return policy</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✨</span>
              <div>
                <h5>Premium Quality</h5>
                <p>Handcrafted with care</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} LAQAB. All rights reserved.</p>
            <div className="footer-legal">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/refund">Refund Policy</Link>
            </div>
            <div className="footer-payment">
              <span>Payment Methods:</span>
              <div className="payment-icons">
                <span>VISA</span>
                <span>UPI</span>
                <span>MasterCard</span>
                <span>Net Banking</span>
                <span>COD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--color-black);
          color: var(--color-white);
        }

        /* Newsletter */
        .footer-newsletter {
          background: linear-gradient(135deg, var(--color-maroon) 0%, var(--color-black) 100%);
          padding: 60px 0;
        }

        .newsletter-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .newsletter-content h3 {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          margin-bottom: 12px;
          color: var(--color-gold);
        }

        .newsletter-content p {
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .newsletter-form {
          display: flex;
          gap: 12px;
        }

        .newsletter-form input {
          flex: 1;
          padding: 16px 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.1);
          color: var(--color-white);
          border-radius: 4px;
          font-size: 0.95rem;
        }

        .newsletter-form input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .newsletter-form input:focus {
          outline: none;
          border-color: var(--color-gold);
        }

        /* Main Footer */
        .footer-main {
          padding: 80px 0 60px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
        }

        .footer-logo {
          font-family: var(--font-heading);
          font-size: 2rem;
          color: var(--color-gold);
          letter-spacing: 6px;
          margin-bottom: 20px;
        }

        .footer-tagline {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.8;
          margin-bottom: 24px;
        }

        .footer-social {
          display: flex;
          gap: 12px;
        }

        .footer-social a {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: var(--color-white);
          transition: all 0.3s ease;
        }

        .footer-social a:hover {
          background: var(--color-gold);
          border-color: var(--color-gold);
          color: var(--color-black);
        }

        .footer-column h4 {
          font-family: var(--font-heading);
          font-size: 1rem;
          color: var(--color-gold);
          margin-bottom: 24px;
          letter-spacing: 2px;
        }

        .footer-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-column li {
          margin-bottom: 12px;
        }

        .footer-column a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .footer-column a:hover {
          color: var(--color-gold);
        }

        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .contact-item a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
        }

        .contact-item a:hover {
          color: var(--color-gold);
        }

        /* Trust Section */
        .footer-trust {
          padding: 40px 0;
          background: rgba(255, 255, 255, 0.05);
        }

        .trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .trust-icon {
          font-size: 2rem;
        }

        .trust-item h5 {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .trust-item p {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        /* Bottom Bar */
        .footer-bottom {
          padding: 24px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-bottom-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-bottom p {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }

        .footer-legal {
          display: flex;
          gap: 24px;
        }

        .footer-legal a {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
        }

        .footer-legal a:hover {
          color: var(--color-gold);
        }

        .footer-payment {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .payment-icons {
          display: flex;
          gap: 8px;
        }

        .payment-icons span {
          padding: 4px 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          font-size: 0.7rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .newsletter-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .newsletter-form {
            flex-direction: column;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .trust-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }

          .footer-legal {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}
