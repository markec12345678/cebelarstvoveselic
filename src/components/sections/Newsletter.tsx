'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';
import { toast } from 'sonner';

export default function Newsletter() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error(lang === 'sl' ? 'Vnesite veljaven e-poštni naslov.' : 'Please enter a valid email address.');
      return;
    }
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSubscribed(true);
    setSubmitting(false);
    toast.success(
      lang === 'sl'
        ? 'Hvala za naročilo! Kmalu boste prejeli novice.'
        : 'Thank you for subscribing! You will receive news soon.'
    );
  };

  const content = {
    title: lang === 'sl' ? 'Bodite na tekočem z novostmi iz čebeljaka' : 'Stay Updated with Apiary News',
    subtitle: lang === 'sl'
      ? 'Pridobivajte sezonske novice, recepte in ekskluzivne ponudbe medu — največ 2 e-pošti na mesec.'
      : 'Get seasonal news, recipes, and exclusive honey offers — max 2 emails per month.',
    placeholder: lang === 'sl' ? 'vaša@e-pošta.si' : 'your@email.com',
    cta: lang === 'sl' ? 'Naročite se' : 'Subscribe',
    ctaSubmitting: lang === 'sl' ? 'Naročujem ...' : 'Subscribing ...',
    success: lang === 'sl' ? 'Naročeni ste!' : 'Subscribed!',
    privacy: lang === 'sl'
      ? 'Z naročnim se strinjate z našo politiko zasebnosti. Kadarkoli se lahko odjavite.'
      : 'By subscribing you agree to our privacy policy. Unsubscribe anytime.',
    benefit1: lang === 'sl' ? '🍯 Sezonske novice' : '🍯 Seasonal updates',
    benefit2: lang === 'sl' ? '🎁 Ekskluzivne ponudbe' : '🎁 Exclusive offers',
    benefit3: lang === 'sl' ? '📋 Recepti z medom' : '📋 Honey recipes',
  };

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-honey-50 via-amber-50 to-orange-50 dark:from-honey-950/30 dark:via-honey-900/10 dark:to-amber-950/20" />
      <div className="absolute inset-0 hex-pattern opacity-10" />

      {/* Decorative elements */}
      <div className="absolute top-4 left-8 w-20 h-20 bg-honey-200/30 rounded-full blur-2xl" />
      <div className="absolute bottom-4 right-8 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl" />

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden"
        >
          <div className="bg-card/80 backdrop-blur-sm border border-honey-200/50 dark:border-honey-800/30 shadow-xl shadow-honey-600/5 rounded-2xl p-8 sm:p-12">
            <div className="grid sm:grid-cols-2 gap-8 items-center">
              {/* Left content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 text-xs font-medium mb-4">
                  <Mail className="w-3 h-3" />
                  Newsletter
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                  {content.title}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {content.subtitle}
                </p>

                <div className="mt-6 space-y-2">
                  <span className="text-sm text-muted-foreground">{content.benefit1}</span>
                  <span className="text-sm text-muted-foreground">{content.benefit2}</span>
                  <span className="text-sm text-muted-foreground">{content.benefit3}</span>
                </div>
              </div>

              {/* Right form */}
              <div>
                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-bold">{content.success}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {content.privacy}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="newsletter-email" className="sr-only">
                        Email
                      </label>
                      <Input
                        id="newsletter-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={content.placeholder}
                        className="h-12 bg-background border-honey-200 dark:border-honey-800 focus:border-honey-500 focus:ring-honey-500/20"
                        required
                        aria-label="Email"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-12 bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white shadow-md hover:shadow-lg transition-all text-sm font-semibold"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {content.ctaSubmitting}
                        </>
                      ) : (
                        <>
                          {content.cta}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                    <p className="text-[11px] text-muted-foreground/70 text-center">
                      {content.privacy}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
