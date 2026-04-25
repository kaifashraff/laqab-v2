'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Award, Heart, Sparkles, Truck } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* Hand Embroidered USP Banner */}
      <div className="w-full bg-gradient-to-r from-[#800020] via-[#800020] to-[#6B001A] py-3 px-4 text-center">
        <p className="text-[#FFF8E7] text-sm md:text-base font-medium">
          <span className="text-[#D4AF37]">✨ Hand Embroidered by Skilled Karigars</span>
          {' | '}
          <span>Custom Orders Welcome</span>
          {' | '}
          <span>15-25 Days Delivery</span>
          {' | '}
          <Link href="/contact" className="ml-2 text-[#D4AF37] underline">Contact Us</Link>
        </p>
      </div>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>LAQAB Ke Baare Mein</h1>
          <p className="tagline">Ghar Baithe Shop Karna, Bilkul Dukaan Jaisa!</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <span className="section-subtitle">Hamari Kahani</span>
              <h2>LAQAB Kaise Bana</h2>
              <p>
                <strong>Every Laqab piece is hand embroidered by skilled karigars</strong> — not printed, not factory-made, not rushed. LAQAB ka matlab hai "garv" - aur isiliye yeh naam rakha kyunki jo hum banate hain usse pehenne waale ko garv hota hai. Shuru humne Ahmedabad se kiya, yahan ki craftsmanship duniya mein sabse best hai.
              </p>
              <p>
                Hum apne aap ko dusre online stores jaisa nahi samajhte. Hum ek chhoti si dukan hain jismein ek designer hai, ek tailor hai, aur ek jo orders pack karta hai. Bahut personal hai, bahut care ke saath kaam hota hai.
              </p>
              <p>
                Sherwani ho ya kurta, har piece mein utni mehnat hai jitni kisi bhi gallery-quality item mein hogi. kyunki hum jaante hain ki aap isse shaadi mein pehennе ho, pooja mein pehennе ho, ya kisi special occasion pe - har moment important hai.
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
            <span className="section-subtitle">Kya Karna Chahte Hain</span>
            <h2>Hamare Principles</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Award size={32} />
              </div>
              <h3>Quality Pe Koi Compromise Nahi</h3>
              <p>Jo fabric upar class hai wohi use karte hain. Jo embroidery karte hain woh masters hain. Cheap items nahi banate, simple hai.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Heart size={32} />
              </div>
              <h3>Authentic Hai Toh Authentic Hai</h3>
              <p>Machine ka kaam nahi, hand work hai. Pure zari, pure chikankari, jo hai woh asli mein hai. Koi copy-paste nahi.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Sparkles size={32} />
              </div>
              <h3>Modern Style, Traditional Soul</h3>
              <p>Puraana achha lagta hai but naya bhi toh dikhna hai. Humari sherwanis mein dono milte hain - heritage look but contemporary cut.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <Truck size={32} />
              </div>
              <h3>Duniya Bhar Mein Pahunch</h3>
              <p>UK, USA, Canada, Dubai - jahan bhi Indian communities hain wahan se order aate hain. Hum handle kar lete hain worldwide shipping.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section team-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Kon Chalta Hai</span>
            <h2>Hamara Founder</h2>
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
                "Main khud ek designer hoon aur mujhe pata hai ki ek acchi sherwani kya hoti hai. LAQAB shuru kiya kyunki mein chahta tha ki har Indian man ko accessible ho premium ethnic wear. Paise bache toh quality bhi aayi - yeh meri promise hai."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <h2>LAQAB Try Karna Chahte Ho?</h2>
          <p>Browse karo collections, dekho products, aur agar koi sawaal hai toh WhatsApp pe poocho. Hum der se answer nahi karte (usually turant!).</p>
          <Link href="/products" className="btn btn-primary btn-lg">
            Products Dekho
          </Link>
        </div>
      </section>
    </div>
  );
}
