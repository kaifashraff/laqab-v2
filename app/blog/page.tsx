import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'LAQAB Blog - Hand Embroidery Guides & Ethnic Wear Tips',
  description: 'Expert guides on identifying real hand embroidery, wedding sherwani styling tips, and ethnic wear care guides from LAQAB.',
  keywords: 'hand embroidery guide, sherwani tips, ethnic wear blog, wedding fashion, embroidery identification',
};

const blogPosts = [
  {
    slug: 'how-to-identify-hand-embroidery',
    title: 'How to Identify Real Hand Embroidery vs Machine-Made',
    excerpt: '7 proven methods to separate real craftsmanship from clever fakes. Complete guide with expert tips.',
    image: 'https://images.unsplash.com/photo-1599465337007-8a90c0a3c680?w=600&q=80',
    date: 'April 25, 2026',
    readTime: '8 min read',
    category: 'Craftsmanship Guide',
  },
];

export default function BlogIndexPage() {
  return (
    <div className="blog-index-page">
      {/* Header Banner */}
      <div className="w-full bg-gradient-to-r from-[#800020] via-[#800020] to-[#6B001A] py-3 px-4 text-center">
        <p className="text-[#FFF8E7] text-sm md:text-base font-medium">
          <span className="text-[#D4AF37]">✨ Hand Embroidered by Skilled Karigars</span>
          {' | '}
          <span>Custom Orders Welcome</span>
          {' | '}
          <span>15-25 Days Delivery</span>
        </p>
      </div>

      {/* Hero */}
      <div className="container py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
            LAQAB Blog
          </h1>
          <p className="text-xl text-gray-600">
            Expert guides on hand embroidery, ethnic wear styling, and wedding fashion tips.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                {/* Image */}
                <div className="relative w-full aspect-video">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-[#D4AF37] text-[#1A1A1A] text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#800020] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-[#800020] font-semibold group-hover:gap-3 transition-all">
                    Read More <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 p-8 bg-[#FFF8E7] rounded-lg border-2 border-[#D4AF37]/30 text-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Get New Guides First</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to get new blog posts and styling tips delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-[#D4AF37] focus:outline-none"
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-[#800020] text-white rounded-lg font-semibold hover:bg-[#6B001A] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}