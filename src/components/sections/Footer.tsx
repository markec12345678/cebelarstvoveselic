'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Instagram, MapPin, Phone, Mail, ArrowUp, ArrowRight, Truck, Shield, CreditCard, Loader2, CheckCircle, ChevronUp } from 'lucide-react';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';
import { toast } from 'sonner';

const partnerLogos = [
  { name: 'Pošta Slovenije', abbr: 'PS' },
  { name: 'DPD', abbr: 'DPD' },
  { name: 'PayPal', abbr: 'PP' },
  { name: 'BLIK', abbr: 'BLIK' },
  { name: 'Mastercard', abbr: 'MC' },
  { name: 'Visa', abbr: 'V' },
];

const sectionLinks = [
  { key: 'story', label: { sl: 'Naša zgodba', en: 'Our Story' } },
  { key: 'products', label: { sl: 'Med', en: 'Honey' } },
  { key: 'process', label: { sl: 'Postopek', en: 'Process' } },
  { key: 'testimonials', label: { sl: 'Ocene', en: 'Reviews' } },
  { key: 'visit', label: { sl: 'Obisk', en: 'Visit' } },
  { key: 'faq', label: { sl: 'Vprašanja', en: 'FAQ' } },
  { key: 'contact', label: { sl: 'Kontakt', en: 'Contact' } },
];

