import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, User, Calendar, Share2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Identify Real Hand Embroidery: Complete Guide | LAQAB',
  description: 'Learn how to identify real hand embroidery vs machine-made. Complete guide with 7 proven methods. Trusted by 200+ customers across India.',
  keywords: 'how to identify hand embroidery, hand embroidered vs machine, real embroidery identification, zari work guide',
  openGraph: {
    title: 'How to Identify Real Hand Embroidery: Complete Guide',
    description: '7 proven methods to identify real hand embroidery from machine-made fakes. Expert guide from LAQAB.',
    type: 'article',
  },
};

export default function BlogPost() {
  const publishDate = 'April 25, 2026';
  const readTime = '8 min read';
  const author = 'LAQAB Team';

  return (
    <div className="blog-post-page">
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

      {/* Breadcrumb */}
      <div className="container py-4">
        <nav className="breadcrumb flex items-center gap-2 text-sm">
          <Link href="/" className="text-[#800020] hover:underline">Home</Link>
          <span>/</span>
          <Link href="/blog" className="text-[#800020] hover:underline">Blog</Link>
          <span>/</span>
          <span className="text-gray-500">How to Identify Real Hand Embroidery</span>
        </nav>
      </div>

      {/* Article Header */}
      <article className="container py-8">
        <div className="max-w-3xl mx-auto">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full mb-4">
            <span className="text-[#D4AF37] text-sm">✨</span>
            <span className="text-[#D4AF37] text-sm font-semibold">Craftsmanship Guide</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
            How to Identify Real Hand Embroidery vs Machine-Made
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 py-4 border-b border-gray-200 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={16} />
              <span>{publishDate}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={16} />
              <span>{readTime}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <User size={16} />
              <span>{author}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1599465337007-8a90c0a3c680?w=1200&q=80"
              alt="Close-up of hand embroidered zari work by skilled karigar"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-xl text-gray-700 leading-relaxed">
              <strong>Worried about spending money on "hand embroidered" clothing that's actually machine-made?</strong>
              You're not alone. In today's market, many sellers claim their products are hand embroidered when they're actually mass-produced by machines. This guide will help you separate real craftsmanship from clever fakes.
            </p>
          </div>

          {/* Section 1: Why It Matters */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Why Does It Matter?</h2>
            <div className="bg-[#FFF8E7] p-6 rounded-lg border border-[#D4AF37]/30 mb-4">
              <h3 className="font-semibold text-[#800020] mb-3">The Price Difference is Huge</h3>
              <ul className="space-y-2">
                <li><strong>Machine-made:</strong> ₹500-2,000 for similar looking embroidery</li>
                <li><strong>Hand embroidered:</strong> ₹3,000-15,000+ depending on complexity</li>
              </ul>
              <p className="mt-3 text-sm text-gray-700">
                If you're paying "hand embroidery" prices for machine work, you're being overcharged by 3-5x.
              </p>
            </div>
          </section>

          {/* Section 2: 7 Methods */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">7 Methods to Identify Real Hand Embroidery</h2>

            {/* Method 1 */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-[#800020] text-white rounded-full flex items-center justify-center font-bold text-lg">1</span>
                <div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Examine the Back of the Fabric</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Hand embroidery:</strong> The back shows loose threads, varying tension, and slight irregularities. It looks like a mirror image of the front.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Machine embroidery:</strong> The back is often as neat as the front, with perfectly even stitches and thread tension.
                  </p>
                  <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                    <p className="text-sm text-green-800">
                      <strong>Pro tip:</strong> Turn the garment inside out. Real hand embroidery always looks slightly "messy" on the back because a person is doing the work, not a machine.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Method 2 */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-[#800020] text-white rounded-full flex items-center justify-center font-bold text-lg">2</span>
                <div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Feel the Texture</h3>
                  <p className="text-gray-700 mb-3">
                    Run your fingers over the embroidered area. <strong>Real hand embroidery</strong> has a distinct, slightly raised texture. You can feel each stitch — it's like touching a low-relief sculpture.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Machine embroidery</strong> feels flatter and more uniform. The pattern is perfectly consistent because a computer is controlling every stitch.
                  </p>
                </div>
              </div>
            </div>

            {/* Method 3 */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-[#800020] text-white rounded-full flex items-center justify-center font-bold text-lg">3</span>
                <div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Look for Natural Variations</h3>
                  <p className="text-gray-700 mb-3">
                    In hand embroidery, no two stitches are exactly identical. Look for:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
                    <li>Slight differences in stitch direction</li>
                    <li>Minor variations in thread coverage</li>
                    <li>Small gaps or overlaps where a karigar adjusted their work</li>
                  </ul>
                  <p className="text-gray-700">
                    <strong>Machine embroidery</strong> is mathematically perfect — every element is exactly the same as every other element.
                  </p>
                </div>
              </div>
            </div>

            {/* Method 4 */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-[#800020] text-white rounded-full flex items-center justify-center font-bold text-lg">4</span>
                <div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Check the Thread Quality</h3>
                  <p className="text-gray-700 mb-3">
                    <strong>Real zari work:</strong> Uses metallic threads (real silver/gold coated) that have a subtle sheen and slight irregularities.
                  </p>
                  <p className="text-gray-700 mb-3">
                    <strong>Fake zari:</strong> Uses plastic threads with a fake metallic coating. It looks too shiny and uniform.
                  </p>
                  <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-500">
                    <p className="text-sm text-yellow-800">
                      <strong>Warning:</strong> Real zari threads are expensive (₹200-500 per meter for quality zari). If the price seems too good to be true, the zari is likely fake.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Method 5 */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-[#800020] text-white rounded-full flex items-center justify-center font-bold text-lg">5</span>
                <div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">The Price Test</h3>
                  <p className="text-gray-700 mb-3">
                    Hand embroidery is <strong>labor-intensive</strong>. A skilled karigar can only do a limited amount per day. This cost is reflected in the price.
                  </p>
                  <div className="bg-gray-100 p-4 rounded mb-3">
                    <h4 className="font-semibold mb-2">Rough Pricing Guide:</h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Simple hand embroidery: ₹1,500-3,000 for a sherwani</li>
                      <li>• Medium complexity: ₹3,000-7,000 for a sherwani</li>
                      <li>• Heavy zari work: ₹7,000-15,000+ for a sherwani</li>
                    </ul>
                  </div>
                  <p className="text-gray-700">
                    <strong>Red flag:</strong> A "hand embroidered" sherwani under ₹5,000 is almost certainly machine-made or has minimal hand work.
                  </p>
                </div>
              </div>
            </div>

            {/* Method 6 */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-[#800020] text-white rounded-full flex items-center justify-center font-bold text-lg">6</span>
                <div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Ask About the Process</h3>
                  <p className="text-gray-700 mb-3">
                    A legitimate seller should be able to explain <strong>exactly how</strong> the embroidery is done:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
                    <li>Where the karigars work (their workshop or home)</li>
                    <li>How long the embroidery takes</li>
                    <li>What materials are used (type of thread, fabric)</li>
                    <li>Quality check process</li>
                  </ul>
                  <p className="text-gray-700">
                    If the seller can't answer these questions or seems evasive, be suspicious.
                  </p>
                </div>
              </div>
            </div>

            {/* Method 7 */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-[#800020] text-white rounded-full flex items-center justify-center font-bold text-lg">7</span>
                <div>
                  <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">The Candle Light Test (For Zari)</h3>
                  <p className="text-gray-700 mb-3">
                    Hold the embroidered area near a candle flame (carefully!):
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 mb-3">
                    <li><strong>Real zari:</strong> Slight warmth but doesn't melt or peel</li>
                    <li><strong>Fake zari/plastic:</strong> Starts melting, smells like plastic, coating peels off</li>
                  </ul>
                  <div className="bg-red-50 p-3 rounded border-l-4 border-red-500">
                    <p className="text-sm text-red-800">
                      <strong>Safety:</strong> This test involves fire. Do it carefully or skip it if you're not comfortable. Better to rely on the other methods.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: LAQAB Promise */}
          <section className="mb-10 bg-gradient-to-r from-[#800020] to-[#6B001A] p-8 rounded-lg text-white">
            <h2 className="text-2xl font-bold mb-4">The LAQAB Promise</h2>
            <p className="mb-4">
              At LAQAB, <strong>every piece is verified hand embroidered by skilled karigars</strong>. We don't just say "hand embroidered" — we guarantee it.
            </p>
            <ul className="space-y-2 mb-6">
              <li>✓ You can visit our karigars and watch the work being done</li>
              <li>✓ Every piece comes with a authenticity tag</li>
              <li>✓ Photos of the embroidery process available on request</li>
              <li>✓ 15-25 days delivery because hand work takes time</li>
            </ul>
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#1A1A1A] rounded-lg font-semibold hover:bg-[#c9a432] transition-colors"
            >
              Browse Our Hand Embroidered Collection →
            </Link>
          </section>

          {/* Section 4: Summary Table */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Quick Comparison: Hand vs Machine</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#800020] text-white">
                    <th className="p-3 text-left">Feature</th>
                    <th className="p-3 text-left">Hand Embroidery</th>
                    <th className="p-3 text-left">Machine Embroidery</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-semibold">Back of fabric</td>
                    <td className="p-3">Slightly messy, irregular threads</td>
                    <td className="p-3">Neat, clean, looks like front</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-3 font-semibold">Texture</td>
                    <td className="p-3">Raised, noticeable stitches</td>
                    <td className="p-3">Flat, uniform</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-semibold">Variations</td>
                    <td className="p-3">Natural variations visible</td>
                    <td className="p-3">Mathematically perfect</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="p-3 font-semibold">Price</td>
                    <td className="p-3">₹3,000+ for sherwani embroidery</td>
                    <td className="p-3">₹500-2,000 for same look</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-3 font-semibold">Delivery time</td>
                    <td className="p-3">15-25 days minimum</td>
                    <td className="p-3">3-7 days (ready stock)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA */}
          <section className="mb-10 text-center p-8 bg-[#FFF8E7] rounded-lg border-2 border-[#D4AF37]/30">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Want to See Real Hand Embroidery?</h2>
            <p className="text-gray-700 mb-6">
              Browse our collection of hand embroidered sherwani, kurta, and bandhgala. Every piece verified, every stitch placed by skilled karigars.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#800020] text-white rounded-lg font-semibold hover:bg-[#6B001A] transition-colors"
              >
                Shop Collection
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#800020] border-2 border-[#800020] rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </section>

          {/* Share */}
          <div className="flex items-center gap-4 py-6 border-t border-gray-200">
            <span className="text-gray-600 font-medium">Share this guide:</span>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Share2 size={20} className="text-[#800020]" />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}