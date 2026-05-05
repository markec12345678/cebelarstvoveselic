'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Hexagon, TreePine, Droplets, Clock, MapPin, Package, Award, Sparkles } from 'lucide-react';
import { useLangStore } from '@/store/language';
import { getTranslations } from '@/lib/i18n';

interface StatConfig {
  icon: React.ElementType;
  statKey: number;
}

const statIcons: StatConfig[] = [
  { icon: Hexagon, statKey: 0 },
  { icon: TreePine, statKey: 1 },
  { icon: Droplets, statKey: 2 },
  { icon: Clock, statKey: 3 },
  { icon: Package, statKey: 4 },
  { icon: MapPin, statKey: 5 },
];

function AnimatedCounter({
  target,
  suffix,
  inView,
  duration = 2500,
}: {
  target: number;
  suffix?: string;
  inView: boolean;
  duration?: number;
}) {
  const rafRef = useRef<number>(0);
  const hasStartedRef = useRef(false);
  const [displayCount, setDisplayCount] = useState(0);
  const [showSuffix, setShowSuffix] = useState(false);

  useEffect(() => {
    if (!inView) return;

    // Only start once per inView=true cycle
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      const rounded = Math.round(current);
      setDisplayCount(rounded);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayCount(target);
        setShowSuffix(true);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, target, duration]);

  const formatNumber = (num: number): string => {
    return num.toLocaleString('sl-SI');
  };

  return (
    <span className="tabular-nums">
      {formatNumber(displayCount)}
      {suffix && (
        <motion.span
          initial={{ opacity: 0, scale: 0, y: 10 }}
          animate={showSuffix ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className="inline-block"
        >
          {suffix}
        </motion.span>
      )}
    </span>
  );
}

function FloatingHex({
  delay,
  x,
  y,
  size,
  opacity,
  dur,
}: {
  delay: number;
  x: string;
  y: string;
  size: number;
  opacity: number;
  dur: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -12, 0],
        rotate: [0, 5, -5, 0],
        opacity: [opacity * 0.3, opacity, opacity * 0.3],
      }}
      transition={{
        duration: dur,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        width: `${size}px`,
        height: `${size * 0.87}px`,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 60 52" fill="currentColor" className="text-honey-400">
        <polygon points="30,0 60,15 60,37 30,52 0,37 0,15" />
      </svg>
    </motion.div>
  );
}

function ProgressCircle({ progress, inView }: { progress: number; inView: boolean }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="text-white/10"
      />
      <motion.circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="url(#honeyGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={inView ? { strokeDashoffset: offset } : {}}
        transition={{ duration: 2, delay: 0.3, ease: 'easeOut' }}
      />
      <defs>
        <linearGradient id="honeyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function BeeCounter() {
  const { lang } = useLangStore();
  const t = getTranslations(lang);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  const floatingHexes = [
    { delay: 0, x: '8%', y: '15%', size: 28, opacity: 0.15, dur: 6 },
    { delay: 1, x: '22%', y: '65%', size: 20, opacity: 0.12, dur: 7 },
    { delay: 2, x: '45%', y: '20%', size: 32, opacity: 0.1, dur: 8 },
    { delay: 0.5, x: '68%', y: '70%', size: 22, opacity: 0.14, dur: 6.5 },
    { delay: 1.5, x: '85%', y: '25%', size: 26, opacity: 0.13, dur: 7.5 },
    { delay: 2.5, x: '55%', y: '80%', size: 18, opacity: 0.11, dur: 9 },
    { delay: 3, x: '92%', y: '55%', size: 24, opacity: 0.12, dur: 5.5 },
  ];

  // Progress values for each stat (0-100)
  const progressValues = [50, 95, 40, 60, 75, 50];

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-24 overflow-hidden">
      <div className="gradient-separator" />

      {/* Parallax background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-br from-forest-900 via-forest-800 to-honey-900"
      />

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* Floating hex decorations */}
      {floatingHexes.map((hex, i) => (
        <FloatingHex key={i} {...hex} />
      ))}

      {/* Top/bottom gradient lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-honey-400/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-honey-400/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-honey-300 text-sm font-medium border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-honey-400" />
            {t.beeCounter.sectionTag}
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {t.beeCounter.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/60 leading-relaxed">
            {t.beeCounter.subtitle}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
          {t.beeCounter.stats.map((stat, i) => {
            const Icon = statIcons[i]?.icon || Award;
            const targetValue = parseInt(stat.value.replace(/,/g, ''), 10);
            const label = lang === 'sl' ? stat.labelSl : stat.labelEn;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group"
              >
                <div
                  className="relative rounded-2xl p-4 sm:p-5 text-center transition-all duration-300 hover:scale-[1.05] hover:shadow-xl hover:shadow-honey-500/10"
                  style={{
                    background: 'rgba(255, 255, 255, 0.07)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  {/* Progress Circle Background */}
                  <ProgressCircle
                    progress={progressValues[i]}
                    inView={isInView}
                  />

                  {/* Icon */}
                  <div className="relative inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-honey-500/20 mb-3 group-hover:bg-honey-500/30 transition-colors duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-honey-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Number */}
                  <div className="relative text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    <AnimatedCounter
                      target={targetValue}
                      suffix={stat.suffix || undefined}
                      inView={isInView}
                      duration={targetValue > 10000 ? 3000 : 2500}
                    />
                  </div>

                  {/* Label */}
                  <p className="mt-1.5 text-[11px] sm:text-xs text-white/50 leading-snug font-medium">
                    {label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decorative text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-white/40 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-honey-400" />
            {lang === 'sl'
              ? 'Vse številke so ocenjene na podlagi podatkov iz leta 2024'
              : 'All figures are based on data from 2024'}
          </div>
        </motion.div>
      </div>

      <div className="gradient-separator absolute bottom-0 left-0 right-0" />
    </section>
  );
}
