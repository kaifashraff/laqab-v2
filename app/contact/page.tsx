'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="page-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Get in touch with us!</p>
        </div>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">
                <Mail size={24} />
              </div>
              <div>
                <h3>Email Us</h3>
                <p>laqabinfo@gmail.com</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Phone size={24} />
              </div>
              <div>
                <h3>Call Us</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <MapPin size={24} />
              </div>
              <div>
                <h3>Visit Us</h3>
                <p>Ahmedabad, Gujarat, India</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Clock size={24} />
              </div>
              <div>
                <h3>Business Hours</h3>
                <p>Mon - Sat: 10 AM - 8 PM</p>
              </div>
            </div>

            <div className="whatsapp-card">
              <MessageCircle size={24} />
              <div>
                <h3>WhatsApp</h3>
                <p>Chat with us for quick responses!</p>
              </div>
              <a href="https://wa.me/919876543210" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Chat Now
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            {submitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <h2>Send us a Message</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="order">Order Inquiry</option>
                      <option value="product">Product Information</option>
                      <option value="return">Returns & Exchange</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="How can we help you?"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg">
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>How do I track my order?</h4>
              <p>Once your order is shipped, you'll receive an email with a tracking number. You can use this to track your order on our website or the courier's site.</p>
            </div>
            <div className="faq-item">
              <h4>What is your return policy?</h4>
              <p>We offer a 7-day return policy for unused items in original condition. Customized orders are non-returnable.</p>
            </div>
            <div className="faq-item">
              <h4>Do you offer international shipping?</h4>
              <p>Yes! We ship worldwide. Shipping charges and delivery times vary by location.</p>
            </div>
            <div className="faq-item">
              <h4>How do I find my perfect size?</h4>
              <p>Check our size guide on each product page. You can also contact us via WhatsApp for personalized sizing advice.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
