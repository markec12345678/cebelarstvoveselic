'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';

export default function CookieConsent() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        ...preferences,
        timestamp: new Date().toISOString(),
        version: '1.0',
      })
    );
    setVisible(false);
    setShowSettings(false);

    // Apply consent
    if (preferences.analytics) {
      // Initialize GA4
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: unknown[]) {
          (window as unknown as Record<string, unknown[]>).dataLayer.push(args);
        }
        gtag('consent', 'update', {
          analytics_storage: 'granted',
        });
      }
    }
    if (preferences.marketing) {
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        (window as unknown as Record<string, unknown[]>).dataLayer.push([
          'consent',
          'update',
          { ad_storage: 'granted' },
        ]);
      }
    }
  };

  const handleAcceptAll = () => {
    setPreferences({ necessary: true, analytics: true, marketing: true });
    handleSave();
  };

  const handleRejectAll = () => {
    setPreferences({ necessary: true, analytics: false, marketing: false });
    handleSave();
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
      >
        <div className="max-w-4xl mx-auto bg-background border border-border rounded-2xl shadow-2xl p-6 sm:p-8">
          {/* Simple banner */}
          {!showSettings ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-honey-100 dark:bg-honey-900/20 flex items-center justify-center">
                <Cookie className="w-5 h-5 text-honey-600 dark:text-honey-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold">{t.cookie.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t.cookie.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                  <Settings className="w-3.5 h-3.5 mr-1.5" />
                  {t.cookie.settings}
                </Button>
                <Button variant="outline" size="sm" onClick={handleRejectAll}>
                  {t.cookie.reject}
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white"
                  onClick={handleAcceptAll}
                >
                  {t.cookie.accept}
                </Button>
              </div>
            </div>
          ) : (
            /* Settings panel */
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold flex items-center gap-2">
                  <Settings className="w-4 h-4 text-honey-600" />
                  {t.cookie.settings}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setShowSettings(false)}
                  aria-label="Zapri"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {/* Necessary */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="mt-1 accent-honey-500"
                    aria-label={t.cookie.necessary}
                  />
                  <div>
                    <span className="text-sm font-medium">{t.cookie.necessary}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.cookie.necessaryDesc}</p>
                  </div>
                </div>

                {/* Analytics */}
                <label className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="mt-1 accent-honey-500"
                    aria-label={t.cookie.analytics}
                  />
                  <div>
                    <span className="text-sm font-medium">{t.cookie.analytics}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.cookie.analyticsDesc}</p>
                  </div>
                </label>

                {/* Marketing */}
                <label className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({ ...preferences, marketing: e.target.checked })
                    }
                    className="mt-1 accent-honey-500"
                    aria-label={t.cookie.marketing}
                  />
                  <div>
                    <span className="text-sm font-medium">{t.cookie.marketing}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.cookie.marketingDesc}</p>
                  </div>
                </label>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" size="sm" onClick={handleRejectAll}>
                  {t.cookie.reject}
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white"
                  onClick={handleSave}
                >
                  {t.cookie.save}
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
