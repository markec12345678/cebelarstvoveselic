'use client';

import { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Loader2, CheckCircle, Sparkles, Gift, BookOpen, Users, Shield, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';
import { toast } from 'sonner';

function AnimatedCounter({ target, isInView }: { target: number; isInView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isInView, target]);
  return <span>{count}</span>;
}

function ConfettiParticles() {
  const particles = useMemo(() => {
    const colors = ['#D4A017', '#F5D76E', '#E8B830', '#8B6914', '#5A8A3C', '#2D5016'];
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: `${10 + Math.random() * 80}%`,
      delay: `${Math.random() * 0.4}s`,
      size: 4 + Math.random() * 6,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-particle rounded-sm"
          style={{
            backgroundColor: p.color,
            left: p.left,
            bottom: '30%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: `${0.8 + Math.random() * 0.6}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Newsletter() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const isEmailValid = email.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isEmailInvalid = email.trim() !== '' && !isEmailValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error(lang === 'sl' ? 'Vnesite veljaven e-poštni naslov.' : 'Please enter a valid email address.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, lang }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.error || (lang === 'sl' ? 'Prišlo je do napake.' : 'An error occurred.'));
        return;
      }

      setSubscribed(true);
      toast.success(data.message || (lang === 'sl'
        ? 'Hvala za naročilo! Kmalu boste prejeli novice.'
        : 'Thank you for subscribing! You will receive news soon.'
      ));
    } catch {
      toast.error(lang === 'sl' ? 'Prišlo je do napake.' : 'An error occurred.');
    } finally {
      setSubmitting(false);
    }
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
    benefits: [
      {
        icon: Sparkles,
        title: lang === 'sl' ? 'Sezonske novice' : 'Seasonal Updates',
        desc: lang === 'sl' ? 'Novosti iz čebeljaka in narave' : 'Fresh news from the apiary and nature',
      },
      {
        icon: Gift,
        title: lang === 'sl' ? 'Ekskluzivne ponudbe' : 'Exclusive Offers',
        desc: lang === 'sl' ? 'Posebne cene za naročnike' : 'Special prices for subscribers',
      },
      {
        icon: BookOpen,
        title: lang === 'sl' ? 'Recepti z medom' : 'Honey Recipes',
        desc: lang === 'sl' ? 'Navdih za kulinarične eksperimente' : 'Inspiration for culinary experiments',
      },
      {
        icon: Users,
        title: lang === 'sl' ? 'Dogodki' : 'Events',
        desc: lang === 'sl' ? 'Obiski in delavnice za naročnike' : 'Visits and workshops for subscribers',
      },
    ],
    subscriberCount: lang === 'sl'
      ? 'Pridružite se 500+ ljubiteljem medu'
      : 'Join 500+ honey lovers',
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

                {/* Benefit cards */}
                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  {content.benefits.map((benefit, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="p-2.5 rounded-lg bg-honey-50/60 dark:bg-honey-900/10 border border-honey-100/60 dark:border-honey-800/20"
                    >
                      <benefit.icon className="w-3.5 h-3.5 text-honey-500 mb-1.5" />
                      <div className="text-xs font-semibold text-foreground">{benefit.title}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{benefit.desc}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Subscriber count with animated counter */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="mt-5 flex items-center gap-2"
                >
                  <div className="flex -space-x-1.5">
                    {['from-honey-300 to-honey-500', 'from-amber-400 to-orange-500', 'from-yellow-300 to-amber-500'].map((gradient, i) => (
                      <div
                        key={i}
                        className={`w-5 h-5 rounded-full bg-gradient-to-br ${gradient} ring-2 ring-card flex items-center justify-center`}
                      >
                        <span className="text-[7px] text-white font-bold">
                          {['J', 'M', 'N'][i]}
                        </span>
                      </div>
                    ))}
                    <div className="w-5 h-5 rounded-full bg-muted ring-2 ring-card flex items-center justify-center">
                      <span className="text-[7px] text-muted-foreground font-bold">+</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {lang === 'sl' ? 'Pridružite se ' : 'Join '}
                    <span className="font-bold text-honey-600 dark:text-honey-400">
                      <AnimatedCounter target={500} isInView={isInView} />+
                    </span>
                    {lang === 'sl' ? ' ljubiteljem medu' : ' honey lovers'}
                  </span>
                </motion.div>
              </div>

              {/* Right form */}
              <div>
                {subscribed ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 relative"
                  >
                    <ConfettiParticles />
                    <div className="relative w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full bg-green-200/30 ring-ripple" />
                      <CheckCircle className="relative w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-bold">{content.success}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {content.privacy}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <label htmlFor="newsletter-email" className="sr-only">
                        Email
                      </label>
                      {/* Envelope icon that animates on valid email */}
                      <motion.div
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10"
                        animate={isEmailValid ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] } : {}}
                        transition={{ duration: 0.4, type: 'spring' }}
                      >
                        <Mail className={`w-4 h-4 transition-colors duration-300 ${
                          isEmailValid ? 'text-green-500' : isEmailInvalid ? 'text-red-400' : 'text-muted-foreground'
                        }`} />
                      </motion.div>
                      <Input
                        id="newsletter-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={content.placeholder}
                        className="h-12 bg-background border-honey-200 dark:border-honey-800 focus:border-honey-500 focus:ring-honey-500/20 pl-10 pr-10"
                        required
                        aria-label="Email"
                      />
                      {/* Email validation indicator */}
                      {email.trim() !== '' && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {isEmailValid ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            >
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </motion.div>
                          ) : isEmailInvalid ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            >
                              <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                            </motion.div>
                          ) : null}
                        </div>
                      )}
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
                    {/* Privacy toggle link with popover */}
                    <div className="relative">
                      <button
                        type="button"
                        className="text-[11px] text-muted-foreground/70 hover:text-honey-600 dark:hover:text-honey-400 transition-colors flex items-center gap-1 mx-auto"
                        onClick={() => setShowPrivacy(!showPrivacy)}
                      >
                        <Shield className="w-3 h-3" />
                        {lang === 'sl' ? 'Zasebnost in odjava' : 'Privacy & unsubscribe'}
                        <motion.span
                          animate={{ rotate: showPrivacy ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-3 h-3" />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {showPrivacy && (
                          <motion.div
                            initial={{ opacity: 0, y: -5, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -5, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2 p-3 rounded-lg bg-muted/50 border border-border/50 text-[11px] text-muted-foreground leading-relaxed">
                              {lang === 'sl'
                                ? 'Z naročnim na newsletter se strinjate, da vam pošiljamo novice o izdelkih, akcijah in dogodkih. Vaš e-poštni naslov varno hranimo in ga nikoli ne delimo s tretjimi. Kadarkoli se lahko odjavite s klikom na povezavo v vsakem e-poštnem sporočilu. Več v naši politiki zasebnosti.'
                                : 'By subscribing to our newsletter, you agree to receive news about products, offers, and events. We store your email address securely and never share it with third parties. You can unsubscribe at any time via the link in every email. See our privacy policy for details.'}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
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
