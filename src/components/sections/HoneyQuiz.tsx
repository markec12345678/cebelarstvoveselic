'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  RotateCcw,
  Share2,
  Check,
  PartyPopper,
  ShoppingBag,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useLangStore } from '@/store/language';

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
type QuizPhase = 'welcome' | 'quiz' | 'result';

interface Answer {
  emoji: string;
  labelSl: string;
  labelEn: string;
  scores: Record<HoneyType, number>;
}

interface Question {
  emoji: string;
  labelSl: string;
  labelEn: string;
  answers: Answer[];
}

type HoneyType =
  | 'acacia'
  | 'linden'
  | 'chestnut'
  | 'wildflower'
  | 'forest'
  | 'fir';

// ──────────────────────────────────────────────
// Questions data
// ──────────────────────────────────────────────
const questions: Question[] = [
  {
    emoji: '🌸',
    labelSl: 'Kakšna je vaša najljubša letna sezona?',
    labelEn: "What's your favorite season?",
    answers: [
      {
        emoji: '🌷',
        labelSl: 'Pomlad — cvetovi, svetloba, novo začetki',
        labelEn: 'Spring — flowers, light, new beginnings',
        scores: { acacia: 3, linden: 2, chestnut: 0, wildflower: 2, forest: 0, fir: 0 },
      },
      {
        emoji: '☀️',
        labelSl: 'Poletje — toplota, sonce, pustolovščine',
        labelEn: 'Summer — warmth, sun, adventures',
        scores: { acacia: 1, linden: 0, chestnut: 1, wildflower: 3, forest: 1, fir: 0 },
      },
      {
        emoji: '🍂',
        labelSl: 'Jesen — barve, udobje, bogati okusi',
        labelEn: 'Autumn — colors, comfort, rich flavors',
        scores: { acacia: 0, linden: 0, chestnut: 3, wildflower: 1, forest: 2, fir: 1 },
      },
      {
        emoji: '❄️',
        labelSl: 'Zima — mirovanje, toplina, introspekcija',
        labelEn: 'Winter — stillness, warmth, introspection',
        scores: { acacia: 0, linden: 1, chestnut: 0, wildflower: 0, forest: 1, fir: 3 },
      },
    ],
  },
  {
    emoji: '🥤',
    labelSl: 'Katera jutranja navada vam je najbližja?',
    labelEn: 'Which morning habit suits you?',
    answers: [
      {
        emoji: '🍵',
        labelSl: 'Topel čaj s čebeljim medom',
        labelEn: 'Warm tea with honey',
        scores: { acacia: 2, linden: 3, chestnut: 0, wildflower: 0, forest: 1, fir: 1 },
      },
      {
        emoji: '☕',
        labelSl: 'Močna kava, da se zbudim',
        labelEn: 'Strong coffee to wake up',
        scores: { acacia: 0, linden: 0, chestnut: 3, wildflower: 1, forest: 1, fir: 2 },
      },
      {
        emoji: '🥤',
        labelSl: 'Sadni smoothie ali svež sok',
        labelEn: 'Fruit smoothie or fresh juice',
        scores: { acacia: 3, linden: 0, chestnut: 0, wildflower: 3, forest: 0, fir: 0 },
      },
      {
        emoji: '🥣',
        labelSl: 'Jogurt z muesli in medom',
        labelEn: 'Yogurt with muesli and honey',
        scores: { acacia: 2, linden: 1, chestnut: 0, wildflower: 2, forest: 1, fir: 0 },
      },
    ],
  },
  {
    emoji: '🍰',
    labelSl: 'Kakšno hrano raje kuhamo?',
    labelEn: 'What food do you prefer cooking?',
    answers: [
      {
        emoji: '🧁',
        labelSl: 'Sladke sladice in pekovske izdelke',
        labelEn: 'Sweet desserts and baked goods',
        scores: { acacia: 3, linden: 2, chestnut: 0, wildflower: 1, forest: 0, fir: 0 },
      },
      {
        emoji: '🥩',
        labelSl: 'Solenje jedi in marinade',
        labelEn: 'Savory dishes and marinades',
        scores: { acacia: 0, linden: 0, chestnut: 3, wildflower: 1, forest: 1, fir: 1 },
      },
      {
        emoji: '🥗',
        labelSl: 'Sveže solate in lahke jedi',
        labelEn: 'Fresh salads and light dishes',
        scores: { acacia: 2, linden: 0, chestnut: 0, wildflower: 3, forest: 1, fir: 0 },
      },
      {
        emoji: '🍞',
        labelSl: 'Peka domačega kruha in peciva',
        labelEn: 'Baking homemade bread and pastries',
        scores: { acacia: 1, linden: 1, chestnut: 1, wildflower: 1, forest: 2, fir: 1 },
      },
    ],
  },
  {
    emoji: '🌟',
    labelSl: 'Kakšno naravo imate?',
    labelEn: "What's your personality?",
    answers: [
      {
        emoji: '🕊️',
        labelSl: 'Mirna in previdna',
        labelEn: 'Calm & gentle',
        scores: { acacia: 3, linden: 2, chestnut: 0, wildflower: 0, forest: 1, fir: 0 },
      },
      {
        emoji: '⚡',
        labelSl: 'Energična in pogumna',
        labelEn: 'Energetic & bold',
        scores: { acacia: 0, linden: 0, chestnut: 3, wildflower: 2, forest: 0, fir: 1 },
      },
      {
        emoji: '🎨',
        labelSl: 'Ustvarjalna in radovedna',
        labelEn: 'Creative & curious',
        scores: { acacia: 1, linden: 1, chestnut: 1, wildflower: 3, forest: 1, fir: 0 },
      },
      {
        emoji: '🛡️',
        labelSl: 'Tradicijska in zanesljiva',
        labelEn: 'Traditional & reliable',
        scores: { acacia: 1, linden: 2, chestnut: 1, wildflower: 0, forest: 2, fir: 2 },
      },
    ],
  },
  {
    emoji: '🏔️',
    labelSl: 'Kakšno okolje vam ustreza?',
    labelEn: 'What environment suits you?',
    answers: [
      {
        emoji: '🏔️',
        labelSl: 'Gore — razgled, svoboda, izziv',
        labelEn: 'Mountains — views, freedom, challenge',
        scores: { acacia: 0, linden: 0, chestnut: 2, wildflower: 1, forest: 1, fir: 3 },
      },
      {
        emoji: '🌲',
        labelSl: 'Gozd — globina, mir, skrivnosti',
        labelEn: 'Forest — depth, peace, mysteries',
        scores: { acacia: 0, linden: 0, chestnut: 1, wildflower: 0, forest: 3, fir: 2 },
      },
      {
        emoji: '🌼',
        labelSl: 'Travnik — barve, svetloba, prostor',
        labelEn: 'Meadow — colors, light, openness',
        scores: { acacia: 3, linden: 2, chestnut: 0, wildflower: 3, forest: 0, fir: 0 },
      },
      {
        emoji: '🌊',
        labelSl: 'Obrežje — voda, contemplacija, ritem',
        labelEn: 'Lakeside — water, contemplation, rhythm',
        scores: { acacia: 2, linden: 2, chestnut: 1, wildflower: 1, forest: 0, fir: 0 },
      },
    ],
  },
];

