'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trees, Recycle, Sun, Droplets, ShieldCheck, GraduationCap, Leaf } from 'lucide-react';
import { getTranslations } from '@/lib/i18n';
import { useLangStore } from '@/store/language';

const itemIcons = [Trees, Recycle, Sun, Droplets, ShieldCheck, GraduationCap];

const itemGradients = [
  'from-forest to-forest-light',
  'from-emerald-500 to-teal-600',
  'from-honey-400 to-honey-600',
  'from-sky-400 to-cyan-600',
  'from-honey-500 to-bark-light',
  'from-amber-500 to-orange-600',
];

const itemIconBgs = [
  'bg-forest/10 text-forest dark:bg-forest/20 dark:text-forest-light',
  'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
  'bg-honey-100 text-honey-700 dark:bg-honey-900/40 dark:text-honey-300',
  'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  'bg-honey-100 text-honey-700 dark:bg-honey-900/40 dark:text-honey-300',
  'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
];

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''), 10);
  const hasPlus = target.includes('+');
  const hasPercent = target.includes('%');

  useEffect(() => {
    if (!isInView || numericTarget === 0) return;
    const duration = 2000;
    const steps = 60;
    const increment = numericTarget / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        current = numericTarget;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, numericTarget]);

  if (numericTarget === 0) {
    return <span ref={ref}>{target}{suffix}</span>;
  }

  return (
    <span ref={ref}>
      {count}
      {hasPlus ? '+' : ''}
      {hasPercent ? '%' : ''}
      {suffix}
    </span>
  );
}

export default function Sustainability() {
  const lang = useLangStore((s) => s.lang);
  const t = getTranslations(lang);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: '-50px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-background overflow-hidden"
      id="sustainability"
    >
      {/* Background: hex pattern + gradient overlay */}
      <div className="absolute inset-0 hex-pattern opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-forest/5 via-transparent to-honey-50/30 dark:from-forest/10 dark:to-honey-900/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          {/* Decorative leaf icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-forest/20 to-honey-200/30 dark:from-forest/30 dark:to-honey-900/20 mb-6"
          >
            <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-forest dark:text-forest-light" />
          </motion.div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-forest/10 dark:bg-forest/20 text-forest dark:text-forest-light rounded-full text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-forest" />
            {t.sustainability.sectionTag}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.sustainability.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {t.sustainability.subtitle}
          </p>
        </div>

        {/* Alternating items */}
        <div className="space-y-8 sm:space-y-12 mb-16 sm:mb-20">
          {t.sustainability.items.map((item, index) => {
            const Icon = itemIcons[index];
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
                className={`flex flex-col ${
                  isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
                } items-center gap-6 sm:gap-10`}
              >
                {/* Icon / visual side */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ type: 'spring', stiffness: 200, damping: 20, delay: index * 0.12 + 0.1 }}
                  className={`flex-shrink-0 w-full md:w-2/5 ${isReversed ? 'md:text-right' : 'md:text-left'} text-center`}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${itemIconBgs[index]} transition-transform duration-300 hover:scale-110`}>
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>
                  {/* Decorative gradient bar */}
                  <div className="mt-4 mx-auto md:mx-0">
                    <div className={`h-1 w-16 sm:w-24 rounded-full bg-gradient-to-r ${
                      isReversed ? 'from-transparent to-forest/40 dark:to-forest-light/40' : 'from-forest/40 dark:from-forest-light/40 to-transparent'
                    }`} />
                  </div>
                </motion.div>

                {/* Text side */}
                <div className={`flex-1 ${isReversed ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Impact stats row */}
        <div ref={statsRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              {t.sustainability.impactTitle}
            </h3>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {t.sustainability.impactStats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={isStatsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card rounded-2xl p-5 sm:p-6 text-center hover-lift"
              >
                <div className="text-3xl sm:text-4xl font-bold text-gradient-forest mb-2">
                  <AnimatedCounter target={stat.value} />
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium leading-snug">
                  {stat.label}
                </div>
                {/* Decorative bottom accent */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={isStatsInView ? { width: '100%' } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                  className={`h-0.5 mt-3 rounded-full bg-gradient-to-r ${
                    itemGradients[i % itemGradients.length]
                  }`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
