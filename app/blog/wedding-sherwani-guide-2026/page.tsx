import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Wedding Sherwani Guide 2026: Styles, Trends & Tips | LAQAB',
  description: 'Complete guide to wedding sherwani styles, trends for 2026, color guide, and styling tips. Expert advice from LAQAB.',
  keywords: 'wedding sherwani guide, sherwani styles 2026, groom sherwani tips, wedding trends',
};

export default function WeddingSherwaniGuidePage() {
  return (
    <div className="blog-post-page">
      {/* Header Banner */}
      <div className="w-full bg-gradient-to-r from-[#800020] via-[#800020] to-[#6B001A] py-3 px-4 text-center">
        <p className="text-[#FFF8E7] text-sm md:text-base font-medium">
          <span className="text-[#D4AF37]">✨ Hand Embroidered by Skilled Karigars</span>
          {' | '}
          <Link href="/contact" className="underline hover:text-white">Custom Orders Available</Link>
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
          <span className="text-gray-500">Wedding Sherwani Guide 2026</span>
        </nav>
      </div>

      {/* Article */}
      <article className="container py-8">
        <div className="max-w-3xl mx-auto">
          {/* Category */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-full mb-4">
            <span className="text-[#D4AF37] text-sm">💍</span>
            <span className="text-[#D4AF37] text-sm font-semibold">Wedding Guide</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cinzel, serif' }}>
            Wedding Sherwani Guide 2026: Styles, Trends & Expert Tips
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 py-4 border-b border-gray-200 mb-6 text-gray-600">
            <span>April 25, 2026</span>
            <span>•</span>
            <span>10 min read</span>
            <span>•</span>
            <span>By LAQAB Team</span>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80"
              alt="Groom wearing elegant hand embroidered sherwani at wedding"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-xl text-gray-700 leading-relaxed">
              <strong>Your wedding sherwani isn't just an outfit — it's how the world remembers you on the most important day of your life.</strong>
              This guide covers everything you need to know: trending styles for 2026, color selection, fit tips, and how to ensure your sherwani stands out.
            </p>
          </div>

          {/* Section 1: Why Sherwani Matters */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Why Your Sherwani Choice Matters</h2>
            <p className="text-gray-700 mb-4">
              In Indian weddings, the groom is the center of attention. Every relative, every guest, every photograph — they all look at the groom first. Your sherwani sets the tone for your entire wedding look.
            </p>
            <div className="bg-[#FFF8E7] p-6 rounded-lg border border-[#D4AF37]/30">
              <p className="text-[#800020] font-semibold">
                💡 A good sherwani doesn't just make you look good — it makes you feel confident, comfortable, and regal.
              </p>
            </div>
          </section>

          {/* Section 2: 2026 Trends */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Wedding Sherwani Trends for 2026</h2>
            
            {/* Trend 1 */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-[#800020] mb-3">1. Hand Embroidered Is the New Luxury Standard</h3>
              <p className="text-gray-700 mb-3">
                Gone are the days when machine-made embroidery was considered premium. In 2026, <strong>real hand embroidery by skilled karigars</strong> is the true mark of a luxury sherwani.
              </p>
              <p className="text-gray-700">
                Couples are increasingly asking: "Is it really hand embroidered?" — and they're willing to pay more for authenticity.
              </p>
            </div>

            {/* Trend 2 */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-[#800020] mb-3">2. Pastel Colors Are Trending</h3>
              <p className="text-gray-700 mb-3">
                While gold and maroon remain classics, <strong>pastel sherwanis</strong> are having a major moment in 2026:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Ivory/Off-white — Elegant, timeless, great for day weddings</li>
                <li>Blush pink — Subtle, romantic, perfect for evening ceremonies</li>
                <li>Mint green — Fresh, unique, great for spring/winter weddings</li>
                <li>Lavender — Modern, distinctive, for the bold groom</li>
              </ul>
            </div>

            {/* Trend 3 */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-[#800020] mb-3">3. Asymmetric Cuts and Modern Silhouettes</h3>
              <p className="text-gray-700 mb-3">
                Traditional straight-cut sherwanis are being replaced by <strong>modern cuts with asymmetric details</strong>:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Angled hemlines</li>
                <li>Single-shoulder designs</li>
                <li>Contrast collar details</li>
                <li>Nehru-collar fusion styles</li>
              </ul>
            </div>

            {/* Trend 4 */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-[#800020] mb-3">4. Statement Zari Work</h3>
              <p className="text-gray-700">
                Heavy zari embroidery on the <strong>entire sherwani</strong> (not just the chest area) is trending. From collar to hem, full-body zari work makes a bold statement.
              </p>
            </div>
          </section>

          {/* Section 3: Color Guide */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Sherwani Color Guide by Wedding Type</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#800020] text-white rounded-lg">
                <h3 className="font-bold text-lg mb-3">Morning/Mandap Ceremony</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Ivory/Cream — Traditional, elegant</li>
                  <li>• Gold — Classic, regal</li>
                  <li>• Light maroon — Festive without being heavy</li>
                </ul>
              </div>
              
              <div className="p-6 bg-[#D4AF37] text-[#1A1A1A] rounded-lg">
                <h3 className="font-bold text-lg mb-3">Evening/Reception</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Deep maroon — Dramatic, stunning</li>
                  <li>• Royal blue — Unique, memorable</li>
                  <li>• Black with gold — Ultra-premium look</li>
                </ul>
              </div>
              
              <div className="p-6 bg-gray-100 text-[#1A1A1A] rounded-lg">
                <h3 className="font-bold text-lg mb-3">Destination Wedding</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Pastel colors — Photography-friendly</li>
                  <li>• White/cream — Beach-friendly elegance</li>
                  <li>• Light gold — Warm lighting complement</li>
                </ul>
              </div>
              
              <div className="p-6 border-2 border-[#D4AF37] rounded-lg">
                <h3 className="font-bold text-lg mb-3">Winter Wedding</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Velvet fabric — Warm, luxurious</li>
                  <li>• Deep colors — Maroon, navy, forest green</li>
                  <li>• Heavy embroidery — Rich, opulent look</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Fit Tips */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Sherwani Fit: The细节 That Make the Difference</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-lg border-l-4 border-[#800020]">
                <div className="flex-shrink-0 w-10 h-10 bg-[#800020] text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A]">Shoulder Fit</h4>
                  <p className="text-gray-600 text-sm">The shoulder seam should sit exactly at your natural shoulder point. Too wide = sloppy, too narrow = tight and uncomfortable.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-white rounded-lg border-l-4 border-[#800020]">
                <div className="flex-shrink-0 w-10 h-10 bg-[#800020] text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A]">Length</h4>
                  <p className="text-gray-600 text-sm">The sherwani should hit just above your knee (or at knee for taller men). Too short = looks like a jacket, too long = drowns you.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-white rounded-lg border-l-4 border-[#800020]">
                <div className="flex-shrink-0 w-10 h-10 bg-[#800020] text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A]">Sleeve Length</h4>
                  <p className="text-gray-600 text-sm">Sleeves should end at your wrist bone, showing about 1 inch of your shirt cuff. This creates a layered, sophisticated look.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-white rounded-lg border-l-4 border-[#800020]">
                <div className="flex-shrink-0 w-10 h-10 bg-[#800020] text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A]">Comfort Allowance</h4>
                  <p className="text-gray-600 text-sm">With heavy embroidery, you may need slightly looser fit — the embroidery adds weight and reduces flexibility. Plan accordingly.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Styling Tips */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">5 Styling Tips for the Perfect Wedding Look</h2>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-[#800020] mb-2">1. Dupatta/Pocket Square Coordination</h4>
                <p className="text-gray-600 text-sm">Match your dupatta or pocket square color with your sherwani's embroidery color. This creates visual cohesion without being too matchy-matchy.</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-[#800020] mb-2">2. Footwear Matters</h4>
                <p className="text-gray-600 text-sm">Traditional mojaris are the classic choice, but Kolhapuri chappals work well for wedding events. Whatever you choose, ensure they're broken in before the wedding.</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-[#800020] mb-2">3. Layer with a Waistcoat</h4>
                <p className="text-gray-600 text-sm">For reception, adding a contrast waistcoat under your sherwani adds depth and visual interest. Choose a color that complements, not matches.</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-[#800020] mb-2">4. Don't Forget the Turban/Safa</h4>
                <p className="text-gray-600 text-sm">If your culture includes a turban, this is your opportunity to add a pop of color or match the bride's outfit. The turban is often the most photographed element of the groom's look.</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-[#800020] mb-2">5. Jewelry: Less Is More</h4>
                <p className="text-gray-600 text-sm">One statement piece — a brooch, a necklace, or a special pair of cufflinks — is better than multiple pieces. Let the sherwani be the star.</p>
              </div>
            </div>
          </section>

          {/* Section 6: Budget */}
          <section className="mb-10 bg-[#FFF8E7] p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">How Much Should You Spend on a Wedding Sherwani?</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-[#D4AF37]/30 pb-3">
                <span className="font-semibold">Budget Range</span>
                <span className="font-semibold text-[#800020]">What's Included</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#D4AF37]/30 pb-3">
                <span>₹8,000 - ₹15,000</span>
                <span>Ready-made, minimal hand embroidery</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#D4AF37]/30 pb-3">
                <span>₹15,000 - ₹25,000</span>
                <span>Quality fabric, significant hand embroidery</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#D4AF37]/30 pb-3">
                <span>₹25,000 - ₹40,000</span>
                <span>Premium fabric, heavy hand embroidery, custom fit</span>
              </div>
              <div className="flex justify-between items-center">
                <span>₹40,000+</span>
                <span>Bespoke, full hand embroidery, designer label</span>
              </div>
            </div>
            
            <p className="mt-4 text-sm text-gray-700">
              <strong>LAQAB Tip:</strong> A hand embroidered sherwani in the ₹18,000-30,000 range offers the best value — premium quality without designer label markup.
            </p>
          </section>

          {/* CTA */}
          <section className="mb-10 text-center p-8 bg-gradient-to-r from-[#800020] to-[#6B001A] rounded-lg text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Find Your Perfect Wedding Sherwani?</h2>
            <p className="mb-6">
              Every LAQAB sherwani is hand embroidered by skilled karigars — because your wedding day deserves nothing less than perfection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products?collection=wedding-special" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#1A1A1A] rounded-lg font-semibold hover:bg-[#c9a432] transition-colors"
              >
                Browse Wedding Collection →
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Custom Order Inquiry
              </Link>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}