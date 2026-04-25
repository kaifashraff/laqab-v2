import type { Metadata } from 'next';
import './globals.css';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/cart/CartSidebar';
import WishlistSidebar from '@/components/wishlist/WishlistSidebar';
import NewsletterPopup from '@/components/popups/NewsletterPopup';
import QuickViewPopup from '@/components/popups/QuickViewPopup';
import SizeGuidePopup from '@/components/popups/SizeGuidePopup';
import LoginPopup from '@/components/popups/LoginPopup';
import MobileMenu from '@/components/layout/MobileMenu';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export const metadata: Metadata = {
  title: 'LAQAB - Hand Embroidered Sherwani & Ethnic Wear | Ahmedabad, India',
  description:
    'Premium hand embroidered sherwani, kurta, bandhgala by skilled karigars. Custom orders available in 15-25 days. Shop authentic Indian ethnic wear. Worldwide shipping.',
  keywords:
    'hand embroidered sherwani, zari work, ethnic menswear, wedding sherwani, custom sherwani, kurta, bandhgala, Ahmedabad, India, karigar, handcraft, hand embroidery',
  authors: [{ name: 'LAQAB' }],
  openGraph: {
    title: 'LAQAB - Hand Embroidered Ethnic Wear | Ahmedabad',
    description:
      'Premium hand embroidered sherwani, kurta, bandhgala by skilled karigars. Custom orders welcome. 15-25 days delivery.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'LAQAB',
    images: [{
      url: 'https://kaifashraff.github.io/laqab-v2/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'LAQAB - Hand Embroidered Ethnic Wear',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LAQAB - Hand Embroidered Sherwani & Ethnic Wear',
    description:
      'Premium hand embroidered sherwani, kurta, bandhgala by skilled karigars. Custom orders available.',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
  alternates: {
    canonical: 'https://kaifashraff.github.io/laqab-v2/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Premium Ethnic Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ReduxProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartSidebar />
          <WishlistSidebar />
          <NewsletterPopup />
          <QuickViewPopup />
          <SizeGuidePopup />
          <LoginPopup />
          <MobileMenu />
          <WhatsAppButton />
        </ReduxProvider>
      </body>
    </html>
  );
}
