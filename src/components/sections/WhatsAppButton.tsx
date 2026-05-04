'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-20 sm:left-6 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 mb-2 w-56 bg-card border border-border rounded-xl shadow-xl p-3"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold">Message us</span>
              <button
                onClick={() => setShowTooltip(false)}
                className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Imate vprašanje o medu ali obisku čebeljaka? Pišite nam na WhatsApp — odgovorimo v roku 1 ure.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        onClick={() => setShowTooltip(!showTooltip)}
        className="w-11 h-11 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 transition-all flex items-center justify-center"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
