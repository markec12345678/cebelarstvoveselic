'use client';

import { useRef, useState, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CalendarDays, Droplets, TreePine, Flower2, Mountain, Snowflake, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { useLangStore } from '@/store/language';
import { type Lang } from '@/lib/i18n';

interface HoneySeason {
  id: string;
  nameSl: string;
  nameEn: string;
  startMonth: number; // 1-12
  endMonth: number;   // 1-12
  color: string;       // Tailwind bg color
  barColor: string;    // Tailwind gradient for bar
  icon: React.ComponentType<{ className?: string }>;
  factSl: string;
  factEn: string;
}

const honeySeasons: HoneySeason[] = [
  {
    id: 'acacia',
    nameSl: 'Akacijev med',
    nameEn: 'Acacia Honey',
    startMonth: 5,
    endMonth: 7,
    color: 'bg-[#F5E6A8]',
    barColor: 'from-[#F5E6A8] to-[#E8D070]',
    icon: Flower2,
    factSl: 'Akacije cvetijo le 2-3 tedne maja. Čebele morajo biti na pravi mestu pravočasno!',
    factEn: 'Acacia trees bloom for only 2-3 weeks in May. Bees must be in the right place at the right time!',
  },
  {
    id: 'linden',
    nameSl: 'Lipov med',
    nameEn: 'Linden Honey',
    startMonth: 6,
    endMonth: 8,
    color: 'bg-[#F0D060]',
    barColor: 'from-[#F0D060] to-[#D4B830]',
    icon: Flower2,
    factSl: 'Lipa cveti v juniju in prinaša edinstveno žlahtno aromo, ki je blagodejna za dihala.',
    factEn: 'Linden trees bloom in June, producing a unique noble aroma that is soothing for the respiratory system.',
  },
  {
    id: 'chestnut',
    nameSl: 'Kostanjev med',
    nameEn: 'Chestnut Honey',
    startMonth: 7,
    endMonth: 9,
    color: 'bg-[#A06830]',
    barColor: 'from-[#A06830] to-[#7A4E20]',
    icon: Mountain,
    factSl: 'Kostanjevi gozdovi v Beli krajini dajejo med bogat z minerali in antioksidanti.',
    factEn: 'Chestnut forests in Bela Krajina produce honey rich in minerals and antioxidants.',
  },
  {
    id: 'wildflower',
    nameSl: 'Cvetlični med',
    nameEn: 'Wildflower Honey',
    startMonth: 5,
    endMonth: 9,
    color: 'bg-[#E8C040]',
    barColor: 'from-[#E8C040] to-[#D4A828]',
    icon: Flower2,
    factSl: 'Vsak kozarec cvetličnega meda je edinstven — odvisen od cvetja, ki prav tako cveti.',
    factEn: 'Every jar of wildflower honey is unique — it depends on which flowers happen to be blooming.',
  },
  {
    id: 'forest',
    nameSl: 'Gozdni med',
    nameEn: 'Forest Honey',
    startMonth: 7,
    endMonth: 10,
    color: 'bg-[#5A3A20]',
    barColor: 'from-[#5A3A20] to-[#3E2723]',
    icon: TreePine,
    factSl: 'Gozdni med izhaja iz medne rose — sladke sekrete listnih uši na bukvi in hrastu.',
    factEn: 'Forest honey comes from honeydew — sweet secretions of aphids on beech and oak trees.',
  },
  {
    id: 'fir',
    nameSl: 'Smrekov med',
    nameEn: 'Fir Honey',
    startMonth: 8,
    endMonth: 11,
    color: 'bg-[#2D1A10]',
    barColor: 'from-[#3A2418] to-[#1A0E08]',
    icon: Snowflake,
    factSl: 'Med brstov smreke je redkost — pridobivamo ga v višjih legah Gorjancev avgusta in septembra.',
    factEn: 'Fir honeydew honey is a rarity — we harvest it in the higher elevations of Gorjanci in August and September.',
  },
];

const monthsSl = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun',
  'Jul', 'Ago', 'Sep', 'Okt', 'Nov', 'Dec',
];

