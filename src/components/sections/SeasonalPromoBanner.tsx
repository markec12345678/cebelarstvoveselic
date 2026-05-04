'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Hourglass } from 'lucide-react';
import { getTranslations } from '@/lib/i18n';
import { useLangStore } from '@/store/language';

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

function getCurrentSeason(): Season {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
}

function getScrollTarget(season: Season): string {
  switch (season) {
    case 'spring':
      return '#products';
    case 'summer':
      return '#visit';
    case 'autumn':
      return '#products';
    case 'winter':
      return '#products';
    default:
      return '#products';
  }
}

const seasonEmojis: Record<Season, string> = {
  spring: '🌸',
  summer: '☀️',
  autumn: '🍂',
  winter: '🎄',
};

function isPromoDismissed(): boolean {
  if (typeof window === 'undefined') return false;
  const raw = localStorage.getItem('promo-dismissed');
  if (!raw) return false;
  const elapsed = Date.now() - parseInt(raw, 10);
  return elapsed < 24 * 60 * 60 * 1000;
}

export default function SeasonalPromoBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(isPromoDismissed);
  const lang = useLangStore((s) => s.lang);
  const t = getTranslations(lang);
  const season = getCurrentSeason();
  const promoText = t.promo[season];
  const scrollTarget = getScrollTarget(season);

  // Countdown timer to end of current month
  const countdown = useMemo(() => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const diff = endOfMonth.getTime() - now.getTime();
    const days = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    return days;
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleDismiss = () => {
    localStorage.setItem('promo-dismissed', Date.now().toString());
    setVisible(false);
    setTimeout(() => setDismissed(true), 400);
  };

  const handleScroll = () => {
    const target = document.querySelector(scrollTarget);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    handleDismiss();
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          className="relative w-full overflow-hidden z-40"
          role="banner"
        >
          {/* Honey gradient background */}
          <div className="relative bg-gradient-to-r from-honey-600 via-honey-500 to-honey-400 px-4 py-2.5 sm:py-3">
            {/* Honeycomb SVG pattern overlay */}
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="promo-honeycomb"
                  width="30"
                  height="52"
                  patternUnits="userSpaceOnUse"
                  patternTransform="scale(1.5)"
                >
                  <path
                    d="M15 1L27 8V24L15 31L3 24V8L15 1Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#promo-honeycomb)" />
            </svg>
            {/* Shimmer effect running across banner */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            >
              <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </motion.div>

            <div className="relative max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                {/* Honey jar icon */}
                <span className="text-lg sm:text-xl flex-shrink-0" role="img" aria-hidden="true">🍯</span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 flex-shrink-0" />
                <p className="text-sm sm:text-base font-medium text-white truncate">
                  <span className="mr-1.5">{seasonEmojis[season]}</span>
                  {promoText}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Countdown timer */}
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-white/80">
                  <Hourglass className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'sl'
                      ? `Še ${countdown} ${countdown === 1 ? 'dan' : countdown < 5 ? 'dni' : 'dni'} `
                      : `${countdown} ${countdown === 1 ? 'day' : 'days'} left `}
                  </span>
                </div>
                <button
                  onClick={handleScroll}
                  className="text-xs sm:text-sm font-semibold px-3 py-1 sm:px-4 sm:py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors backdrop-blur-sm border border-white/20"
                >
                  {t.promo.cta}
                </button>
                <button
                  onClick={handleDismiss}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label={t.promo.dismiss}
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
