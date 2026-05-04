'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TreePine, UtensilsCrossed, Users, ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';

export default function Visit() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: TreePine,
      title: t.visit.feature1Title,
      desc: t.visit.feature1Desc,
    },
    {
      icon: UtensilsCrossed,
      title: t.visit.feature2Title,
      desc: t.visit.feature2Desc,
    },
    {
      icon: Users,
      title: t.visit.feature3Title,
      desc: t.visit.feature3Desc,
    },
  ];

  return (
    <section id="visit" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-forest/5 via-background to-honey-50/30" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-forest/10">
              <img
                src="/images/visit.jpg"
                alt="Čebelarska domačija Veselič v Čurelah — tradicionalna slovenska kmetija z obiskovalci"
                className="w-full h-[400px] lg:h-[520px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent" />
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-forest to-forest-light rounded-2xl -z-10 opacity-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey-100 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-honey-500" />
              {t.visit.sectionTag}
            </span>

            <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {t.visit.title}
            </h2>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              {t.visit.subtitle}
            </p>

            {/* Features */}
            <div className="mt-8 space-y-5">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                  className="flex gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-honey-200 dark:hover:border-honey-800 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-honey-100 dark:bg-honey-900/20 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-honey-600 dark:text-honey-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-honey-500 to-honey-600 hover:from-honey-600 hover:to-honey-700 text-white shadow-lg"
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                {t.visit.cta}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="tel:+38641234567">
                  <Phone className="w-4 h-4 mr-2" />
                  {t.visit.ctaSecondary}
                </a>
              </Button>
            </div>

            {/* Note */}
            <p className="mt-4 text-xs text-muted-foreground flex items-start gap-1.5">
              <span className="text-honey-500 mt-0.5">ℹ</span>
              {t.visit.note}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
