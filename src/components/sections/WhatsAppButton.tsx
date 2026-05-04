'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { getTranslations } from '@/lib/i18n';
import { useLangStore } from '@/store/language';

const WHATSAPP_NUMBER = '38641234567';

function wasWaClicked(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('wa-clicked') === 'true';
}

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasClicked, setHasClicked] = useState(wasWaClicked);
  const [hasBounced, setHasBounced] = useState(false);
  const lang = useLangStore((s) => s.lang);
  const t = getTranslations(lang);

  useEffect(() => {
    // Show tooltip after 2.5 seconds
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 2500);

    // Bounce animation after 3 seconds
    const bounceTimer = setTimeout(() => {
      setHasBounced(true);
    }, 3000);

    // Auto-hide tooltip after 8 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(showTimer);
      clearTimeout(bounceTimer);
    };
  }, []);

  const handleClick = () => {
    localStorage.setItem('wa-clicked', 'true');
    setHasClicked(true);
    setShowTooltip(false);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-20 sm:left-6 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 mb-3 w-56"
          >
            {/* Speech bubble with triangle pointer */}
            <div className="relative bg-card border border-border rounded-xl shadow-xl p-3">
              <div className="absolute -bottom-2 left-6 w-4 h-4 bg-card border-b border-r border-border transform rotate-45" />
              <p className="text-[11px] text-muted-foreground leading-relaxed pr-2">
                {t.whatsapp.tooltip}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        onClick={handleClick}
        className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
        aria-label="WhatsApp"
      >
        <motion.div
          animate={
            hasBounced
              ? { y: [0, -8, 0] }
              : {}
          }
          transition={{ duration: 0.5, ease: 'easeOut' }}
          onAnimationComplete={() => setHasBounced(false)}
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.div>

        {/* Notification dot */}
        {!hasClicked && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 3, type: 'spring', stiffness: 400 }}
            className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-background"
          />
        )}
      </motion.button>
    </div>
  );
}
