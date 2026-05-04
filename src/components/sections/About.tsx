'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';

export default function About() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: t.about.stat1Value, label: t.about.stat1Label },
    { value: t.about.stat2Value, label: t.about.stat2Label },
    { value: t.about.stat3Value, label: t.about.stat3Label },
    { value: t.about.stat4Value, label: t.about.stat4Label },
  ];

  return (
    <section id="story" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-honey-50/50 via-background to-background" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-honey-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-forest/5 rounded-full blur-3xl" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-honey-500" />
            {t.about.sectionTag}
          </span>
        </motion.div>

        <div className="mt-12 lg:mt-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-honey-900/10">
              <img
                src="/images/about.jpg"
                alt="Jožef Veselič pri delu s panji — tradicionalno čebelarstvo v Beli krajini"
                className="w-full h-[400px] lg:h-[520px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-honey-400 to-honey-600 rounded-2xl -z-10 opacity-20" />
            <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-honey-300 rounded-2xl -z-10 opacity-30" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {t.about.title.split('—').map((part, i) =>
                i === 1 ? (
                  <span key={i} className="honey-text-gradient">
                    —{part}
                  </span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </h2>

            <div className="mt-8 space-y-5">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t.about.paragraph1}
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t.about.paragraph2}
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t.about.paragraph3}
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="text-center p-3 rounded-xl bg-honey-50/50 dark:bg-honey-900/10 border border-honey-100 dark:border-honey-800/30"
                >
                  <div className="text-2xl sm:text-3xl font-bold honey-text-gradient">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
