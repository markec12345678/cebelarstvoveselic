'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Shield, Leaf, Award, Hexagon, Quote, CalendarDays, Leaf as LeafIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';

function AnimatedCounter({ target, suffix = '' }: { target: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''), 10);
  const hasPlus = target.includes('+');
  const hasPercent = target.includes('%');

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = numericTarget / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        current = numericTarget;
        clearInterval(timer);
      }
      setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, numericTarget]);

  return (
    <span ref={ref}>
      {count}
      {hasPlus ? '+' : ''}
      {hasPercent ? '%' : ''}
      {suffix}
    </span>
  );
}

const certificationBadges = [
  {
    name: 'Eko Sklad',
    icon: Leaf,
    tooltip: {
      sl: 'Certificiran po shemi Eko Sklad — slovenska shema ekološkega kmetijstva z strogimi kriteriji.',
      en: 'Certified under the Eko Sklad scheme — the Slovenian organic farming standard with strict criteria.',
    },
  },
  {
    name: 'EU Organic',
    icon: Shield,
    tooltip: {
      sl: 'V skladu z EU uredbami o ekološkem kmetijstvu (EU) 2018/848.',
      en: 'Compliant with EU organic farming regulations (EU) 2018/848.',
    },
  },
  {
    name: 'HACCP',
    icon: Award,
    tooltip: {
      sl: 'HACCP načela varnosti živil — analiza kritičnih kontrolnih točk pri pakiranju medu.',
      en: 'HACCP food safety principles — critical control point analysis during honey packaging.',
    },
  },
  {
    name: 'Carnica',
    icon: Hexagon,
    tooltip: {
      sl: 'Apis mellifera carnica — avtohtona slovenska čebela, priznana po mirnosti in odličnem pridelku.',
      en: 'Apis mellifera carnica — the native Slovenian honey bee, renowned for gentleness and excellent yield.',
    },
  },
];

/* ============================================
   Floating Leaf / Honeycomb Dot Decoration
   ============================================ */
function FloatingDecoration({
  style,
  delay,
  duration,
  type,
}: {
  style: React.CSSProperties;
  delay: number;
  duration: number;
  type: 'leaf' | 'hex' | 'dot';
}) {
  if (type === 'leaf') {
    return (
      <motion.div
        className="absolute pointer-events-none"
        style={style}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0.08, 0.12, 0], rotate: [0, 15, -10, 20, 5] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        <LeafIcon className="w-5 h-5 text-forest" />
      </motion.div>
    );
  }

  if (type === 'hex') {
    return (
      <motion.div
        className="absolute pointer-events-none"
        style={style}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.12, 0.06, 0.1, 0], rotate: [0, 30, -15, 10, 0], scale: [0.8, 1, 0.9, 1.1, 0.8] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      >
        <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
          <path
            d="M50 5L91 27.5V72.5L50 95L9 72.5V27.5L50 5Z"
            stroke="rgba(212, 160, 23, 0.3)"
            strokeWidth="2"
            fill="rgba(212, 160, 23, 0.05)"
          />
        </svg>
      </motion.div>
    );
  }

  // dot
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0, 0.25, 0.1, 0.2, 0], scale: [0, 1, 0.8, 1.2, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <div className="w-2 h-2 rounded-full bg-honey-400/40" />
    </motion.div>
  );
}

