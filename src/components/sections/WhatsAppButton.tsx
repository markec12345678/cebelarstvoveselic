'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { getTranslations } from '@/lib/i18n';
import { useLangStore } from '@/store/language';

const WHATSAPP_NUMBER = '38641234567';

function wasWaClicked(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('wa-clicked') === 'true';
}

function TypingTooltip({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayedText}
      {showCursor && <span className="typing-cursor" />}
    </span>
  );
}

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const [hasClicked, setHasClicked] = useState(wasWaClicked);
  const [dotVisible, setDotVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFloatActive, setIsFloatActive] = useState(false);
  const lang = useLangStore((s) => s.lang);
  const t = getTranslations(lang);
  const floatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Show tooltip after 2.5 seconds
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 2500);

    // Auto-hide tooltip after 5 seconds (from show time)
    const hideTimer = setTimeout(() => {
      setTooltipDismissed(true);
      setTimeout(() => setShowTooltip(false), 500);
    }, 7500); // 2.5s delay + 5s display = 7.5s

    // Start continuous float animation after initial appear
    const floatStart = setTimeout(() => {
      setIsFloatActive(true);
      floatIntervalRef.current = setInterval(() => {
        setIsFloatActive(false);
        setTimeout(() => setIsFloatActive(true), 1500);
      }, 3000);
    }, 4000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(floatStart);
      if (floatIntervalRef.current) clearInterval(floatIntervalRef.current);
    };
  }, []);

  const handleClick = () => {
    localStorage.setItem('wa-clicked', 'true');
    setHasClicked(true);
    setShowTooltip(false);
    setDotVisible(false);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-20 sm:left-6 z-50">
      <AnimatePresence>
        {showTooltip && !tooltipDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-full left-0 mb-3 w-56"
          >
            {/* Speech bubble with triangle pointer */}
            <div className="relative bg-card border border-border rounded-xl shadow-xl p-3">
              <div className="absolute -bottom-2 left-6 w-4 h-4 bg-card border-b border-r border-border transform rotate-45" />
              <p className="text-[11px] text-muted-foreground leading-relaxed pr-2">
                <TypingTooltip text={t.whatsapp.tooltip} />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, y: 20, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.6, delay: 2, type: 'spring', stiffness: 200, damping: 15 }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-green-500 text-white
          shadow-lg shadow-green-500/25 transition-all flex items-center justify-center
          focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background
          ${isHovered ? 'bg-green-600 shadow-xl shadow-green-500/40' : ''}
        `}
        role="button"
        aria-label={lang === 'sl' ? 'Pišite nam na WhatsApp' : 'Chat with us on WhatsApp'}
      >
        <motion.div
          animate={
            isFloatActive
              ? { y: [0, -3, 0] }
              : { y: 0 }
          }
          transition={{ duration: 2, ease: 'easeInOut', repeat: isFloatActive ? Infinity : 0 }}
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.div>

        {/* Notification dot with pulse */}
        <AnimatePresence>
          {!hasClicked && dotVisible && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ delay: 3, type: 'spring', stiffness: 400, damping: 15 }}
              className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-background notification-pulse"
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
