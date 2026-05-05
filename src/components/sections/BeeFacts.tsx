'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLangStore } from '@/store/language';
import { Share2, Check, PartyPopper } from 'lucide-react';

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
    glowClass: 'card-glow-amber',
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
    glowClass: 'card-glow-pink',
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
    glowClass: 'card-glow-yellow',
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
    glowClass: 'card-glow-sky',
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
    glowClass: 'card-glow-violet',
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
    glowClass: 'card-glow-emerald',
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
    glowClass: 'card-glow-teal',
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
    glowClass: 'card-glow-red',
  },
];

interface FlipCardProps {
  fact: (typeof facts)[0];
  index: number;
  title: string;
  factText: string;
  clickLabel: string;
  onFlip: () => void;
  onShare: (fact: (typeof facts)[0]) => void;
  shareSuccessIndex: number | null;
}

function FlipCard({ fact, index, title, factText, clickLabel, onFlip, onShare, shareSuccessIndex }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isShareSuccess = shareSuccessIndex === index;

  const handleFlip = () => {
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);
    if (newFlipped) onFlip();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        type: 'spring',
        stiffness: 180,
        damping: 20,
        delay: index * 0.08,
      }}
      className="group perspective-[1000px]"
    >
      <div
        className={`relative w-full h-56 sm:h-64 cursor-pointer transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
        onClick={handleFlip}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleFlip();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={isFlipped ? clickLabel : title}
        aria-pressed={isFlipped}
      >
        {/* Front face */}
        <div
          className={`absolute inset-0 [backface-visibility:hidden] rounded-2xl border border-border/50 ${fact.bgLight} ${fact.bgDark} p-6 flex flex-col items-center justify-center gap-3 transition-shadow duration-300 group-hover:shadow-xl ${fact.glowClass}`}
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

          {/* Share button */}
          <button
            onClick={(e) => { e.stopPropagation(); onShare(fact); }}
            className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-muted/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-honey-600 dark:hover:text-honey-400 hover:bg-honey-100 dark:hover:bg-honey-900/20 transition-colors z-10"
            aria-label="Share fact"
          >
            {isShareSuccess ? (
              <Check className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
          </button>
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

// Floating bee SVG component
function FloatingBee({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        y: [0, -20, -5, -15, 0],
        x: [0, 10, -5, 15, 0],
        rotate: [0, 5, -3, 8, 0],
      }}
      transition={{
        duration: 12 + delay * 2,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: delay,
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="opacity-30">
        <ellipse cx="12" cy="14" rx="6" ry="7" fill="#F5D76E" />
        <ellipse cx="12" cy="14" rx="6" ry="7" fill="none" stroke="#D4A017" strokeWidth="1" />
        <line x1="6" y1="11" x2="18" y2="11" stroke="#D4A017" strokeWidth="0.8" />
        <line x1="6" y1="13" x2="18" y2="13" stroke="#D4A017" strokeWidth="0.8" />
        <line x1="6" y1="15" x2="18" y2="15" stroke="#D4A017" strokeWidth="0.8" />
        <ellipse cx="9" cy="8" rx="4" ry="2.5" fill="white" fillOpacity="0.6" stroke="#D4A017" strokeWidth="0.5" transform="rotate(-20 9 8)" />
        <ellipse cx="15" cy="8" rx="4" ry="2.5" fill="white" fillOpacity="0.6" stroke="#D4A017" strokeWidth="0.5" transform="rotate(20 15 8)" />
        <circle cx="10" cy="12" r="1" fill="#3E2723" />
        <circle cx="14" cy="12" r="1" fill="#3E2723" />
      </svg>
    </motion.div>
  );
}

export default function BeeFacts() {
  const { lang } = useLangStore();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [flippedCount, setFlippedCount] = useState(0);
  const [shareSuccessIndex, setShareSuccessIndex] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiRef = useRef<HTMLDivElement>(null);

  const t = (sl: string, en: string) => (lang === 'sl' ? sl : en);

  const sectionTitle = t('Zanimivosti o čebelah', 'Bee Fascination');
  const sectionSubtitle = t(
    'Odkrijte neverjetne dejstva o čebelah — majhnih stvareh, ki ustvarjajo eno največjih čudes narave.',
    'Discover amazing facts about bees — tiny creatures that create one of nature\'s greatest wonders.'
  );
  const clickMore = t('Kliknite za več', 'Click for more');
  const clickBack = t('Kliknite za nazaj', 'Click to go back');

  const handleFlip = useCallback(() => {
    setFlippedCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 8 && !showConfetti) {
        setTimeout(() => setShowConfetti(true), 300);
        setTimeout(() => setShowConfetti(false), 2500);
      }
      return newCount;
    });
  }, [showConfetti]);

  const handleShare = useCallback(async (fact: (typeof facts)[0]) => {
    const idx = facts.indexOf(fact);
    const text = `${fact.emoji} ${lang === 'sl' ? fact.titleSl : fact.titleEn}: ${lang === 'sl' ? fact.factSl : fact.factEn}`;
    try {
      await navigator.clipboard.writeText(text);
      setShareSuccessIndex(idx);
      setTimeout(() => setShareSuccessIndex(null), 2000);
    } catch {
      setShareSuccessIndex(idx);
      setTimeout(() => setShareSuccessIndex(null), 2000);
    }
  }, [lang]);

  const confettiColors = ['#D4A017', '#F5D76E', '#B8860B', '#5A8A3C', '#E8B830', '#ef4444', '#22c55e', '#f97316'];

  return (
    <section
      ref={sectionRef}
      id="bee-facts"
      className="py-20 sm:py-28 lg:py-32 relative overflow-hidden"
    >
      {/* Hex pattern background */}
      <div className="absolute inset-0 hex-pattern opacity-[0.03] pointer-events-none" />

      {/* Animated floating bees */}
      <FloatingBee className="top-[15%] left-[5%] floating-bee" delay={0} />
      <FloatingBee className="top-[30%] right-[8%] floating-bee-slow" delay={2} />
      <FloatingBee className="bottom-[25%] left-[12%] floating-bee-fast" delay={4} />
      <FloatingBee className="top-[60%] right-[15%] floating-bee" delay={6} />
      <FloatingBee className="bottom-[15%] right-[30%] floating-bee-slow" delay={8} />
      <FloatingBee className="top-[45%] left-[3%] floating-bee-fast" delay={1} />

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
            {t('Ali ste vedeli?', 'Did you know?')}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {sectionTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>

          {/* Fun fact counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-honey-100/80 dark:bg-honey-900/20 border border-honey-200/50 dark:border-honey-800/30"
          >
            <span className="text-sm font-medium text-honey-700 dark:text-honey-400">
              {t('8 dejstev za odkriti', '8 facts to discover')}
            </span>
            <span className="text-honey-500 dark:text-honey-400">·</span>
            <span className={`text-sm font-bold transition-colors ${
              flippedCount >= 8
                ? 'text-green-600 dark:text-green-400'
                : 'text-honey-700 dark:text-honey-400'
            }`}>
              {Math.min(flippedCount, 8)}/8 {t('odkritih', 'discovered')}
            </span>
            {flippedCount >= 8 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-base"
              >
                🎉
              </motion.span>
            )}
          </motion.div>
        </motion.div>

        {/* Confetti animation */}
        <AnimatePresence>
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50" ref={confettiRef}>
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="confetti-piece w-3 h-3 rounded-sm"
                  style={{
                    backgroundColor: confettiColors[i % confettiColors.length],
                    left: `${30 + Math.random() * 40}%`,
                    top: `${40 + Math.random() * 20}%`,
                    '--confetti-x': `${-100 + Math.random() * 200}px`,
                    '--confetti-r': `${360 + Math.random() * 720}deg`,
                  } as React.CSSProperties}
                  initial={{ opacity: 1, y: 0, x: 0 }}
                  animate={{
                    opacity: [1, 1, 0],
                    y: [-100 - Math.random() * 150, -200 - Math.random() * 100],
                    x: -100 + Math.random() * 200,
                    rotate: Math.random() * 720,
                    scale: [1, 1.2, 0.3],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 + Math.random() * 0.5, ease: 'easeOut' }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

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
              onFlip={handleFlip}
              onShare={handleShare}
              shareSuccessIndex={shareSuccessIndex}
            />
          ))}
        </div>

        {/* All discovered celebration */}
        <AnimatePresence>
          {flippedCount >= 8 && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 text-green-700 dark:text-green-400 text-sm font-medium">
                <PartyPopper className="w-4 h-4" />
                {t('Odkrili ste vsa dejstva! Ste pravi čebelji poznavalec. 🐝', 'You discovered all facts! You\'re a true bee expert. 🐝')}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
