'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLangStore } from '@/store/language';

const facts = [
  {
    emoji: '🐝',
    titleSl: '1/12 čajne žličke',
    titleEn: '1/12 Teaspoon',
    factSl: 'Ena čebela proizvede v svojem celotnem življenju le 1/12 čajne žličke medu. Za en kozarec medu je potrebnih celotno življenje približno 576 čebel.',
    factEn: "A single bee produces only 1/12 teaspoon of honey in its entire lifetime. It takes the life's work of about 576 bees to fill one jar of honey.",
    gradient: 'from-amber-400 to-orange-500',
    bgLight: 'bg-gradient-to-br from-amber-50 to-orange-50',
    bgDark: 'dark:from-amber-950/30 dark:to-orange-950/30',
  },
  {
    emoji: '🌸',
    titleSl: '2 milijona cvetov',
    titleEn: '2 Million Flowers',
    factSl: 'Čebele obiščejo približno 2 milijona cvetov, da naredijo le en kozarec medu (450 g). Vsak let predstavlja približno 40.000 cvetov.',
    factEn: 'Bees visit approximately 2 million flowers to make just one jar of honey (450 g). Each flight represents roughly 40,000 flower visits.',
    gradient: 'from-pink-400 to-rose-500',
    bgLight: 'bg-gradient-to-br from-pink-50 to-rose-50',
    bgDark: 'dark:from-pink-950/30 dark:to-rose-950/30',
  },
  {
    emoji: '👑',
    titleSl: '5 let kraljice',
    titleEn: '5-Year Queen',
    factSl: 'Matična čebela lahko živi do 5 let, medtem ko delavne čebele živijo le 6 tednov poleti. Matična čebela v enem dnevu izleže do 2000 jajčec.',
    factEn: 'The queen bee can live up to 5 years, while worker bees only live about 6 weeks in summer. A queen can lay up to 2,000 eggs per day.',
    gradient: 'from-yellow-400 to-amber-500',
    bgLight: 'bg-gradient-to-br from-yellow-50 to-amber-50',
    bgDark: 'dark:from-yellow-950/30 dark:to-amber-950/30',
  },
  {
    emoji: '🏃',
    titleSl: '24 km/h hitrost',
    titleEn: '24 km/h Speed',
    factSl: 'Čebele letijo s hitrostjo 24 km/h in obiščejo 50 do 100 cvetov na vsakem letu. Njena krila breskijo 200-krat na sekundo.',
    factEn: 'Bees fly at 24 km/h and visit 50-100 flowers per trip. Their wings beat approximately 200 times per second.',
    gradient: 'from-sky-400 to-blue-500',
    bgLight: 'bg-gradient-to-br from-sky-50 to-blue-50',
    bgDark: 'dark:from-sky-950/30 dark:to-blue-950/30',
  },
  {
    emoji: '🕯️',
    titleSl: 'Ples pletenja',
    titleEn: 'Waggle Dance',
    factSl: 'Čebele komunicirajo s tako imenovanim „plesom pletenja" (waggle dance). S tem plesom pokažejo smer, razdaljo in količino nektarja do cvetja.',
    factEn: 'Bees communicate through the famous „waggle dance." This dance conveys the direction, distance, and quality of nectar sources to other bees.',
    gradient: 'from-violet-400 to-purple-500',
    bgLight: 'bg-gradient-to-br from-violet-50 to-purple-50',
    bgDark: 'dark:from-violet-950/30 dark:to-purple-950/30',
  },
  {
    emoji: '🍯',
    titleSl: 'Med nikoli ne pokvari',
    titleEn: 'Honey Never Spoils',
    factSl: 'Med se nikoli ne pokvari! Arheologi so v egiptovskih grobnicah našli 3000 let star med, ki je bil še vedno ustrezen za uživanje. Njegova nizka vlažnost in kislinskost ustavljata bakterije.',
    factEn: 'Honey never spoils! Archaeologists found 3,000-year-old honey in Egyptian tombs that was still perfectly edible. Its low moisture and acidity prevent bacterial growth.',
    gradient: 'from-emerald-400 to-green-500',
    bgLight: 'bg-gradient-to-br from-emerald-50 to-green-50',
    bgDark: 'dark:from-emerald-950/30 dark:to-green-950/30',
  },
  {
    emoji: '🌍',
    titleSl: '1/3 hrane',
    titleEn: '1/3 of Our Food',
    factSl: 'Tretjina vse hrane, ki jo jejemo, je neposredno odvisna od čebeljega opraševanja. Brez čebel bi izgubili jablane, breskve, kave in številne druge pridelke.',
    factEn: 'One-third of all the food we eat depends on bee pollination. Without bees, we would lose apples, peaches, coffee, and many other crops.',
    gradient: 'from-teal-400 to-cyan-500',
    bgLight: 'bg-gradient-to-br from-teal-50 to-cyan-50',
    bgDark: 'dark:from-teal-950/30 dark:to-cyan-950/30',
  },
  {
    emoji: '🇸🇮',
    titleSl: 'Slovenska kranjska čebela',
    titleEn: 'Slovenian Carniolan Bee',
    factSl: 'Apis mellifera carnica (slovenska kranjska čebela) je ena najbolj priljubljenih pasem čebel na svetu. Slovenija je edina država v EU s predpisano avtohtono pasmo čebel.',
    factEn: 'Apis mellifera carnica (the Carniolan honey bee) is one of the most popular bee breeds worldwide. Slovenia is the only EU country with a legally protected native bee breed.',
    gradient: 'from-red-400 to-rose-500',
    bgLight: 'bg-gradient-to-br from-red-50 to-rose-50',
    bgDark: 'dark:from-red-950/30 dark:to-rose-950/30',
  },
];

