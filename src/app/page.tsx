'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Products from '@/components/sections/Products';
import HoneyComparison from '@/components/sections/HoneyComparison';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Visit from '@/components/sections/Visit';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import Newsletter from '@/components/sections/Newsletter';
import Footer from '@/components/sections/Footer';
import StatsBar from '@/components/sections/StatsBar';
import CookieConsent from '@/components/sections/CookieConsent';
import BackToTop from '@/components/sections/BackToTop';
import WhatsAppButton from '@/components/sections/WhatsAppButton';
import PageSkeleton from '@/components/sections/PageSkeleton';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  if (!mounted) return <PageSkeleton />;
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg"
      >
        Preskoči na vsebino
      </a>
      <Navigation />
      <main id="main-content" className="flex-1">
        <Hero />
        <About />
        <Products />
        <HoneyComparison />
        <Process />
        <StatsBar />
        <Testimonials />
        <Visit />
        <FAQ />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
      <CookieConsent />
      <BackToTop />
      <WhatsAppButton />
    </div>
  );
}
