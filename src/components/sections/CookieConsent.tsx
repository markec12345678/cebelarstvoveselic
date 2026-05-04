'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';

export default function CookieConsent() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    setTimeout(() => {
      setVisible(false);
      setDismissed(false);
    }, 400);
  };

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

    if (preferences.analytics && typeof window !== 'undefined') {
      const gwin = window as unknown as Record<string, unknown[]>;
      gwin.dataLayer = gwin.dataLayer || [];
      gwin.dataLayer.push(['consent', 'update', { analytics_storage: 'granted' }]);
    }
    if (preferences.marketing && typeof window !== 'undefined') {
      const gwin = window as unknown as Record<string, unknown[]>;
      gwin.dataLayer = gwin.dataLayer || [];
      gwin.dataLayer.push(['consent', 'update', { ad_storage: 'granted' }]);
    }
  };

  const handleAcceptAll = () => {
    setPreferences({ necessary: true, analytics: true, marketing: true });
    setTimeout(() => handleSave(), 0);
  };

  const handleRejectAll = () => {
    setPreferences({ necessary: true, analytics: false, marketing: false });
    setTimeout(() => handleSave(), 0);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] w-[calc(100%-2rem)] sm:w-auto sm:max-w-[440px]"
        >
          <div className="bg-card/95 backdrop-blur-xl border border-border shadow-2xl shadow-black/10 rounded-2xl overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-honey-400 via-honey-500 to-honey-600" />

            {!showSettings ? (
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-honey-100 dark:bg-honey-900/20 flex items-center justify-center">
                    <Cookie className="w-4.5 h-4.5 text-honey-600 dark:text-honey-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold">{t.cookie.title}</h3>
                      <Shield className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {t.cookie.description}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-8 px-2.5"
                    onClick={() => setShowSettings(true)}
                  >
                    <Settings className="w-3 h-3 mr-1" />
                    {t.cookie.settings}
                  </Button>
                  <div className="flex-1" />
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8"
                    onClick={handleRejectAll}
                  >
                    {t.cookie.reject}
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs h-8 bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white shadow-sm"
                    onClick={handleAcceptAll}
                  >
                    {t.cookie.accept}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold flex items-center gap-2">
                    <Settings className="w-3.5 h-3.5 text-honey-600" />
                    {t.cookie.settings}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-7 h-7"
                    onClick={() => setShowSettings(false)}
                    aria-label="Zapri"
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-muted/50">
                    <input type="checkbox" checked disabled className="mt-0.5 accent-honey-500 w-3.5 h-3.5" />
                    <div>
                      <span className="text-xs font-medium">{t.cookie.necessary}</span>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{t.cookie.necessaryDesc}</p>
                    </div>
                  </div>
                  <label className="flex items-start gap-2.5 p-2.5 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
                    <input type="checkbox" checked={preferences.analytics} onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })} className="mt-0.5 accent-honey-500 w-3.5 h-3.5" />
                    <div>
                      <span className="text-xs font-medium">{t.cookie.analytics}</span>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{t.cookie.analyticsDesc}</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-2.5 p-2.5 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
                    <input type="checkbox" checked={preferences.marketing} onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })} className="mt-0.5 accent-honey-500 w-3.5 h-3.5" />
                    <div>
                      <span className="text-xs font-medium">{t.cookie.marketing}</span>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{t.cookie.marketingDesc}</p>
                    </div>
                  </label>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm" className="text-xs h-8" onClick={handleRejectAll}>{t.cookie.reject}</Button>
                  <Button size="sm" className="text-xs h-8 bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white" onClick={handleSave}>{t.cookie.save}</Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