export default function Footer() {
  const { lang, setLang } = useLangStore();
  const t = getTranslations(lang);
  const [footerEmail, setFooterEmail] = useState('');
  const [footerSubmitting, setFooterSubmitting] = useState(false);
  const [footerSubscribed, setFooterSubscribed] = useState(false);
  const [yearVisible, setYearVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setYearVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(Math.round((window.scrollY / docHeight) * 100), 100) : 0;
      setScrollPercent(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFooterNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(footerEmail)) {
      toast.error(lang === 'sl' ? 'Vnesite veljaven e-poštni naslov.' : 'Please enter a valid email address.');
      return;
    }
    setFooterSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: footerEmail, lang }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.error || 'Error');
        return;
      }
      setFooterSubscribed(true);
      setFooterEmail('');
      toast.success(lang === 'sl' ? 'Hvala za naročilo!' : 'Thank you for subscribing!');
    } catch {
      toast.error(lang === 'sl' ? 'Prišlo je do napake.' : 'An error occurred.');
    } finally {
      setFooterSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSectionJump = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val) {
      document.getElementById(val)?.scrollIntoView({ behavior: 'smooth' });
      e.target.value = '';
    }
  };

  return (
    <footer className="bg-bark text-white/80 relative" role="contentinfo">
      {/* Footer wave SVG divider at top */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[30px]">
          <path d="M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,40 L0,40 Z" fill="#3E2723" />
          <path d="M0,25 C360,10 720,35 1080,15 C1260,25 1380,10 1440,25" fill="none" stroke="rgba(212,160,23,0.15)" strokeWidth="1" />
        </svg>
      </div>

      {/* Animated border at top */}
      <div className="animated-border h-[3px]" />

      {/* Honeycomb SVG pattern in background (very low opacity) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="honeycomb-footer" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(0.8)">
              <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="white" strokeWidth="0.5" />
              <path d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#honeycomb-footer)" />
        </svg>
      </div>

      {/* Partner logos marquee bar */}
      <div className="relative overflow-hidden bg-bark/80 border-b border-white/5 py-3">
        <div className="flex marquee whitespace-nowrap">
          {[...partnerLogos, ...partnerLogos].map((p, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 mx-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/8"
            >
              <span className="text-[11px] font-bold text-honey-400 tracking-wider">{p.abbr}</span>
              <span className="text-[11px] text-white/40">{p.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4 relative">
            {/* Decorative hexagon watermark */}
            <svg
              className="absolute -top-8 -left-4 w-40 h-40 opacity-[0.03] pointer-events-none"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
              <path
                d="M50 20L75 32.5V57.5L50 70L25 57.5V32.5L50 20Z"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </svg>
            <div className="flex items-center gap-2.5 mb-4 relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-honey-300 to-honey-600 flex items-center justify-center shadow-lg shadow-honey-600/20">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path d="M12 2C6.48 2 2 6 2 10.5c0 2.5 1.5 4.5 3.5 5.5L5 22h2l.5-3.5c.8.2 1.7.3 2.5.5v3h2v-3c.8-.2 1.7-.3 2.5-.5L15 22h2l-.5-6c2-1 3.5-3 3.5-5.5C20 6 15.52 2 12 2z" fill="currentColor" opacity="0.3" />
                  <path d="M12 4c-3.87 0-7 2.69-7 6s3.13 6 7 6 7-2.69 7-6-3.13-6-7-6zm-2 8a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2z" fill="currentColor" />
                </svg>
              </div>
              <div>
                <span className="text-base font-bold text-white leading-none block">Čebelarstvo</span>
                <span className="text-xs text-honey-400 font-semibold tracking-widest leading-none mt-1 block">VESELIČ</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50 max-w-sm">
              {t.footer.brandDesc}
            </p>

            {/* Social media with hover scale + color transition + tooltip */}
            <div className="mt-5 flex items-center gap-2">
              <motion.a
                href="https://facebook.com/cebelarstvoveselic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-blue-500/20 flex items-center justify-center text-white/40 hover:text-blue-400 transition-all duration-200 relative group"
                aria-label="Facebook"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-4 h-4" />
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-black/80 text-[10px] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                  {lang === 'sl' ? '2.3K sledilcev' : '2.3K followers'}
                </span>
              </motion.a>
              <motion.a
                href="https://instagram.com/cebelarstvo_veselic"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-pink-500/20 flex items-center justify-center text-white/40 hover:text-pink-400 transition-all duration-200 relative group"
                aria-label="Instagram"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-4 h-4" />
                <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-black/80 text-[10px] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                  {lang === 'sl' ? '1.8K sledilcev' : '1.8K followers'}
                </span>
              </motion.a>
            </div>

            <p className="mt-5 text-xs text-white/30">{t.footer.madeIn}</p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 border-t border-white/10 sm:border-t-0">
            <h3 className="text-xs font-bold text-white/90 mb-4 uppercase tracking-widest">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {['story', 'products', 'process', 'visit', 'faq', 'contact'].map((key) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className="text-sm text-white/50 hover:text-honey-400 transition-all duration-200 flex items-center gap-1.5 group hover:translate-x-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-honey-600/50 group-hover:bg-honey-400 transition-colors" />
                    {t.nav[key as keyof typeof t.nav]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2 border-t border-white/10 sm:border-t-0">
            <h3 className="text-xs font-bold text-white/90 mb-4 uppercase tracking-widest">
              {t.footer.legal}
            </h3>
            <ul className="space-y-3">
              {['privacy', 'terms', 'cookies'].map((key) => {
                const labels: Record<string, string> = {
                  privacy: t.footer.privacy,
                  terms: t.footer.terms,
                  cookies: t.footer.cookies,
                };
                return (
                  <li key={key}>
                    <a href="#" className="text-sm text-white/50 hover:text-honey-400 transition-all duration-200 flex items-center gap-1.5 group hover:translate-x-1">
                      <span className="w-1 h-1 rounded-full bg-honey-600/50 group-hover:bg-honey-400 transition-colors" />
                      {labels[key]}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Payment & Shipping icons */}
            <div className="mt-6">
              <p className="text-[10px] text-white/30 uppercase tracking-widest mb-2.5">
                {lang === 'sl' ? 'Zaupanja vredno' : 'Trusted'}
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center payment-icon-hover" title="SSL Secure">
                  <Shield className="w-3.5 h-3.5 text-white/30" />
                </div>
                <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center payment-icon-hover" title="Secure Payment">
                  <CreditCard className="w-3.5 h-3.5 text-white/30" />
                </div>
                <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center payment-icon-hover" title="Fast Shipping">
                  <Truck className="w-3.5 h-3.5 text-white/30" />
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-4 border-t border-white/10 sm:border-t-0">
            <h3 className="text-xs font-bold text-white/90 mb-4 uppercase tracking-widest">
              {t.footer.contact}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-honey-500/60 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/50">{t.footer.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-honey-500/60 flex-shrink-0" />
                <a href="tel:+38641234567" className="text-sm text-white/50 hover:text-honey-400 transition-all duration-200 hover:translate-x-1">
                  {t.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-honey-500/60 flex-shrink-0" />
                <a href="mailto:info@cebelarstvo-veselic.si" className="text-sm text-white/50 hover:text-honey-400 transition-all duration-200 hover:translate-x-1">
                  {t.contact.email}
                </a>
              </li>
            </ul>

            {/* Location badge */}
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/5">
              <span className="text-lg">🇸🇮</span>
              <div>
                <span className="text-xs font-medium text-white/60 block">Bela krajina, Slovenija</span>
                <span className="text-[11px] text-white/30">45.6424° N, 15.3231° E</span>
              </div>
            </div>

            {/* Newsletter mini-form */}
            <div className="mt-5">
              <p className="text-xs text-white/40 mb-2">
                {lang === 'sl' ? 'Newsletter:' : 'Newsletter:'}
              </p>
              {footerSubscribed ? (
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'sl' ? 'Naročeni!' : 'Subscribed!'}</span>
                </div>
              ) : (
                <form onSubmit={handleFooterNewsletter} className="flex gap-1.5">
                  <Input
                    type="email"
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    placeholder={lang === 'sl' ? 'vaša@e-pošta.si' : 'your@email.com'}
                    className="h-9 text-xs bg-white/5 border-white/10 text-white placeholder:text-white/20 border-2 honey-border-animated focus:ring-2 focus:ring-honey-500/20 flex-1 transition-all duration-200"
                    required
                    aria-label="Newsletter email"
                  />
                  <Button
                    type="submit"
                    disabled={footerSubmitting}
                    size="sm"
                    className="h-8 px-3 bg-honey-500/80 hover:bg-honey-500 text-white text-xs"
                  >
                    {footerSubmitting ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <ArrowRight className="w-3 h-3" />
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: yearVisible ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            © {new Date().getFullYear()} Čebelarstvo Veselič, Jožef Veselič s.p. · {t.footer.rights}
          </motion.p>
          <div className="flex items-center gap-3">
            {/* Scroll to section dropdown */}
            <select
              onChange={handleSectionJump}
              defaultValue=""
              className="text-xs bg-white/5 border border-white/10 text-white/50 rounded-md px-2 py-1 appearance-none cursor-pointer hover:border-honey-500/30 hover:text-honey-400 transition-colors focus:outline-none focus:ring-1 focus:ring-honey-500/30"
              aria-label={lang === 'sl' ? 'Skoči na sekcijo' : 'Jump to section'}
            >
              <option value="" disabled className="bg-bark">
                {lang === 'sl' ? '↕ Skoči na …' : '↕ Jump to …'}
              </option>
              {sectionLinks.map((s) => (
                <option key={s.key} value={s.key} className="bg-bark">
                  {lang === 'sl' ? s.label.sl : s.label.en}
                </option>
              ))}
            </select>
            <span className="text-white/10">|</span>
            {/* Back to top animated arrow with scroll percentage */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={scrollToTop}
                  className="flex items-center gap-1.5 text-white/30 hover:text-honey-400 transition-colors group px-2.5 py-1 rounded-md hover:bg-honey-500/10"
                  aria-label={lang === 'sl' ? 'Nazaj na vrh' : 'Back to top'}
                >
                  <motion.div
                    animate={{ y: [-2, 2, -2] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.div>
                  <span className="text-xs flex items-center gap-1">
                    {lang === 'sl' ? 'Na vrh' : 'Top'}
                    <span className="scroll-percent">{scrollPercent}%</span>
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
            <span className="text-white/10">|</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang('sl')}
                className={`px-2.5 py-1 rounded-md text-xs transition-all duration-200 ${
                  lang === 'sl'
                    ? 'bg-honey-500/15 text-honey-400 font-medium'
                    : 'hover:text-white/50 hover:bg-white/5'
                }`}
                aria-label="Slovenščina"
              >
                SI
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-md text-xs transition-all duration-200 ${
                  lang === 'en'
                    ? 'bg-honey-500/15 text-honey-400 font-medium'
                    : 'hover:text-white/50 hover:bg-white/5'
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
