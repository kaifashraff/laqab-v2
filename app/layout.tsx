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
import FuturisticBackground from '@/components/FuturisticBackground';

export const metadata: Metadata = {
  title: 'LAQAB | Premium Ethnic Menswear - Sherwani, Kurta, Wedding Wear',
  description:
    'Discover exquisite ethnic menswear at LAQAB. Shop premium sherwanis, kurtas, and wedding wear crafted with traditional Indian artistry. Worldwide shipping available.',
  keywords:
    'sherwani, kurta, ethnic menswear, wedding sherwani, Indian fashion, mens ethnic wear, gold sherwani, silk kurta',
  authors: [{ name: 'LAQAB' }],
  openGraph: {
    title: 'LAQAB | Premium Ethnic Menswear',
    description:
      'Discover exquisite ethnic menswear. Premium sherwanis, kurtas, and wedding wear.',
    type: 'website',
    locale: 'en_US',
    siteName: 'LAQAB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LAQAB | Premium Ethnic Menswear',
    description:
      'Discover exquisite ethnic menswear. Premium sherwanis, kurtas, and wedding wear.',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
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
        {/* Futuristic Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ReduxProvider>
          {/* 3D Animated Background */}
          <FuturisticBackground />
          
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
        </ReduxProvider>
      </body>
    </html>
  );
}