// ──────────────────────────────────────────────
// Result data — honey personalities
// ──────────────────────────────────────────────
type HoneyResultKey = HoneyType;

const honeyResults: Record<
  HoneyResultKey,
  {
    nameSl: string;
    nameEn: string;
    personalitySl: string;
    personalityEn: string;
    descSl: string;
    descEn: string;
    gradient: string;
    borderGlow: string;
    emoji: string;
    bgCard: string;
  }
> = {
  acacia: {
    nameSl: 'Akacijev med',
    nameEn: 'Acacia Honey',
    personalitySl: 'Njihova norost',
    personalityEn: 'The Gentle Soul',
    descSl: 'Blag, sladek in univerzalno ljubljen — tako kot vi. Akacijev med odraža vašo previdno naravo in toplino, ki jo širite okoli sebe. Idealen za tiste, ki cenijo preprostost in eleganco.',
    descEn: 'Mild, sweet, and universally loved — just like you. Acacia honey reflects your gentle nature and the warmth you spread around. Perfect for those who appreciate simplicity and elegance.',
    gradient: 'from-amber-100 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20',
    borderGlow: 'ring-amber-400/40 shadow-[0_0_30px_rgba(245,215,110,0.25)]',
    emoji: '🌸',
    bgCard: 'bg-gradient-to-br from-amber-50/80 to-yellow-50/80 dark:from-amber-950/20 dark:to-yellow-950/10',
  },
  linden: {
    nameSl: 'Lipov med',
    nameEn: 'Linden Honey',
    personalitySl: 'Zdravilec',
    personalityEn: 'The Healer',
    descSl: 'Sohoječ, tolažilen in tradicionalen — vaša navzočnost prinaša olajšavo tistim okoli vas. Kot lipov med ste znan po tem, da pomagate, ko je to najbolj potrebno.',
    descEn: 'Soothing, comforting, and traditional — your presence brings relief to those around you. Like linden honey, you are known for helping when it matters most.',
    gradient: 'from-emerald-100 to-green-50 dark:from-emerald-950/30 dark:to-green-950/20',
    borderGlow: 'ring-emerald-400/40 shadow-[0_0_30px_rgba(52,211,153,0.25)]',
    emoji: '🍃',
    bgCard: 'bg-gradient-to-br from-emerald-50/80 to-green-50/80 dark:from-emerald-950/20 dark:to-green-950/10',
  },
  chestnut: {
    nameSl: 'Kostanjev med',
    nameEn: 'Chestnut Honey',
    personalitySl: 'Pustolovec',
    personalityEn: 'The Adventurer',
    descSl: 'Pogumen, robusten in prepozaven — niste zadovoljni s povprečnim. Kot kostanjev med vas privlačijo globina, zahtevnost in kulinarične izkušnje, ki jih drugi ne upajo poskusiti.',
    descEn: 'Bold, robust, and distinctive — you are not satisfied with average. Like chestnut honey, you are drawn to depth, complexity, and culinary experiences others dare not try.',
    gradient: 'from-orange-100 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20',
    borderGlow: 'ring-orange-400/40 shadow-[0_0_30px_rgba(251,146,60,0.25)]',
    emoji: '🌰',
    bgCard: 'bg-gradient-to-br from-orange-50/80 to-amber-50/80 dark:from-orange-950/20 dark:to-amber-950/10',
  },
  wildflower: {
    nameSl: 'Cvetočni med',
    nameEn: 'Wildflower Honey',
    personalitySl: 'Umetnik',
    personalityEn: 'The Artist',
    descSl: 'Vsestranski, ustvarjalni in barvit — vaša osebnost je kot cvetočna travnik v polnem cvetju. Vsak dan vam prinaša novo navdih, prilagodljivi ste in vedno polni idej.',
    descEn: 'Versatile, creative, and colorful — your personality is like a wildflower meadow in full bloom. Every day brings new inspiration; you are adaptable and always full of ideas.',
    gradient: 'from-pink-100 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/20',
    borderGlow: 'ring-pink-400/40 shadow-[0_0_30px_rgba(244,114,182,0.25)]',
    emoji: '🌻',
    bgCard: 'bg-gradient-to-br from-pink-50/80 to-rose-50/80 dark:from-pink-950/20 dark:to-rose-950/10',
  },
  forest: {
    nameSl: 'Gozdni med',
    nameEn: 'Forest Honey',
    personalitySl: 'Modrec',
    personalityEn: 'The Wise One',
    descSl: 'Globok, zapleten in skrivnosten — vaša modrost in vtis vas naredita nekaj posebnega. Kot gozdni med nosite globino, ki razkrije svojo vrednost tistim, ki si vzamejo čas za odkrivanje.',
    descEn: 'Deep, complex, and mysterious — your wisdom and insight make you something special. Like forest honey, you carry a depth that reveals its value to those who take the time to discover it.',
    gradient: 'from-stone-200 to-amber-50 dark:from-stone-800/30 dark:to-amber-950/20',
    borderGlow: 'ring-amber-700/40 shadow-[0_0_30px_rgba(180,83,9,0.25)]',
    emoji: '🌲',
    bgCard: 'bg-gradient-to-br from-stone-100/80 to-amber-50/80 dark:from-stone-800/20 dark:to-amber-950/10',
  },
  fir: {
    nameSl: 'Smrekov med',
    nameEn: 'Fir Honeydew Honey',
    personalitySl: 'Zimski kralj',
    personalityEn: 'The Winter King',
    descSl: 'Močan, temen in redek — ste enkraten. Kot med brstov smreke ste posebna in iskana osebnost, katere vrednost prepoznajo le tisti, ki resnično poznajo. Redkost v svetu običajnega.',
    descEn: 'Strong, dark, and rare — you are one of a kind. Like fir honeydew honey, you are a special and sought-after personality whose value is recognized only by those who truly know. A rarity in a world of the ordinary.',
    gradient: 'from-slate-200 to-stone-100 dark:from-slate-800/30 dark:to-stone-900/20',
    borderGlow: 'ring-slate-400/40 shadow-[0_0_30px_rgba(100,116,139,0.25)]',
    emoji: '🌲',
    bgCard: 'bg-gradient-to-br from-slate-100/80 to-stone-100/80 dark:from-slate-800/20 dark:to-stone-900/10',
  },
};

