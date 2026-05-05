'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Flame, ShieldCheck, MapPin, Check } from 'lucide-react';
import { getTranslations } from '@/lib/i18n';
import { useLangStore } from '@/store/language';

const pillarIcons = [Flame, ShieldCheck, MapPin];
const pillarColors = [
  'from-honey-400 to-honey-600',
  'from-forest-light to-forest',
  'from-honey-500 to-bark-light',
];

const pillarIconBgs = [
  'bg-honey-100 text-honey-700 dark:bg-honey-900/40 dark:text-honey-300',
  'bg-forest/10 text-forest dark:bg-forest/20 dark:text-forest-light',
  'bg-bark-light/10 text-bark-light dark:bg-bark-light/20 dark:text-bark-light',
];

const pillarGlows = [
  'hover:shadow-honey-500/15',
  'hover:shadow-forest/15',
  'hover:shadow-bark-light/15',
];

export default function HoneyQuality() {
  const lang = useLangStore((s) => s.lang);
  const t = getTranslations(lang);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-background overflow-hidden"
      id="quality"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 hex-pattern opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-honey-100 text-honey-700 dark:bg-honey-900/40 dark:text-honey-300 rounded-full text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-honey-500" />
            {t.quality.sectionTag}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.quality.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {t.quality.subtitle}
          </p>
        </div>

        {/* Quality pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {t.quality.pillars.map((pillar, index) => {
            const Icon = pillarIcons[index];
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`group relative flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl border border-border bg-card hover:shadow-xl ${pillarGlows[index]} transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Top gradient accent */}
                <div
                  className={`absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-b-full bg-gradient-to-r ${pillarColors[index]}`}
                />

                {/* Animated icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.15 + 0.2,
                  }}
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-5 ${pillarIconBgs[index]}`}
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5">
                  {pillar.description}
                </p>

                {/* Visual indicator: checkmark list */}
                <ul className="w-full space-y-2.5 mt-auto">
                  {pillar.details.map((detail, di) => (
                    <motion.li
                      key={di}
                      initial={{ opacity: 0, x: isReversed ? 10 : -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.15 + 0.4 + di * 0.1 }}
                      className="flex items-center gap-2.5 text-sm text-foreground/80"
                    >
                      <span
                        className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${pillarColors[index]} flex items-center justify-center`}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </span>
                      {detail}
                    </motion.li>
                  ))}
                </ul>

                {/* Decorative progress bar at bottom */}
                <div className="w-full mt-6 h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '100%' } : {}}
                    transition={{ duration: 1.2, delay: index * 0.15 + 0.6, ease: 'easeOut' }}
                    className={`h-full rounded-full bg-gradient-to-r ${pillarColors[index]}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
