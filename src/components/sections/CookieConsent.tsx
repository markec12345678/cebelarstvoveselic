'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, X, Shield, Lock, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';

export default function CookieConsent() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
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
      setShowSettings(false);
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
    handleDismiss();

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
    setTimeout(() => {
      localStorage.setItem(
        'cookie-consent',
        JSON.stringify({
          necessary: true,
          analytics: true,
          marketing: true,
          timestamp: new Date().toISOString(),
          version: '1.0',
        })
      );
      handleDismiss();
    }, 0);
  };

  const handleRejectAll = () => {
    setPreferences({ necessary: true, analytics: false, marketing: false });
    setTimeout(() => {
      localStorage.setItem(
        'cookie-consent',
        JSON.stringify({
          necessary: true,
          analytics: false,
          marketing: false,
          timestamp: new Date().toISOString(),
          version: '1.0',
        })
      );
      handleDismiss();
    }, 0);
  };

  const categories = [
    {
      key: 'necessary',
      label: t.cookie.necessary,
      desc: t.cookie.necessaryDesc,
      locked: true,
      expandedDesc: lang === 'sl'
        ? 'Ti piškotki so nujno potrebni za delovanje spletne strani. Brez njih stran ne more pravilno delovati. Ne shranjujejo osebnih podatkov in jih ni mogoče onemogočiti.'
        : 'These cookies are strictly necessary for the website to function. Without them, the site cannot operate properly. They do not store personal data and cannot be disabled.',
    },
    {
      key: 'analytics',
      label: t.cookie.analytics,
      desc: t.cookie.analyticsDesc,
      locked: false,
      expandedDesc: lang === 'sl'
        ? 'Analitični piškotki nam pomagajo razumeti, kako obiskovalci uporabljajo spletno stran. Zbirajo anonimne podatke, kot so število obiskovalcev, ogledane strani in viri prometa. Te podatke uporabljamo za izboljšanje uporabniške izkušnje.'
        : 'Analytics cookies help us understand how visitors interact with the website. They collect anonymous data such as visitor count, pages viewed, and traffic sources. We use this data to improve user experience.',
    },
    {
      key: 'marketing',
      label: t.cookie.marketing,
      desc: t.cookie.marketingDesc,
      locked: false,
      expandedDesc: lang === 'sl'
        ? 'Marketinški piškotki se uporabljajo za prikazovanje oglasov, ki so relevantni za vas. Te piškotke običajno nastavljajo naši oglaševalski partnerji in sledijo vašim obiskom po različnih spletnih straneh.'
        : 'Marketing cookies are used to display advertisements relevant to you. These cookies are typically set by our advertising partners and track your visits across different websites.',
    },
  ];

  if (!visible) return null;

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] w-[calc(100%-2rem)] sm:w-auto sm:max-w-[440px]"
        >
          <div className="bg-card/95 backdrop-blur-xl border border-border shadow-2xl shadow-black/10 dark:shadow-black/30 rounded-2xl overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-honey-400 via-honey-500 to-honey-600" />

            {!showSettings ? (
              <div className="p-5">
                {/* Header with floating cookie icon */}
                <div className="flex items-start gap-3 mb-3">
                  <motion.div
                    className="flex-shrink-0 w-9 h-9 rounded-xl bg-honey-100 dark:bg-honey-900/20 flex items-center justify-center"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Cookie className="w-4.5 h-4.5 text-honey-600 dark:text-honey-400" />
                  </motion.div>
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

                {/* Actions with enhanced buttons */}
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
                    className="text-xs h-8 border-honey-300 dark:border-honey-700 text-honey-700 dark:text-honey-400 hover:bg-honey-50 dark:hover:bg-honey-900/20 hover:border-honey-400"
                    onClick={handleRejectAll}
                  >
                    {t.cookie.reject}
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs h-8 honey-shine-btn bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white shadow-sm relative"
                    onClick={handleAcceptAll}
                  >
                    <span className="relative z-10">{t.cookie.accept}</span>
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

                {/* Category toggles with custom switch design */}
                <div className="space-y-2">
                  {categories.map((cat) => {
                    const isExpanded = expandedCategory === cat.key;
                    const isActive = preferences[cat.key as keyof typeof preferences];
                    return (
                      <div key={cat.key}>
                        <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-muted/50 dark:bg-muted/30 border border-border/30">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              {cat.locked && <Lock className="w-3 h-3 text-muted-foreground/50" />}
                              <span className="text-xs font-medium">{cat.label}</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{cat.desc}</p>
                            {/* Expand/collapse for detailed description */}
                            <button
                              type="button"
                              className="flex items-center gap-0.5 text-[10px] text-honey-600 dark:text-honey-400 hover:text-honey-700 dark:hover:text-honey-300 mt-1 transition-colors"
                              onClick={() => setExpandedCategory(isExpanded ? null : cat.key)}
                            >
                              {isExpanded
                                ? (lang === 'sl' ? 'Manj' : 'Less')
                                : (lang === 'sl' ? 'Več' : 'More')}
                              <motion.span
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="w-2.5 h-2.5" />
                              </motion.span>
                            </button>
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                                  className="overflow-hidden"
                                >
                                  <p className="text-[10px] text-muted-foreground/80 mt-1.5 leading-relaxed pr-1">
                                    {cat.expandedDesc}
                                  </p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          {/* Custom toggle switch */}
                          <div
                            className={`toggle-switch ${isActive ? 'active pulse-on' : ''} ${cat.locked ? 'disabled' : ''} mt-0.5`}
                            role="switch"
                            aria-checked={isActive}
                            aria-label={cat.label}
                            tabIndex={cat.locked ? -1 : 0}
                            onClick={() => {
                              if (cat.locked) return;
                              setPreferences({ ...preferences, [cat.key]: !isActive });
                            }}
                            onKeyDown={(e) => {
                              if (cat.locked) return;
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setPreferences({ ...preferences, [cat.key]: !isActive });
                              }
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Enhanced button row */}
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 border-honey-300 dark:border-honey-700 text-honey-700 dark:text-honey-400 hover:bg-honey-50 dark:hover:bg-honey-900/20"
                    onClick={handleRejectAll}
                  >
                    {t.cookie.reject}
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs h-8 bg-honey-50 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 hover:bg-honey-100 dark:hover:bg-honey-900/30 border border-honey-200 dark:border-honey-800"
                    onClick={handleSave}
                  >
                    <span className="relative z-10">{t.cookie.save}</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