export default function About() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);

  const stats = [
    { value: t.about.stat1Value, label: t.about.stat1Label },
    { value: t.about.stat2Value, label: t.about.stat2Label },
    { value: t.about.stat3Value, label: t.about.stat3Label },
    { value: t.about.stat4Value, label: t.about.stat4Label },
  ];

  const calloutText = lang === 'sl'
    ? 'Brez antibiotikov. Brez dodanega sladkorja. Brez segrevanja nad 40 °C.'
    : 'No antibiotics. No added sugar. No heating above 40 °C.';

  const commitmentText = lang === 'sl'
    ? 'Naša obljuba: vsak kozarec medu nosi celotno zgodbo svojega izvora — od posebnega panja do sezonskega cvetja.'
    : 'Our promise: every jar of honey carries the full story of its origin — from the specific hive to the seasonal bloom.';

  return (
    <section id="story" className="py-20 sm:py-28 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-honey-50/50 via-background to-background" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-honey-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-forest/5 rounded-full blur-3xl" />
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* ============================================
          Floating Decoration Elements
          ============================================ */}
      <FloatingDecoration style={{ top: '12%', right: '6%' }} delay={0.5} duration={8} type="leaf" />
      <FloatingDecoration style={{ top: '30%', left: '3%' }} delay={1.0} duration={10} type="hex" />
      <FloatingDecoration style={{ bottom: '20%', right: '10%' }} delay={1.5} duration={7} type="dot" />
      <FloatingDecoration style={{ top: '60%', left: '8%' }} delay={2.0} duration={9} type="leaf" />
      <FloatingDecoration style={{ bottom: '35%', right: '4%' }} delay={0.8} duration={11} type="dot" />
      <FloatingDecoration style={{ top: '8%', left: '15%' }} delay={2.5} duration={6} type="hex" />
      <FloatingDecoration style={{ bottom: '10%', left: '20%' }} delay={1.2} duration={8.5} type="dot" />

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
          {/* Image with Ken Burns + Parallax */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
            ref={imageRef}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-honey-900/10 honey-glow">
              <motion.img
                src="/images/about.jpg"
                alt="Jožef Veselič pri delu s panji — tradicionalno čebelarstvo v Beli krajini"
                className="w-full h-[400px] lg:h-[520px] object-cover"
                loading="lazy"
                style={{ y: imageY, scale: imageScale }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* ============================================
                  "Since 1990" Ribbon Badge
                  ============================================ */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute top-5 right-5 z-10"
              >
                <div className="relative">
                  {/* Ribbon shape using CSS */}
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-honey-500 to-honey-600 text-white rounded-lg shadow-lg">
                    <CalendarDays className="w-4 h-4" />
                    <span className="text-sm font-bold tracking-wide">
                      {lang === 'sl' ? 'OD LETA 1990' : 'SINCE 1990'}
                    </span>
                  </div>
                  {/* Ribbon tail */}
                  <div className="absolute -bottom-1.5 right-3 w-2 h-3 bg-honey-700 rotate-[25deg] origin-top-left" />
                  <div className="absolute -bottom-1.5 right-7 w-2 h-3 bg-honey-700 -rotate-[25deg] origin-top-right" />
                </div>
              </motion.div>

              {/* Experience badge with pulse animation */}
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg"
              >
                <div className="text-3xl font-bold honey-text-gradient">30+</div>
                <div className="text-xs text-muted-foreground font-medium mt-0.5">
                  {lang === 'sl' ? 'let izkušenj' : 'years of experience'}
                </div>
              </motion.div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-honey-400 to-honey-600 rounded-2xl -z-10 opacity-20" />
            <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-honey-300 rounded-2xl -z-10 opacity-30" />
            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-honey-400 rounded-full opacity-40 bee-float" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-balance">
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

              {/* Decorative callout blockquote */}
              <motion.blockquote
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative border-l-4 border-honey-400 pl-5 py-3 my-6 bg-honey-50/60 dark:bg-honey-900/10 rounded-r-xl"
              >
                <Quote className="absolute top-3 left-2 w-4 h-4 text-honey-300 -translate-x-full opacity-60" />
                <p className="text-base sm:text-lg font-semibold text-honey-800 dark:text-honey-300 leading-relaxed italic">
                  {calloutText}
                </p>
              </motion.blockquote>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t.about.paragraph3}
              </p>

              {/* ============================================
                  Key Commitment Callout Block
                  ============================================ */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="relative my-6 rounded-xl border border-honey-200/60 dark:border-honey-800/30 bg-gradient-to-br from-honey-50/80 via-background to-honey-100/40 dark:from-honey-900/15 dark:via-background dark:to-honey-900/10 p-5 sm:p-6"
              >
                {/* Quote icon */}
                <div className="absolute -top-3 -left-1 w-7 h-7 rounded-full bg-honey-500 flex items-center justify-center shadow-md">
                  <Quote className="w-3.5 h-3.5 text-white" />
                </div>
                {/* Honey left border accent */}
                <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-gradient-to-b from-honey-300 via-honey-500 to-honey-300" />
                <div className="pl-5">
                  <p className="text-sm sm:text-base font-medium text-foreground/80 dark:text-foreground/70 leading-relaxed italic">
                    &ldquo;{commitmentText}&rdquo;
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Certification badges as mini cards with tooltips */}
            <TooltipProvider delayDuration={200}>
              <div className="mt-6 flex flex-wrap gap-2">
                {certificationBadges.map((badge) => (
                  <Tooltip key={badge.name}>
                    <TooltipTrigger asChild>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-honey-50 dark:bg-honey-900/10 border border-honey-100 dark:border-honey-800/30 text-xs font-medium text-honey-700 dark:text-honey-400 cursor-default hover:bg-honey-100 dark:hover:bg-honey-900/20 hover:border-honey-200 dark:hover:border-honey-700/40 transition-all hover:shadow-sm">
                        <badge.icon className="w-3.5 h-3.5 text-honey-500" />
                        {badge.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs text-xs leading-relaxed">
                      {badge.tooltip[lang]}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>

            {/* Stats with animated underline decoration */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="text-center p-3 sm:p-4 rounded-xl bg-honey-50/50 dark:bg-honey-900/10 border border-honey-100/80 dark:border-honey-800/30 hover:honey-glow transition-shadow relative group"
                >
                  <div className="text-2xl sm:text-3xl font-bold honey-text-gradient">
                    {/\d/.test(stat.value) ? (
                      <AnimatedCounter target={stat.value} />
                    ) : (
                      stat.value
                    )}
                  </div>
                  {/* Animated underline */}
                  <div className="mt-2 flex justify-center">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '2rem' } : { width: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 + i * 0.1, ease: 'easeOut' }}
                      className="h-0.5 rounded-full bg-gradient-to-r from-honey-300 via-honey-500 to-honey-300"
                    />
                  </div>
                  <div className="mt-1.5 text-xs sm:text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================================
          Bottom Gradient Transition to Next Section
          ============================================ */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-honey-50/30 dark:to-honey-950/10" />
    </section>
  );
}