const monthsEn = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const seasonsData = {
  sl: {
    sectionTag: 'Medeni koledar',
    title: 'Ko je najboljši čas za vsak med?',
    subtitle: 'Vsaka vrsta medu ima svoj sezonski ritem. Raziščite, kdaj je pravi čas za vsako sorto — od spomladanskega akacijevega do jesenskega smrekovega medu.',
    currently: 'Trenutno',
    available: 'Na voljo',
    selectMonth: 'Izberite mesec',
    monthDetail: 'Med v tem mesecu',
    funFact: 'Zanimivost',
    seasonLabel: 'Sezona medenja',
    spring: 'Pomlad',
    summer: 'Poletje',
    autumn: 'Jesen',
    winter: 'Zima',
    months: monthsSl,
  },
  en: {
    sectionTag: 'Honey Calendar',
    title: 'When is the Best Time for Each Honey?',
    subtitle: 'Each honey variety follows its own seasonal rhythm. Discover the ideal time for every type — from spring acacia to autumn fir honey.',
    currently: 'Currently',
    available: 'Available',
    selectMonth: 'Select a month',
    monthDetail: 'Honey this month',
    funFact: 'Fun Fact',
    seasonLabel: 'Harvest Season',
    spring: 'Spring',
    summer: 'Summer',
    autumn: 'Autumn',
    winter: 'Winter',
    months: monthsEn,
  },
};

function getSeasonForMonth(month: number, lang: Lang): string {
  if (month >= 3 && month <= 5) return seasonsData[lang].spring;
  if (month >= 6 && month <= 8) return seasonsData[lang].summer;
  if (month >= 9 && month <= 11) return seasonsData[lang].autumn;
  return seasonsData[lang].winter;
}

function isCurrentlyAvailable(startMonth: number, endMonth: number, currentMonth: number): boolean {
  if (startMonth <= endMonth) {
    return currentMonth >= startMonth && currentMonth <= endMonth;
  }
  // Wraps around year (not used currently but good practice)
  return currentMonth >= startMonth || currentMonth <= endMonth;
}

