'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Heart, Zap, Leaf, Moon, Sparkles, ChevronDown, ArrowRight, Info } from 'lucide-react';
import { useLangStore } from '@/store/language';

const benefitIcons = [Shield, Heart, Zap, Leaf, Moon, Sparkles];
const benefitEmojis = ['🍯', '🌿', '💪', '🫁', '😴', '🧴'];

const benefits = {
  sl: [
    {
      title: 'Okrepitev imunskega sistema',
      description:
        'Med vsebuje antioksidante, encime in antibakterijske snovi, ki okrepijo naravno imunost. Slovenski gozdni med je še posebej bogat s temi snovmi.',
      funFact: 'Med vsebuje več kot 180 naravnih snovi, vključno s flavonoidi in fenolnimi kislinami.',
    },
    {
      title: 'Olajšanje bolečega grla',
      description:
        'Lipov med se že stoletja tradicionalno uporablja v Sloveniji kot naravno sredstvo proti kašlju in bolečemu grlu.',
      funFact: 'Svetovna zdravstvena organizacija priporoča med kot naravno zdravilo za kašelj pri otrocih.',
    },
    {
      title: 'Energija in zmogljivost',
      description:
        'Naravni sladkorji v medu (glukoza + fruktoza) zagotavljajo trajno energijo brez zdrsa, ki ga povzroča rafiniran sladkor. Primeren za športnike.',
      funFact: 'Številni profesionalni športniki porabijo med kot naravni vir hitre energije.',
    },
    {
      title: 'Zdrav prebavni sistem',
      description:
        'Med pomaga pri prebavi, blaži želodčne težave in lahko pomaga pri blagih prebavnih težavah. Žlička pred obrokom je tradicionalen domači recept.',
      funFact: 'Med vsebuje oligosaharide, ki delujejo kot prebiotiki in podpirajo zdravo črevesno floro.',
    },
    {
      title: 'Boljše spanje',
      description:
        'Toplo mleko z medom pred spanjem spodbuja sproščanje in boljšo kakovost spanja. Med pomaga pri regulaciji proizvodnje melatonina.',
      funFact: 'Študija je pokazala, da med izboljša kakovost spanja za do 20% pri odraslih z nespavnostjo.',
    },
    {
      title: 'Koža in celjenje ran',
      description:
        'Med ima naravne antibakterijske in celjenjske lastnosti. V tradicionalni slovenski ljudski medicini se uporablja za opekline in težave s kožo.',
      funFact: 'Manuka med iz Nove Zelandije se uporablja v bolnišnicah za zdravljenje hudih ran in opeklin.',
    },
  ],
  en: [
    {
      title: 'Immune System Boost',
      description:
        'Honey contains antioxidants, enzymes, and antibacterial properties that strengthen natural immunity. Slovenian forest honey is especially rich in these compounds.',
      funFact: 'Honey contains over 180 natural substances, including flavonoids and phenolic acids.',
    },
    {
      title: 'Sore Throat Relief',
      description:
        'Linden honey has been traditionally used for centuries in Slovenia as a natural remedy for coughs and sore throats.',
      funFact: 'The WHO recommends honey as a natural cough remedy for children.',
    },
    {
      title: 'Energy & Performance',
      description:
        'Natural sugars in honey (glucose + fructose) provide sustained energy without the crash of refined sugar. Ideal for athletes.',
      funFact: 'Many professional athletes use honey as a natural source of quick energy.',
    },
    {
      title: 'Digestive Health',
      description:
        'Honey aids digestion, soothes stomach irritation, and can help with mild digestive issues. A teaspoon before meals is a traditional remedy.',
      funFact: 'Honey contains oligosaccharides that act as prebiotics, supporting healthy gut flora.',
    },
    {
      title: 'Better Sleep',
      description:
        'A warm glass of milk with honey before bed promotes relaxation and better sleep quality. Honey helps regulate melatonin production.',
      funFact: 'A study showed honey improves sleep quality by up to 20% in adults with insomnia.',
    },
    {
      title: 'Skin & Wound Healing',
      description:
        'Honey has natural antibacterial and wound-healing properties. Used in traditional Slovenian folk medicine for burns and skin conditions.',
      funFact: 'Manuka honey from New Zealand is used in hospitals to treat severe wounds and burns.',
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

const benefitGradientsHover = [
  'from-honey-100 to-honey-200 dark:from-honey-950/40 dark:to-honey-900/20',
  'from-forest/10 to-forest/20 dark:from-forest/20 dark:to-forest/10',
  'from-honey-100 to-amber-100 dark:from-honey-950/30 dark:to-amber-900/10',
  'from-green-100 to-emerald-100 dark:from-green-950/30 dark:to-emerald-900/10',
  'from-indigo-100 to-violet-100 dark:from-indigo-950/30 dark:to-violet-900/10',
  'from-rose-100 to-pink-100 dark:from-rose-950/30 dark:to-pink-900/10',
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
          className="text-center mb-6 sm:mb-10"
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

        {/* Decorative honey drip SVG between header and cards */}
        <div className="honey-drip-decoration-between" />

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((benefit, index) => {
            const Icon = benefitIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 20,
                  delay: index * 0.1,
                }}
                className={`group relative rounded-2xl border border-border bg-gradient-to-br ${benefitGradients[index]} p-6 sm:p-8 hover-lift card-border-glow transition-all duration-500 hover:shadow-lg hover:bg-gradient-to-br ${benefitGradientsHover[index]} golden-border-trace`}
              >
                {/* Benefit number indicator */}
                <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-gradient-to-br from-honey-400 to-honey-600 flex items-center justify-center text-white text-xs font-bold shadow-md z-10">
                  {index + 1}
                </div>

                {/* Emoji + Icon with glow pulse animation */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl emoji-float" role="img" aria-hidden="true" style={{ animationDelay: `${index * 0.5}s` }}>
                    {benefitEmojis[index]}
                  </span>
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-card dark:bg-card border border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300 benefit-glow"
                    animate={
                      isInView
                        ? {
                            y: [0, -5, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'loop',
                      delay: index * 0.3,
                      ease: 'easeInOut',
                    }}
                  >
                    <Icon className="w-6 h-6 text-honey-600 dark:text-honey-400" />
                  </motion.div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>

                {/* Description with hover expand */}
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed benefit-expand">
                  {benefit.description}
                </p>

                {/* "Did you know?" callout */}
                <div className="mt-4">
                  <div className="did-you-know-callout" title={benefit.funFact}>
                    <Info className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{t('Ali ste vedeli?', 'Did you know?')}</span>
                    <span className="hidden sm:inline opacity-70">— {benefit.funFact.slice(0, 60)}...</span>
                  </div>
                </div>

                {/* Source citation */}
                <p className="text-[10px] text-muted-foreground/60 mt-3 italic">
                  {t('Vir: EFSA, 2023', 'Source: EFSA, 2023')}
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

        {/* Bottom CTA with honey drip decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-sm text-muted-foreground mb-6">
            {t(
              'Izberite svoj med in začnite z vsakodnevnim uživanjem.',
              'Choose your honey and start enjoying it daily.'
            )}
          </p>
          <div className="honey-drip-decoration inline-block">
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-honey-500 to-honey-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-honey-600 hover:to-honey-700 transition-all duration-300 cta-glow honey-shine-btn"
            >
              <span className="bg-gradient-to-r from-white to-honey-100 bg-clip-text text-transparent">
                {t('Izberite med', 'Choose Your Honey')}
              </span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