// ──────────────────────────────────────────────
// Confetti colors
// ──────────────────────────────────────────────
const confettiColors = [
  '#D4A017',
  '#F5D76E',
  '#B8860B',
  '#5A8A3C',
  '#E8B830',
  '#ef4444',
  '#22c55e',
  '#f97316',
  '#a855f7',
  '#ec4899',
];

// ──────────────────────────────────────────────
// Animation variants
// ──────────────────────────────────────────────
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: unknown) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 180,
      damping: 22,
      delay: (i as number) * 0.08,
    },
  }),
};

const resultCardVariant = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 18,
      delay: 0.2,
    },
  },
};

// ──────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────
export default function HoneyQuiz() {
  const { lang } = useLangStore();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const t = useCallback(
    (sl: string, en: string) => (lang === 'sl' ? sl : en),
    [lang],
  );

  // Quiz state
  const [phase, setPhase] = useState<QuizPhase>('welcome');
  const [currentQ, setCurrentQ] = useState(0);
  const [direction, setDirection] = useState(1);
  const [scores, setScores] = useState<Record<HoneyType, number>>({
    acacia: 0,
    linden: 0,
    chestnut: 0,
    wildflower: 0,
    forest: 0,
    fir: 0,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Compute result
  const getResult = useCallback((): HoneyResultKey => {
    const maxScore = Math.max(...Object.values(scores));
    const winners = (Object.entries(scores) as [HoneyType, number][]).filter(
      ([, v]) => v === maxScore,
    );
    if (winners.length === 1) return winners[0][0];
    // Tie-break: pick first
    return winners[0][0];
  }, [scores]);

  // Match percentage
  const getMatchPercentage = useCallback((): number => {
    const totalPossible = questions.length * 3;
    const maxScore = Math.max(...Object.values(scores));
    return Math.min(Math.round((maxScore / totalPossible) * 100 + 20), 98);
  }, [scores]);

  const result = getResult();
  const matchPct = getMatchPercentage();
  const resultData = honeyResults[result];

  // Handlers
  const handleStart = () => {
    setPhase('quiz');
    setCurrentQ(0);
    setScores({ acacia: 0, linden: 0, chestnut: 0, wildflower: 0, forest: 0, fir: 0 });
    setSelectedAnswer(null);
    setDirection(1);
  };

  const handleSelectAnswer = (answerIdx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIdx);

    // Update scores
    const answer = questions[currentQ].answers[answerIdx];
    const newScores = { ...scores };
    for (const [key, val] of Object.entries(answer.scores)) {
      newScores[key as HoneyType] += val;
    }
    setScores(newScores);

    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setDirection(1);
        setCurrentQ((prev) => prev + 1);
        setSelectedAnswer(null);
      } else {
        // Show result with confetti
        setTimeout(() => setShowConfetti(true), 200);
        setTimeout(() => setShowConfetti(false), 3000);
        setPhase('result');
      }
    }, 600);
  };

  const handleRetake = () => {
    setPhase('welcome');
    setCurrentQ(0);
    setScores({ acacia: 0, linden: 0, chestnut: 0, wildflower: 0, forest: 0, fir: 0 });
    setSelectedAnswer(null);
    setDirection(1);
    setShowConfetti(false);
  };

  const handleShare = useCallback(async () => {
    const honeyName = lang === 'sl' ? resultData.nameSl : resultData.nameEn;
    const personality = lang === 'sl' ? resultData.personalitySl : resultData.personalityEn;
    const shareText = lang === 'sl'
      ? `🍯 Sem ${personality}! Moj kvizov med je ${honeyName}. Odkrijte, kateri med ste vi! 🐝`
      : `🍯 I'm ${personality}! My quiz honey is ${honeyName}. Find out which honey you are! 🐝`;

    try {
      await navigator.clipboard.writeText(shareText);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    } catch {
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2500);
    }
  }, [lang, resultData]);

  // Section titles
  const sectionTag = t('Kviz', 'Quiz');
  const sectionTitle = t('Kateri med ste vi?', 'Which Honey Are You?');
  const sectionSubtitle = t(
    'Odgovorite na 5 preprostih vprašanj in odkrijte, katera vrsta medu najbolj ustreza vaši osebnosti.',
    'Answer 5 simple questions and discover which honey variety best matches your personality.',
  );
  const startLabel = t('Začni kviz', 'Start Quiz');
  const retakeLabel = t('Poskusi znova', 'Retake Quiz');
  const shareLabel = t('Deli rezultat', 'Share Result');
  const shopLabel = t('Naroči ta med', 'Shop This Honey');
  const progressLabel = t('Vprašanje', 'Question');

  return (
    <section
      ref={sectionRef}
      id="honey-quiz"
      className="py-20 sm:py-28 lg:py-32 relative overflow-hidden"
    >
      {/* Hex pattern background */}
      <div className="absolute inset-0 hex-pattern opacity-[0.03] pointer-events-none" />

      {/* Decorative gradient overlays */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-honey-50/40 to-transparent dark:from-honey-950/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-honey-50/30 to-transparent dark:from-honey-950/10 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey-100 dark:bg-honey-900/30 text-honey-700 dark:text-honey-400 text-sm font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {sectionTag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </motion.div>

        {/* Quiz Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {/* Confetti */}
          <AnimatePresence>
            {showConfetti && (
              <div className="fixed inset-0 pointer-events-none z-50">
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-sm"
                    style={{
                      backgroundColor: confettiColors[i % confettiColors.length],
                      left: `${20 + Math.random() * 60}%`,
                      top: `${30 + Math.random() * 30}%`,
                      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    }}
                    initial={{ opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
                    animate={{
                      opacity: [1, 1, 0],
                      y: -150 - Math.random() * 200,
                      x: -120 + Math.random() * 240,
                      rotate: 360 + Math.random() * 720,
                      scale: [1, 1.3, 0.2],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 1.8 + Math.random() * 0.6,
                      ease: 'easeOut',
                      delay: Math.random() * 0.3,
                    }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          <div className="rounded-3xl border border-border/60 bg-card/60 backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-lg">
            <AnimatePresence mode="wait" custom={direction}>
              {/* ────── WELCOME SCREEN ────── */}
              {phase === 'welcome' && (
                <motion.div
                  key="welcome"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className="text-center py-8 sm:py-12"
                >
                  {/* Honey jar icon */}
                  <motion.div
                    className="mx-auto w-24 h-24 sm:w-28 sm:h-28 mb-6 rounded-full bg-gradient-to-br from-honey-100 to-honey-200 dark:from-honey-900/40 dark:to-honey-800/30 flex items-center justify-center"
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <span className="text-5xl sm:text-6xl" role="img" aria-hidden="true">
                      🍯
                    </span>
                  </motion.div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                    {t('Odkrijte svoj med', 'Discover Your Honey')}
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto text-sm sm:text-base">
                    {t(
                      '5 vprašanj, 1 rezultat. Ustavite se, se zabavajte in izvedite, katera od naših šestih sort medu je prava za vas.',
                      '5 questions, 1 result. Take a moment, have fun, and find out which of our six honey varieties is right for you.',
                    )}
                  </p>

                  {/* Question preview pills */}
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {questions.map((q, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 text-muted-foreground text-xs font-medium"
                      >
                        <span role="img" aria-hidden="true">{q.emoji}</span>
                        <span className="hidden sm:inline">{t(q.labelSl, q.labelEn)}</span>
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={handleStart}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-honey-500 to-honey-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-honey-600 hover:to-honey-700 transition-all duration-300 cta-glow honey-shine-btn text-base"
                  >
                    {startLabel}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* ────── QUIZ SCREEN ────── */}
              {phase === 'quiz' && (
                <motion.div
                  key={`q-${currentQ}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className="py-4 sm:py-6"
                >
                  {/* Progress bar */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {progressLabel} {currentQ + 1} / {questions.length}
                      </span>
                      <div className="flex gap-1.5">
                        {questions.map((_, i) => (
                          <motion.div
                            key={i}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              i < currentQ
                                ? 'bg-honey-500 w-6'
                                : i === currentQ
                                  ? 'bg-honey-500 w-6'
                                  : 'bg-muted w-4'
                            }`}
                            layout
                          />
                        ))}
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted/50 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-honey-400 via-honey-500 to-honey-600"
                        animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <div className="text-center mb-6 sm:mb-8">
                    <motion.span
                      className="text-4xl sm:text-5xl block mb-3"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      role="img"
                      aria-hidden="true"
                    >
                      {questions[currentQ].emoji}
                    </motion.span>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-snug">
                      {t(questions[currentQ].labelSl, questions[currentQ].labelEn)}
                    </h3>
                  </div>

                  {/* Answers */}
                  <div className="grid gap-3 sm:gap-4">
                    {questions[currentQ].answers.map((answer, idx) => {
                      const isSelected = selectedAnswer === idx;
                      return (
                        <motion.button
                          key={idx}
                          custom={idx}
                          variants={fadeInUp as any}
                          initial="hidden"
                          animate="visible"
                          onClick={() => handleSelectAnswer(idx)}
                          disabled={selectedAnswer !== null}
                          className={`
                            relative text-left w-full rounded-2xl border p-4 sm:p-5 transition-all duration-300
                            cursor-pointer group
                            ${
                              isSelected
                                ? 'border-honey-400 dark:border-honey-500 bg-honey-50 dark:bg-honey-900/20 shadow-[0_0_20px_rgba(212,160,23,0.15)] scale-[1.02]'
                                : 'border-border/60 bg-background/50 hover:bg-muted/50 hover:border-honey-300/50 dark:hover:border-honey-700/50 hover:shadow-md hover:scale-[1.01]'
                            }
                            disabled:cursor-default
                          `}
                          aria-pressed={isSelected}
                        >
                          {/* Glassmorphism inner */}
                          <div className="flex items-center gap-3 sm:gap-4">
                            <span className="text-2xl sm:text-3xl flex-shrink-0" role="img" aria-hidden="true">
                              {answer.emoji}
                            </span>
                            <span className="text-sm sm:text-base font-medium text-foreground flex-1">
                              {t(answer.labelSl, answer.labelEn)}
                            </span>
                            {/* Selected checkmark */}
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={isSelected ? { scale: 1 } : { scale: 0 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                              className="flex-shrink-0 w-7 h-7 rounded-full bg-honey-500 flex items-center justify-center"
                            >
                              <Check className="w-4 h-4 text-white" strokeWidth={3} />
                            </motion.div>
                          </div>
                          {/* Subtle shine overlay on hover */}
                          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ────── RESULT SCREEN ────── */}
              {phase === 'result' && (
                <motion.div
                  key="result"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className="py-4 sm:py-6"
                >
                  {/* Trophy badge */}
                  <motion.div
                    className="text-center mb-6"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                  >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-honey-100 to-amber-100 dark:from-honey-900/30 dark:to-amber-900/20 border border-honey-200/50 dark:border-honey-800/30">
                      <Trophy className="w-4 h-4 text-honey-600 dark:text-honey-400" />
                      <span className="text-sm font-semibold text-honey-700 dark:text-honey-400">
                        {t('Rezultat kviza', 'Quiz Result')}
                      </span>
                    </div>
                  </motion.div>

                  {/* Result card */}
                  <motion.div
                    variants={resultCardVariant as any}
                    initial="hidden"
                    animate="visible"
                    className={`
                      relative rounded-3xl border-2 ${resultData.borderGlow} ${resultData.bgCard}
                      p-6 sm:p-8 text-center overflow-hidden
                    `}
                  >
                    {/* Animated golden border glow */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl pointer-events-none"
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(212,160,23,0.1), inset 0 0 20px rgba(212,160,23,0.02)',
                          '0 0 40px rgba(212,160,23,0.2), inset 0 0 30px rgba(212,160,23,0.05)',
                          '0 0 20px rgba(212,160,23,0.1), inset 0 0 20px rgba(212,160,23,0.02)',
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    {/* Honey emoji */}
                    <motion.div
                      className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-4 rounded-full bg-gradient-to-br from-honey-200/60 to-honey-300/40 dark:from-honey-800/30 dark:to-honey-700/20 flex items-center justify-center"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <span className="text-4xl sm:text-5xl" role="img" aria-hidden="true">
                        {resultData.emoji}
                      </span>
                      {/* Match percentage badge */}
                      <div className="absolute -top-1 -right-1 w-10 h-10 rounded-full bg-honey-500 dark:bg-honey-600 flex items-center justify-center shadow-lg">
                        <span className="text-[10px] font-bold text-white leading-tight text-center">
                          {matchPct}%
                        </span>
                      </div>
                    </motion.div>

                    {/* Honey name */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      {lang === 'sl' ? resultData.nameSl : resultData.nameEn}
                    </h3>

                    {/* Personality title */}
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-honey-100/80 dark:bg-honey-900/30 text-honey-700 dark:text-honey-400 text-sm font-semibold mb-4">
                      <PartyPopper className="w-3.5 h-3.5" />
                      {lang === 'sl' ? resultData.personalitySl : resultData.personalityEn}
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto mb-6">
                      {lang === 'sl' ? resultData.descSl : resultData.descEn}
                    </p>

                    {/* Score breakdown mini-bar */}
                    <div className="max-w-xs mx-auto mb-6">
                      {(
                        Object.entries(scores) as [HoneyType, number][]
                      ).map(([key, val]) => {
                        const maxVal = Math.max(...Object.values(scores));
                        const pct = maxVal > 0 ? (val / maxVal) * 100 : 0;
                        const isWinner = key === result;
                        const data = honeyResults[key];
                        return (
                          <div
                            key={key}
                            className={`flex items-center gap-2 py-1 ${isWinner ? 'font-semibold' : ''}`}
                          >
                            <span className="text-xs w-4 text-center" role="img" aria-hidden="true">
                              {data.emoji}
                            </span>
                            <span className="text-xs text-muted-foreground w-16 sm:w-24 truncate">
                              {lang === 'sl' ? data.nameSl : data.nameEn}
                            </span>
                            <div className="flex-1 h-1.5 rounded-full bg-muted/50 overflow-hidden">
                              <motion.div
                                className={`h-full rounded-full ${isWinner ? 'bg-honey-500' : 'bg-honey-300 dark:bg-honey-700'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      {/* Share button */}
                      <motion.button
                        onClick={handleShare}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-honey-300 dark:border-honey-700 bg-honey-50 dark:bg-honey-900/20 text-honey-700 dark:text-honey-400 font-medium text-sm hover:bg-honey-100 dark:hover:bg-honey-900/30 transition-colors"
                      >
                        {shareSuccess ? (
                          <>
                            <Check className="w-4 h-4 text-green-500" />
                            {t('Kopirano!', 'Copied!')}
                          </>
                        ) : (
                          <>
                            <Share2 className="w-4 h-4" />
                            {shareLabel}
                          </>
                        )}
                      </motion.button>

                      {/* Retake button */}
                      <motion.button
                        onClick={handleRetake}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-background text-muted-foreground font-medium text-sm hover:bg-muted transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        {retakeLabel}
                      </motion.button>

                      {/* Shop Now CTA */}
                      <motion.a
                        href="#products"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-honey-500 to-honey-600 text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:from-honey-600 hover:to-honey-700 transition-all duration-300 honey-shine-btn"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        {shopLabel}
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bottom decorative text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-xs text-muted-foreground/70">
            {t(
              '🍯 Kviz je namenjen zabavi. Vsi naši medi so izjemni — rezultat je le predlog za odkrivanje.',
              '🍯 This quiz is for fun. All our honeys are exceptional — the result is just a suggestion for exploration.',
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
