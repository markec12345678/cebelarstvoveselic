'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Heart, Zap, Leaf, Moon, Sparkles } from 'lucide-react';
import { useLangStore } from '@/store/language';

const benefitIcons = [Shield, Heart, Zap, Leaf, Moon, Sparkles];
const benefitEmojis = ['🍯', '🌿', '💪', '🫁', '😴', '🧴'];

const benefits = {
  sl: [
    {
      title: 'Okrepitev imunskega sistema',
      description:
        'Med vsebuje antioksidante, encime in antibakterijske snovi, ki okrepijo naravno imunost. Slovenski gozdni med je še posebej bogat s temi snovmi.',
    },
    {
      title: 'Olajšanje bolečega grla',
      description:
        'Lipov med se že stoletja tradicionalno uporablja v Sloveniji kot naravno sredstvo proti kašlju in bolečemu grlu.',
    },
    {
      title: 'Energija in zmogljivost',
      description:
        'Naravni sladkorji v medu (glukoza + fruktoza) zagotavljajo trajno energijo brez zdrsa, ki ga povzroča rafiniran sladkor. Primeren za športnike.',
    },
    {
      title: 'Zdrav prebavni sistem',
      description:
        'Med pomaga pri prebavi, blaži želodčne težave in lahko pomaga pri blagih prebavnih težavah. Žlička pred obrokom je tradicionalen domači recept.',
    },
    {
      title: 'Boljše spanje',
      description:
        'Toplo mleko z medom pred spanjem spodbuja sproščanje in boljšo kakovost spanja. Med pomaga pri regulaciji proizvodnje melatonina.',
    },
    {
      title: 'Koža in celjenje ran',
      description:
        'Med ima naravne antibakterijske in celjenjske lastnosti. V tradicionalni slovenski ljudski medicini se uporablja za opekline in težave s kožo.',
    },
  ],
  en: [
    {
      title: 'Immune System Boost',
      description:
        'Honey contains antioxidants, enzymes, and antibacterial properties that strengthen natural immunity. Slovenian forest honey is especially rich in these compounds.',
    },
    {
      title: 'Sore Throat Relief',
      description:
        'Linden honey has been traditionally used for centuries in Slovenia as a natural remedy for coughs and sore throats.',
    },
    {
      title: 'Energy & Performance',
      description:
        'Natural sugars in honey (glucose + fructose) provide sustained energy without the crash of refined sugar. Ideal for athletes.',
    },
    {
      title: 'Digestive Health',
      description:
        'Honey aids digestion, soothes stomach irritation, and can help with mild digestive issues. A teaspoon before meals is a traditional remedy.',
    },
    {
      title: 'Better Sleep',
      description:
        'A warm glass of milk with honey before bed promotes relaxation and better sleep quality. Honey helps regulate melatonin production.',
    },
    {
      title: 'Skin & Wound Healing',
      description:
        'Honey has natural antibacterial and wound-healing properties. Used in traditional Slovenian folk medicine for burns and skin conditions.',
    },
  ],
};

const benefitGradients = [
  'from-honey-50 to-honey-100 dark:from-honey-950/30 dark:to-honey-900/10',
  'from-forest/5 to-forest/10 dark:from-forest/10 dark:to-forest/5',
  'from-honey-50 to-amber-50 dark:from-honey-950/20 dark:to-amber-900/5',
  'from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-900/5',
  'from-indigo-50 to-violet-50 dark:from-indigo-950/20 dark:to-violet-900/5',
  'from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-900/5',
];

export default function HoneyBenefits() {
  const lang = useLangStore((s) => s.lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const items = benefits[lang];
  const t = (sl: string, en: string) => (lang === 'sl' ? sl : en);

  return (
    <section
      ref={ref}
      className="py-20 sm:py-28 relative overflow-hidden"
      id="benefits"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-honey-50/20 to-background dark:via-honey-950/5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-forest/10 dark:bg-forest/20 text-forest dark:text-forest-light rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-3 h-3" />
            {t('Zakaj med?', 'Why Honey?')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            {t('Šest razlogov za vsakdanji med', 'Six Reasons for Daily Honey')}
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg">
            {t(
              'Med ni samo sladilo — je naravno zdravilo z dolgo tradicijo. Odkrijte, kako vas lahko dnevni med podpira pri zdravju.',
              'Honey isn\'t just a sweetener — it\'s a natural remedy with a long tradition. Discover how daily honey can support your health.'
            )}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((benefit, index) => {
            const Icon = benefitIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative rounded-2xl border border-border bg-gradient-to-br ${benefitGradients[index]} p-6 sm:p-8 hover-lift card-border-glow transition-all duration-300`}
              >
                {/* Emoji + Icon */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl" role="img" aria-hidden="true">
                    {benefitEmojis[index]}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-card dark:bg-card border border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-honey-600 dark:text-honey-400" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {benefit.description}
                </p>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                  <span className="text-[6rem] leading-none block -mt-4 -mr-2">
                    {benefitEmojis[index]}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground mb-4">
            {t(
              'Izberite svoj med in začnite z vsakodnevnim uživanjem.',
              'Choose your honey and start enjoying it daily.'
            )}
          </p>
          <a
            href="#products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-honey-500 to-honey-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-honey-600 hover:to-honey-700 transition-all duration-300 cta-glow"
          >
            {t('Izberite med', 'Choose Your Honey')}
            <span className="text-lg">🍯</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
