'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Award, Heart, Sparkles, Truck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About LAQAB</h1>
          <p className="tagline">Where Tradition Meets Elegance</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <span className="section-subtitle">Our Story</span>
              <h2>Crafting Heritage, One Stitch at a Time</h2>
              <p>
                LAQAB was born from a deep passion for preserving and celebrating India's rich textile heritage. Our name, derived from the Urdu word for 'pride,' reflects our commitment to creating ethnic menswear that honors tradition while embracing modern sensibilities.
              </p>
              <p>
                Founded in Ahmedabad, the heart of India's textile industry, we work directly with master artisans who have inherited centuries-old embroidery techniques. Every piece in our collection is a testament to their skill and dedication.
              </p>
              <p>
                From the finest silk sherwanis for weddings to elegantly embroidered kurtas for festivals, LAQAB brings you authentic Indian craftsmanship, reimagined for the contemporary gentleman.
              </p>
            </div>
            <div className="story-image">
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80"
                alt="LAQAB Craftsmanship"
                width={500}
                height={600}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What We Stand For</span>
            <h2>Our Values</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Award size={32} />
              </div>
              <h3>Premium Quality</h3>
              <p>We source only the finest fabrics and work with master artisans to ensure every piece meets our exacting standards.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Heart size={32} />
              </div>
              <h3>Authentic Craftsmanship</h3>
              <p>Every embroidery, every stitch tells a story. We preserve traditional techniques passed down through generations.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Sparkles size={32} />
              </div>
              <h3>Modern Elegance</h3>
              <p>We blend heritage with contemporary design, creating pieces that are both timeless and relevant to today's style.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Truck size={32} />
              </div>
              <h3>Global Reach</h3>
              <p>From Ahmedabad to the world, we ship our creations to Indian communities across the globe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section team-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">The Vision</span>
            <h2>Our Founder</h2>
          </div>
          <div className="team-content">
            <div className="team-image">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                alt="Founder"
                width={300}
                height={300}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="team-info">
              <h3>Kaif Ashraf</h3>
              <p className="role">Founder & Creative Director</p>
              <p>
                "I started LAQAB with a simple vision - to make premium ethnic wear accessible to every Indian man, anywhere in the world. Our commitment to quality and authenticity drives everything we do."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <h2>Ready to Experience LAQAB?</h2>
          <p>Explore our collections and find your perfect ethnic ensemble.</p>
          <Link href="/products" className="btn btn-primary btn-lg">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