interface FlipCardProps {
  fact: (typeof facts)[0];
  index: number;
  title: string;
  factText: string;
  clickLabel: string;
}

function FlipCard({ fact, index, title, factText, clickLabel }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: 'easeOut',
      }}
      className="group perspective-[1000px]"
    >
      <div
        className={`relative w-full h-56 sm:h-64 cursor-pointer transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={isFlipped ? clickLabel : title}
        aria-pressed={isFlipped}
      >
        {/* Front face */}
        <div
          className={`absolute inset-0 [backface-visibility:hidden] rounded-2xl border border-border/50 ${fact.bgLight} ${fact.bgDark} p-6 flex flex-col items-center justify-center gap-3 card-border-glow transition-shadow duration-300 group-hover:shadow-xl`}
        >
          {/* Decorative gradient blob */}
          <div
            className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${fact.gradient} opacity-10 rounded-bl-full`}
          />
          <span className="text-5xl sm:text-6xl select-none" role="img" aria-hidden="true">
            {fact.emoji}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-foreground text-center leading-tight">
            {title}
          </h3>
          <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 15l5 5 5-5" />
              <path d="M7 9l5-5 5 5" />
            </svg>
            {clickLabel}
          </span>
        </div>

        {/* Back face */}
        <div
          className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl border border-border/50 bg-gradient-to-br ${fact.gradient} p-6 flex flex-col items-center justify-center gap-3 shadow-xl`}
        >
          <span className="text-3xl select-none opacity-90" role="img" aria-hidden="true">
            {fact.emoji}
          </span>
          <p className="text-sm sm:text-base font-medium text-white text-center leading-relaxed">
            {factText}
          </p>
          <span className="text-xs text-white/70 mt-1 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 9l-5 5-5-5" />
              <path d="M17 15l-5-5-5 5" />
            </svg>
            {clickLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function BeeFacts() {
  const { lang } = useLangStore();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const t = (sl: string, en: string) => (lang === 'sl' ? sl : en);

  const sectionTitle = t('Zanimivosti o čebelah', 'Bee Fascination');
  const sectionSubtitle = t(
    'Odkrijte neverjetne dejstva o čebelah — majhnih stvareh, ki ustvarjajo eno največjih čudes narave.',
    'Discover amazing facts about bees — tiny creatures that create one of nature\'s greatest wonders.'
  );
  const clickMore = t('Kliknite za več', 'Click for more');
  const clickBack = t('Kliknite za nazaj', 'Click to go back');

  return (
    <section
      ref={sectionRef}
      id="bee-facts"
      className="py-20 sm:py-28 lg:py-32 relative overflow-hidden"
    >
      {/* Hex pattern background */}
      <div className="absolute inset-0 hex-pattern opacity-[0.03] pointer-events-none" />

      {/* Top decorative gradient */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-honey-50/50 to-transparent dark:from-honey-950/20 pointer-events-none" />

      {/* Bottom decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-honey-50/30 to-transparent dark:from-honey-950/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey-100 dark:bg-honey-900/30 text-honey-700 dark:text-honey-400 text-sm font-medium mb-4">
            <span role="img" aria-hidden="true">🐝</span>
            {t('Did you know?', 'Ali ste vedeli?')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Flip cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {facts.map((fact, index) => (
            <FlipCard
              key={index}
              fact={fact}
              index={index}
              title={t(fact.titleSl, fact.titleEn)}
              factText={t(fact.factSl, fact.factEn)}
              clickLabel={index < 4 ? clickMore : clickMore}
            />
          ))}
        </div>

        {/* Bottom fun fact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground italic">
            {t(
              'ℹ️ Vse zgornje informacije temeljijo na znanstvenih raziskavah in študijah entomologov.',
              'ℹ️ All information above is based on scientific research and studies by entomologists.'
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
