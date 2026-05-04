'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Hexagon, MapPin, Sprout, Cpu, Globe } from 'lucide-react';
import { getTranslations } from '@/lib/i18n';
import { useLangStore } from '@/store/language';

const milestoneIcons = [Hexagon, MapPin, Sprout, Cpu, Globe];

const milestoneColors = [
  'from-honey-400 to-honey-600',
  'from-honey-500 to-bark-light',
  'from-forest to-forest-light',
  'from-honey-400 to-honey-600',
  'from-forest-light to-forest',
];

export default function Heritage() {
  const lang = useLangStore((s) => s.lang);
  const t = getTranslations(lang);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden"
      id="heritage"
    >
      {/* Background gradient from cream to background */}
      <div className="absolute inset-0 bg-gradient-to-b from-honey-50/50 via-background to-background dark:from-honey-900/10 dark:via-background dark:to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-honey-300/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 rounded-full text-sm font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-honey-500" />
            {t.heritage.sectionTag}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.heritage.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {t.heritage.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : { height: 0 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="w-full bg-gradient-to-b from-honey-400 via-forest to-honey-600"
            />
          </div>

          {/* Timeline entries */}
          <div className="space-y-10 sm:space-y-16">
            {t.heritage.milestones.map((milestone, index) => {
              const Icon = milestoneIcons[index];
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col ${
                    isLeft
                      ? 'md:flex-row md:items-start'
                      : 'md:flex-row-reverse md:items-start'
                  }`}
                >
                  {/* Animated dot on timeline */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: index * 0.2,
                    }}
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10"
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${milestoneColors[index]} flex items-center justify-center shadow-lg ring-4 ring-background`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  </motion.div>

                  {/* Content card — mobile: right of dot, desktop: alternating */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.15, ease: 'easeOut' }}
                    className={`ml-12 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                      isLeft ? 'md:pr-0 md:mr-auto' : 'md:pl-0 md:ml-auto'
                    }`}
                  >
                    <div className="glass-card rounded-2xl p-5 sm:p-6 hover-lift">
                      {/* Year badge */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${milestoneColors[index]} text-white text-sm sm:text-base font-bold mb-3 shadow-md`}>
                        <Hexagon className="w-3.5 h-3.5" />
                        {milestone.year}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                        {milestone.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {milestone.description}
                      </p>

                      {/* Decorative bottom accent */}
                      <div className="mt-4">
                        <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${
                          isLeft
                            ? `from-honey-300 to-transparent dark:from-honey-600`
                            : `from-transparent to-honey-300 dark:to-honey-600`
                        }`} />
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* End dot */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
            className="absolute left-4 md:left-1/2 -translate-x-1/2 bottom-0 z-10"
          >
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-honey-400 to-forest ring-4 ring-background shadow-md" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
