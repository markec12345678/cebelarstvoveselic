'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { lang, toggleLang } = useLangStore();
  const { theme, setTheme } = useTheme();
  const t = getTranslations(lang);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.key);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-honey-300 to-honey-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
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
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight leading-none">
                  Čebelarstvo
                </span>
                <span className="text-xs text-honey-600 font-semibold tracking-wide leading-none mt-0.5">
                  VESELIČ
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md hover:text-honey-600 hover:bg-honey-50 dark:hover:bg-honey-900/20 ${
                    activeSection === item.key
                      ? 'text-honey-700 dark:text-honey-400'
                      : 'text-muted-foreground'
                  }`}
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                  {activeSection === item.key && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-honey-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </a>
              ))}
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

              {/* CTA */}
              <Button
                size="sm"
                className="hidden sm:flex bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white shadow-md hover:shadow-lg transition-all"
                onClick={() => handleNavClick('#contact')}
              >
                {t.nav.order}
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Zapri meni' : 'Odpri meni'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute top-16 right-0 w-72 h-[calc(100vh-4rem)] bg-background border-l border-border shadow-xl p-4 overflow-y-auto">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === item.key
                        ? 'bg-honey-50 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {t.nav[item.key as keyof typeof t.nav]}
                  </a>
                ))}
                <div className="mt-4 pt-4 border-t border-border">
                  <Button
                    className="w-full bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white"
                    onClick={() => {
                      handleNavClick('#contact');
                    }}
                  >
                    {t.nav.order}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