export default function HoneyCalendar() {
  const lang = useLangStore((s) => s.lang);
  const t = seasonsData[lang];
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const currentMonth = new Date().getMonth() + 1; // 1-12
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  const activeMonth = selectedMonth ?? currentMonth;
  const availableHoneys = useMemo(
    () => honeySeasons.filter((h) => isCurrentlyAvailable(h.startMonth, h.endMonth, activeMonth)),
    [activeMonth],
  );

  const selectedHoney = useMemo(() => {
    if (!selectedMonth) return null;
    const found = honeySeasons.find((h) => isCurrentlyAvailable(h.startMonth, h.endMonth, selectedMonth));
    return found ?? null;
  }, [selectedMonth]);

  const scrollTimeline = (direction: 'left' | 'right') => {
    if (!timelineRef.current) return;
    const scrollAmount = 200;
    timelineRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-background overflow-hidden"
      id="calendar"
    >
      {/* Background hex pattern */}
      <div className="absolute inset-0 hex-pattern opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-honey-100 text-honey-700 dark:bg-honey-900/40 dark:text-honey-300 rounded-full text-sm font-medium mb-4">
            <CalendarDays className="w-4 h-4" />
            {t.sectionTag}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {t.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Month timeline - horizontal scrollable on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-10 sm:mb-14"
        >
          {/* Scroll arrows (mobile) */}
          <button
            onClick={() => scrollTimeline('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex w-8 h-8 items-center justify-center rounded-full bg-card border border-border shadow-lg hover:bg-honey-50 dark:hover:bg-honey-900/20 transition-colors -translate-x-1/2"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={() => scrollTimeline('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden sm:flex w-8 h-8 items-center justify-center rounded-full bg-card border border-border shadow-lg hover:bg-honey-50 dark:hover:bg-honey-900/20 transition-colors translate-x-1/2"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>

          {/* Timeline container */}
          <div className="overflow-x-auto scrollbar-thin pb-2" ref={timelineRef}>
            <div className="min-w-[640px] sm:min-w-0">
              {/* Month headers */}
              <div className="relative flex items-end justify-between px-2 mb-1">
                {t.months.map((month, i) => {
                  const monthNum = i + 1;
                  const isCurrent = monthNum === currentMonth && selectedMonth === null;
                  const isSelected = monthNum === selectedMonth;
                  const isActive = isCurrent || isSelected;

                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedMonth(selectedMonth === monthNum ? null : monthNum)}
                      className={`
                        relative flex flex-col items-center gap-1.5 py-2 px-1 flex-1 rounded-xl transition-all duration-200
                        ${isActive
                          ? 'bg-honey-100 dark:bg-honey-900/30 shadow-md'
                          : 'hover:bg-muted/50'
                        }
                      `}
                      aria-label={`${month} — ${isCurrent ? t.currently : ''}`}
                    >
                      {/* Season label */}
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">
                        {i % 3 === 0 ? getSeasonForMonth(monthNum, lang) : ''}
                      </span>

                      {/* Month name */}
                      <span
                        className={`text-sm font-semibold transition-colors duration-200 ${
                          isActive
                            ? 'text-honey-700 dark:text-honey-300'
                            : 'text-foreground/70'
                        }`}
                      >
                        {month}
                      </span>

                      {/* Current month indicator */}
                      {isCurrent && (
                        <motion.div
                          layoutId="current-indicator"
                          className="w-2 h-2 rounded-full bg-honey-500"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}

                      {/* Selected indicator (non-current) */}
                      {isSelected && !isCurrent && (
                        <motion.div
                          layoutId="selected-indicator"
                          className="w-2 h-2 rounded-full bg-honey-400"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Vertical grid lines */}
              <div className="relative h-px bg-border mx-2" />

              {/* Honey availability bars */}
              <div className="relative mt-3 px-2 space-y-3">
                {honeySeasons.map((honey, honeyIdx) => {
                  const isAvailable = isCurrentlyAvailable(honey.startMonth, honey.endMonth, activeMonth);
                  const barStart = ((honey.startMonth - 1) / 12) * 100;
                  const barWidth = ((honey.endMonth - honey.startMonth + 1) / 12) * 100;
                  const Icon = honey.icon;
                  const isLight = honey.id === 'acacia' || honey.id === 'wildflower' || honey.id === 'linden';

                  return (
                    <motion.div
                      key={honey.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + honeyIdx * 0.08 }}
                      className="flex items-center gap-3 group"
                    >
                      {/* Honey name label */}
                      <div className={`w-28 sm:w-36 flex-shrink-0 flex items-center gap-2 transition-all duration-300 ${isAvailable ? 'opacity-100' : 'opacity-40'}`}>
                        <div
                          className={`w-3 h-3 rounded-full ${honey.color} ring-2 ring-background flex-shrink-0 transition-all duration-300 ${isAvailable ? 'ring-offset-1 ring-offset-honey-200 dark:ring-offset-honey-800 scale-110' : ''}`}
                        />
                        <span className={`text-xs sm:text-sm font-medium truncate transition-colors duration-200 ${isAvailable ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {lang === 'sl' ? honey.nameSl : honey.nameEn}
                        </span>
                      </div>

                      {/* Bar track */}
                      <div className="flex-1 relative h-7 bg-muted/30 rounded-lg overflow-hidden">
                        {/* Available range bar */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${barWidth}%` } : {}}
                          transition={{ duration: 0.8, delay: 0.5 + honeyIdx * 0.1, ease: 'easeOut' }}
                          className="absolute top-0.5 bottom-0.5 rounded-md bg-gradient-to-r"
                          style={{
                            left: `${barStart}%`,
                            backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                          }}
                        >
                          <div className={`absolute inset-0 rounded-md bg-gradient-to-r ${honey.barColor} transition-all duration-300 ${isAvailable ? 'opacity-100' : 'opacity-25'}`} />
                        </motion.div>

                        {/* Active month highlight on bar */}
                        {(isAvailable || selectedMonth !== null) && isAvailable && (
                          <motion.div
                            layoutId={`highlight-${honey.id}`}
                            className="absolute top-0 bottom-0 w-[8.33%] border-l-2 border-r-2 border-white/80 dark:border-white/40 rounded-sm"
                            style={{ left: `${((activeMonth - 1) / 12) * 100}%` }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          >
                            <div className="absolute inset-0 bg-white/20 dark:bg-white/10 rounded-sm" />
                          </motion.div>
                        )}

                        {/* Icon on bar */}
                        <div className={`absolute right-2 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${isAvailable ? 'opacity-70' : 'opacity-20'}`}>
                          <Icon className={`w-3.5 h-3.5 ${isLight ? 'text-bark-light/70' : 'text-honey-200/70'}`} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Reset button */}
              {selectedMonth !== null && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center mt-4"
                >
                  <button
                    onClick={() => setSelectedMonth(null)}
                    className="text-xs text-honey-600 dark:text-honey-400 hover:text-honey-700 dark:hover:text-honey-300 underline underline-offset-2 transition-colors"
                  >
                    ← {t.selectMonth} ({t.currently}: {t.months[currentMonth - 1]})
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Info cards for selected/current month */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMonth}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Left: Available honeys list */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="glass-card rounded-2xl p-6 sm:p-8 card-shine"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-honey-100 dark:bg-honey-900/40 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-honey-600 dark:text-honey-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {t.monthDetail}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.months[activeMonth - 1]} — {getSeasonForMonth(activeMonth, lang)}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {availableHoneys.length > 0 ? (
                  availableHoneys.map((honey, idx) => {
                    const Icon = honey.icon;
                    return (
                      <motion.div
                        key={honey.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-accent/50 transition-colors group cursor-default"
                      >
                        <div className={`w-10 h-10 rounded-lg ${honey.color} flex items-center justify-center flex-shrink-0 ring-1 ring-black/5 dark:ring-white/10`}>
                          <Icon className="w-5 h-5 text-white/90" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {lang === 'sl' ? honey.nameSl : honey.nameEn}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t.months[honey.startMonth - 1]} – {t.months[honey.endMonth - 1]}
                          </p>
                        </div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-forest dark:text-forest-light bg-forest/10 dark:bg-forest/20 px-2 py-1 rounded-full">
                          {t.available}
                        </span>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Snowflake className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p className="text-sm">
                      {lang === 'sl'
                        ? 'V tem mesecu čebele počivajo. Med je na voljo iz zaloge.'
                        : 'Bees are resting this month. Honey is available from stock.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Availability count */}
              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {t.seasonLabel}
                </span>
                <span className="text-sm font-bold text-honey-600 dark:text-honey-400">
                  {availableHoneys.length}/6 {t.available}
                </span>
              </div>
            </motion.div>

            {/* Right: Fun fact / seasonal info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="glass-card rounded-2xl p-6 sm:p-8 card-shine flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-forest/10 dark:bg-forest/20 flex items-center justify-center">
                  <Info className="w-5 h-5 text-forest dark:text-forest-light" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {t.funFact}
                </h3>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedHoney?.id ?? 'default'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col justify-center"
                >
                  {selectedHoney ? (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-14 h-14 rounded-xl ${selectedHoney.color} flex items-center justify-center ring-2 ring-black/5 dark:ring-white/10`}>
                          {(() => {
                            const SIcon = selectedHoney.icon;
                            return <SIcon className="w-7 h-7 text-white/90" />;
                          })()}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-foreground">
                            {lang === 'sl' ? selectedHoney.nameSl : selectedHoney.nameEn}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {t.months[selectedHoney.startMonth - 1]} – {t.months[selectedHoney.endMonth - 1]}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                        {lang === 'sl' ? selectedHoney.factSl : selectedHoney.factEn}
                      </p>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground text-sm">
                        {lang === 'sl'
                          ? 'Kliknite na mesec v koledarju, da odkrijete zanimivosti o posamezni sorti medu.'
                          : 'Click on a month in the calendar to discover interesting facts about each honey variety.'}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Season color legend */}
              <div className="mt-5 pt-4 border-t border-border">
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-honey-50/50 dark:bg-honey-900/10">
                    <div className="w-4 h-4 rounded-full bg-[#F5E6A8] ring-1 ring-black/5" />
                    <span className="text-[10px] text-muted-foreground">{t.spring}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-honey-50/50 dark:bg-honey-900/10">
                    <div className="w-4 h-4 rounded-full bg-[#D4A017] ring-1 ring-black/5" />
                    <span className="text-[10px] text-muted-foreground">{t.summer}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-honey-50/50 dark:bg-honey-900/10">
                    <div className="w-4 h-4 rounded-full bg-[#A06830] ring-1 ring-black/5" />
                    <span className="text-[10px] text-muted-foreground">{t.autumn}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Summary stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { value: '6', label: lang === 'sl' ? 'vrst medu' : 'honey varieties' },
            { value: '7', label: lang === 'sl' ? 'mesecev medenja' : 'harvest months' },
            { value: '100%', label: lang === 'sl' ? 'ekološko' : 'organic' },
            { value: '0', label: lang === 'sl' ? 'kemičnih dodatkov' : 'chemicals added' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.1 + idx * 0.1 }}
              className="text-center p-4 rounded-xl bg-card border border-border hover-lift"
            >
              <div className="text-2xl sm:text-3xl font-bold honey-text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
