'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Sun, Moon, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';
import type { Lang } from '@/lib/i18n';

const navItems = [
  { key: 'story', href: '#story' },
  { key: 'products', href: '#products' },
  { key: 'process', href: '#process' },
  { key: 'testimonials', href: '#testimonials' },
  { key: 'visit', href: '#visit' },
  { key: 'faq', href: '#faq' },
  { key: 'contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileClosing, setMobileClosing] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { lang, toggleLang } = useLangStore();
  const { theme, setTheme } = useTheme();
  const t = getTranslations(lang);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setScrolled(scrollY > 50);

    // Scroll progress calculation
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0;
    setScrollProgress(progress);

    // Active section detection
    const sections = navItems.map((item) => item.key);
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.getBoundingClientRect().top <= 120) {
        setActiveSection(sections[i]);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    closeMobileMenu();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const closeMobileMenu = () => {
    setMobileClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
      setMobileClosing(false);
    }, 250);
  };

  // Compute shadow intensity based on scroll position
  const shadowClass = useMemo(() => {
    if (scrollProgress < 5) return 'shadow-none';
    if (scrollProgress < 20) return 'shadow-sm';
    if (scrollProgress < 50) return 'shadow-md';
    return 'shadow-lg';
  }, [scrollProgress]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? `bg-background/95 ${scrollProgress > 15 ? 'backdrop-blur-xl' : 'backdrop-blur-md'} border-b-2 border-honey-300/40 dark:border-honey-600/30 ${shadowClass}`
            : 'bg-transparent shadow-none'
        }`}
      >
        {/* Scroll progress bar */}
        <div
          className="scroll-progress"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Scroll progress"
        />

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo with hover rotation + hexagon outline */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group relative"
            >
              {/* Breathing glow behind logo on hover */}
              <span className="absolute -inset-2 rounded-full bg-honey-400/0 group-hover:bg-honey-400/10 transition-all duration-500 breathe pointer-events-none" />
              {/* Subtle hexagon outline behind logo */}
              <svg
                className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] opacity-[0.08] pointer-events-none"
                viewBox="0 0 50 50"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25 2L46 14V36L25 48L4 36V14L25 2Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <motion.div
                className="w-9 h-9 rounded-full bg-gradient-to-br from-honey-300 to-honey-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow cursor-pointer relative"
                whileHover={{ rotate: 20, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M12 2C6.48 2 2 6 2 10.5c0 2.5 1.5 4.5 3.5 5.5L5 22h2l.5-3.5c.8.2 1.7.3 2.5.5v3h2v-3c.8-.2 1.7-.3 2.5-.5L15 22h2l-.5-6c2-1 3.5-3 3.5-5.5C20 6 15.52 2 12 2z"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <path
                    d="M12 4c-3.87 0-7 2.69-7 6s3.13 6 7 6 7-2.69 7-6-3.13-6-7-6zm-2 8a1 1 0 110-2 1 1 0 010 2zm4 0a1 1 0 110-2 1 1 0 010 2z"
                    fill="currentColor"
                  />
                </svg>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight leading-none">
                  Čebelarstvo
                </span>
                <span className="text-xs text-honey-600 font-semibold tracking-wide leading-none mt-0.5">
                  VESELIČ
                </span>
              </div>
            </a>

            {/* Desktop Nav with active pill indicator */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.key;
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="relative px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {/* Active pill background */}
                    {isActive && (
                      <motion.span
                        layoutId="active-nav-pill"
                        className="absolute inset-0 bg-honey-50 dark:bg-honey-900/25 rounded-lg"
                        style={{ zIndex: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {/* Glowing dot at center of active indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="active-nav-glow"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-honey-500"
                        style={{
                          zIndex: 10,
                          boxShadow: '0 0 6px 2px rgba(212, 160, 23, 0.5), 0 0 12px 4px rgba(212, 160, 23, 0.2)',
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors ${
                        isActive
                          ? 'text-honey-700 dark:text-honey-400 font-semibold'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {t.nav[item.key as keyof typeof t.nav]}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {/* Language toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLang}
                className="gap-1.5 text-xs font-medium"
                aria-label={
                  lang === 'sl' ? 'Switch to English' : 'Preklopi na slovenščino'
                }
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="uppercase">{lang === 'sl' ? 'EN' : 'SL'}</span>
              </Button>

              {/* CTA with pulse badge */}
              <div className="relative hidden sm:block">
                {/* "New" ping badge */}
                <span className="absolute -top-2 -right-2 z-20 flex h-4 w-4 items-center justify-center">
                  <span className="badge-ping absolute inline-flex h-full w-full rounded-full bg-honey-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 items-center justify-center rounded-full bg-honey-500">
                    <span className="text-[7px] font-bold text-white leading-none">N</span>
                  </span>
                </span>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white shadow-md hover:shadow-lg transition-all"
                  onClick={() => handleNavClick('#contact')}
                >
                  <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                  {t.nav.order}
                </Button>
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => mobileOpen ? closeMobileMenu() : setMobileOpen(true)}
                aria-label={mobileOpen ? 'Zapri meni' : 'Odpri meni'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Nav - slide-in from right with backdrop blur */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: mobileClosing ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: mobileClosing ? 0 : 1 }}
              transition={{ duration: mobileClosing ? 0.15 : 0.3 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-md"
              onClick={closeMobileMenu}
            />

            {/* Slide-in panel with smooth height transition */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: mobileClosing ? '100%' : 0, opacity: mobileClosing ? 0 : 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280, opacity: { duration: 0.2 } }}
              className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-background/95 backdrop-blur-xl shadow-2xl border-l border-honey-200/30 dark:border-honey-800/20"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-border/50">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {lang === 'sl' ? 'Meni' : 'Menu'}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9"
                  onClick={closeMobileMenu}
                  aria-label="Zapri meni"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Nav items with stagger close animation */}
              <div className="p-4 overflow-y-auto h-[calc(100%-8rem)]">
                <div className="flex flex-col gap-1">
                  {navItems.map((item, index) => {
                    const isActive = activeSection === item.key;
                    return (
                      <motion.a
                        key={item.key}
                        href={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                          opacity: mobileClosing ? 0 : 1,
                          x: mobileClosing ? 30 : 0,
                        }}
                        transition={{
                          delay: mobileClosing ? index * 0.03 : index * 0.05,
                          duration: mobileClosing ? 0.15 : 0.3,
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-honey-50 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        {t.nav[item.key as keyof typeof t.nav]}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-honey-500 rounded-r-full" />
                        )}
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
                <Button
                  className="w-full bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white shadow-lg h-12 text-sm font-semibold"
                  onClick={() => {
                    handleNavClick('#contact');
                  }}
                >
                  {t.nav.order}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
