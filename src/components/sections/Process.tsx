'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { MapPin, HeartPulse, Droplets, Package, Truck } from 'lucide-react';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';

const iconMap: Record<string, React.ElementType> = {
  'map-pin': MapPin,
  'heart-pulse': HeartPulse,
  'droplets': Droplets,
  'package': Package,
  'truck': Truck,
};

export default function Process() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const stepsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ['start end', 'end start'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="process" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden bg-gradient-to-b from-background via-honey-50/30 to-background">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-honey-300 to-transparent" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-honey-500" />
            {t.process.sectionTag}
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {t.process.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t.process.subtitle}
          </p>
        </motion.div>

        {/* Image with Ken Burns effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[450px] overflow-hidden">
            <img
              src="/images/process.jpg"
              alt="Tradicionalni slovenski panj s poslikanimi paneli v sončni travniški pokrajini Bele krajine"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Ken Burns animation overlay */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
              className="absolute inset-0"
              style={{
                backgroundImage: 'url(/images/process.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Steps */}
        <div ref={stepsRef} className="mt-14 relative">
          {/* Animated vertical line (background track) */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-border/50 hidden sm:block" />
          {/* Animated vertical line (foreground fill) */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 lg:left-1/2 top-0 w-px bg-gradient-to-b from-honey-400 via-honey-500 to-honey-400 origin-top hidden sm:block"
          />

          <div className="space-y-8 sm:space-y-12">
            {t.process.steps.map((step, i) => {
              const Icon = iconMap[step.icon] || MapPin;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-start gap-4 sm:gap-8 ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Icon circle with step number */}
                  <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 z-10 hidden sm:flex group cursor-default">
                    <motion.div
                      whileHover={{ scale: 1.15, boxShadow: '0 0 20px rgba(217, 160, 47, 0.4)' }}
                      className="relative w-12 h-12 rounded-full bg-gradient-to-br from-honey-400 to-honey-600 shadow-lg flex items-center justify-center text-white"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.div>
                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-forest-800 text-white text-[10px] font-bold flex items-center justify-center border-2 border-background shadow-sm">
                      {i + 1}
                    </div>
                  </div>

                  {/* Mobile icon with step number */}
                  <div className="sm:hidden flex-shrink-0 relative">
                    <motion.div
                      whileHover={{ scale: 1.1, boxShadow: '0 0 16px rgba(217, 160, 47, 0.3)' }}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-honey-400 to-honey-600 shadow-lg flex items-center justify-center text-white"
                    >
                      <Icon className="w-4 h-4" />
                    </motion.div>
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-forest-800 text-white text-[9px] font-bold flex items-center justify-center border-2 border-background shadow-sm">
                      {i + 1}
                    </div>
                  </div>

                  {/* Content with hover effect */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.25 }}
                    className={`flex-1 pl-10 sm:pl-0 rounded-xl p-4 -m-4 transition-colors duration-300 hover:bg-honey-50/50 dark:hover:bg-honey-950/20 ${
                      isEven
                        ? 'lg:pr-16 lg:text-right'
                        : 'lg:pl-16'
                    }`}
                  >
                    <div
                      className={`inline-block px-2.5 py-0.5 rounded-md bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 text-xs font-bold mb-2`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                    <details className="mt-3 group/details">
                      <summary className="text-xs sm:text-sm font-medium text-honey-600 dark:text-honey-400 cursor-pointer hover:text-honey-700 dark:hover:text-honey-300 transition-colors list-none flex items-center gap-1">
                        <span>
                          {lang === 'sl' ? 'Več podrobnosti' : 'More details'}
                        </span>
                        <svg
                          className="w-3 h-3 transition-transform group-open/details:rotate-90"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </summary>
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground/80 leading-relaxed pl-0 sm:pl-4 border-l-2 border-honey-200 dark:border-honey-800 sm:ml-2">
                        {step.detail}
                      </p>
                    </details>
                  </motion.div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
